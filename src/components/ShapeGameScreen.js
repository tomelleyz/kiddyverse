import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import DraggableShape from "./DraggableShape";
import ShapeDropzone from "./ShapeDropzone";
import GameProgressBar from "./GameProgressBar";
import GameCompleteScreen from "./GameCompleteScreen";
import { DragDropProvider } from "@dnd-kit/react";

const allShapes = [
  { name: "Circle", clipPath: "circle(50% at 50% 50%)" },
  { name: "Square", clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" },
  { name: "Triangle", clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" },
  {
    name: "Rectangle",
    clipPath: "polygon(0% 50%, 100% 50%, 100% 100%, 0 100%)",
  },
  {
    name: "Trapezoid",
    clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
  },
  {
    name: "Parallelogram",
    clipPath: "polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)",
  },
  { name: "Rhombus", clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" },
  {
    name: "Pentagon",
    clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
  },
  {
    name: "Hexagon",
    clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
  },
  {
    name: "Heptagon",
    clipPath:
      "polygon(50% 0%, 90% 20%, 100% 60%, 75% 100%, 25% 100%, 0% 60%, 10% 20%)",
  },
  {
    name: "Octagon",
    clipPath:
      "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
  },
  {
    name: "Nonagon",
    clipPath:
      "polygon(50% 0%, 83% 12%, 100% 43%, 94% 78%, 68% 100%, 32% 100%, 6% 78%, 0% 43%, 17% 12%)",
  },
  {
    name: "Decagon",
    clipPath:
      "polygon(50% 0%, 80% 10%, 100% 35%, 100% 70%, 80% 90%, 50% 100%, 20% 90%, 0% 70%, 0% 35%, 20% 10%)",
  },
  {
    name: "Star",
    clipPath:
      "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
  },
  { name: "Oval", clipPath: "ellipse(25% 40% at 50% 50%)" },
  { name: "Semicircle", clipPath: "circle(50% at 50% 100%)" },
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
  const [targetShape, setTargetShape] = useState(null);
  const [shapesNotYetAsked, setShapesNotYetAsked] = useState([...allShapes]);
  const [shapesAlreadyAsked, setShapesAlreadyAsked] = useState([]);
  const [displayedOptions, setDisplayedOptions] = useState([]);
  const [attempts, setAttempts] = useState([0]);
  const [showCorrectShape, setShowCorrectShape] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);

  const [isDropped, setIsDropped] = useState(false);

  const startNewRound = () => {
    if (shapesNotYetAsked.length === 0) {
      setGameCompleted(true);
      setTargetShape(null);
      setShapesNotYetAsked([...allShapes]);
      setShapesAlreadyAsked([]);
      return;
    }

    const selectedShape =
      shapesNotYetAsked[Math.floor(Math.random() * shapesNotYetAsked.length)];
    const excludedShapes = [...shapesAlreadyAsked, selectedShape];
    const remainingShapes = shapesNotYetAsked.filter(
      (shape) => shape.name !== selectedShape.name,
    );

    function shuffleArray(arr) {
      const array = [...arr];
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    const possibleShapeOptions = allShapes.filter(
      (shape) => shape.name !== selectedShape.name,
    );
    const shuffledShapeOptions = shuffleArray(possibleShapeOptions);
    const shapeOptions = shuffledShapeOptions.slice(0, 2);
    const shapeOptionsAndSelectedShape = shuffleArray([
      ...shapeOptions,
      selectedShape,
    ]);

    setAttempts(0);
    setIsDropped(false);
    setShowCorrectShape(false);
    setTargetShape(selectedShape);
    setShapesAlreadyAsked(excludedShapes);
    setShapesNotYetAsked(remainingShapes);
    setDisplayedOptions(shapeOptionsAndSelectedShape);
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
          all={allShapes}
          resetGame={resetGame}
        />
      ) : (
        <>
          <GameProgressBar alreadyAsked={shapesAlreadyAsked} all={allShapes} />

          <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 sm:gap-8">
            {targetShape && (
              <motion.h1
                layout="preserve-aspect"
                id="colorQuiz"
                className="mx-auto w-fit text-4xl font-semibold text-teal-600"
              >
                Drag{" "}
                <motion.span
                  key={targetShape.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, ease: "easeOut" }}
                  className="lowercase"
                >
                  {targetShape.name}
                  <span
                    aria-hidden
                    className="ml-1 inline-block size-7 rounded-xs border border-gray-400 bg-[#8686FC]"
                    style={{ clipPath: targetShape.clipPath }}
                  ></span>
                </motion.span>{" "}
                into the outline.
              </motion.h1>
            )}

            <DragDropProvider
              onDragEnd={(event) => {
                if (event.canceled) return;

                const { source, target } = event.operation;

                if (target) {
                  if (source.id === targetShape.name) {
                    setIsDropped(target?.id === "shapeDropzone");
                    setScore((prevScore) => prevScore + 1);
                    playSound("correctAnswer");
                    setTimeout(() => {
                      startNewRound();
                    }, 3000);
                  } else {
                    const newAttempts = attempts + 1;
                    setAttempts(newAttempts);
                    playSound("wrongBuzzer");

                    if (newAttempts >= 2) {
                      setShowCorrectShape(true);
                      setTimeout(() => {
                        startNewRound();
                      }, 3000);
                    }
                  }
                }
              }}
            >
              <ShapeDropzone id="shapeDropzone" targetShape={targetShape}>
                {isDropped && <DraggableShape shape={targetShape} />}
              </ShapeDropzone>

              <div className="flex flex-wrap items-center gap-6 sm:flex-nowrap sm:gap-12">
                {displayedOptions.map((shape) => {
                  if (isDropped && shape.name === targetShape.name) {
                    return null;
                  }

                  return (
                    <motion.div
                      layout
                      key={shape.name}
                      initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                      animate={{ opacity: 1, y: 0, filter: "none" }}
                      transition={{ type: "tween", ease: "easeOut" }}
                      className="z-[2] col-start-1 row-start-1 rounded-sm"
                    >
                      <DraggableShape
                        shape={shape}
                        showCorrectShape={showCorrectShape}
                        targetShape={targetShape}
                      />
                    </motion.div>
                  );
                })}
              </div>
            </DragDropProvider>
          </div>
        </>
      )}
    </div>
  );
}
