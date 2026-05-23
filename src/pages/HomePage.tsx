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
  const { onConnect } = useOutletContext<SiteOutletContext>();

  return (
    <>
      <ZodiacMarqueeSection />
      <HeroSection />
      <FeaturedInBar />
      <LifeAreasSection onConnect={onConnect} />
      <WhatYouLearnSection />
      <VedicSciencesSection onConnect={onConnect} />
      <KundliCalculatorSection />
      <ReframeSection />
      <MentorSection />
      <ConsultCTASection />
      <TestimonialsGallerySection />
      <BlogSection onConnect={onConnect} />
      <BonusSection />
      <FAQSection onConnect={onConnect} />
    </>
  );
}
