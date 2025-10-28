import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";

// --- Constants ---
const ITEM_WIDTH = 150; // Width of each grid item
const ITEM_HEIGHT = 100; // Height of each grid item
const VIRTUAL_SIZE = 1000000; // Large virtual dimension for "infinite" scroll
const BUFFER = 2; // Number of extra items to render on each side (top, bottom, left, right)

/**
 * @typedef {object} GridItem
 * @property {string | number} id
 * @property {React.ReactNode} content
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
function InfiniteGrid({ items, isDraggable = false }) {
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
            className="flex items-center justify-center overflow-hidden rounded-lg border border-dashed border-blue-800 bg-gray-800/50 p-2"
          >
            <div className="text-center">
              {item.content}
              <div className="mt-1 font-mono text-xs text-blue-500/50">
                ({r}, {c})
              </div>
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
      className={`relative h-full w-full overflow-scroll rounded-lg bg-gray-900 ${isDraggable ? "cursor-grab" : ""}`}
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

// --- Main App Component (Example Usage) ---
export default function Animals() {
  const [isDraggable, setIsDraggable] = useState(true);

  // Sample items to be tiled
  const sampleItems = [
    { id: "a", content: "Item A" },
    { id: "b", content: "Item B" },
    { id: "c", content: "Item C" },
    { id: "d", content: "Item D" },
    { id: "e", content: "Item E" },
    { id: "f", content: "Item F" },
    { id: "g", content: "Item G" },
    { id: "h", content: "Item H" },
    { id: "i", content: "Item I" },
  ];

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-950 p-8 font-sans text-white">
      <h1 className="mb-4 text-3xl font-bold text-blue-300">
        Infinite Draggable Grid
      </h1>
      <p className="mb-6 max-w-lg text-center text-gray-400">
        Scroll in any direction. The grid is populated by infinitely tiling a
        finite set of items. You can also drag to scroll if enabled.
      </p>

      {/* --- Toggle for Draggable Prop --- */}
      <div className="mb-6">
        <label className="flex cursor-pointer items-center space-x-3">
          <input
            type="checkbox"
            checked={isDraggable}
            onChange={(e) => setIsDraggable(e.target.checked)}
            className="h-5 w-5 rounded border-gray-600 bg-gray-700 text-blue-500 ring-offset-gray-950 focus:ring-blue-600"
          />
          <span className="text-gray-200">Enable Drag-to-Scroll</span>
        </label>
      </div>

      {/* --- The Grid Component --- */}
      <div className="h-3/4 w-full max-w-6xl rounded-xl border border-blue-900/50 shadow-2xl shadow-blue-900/10">
        <InfiniteGrid items={sampleItems} isDraggable={isDraggable} />
      </div>
    </div>
  );
}
