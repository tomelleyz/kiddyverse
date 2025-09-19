import { useEffect, useState } from "react";
import { motion } from "motion/react";
import GameProgressBar from "./GameProgressBar";
import GameCompleteScreen from "./GameCompleteScreen";

const allColors = [
  { name: "Red", hexcode: "#FF0000" },
  { name: "Green", hexcode: "#00FF00" },
  { name: "Blue", hexcode: "#0000FF" },
  { name: "Yellow", hexcode: "#FFFF00" },
  { name: "Orange", hexcode: "#FFA500" },
  { name: "Purple", hexcode: "#800080" },
  { name: "Pink", hexcode: "#FFC0CB" },
  { name: "Brown", hexcode: "#A52A2A" },
  { name: "Black", hexcode: "#000000" },
  { name: "White", hexcode: "#FFFFFF" },
  { name: "Gray", hexcode: "#808080" },
  { name: "Cyan", hexcode: "#00FFFF" },
  { name: "Magenta", hexcode: "#FF00FF" },
  { name: "Lime", hexcode: "#BFFF00" },
  { name: "Sky Blue", hexcode: "#87CEEB" },
  { name: "Turquoise", hexcode: "#40E0D0" },
  { name: "Peach", hexcode: "#FFDAB9" },
  { name: "Gold", hexcode: "#FFD700" },
  { name: "Silver", hexcode: "#C0C0C0" },
  { name: "Navy", hexcode: "#000080" },
];

const sounds = {
  correctAnswer: new Audio("/assets/sounds/correct-answer.mp3"),
  wrongBuzzer: new Audio("/assets/sounds/wrong-buzzer.mp3"),
};

const playSound = (name) => {
  sounds[name].currentTime = 0;
  sounds[name].play();
};

export default function ColorGameScreen() {
  const [score, setScore] = useState(0);
  const [targetColor, setTargetColor] = useState(null);
  const [colorsNotYetAsked, setColorsNotYetAsked] = useState([...allColors]);
  const [colorsAlreadyAsked, setColorsAlreadyAsked] = useState([]);
  const [displayedOptions, setDisplayedOptions] = useState([]);
  const [attempts, setAttempts] = useState([0]);
  const [showCorrectColor, setShowCorrectColor] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);

  function startNewRound() {
    if (colorsNotYetAsked.length === 0) {
      setGameCompleted(true);
      setTargetColor(null);
      setColorsNotYetAsked([...allColors]);
      setColorsAlreadyAsked([]);
      return;
    }

    const selectedColor =
      colorsNotYetAsked[Math.floor(Math.random() * colorsNotYetAsked.length)];
    const excludedColors = [...colorsAlreadyAsked, selectedColor];
    const remainingColors = colorsNotYetAsked.filter(
      (color) => color.name !== selectedColor.name,
    );

    function shuffleArray(arr) {
      const array = [...arr];
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    const possibleColorOptions = allColors.filter(
      (color) => color.name !== selectedColor.name,
    );
    const shuffledColorOptions = shuffleArray(possibleColorOptions);
    const colorOptions = shuffledColorOptions.slice(0, 3);
    const colorOptionsAndSelectedColor = shuffleArray([
      ...colorOptions,
      selectedColor,
    ]);

    setAttempts(0);
    setShowCorrectColor(false);
    setTargetColor(selectedColor);
    setColorsAlreadyAsked(excludedColors);
    setColorsNotYetAsked(remainingColors);
    setDisplayedOptions(colorOptionsAndSelectedColor);
  }

  const handleColorClick = (clickedColor) => {
    if (clickedColor.name === targetColor.name) {
      setScore((prevScore) => prevScore + 1);
      playSound("correctAnswer");
      startNewRound();
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      playSound("wrongBuzzer");

      if (newAttempts >= 3) {
        setShowCorrectColor(true);
        setTimeout(() => {
          startNewRound();
        }, 3000);
      }
    }
  };

  const resetGame = () => {
    setScore(0);
    startNewRound();
    setGameCompleted(false);
  };

  useEffect(() => {
    startNewRound();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-8">
      {gameCompleted ? (
        <GameCompleteScreen
          score={score}
          all={allColors}
          resetGame={resetGame}
        />
      ) : (
        <>
          <GameProgressBar alreadyAsked={colorsAlreadyAsked} all={allColors} />

          <div className="mx-auto max-w-2xl">
            {targetColor && (
              <motion.h1
                layout="preserve-aspect"
                id="colorQuiz"
                className="mx-auto mb-6 w-fit text-4xl font-semibold text-teal-600"
              >
                Can you find the{" "}
                <motion.span
                  key={targetColor.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, ease: "easeOut" }}
                >
                  <span className="lowercase">{targetColor.name}</span>
                  <span
                    className="ml-1 inline-block size-7 rounded-xs border border-gray-400"
                    style={{ backgroundColor: targetColor.hexcode }}
                  ></span>{" "}
                </motion.span>
                colour?
              </motion.h1>
            )}
            <div className="grid grid-cols-2 gap-6 sm:gap-12">
              {displayedOptions.map((color) => (
                <button
                  key={color.name}
                  onClick={() => handleColorClick(color)}
                  className={`h-36 w-full cursor-pointer rounded-xl shadow-lg outline-offset-2 outline-gray-700 transition-[outline,scale,opacity] hover:outline-2 ${showCorrectColor && color.name === targetColor.name ? "scale-110" : ""} ${showCorrectColor && color.name !== targetColor.name ? "opacity-30" : ""}`}
                  style={{ backgroundColor: color.hexcode }}
                ></button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
