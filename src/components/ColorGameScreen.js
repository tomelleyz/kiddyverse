import { useEffect, useState } from "react";
import { motion } from "motion/react";

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
        <div className="mx-auto max-w-2xl">
          <h1 className="text-5xl font-bold text-teal-600">
            🎉 You Did It! 🎉
          </h1>
          <p className="mb-6 text-2xl font-semibold">
            You&apos;re a Color Matching Star! 🌟
          </p>

          <p className="mb-12 text-xl text-gray-700">
            Your Score: {score} out of {allColors.length}
          </p>
          <button
            onClick={resetGame}
            className="cursor-pointer rounded-full bg-gradient-to-r from-[#79ee8d] to-[#0c098c] px-8 py-3 text-xl font-semibold text-white transition-transform duration-300 hover:scale-105"
          >
            Play Again
          </button>
        </div>
      ) : (
        <>
          <div className="mb-12 flex items-center justify-end gap-4">
            {/* <span className="block text-lg font-semibold text-gray-600">
              Score: {score}/{allColors.length}
            </span>
            <span className="block text-lg font-semibold text-gray-600">
              Remaining colours: {colorsNotYetAsked.length}
            </span> */}

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              id="Hourglass--Streamline-Flex"
              height="24"
              width="24"
              aria-hidden
            >
              <g>
                <path
                  fill="#79ee8d"
                  d="M17.074525714285716 13.723559999999999C15.729171428571428 12.61998857142857 13.90446857142857 12 12.001851428571428 12c-1.9026342857142855 0 -3.7273371428571425 0.6199885714285713 -5.072691428571429 1.7235599999999998 -3.297925714285714 2.705228571428571 -1.5378171428571428 6.009582857142857 -0.5639314285714285 9.205011428571428h11.273228571428572c0.9738857142857144 -3.1954285714285713 2.733942857142857 -6.499782857142857 -0.5639314285714285 -9.205011428571428Z"
                  strokeWidth="1.7143"
                ></path>
                <path
                  fill="#79ee8d"
                  d="M17.074525714285716 10.27644C15.729171428571428 11.380011428571429 13.90446857142857 12 12.001851428571428 12 10.099217142857142 12 8.274514285714286 11.380011428571429 6.92916 10.27644 3.6312342857142856 7.571211428571429 5.391342857142857 4.266908571428571 6.365228571428571 1.0714285714285714h11.273228571428572c0.9738857142857144 3.19548 2.733942857142857 6.499782857142857 -0.5639314285714285 9.205011428571428Z"
                  strokeWidth="1.7143"
                ></path>
                <path
                  fill="#0c098c"
                  fillRule="evenodd"
                  d="M1.7142857142857142 1.5C1.7142857142857142 0.6715731428571429 2.3858571428571427 0 3.214285714285714 0h17.57142857142857c0.8283428571428572 0 1.5 0.6715731428571429 1.5 1.5 0 0.8284285714285714 -0.6716571428571428 1.5 -1.5 1.5h-1.3878857142857142l0.04988571428571428 0.1578c0.2576571428571428 0.8248114285714285 0.49199999999999994 1.7053714285714285 0.5771999999999999 2.597982857142857 0.08622857142857142 0.9017657142857143 0.023485714285714283 1.8420171428571428 -0.3334285714285714 2.773765714285714 -0.3588 0.9363085714285714 -0.9889714285714285 1.7972399999999997 -1.9374857142857143 2.5752685714285715 -0.4153714285714285 0.3408171428571428 -0.8677371428571428 0.6398742857142856 -1.348062857142857 0.8951828571428572 0.48032571428571424 0.25530857142857144 0.9326914285714286 0.5543657142857142 1.348062857142857 0.8951828571428572 0.9485142857142856 0.7780285714285713 1.5786857142857142 1.63896 1.9374857142857143 2.5752685714285715 0.3569142857142857 0.9317485714285714 0.41965714285714284 1.8719485714285715 0.3334285714285714 2.7738342857142855 -0.0852 0.8924571428571427 -0.31954285714285713 1.7730857142857142 -0.5771999999999999 2.5978285714285714 -0.016457142857142854 0.05262857142857143 -0.03308571428571429 0.10525714285714285 -0.04988571428571428 0.15788571428571427h1.3878857142857142c0.8283428571428572 0 1.5 0.6716571428571428 1.5 1.5s-0.6716571428571428 1.5 -1.5 1.5H3.214285714285714C2.3858571428571427 24 1.7142857142857142 23.328342857142857 1.7142857142857142 22.5s0.6715714285714285 -1.5 1.5 -1.5h1.3915714285714285c-0.016748571428571425 -0.05262857142857143 -0.03336 -0.10525714285714285 -0.0498 -0.15788571428571427 -0.25774285714285716 -0.8247428571428571 -0.49199999999999994 -1.7053714285714285 -0.5773542857142856 -2.5978285714285714 -0.08622857142857142 -0.9018857142857143 -0.0234 -1.842085714285714 0.3335485714285714 -2.7738342857142855 0.35871428571428565 -0.9363085714285714 0.9889028571428572 -1.7972399999999997 1.9373828571428569 -2.5752685714285715 0.4154742857142857 -0.3408171428571428 0.8677885714285715 -0.6398742857142856 1.3481142857142856 -0.8951828571428572 -0.48032571428571424 -0.25530857142857144 -0.9326399999999999 -0.5543657142857142 -1.3481142857142856 -0.8951828571428572 -0.94848 -0.7780285714285713 -1.5786685714285713 -1.63896 -1.9373828571428569 -2.5752685714285715 -0.3569485714285714 -0.9317485714285714 -0.41977714285714285 -1.872 -0.3335485714285714 -2.773765714285714 0.08535428571428572 -0.8926114285714285 0.31961142857142855 -1.7731714285714286 0.5773542857142856 -2.597982857142857L4.605857142857142 3H3.214285714285714C2.3858571428571427 3 1.7142857142857142 2.3284285714285713 1.7142857142857142 1.5ZM17.14280571428571 21H6.86088c-0.09010285714285714 -0.2694857142857143 -0.17723999999999998 -0.5336571428571428 -0.25950857142857137 -0.7969714285714284 -0.24312 -0.777942857142857 -0.4253828571428571 -1.4917714285714285 -0.4895485714285714 -2.1627428571428573 -0.06329142857142857 -0.6618857142857143 -0.008657142857142856 -1.25472 0.20148 -1.80324 0.20838857142857142 -0.5439428571428572 0.5948914285714285 -1.1104971428571428 1.2953657142857142 -1.6850914285714285 1.1354742857142857 -0.9314228571428571 2.7135942857142856 -1.4805257142857142 4.393182857142857 -1.4805257142857142 1.6795714285714285 0 3.2576914285714285 0.5491028571428571 4.393165714285714 1.4805257142857142 0.7004742857142856 0.5745942857142856 1.0869257142857143 1.1411485714285714 1.295382857142857 1.6850914285714285 0.21017142857142856 0.5485199999999999 0.2646857142857143 1.1413542857142855 0.2014285714285714 1.80324 -0.06411428571428572 0.6709714285714286 -0.2463428571428571 1.3847999999999998 -0.48960000000000004 2.1627428571428573 -0.08211428571428571 0.26331428571428567 -0.16937142857142856 0.5274857142857142 -0.2594228571428571 0.7969714285714284Zm0 -18H6.86088c-0.09010285714285714 0.2694342857142857 -0.17723999999999998 0.5337085714285714 -0.25950857142857137 0.7969542857142857 -0.24312 0.7780114285714286 -0.4253828571428571 1.4917542857142856 -0.4895485714285714 2.1628114285714286 -0.06329142857142857 0.6619028571428571 -0.008657142857142856 1.2546685714285715 0.20148 1.8031885714285714 0.20838857142857142 0.5439428571428572 0.5948914285714285 1.1104971428571428 1.2953657142857142 1.6850914285714285 1.1354742857142857 0.9314228571428571 2.7135942857142856 1.4805257142857142 4.393182857142857 1.4805257142857142 1.6795714285714285 0 3.2576914285714285 -0.5491028571428571 4.393165714285714 -1.4805257142857142 0.7004742857142856 -0.5745942857142856 1.0869257142857143 -1.1411485714285714 1.295382857142857 -1.6850914285714285 0.21017142857142856 -0.5485199999999999 0.2646857142857143 -1.1412857142857142 0.2014285714285714 -1.8031885714285714 -0.06411428571428572 -0.6710571428571429 -0.2463428571428571 -1.3847999999999998 -0.48960000000000004 -2.1628114285714286 -0.08211428571428571 -0.26324571428571425 -0.16937142857142856 -0.52752 -0.2594228571428571 -0.7969542857142857Z"
                  clipRule="evenodd"
                  strokeWidth="1.7143"
                ></path>
              </g>
            </svg>
            <div className="relative h-3 w-[150px] translate-z-0 overflow-hidden rounded-full bg-gray-900/70 sm:h-5 sm:w-[250px]">
              <span className="sr-only">
                Game progress:{" "}
                {(colorsAlreadyAsked.length / allColors.length) * 100}%
              </span>
              <div
                aria-hidden
                className="ease-[cubic-bezier(0.65, 0, 0.35, 1)] size-full bg-white transition-transform duration-[660ms]"
                style={{
                  transform: `translateX(-${100 - (colorsAlreadyAsked.length / allColors.length) * 100}%)`,
                }}
              ></div>
            </div>
          </div>

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
                  transition={{ delay: 0.3 }}
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
