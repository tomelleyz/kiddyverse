import { useState, useEffect } from "react";

const allColors = [
  { name: "Red", hex: "#FF0000" },
  { name: "Green", hex: "#00FF00" },
  { name: "Blue", hex: "#0000FF" },
  { name: "Yellow", hex: "#FFFF00" },
  { name: "Orange", hex: "#FFA500" },
  { name: "Purple", hex: "#800080" },
  { name: "Pink", hex: "#FFC0CB" },
  { name: "Brown", hex: "#A52A2A" },
  { name: "Black", hex: "#000000" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Gray", hex: "#808080" },
  { name: "Cyan", hex: "#00FFFF" },
  { name: "Magenta", hex: "#FF00FF" },
  { name: "Lime", hex: "#BFFF00" },
  { name: "Sky Blue", hex: "#87CEEB" },
  { name: "Turquoise", hex: "#40E0D0" },
  { name: "Peach", hex: "#FFDAB9" },
  { name: "Gold", hex: "#FFD700" },
  { name: "Silver", hex: "#C0C0C0" },
  { name: "Navy", hex: "#000080" },
];

export default function GameScreen() {
  const [score, setScore] = useState(0);
  const [remainingColors, setRemainingColors] = useState([...allColors]);
  const [currentOptions, setCurrentOptions] = useState([]);
  const [targetColor, setTargetColor] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [showCorrect, setShowCorrect] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);

  const selectNewRound = () => {
    if (remainingColors.length === 0) {
      setGameComplete(true);
      return;
    }

    // Select target color from remaining colors
    const targetIndex = Math.floor(Math.random() * remainingColors.length);
    const target = remainingColors[targetIndex];

    // Get 3 other random colors from all colors (excluding target)
    const otherColors = allColors.filter((color) => color.name !== target.name);
    const shuffledOthers = otherColors.sort(() => 0.5 - Math.random());
    const selectedOthers = shuffledOthers.slice(0, 3);

    // Combine and shuffle options
    const options = [target, ...selectedOthers].sort(() => 0.5 - Math.random());

    setTargetColor(target);
    setCurrentOptions(options);
    setAttempts(0);
    setShowCorrect(false);
  };

  const handleColorClick = (clickedColor) => {
    if (showCorrect) return;

    if (clickedColor.name === targetColor.name) {
      setScore(score + 1);
      setRemainingColors(
        remainingColors.filter((color) => color.name !== targetColor.name),
      );
      setTimeout(() => selectNewRound(), 1000);
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      if (newAttempts >= 3) {
        setShowCorrect(true);
        setTimeout(() => {
          setRemainingColors(
            remainingColors.filter((color) => color.name !== targetColor.name),
          );
          selectNewRound();
        }, 3000);
      }
    }
  };

  const resetGame = () => {
    setScore(0);
    setRemainingColors([...allColors]);
    setAttempts(0);
    setShowCorrect(false);
    setGameComplete(false);
  };

  useEffect(() => {
    selectNewRound();
  }, []);

  if (gameComplete) {
    return (
      <div className="p-8 text-center">
        <h1 className="mb-4 text-4xl font-bold">🎉 Game Complete!</h1>
        <p className="mb-4 text-xl">
          Final Score: {score}/{allColors.length}
        </p>
        <button
          onClick={resetGame}
          className="rounded-lg bg-blue-500 px-6 py-3 text-lg text-white hover:bg-blue-600"
        >
          Play Again
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl p-8">
      <div className="mb-6 text-center">
        <h1 className="mb-2 text-3xl font-bold">Color Game</h1>
        <p className="text-lg">
          Score: {score}/{allColors.length}
        </p>
        <p className="text-lg">Colors remaining: {remainingColors.length}</p>
      </div>

      {targetColor && (
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-2xl font-bold">
            Find the color: {targetColor.name}
          </h2>
          {attempts > 0 && attempts < 3 && (
            <p className="text-red-500">
              Try again! ({3 - attempts} attempts left)
            </p>
          )}
        </div>
      )}

      <div className="mb-6 grid grid-cols-2 gap-4">
        {currentOptions.map((color, index) => (
          <div
            key={index}
            onClick={() => handleColorClick(color)}
            className={`h-32 w-full cursor-pointer rounded-lg border-2 border-gray-300 transition-all duration-200 hover:border-gray-500 ${showCorrect && color.name === targetColor.name ? "scale-110 animate-pulse" : ""} `}
            style={{
              backgroundColor: color.hex,
              border: color.hex === "#FFFFFF" ? "2px solid #000000" : undefined,
            }}
          />
        ))}
      </div>

      {showCorrect && (
        <div className="text-center">
          <p className="text-xl font-bold text-green-600">
            The correct answer is {targetColor.name}!
          </p>
        </div>
      )}
    </div>
  );
}
