"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ModalProps = {
  open: boolean;
  title: string;
  children: ReactNode;
  className?: string;
  onClose: () => void;
};

export function Modal({ open, title, children, className, onClose }: ModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div
      aria-labelledby="dialog-title"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"
      role="dialog"
    >
      <div className={cn("w-full max-w-lg rounded-[20px] bg-white p-6", className)}>
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-xl font-extrabold text-slate-950" id="dialog-title">
            {title}
          </h2>
          <Button aria-label="모달 닫기" onClick={onClose} size="sm" variant="ghost">
            닫기
          </Button>
        </div>
        <div className="mt-5 text-sm leading-6 text-slate-600">{children}</div>
      </div>
    </div>
  );
}
