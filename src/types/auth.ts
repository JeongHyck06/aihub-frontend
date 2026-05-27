export type AuthBrandContent = {
  headline: string[];
  description: string[];
  footer: string;
  stats?: {
    value: string;
    label: string;
  }[];
};

import type { OAuthProviderId } from "@/types/auth-api";

export type SocialProvider = {
  id: OAuthProviderId;
  label: string;
  iconLabel: string;
  variant: "light" | "dark" | "kakao";
};
