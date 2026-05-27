"use client";

import { useCallback, useEffect, useState } from "react";
import type { AuthUser } from "@/features/auth/types/auth.types";
import { clearAuthSession, getAuthUser } from "@/shared/utils/auth-session";

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isReady, setIsReady] = useState(false);

  const syncSession = useCallback(() => {
    setUser(getAuthUser());
    setIsReady(true);
  }, []);

  useEffect(() => {
    syncSession();
  }, [syncSession]);

  const signOut = useCallback(() => {
    clearAuthSession();
    setUser(null);
  }, []);

  return {
    user,
    isAuthenticated: Boolean(user),
    isReady,
    syncSession,
    signOut,
    displayName: user?.nickname ?? user?.displayName ?? null,
  };
}
