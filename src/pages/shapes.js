import Head from "next/head";
import dynamic from "next/dynamic";
import Header from "@/components/Header";

const NoSSRGame = dynamic(() => import("@/components/ShapeGameScreen"), {
  ssr: false,
});

export default function Shapes() {
  return (
    <>
      <Head>
        <title>Kiddyverse | Shape adventure</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Drag-and-drop shape puzzle game to help young children identify, match, and name shapes."
        />

        <link rel="canonical" href="https://kiddyverse.vercel.app/shapes" />
        <meta property="og:title" content="Kiddyverse | Shape Adventure" />
        <meta
          property="og:description"
          content="Drag-and-drop shape puzzle game to help young children identify, match, and name shapes."
        />
        <meta property="og:site_name" content="Kiddyverse" />
        <meta
          property="og:image"
          content="https://kiddyverse.vercel.app/meta-preview.png"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://kiddyverse.vercel.app/shapes"
        />
      </Head>

      <main className="relative min-h-dvh bg-amber-100 select-none">
        <Header />

        <NoSSRGame />
      </main>
    </>
  );
}
