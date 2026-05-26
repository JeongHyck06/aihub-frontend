import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type ChipProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
};

export function Chip({ active = false, className, children, ...props }: ChipProps) {
  return (
    <button
      className={cn(
        "h-8 rounded-2xl border border-[#e0e5f0] bg-white px-4 text-[13px] font-bold transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2",
        active ? "text-blue-600" : "text-slate-700 hover:border-blue-200 hover:text-blue-600",
        className,
      )}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}
