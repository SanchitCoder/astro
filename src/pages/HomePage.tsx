import { useOutletContext } from 'react-router-dom';
import type { SiteOutletContext } from '../components/layout/SiteLayout';
import { HeroSection } from '../components/sections/HeroSection';
import { FeaturedInBar } from '../components/sections/FeaturedInBar';
import { ZodiacMarqueeSection } from '../components/sections/ZodiacMarqueeSection';
import { ReframeSection } from '../components/sections/ReframeSection';
import { WhatYouLearnSection } from '../components/sections/WhatYouLearnSection';
import { LifeAreasSection } from '../components/sections/LifeAreasSection';
import { VedicSciencesSection } from '../components/sections/VedicSciencesSection';
import { MentorSection } from '../components/sections/MentorSection';
import { BonusSection } from '../components/sections/BonusSection';
import { TestimonialsGallerySection } from '../components/sections/TestimonialsGallerySection';
import { FAQSection } from '../components/sections/FAQSection';
import { KundliCalculatorSection } from '../components/sections/KundliCalculatorSection';
import { ConsultCTASection } from '../components/sections/ConsultCTASection';
import { BlogSection } from '../components/sections/BlogSection';

export function HomePage() {
  const { onBook } = useOutletContext<SiteOutletContext>();

  return (
    <>
      <ZodiacMarqueeSection />
      <HeroSection onBook={onBook} />
      <FeaturedInBar />
      <LifeAreasSection />
      <WhatYouLearnSection />
      <VedicSciencesSection />
      <KundliCalculatorSection />
      <ReframeSection />
      <MentorSection />
      <ConsultCTASection onBook={onBook} />
      <TestimonialsGallerySection />
      <BlogSection />
      <BonusSection />
      <FAQSection />
    </>
  );
}
