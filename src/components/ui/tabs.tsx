"use client";

import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type TabItem = {
  value: string;
  label: string;
};

export type TabsProps = {
  tabs: TabItem[];
  activeValue: string;
  ariaLabel: string;
  className?: string;
  onSelect?: (value: string) => void;
};

export function Tabs({
  tabs,
  activeValue,
  ariaLabel,
  className,
  onSelect,
}: TabsProps) {
  return (
    <div
      aria-label={ariaLabel}
      className={cn("inline-flex rounded-2xl bg-slate-100 p-1", className)}
      role="tablist"
    >
      {tabs.map((tab) => (
        <TabButton
          active={tab.value === activeValue}
          key={tab.value}
          onClick={() => onSelect?.(tab.value)}
        >
          {tab.label}
        </TabButton>
      ))}
    </div>
  );
}

type TabButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  active: boolean;
};

function TabButton({ active, className, ...props }: TabButtonProps) {
  return (
    <button
      aria-selected={active}
      className={cn(
        "h-9 rounded-xl px-4 text-sm font-extrabold transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600",
        active ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-800",
        className,
      )}
      role="tab"
      type="button"
      {...props}
    />
  );
}
