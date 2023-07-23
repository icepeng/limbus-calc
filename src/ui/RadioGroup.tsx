"use client";

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import * as React from "react";

import clsx from "clsx";

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={clsx("radio-group", className)}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

interface RadioStyleProps {
  /**
   * @default neutral
   */
  variant?: "neutral" | "primary";

  label?: string;

  className?: string;
}

function radioVariants(props: RadioStyleProps) {
  const { variant = "neutral" } = props;
  return {
    className: clsx("radio", props.className),
    "data-variant": variant,
    "data-recipe": "",
  };
}

export interface RadioProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>,
    RadioStyleProps {}

const Radio = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioProps
>(({ className, label, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      {...radioVariants({ className })}
      data-part="root"
      {...props}
    >
      <div className="radio" data-part="control">
        <RadioGroupPrimitive.Indicator className="radio" data-part="icon" />
      </div>
      <span className="radio body-small" data-part="label">
        {label}
      </span>
    </RadioGroupPrimitive.Item>
  );
});
Radio.displayName = RadioGroupPrimitive.Item.displayName;

export { Radio, RadioGroup };
