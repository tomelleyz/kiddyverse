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
      <button
        onClick={() => resetGame()}
        className="cursor-pointer rounded-full bg-gradient-to-r from-[#79ee8d] to-[#0c098c] px-8 py-3 text-xl font-semibold text-white transition-transform duration-300 hover:scale-105"
      >
        Play Again
      </button>
    </div>
  );
}
