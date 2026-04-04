import type { ReactElement } from "react";

type Variants = "primary" | "secondary";

interface ButtonProps {
  variants: Variants;
  text: string;
  startIcon?: ReactElement;
  className?: string;
  children?: string;
  endIcon?: ReactElement;
  onClick?: () => void;
}

const variantsStyle = {
  primary:
    "bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:shadow-lg hover:shadow-purple-200 hover:scale-105",
  secondary:
    "bg-white text-purple-600 border-2 border-purple-200 hover:bg-purple-50 hover:border-purple-300",
};

const defaultStyle =
  "flex gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 w-full sm:w-auto justify-center sm:justify-start";

export const Button = (props: ButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      className={`${variantsStyle[props.variants]} ${defaultStyle}`}
    >
      {props.text}
      {props.startIcon}
    </button>
  );
};
