import Link from "next/link";

export default function Home() {
  return (
    <main className="relative grid min-h-dvh place-items-center">
      <header className="fixed top-0 left-0 w-full px-4 py-3 text-lg font-semibold">
        TOMFIS
      </header>
      <div className="text-center">
        <h1 className="mb-3 text-3xl font-semibold">Select option</h1>

        <div className="grid grid-cols-4 gap-6">
          <Link href="/colours" className="col-span-2 border p-3">
            Colours
          </Link>
          <Link href="/shapes" className="col-span-2 border p-3">
            Shapes
          </Link>
          <Link href="/animals" className="col-span-2 border p-3">
            Animals
          </Link>
          <Link href="/fruits-and-vegetables" className="col-span-2 border p-3">
            Fruits & Vegetables
          </Link>
          <Link
            href="/other-objects"
            className="col-start-2 col-end-4 border p-3"
          >
            Other objects
          </Link>
        </div>
      </div>
    </main>
  );
}
