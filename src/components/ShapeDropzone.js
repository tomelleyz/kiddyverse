import { useDroppable } from "@dnd-kit/react";
import { motion } from "motion/react";

export default function ShapeDropzone({ id, targetShape, children }) {
  const { isDropTarget, ref } = useDroppable({
    id,
  });

  return (
    <div
      ref={ref}
      className={`relative flex size-44 items-center justify-center rounded-xl border-2 border-dashed bg-clip-padding transition-all sm:size-[250px] ${isDropTarget ? "border-[#8686FC] bg-[#8686FC]/25 shadow-xl" : "border-gray-400 bg-white shadow-sm"}`}
    >
      {targetShape && (
        <motion.div
          key={targetShape.name}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, ease: "easeOut" }}
          className="absolute size-36 bg-gray-900/70 sm:size-[200px]"
          style={{ clipPath: targetShape.clipPath }}
        ></motion.div>
      )}
      {children}
    </div>
  );
}
