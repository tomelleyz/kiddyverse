import { useDraggable } from "@dnd-kit/react";

export default function DraggableShape({
  shape,
  showCorrectShape = false,
  targetShape = null,
}) {
  const { ref } = useDraggable({
    id: `${shape.name}`,
  });
  return (
    <button
      ref={ref}
      className={`block size-36 cursor-grab bg-[#8686FC] transition sm:size-[200px] ${showCorrectShape && shape.name === targetShape?.name ? "scale-110" : ""} ${showCorrectShape && shape.name !== targetShape?.name ? "opacity-30" : ""}`}
      style={{ clipPath: shape.clipPath }}
    ></button>
  );
}
