import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import palette from "@/assets/other-objects/palette.png";
import star from "@/assets/other-objects/star.png";
import lion from "@/assets/animals/lion.png";
import apple from "@/assets/fruits-and-vegetables/apple.png";
import car from "@/assets/other-objects/car.png";

export default function Home() {
  return (
    <>
      <Head>
        <title>Kid&apos;s Corner</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Explore and learn with fun games!" />
        <meta name="theme-color" content="#e0f7fa" />
      </Head>

      <main className="lg: relative min-h-dvh bg-blue-100 px-4 py-16 sm:py-[120px]">
        <header className="fixed top-0 left-0 w-full bg-transparent px-4 py-3 text-lg font-semibold">
          KID&apos;S CORNER
        </header>

        <div className="absolute top-8 right-10 size-[60px] rounded-full bg-green-100 lg:size-[100px]"></div>
        <div className="absolute bottom-8 left-4 size-[80px] rotate-45 rounded-xl bg-[#EECECF] lg:size-[140px]"></div>
        <div className="absolute right-1/12 bottom-[20%] size-12 bg-purple-100 [clip-path:polygon(50%_0%,_0%_100%,_100%_100%)]"></div>

        <div className="relative mx-auto max-w-3xl rounded-xl bg-white px-4 py-10 text-center shadow-lg lg:px-8 lg:pt-12 lg:pb-8">
          <h1 className="mb-4 text-3xl font-semibold lg:mb-8">
            Select an option
          </h1>

          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-4">
            <Link
              href="/colours"
              className="col-span-full flex flex-col items-center justify-center gap-3 rounded-xl border p-3 sm:col-span-2"
            >
              <div className="relative size-16 lg:size-20">
                <Image src={palette} alt="Palette" priority />
              </div>
              <h3 className="text-xl font-semibold">Colours</h3>
              <p>Learn red, green, blue and more!</p>
            </Link>
            <Link
              href="/shapes"
              className="col-span-full flex flex-col items-center justify-center gap-3 rounded-xl border p-3 sm:col-span-2"
            >
              <div className="relative size-16 lg:size-20">
                <Image src={star} alt="Star" priority />
              </div>
              <h3 className="text-xl font-semibold">Shapes</h3>
              <p>Discover circles, squares and triangles.</p>
            </Link>
            <Link
              href="/animals"
              className="col-span-full flex flex-col items-center justify-center gap-3 rounded-xl border p-3 sm:col-span-2"
            >
              <div className="relative size-16 lg:size-20">
                <Image src={lion} alt="Lion" priority />
              </div>
              <h3 className="text-xl font-semibold">Animals</h3>
              <p>Meet lions, monkeys and puppies!</p>
            </Link>
            <Link
              href="/fruits-and-vegetables"
              className="col-span-full flex flex-col items-center justify-center gap-3 rounded-xl border p-3 sm:col-span-2"
            >
              <div className="relative size-16 lg:size-20">
                <Image src={apple} alt="Apple" priority />
              </div>
              <h3 className="text-xl font-semibold">Fruits & Vegetables</h3>
              <p>Meet lions, monkeys and puppies!</p>
            </Link>
            <Link
              href="/everyday-objects"
              className="flex flex-col items-center justify-center gap-3 rounded-xl border p-3 sm:col-start-2 sm:col-end-4"
            >
              <div className="relative size-16 lg:size-20">
                <Image src={car} alt="Car" priority />
              </div>
              <h3 className="text-xl font-semibold">Everyday objects</h3>
              <p>Meet lions, monkeys and puppies!</p>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
