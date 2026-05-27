export type ProfileStat = {
  label: string;
  value: string;
};

export type ProfileTab = {
  label: string;
  value: string;
};

export type NotificationSetting = {
  type: string;
  label: string;
  enabled: boolean;
};

export type ProfileUser = {
  name: string;
  email: string;
  displayName: string;
  bio: string;
  profileImageUrl?: string | null;
  stats: ProfileStat[];
  notifications: NotificationSetting[];
};
