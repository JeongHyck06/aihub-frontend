"use client";

import { Button } from "@/components/ui/button";
import { ProfileAvatar } from "@/features/auth/components/profile-avatar";
import { useAuth } from "@/features/auth/hooks/use-auth";

export type SiteHeaderAuthProps = {
  activeHref?: string;
};

export function SiteHeaderAuth({ activeHref }: SiteHeaderAuthProps) {
  const { isAuthenticated, user } = useAuth();
  const isModelRegisterActive = activeHref === "/models/register";

  if (isAuthenticated && user) {
    return (
      <div className="flex items-center gap-2">
        <Button
          aria-current={isModelRegisterActive ? "page" : undefined}
          aria-label="모델 등록 페이지로 이동"
          className="h-11 px-5"
          href="/models/register"
          variant={isModelRegisterActive ? "primary" : "secondary"}
        >
          모델 등록
        </Button>
        <ProfileAvatar
          imageUrl={user.profileImageUrl ?? undefined}
          name={user.nickname}
          size="sm"
        />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        aria-current={isModelRegisterActive ? "page" : undefined}
        aria-label="모델 등록 페이지로 이동"
        className="h-11 px-5"
        href="/models/register"
        variant={isModelRegisterActive ? "primary" : "secondary"}
      >
        모델 등록
      </Button>
      <Button aria-label="로그인 페이지로 이동" className="h-11 px-7" href="/login">
        로그인
      </Button>
    </div>
  );
}
