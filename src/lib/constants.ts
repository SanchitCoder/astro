/** Contact details — Gurudev Anand */
export const BRAND_NAME = 'Gurudev Anand';
export const GURU_NAME = 'Gurudev Anand';

export const PHONE = '+91 98763 44400';
export const PHONE_TEL = 'tel:+919876344400';
export const EMAIL = 'info@gurudev-anand.com';
export const EMAIL_MAILTO = `mailto:${EMAIL}`;
export const WHATSAPP_URL = 'https://wa.me/919876344400';

/** Masterclass thank-you page — WhatsApp community invite */
export const MASTERCLASS_WHATSAPP_COMMUNITY_URL =
  import.meta.env.VITE_MASTERCLASS_WHATSAPP_COMMUNITY_URL ??
  'https://chat.whatsapp.com/Ey6uYBilZCaEOPB8tA9CX4';

/** Site-wide section backgrounds & CTA gradients */
export const THEME_DARK_BG =
  'linear-gradient(160deg, #001D48 0%, #002D60 40%, #003D78 70%, #001530 100%)';
export const THEME_GOLD_GRD =
  'linear-gradient(135deg, #F3B757 0%, #D88A22 50%, #9A5E14 100%)';
export const THEME_DARK_STRIP_BG =
  'linear-gradient(90deg, #001530 0%, #002D60 50%, #001530 100%)';

/** Hero / primary speaker — from project `image.png` */
export const GURU_IMG = '/guru-hero.png';

/** Meet your mentor / secondary portrait — from project `image copy.png` */
export const GURU_IMG_ABOUT = '/guru-about.png';

/** Bonus / resource card — from project `image copy 2.png` */
export const GURU_IMG_RESOURCE = '/guru-resource.png';

/** Testimonials gallery — from project `image copy 3.png` (cutout portrait) */
export const GURU_IMG_GALLERY = '/guru-gallery-cutout.png';

/** Vedic Sciences section — Jyotish, Vastu, Medical Astrology */
export const SCIENCE_IMG_JYOTISH = '/science-jyotish.jpeg';
export const SCIENCE_IMG_VASTU = '/science-vastu.jpeg';
export const SCIENCE_IMG_MEDICAL = '/science-medical.jpeg';

/** Normal consultation — sticky bar compares audio vs video from pricing */
export const PRICE_AUDIO_INR = 11_000;
export const PRICE_VIDEO_INR = 15_000;

/** n8n webhook — all site form submissions POST here as JSON */
export const N8N_WEBHOOK_URL =
  import.meta.env.VITE_N8N_WEBHOOK_URL ??
  'https://n8n.srv981435.hstgr.cloud/webhook/7a8cc40f-1c4a-4de0-8f76-019b04b2d3d1';

/** n8n webhook — chatbot questions in, assistant reply out */
export const N8N_CHAT_WEBHOOK_URL =
  import.meta.env.VITE_N8N_CHAT_WEBHOOK_URL ??
  'https://n8n.srv981435.hstgr.cloud/webhook/b4335600-531b-497e-a649-96359f84e2cd';
