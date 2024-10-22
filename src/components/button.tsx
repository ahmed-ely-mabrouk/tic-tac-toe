interface IButton {
  onClick: () => void;
  text: string;
  isDisabled?: boolean;
  isSmall?: boolean;
}
export const Button = ({ text, isDisabled, isSmall, onClick }: IButton) => {
  const smallBtn = "text-sm px-2 border-4";
  const normalBtn = "text-lg px-8 py-1 border-4";
  return (
    <button
      onClick={onClick}
      className={` bg-icon-blue rounded-lg border-transparent font-bold ${
        isSmall ? smallBtn : normalBtn
      } ${
        isDisabled
          ? "opacity-50"
          : !isSmall &&
            " hover:bg-light-gray hover:text-icon-blue hover:border-icon-blue"
      }`}
    >
      {text}
    </button>
  );
};
