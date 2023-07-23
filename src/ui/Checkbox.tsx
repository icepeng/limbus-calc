"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import clsx from "clsx";

interface CheckboxStyleProps {
  /**
   * @default neutral
   */
  variant?: "neutral" | "primary";

  label?: string;

  className?: string;
}

function checkboxVariants(props: CheckboxStyleProps) {
  const { variant = "neutral" } = props;
  return {
    className: clsx("checkbox", props.className),
    "data-variant": variant,
    "data-recipe": "",
  };
}

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    CheckboxStyleProps {}

export const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, variant, label, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    {...checkboxVariants({ className, variant })}
    data-part="root"
    {...props}
  >
    <div className="checkbox" data-part="control">
      <CheckboxPrimitive.Indicator className="checkbox">
        <Check className="checkbox" data-part="icon" />
      </CheckboxPrimitive.Indicator>
    </div>
    {label && (
      <span className="checkbox body-small" data-part="label">
        {label}
      </span>
    )}
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;
