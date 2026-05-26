import { PLATFORM_STATS } from "@/constants/home";

export function StatList() {
  return (
    <dl className="grid rounded-[20px] border border-[#e8edf5] bg-white sm:grid-cols-2 lg:grid-cols-4">
      {PLATFORM_STATS.map((stat, index) => (
        <div
          className="relative px-6 py-5 sm:px-10 lg:px-[60px]"
          key={stat.label}
        >
          {index > 0 ? (
            <div
              aria-hidden="true"
              className="absolute left-0 top-1/2 hidden h-[52px] w-px -translate-y-1/2 bg-[#e8edf5] lg:block"
            />
          ) : null}
          <dt className="mt-1 text-[13px] font-medium leading-5 text-[#8c99ab]">
            {stat.label}
          </dt>
          <dd className="order-first text-[32px] font-extrabold leading-10 text-blue-600">
            {stat.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
