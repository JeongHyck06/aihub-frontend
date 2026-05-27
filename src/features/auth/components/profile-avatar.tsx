"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type ProfileAvatarSize = "sm" | "md";

export type ProfileAvatarBadgeProps = {
  name: string;
  imageUrl?: string;
  size?: ProfileAvatarSize;
  className?: string;
};

const sizeClassName: Record<ProfileAvatarSize, string> = {
  sm: "h-11 w-11 text-sm",
  md: "h-[88px] w-[88px] text-2xl",
};

const sizePixels: Record<ProfileAvatarSize, number> = {
  sm: 44,
  md: 88,
};

export function ProfileAvatarBadge({
  name,
  imageUrl,
  size = "sm",
  className,
}: ProfileAvatarBadgeProps) {
  const initial = name.trim().charAt(0).toUpperCase() || "?";
  const sizeClasses = sizeClassName[size];

  if (imageUrl) {
    return (
      <Image
        alt={`${name} 프로필 이미지`}
        className={cn("rounded-full object-cover", sizeClasses, className)}
        height={sizePixels[size]}
        src={imageUrl}
        unoptimized
        width={sizePixels[size]}
      />
    );
  }

  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-[#ecf1ff] font-extrabold text-blue-600",
        sizeClasses,
        className,
      )}
    >
      {initial}
    </span>
  );
}

export type ProfileAvatarProps = {
  name: string;
  imageUrl?: string;
  href?: string;
  size?: ProfileAvatarSize;
  className?: string;
};

export function ProfileAvatar({
  name,
  imageUrl,
  href = "/profile",
  size = "sm",
  className,
}: ProfileAvatarProps) {
  return (
    <Link
      aria-label={`${name} 프로필 보기`}
      className={cn(
        "inline-flex shrink-0 overflow-hidden rounded-full ring-2 ring-transparent transition-shadow hover:ring-blue-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2",
        className,
      )}
      href={href}
    >
      <ProfileAvatarBadge imageUrl={imageUrl} name={name} size={size} />
    </Link>
  );
}
