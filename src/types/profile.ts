export type ProfileStat = {
  label: string;
  value: string;
};

export type ProfileTab = {
  label: string;
  value: string;
};

export type NotificationSetting = {
  label: string;
  enabled: boolean;
};

export type ProfileUser = {
  name: string;
  email: string;
  displayName: string;
  bio: string;
  stats: ProfileStat[];
  notifications: NotificationSetting[];
};
