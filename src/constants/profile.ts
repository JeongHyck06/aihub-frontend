import type { ProfileTab, ProfileUser } from "@/types/profile";

export const PROFILE_USER: ProfileUser = {
  name: "Do it all",
  email: "dev@kakao.com",
  displayName: "나무를 탐색하고 있는 쿼카",
  bio: "나뭇잎 맛있다",
  stats: [
    { label: "팔로잉", value: "128" },
    { label: "팔로워", value: "2.4K" },
    { label: "리뷰", value: "47" },
  ],
  notifications: [
    { label: "내 리뷰에 댓글 시 알림", enabled: true },
    { label: "신규 팔로워 시 알림", enabled: false },
  ],
};

export const PROFILE_TABS: ProfileTab[] = [
  { label: "내 정보", value: "profile" },
  { label: "팔로워", value: "followers" },
  { label: "팔로잉", value: "following" },
  { label: "내 리뷰", value: "reviews" },
  { label: "내 댓글", value: "comments" },
];
