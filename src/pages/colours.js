import dynamic from "next/dynamic";
import Head from "next/head";
import Header from "@/components/Header";

const NoSSRGame = dynamic(() => import("@/components/ColorGameScreen"), {
  ssr: false,
});

export default function Colours() {
  return (
    <>
      <Head>
        <title>Kiddyverse | Colour matching</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Colour matching game to help young children identify, match, and name colours."
        />

        <link rel="canonical" href="https://kiddyverse.vercel.app/colours" />
        <meta property="og:title" content="Kiddyverse | Colour matching" />
        <meta
          property="og:description"
          content="Colour matching game to help young children identify, match, and name colours."
        />
        <meta property="og:site_name" content="Kiddyverse" />
        <meta
          property="og:image"
          content="https://kiddyverse.vercel.app/meta-preview.png"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://kiddyverse.vercel.app/colours"
        />
      </Head>

      <main className="relative min-h-dvh bg-amber-100 select-none">
        <Header />

        <NoSSRGame />
      </main>
    </>
  );
}
