import Head from "next/head";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const NoSSRGame = dynamic(() => import("@/components/ShapeGameScreen"), {
  ssr: false,
});

export default function Shapes() {
  return (
    <>
      <Head>
        <title>Shape adventure</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Drag-and-drop shape puzzle game to help young children identify, match, and name shapes."
        />
        <meta name="theme-color" content="oklch(96.2% 0.059 95.617)" />
      </Head>

      <main className="relative min-h-dvh bg-amber-100 select-none">
        <Header />

        <NoSSRGame />

        <Footer />
      </main>
    </>
  );
}
