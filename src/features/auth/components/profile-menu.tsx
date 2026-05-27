"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ProfileAvatarBadge } from "@/features/auth/components/profile-avatar";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { cn } from "@/lib/utils";

export type ProfileMenuProps = {
  className?: string;
};

export function ProfileMenu({ className }: ProfileMenuProps) {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const menuId = useId();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (!rootRef.current) return;
      if (rootRef.current.contains(event.target as Node)) return;
      close();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, close]);

  if (!user) return null;

  const handleSignOut = () => {
    close();
    signOut();
    router.push("/");
    router.refresh();
  };

  const isAdmin = user.role === "ADMIN";
  const displayName = user.nickname || user.displayName || user.email || "사용자";

  return (
    <div className={cn("relative", className)} ref={rootRef}>
      <button
        aria-controls={menuId}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={open ? "프로필 메뉴 닫기" : "프로필 메뉴 열기"}
        className="inline-flex shrink-0 overflow-hidden rounded-full ring-2 ring-transparent transition-shadow hover:ring-blue-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
        onClick={() => setOpen((prev) => !prev)}
        ref={triggerRef}
        type="button"
      >
        <ProfileAvatarBadge
          imageUrl={user.profileImageUrl ?? undefined}
          name={displayName}
          size="sm"
        />
      </button>

      {open && (
        <div
          aria-label="프로필 메뉴"
          className="absolute right-0 top-[calc(100%+8px)] z-50 w-64 overflow-hidden rounded-2xl border border-[#e8edf5] bg-white shadow-[0_12px_32px_rgba(13,18,26,0.12)]"
          id={menuId}
          role="menu"
        >
          <div className="flex items-center gap-3 px-4 py-3">
            <ProfileAvatarBadge
              imageUrl={user.profileImageUrl ?? undefined}
              name={displayName}
              size="sm"
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-[#0d121a]">
                {displayName}
              </p>
              {user.email && (
                <p className="truncate text-xs font-medium text-[#8c99ab]">
                  {user.email}
                </p>
              )}
            </div>
          </div>

          <div className="h-px bg-[#eef1f6]" />

          <ul className="py-1.5">
            {isAdmin && (
              <li>
                <Link
                  className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-[#8a680a] hover:bg-[#fdf2d2]"
                  href="/admin"
                  onClick={close}
                  role="menuitem"
                >
                  <span aria-hidden>★</span>
                  ADMIN 패널
                </Link>
              </li>
            )}
            <li>
              <Link
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-[#384252] hover:bg-[#f2f5fb]"
                href="/profile"
                onClick={close}
                role="menuitem"
              >
                계정 설정
              </Link>
            </li>
            <li>
              <button
                className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm font-semibold text-[#d4453a] hover:bg-[#fdf1ef]"
                onClick={handleSignOut}
                role="menuitem"
                type="button"
              >
                로그아웃
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
