import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

const MotionImage = motion.create(Image);

export default function InfiniteGrid({ items }) {
  const [activeItem, setActiveItem] = useState(null);

  return (
    <div className="grid grid-cols-2 justify-items-center select-none sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-10">
      <Dialog.Root
        open={Boolean(activeItem)}
        onOpenChange={(open) => {
          if (!open) setActiveItem(null);
        }}
      >
        {items.map((item) => (
          <motion.button
            data-cuelume-press="arrival"
            key={`${item.id}`}
            onClick={() => setActiveItem(item)}
            className="flex size-[200px] cursor-pointer items-center justify-center"
          >
            <MotionImage
              layoutId={`image-${item.id}`}
              src={item.src}
              alt={item.alt}
              width={160}
              height={160}
            />
          </motion.button>
        ))}

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
                      layoutId={`image-${activeItem.id}`}
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
    </div>
  );
}
