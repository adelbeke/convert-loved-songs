import { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

type Props = PropsWithChildren & {
  className?: string;
  disabled?: boolean;
  onClick: () => void;
};

export const Button = ({ children, disabled, className, onClick }: Props) => {
  return (
    <button
      className={twMerge(
        "flex flex-row items-center gap-1 h-10 px-2 rounded-lg bg-transparent shadow-primary shadow-[0_0px_150px_0px_rgba(0,0,0,0.5)] text-sm",
        className,
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
