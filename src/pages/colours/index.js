import GameScreen from "./components/GameScreen";

const colors = [
  { name: "Red", hex: "#FF4C4C" },
  { name: "Blue", hex: "#4C6EFF" },
  { name: "Green", hex: "#4CFF4C" },
  { name: "Yellow", hex: "#FFEB3B" },
];

export default function Colours() {
  return (
    <main className="relative">
      <header className="fixed top-0 left-0 w-full px-4 py-3 text-lg font-semibold">
        Colours
      </header>
      <div className="text-center">
        <GameScreen />
      </div>
    </main>
  );
}
