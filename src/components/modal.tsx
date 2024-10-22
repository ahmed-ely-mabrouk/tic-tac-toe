import { Button } from "./button";

interface IModal {
  winner: string;
  onReset: () => void;
}
export const Modal = ({ winner, onReset }: IModal) => {
  return (
    <div className="w-screen h-screen absolute top-0 bottom-0 right-0 bg-black bg-opacity-45 flex items-center justify-center">
      <div className="w-[450px] bg-light-gray rounded-xl p-4">
        {winner !== "Draw" ? (
          <div className="flex items-center justify-center">
            <img
              src={`/icons/${winner}.png`}
              alt={`tic tac toe ${winner}`}
              className="w-6 h-6 mr-2"
            />
            <h1 className="text-2xl text-black">won this round !</h1>
          </div>
        ) : (
          <h1 className="text-2xl text-black">Draw :/</h1>
        )}
        <div className="mt-8">
          <Button onClick={onReset} text="Reset Game" />
        </div>
      </div>
    </div>
  );
};
