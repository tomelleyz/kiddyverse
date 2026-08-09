import Link from "next/link";

export default function GameCompleteScreen({
  gameType,
  score,
  maxScore,
  resetGame,
}) {
  const scoreInPercent = Math.ceil((score / maxScore) * 100);

  return (
    <div className="mx-auto max-w-2xl text-center">
      <h1 className="mb-3 text-5xl font-bold text-teal-600">
        {scoreInPercent >= 70 ? "You Did It! 🎉" : "Good Effort! 👍"}
      </h1>
      <p className="mb-6 text-2xl font-semibold">
        {scoreInPercent >= 70
          ? `You're a ${gameType === "colors" ? "color matching" : "shape puzzle"} star! 🌟`
          : "Give it another try, you've got this!"}
      </p>

      <p className="mb-12 text-xl text-gray-700">
        Your Score: {score} out of {maxScore}
      </p>
      <div className="flex flex-col flex-wrap justify-center gap-6 md:flex-row">
        <Link
          data-cuelume-press
          data-cuelume-release
          href={gameType === "shapes" ? "/colors" : "/shapes"}
          className="order-last cursor-pointer rounded-full bg-[#79ee8d] px-8 py-3 text-xl font-semibold text-white transition-transform active:scale-[0.98] md:order-none md:min-w-[290px]"
        >
          Play {gameType === "shapes" ? "Color Matching" : "Shape Puzzle"}
        </Link>
        <button
          data-cuelume-press
          data-cuelume-release
          onClick={() => resetGame()}
          className="cursor-pointer rounded-full bg-[#0c098c] px-8 py-3 text-xl font-semibold text-white transition-transform active:scale-[0.98] md:min-w-[290px]"
        >
          Play {gameType === "shapes" ? "Shape Puzzle" : "Color Matching"} Again
        </button>
      </div>
    </div>
  );
}
