import { Card } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import { PROFILE_TABS } from "@/constants/profile";
import type { ProfileUser } from "@/types/profile";

export type ProfileSettingsSectionProps = {
  user: ProfileUser;
};

export function ProfileSettingsSection({ user }: ProfileSettingsSectionProps) {
  return (
    <Card className="overflow-hidden rounded-3xl lg:min-h-[860px]">
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

      <form className="p-6 sm:p-10" id="profile-form">
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
            defaultValue={user.displayName}
            id="display-name"
            name="displayName"
            type="text"
          />
        </div>

        <div className="mt-4">
          <label className="text-sm font-bold leading-5 text-[#384252]" htmlFor="bio">
            자기소개
          </label>
          <textarea
            className="mt-1.5 min-h-[100px] w-full resize-none rounded-[14px] border border-[#e0e5f0] bg-white px-6 py-4 text-sm font-medium text-[#0d121a] placeholder:text-[#8c99ab] focus:outline-none focus:ring-2 focus:ring-blue-600"
            defaultValue={user.bio}
            id="bio"
            name="bio"
          />
        </div>

        <h2 className="mt-5 text-xl font-extrabold leading-7 text-[#0d121a]">
          알림 설정
        </h2>

        <div className="mt-3 space-y-5">
          {user.notifications.map((notification) => (
            <div
              className="flex items-center justify-between gap-4"
              key={notification.label}
            >
              <span className="text-[15px] font-medium leading-5 text-[#384252]">
                {notification.label}
              </span>
              <Toggle
                aria-label={`${notification.label} ${notification.enabled ? "끄기" : "켜기"}`}
                pressed={notification.enabled}
              />
            </div>
          ))}
        </div>

        {/* TODO: 사용자 프로필 저장 API가 준비되면 form action을 연결합니다. */}
        <button
          className="mt-[292px] h-[52px] w-full rounded-[14px] bg-blue-600 text-[15px] font-extrabold text-white transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 max-lg:mt-12"
          type="submit"
        >
          변경사항 저장
        </button>
      </form>
    </Card>
  );
}
