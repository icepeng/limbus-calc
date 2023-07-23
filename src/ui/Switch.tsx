"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import clsx from "clsx";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={clsx("switch", className)}
    data-part="root"
    data-recipe
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb className="switch" data-part="thumb" />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
