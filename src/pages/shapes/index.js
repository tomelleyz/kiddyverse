import Head from "next/head";
import ShapeGameScreen from "@/components/ShapeGameScreen";
import MultipleSortableLists from "@/components/MultipleSortableLists";

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
      </Head>

      <main>
        <ShapeGameScreen />
        <MultipleSortableLists />
      </main>
    </>
  );
}
