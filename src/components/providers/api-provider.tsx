"use client";

import { useEffect, type ReactNode } from "react";
import { setAccessTokenGetter } from "@/shared/api";
import { getAccessToken } from "@/shared/utils/auth-session";

type ApiProviderProps = {
  children: ReactNode;
};

export function ApiProvider({ children }: ApiProviderProps) {
  useEffect(() => {
    setAccessTokenGetter(getAccessToken);
  }, []);

  return children;
}
