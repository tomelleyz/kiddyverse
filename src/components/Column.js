import { useDroppable } from "@dnd-kit/react";
import { CollisionPriority } from "@dnd-kit/abstract";
import { useSortable } from "@dnd-kit/react/sortable";

export default function Column({ children, id, index }) {
  const { ref } = useSortable({
    id,
    index,
    type: "column",
    accept: ["item", "column"],
    collisionPriority: CollisionPriority.Low,
  });

  return (
    <div
      ref={ref}
      //   data-is-drop-target={isDropTarget ? "true" : "false"}
      className="flex w-2xs flex-col gap-6 rounded-xl bg-gray-100 p-6 data-[is-drop-target=true]:bg-black/10"
    >
      {children}
    </div>
  );
}
