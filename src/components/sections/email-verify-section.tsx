"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { VerificationCodeInput } from "@/components/common/verification-code-input";
import { Button } from "@/components/ui/button";
import { EMAIL_VERIFY_CONTENT } from "@/constants/email-verify";
import { normalizeAuthLoginResponse } from "@/features/auth/types/auth.types";
import { sendEmailCode, verifyEmail } from "@/shared/api";
import { saveAuthSession } from "@/shared/utils/auth-session";

export type EmailVerifySectionProps = {
  email: string;
  initialDevCode?: string | null;
  initialExpirySeconds?: number;
};

export function EmailVerifySection({
  email,
  initialDevCode,
  initialExpirySeconds,
}: EmailVerifySectionProps) {
  const router = useRouter();
  const [digits, setDigits] = useState<string[]>(EMAIL_VERIFY_CONTENT.initialCode);
  const [remainingSeconds, setRemainingSeconds] = useState(
    initialExpirySeconds ?? EMAIL_VERIFY_CONTENT.defaultExpirySeconds,
  );
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [devCode, setDevCode] = useState<string | null>(initialDevCode ?? null);

  const code = digits.join("");
  const isComplete = code.length === 6;
  const resendTime = useMemo(() => {
    const minutes = String(Math.floor(remainingSeconds / 60)).padStart(2, "0");
    const seconds = String(remainingSeconds % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  }, [remainingSeconds]);

  useEffect(() => {
    if (remainingSeconds <= 0) return;
    const timer = window.setInterval(() => {
      setRemainingSeconds((seconds) => seconds - 1);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [remainingSeconds]);

  const handleVerify = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isComplete || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const response = await verifyEmail(email, code);
      const normalized = normalizeAuthLoginResponse(response);
      saveAuthSession(normalized);
      setMessage("이메일 인증이 완료되었습니다. 프로필로 이동합니다.");
      window.setTimeout(() => router.push("/profile"), 500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "인증에 실패했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleResend = async () => {
    setError(null);
    setMessage(null);
    try {
      const response = await sendEmailCode(email);
      setRemainingSeconds(response.expiresInSeconds);
      setDigits(EMAIL_VERIFY_CONTENT.initialCode);
      setDevCode(response.devCode ?? null);
      setMessage(`${email}로 인증 코드를 다시 보냈습니다.`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "재전송에 실패했습니다.");
    }
  };

  return (
    <section className="min-h-screen bg-[#f8f9fb] px-5 py-6">
      <Link
        aria-label="AIHUB 홈"
        className="inline-block text-xl font-extrabold leading-6 text-blue-600"
        href="/"
      >
        AIHUB
      </Link>

      <div className="mx-auto mt-[118px] w-full max-w-[600px] max-sm:mt-16">
        <div className="mb-8">
          <p className="mb-2 text-[13px] font-semibold leading-5 text-[#8c99ab]">
            {EMAIL_VERIFY_CONTENT.stepLabel}
          </p>
          <div className="h-1.5 overflow-hidden rounded-[3px] bg-[#e0e5f0]">
            <div
              aria-hidden="true"
              className="h-full rounded-[3px] bg-blue-600"
              style={{ width: `${EMAIL_VERIFY_CONTENT.progressPercent}%` }}
            />
          </div>
        </div>

        <div className="rounded-3xl border border-[#e0e5f0] bg-white px-6 py-[54px] sm:px-[60px]">
          <h1 className="text-[32px] font-extrabold leading-10 text-[#0d121a]">
            {EMAIL_VERIFY_CONTENT.title}
          </h1>
          <div className="mt-12 space-y-1 text-[15px] font-medium leading-6 text-[#616e80]">
            <p>{email}으로 인증 코드를 발송했습니다.</p>
            <p>이메일을 확인하고 6자리 코드를 입력해주세요.</p>
            {devCode ? (
              <p className="text-xs font-bold text-blue-600">개발용 코드: {devCode}</p>
            ) : null}
          </div>

          <form className="mt-8" onSubmit={handleVerify}>
            <VerificationCodeInput onChange={setDigits} value={digits} />

            <Button
              className="mt-9 h-14 w-full rounded-[14px]"
              disabled={!isComplete || submitting}
              type="submit"
            >
              {submitting ? "인증 중..." : "인증 코드 확인하기"}
            </Button>
          </form>

          <Button
            className="mt-7 h-[52px] w-full rounded-[14px] border border-[#e0e5f0] bg-[#f8f9fb] text-[#384252]"
            disabled={remainingSeconds > 0}
            onClick={handleResend}
            type="button"
            variant="ghost"
          >
            {remainingSeconds > 0 ? `코드 재전송하기 (${resendTime})` : "코드 재전송하기"}
          </Button>

          {error ? (
            <p className="mt-4 text-sm font-semibold text-red-500" role="alert">{error}</p>
          ) : null}
          {message ? (
            <p className="mt-4 text-sm font-semibold text-blue-600" role="status">{message}</p>
          ) : null}

          <p className="mt-6 text-[13px] font-medium leading-5 text-[#8c99ab]">
            {EMAIL_VERIFY_CONTENT.helpText}
          </p>

          <div className="mt-3 text-center">
            <Link className="text-sm font-bold text-blue-600" href="/signup">
              ← 이전 단계로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
