"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type ProfileAvatarProps = {
  name: string;
  imageUrl?: string;
  href?: string;
  size?: "sm" | "md";
  className?: string;
};

const sizeClassName = {
  sm: "h-11 w-11 text-sm",
  md: "h-[88px] w-[88px] text-2xl",
};

export function ProfileAvatar({
  name,
  imageUrl,
  href = "/profile",
  size = "sm",
  className,
}: ProfileAvatarProps) {
  const initial = name.trim().charAt(0).toUpperCase() || "?";
  const sizeClasses = sizeClassName[size];

  const avatar = imageUrl ? (
    <Image
      alt={`${name} 프로필 이미지`}
      className={cn("rounded-full object-cover", sizeClasses)}
      height={size === "sm" ? 44 : 88}
      src={imageUrl}
      unoptimized
      width={size === "sm" ? 44 : 88}
    />
  ) : (
    <span
      aria-hidden
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-[#ecf1ff] font-extrabold text-blue-600",
        sizeClasses,
      )}
    >
      {initial}
    </span>
  );

  return (
    <Link
      aria-label={`${name} 프로필 보기`}
      className={cn(
        "inline-flex shrink-0 overflow-hidden rounded-full ring-2 ring-transparent transition-shadow hover:ring-blue-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2",
        className,
      )}
      href={href}
    >
      {avatar}
    </Link>
  );
}
