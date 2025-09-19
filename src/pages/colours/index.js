import dynamic from "next/dynamic";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const NoSSRGame = dynamic(() => import("@/components/ColorGameScreen"), {
  ssr: false,
});

export default function Colours() {
  return (
    <>
      <Head>
        <title>Colour matching game</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Colour matching game to help young children identify, match, and name colours."
        />
        <meta name="theme-color" content="#fef3c6" />
      </Head>

      <main className="relative min-h-screen bg-amber-100 font-balsamiq-sans">
        <Header />

        <NoSSRGame />

        <Footer />
      </main>
    </>
  );
}
