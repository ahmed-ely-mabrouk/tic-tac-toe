interface IScore {
  x: number;
  o: number;
}
export const Score = ({ x, o }: IScore) => {
  return (
    <div className="flex items-center font-semibold text-xl">
      X
      <div className="w-7 h-8 bg-light-gray text-icon-blue mr-3 ml-1 rounded-md">
        {x}
      </div>
      O
      <div className="w-7 h-8 bg-light-gray text-icon-blue ml-1 rounded-md">
        {o}
      </div>
    </div>
  );
};
