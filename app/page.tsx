import {
  Hero,
  LabSection,
  ProductionSection,
  PublicationsSection,
  TeachingSection,
} from "@/components/home/HomeSections";

export default function Home() {
  return (
    <main className="mx-auto max-w-[1200px] px-4 sm:px-6">
      <Hero />
      <ProductionSection />
      <LabSection />
      <TeachingSection />
      <PublicationsSection />
    </main>
  );
}
