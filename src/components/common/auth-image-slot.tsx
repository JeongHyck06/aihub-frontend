import Image from "next/image";
import { cn } from "@/lib/utils";

export type AuthImageSlotProps = {
  alt: string;
  className?: string;
  label?: string;
  src?: string;
};

export function AuthImageSlot({
  alt,
  className,
  label,
  src = "/globe.svg",
}: AuthImageSlotProps) {
  return (
    <span
      className={cn(
        "inline-flex h-5 w-5 items-center justify-center rounded-[10px] bg-[#f8f9fb]",
        className,
      )}
    >
      <Image alt={alt} height={14} src={src} width={14} />
      {label ? <span className="sr-only">{label}</span> : null}
    </span>
  );
}
