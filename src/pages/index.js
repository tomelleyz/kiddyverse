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
        <title>Kid&apos;s Corner</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Explore and learn with fun games!" />
        <meta name="theme-color" content="#e0f7fa" />
      </Head>

      <main className="relative min-h-dvh bg-blue-100 px-4 py-24 sm:py-[120px]">
        <header className="fixed top-0 left-0 w-full bg-transparent px-4 py-6 text-lg font-semibold lg:p-8">
          KID&apos;S CORNER
        </header>

        <div className="absolute top-8 right-10 size-[60px] rounded-full bg-green-100 lg:size-[100px]"></div>
        <div className="absolute bottom-8 left-4 size-[80px] rotate-45 rounded-xl bg-[#EECECF] lg:size-[140px]"></div>
        <div className="absolute right-1/12 bottom-[20%] size-12 bg-purple-100 [clip-path:polygon(50%_0%,_0%_100%,_100%_100%)]"></div>

        <div className="relative mx-auto max-w-3xl rounded-xl bg-white px-4 py-10 text-center shadow-md lg:px-8 lg:pt-12 lg:pb-8">
          <div className="mb-6 lg:mb-8">
            <h1 className="text-2xl font-semibold lg:text-3xl">
              Choose your adventure
            </h1>
          </div>

          <Link href="/flashcard">Flashcard</Link>

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
                href="/colours"
                className="flex flex-col items-center justify-center gap-3 rounded-xl border border-gray-200 p-4"
              >
                <div className="relative size-16 lg:size-20">
                  <Image
                    src={featuredImages.palette.src}
                    alt={featuredImages.palette.alt}
                    fill
                    sizes="(min-width: 1024px) 80px, 64px"
                    className="object-contain object-center"
                    priority
                  />
                </div>
                <h3 className="text-xl font-semibold">Colours</h3>
                <p className="text-gray-500">
                  Learn red, green, blue and more!
                </p>
              </Link>
            </motion.div>
            <motion.div
              variants={itemAnimation}
              className="col-span-full sm:col-span-2"
            >
              <Link
                href="/shapes"
                className="flex flex-col items-center justify-center gap-3 rounded-xl border border-gray-200 p-4"
              >
                <div className="relative size-16 lg:size-20">
                  <Image
                    src={featuredImages.star.src}
                    alt={featuredImages.star.alt}
                    fill
                    sizes="(min-width: 1024px) 80px, 64px"
                    className="object-contain object-center"
                    priority
                  />
                </div>
                <h3 className="text-xl font-semibold">Shapes</h3>
                <p className="text-gray-500">
                  Discover circles, squares and triangles.
                </p>
              </Link>
            </motion.div>

            <motion.div
              variants={itemAnimation}
              className="col-span-full sm:col-span-2"
            >
              <Link
                href="/animals"
                className="flex flex-col items-center justify-center gap-3 rounded-xl border border-gray-200 p-4"
              >
                <div className="relative size-16 lg:size-20">
                  <Image
                    src={featuredImages.lion.src}
                    alt={featuredImages.lion.alt}
                    fill
                    sizes="(min-width: 1024px) 80px, 64px"
                    className="object-contain object-center"
                    priority
                  />
                </div>
                <h3 className="text-xl font-semibold">Animals</h3>
                <p className="text-gray-500">
                  Meet lions, monkeys and puppies!
                </p>
              </Link>
            </motion.div>

            <motion.div
              variants={itemAnimation}
              className="col-span-full sm:col-span-2"
            >
              <Link
                href="/fruits-and-vegetables"
                className="flex flex-col items-center justify-center gap-3 rounded-xl border border-gray-200 p-4"
              >
                <div className="relative size-16 lg:size-20">
                  <Image
                    src={featuredImages.apple.src}
                    alt={featuredImages.apple.alt}
                    fill
                    sizes="(min-width: 1024px) 80px, 64px"
                    className="object-contain object-center"
                    priority
                  />
                </div>
                <h3 className="text-xl font-semibold">Fruits & Vegetables</h3>
                <p className="text-gray-500">
                  Yummy apples, carrots and bananas.
                </p>
              </Link>
            </motion.div>
            <motion.div
              variants={itemAnimation}
              className="sm:col-start-2 sm:col-end-4"
            >
              <Link
                href="/everyday-objects"
                className="flex flex-col items-center justify-center gap-3 rounded-xl border border-gray-200 p-4"
              >
                <div className="relative size-16 lg:size-20">
                  <Image
                    src={featuredImages.car.src}
                    alt={featuredImages.car.alt}
                    fill
                    sizes="(min-width: 1024px) 80px, 64px"
                    className="object-contain object-center"
                    priority
                  />
                </div>
                <h3 className="text-xl font-semibold">Everyday objects</h3>
                <p className="text-gray-500">
                  Cars, balls, bicycles and much more.
                </p>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </>
  );
}
