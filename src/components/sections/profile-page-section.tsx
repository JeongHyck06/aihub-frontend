"use client";

import { useCallback, useEffect, useState } from "react";
import { ProfileSidebar } from "@/components/common/profile-sidebar";
import { ProfileSettingsSection } from "@/components/sections/profile-settings-section";
import {
  getMe,
  getNotificationSettings,
  updateNotificationSettings,
  updateProfile,
} from "@/shared/api";
import { setAuthSession } from "@/shared/utils/auth-session";
import type { AuthUser, UserProfile } from "@/features/auth/types/auth.types";
import type { NotificationSetting, ProfileUser } from "@/types/profile";

const STAT_LABELS = {
  following: "팔로잉",
  followers: "팔로워",
  reviews: "리뷰",
};

function mapToProfileUser(profile: UserProfile, notifications: NotificationSetting[]): ProfileUser {
  const stats = profile.stats ?? { following: 0, followers: 0, reviews: 0 };
  return {
    name: profile.name,
    email: profile.email,
    displayName: profile.displayName,
    bio: profile.bio ?? "",
    profileImageUrl: profile.profileImageUrl ?? null,
    stats: [
      { label: STAT_LABELS.following, value: String(stats.following) },
      { label: STAT_LABELS.followers, value: String(stats.followers) },
      { label: STAT_LABELS.reviews, value: String(stats.reviews) },
    ],
    notifications,
  };
}

export function ProfilePageSection() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [notifications, setNotifications] = useState<NotificationSetting[]>([]);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const [me, settings] = await Promise.all([getMe(), getNotificationSettings()]);
      setProfile(me);
      setNotifications(settings);
    } catch (err) {
      setError(err instanceof Error ? err.message : "내 정보를 불러오지 못했습니다.");
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleSave = async (input: { displayName: string; bio: string }) => {
    const updated = await updateProfile(input);
    setProfile(updated);
    syncAuthSession(updated);
  };

  const handleNotificationsChange = async (
    next: Array<{ type: string; enabled: boolean }>,
  ) => {
    const settings = await updateNotificationSettings(next);
    setNotifications(settings);
  };

  if (error) {
    return (
      <section className="bg-[#f8f9fb] py-16">
        <p className="text-center text-sm text-red-500">{error}</p>
      </section>
    );
  }

  if (!profile) {
    return (
      <section className="bg-[#f8f9fb] py-16">
        <p className="text-center text-sm text-[#8c99ab]">불러오는 중...</p>
      </section>
    );
  }

  const profileUser = mapToProfileUser(profile, notifications);

  return (
    <section className="bg-[#f8f9fb] py-10">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6 px-5 lg:flex-row lg:items-start lg:px-0">
        <ProfileSidebar user={profileUser} />
        <div className="min-w-0 flex-1">
          <ProfileSettingsSection
            onNotificationsChange={handleNotificationsChange}
            onSave={handleSave}
            user={profileUser}
          />
        </div>
      </div>
    </section>
  );
}

function syncAuthSession(profile: UserProfile) {
  const user: AuthUser = {
    id: profile.id,
    nickname: profile.displayName || profile.name,
    email: profile.email,
    role: profile.role,
    displayName: profile.displayName,
    profileImageUrl: profile.profileImageUrl ?? null,
  };
  setAuthSession({ user });
}
