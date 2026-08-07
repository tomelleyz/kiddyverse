import Link from "next/link";

export default function GameCompleteScreen({
  gameType,
  score,
  all,
  resetGame,
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <h1 className="text-5xl font-bold text-teal-600">🎉 You Did It! 🎉</h1>
      <p className="mb-6 text-2xl font-semibold">
        You&apos;re a{" "}
        {gameType === "shapes" ? "Shape Puzzle" : "Colour Matching"} Star! 🌟
      </p>

      <p className="mb-12 text-xl text-gray-700">
        Your Score: {score} out of {all.length}
      </p>
      <div className="flex flex-col flex-wrap justify-center gap-6 md:flex-row">
        <Link
          href={gameType === "shapes" ? "/colors" : "/shapes"}
          className="order-last cursor-pointer rounded-full bg-[#79ee8d] px-8 py-3 text-xl font-semibold text-white transition-transform active:scale-[0.98] md:order-none md:min-w-[290px]"
        >
          Play {gameType === "shapes" ? "Colour Matching" : "Shape Puzzle"}
        </Link>
        <button
          onClick={() => resetGame()}
          className="cursor-pointer rounded-full bg-[#0c098c] px-8 py-3 text-xl font-semibold text-white transition-transform active:scale-[0.98] md:min-w-[290px]"
        >
          Play {gameType === "shapes" ? "Shape Puzzle" : "Colour Matching"}{" "}
          Again
        </button>
      </div>
    </div>
  );
}
