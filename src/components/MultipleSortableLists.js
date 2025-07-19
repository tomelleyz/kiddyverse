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

  return (
    <DragDropProvider
      onDragOver={(event) => {
        setItems((items) => move(items, event));
      }}
    >
      <div className="flex justify-center gap-8 p-20">
        {Object.entries(items).map(([column, items], index) => (
          <Column key={column} id={column} index={index}>
            {items.map((id, index) => (
              <Item key={id} id={id} index={index} column={column} />
            ))}
          </Column>
        ))}
      </div>
    </DragDropProvider>
  );
}
