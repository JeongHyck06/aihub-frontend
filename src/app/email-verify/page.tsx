import { EmailVerifySection } from "@/components/sections/email-verify-section";
import { EMAIL_VERIFY_CONTENT } from "@/constants/email-verify";

type EmailVerifyPageProps = {
  searchParams?: Promise<{
    email?: string | string[];
  }>;
};

export default async function EmailVerifyPage({ searchParams }: EmailVerifyPageProps) {
  const params = await searchParams;
  const emailParam = params?.email;
  const email = Array.isArray(emailParam) ? emailParam[0] : emailParam;

  return (
    <main>
      <EmailVerifySection email={email || EMAIL_VERIFY_CONTENT.defaultEmail} />
    </main>
  );
}
