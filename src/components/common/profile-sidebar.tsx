import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { ProfileUser } from "@/types/profile";

export type ProfileSidebarProps = {
  user: ProfileUser;
};

export function ProfileSidebar({ user }: ProfileSidebarProps) {
  return (
    <Card className="rounded-3xl p-6 text-center lg:min-h-[860px] lg:w-[280px] lg:shrink-0">
      <div
        aria-label={`${user.name} 프로필 이미지`}
        className="mx-auto h-[88px] w-[88px] rounded-full bg-[#ecf1ff]"
        role="img"
      />
      <h1 className="mt-4 text-[22px] font-extrabold leading-7 text-[#0d121a]">
        {user.name}
      </h1>
      <p className="mt-1 text-[13px] font-medium leading-5 text-[#8c99ab]">
        {user.email}
      </p>

      <dl className="mt-9 grid grid-cols-3 rounded-[14px] border border-[#e8edf5] bg-[#f8f9fb] px-4 py-2.5 text-left">
        {user.stats.map((stat) => (
          <div key={stat.label}>
            <dt className="mt-1 text-xs font-medium leading-4 text-[#8c99ab]">
              {stat.label}
            </dt>
            <dd className="text-xl font-extrabold leading-7 text-[#0d121a]">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>

      <Button
        aria-label="프로필 편집"
        className="mt-5 h-11 w-full rounded-[14px] border border-blue-600 bg-white"
        href="#profile-form"
        variant="secondary"
      >
        프로필 편집
      </Button>
    </Card>
  );
}
