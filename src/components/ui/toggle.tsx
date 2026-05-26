"use client";

import type { ButtonHTMLAttributes } from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export type ToggleProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  pressed: boolean;
};

export function Toggle({ pressed, className, onClick, ...props }: ToggleProps) {
  const [isPressed, setIsPressed] = useState(pressed);

  return (
    <button
      aria-pressed={isPressed}
      className={cn(
        "relative h-7 w-12 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2",
        isPressed ? "bg-blue-600" : "bg-[#e0e5f0]",
        className,
      )}
      onClick={(event) => {
        setIsPressed((current) => !current);
        onClick?.(event);
      }}
      type="button"
      {...props}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute top-1 h-5 w-5 rounded-full bg-white transition-transform",
          isPressed ? "left-[22px]" : "left-1.5",
        )}
      />
    </button>
  );
}
