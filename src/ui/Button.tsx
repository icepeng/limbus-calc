import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import clsx from "clsx";

interface ButtonStyleProps {
  /**
   * @default neutral
   */
  variant?: "neutral" | "primary";

  /**
   * @default medium
   */
  size?: "small" | "medium" | "large";

  className?: string;
}

function buttonVariants(props: ButtonStyleProps) {
  const { variant = "neutral", size = "medium" } = props;
  return {
    className: clsx("button body-small-strong", props.className),
    "data-variant": variant,
    "data-size": size,
    "data-recipe": "",
  };
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonStyleProps {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        {...buttonVariants({ variant, size, className })}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";
