import type { AuthUser } from "@/features/auth/types/auth.types";
import { PROFILE_USER } from "@/constants/profile";
import type { ProfileUser } from "@/types/profile";

export function mapAuthUserToProfileUser(user: AuthUser): ProfileUser {
  const nickname = user.displayName?.trim() || user.nickname?.trim() || "사용자";
  const email = user.email ?? "";

  return {
    name: nickname,
    email,
    displayName: nickname,
    profileImageUrl: user.profileImageUrl,
    bio: PROFILE_USER.bio,
    stats: PROFILE_USER.stats,
    notifications: PROFILE_USER.notifications,
  };
}
