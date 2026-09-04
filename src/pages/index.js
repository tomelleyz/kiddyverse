import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { featuredImages } from "@/data/image-catalog";

const containerAnimation = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.1,
    },
  },
};

export const itemAnimation = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "tween", ease: "easeOut", duration: 0.3 },
  },
};

export default function Home() {
  return (
    <>
      <Head>
        <title>Kiddyverse | Explore and learn with fun games!</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="A playground for kids to have fun learning colors, shapes, animals, fruits & vegetables, and everyday objects."
        />

        <link rel="canonical" href="https://kiddyverse.vercel.app" />
        <meta
          property="og:title"
          content="Kiddyverse | Explore and learn with fun games!"
        />
        <meta
          property="og:description"
          content="A playground for kids to have fun learning colors, shapes, animals, fruits & vegetables, and everyday objects."
        />
        <meta property="og:site_name" content="Kiddyverse" />
        <meta
          property="og:image"
          content="https://kiddyverse.vercel.app/meta-preview.png"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kiddyverse.vercel.app" />
      </Head>

      <main className="relative flex min-h-dvh flex-col gap-8 bg-[#F5F7F8] px-4 pt-6 pb-24 sm:px-8 sm:pb-[120px] lg:pt-8">
        <header className="flex flex-col text-lg font-semibold">
          <span>KIDDYVERSE</span>

          <div className="relative size-28 self-center lg:size-40">
            <Image
              src={featuredImages.playground.src}
              alt={featuredImages.playground.alt}
              fill
              sizes="(min-width: 1024px) 160px, 112px"
              className="object-contain object-center"
              priority
            />
          </div>
        </header>

        <div className="absolute top-8 right-10 size-[40px] rounded-full bg-green-100 sm:size-[60px] lg:size-[100px]"></div>
        <div className="absolute bottom-8 left-4 size-[80px] rotate-45 rounded-xl bg-[#EECECF] lg:size-[140px]"></div>
        <div className="absolute right-1/12 bottom-[20%] size-12 bg-purple-100 [clip-path:polygon(50%_0%,_0%_100%,_100%_100%)]"></div>

        {/* Main Content */}
        <div className="relative mx-auto max-w-2xl rounded-xl bg-white px-4 py-10 text-center shadow-md sm:px-8 lg:pt-12 lg:pb-8">
          <div className="mb-6 lg:mb-8">
            <h1 className="text-2xl font-semibold lg:text-3xl">
              Choose your adventure
            </h1>
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerAnimation}
            viewport={{ once: true }}
            className="grid w-full grid-cols-1 gap-6 sm:grid-cols-4"
          >
            <motion.div
              variants={itemAnimation}
              className="col-span-full sm:col-span-2"
            >
              <Link
                href="/colors"
                data-cuelume-press
                data-cuelume-release
                className="flex flex-row items-end justify-between gap-3 overflow-hidden rounded-xl bg-red-600 p-4 text-white"
              >
                <h3 className="pb-4 text-left text-3xl font-semibold">
                  Colors
                </h3>
                <div className="relative mr-[-25%] size-40 shrink-0">
                  <Image
                    src={featuredImages.palette.src}
                    alt={featuredImages.palette.alt}
                    fill
                    sizes="160px"
                    className="object-contain object-center [filter:drop-shadow(1px_1px_white)_drop-shadow(1px_-1px_white)_drop-shadow(-1px_1px_white)_drop-shadow(-1px_-1px_white)]"
                    priority
                  />
                </div>
              </Link>
            </motion.div>
            <motion.div
              variants={itemAnimation}
              className="col-span-full sm:col-span-2"
            >
              <Link
                href="/shapes"
                data-cuelume-press
                data-cuelume-release
                className="flex flex-row items-end justify-between gap-3 overflow-hidden rounded-xl bg-blue-600 p-4 text-white"
              >
                <h3 className="pb-4 text-left text-3xl font-semibold">
                  Shapes
                </h3>
                <div className="relative mr-[-25%] size-40 shrink-0">
                  <Image
                    src={featuredImages.star.src}
                    alt={featuredImages.star.alt}
                    fill
                    sizes="160px"
                    className="object-contain object-center [filter:drop-shadow(1px_1px_white)_drop-shadow(1px_-1px_white)_drop-shadow(-1px_1px_white)_drop-shadow(-1px_-1px_white)]"
                    priority
                  />
                </div>
              </Link>
            </motion.div>

            <motion.div
              variants={itemAnimation}
              className="col-span-full sm:col-span-2"
            >
              <Link
                href="/animals"
                data-cuelume-press
                data-cuelume-release
                className="flex flex-row items-end justify-between gap-3 overflow-hidden rounded-xl bg-orange-600 p-4 text-white"
              >
                <h3 className="pb-4 text-left text-3xl font-semibold">
                  Animals
                </h3>
                <div className="relative mr-[-25%] size-40 shrink-0">
                  <Image
                    src={featuredImages.lion.src}
                    alt={featuredImages.lion.alt}
                    fill
                    sizes="160px"
                    className="object-contain object-center [filter:drop-shadow(1px_1px_white)_drop-shadow(1px_-1px_white)_drop-shadow(-1px_1px_white)_drop-shadow(-1px_-1px_white)]"
                    priority
                  />
                </div>
              </Link>
            </motion.div>

            <motion.div
              variants={itemAnimation}
              className="col-span-full sm:col-span-2"
            >
              <Link
                href="/fruits-and-vegetables"
                data-cuelume-press
                data-cuelume-release
                className="flex flex-row items-end justify-between gap-3 overflow-hidden rounded-xl bg-green-600 p-4 text-white"
              >
                <h3 className="pb-4 text-left text-3xl font-semibold">
                  Fruits & Vegetables
                </h3>
                <div className="relative mr-[-25%] size-40 shrink-0">
                  <Image
                    src={featuredImages.apple.src}
                    alt={featuredImages.apple.alt}
                    fill
                    sizes="160px"
                    className="object-contain object-center [filter:drop-shadow(1px_1px_white)_drop-shadow(1px_-1px_white)_drop-shadow(-1px_1px_white)_drop-shadow(-1px_-1px_white)]"
                    priority
                  />
                </div>
              </Link>
            </motion.div>
            <motion.div
              variants={itemAnimation}
              className="sm:col-start-2 sm:col-end-4"
            >
              <Link
                href="/everyday-objects"
                data-cuelume-press
                data-cuelume-release
                className="flex flex-row items-end justify-between gap-3 overflow-hidden rounded-xl bg-purple-600 p-4 text-white"
              >
                <h3 className="pb-4 text-left text-3xl font-semibold">
                  Everyday objects
                </h3>
                <div className="relative mr-[-25%] size-40 shrink-0">
                  <Image
                    src={featuredImages.car.src}
                    alt={featuredImages.car.alt}
                    fill
                    sizes="160px"
                    className="object-contain object-center [filter:drop-shadow(1px_1px_white)_drop-shadow(1px_-1px_white)_drop-shadow(-1px_1px_white)_drop-shadow(-1px_-1px_white)]"
                    priority
                  />
                </div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </main>

      <footer className="flex flex-wrap items-center justify-center gap-1 bg-[#F5F7F8] px-4 pb-8 text-center text-xs text-gray-400">
        <span>
          Built with ❤️ by a doting{" "}
          <a
            href="https://tomelleyz.github.io"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            uncle
          </a>{" "}
          for his little niece
        </span>
        &#8226;
        <span>Parental guidance recommended</span>
        &#8226;
        <span>Manage screen time</span>
        &#8226;
        <span>3D icons from thiings.co</span>
      </footer>
    </>
  );
}
