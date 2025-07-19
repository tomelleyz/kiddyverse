import { DragDropProvider, useDraggable, useDroppable } from "@dnd-kit/react";
import { useSortable } from "@dnd-kit/react/sortable";
import { useState } from "react";

function Draggable() {
  const { ref } = useDraggable({
    id: "draggable",
  });

  return (
    <>
      <button
        ref={ref}
        className="rounded-xl bg-gray-900 p-4 text-center text-white"
      >
        Draggable
      </button>
    </>
  );
}

function Droppable({ id, children }) {
  const { isDropTarget, ref } = useDroppable({
    id,
  });

  return (
    <div
      ref={ref}
      data-is-drop-target={isDropTarget ? "true" : "false"}
      className="grid size-80 place-items-center rounded-xl border-2 border-gray-500 data-[is-drop-target=true]:border-green-400"
    >
      {children}
    </div>
  );
}

function Sortable({ id, index }) {
  const { ref } = useSortable({ id, index });

  return (
    <li ref={ref} className="rounded-xl bg-gray-400 p-4 shadow-sm">
      Item {id}
    </li>
  );
}

export default function ShapeGameScreen() {
  const targets = ["A", "B", "C"];
  const [target, setTarget] = useState();

  const items = [1, 2, 3, 4];

  return (
    <div className="p-20">
      <div className="flex flex-col items-center justify-between gap-32 lg:flex-row">
        <DragDropProvider
          onDragEnd={(event) => {
            if (event.canceled) return;

            setTarget(event.operation.target?.id);
          }}
        >
          {!target ? <Draggable /> : null}

          {targets.map((id) => (
            <Droppable key={id} id={id}>
              {target === id ? <Draggable /> : `Droppable ${id}`}
            </Droppable>
          ))}
        </DragDropProvider>
      </div>

      <ul className="mx-auto mt-16 flex max-w-xl gap-6">
        {items.map((id, index) => (
          <Sortable key={id} id={id} index={index} />
        ))}
      </ul>
    </div>
  );
}
