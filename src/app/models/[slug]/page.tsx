import { ModelPageContent } from "@/components/sections/model-page-content";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";

type ModelDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ModelDetailPage({ params }: ModelDetailPageProps) {
  const { slug } = await params;
  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <SiteHeader />
      <main>
        <ModelPageContent slug={slug} />
      </main>
      <SiteFooter />
    </div>
  );
}
