import { useEffect, useState } from "react";
import { Modal } from "./modal";
import { Button } from "./button";
import { Score } from "./score";

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const GameBoard = () => {
  const [boxes, setBoxes] = useState<string[]>(Array(9).fill(""));
  const [isXTurn, setIsXTurn] = useState<boolean>(true);
  const [winner, setWinner] = useState<string>("");
  const [isTwoPlayers, setIsTwoPlayers] = useState<boolean>(true);
  const [score, setScore] = useState<number[]>([0, 0]);

  const updateScore = (winner: string) => {
    setScore((prevScore) => [
      winner === "x" ? prevScore[0] + 1 : prevScore[0],
      winner === "o" ? prevScore[1] + 1 : prevScore[1],
    ]);
  };
  const checkWinner = (boxes: string[]) => {
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (boxes[a] && boxes[a] === boxes[b] && boxes[a] === boxes[c]) {
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
    setBoxes(Array(9).fill(""));
    setIsXTurn(true);
    setWinner("");
  };
  useEffect(() => {
    if (!isXTurn && !winner && !isTwoPlayers) {
      const timer = setTimeout(() => computerMove(), 1000);
      return () => clearTimeout(timer);
    }
  }, [isXTurn, winner, isTwoPlayers]);
  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between">
        <span>Player {isXTurn ? "X" : "O"} is playing now.</span>
        <Button
          onClick={() => setIsTwoPlayers(!isTwoPlayers)}
          text="Computer playing"
          isDisabled={isTwoPlayers}
          isSmall
        />
      </div>
      <div className="grid grid-cols-3 gap-2 w-full">
        {boxes.map((box, key) => (
          <div
            className={`h-[150px] bg-light-gray box-border rounded-xl ${
              !box && "cursor-pointer hover:scale-105"
            }`}
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
        <Button onClick={resetGame} text="Reset Game" />
      </div>
      {winner && <Modal winner={winner} onReset={resetGame} />}
    </div>
  );
};
