import "@/styles/globals.css";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  const variants = {
    hidden: { clipPath: "inset(0 0 0 100%)" },
    enter: { clipPath: "inset(0)" },
    exit: { clipPath: "inset(0 0 0 100%)" },
  };

  return (
    // <AnimatePresence mode="popLayout" initial={false}>
    //   <motion.div
    //     key={router.route}
    //     initial="hidden"
    //     animate="enter"
    //     exit="exit"
    //     variants={variants}
    //     transition={{ ease: "easeOut", duration: 0.3 }}
    //   >
    <Component {...pageProps} />
    //   </motion.div>
    // </AnimatePresence>
  );
}
