"use client";

import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { useAuth } from "@/features/auth/hooks/use-auth";

type RequireAuthProps = {
  children: ReactNode;
  requireAdmin?: boolean;
  redirectTo?: string;
};

export function RequireAuth({
  children,
  requireAdmin = false,
  redirectTo = "/login",
}: RequireAuthProps) {
  const router = useRouter();
  const { isAuthenticated, isReady, user } = useAuth();

  const isAdmin = user?.role === "ADMIN";
  const hasAccess = isAuthenticated && (!requireAdmin || isAdmin);

  useEffect(() => {
    if (!isReady) return;
    if (!isAuthenticated) {
      router.replace(redirectTo);
      return;
    }
    if (requireAdmin && !isAdmin) {
      router.replace("/");
    }
  }, [isAuthenticated, isAdmin, isReady, redirectTo, requireAdmin, router]);

  if (!isReady) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8f9fb]">
        <p className="text-sm font-medium text-[#616e80]">로딩 중…</p>
      </div>
    );
  }

  if (!hasAccess) {
    return null;
  }

  return children;
}
