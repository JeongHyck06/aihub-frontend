"use client";

import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type ToggleProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> & {
  pressed: boolean;
  onPressedChange?: (pressed: boolean) => void;
};

export function Toggle({
  pressed,
  className,
  onClick,
  onPressedChange,
  ...props
}: ToggleProps) {
  return (
    <button
      aria-pressed={pressed}
      className={cn(
        "relative h-7 w-12 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2",
        pressed ? "bg-blue-600" : "bg-[#e0e5f0]",
        className,
      )}
      onClick={(event) => {
        onPressedChange?.(!pressed);
        onClick?.(event);
      }}
      type="button"
      {...props}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute top-1 h-5 w-5 rounded-full bg-white transition-transform",
          pressed ? "left-[22px]" : "left-1.5",
        )}
      />
    </button>
  );
}
