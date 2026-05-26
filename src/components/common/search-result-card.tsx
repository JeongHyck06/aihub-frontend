import Link from 'next/link';
import { Card } from '@/components/ui/card';
import type { SearchResultService } from '@/types/search';

export type SearchResultCardProps = {
    service: SearchResultService;
};

export function SearchResultCard({
    service,
}: SearchResultCardProps) {
    return (
        <Card className="min-h-60 p-6 transition-transform hover:-translate-y-1">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h3 className="text-[22px] font-extrabold leading-7 text-[#0d121a]">
                        {service.name}
                    </h3>
                    <p className="mt-2 text-[13px] font-semibold leading-5 text-[#8c99ab]">
                        {service.provider} · {service.price}
                    </p>
                </div>

                {service.bestMatch ? (
                    <span className="inline-flex h-[26px] shrink-0 items-center rounded-[13px] border border-[#9edbbd] bg-[#ebfcf5] px-2.5 text-[11px] font-extrabold leading-4 text-[#05754a]">
                        BEST MATCH
                    </span>
                ) : null}
            </div>

            <p className="mt-3 text-[13px] font-bold leading-5 text-[#f2991a]">
                ★ {service.rating.toFixed(1)}{' '}
                <span className="ml-2">
                    사용자 리뷰{' '}
                    {service.reviewCount.toLocaleString(
                        'ko-KR',
                    )}
                    +
                </span>
            </p>
            <p className="mt-3 text-[13px] font-medium leading-5 text-[#616e80]">
                {service.description}
            </p>

            <Link
                aria-label={`${service.name} 상세 보기`}
                className="mt-8 inline-flex h-10 items-center justify-center rounded-[10px] bg-[#ecf1ff] px-5 text-[13px] font-extrabold text-blue-600 transition-colors hover:bg-blue-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                href={service.href}
            >
                상세 보기 →
            </Link>
        </Card>
    );
}
