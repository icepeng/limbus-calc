import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import clsx from "clsx";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={clsx("slider", className)}
    data-part="root"
    data-recipe
    {...props}
  >
    <SliderPrimitive.Track className="slider" data-part="track">
      <SliderPrimitive.Range className="slider" data-part="range" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="slider" data-part="thumb" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
