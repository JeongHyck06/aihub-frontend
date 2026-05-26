import { ModelRegisterGuideCard } from "@/components/common/model-register-guide-card";
import { ModelRegisterFormSection } from "@/components/sections/model-register-form-section";
import { MODEL_REGISTER_CONTENT } from "@/constants/model-register";

export function ModelRegisterPageSection() {
  return (
    <section className="bg-[#f8f9fb] py-10">
      <div className="mx-auto w-full max-w-[1200px] px-5 lg:px-0">
        <div aria-hidden="true" className="h-1.5 w-[72px] rounded-[3px] bg-blue-600" />
        <h1 className="mt-2.5 text-[32px] font-extrabold leading-tight text-[#0d121a] sm:text-4xl">
          {MODEL_REGISTER_CONTENT.title}
        </h1>
        <p className="mt-2 text-[17px] font-medium leading-7 text-[#616e80]">
          {MODEL_REGISTER_CONTENT.description}
        </p>

        <div className="mt-5 flex flex-col gap-10 lg:flex-row lg:items-start">
          <ModelRegisterFormSection />
          <ModelRegisterGuideCard />
        </div>
      </div>
    </section>
  );
}
