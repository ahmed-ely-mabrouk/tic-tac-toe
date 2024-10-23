import { useEffect, useState } from "react";
import { Modal } from "./modal";
import { Button } from "./button";
import { Score } from "./score";
import { generateWinningCombinations } from "../utils/combinations";

export const GameBoard = () => {
  const defaultGrid = 3;
  const containerSize = 450;
  const [gridSize, setGridSize] = useState<number>(defaultGrid);
  const ratio = containerSize / gridSize;
  const [boxes, setBoxes] = useState<string[]>(
    Array(gridSize * gridSize).fill("")
  );
  const [isXTurn, setIsXTurn] = useState<boolean>(true);
  const [winner, setWinner] = useState<string>("");
  const [isTwoPlayers, setIsTwoPlayers] = useState<boolean>(true);
  const [score, setScore] = useState<number[]>([0, 0]);
  const combinations = generateWinningCombinations(gridSize);
  const [winningCombinations, setWinningCombinations] =
    useState<number[][]>(combinations);

  const updateScore = (winner: string) => {
    setScore((prevScore) => [
      winner === "x" ? prevScore[0] + 1 : prevScore[0],
      winner === "o" ? prevScore[1] + 1 : prevScore[1],
    ]);
  };
  const checkWinner = (boxes: string[]) => {
    for (let combination of winningCombinations) {
      const [a] = combination;
      if (boxes[a] && combination.every((index) => boxes[index] === boxes[a])) {
        console.log(combination);
        setWinner(boxes[a]);
        updateScore(boxes[a]);
        return;
      }
    }
    if (!boxes.includes("")) {
      setWinner("Draw");
    }
  };
  const handlePlay = (index: number | null) => {
    if (index === null) {
      return;
    }
    const newBoxes = [...boxes];
    newBoxes[index] = isXTurn ? "x" : "o";
    setBoxes(newBoxes);
    setIsXTurn(!isXTurn);
    checkWinner(newBoxes);
  };
  const handleClick = (index: number) => {
    if (boxes[index] || winner || (!isTwoPlayers && !isXTurn)) {
      return;
    }
    handlePlay(index);
  };
  const computerMove = () => {
    const emptyIndices = boxes
      .map((box, i) => (box === "" ? i : null))
      .filter((i) => i !== null);

    if (emptyIndices.length > 0 && !winner) {
      const randomIndex =
        emptyIndices[Math.floor(Math.random() * emptyIndices.length)];

      handlePlay(randomIndex);
    }
  };
  const resetGame = () => {
    setBoxes(Array(gridSize * gridSize).fill(""));
    setIsXTurn(true);
    setWinner("");
  };
  useEffect(() => {
    if (!isXTurn && !winner && !isTwoPlayers) {
      const timer = setTimeout(() => computerMove(), 1000);
      return () => clearTimeout(timer);
    }
  }, [isXTurn, winner, isTwoPlayers]);

  useEffect(() => {
    resetGame();
    setWinningCombinations(combinations);
  }, [gridSize]);
  return (
    <div className={`w-[${containerSize}px] mx-auto`}>
      <div className="mb-2 flex items-center justify-between">
        <span>Player {isXTurn ? "X" : "O"} is playing now.</span>
        <Button
          onClick={() => setIsTwoPlayers(!isTwoPlayers)}
          text="Computer playing"
          isDisabled={isTwoPlayers}
          isSmall
        />
      </div>
      <div
        className="grid gap-2 w-full"
        style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
      >
        {boxes.map((box, key) => (
          <div
            className={`bg-light-gray box-border rounded-xl  ${
              !box && "cursor-pointer hover:scale-105"
            }`}
            style={{ height: ratio + "px" }}
            key={key}
            onClick={() => handleClick(key)}
          >
            {box && (
              <img
                src={`/icons/${box}.png`}
                className="w-full h-full object-contain"
                alt={`tic tac toe ${box}`}
              />
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 mb-4 flex items-center justify-between">
        <Score x={score[0]} o={score[1]} />
        <div className="mx-2 text-left">
          <label>Grid:</label>
          <input
            type="number"
            value={gridSize}
            className="rounded-md ml-2 w-14 text-icon-blue font-extrabold px-2"
            onChange={(e: any) => setGridSize(e.target.value)}
            max={8}
            min={3}
          />
        </div>
        <Button onClick={resetGame} text="Reset" />
      </div>
      {winner && <Modal winner={winner} onReset={resetGame} />}
    </div>
  );
};
