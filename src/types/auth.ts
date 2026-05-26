export type AuthBrandContent = {
  headline: string[];
  description: string[];
  footer: string;
  stats?: {
    value: string;
    label: string;
  }[];
};

export type SocialProvider = {
  label: string;
  iconLabel: string;
  variant: "light" | "dark" | "kakao";
};
