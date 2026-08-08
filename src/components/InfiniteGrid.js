import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
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
 * @property {string} label
 * @property {string} src
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

  // -- Modal Shared Layout --
  const [activeItem, setActiveItem] = useState(null);
  const MotionImage = motion.create(Image);

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
          <motion.button
            data-cuelume-press="arrival"
            data-pos={`row-${r}, col-${c}`}
            key={`${r}-${c}`}
            style={style}
            onClick={() => setActiveItem({ ...item, row: r, col: c })}
            className="flex cursor-pointer items-center justify-center"
          >
            <MotionImage
              layoutId={`image-${r}-${c}`}
              src={item.src}
              alt={item.alt}
              width={160}
              height={160}
            />
          </motion.button>,
        );
      }
    }
    return rendered;
  }, [scrollPos, containerSize, items, numItems, numColsToTile, numRowsToTile]);

  return (
    <div
      ref={containerRef}
      className={`relative h-full w-full overflow-scroll rounded-lg select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${isDraggable ? "cursor-grab" : ""}`}
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

      <LayoutGroup id="modal">
        {/* 2. The Content: Rendered items are positioned absolutely within the sizer */}
        {visibleItems}

        <Dialog.Root
          open={Boolean(activeItem)}
          onOpenChange={(open) => {
            if (!open) setActiveItem(null);
          }}
        >
          <AnimatePresence>
            {activeItem ? (
              <Dialog.Portal forceMount>
                <Dialog.Overlay asChild forceMount>
                  <motion.div
                    data-cuelume-press
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-20 cursor-pointer bg-zinc-900/40 backdrop-blur-sm"
                  />
                </Dialog.Overlay>
                <Dialog.Content asChild forceMount>
                  <div className="fixed top-1/2 left-1/2 z-30 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="relative flex flex-col items-center justify-center gap-8 rounded-3xl bg-white p-8 shadow-2xl"
                    >
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute top-4 right-4 z-10"
                      >
                        <Dialog.Close asChild>
                          <button
                            data-cuelume-press
                            aria-label="Close"
                            className="flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-md transition-colors hover:bg-black/40"
                          >
                            <svg
                              width="15"
                              height="15"
                              viewBox="0 0 15 15"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden
                            >
                              <path
                                d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                                fill="currentColor"
                                fillRule="evenodd"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </button>
                        </Dialog.Close>
                      </motion.div>

                      <MotionImage
                        layoutId={`image-${activeItem.row}-${activeItem.col}`}
                        src={activeItem.src}
                        alt={activeItem.alt}
                        width={240}
                        height={240}
                      />

                      <Dialog.Title asChild>
                        <motion.h2
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          transition={{ delay: 0.1, duration: 0.15 }}
                          className="text-3xl font-extrabold text-zinc-900 sm:text-5xl"
                        >
                          {activeItem.label}
                        </motion.h2>
                      </Dialog.Title>
                      <Dialog.Description className="sr-only">
                        Full view of {activeItem.label}
                      </Dialog.Description>
                    </motion.div>
                  </div>
                </Dialog.Content>
              </Dialog.Portal>
            ) : null}
          </AnimatePresence>
        </Dialog.Root>
      </LayoutGroup>
    </div>
  );
}
