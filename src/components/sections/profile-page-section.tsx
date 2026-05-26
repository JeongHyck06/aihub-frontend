import { ProfileSidebar } from "@/components/common/profile-sidebar";
import { ProfileSettingsSection } from "@/components/sections/profile-settings-section";
import { PROFILE_USER } from "@/constants/profile";

export function ProfilePageSection() {
  return (
    <section className="bg-[#f8f9fb] py-10">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6 px-5 lg:flex-row lg:items-start lg:px-0">
        <ProfileSidebar user={PROFILE_USER} />
        <div className="min-w-0 flex-1">
          <ProfileSettingsSection user={PROFILE_USER} />
        </div>
      </div>
    </section>
  );
}
