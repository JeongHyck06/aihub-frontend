import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type CardProps = HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[20px] border border-[#e8edf5] bg-white shadow-[0_16px_40px_rgba(15,82,245,0.03)]",
        className,
      )}
      {...props}
    />
  );
}
