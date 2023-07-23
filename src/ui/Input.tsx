import * as React from "react";

import clsx from "clsx";

interface InputStyleProps {
  /**
   * @default outlined
   */
  variant?: "outline" | "underline";

  invalid?: boolean;

  className?: string;
}

function inputVariants(props: InputStyleProps) {
  const { variant = "outlined", invalid = false } = props;
  return {
    className: clsx("input", props.className),
    "data-style": variant,
    "data-invalid": invalid ? "" : undefined,
    "data-recipe": "",
  };
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    InputStyleProps {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ variant, className, invalid, type, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        {...inputVariants({ variant, invalid, className })}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
