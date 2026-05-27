import { apiGet, apiPatch } from "@/shared/api/client";
import type { UpdateProfileRequest, UserProfile } from "@/features/auth/types/auth.types";

export function getMe() {
  return apiGet<UserProfile>("/me");
}

export function updateProfile(payload: UpdateProfileRequest) {
  return apiPatch<UserProfile>("/me", payload);
}
