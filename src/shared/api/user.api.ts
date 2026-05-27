import { apiGet, apiPatch } from "@/shared/api/client";
import type { UpdateProfileRequest, UserProfile } from "@/features/auth/types/auth.types";
import type { NotificationSetting } from "@/types/profile";

export function getMe() {
  return apiGet<UserProfile>("/me");
}

export function updateProfile(payload: UpdateProfileRequest) {
  return apiPatch<UserProfile>("/me", payload);
}

export function getNotificationSettings() {
  return apiGet<NotificationSetting[]>("/me/notifications");
}

export function updateNotificationSettings(
  settings: Array<{ type: string; enabled: boolean }>,
) {
  return apiPatch<NotificationSetting[]>("/me/notifications", { settings });
}
