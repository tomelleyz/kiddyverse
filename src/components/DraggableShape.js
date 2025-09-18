import { useDraggable } from "@dnd-kit/react";

export default function DraggableShape(props) {
  const { ref } = useDraggable({
    id: props.shape.name,
  });
  return (
    <button
      ref={ref}
      onClick={() => props.handleShapeClick(props.shape)}
      className={`size-36 cursor-pointer bg-[#8686FC] sm:size-[200px] ${props.showCorrectShape && props.shape.name === props.targetShape.name ? "scale-110" : ""} ${props.showCorrectShape && props.shape.name !== props.targetShape.name ? "opacity-30" : ""}`}
      style={{ clipPath: props.shape.clipPath }}
    ></button>
  );
}
