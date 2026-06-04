import { useState, useEffect, type CSSProperties } from 'react';
import {
  THEME_DARK_BG,
  THEME_GOLD_GRD,
  THEME_DARK_STRIP_BG,
  GURU_IMG,
  GURU_IMG_RESOURCE,
} from '../lib/constants';
import './MegaWebinarPage.css';

/* Homepage-aligned palette (navy + gold) */
const P = '#D88A22';
const PL = '#F3B757';
const INK = '#1F2937';
const INK_BODY = '#4B5563';
const INK_MUTED = '#6B7280';
const LIGHT = '#F8F9FB';
const LIGHT_ALT = '#EFF1F5';
const BORDER = '#E5E7EB';
const CTA_TEXT = '#002D60';
const ACCENT = '#C62828';
const NAVY = '#001530';

const serif: CSSProperties = { fontFamily: "'Playfair Display', serif" };
const sans:  CSSProperties = { fontFamily: "'Poppins', sans-serif" };

/* ─────────────────────────────────────────
   Reusable sub-components
───────────────────────────────────────── */
function CTABtn({
  text = "Uncover Life's Secrets – Join Now",
  full = false,
  sm = false,
}: {
  text?: string;
  full?: boolean;
  sm?: boolean;
}) {
  return (
    <button
      className={`mw-btn${full ? ' mw-btn-full' : ''}${sm ? ' mw-btn-sm' : ''}`}
    >
      {text}
    </button>
  );
}

function Check({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '10px', fontSize: '14px', color: light ? 'rgba(255,255,255,0.9)' : INK_BODY, ...sans }}>
      <span style={{ color: P, fontWeight: '700', flexShrink: 0, marginTop: '1px' }}>✓</span>
      <span>{children}</span>
    </div>
  );
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: '12px', fontWeight: '600', color: P, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '10px', ...sans }}>
      {children}
    </p>
  );
}

/* ─────────────────────────────────────────
   Static data
───────────────────────────────────────── */
const INFO_CARDS = [
  { icon: '📅', label: 'Date',     val: 'June 14 & 15'  },
  { icon: '⏰', label: 'Time',     val: '7:00 PM'       },
  { icon: '📱', label: 'Platform', val: '2 Days Webinar' },
];

const TOPICS = ['Vedic Astrology Fundamentals', 'Birth Chart Reading', 'Career & Finance Timing', 'Relationship Compatibility'];

const MENTOR_CREDS = [
  '31+ years of legacy in astrology',
  'Thousands of successful consultations completed',
  'Expert in Vedic Astrology, Numerology & Vastu',
  'Proven track record of mentoring astrologers',
];

const STATS = [
  { val: '2 Lakh+',      label: 'Kundlis Analyzed'  },
  { val: '1.9 Million+', label: 'Social Followers'  },
  { val: '1+ Years',     label: 'Online Academy'    },
];

const PRESS_BADGES = ['Outlook', 'The Telegraph', 'News18', 'LatestLY', 'The Tribune'];

const PAIN_POINTS = [
  "You're working hard but your promotions or recognition feel stuck",
  'You attract the same type of person again and again',
  "You start something but it doesn't stay or grow the way you want",
  "You feel like you're living someone else's script, not your own",
  'You feel misunderstood by people close to you',
  "You feel like your efforts don't match your results",
];

const PATTERNS = [
  { icon: '🧠', title: 'Aapki personality ka blueprint',  desc: 'Samjho apni strengths, weaknesses, aur natural tendencies' },
  { icon: '💰', title: 'Career aur money ka zone',        desc: 'Identify karo apna ideal career path aur wealth-building approach' },
  { icon: '💕', title: 'Relationships ki dynamics',        desc: 'Samjho apne relationships ke patterns aur compatibility' },
  { icon: '❤️', title: 'Health aur energy cycles',        desc: 'Identify karo apni health patterns aur energy levels' },
  { icon: '⏰', title: 'Timing',                           desc: 'Jano kab koi kaam karna best hai aur kab wait karna chahiye' },
];

const CURRICULUM = [
  { icon: '📚', title: 'Basics of Vedic Astrology',               desc: 'Understand the simple rules that Vedic astrology is built on' },
  { icon: '📊', title: 'Understanding Your Birth Chart/Kundali',  desc: 'Understand the key elements in your birth chart' },
  { icon: '🪐', title: 'How Planets Affect Your Life',            desc: 'See how planets influence important periods of your life' },
  { icon: '🌊', title: 'Effects of Planetary Movements',          desc: 'Explore how the movement of planets can affect you' },
  { icon: '🎯', title: 'Astrology Advice for Different Life Areas', desc: 'Get specific advice for career, relationships, and wealth' },
  { icon: '🔧', title: 'Practical Applications of Astrology',     desc: 'How to use planetary patterns to scheme a better life' },
  { icon: '📋', title: 'Case Studies',                            desc: 'Real stories, real situations, real insights from actual consultations' },
  { icon: '🔮', title: 'Next Steps',                              desc: 'How to continue your journey as a highly-paid astrology consultant' },
];

const MENTOR_BULLETS = [
  '31+ years of legacy',
  'Thousands of successful consultations completed',
  'Expert in Vedic Astrology, Numerology, and Vastu',
  'Proven track record of making successful astrologers',
  'Global Mentee from India, US, UK & Middle East',
];

const BONUS_FEATURES = ['Easy to Understand', 'Quick Reference Guide', 'Beginner Friendly'];

const FAQ_DATA = [
  { q: 'Where can I join the webinar?',
    a: 'You will receive a joining link via WhatsApp and Email after registration. The webinar will be conducted on Zoom.' },
  { q: 'Where will the webinar take place?',
    a: 'The webinar will be conducted online via Zoom. You can attend from anywhere in the world.' },
  { q: 'Will there be reminders sent out before the webinar begins?',
    a: 'Yes! You will receive reminder notifications via WhatsApp and Email 24 hours and 1 hour before the webinar starts.' },
  { q: 'Is there a registration fee for the webinar?',
    a: 'Yes, there is a nominal registration fee of ₹99 only. This is to ensure commitment from attendees and cover basic platform costs.' },
  { q: 'Who should attend this webinar?',
    a: 'Anyone who wants to understand how astrology can help them make better life decisions regarding career, relationships, finances, and personal growth.' },
  { q: 'What should I have ready for the webinar?',
    a: 'Keep your date, time and place of birth handy. A notebook to take notes, and a stable internet connection.' },
  { q: 'Can I participate in this webinar with my family or partners?',
    a: 'Absolutely! You can watch the webinar with your family or partner. However, each participant needs to register individually.' },
];

/* ─────────────────────────────────────────
   Main Page Component
───────────────────────────────────────── */
export function MegaWebinarPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  /* Patch body padding for this standalone page's fixed bars */
  useEffect(() => {
    const prev = { top: document.body.style.paddingTop, bottom: document.body.style.paddingBottom };
    document.body.style.paddingTop    = '36px';
    document.body.style.paddingBottom = '60px';
    return () => {
      document.body.style.paddingTop    = prev.top;
      document.body.style.paddingBottom = prev.bottom;
    };
  }, []);

  /* Scroll-reveal via IntersectionObserver */
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('mw-in'); }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    );
    document.querySelectorAll('.mw-anim').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  const toggleFAQ = (i: number) => setOpenFAQ(prev => (prev === i ? null : i));

  /* ───────── render ───────── */
  return (
    <div className="mw-page" style={{ ...sans, color: INK, overflowX: 'hidden', scrollBehavior: 'smooth', background: LIGHT }}>

      {/* ══════════════════════════════════════
          §1  STICKY TOP BAR
      ══════════════════════════════════════ */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: '36px', zIndex: 9999,
        background: THEME_GOLD_GRD, display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '13px', color: CTA_TEXT, letterSpacing: '1px', fontWeight: '600', ...sans,
      }}>
        🔴 LIVE &nbsp;&nbsp; 2-Day Mega Webinar
      </div>

      {/* ══════════════════════════════════════
          §2  HERO
      ══════════════════════════════════════ */}
      <section style={{
        background: THEME_DARK_BG,
        padding: '64px 20px 72px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(216,138,34,0.1), transparent 70%)',
        }} />
        <div className="mw-wrap mw-grid-2" style={{ position: 'relative', zIndex: 1 }}>

          {/* LEFT column */}
          <div className="mw-anim">
            {/* Badge */}
            <span className="mw-pill" style={{ border: '1px solid rgba(243,183,87,0.35)', background: 'rgba(243,183,87,0.1)', color: PL, marginBottom: '18px' }}>
              ✦ Mega Webinar
            </span>

            {/* H1 */}
            <h1 style={{
              ...serif,
              fontSize: 'clamp(26px, 4.5vw, 42px)',
              lineHeight: 1.25, color: 'white',
              fontWeight: 700, marginBottom: '14px',
            }}>
              Remove <em style={{ color: PL, fontStyle: 'italic' }}>Uncertainty</em> from Your<br />
              Career, Relationships and<br />
              Finances using <em style={{ color: PL, fontStyle: 'italic' }}>Astrology</em>
            </h1>

            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.9)', lineHeight: 1.65, marginBottom: '26px' }}>
              Learn to read your kundli and understand career timing, relationship compatibility &amp; wealth indicators in just 2 days
            </p>

            {/* Info cards */}
            <div className="mw-info-cards" style={{ marginBottom: '22px' }}>
              {INFO_CARDS.map(c => (
                <div key={c.label} style={{
                  background: 'rgba(255,255,255,0.06)', borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.12)', padding: '12px',
                  textAlign: 'center', backdropFilter: 'blur(8px)',
                }}>
                  <div style={{ fontSize: '22px', marginBottom: '4px' }}>{c.icon}</div>
                  <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.7)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{c.label}</div>
                  <div style={{ fontSize: '13px', color: 'white', fontWeight: 600, marginTop: '2px' }}>{c.val}</div>
                </div>
              ))}
            </div>

            {/* Topics box */}
            <div style={{ background: 'rgba(0,21,48,0.6)', borderRadius: '12px', padding: '16px 20px', marginBottom: '22px', border: '1px solid rgba(243,183,87,0.2)' }}>
              <p style={{ color: PL, fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px', ...sans }}>
                Topics Covered
              </p>
              {TOPICS.map(t => (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.9)', fontSize: '14px', padding: '3px 0' }}>
                  <span style={{ color: PL, fontSize: '9px' }}>●</span>{t}
                </div>
              ))}
            </div>

            <CTABtn full />
            <p style={{ textAlign: 'center', color: PL, fontSize: '13px', fontWeight: 500, marginTop: '10px' }}>
              ⚡ Book Your Seat Now – Hurry Up! Few Seats Left
            </p>
          </div>

          {/* RIGHT column — Mentor card */}
          <div className="mw-anim mw-delay" style={{
            background: 'white', borderRadius: '16px', padding: '24px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.25)', border: '1px solid rgba(216,138,34,0.2)',
          }}>
            <div style={{
              width: '100%',
              aspectRatio: '4 / 3',
              minHeight: '200px',
              borderRadius: '12px',
              overflow: 'hidden',
              marginBottom: '18px',
              border: '1px solid rgba(216,138,34,0.15)',
              background: LIGHT,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <img
                src={GURU_IMG}
                alt="Gurudev Anand"
                style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center' }}
              />
            </div>

            <p style={{ fontSize: '12px', fontWeight: 600, color: P, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px', ...sans }}>
              Your Mentor
            </p>
            <h3 style={{ ...serif, fontSize: '22px', color: INK, marginBottom: '14px', fontWeight: 700 }}>
              Gurudev Anand
            </h3>

            {MENTOR_CREDS.map(c => <Check key={c}>{c}</Check>)}

            <hr style={{ border: 'none', borderTop: `1px solid ${BORDER}`, margin: '16px 0' }} />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)' }}>
              {STATS.map((s, i) => (
                <div className="mw-stat-col" key={s.label} style={{ borderLeft: i > 0 ? `1px solid ${BORDER}` : 'none' }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: P }}>{s.val}</div>
                  <div style={{ fontSize: '11px', color: INK_MUTED, marginTop: '2px' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════
          §3  FEATURED IN
      ══════════════════════════════════════ */}
      <section style={{ background: THEME_DARK_STRIP_BG, padding: '32px 20px', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="mw-wrap" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.9)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '18px' }}>
            Featured In
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px' }}>
            {PRESS_BADGES.map(b => (
              <span key={b} style={{
                border: '1px solid rgba(255,255,255,0.25)', borderRadius: '9999px',
                padding: '8px 18px', fontWeight: 600, fontSize: '12px', color: 'white', background: 'rgba(255,255,255,0.1)',
              }}>{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          §4  PAIN POINTS
      ══════════════════════════════════════ */}
      <section style={{ background: LIGHT, padding: '80px 20px' }}>
        <div className="mw-wrap">
          <h2 className="mw-anim" style={{
            ...sans, fontSize: '22px', fontWeight: 600,
            textAlign: 'center', marginBottom: '36px', lineHeight: 1.5,
          }}>
            Kabhi socha hai{' '}
            <em style={{ color: P, fontStyle: 'italic' }}>"Why does this keep happening to me?"</em>
          </h2>

          <div className="mw-card-grid" style={{ marginBottom: '36px' }}>
            {PAIN_POINTS.map((text, i) => (
              <div key={i} className="mw-anim" style={{
                background: 'white', borderRadius: '12px', padding: '16px 20px',
                borderLeft: `3px solid ${ACCENT}`,
                boxShadow: '0 1px 6px rgba(0,0,0,0.04)',
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <span style={{ color: ACCENT, fontSize: '18px', flexShrink: 0, lineHeight: 1.3 }}>⊗</span>
                  <span style={{ fontSize: '14px', color: INK_BODY, lineHeight: 1.55 }}>{text}</span>
                </div>
              </div>
            ))}
          </div>

          <p className="mw-anim" style={{
            textAlign: 'center', fontStyle: 'italic', fontWeight: 500,
            fontSize: '16px', color: P, marginBottom: '28px',
          }}>
            The answer lies in your Kundli 🔥
          </p>
          <div style={{ textAlign: 'center' }}><CTABtn /></div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          §5  PATTERNS CONCEPT
      ══════════════════════════════════════ */}
      <section style={{ background: 'white', padding: '80px 20px' }}>
        <div className="mw-wrap">
          <div className="mw-anim" style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ ...serif, fontSize: 'clamp(22px, 4vw, 36px)', color: INK, lineHeight: 1.3, marginBottom: '16px', fontWeight: 700 }}>
              Astrology is not about predictions.<br />
              It&apos;s about{' '}
              <span style={{ color: P, fontWeight: 700, fontSize: '1.2em' }}>PATTERNS.</span>
            </h2>
            <p style={{ fontSize: '15px', color: INK_MUTED, maxWidth: '600px', margin: '0 auto', lineHeight: 1.65 }}>
              Planets ki positions, houses ka system, signs ka energy — ye sab ek framework hai jo explain karta hai
            </p>
          </div>

          <div className="mw-card-grid-3" style={{ marginBottom: '44px' }}>
            {PATTERNS.map((c, i) => (
              <div key={i} className="mw-anim" style={{
                border: `1px solid ${BORDER}`, borderRadius: '14px',
                padding: '20px', background: LIGHT_ALT,
              }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '50%',
                  background: 'rgba(216,138,34,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '22px', marginBottom: '12px',
                }}>{c.icon}</div>
                <h4 style={{ ...sans, fontSize: '15px', fontWeight: 600, color: INK, marginBottom: '6px' }}>{c.title}</h4>
                <p style={{ fontSize: '13px', color: INK_MUTED, lineHeight: 1.5 }}>{c.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}><CTABtn /></div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          §6  WHAT YOU LEARN
      ══════════════════════════════════════ */}
      <section style={{ background: LIGHT, padding: '80px 20px' }}>
        <div className="mw-wrap">
          <div className="mw-anim" style={{ textAlign: 'center', marginBottom: '44px' }}>
            <SectionEyebrow>Curriculum</SectionEyebrow>
            <h2 style={{ ...serif, fontSize: 'clamp(22px, 4vw, 34px)', color: INK, fontWeight: 700 }}>
              What <span style={{ color: P }}>You</span> Will Learn In 2 Days
            </h2>
          </div>

          <div className="mw-card-grid" style={{ marginBottom: '44px' }}>
            {CURRICULUM.map((c, i) => (
              <div key={i} className="mw-anim" style={{
                background: 'white', borderRadius: '14px',
                padding: '20px 24px', border: `1px solid ${BORDER}`,
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                display: 'flex', gap: '14px', alignItems: 'flex-start',
              }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '50%',
                  background: P, flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '18px',
                }}>{c.icon}</div>
                <div>
                  <h4 style={{ ...sans, fontSize: '15px', fontWeight: 600, color: INK, marginBottom: '5px' }}>{c.title}</h4>
                  <p style={{ fontSize: '13px', color: INK_MUTED, lineHeight: 1.5 }}>{c.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}><CTABtn /></div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          §7  MEET YOUR MENTOR
      ══════════════════════════════════════ */}
      <section style={{ background: THEME_DARK_BG, padding: '80px 20px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(circle at 20% 50%, rgba(216,138,34,0.08), transparent 65%)' }} />
        <div className="mw-wrap mw-grid-2 mw-grid-2-center" style={{ position: 'relative', zIndex: 1 }}>

          {/* Left */}
          <div className="mw-anim">
            <p style={{ fontSize: '12px', fontWeight: 600, color: PL, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '10px', ...sans }}>
              Meet Your
            </p>
            <h2 style={{ ...serif, fontSize: 'clamp(26px, 4vw, 36px)', color: 'white', marginBottom: '24px', fontWeight: 700 }}>
              Meet Your <span style={{ color: PL, fontStyle: 'italic' }}>Mentor</span>
            </h2>

            {MENTOR_BULLETS.map(c => <Check key={c} light>{c}</Check>)}

            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.9)', lineHeight: 1.65, margin: '20px 0 18px', ...sans }}>
              A renowned expert in astrology and various related disciplines. Award winning speaker in astrology and various related disciplines like numerology, vastu shastra, palmistry, tarot reading.
            </p>

            <p style={{ fontSize: '15px', fontWeight: 600, color: 'white', marginBottom: '6px', ...sans }}>Spiritual Speaker &amp; Podcaster</p>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, marginBottom: '18px', ...sans }}>
              Has appeared on numerous podcasts and 100+ speaker series for webinars. Featured from Asia and Pacific Series Q&amp;A series for sessions.
            </p>

            <p style={{ fontSize: '15px', fontWeight: 600, color: 'white', marginBottom: '6px', ...sans }}>Global Webinar</p>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, marginBottom: '22px', ...sans }}>
              Has expertise to teach Psychology, Astrology, Vastu Shastra, Palmistry and has taught thousands of these fundamental teachings.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '28px' }}>
              <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>As Seen In:</span>
              {['Outlook', 'LatestLY'].map(b => (
                <span key={b} style={{
                  border: '1px solid rgba(255,255,255,0.25)', borderRadius: '9999px',
                  padding: '4px 14px', color: 'white', fontSize: '12px', fontWeight: 600, background: 'rgba(255,255,255,0.1)',
                }}>{b}</span>
              ))}
            </div>

            <CTABtn />
          </div>

          {/* Right: image placeholder */}
          <div className="mw-anim mw-delay" style={{
            minHeight: '400px', borderRadius: '16px', overflow: 'hidden',
            border: '1px solid rgba(216,138,34,0.25)',
            boxShadow: '0 20px 40px -10px rgba(0,0,0,0.5)',
          }}>
            <img src={GURU_IMG_RESOURCE} alt="Gurudev Anand" style={{ width: '100%', height: '100%', minHeight: '400px', objectFit: 'cover', objectPosition: 'top' }} />
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════
          §8  FREE BONUS
      ══════════════════════════════════════ */}
      <section style={{ background: LIGHT_ALT, padding: '60px 20px' }}>
        <div className="mw-wrap mw-grid-2 mw-grid-2-center">

          {/* Book cover */}
          <div className="mw-anim" style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'relative', width: '200px', height: '260px' }}>
              {/* Real book image */}
              <img
                src="https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&q=80&auto=format&fit=crop"
                alt="Vedic Astrology Foundation Guide"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  borderRadius: '12px',
                  boxShadow: '0 8px 36px rgba(0,0,0,0.30)',
                  display: 'block',
                }}
              />
              {/* Gradient overlay for text legibility */}
              <div style={{
                position: 'absolute', inset: 0,
                borderRadius: '12px',
                background: 'linear-gradient(to top, rgba(0,15,40,0.92) 0%, rgba(0,15,40,0.4) 45%, transparent 100%)',
                display: 'flex', flexDirection: 'column',
                justifyContent: 'flex-end', padding: '16px',
              }}>
                <p style={{ color: 'white', fontWeight: 700, fontSize: '13px', lineHeight: 1.3, margin: 0, ...sans }}>VEDIC ASTROLOGY</p>
                <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '11px', marginTop: '4px', margin: '4px 0 0', ...sans }}>Foundation Guide</p>
              </div>
              {/* FREE badge */}
              <div style={{
                position: 'absolute', top: '-10px', right: '-10px',
                width: '40px', height: '40px', borderRadius: '50%',
                background: P,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontWeight: 700, fontSize: '11px',
                boxShadow: '0 3px 10px rgba(0,0,0,0.25)', ...sans,
              }}>FREE</div>
            </div>
          </div>

          {/* Right */}
          <div className="mw-anim mw-delay">
            <span className="mw-pill" style={{ background: THEME_GOLD_GRD, color: CTA_TEXT, marginBottom: '14px', fontSize: '12px', fontWeight: 700 }}>
              FREE
            </span>
            <h2 style={{ ...serif, fontSize: 'clamp(20px, 3.5vw, 28px)', color: INK, marginBottom: '12px', fontWeight: 700, lineHeight: 1.3 }}>
              Get Your FREE Vedic Astrology Foundation Guide
            </h2>
            <p style={{ fontSize: '14px', color: INK_MUTED, marginBottom: '18px', lineHeight: 1.65 }}>
              Get Foundation Astrology knowledge completely free when you register
            </p>
            {BONUS_FEATURES.map(f => <Check key={f}>{f}</Check>)}
            <div style={{ marginTop: '22px' }}><CTABtn text="Book Your Spot Now" /></div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════
          §9  FAQ
      ══════════════════════════════════════ */}
      <section style={{ background: THEME_DARK_BG, padding: '80px 20px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse at 50% 100%, rgba(0,94,168,0.1), transparent 70%)' }} />
        <div className="mw-wrap-narrow" style={{ position: 'relative', zIndex: 1 }}>
          <h2 className="mw-anim" style={{
            ...serif, fontSize: 'clamp(22px, 4vw, 32px)',
            color: 'white', marginBottom: '36px', textAlign: 'center', fontWeight: 700,
          }}>
            <span style={{ color: PL }}>FAQ&apos;S:</span> Here&apos;s everything you may ask
          </h2>

          {FAQ_DATA.map((item, i) => (
            <div key={i} className="mw-anim" style={{
              background: 'rgba(255,255,255,0.03)', borderRadius: '12px',
              border: openFAQ === i ? '1px solid rgba(216,138,34,0.35)' : '1px solid rgba(255,255,255,0.08)',
              marginBottom: '12px', overflow: 'hidden',
            }}>
              <button
                type="button"
                onClick={() => toggleFAQ(i)}
                style={{
                  width: '100%', display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center', padding: '18px 20px',
                  background: 'none', border: 'none', cursor: 'pointer',
                  textAlign: 'left', ...sans,
                }}
              >
                <span style={{ fontSize: '15px', fontWeight: 500, color: 'rgba(255,255,255,0.95)', lineHeight: 1.4 }}>
                  {item.q}
                </span>
                <span className={`mw-arrow${openFAQ === i ? ' open' : ''}`}>▼</span>
              </button>

              <div className={`mw-faq-body${openFAQ === i ? ' open' : ''}`}>
                <div style={{
                  padding: '14px 20px 18px',
                  borderTop: '1px solid rgba(255,255,255,0.08)',
                  fontSize: '14px', color: 'rgba(255,255,255,0.9)', lineHeight: 1.65, ...sans,
                }}>
                  {item.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          §11  STICKY BOTTOM BAR
      ══════════════════════════════════════ */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, height: '60px', zIndex: 9998,
        background: 'rgba(0,15,35,0.94)', borderTop: '1px solid rgba(243,183,87,0.28)',
        backdropFilter: 'blur(16px)',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.35)',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', padding: '0 24px',
      }}>
        <div style={{ lineHeight: 1.2 }}>
          <span style={{ fontSize: '20px', fontWeight: 700, color: PL, ...sans }}>₹99/-</span>
          <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.9)', marginLeft: '4px', ...sans }}>Only</span>
          <br />
          <span style={{ fontSize: '12px', color: PL, fontWeight: 400, ...sans }}>(Few Seats Left)</span>
        </div>
        <CTABtn text="Register Now →" sm />
      </div>

    </div>
  );
}
