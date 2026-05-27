"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Card } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import { PROFILE_TABS } from "@/constants/profile";
import type { ProfileUser } from "@/types/profile";

export type ProfileSettingsSectionProps = {
  user: ProfileUser;
  onSave: (payload: { displayName: string; bio: string }) => Promise<void> | void;
  onNotificationsChange: (
    settings: Array<{ type: string; enabled: boolean }>,
  ) => Promise<void> | void;
};

export function ProfileSettingsSection({
  user,
  onSave,
  onNotificationsChange,
}: ProfileSettingsSectionProps) {
  const [displayName, setDisplayName] = useState(user.displayName);
  const [bio, setBio] = useState(user.bio);
  const [notifications, setNotifications] = useState(user.notifications);
  const [saving, setSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setDisplayName(user.displayName);
    setBio(user.bio);
    setNotifications(user.notifications);
  }, [user]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError(null);
    setSavedMessage(null);
    try {
      await onSave({ displayName, bio });
      await onNotificationsChange(
        notifications.map(({ type, enabled }) => ({ type, enabled })),
      );
      setSavedMessage("변경사항이 저장되었습니다.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "저장에 실패했습니다.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="overflow-hidden rounded-3xl lg:min-h-[640px]">
      <div
        aria-label="프로필 메뉴"
        className="flex min-h-[52px] gap-2 overflow-x-auto border-b border-[#e8edf5] bg-[#f8f9fb] px-4 py-2"
        role="tablist"
      >
        {PROFILE_TABS.map((tab) => (
          <button
            aria-selected={tab.value === "profile"}
            className={
              tab.value === "profile"
                ? "h-9 shrink-0 rounded-[10px] bg-white px-6 text-sm font-bold text-blue-600 shadow-sm"
                : "h-9 shrink-0 rounded-[10px] px-6 text-sm font-semibold text-[#8c99ab] transition-colors hover:text-[#384252]"
            }
            key={tab.value}
            role="tab"
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>

      <form className="p-6 sm:p-10" id="profile-form" onSubmit={handleSubmit}>
        <h2 className="text-xl font-extrabold leading-7 text-[#0d121a]">기본 정보</h2>

        <div className="mt-4">
          <label
            className="text-sm font-bold leading-5 text-[#384252]"
            htmlFor="display-name"
          >
            닉네임
          </label>
          <input
            className="mt-1.5 h-[52px] w-full rounded-[14px] border border-[#e0e5f0] bg-white px-6 text-[15px] font-semibold text-[#0d121a] focus:outline-none focus:ring-2 focus:ring-blue-600"
            id="display-name"
            name="displayName"
            onChange={(event) => setDisplayName(event.target.value)}
            type="text"
            value={displayName}
          />
        </div>

        <div className="mt-4">
          <label className="text-sm font-bold leading-5 text-[#384252]" htmlFor="bio">
            자기소개
          </label>
          <textarea
            className="mt-1.5 min-h-[100px] w-full resize-none rounded-[14px] border border-[#e0e5f0] bg-white px-6 py-4 text-sm font-medium text-[#0d121a] placeholder:text-[#8c99ab] focus:outline-none focus:ring-2 focus:ring-blue-600"
            id="bio"
            name="bio"
            onChange={(event) => setBio(event.target.value)}
            value={bio}
          />
        </div>

        <h2 className="mt-5 text-xl font-extrabold leading-7 text-[#0d121a]">알림 설정</h2>

        <div className="mt-3 space-y-5">
          {notifications.map((notification) => (
            <div
              className="flex items-center justify-between gap-4"
              key={notification.type}
            >
              <span className="text-[15px] font-medium leading-5 text-[#384252]">
                {notification.label}
              </span>
              <Toggle
                aria-label={`${notification.label} ${notification.enabled ? "끄기" : "켜기"}`}
                onPressedChange={(enabled) =>
                  setNotifications((prev) =>
                    prev.map((item) =>
                      item.type === notification.type ? { ...item, enabled } : item,
                    ),
                  )
                }
                pressed={notification.enabled}
              />
            </div>
          ))}
        </div>

        {error ? (
          <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-500">
            {error}
          </p>
        ) : null}
        {savedMessage ? (
          <p className="mt-4 rounded-xl bg-[#ecf1ff] px-4 py-3 text-sm font-semibold text-blue-600">
            {savedMessage}
          </p>
        ) : null}

        <button
          className="mt-8 h-[52px] w-full rounded-[14px] bg-blue-600 text-[15px] font-extrabold text-white transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          disabled={saving}
          type="submit"
        >
          {saving ? "저장 중..." : "변경사항 저장"}
        </button>
      </form>
    </Card>
  );
}
