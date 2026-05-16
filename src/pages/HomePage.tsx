import { HeroSection } from '../components/sections/HeroSection';
import { FeaturedInBar } from '../components/sections/FeaturedInBar';
import { ZodiacMarqueeSection } from '../components/sections/ZodiacMarqueeSection';
import { PainPointsSection } from '../components/sections/PainPointsSection';
import { ReframeSection } from '../components/sections/ReframeSection';
import { WhatYouLearnSection } from '../components/sections/WhatYouLearnSection';
import { MentorSection } from '../components/sections/MentorSection';
import { BonusSection } from '../components/sections/BonusSection';
import { TestimonialsGallerySection } from '../components/sections/TestimonialsGallerySection';
import { FAQSection } from '../components/sections/FAQSection';

export function HomePage() {
  return (
    <>
      <ZodiacMarqueeSection />
      <HeroSection />
      <FeaturedInBar />
      <PainPointsSection />
      <ReframeSection />
      <WhatYouLearnSection />
      <MentorSection />
      <BonusSection />
      <TestimonialsGallerySection />
      <FAQSection />
    </>
  );
}
