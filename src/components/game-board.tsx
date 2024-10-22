import { useState } from "react";

export const GameBoard = () => {
  const [boxes, setBoxes] = useState(Array(9).fill(""));
  const [isXTurn, setIsXTurn] = useState(true);

  const handleClick = (index: number) => {
    if (boxes[index]) {
      return;
    }
    const newBoxes = [...boxes];
    newBoxes[index] = isXTurn ? "x" : "o";
    setBoxes(newBoxes);
    setIsXTurn(!isXTurn);
  };

  const resetGame = () => {
    setBoxes(Array(9).fill(""));
    setIsXTurn(true);
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-2 w-[450px] mx-auto">
        {boxes.map((box, key) => (
          <div
            className={`h-[150px] border-4 bg-light-gray rounded-xl ${
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
      <div className="mt-10 mb-4 text-lg font-bold">
        <button
          onClick={() => resetGame()}
          className={` bg-icon-blue rounded-lg px-8 py-1 border-4 border-transparent ${" hover:bg-light-gray hover:text-icon-blue hover:border-icon-blue"}`}
        >
          Reset
        </button>
      </div>
    </div>
  );
};
