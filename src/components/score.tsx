interface IScore {
  x: number;
  o: number;
}
export const Score = ({ x, o }: IScore) => {
  return (
    <div className="flex items-center font-semibold text-2xl">
      X<div className="w-8 h-8 bg-light-gray text-icon-blue mx-2">{x}</div>O
      <div className="w-8 h-8 bg-light-gray text-icon-blue ml-2">{o}</div>
    </div>
  );
};
