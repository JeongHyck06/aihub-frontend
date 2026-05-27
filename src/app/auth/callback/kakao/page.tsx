import { Suspense } from "react";
import { KakaoCallbackContent } from "@/features/auth/components/kakao-callback-content";

export default function KakaoCallbackPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f8f9fb] px-5">
      <Suspense
        fallback={
          <div className="w-full max-w-md rounded-3xl border border-[#e0e5f0] bg-white p-10 text-center">
            <h1 className="text-2xl font-extrabold text-[#0d121a]">로그인 처리 중</h1>
            <p className="mt-4 text-sm font-medium text-[#616e80]">
              카카오 계정 정보를 확인하고 있습니다…
            </p>
          </div>
        }
      >
        <KakaoCallbackContent />
      </Suspense>
    </main>
  );
}
