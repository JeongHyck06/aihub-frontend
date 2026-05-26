export type SectionHeadingProps = {
  title: string;
  description: string;
};

export function SectionHeading({ title, description }: SectionHeadingProps) {
  return (
    <div>
      <div aria-hidden="true" className="mb-2 h-1.5 w-14 rounded-[3px] bg-blue-600" />
      <h2 className="text-[28px] font-extrabold leading-tight text-[#0d121a] sm:text-[32px]">
        {title}
      </h2>
      <p className="mt-3 max-w-2xl text-base font-medium leading-relaxed text-[#616e80]">
        {description}
      </p>
    </div>
  );
}
