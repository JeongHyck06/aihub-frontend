"use client";

import {
  useEffect,
  useRef,
  type ClipboardEvent,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";
import { cn } from "@/lib/utils";

export type VerificationCodeInputProps = {
  value: string[];
  onChange: (digits: string[]) => void;
};

export function VerificationCodeInput({ value, onChange }: VerificationCodeInputProps) {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const hasFocusedInitialInput = useRef(false);

  useEffect(() => {
    if (hasFocusedInitialInput.current) {
      return;
    }

    const firstEmptyIndex = value.findIndex((digit) => digit === "");
    inputRefs.current[firstEmptyIndex >= 0 ? firstEmptyIndex : 0]?.focus();
    hasFocusedInitialInput.current = true;
  }, [value]);

  const setDigit = (index: number, nextValue: string) => {
    const digit = nextValue.replace(/\D/g, "").slice(-1);
    const nextDigits = [...value];
    nextDigits[index] = digit;
    onChange(nextDigits);

    if (digit && index < value.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pastedDigits = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, value.length)
      .split("");

    if (pastedDigits.length === 0) {
      return;
    }

    const nextDigits = [...value];
    pastedDigits.forEach((digit, index) => {
      nextDigits[index] = digit;
    });
    onChange(nextDigits);
    inputRefs.current[Math.min(pastedDigits.length, value.length - 1)]?.focus();
  };

  return (
    <fieldset>
      <legend className="sr-only">6자리 이메일 인증 코드</legend>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-6 sm:gap-4">
        {value.map((digit, index) => (
          <div key={index}>
            <label className="sr-only" htmlFor={`verify-code-${index}`}>
              인증 코드 {index + 1}번째 자리
            </label>
            <input
              className={cn(
                "h-20 w-full rounded-[14px] border border-[#e0e5f0] bg-[#f8f9fb] text-center text-[32px] font-extrabold text-[#0d121a] focus:border-blue-600 focus:bg-[#ecf1ff] focus:outline-none focus:ring-2 focus:ring-blue-600",
              )}
              id={`verify-code-${index}`}
              inputMode="numeric"
              maxLength={1}
              name={`code-${index}`}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setDigit(index, event.target.value)
              }
              onKeyDown={(event) => handleKeyDown(index, event)}
              onPaste={handlePaste}
              pattern="[0-9]*"
              ref={(element) => {
                inputRefs.current[index] = element;
              }}
              type="text"
              value={digit}
            />
          </div>
        ))}
      </div>
    </fieldset>
  );
}
