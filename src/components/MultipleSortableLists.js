import { useState } from "react";
import Item from "./Item";
import Column from "./Column";
import { move } from "@dnd-kit/helpers";
import { DragDropProvider } from "@dnd-kit/react";

export default function MultipleSortableLists() {
  const [items, setItems] = useState({
    A: ["A0", "A1", "A2"],
    B: ["B0", "B1"],
    C: [],
  });
  const [columnOrder, setColumnOrder] = useState(() => Object.keys(items));

  return (
    <DragDropProvider
      onDragOver={(event) => {
        const { source, target } = event.operation;

        if (source?.type === "column") return;

        setItems((items) => move(items, event));
      }}
      onDragEnd={(event) => {
        const { source, target } = event.operation;

        if (event.canceled || source.type !== "column") return;

        setColumnOrder((columns) => move(columns, event));
      }}
    >
      <div className="flex justify-center gap-8 p-20">
        {columnOrder.map((column, columnIndex) => (
          <Column key={column} id={column} index={columnIndex}>
            {items[column].map((id, index) => (
              <Item key={id} id={id} index={index} column={column} />
            ))}
          </Column>
        ))}
      </div>
    </DragDropProvider>
  );
}
