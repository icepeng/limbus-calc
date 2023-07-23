import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import clsx from "clsx";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={clsx("progress-bar", className)}
    data-part="track"
    data-recipe
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="progress-bar"
      data-part="fill"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
