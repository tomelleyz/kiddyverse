import { useSortable } from "@dnd-kit/react/sortable";

export default function Item({ id, index, column }) {
  const { ref, isDragging } = useSortable({
    id,
    index,
    type: "item",
    accept: "item",
    group: column,
  });

  return (
    <button
      className="w-full rounded-xl bg-gray-400 p-6 text-center"
      ref={ref}
      data-dragging={isDragging}
    >
      {id}
    </button>
  );
}
