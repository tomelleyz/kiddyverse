import Image from "next/image";
import { useState, useRef, useEffect, useMemo, useCallback } from "react";

// --- Constants ---
const ITEM_WIDTH = 200; // Width of each grid item
const ITEM_HEIGHT = 200; // Height of each grid item
const VIRTUAL_SIZE = 1000000; // Large virtual dimension for "infinite" scroll
const BUFFER = 2; // Number of extra items to render on each side (top, bottom, left, right)

/**
 * @typedef {object} GridItem
 * @property {string | number} id
 * @property {React.ReactNode} src
 * @property {string} alt
 */

/**
 * @typedef {object} InfiniteGridProps
 * @property {GridItem[]} items - The finite array of items to tile infinitely.
 * @property {boolean} [isDraggable=false] - Whether the grid can be dragged.
 */

/**
 * An "infinitely" scrolling grid component that tiles a finite set of items.
 * It supports bi-directional scrolling and optional drag-to-scroll.
 *
 * @param {InfiniteGridProps} props
 */
export default function InfiniteGrid({ items, isDraggable = false }) {
  const containerRef = useRef(null);
  const [scrollPos, setScrollPos] = useState({ x: 0, y: 0 });
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  // --- Dragging State ---
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const dragStartScroll = useRef({ x: 0, y: 0 });

  // --- Tile Calculation ---
  // Determine how to tile the items (e.g., a 1D array of 9 items will be a 3x3 grid)
  const { numItems, numColsToTile, numRowsToTile } = useMemo(() => {
    const num = items.length;
    if (num === 0) return { numItems: 0, numColsToTile: 0, numRowsToTile: 0 };
    const cols = Math.ceil(Math.sqrt(num));
    const rows = Math.ceil(num / cols);
    return { numItems: num, numColsToTile: cols, numRowsToTile: rows };
  }, [items]);

  // --- Initial Centering ---
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      // Scroll to the center of the virtual area
      const centerScrollX = VIRTUAL_SIZE / 2;
      const centerScrollY = VIRTUAL_SIZE / 2;
      container.scrollLeft = centerScrollX;
      container.scrollTop = centerScrollY;
      setScrollPos({ x: centerScrollX, y: centerScrollY });

      // Set initial container size
      setContainerSize({
        width: container.clientWidth,
        height: container.clientHeight,
      });
    }
  }, []);

  // --- Resize Observer ---
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setContainerSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    resizeObserver.observe(container);
    return () => resizeObserver.unobserve(container);
  }, []);

  // --- Scroll Handler ---
  const handleScroll = useCallback(
    (e) => {
      if (!isDragging) {
        setScrollPos({
          x: e.target.scrollLeft,
          y: e.target.scrollTop,
        });
      }
    },
    [isDragging],
  );

  // --- Drag Handlers ---
  const onDragStart = useCallback(
    (e) => {
      if (!isDraggable || !containerRef.current) return;
      e.preventDefault();
      setIsDragging(true);
      dragStartPos.current = { x: e.clientX, y: e.clientY };
      dragStartScroll.current = {
        x: containerRef.current.scrollLeft,
        y: containerRef.current.scrollTop,
      };
      containerRef.current.classList.add("cursor-grabbing");
    },
    [isDraggable],
  );

  const onDragMove = useCallback(
    (e) => {
      if (!isDragging || !containerRef.current) return;
      e.preventDefault();
      const dx = e.clientX - dragStartPos.current.x;
      const dy = e.clientY - dragStartPos.current.y;

      const newScrollLeft = dragStartScroll.current.x - dx;
      const newScrollTop = dragStartScroll.current.y - dy;

      containerRef.current.scrollLeft = newScrollLeft;
      containerRef.current.scrollTop = newScrollTop;

      // Manually update scrollPos state while dragging
      setScrollPos({ x: newScrollLeft, y: newScrollTop });
    },
    [isDragging],
  );

  const onDragEnd = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    if (containerRef.current) {
      containerRef.current.classList.remove("cursor-grabbing");
    }
  }, [isDragging]);

  // --- Visible Item Calculation ---
  const visibleItems = useMemo(() => {
    if (containerSize.width === 0 || numItems === 0) {
      return [];
    }

    // Calculate the range of items to render
    const startCol = Math.floor(scrollPos.x / ITEM_WIDTH) - BUFFER;
    const startRow = Math.floor(scrollPos.y / ITEM_HEIGHT) - BUFFER;

    const visibleCols =
      Math.ceil(containerSize.width / ITEM_WIDTH) + 2 * BUFFER;
    const visibleRows =
      Math.ceil(containerSize.height / ITEM_HEIGHT) + 2 * BUFFER;

    const endCol = startCol + visibleCols;
    const endRow = startRow + visibleRows;

    const rendered = [];

    for (let r = startRow; r <= endRow; r++) {
      for (let c = startCol; c <= endCol; c++) {
        // Calculate the item index from the finite 'items' array
        // Use a robust modulo operator for negative numbers
        const itemColIndex =
          ((c % numColsToTile) + numColsToTile) % numColsToTile;
        const itemRowIndex =
          ((r % numRowsToTile) + numRowsToTile) % numRowsToTile;
        let itemIndex =
          (itemRowIndex * numColsToTile + itemColIndex) % numItems;

        // Ensure index is valid (it might be out of bounds if numItems is not a perfect grid)
        if (itemIndex >= numItems) {
          itemIndex = itemIndex % numItems;
        }

        const item = items[itemIndex];

        if (!item) continue; // Skip if item is somehow undefined

        const style = {
          position: "absolute",
          left: c * ITEM_WIDTH,
          top: r * ITEM_HEIGHT,
          width: ITEM_WIDTH,
          height: ITEM_HEIGHT,
        };

        rendered.push(
          <div
            key={`${r}-${c}`}
            style={style}
            className="flex items-center justify-center overflow-hidden select-none"
          >
            <div className="relative size-40">
              <Image
                src={item.src}
                alt={item.alt}
                // fill
                // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                // className="object-contain object-center"
              />
            </div>
          </div>,
        );
      }
    }
    return rendered;
  }, [scrollPos, containerSize, items, numItems, numColsToTile, numRowsToTile]);

  return (
    <div
      ref={containerRef}
      className={`relative h-full w-full overflow-scroll rounded-lg bg-white ${isDraggable ? "cursor-grab" : ""}`}
      onScroll={handleScroll}
      onMouseDown={onDragStart}
      onMouseMove={onDragMove}
      onMouseUp={onDragEnd}
      onMouseLeave={onDragEnd}
    >
      {/* 1. The Sizer: This invisible element creates the huge scrollable area */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: `${VIRTUAL_SIZE}px`,
          height: `${VIRTUAL_SIZE}px`,
          pointerEvents: "none", // Don't let it interfere with mouse events
        }}
      />
      {/* 2. The Content: Rendered items are positioned absolutely within the sizer */}
      {visibleItems}
    </div>
  );
}
