"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/hooks/use-auth";

export function SiteHeaderAuth() {
  const { displayName } = useAuth();

  if (displayName) {
    return (
      <div className="flex items-center gap-2">
        <Button className="h-11 px-5" href="/models/register" variant="secondary">
          모델 등록
        </Button>
        <Button className="h-11 px-7" href="/profile">
          {displayName}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Button className="h-11 px-5" href="/models/register" variant="secondary">
        모델 등록
      </Button>
      <Button aria-label="로그인 페이지로 이동" className="h-11 px-7" href="/login">
        로그인
      </Button>
    </div>
  );
}
