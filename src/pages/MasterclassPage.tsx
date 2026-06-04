import { useState, useEffect, type CSSProperties } from 'react';
import {
  THEME_DARK_BG,
  THEME_GOLD_GRD,
  THEME_DARK_STRIP_BG,
  GURU_IMG,
  GURU_IMG_RESOURCE,
} from '../lib/constants';
import './MegaWebinarPage.css'; /* reuse the shared landing-page stylesheet */

/* ── Palette (matches site tokens) ── */
const P        = '#D88A22';
const PL       = '#F3B757';
const INK      = '#1F2937';
const INK_BODY = '#4B5563';
const INK_MUTED= '#6B7280';
const LIGHT    = '#F8F9FB';
const LIGHT_ALT= '#EFF1F5';
const BORDER   = '#E5E7EB';
const CTA_TEXT = '#002D60';
const ACCENT   = '#C62828';

const serif: CSSProperties = { fontFamily: "'Playfair Display', serif" };
const sans:  CSSProperties = { fontFamily: "'Poppins', sans-serif" };

/* ─────────────────────────────────────────
   Shared sub-components (same as mega page)
───────────────────────────────────────── */
function CTABtn({
  text = 'Secure Your Seat — Join the Masterclass',
  full = false,
  sm   = false,
}: { text?: string; full?: boolean; sm?: boolean }) {
  return (
    <button className={`mw-btn${full ? ' mw-btn-full' : ''}${sm ? ' mw-btn-sm' : ''}`}>
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

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: '12px', fontWeight: '600', color: P, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '10px', ...sans }}>
      {children}
    </p>
  );
}

/* ─────────────────────────────────────────
   Content data
───────────────────────────────────────── */
const INFO_CARDS = [
  { icon: '📅', label: 'Date',     val: 'Coming Soon'   },
  { icon: '⏱️', label: 'Duration', val: '90 Minutes'    },
  { icon: '🎯', label: 'Format',   val: 'Live + Replay' },
];

const TOPICS = [
  'Your 3 Most Powerful Houses',
  'Dasha Periods & Life Timing',
  'Career & Wealth Indicators',
  'Relationship Compatibility Secrets',
];

const MENTOR_CREDS = [
  '31+ years of legacy in astrology',
  'Thousands of successful consultations completed',
  'Expert in Vedic Astrology, Numerology & Vastu',
  'Proven track record of mentoring astrologers',
];

const STATS = [
  { val: '2 Lakh+',      label: 'Kundlis Analyzed' },
  { val: '1.9 Million+', label: 'Social Followers'  },
  { val: '50+',          label: 'Countries Reached' },
];

const PRESS_BADGES = ['Outlook', 'The Telegraph', 'News18', 'LatestLY', 'The Tribune'];

const PAIN_POINTS = [
  "You've tried to understand astrology but it all feels too complex and overwhelming",
  'You want clarity about your next big decision — career, love, money — but feel stuck',
  "You're tired of generic sun-sign horoscopes that don't apply to YOUR life",
  "You sense a pattern repeating in your life but cannot identify what's driving it",
  'You want to know what the next 12 months hold for you — specifically',
  'You wish you could read your own chart instead of depending on others',
];

const WHY_MASTERCLASS = [
  { icon: '⚡', title: 'Zero Fluff — All Substance', desc: '90 minutes of dense, practical knowledge. No filler, no sales pitches — just the exact frameworks Gurudev Anand uses in every consultation.' },
  { icon: '🎯', title: 'Laser-Focused Curriculum',    desc: 'Unlike multi-day courses, every minute is planned. You leave with immediately actionable insights, not homework assignments.' },
  { icon: '🙋', title: 'Live Interactive Q&A',        desc: 'Ask Gurudev Anand your specific question live. Real answers about your real chart — not pre-recorded scripts.' },
  { icon: '📲', title: '7-Day Replay Access',         desc: "Can't attend live? Replay is sent within 24 hours and stays accessible for 7 days so you can revisit key moments." },
  { icon: '🗂️', title: 'PDF Summary Sheet',           desc: 'Receive a concise reference guide covering every key framework taught — so you never lose what you learned.' },
];

const AGENDA = [
  { time: '0:00–15:00',  icon: '🏛️', title: 'Foundation: The 3 Pillars',       desc: 'The Ascendant, Moon, and Sun — the three most important placements in any Kundli and how to read them instantly.' },
  { time: '15:00–35:00', icon: '📊', title: 'Your Birth Chart Decoded',          desc: 'Walk through a live Kundli reading. Understand the 12 houses, what each governs, and which ones are most active for you right now.' },
  { time: '35:00–55:00', icon: '⏰', title: 'Dasha & Timing — Your Life Clock',  desc: 'What planetary period are you currently in? Discover how Dasha periods shape career breakthroughs, relationship shifts, and wealth cycles.' },
  { time: '55:00–70:00', icon: '🎯', title: 'Career, Wealth & Relationships',    desc: 'The exact houses and planetary combinations that reveal your strongest career path, wealth accumulation window, and love compatibility.' },
  { time: '70:00–80:00', icon: '🔴', title: 'Live Chart Reading',                desc: 'Gurudev Anand reads a volunteer\'s Kundli live on the call — see the methodology applied to a real chart in real time.' },
  { time: '80:00–90:00', icon: '💬', title: 'Open Q&A with Gurudev Anand',       desc: 'Your questions answered live. Bring your birth details and your most burning question about career, relationships, or timing.' },
];

const TAKEAWAYS = [
  { icon: '🧭', title: 'Know Your Current Dasha',         desc: 'Understand exactly which planetary period you are in and what opportunities and challenges it brings.' },
  { icon: '🏠', title: 'Identify Your 3 Key Houses',      desc: 'The 3 houses most active in your chart right now — the ones shaping your present reality.' },
  { icon: '💼', title: 'Your Career & Wealth Window',     desc: 'Pinpoint the most favourable period for career moves and financial decisions in the next 12 months.' },
  { icon: '💕', title: 'Relationship Indicators Decoded', desc: 'Understand your 7th house and Venus position to recognise your compatibility patterns and relationship timing.' },
  { icon: '📅', title: '12-Month Planetary Roadmap',      desc: 'A clear picture of which months ahead are aligned with action and which call for patience.' },
  { icon: '📖', title: 'Foundation to Read Your Own Chart',desc: 'The vocabulary and framework to begin interpreting your Kundli independently after this session.' },
];

const MENTOR_BULLETS = [
  '31+ years of Vedic astrology legacy',
  'Thousands of successful consultations completed',
  'Expert in Vedic Astrology, Numerology, and Vastu',
  'Proven track record of making successful astrologers',
  'Global students from India, US, UK & Middle East',
];

const BONUS_FEATURES = ['Instant PDF Download', 'Beginner to Intermediate', 'Covers All 12 Houses'];

const FAQ_DATA = [
  { q: 'Do I need any prior knowledge of astrology?',
    a: 'No prior knowledge is needed. This masterclass is designed for complete beginners as well as those with some exposure to astrology who want a structured foundation.' },
  { q: 'Where will the masterclass take place?',
    a: 'The live session is conducted on Zoom. A joining link is sent to your registered email and WhatsApp number 24 hours before the session.' },
  { q: 'What do I need to have ready for the session?',
    a: 'Keep your date, time, and place of birth handy. A notebook to take notes. We recommend generating a free Kundli chart at any reputed online platform before the session starts.' },
  { q: 'Will I get a recording if I can\'t attend live?',
    a: 'Yes. A full replay is sent within 24 hours of the live session. Replay access is available for 7 days from the date of the session.' },
  { q: 'What is the registration fee?',
    a: 'The registration fee is ₹149 only. This nominal fee ensures you are committed to attending and covers platform and resource costs.' },
  { q: 'Can I ask Gurudev Anand my personal chart question?',
    a: 'Yes! The last 10 minutes are a dedicated live Q&A. While we cannot guarantee every question will be answered live, all submitted questions are reviewed and addressed either in the session or via a follow-up.' },
  { q: 'Is this different from the 2-Day Mega Webinar?',
    a: 'Yes. The masterclass is a single 90-minute intensive session focused on giving you the core framework in one sitting. The 2-Day Webinar covers a broader curriculum over two evenings. This masterclass is ideal for those who want concentrated, fast results.' },
];

/* ─────────────────────────────────────────
   Main Component
───────────────────────────────────────── */
export function MasterclassPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  /* Body padding for fixed bars */
  useEffect(() => {
    const prev = { top: document.body.style.paddingTop, bottom: document.body.style.paddingBottom };
    document.body.style.paddingTop    = '36px';
    document.body.style.paddingBottom = '60px';
    return () => {
      document.body.style.paddingTop    = prev.top;
      document.body.style.paddingBottom = prev.bottom;
    };
  }, []);

  /* Scroll-reveal */
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('mw-in'); }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    );
    document.querySelectorAll('.mw-anim').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  const toggle = (i: number) => setOpenFAQ(p => (p === i ? null : i));

  return (
    <div style={{ ...sans, color: INK, overflowX: 'hidden', background: LIGHT }}>

      {/* ══════════════════════════════════════
          §1  STICKY TOP BAR
      ══════════════════════════════════════ */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: '36px', zIndex: 9999,
        background: THEME_GOLD_GRD,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '13px', color: CTA_TEXT, letterSpacing: '1px', fontWeight: '600', ...sans,
      }}>
        🔴 LIVE &nbsp;&nbsp; 90-Minute Power Masterclass
      </div>

      {/* ══════════════════════════════════════
          §2  HERO
      ══════════════════════════════════════ */}
      <section style={{ background: THEME_DARK_BG, padding: '64px 20px 72px', position: 'relative', overflow: 'hidden' }}>
        {/* ambient glow */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 70% 60% at 40% 50%, rgba(216,138,34,0.1), transparent 65%)' }} />

        <div className="mw-wrap mw-grid-2" style={{ position: 'relative', zIndex: 1 }}>

          {/* LEFT */}
          <div className="mw-anim">
            <span className="mw-pill" style={{ border: '1px solid rgba(243,183,87,0.35)', background: 'rgba(243,183,87,0.1)', color: PL, marginBottom: '18px', display: 'inline-flex' }}>
              ⚡ 90-Minute Masterclass
            </span>

            <h1 style={{ ...serif, fontSize: 'clamp(26px, 4.5vw, 44px)', lineHeight: 1.22, color: 'white', fontWeight: 700, marginBottom: '14px' }}>
              Decode Your <em style={{ color: PL }}>Destiny</em><br />
              in Just <em style={{ color: PL }}>90 Minutes</em><br />
              with Vedic Astrology
            </h1>

            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.88)', lineHeight: 1.65, marginBottom: '26px' }}>
              One live session. Zero fluff. Walk away knowing how to read your Kundli, understand your Dasha timing, and identify the planetary patterns driving your career, love, and wealth — right now.
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
                  <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.65)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{c.label}</div>
                  <div style={{ fontSize: '13px', color: 'white', fontWeight: 600, marginTop: '2px' }}>{c.val}</div>
                </div>
              ))}
            </div>

            {/* Topics box */}
            <div style={{ background: 'rgba(0,21,48,0.6)', borderRadius: '12px', padding: '16px 20px', marginBottom: '22px', border: '1px solid rgba(243,183,87,0.2)' }}>
              <p style={{ color: PL, fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px', ...sans }}>
                What You&apos;ll Cover
              </p>
              {TOPICS.map(t => (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.9)', fontSize: '14px', padding: '3px 0' }}>
                  <span style={{ color: PL, fontSize: '9px' }}>●</span>{t}
                </div>
              ))}
            </div>

            <CTABtn full />
            <p style={{ textAlign: 'center', color: PL, fontSize: '13px', fontWeight: 500, marginTop: '10px' }}>
              ⚡ Limited Seats — Register Before They Fill Up
            </p>
          </div>

          {/* RIGHT — Mentor card */}
          <div className="mw-anim mw-delay" style={{
            background: 'white', borderRadius: '16px', padding: '24px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.25)', border: '1px solid rgba(216,138,34,0.2)',
          }}>
            <div style={{
              width: '100%', aspectRatio: '4 / 3', minHeight: '200px',
              borderRadius: '12px', overflow: 'hidden',
              marginBottom: '18px', border: '1px solid rgba(216,138,34,0.15)',
              background: LIGHT,
            }}>
              <img src={GURU_IMG} alt="Gurudev Anand" style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center' }} />
            </div>

            <p style={{ fontSize: '12px', fontWeight: 600, color: P, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px', ...sans }}>Your Mentor</p>
            <h3 style={{ ...serif, fontSize: '22px', color: INK, marginBottom: '14px', fontWeight: 700 }}>Gurudev Anand</h3>

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
          <p style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.85)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '18px' }}>
            Featured In
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px' }}>
            {PRESS_BADGES.map(b => (
              <span key={b} style={{ border: '1px solid rgba(255,255,255,0.25)', borderRadius: '9999px', padding: '8px 18px', fontWeight: 600, fontSize: '12px', color: 'white', background: 'rgba(255,255,255,0.1)' }}>
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          §4  PAIN POINTS — "Is This You?"
      ══════════════════════════════════════ */}
      <section style={{ background: LIGHT, padding: '80px 20px' }}>
        <div className="mw-wrap">
          <h2 className="mw-anim" style={{ ...sans, fontSize: '22px', fontWeight: 600, textAlign: 'center', marginBottom: '8px', lineHeight: 1.5 }}>
            Does any of this sound like you?
          </h2>
          <p className="mw-anim" style={{ textAlign: 'center', fontSize: '15px', color: INK_MUTED, marginBottom: '36px' }}>
            If you said yes to even one of these — this masterclass is made for you.
          </p>

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

          <p className="mw-anim" style={{ textAlign: 'center', fontStyle: 'italic', fontWeight: 500, fontSize: '16px', color: P, marginBottom: '28px' }}>
            Your Kundli holds every answer. This masterclass teaches you how to find them. 🔥
          </p>
          <div style={{ textAlign: 'center' }}><CTABtn /></div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          §5  WHY THIS MASTERCLASS
      ══════════════════════════════════════ */}
      <section style={{ background: 'white', padding: '80px 20px' }}>
        <div className="mw-wrap">
          <div className="mw-anim" style={{ textAlign: 'center', marginBottom: '48px' }}>
            <Eyebrow>Why 90 Minutes Works</Eyebrow>
            <h2 style={{ ...serif, fontSize: 'clamp(22px, 4vw, 36px)', color: INK, lineHeight: 1.3, marginBottom: '14px', fontWeight: 700 }}>
              More focused than a course.<br />
              More <span style={{ color: P }}>powerful</span> than a workshop.
            </h2>
            <p style={{ fontSize: '15px', color: INK_MUTED, maxWidth: '580px', margin: '0 auto', lineHeight: 1.65 }}>
              Most astrology courses stretch basic concepts across weeks. This masterclass delivers the essential framework in one concentrated, high-impact sitting.
            </p>
          </div>

          <div className="mw-card-grid-3" style={{ marginBottom: '44px' }}>
            {WHY_MASTERCLASS.map((c, i) => (
              <div key={i} className="mw-anim" style={{ border: `1px solid ${BORDER}`, borderRadius: '14px', padding: '22px', background: LIGHT_ALT }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '50%',
                  background: 'rgba(216,138,34,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '22px', marginBottom: '12px',
                }}>{c.icon}</div>
                <h4 style={{ ...sans, fontSize: '15px', fontWeight: 600, color: INK, marginBottom: '6px' }}>{c.title}</h4>
                <p style={{ fontSize: '13px', color: INK_MUTED, lineHeight: 1.55 }}>{c.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}><CTABtn /></div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          §6  90-MINUTE AGENDA
      ══════════════════════════════════════ */}
      <section style={{ background: LIGHT, padding: '80px 20px' }}>
        <div className="mw-wrap">
          <div className="mw-anim" style={{ textAlign: 'center', marginBottom: '44px' }}>
            <Eyebrow>Session Agenda</Eyebrow>
            <h2 style={{ ...serif, fontSize: 'clamp(22px, 4vw, 34px)', color: INK, fontWeight: 700 }}>
              Every minute of your <span style={{ color: P }}>90 minutes</span> — planned
            </h2>
          </div>

          {/* Timeline */}
          <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto 44px' }}>
            {/* Vertical line */}
            <div style={{ position: 'absolute', left: '28px', top: '16px', bottom: '16px', width: '2px', background: `linear-gradient(to bottom, ${PL}, rgba(216,138,34,0.15))` }} />

            {AGENDA.map((a, i) => (
              <div key={i} className="mw-anim" style={{ display: 'flex', gap: '20px', marginBottom: '20px', position: 'relative' }}>
                {/* Icon node */}
                <div style={{
                  width: '56px', height: '56px', borderRadius: '50%',
                  background: i === 0 ? P : 'white',
                  border: `2px solid ${i === 0 ? P : BORDER}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '20px', flexShrink: 0, zIndex: 1,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
                }}>{a.icon}</div>

                {/* Content card */}
                <div style={{
                  flex: 1, background: 'white', borderRadius: '14px',
                  padding: '16px 20px', border: `1px solid ${BORDER}`,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '6px', marginBottom: '6px' }}>
                    <h4 style={{ ...sans, fontSize: '15px', fontWeight: 600, color: INK }}>{a.title}</h4>
                    <span style={{
                      fontSize: '11px', fontWeight: 600, color: P,
                      background: 'rgba(216,138,34,0.1)', borderRadius: '6px',
                      padding: '2px 10px', whiteSpace: 'nowrap', ...sans,
                    }}>{a.time}</span>
                  </div>
                  <p style={{ fontSize: '13px', color: INK_MUTED, lineHeight: 1.55 }}>{a.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}><CTABtn /></div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          §7  WHAT YOU WALK AWAY WITH
      ══════════════════════════════════════ */}
      <section style={{ background: THEME_DARK_BG, padding: '80px 20px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(216,138,34,0.1), transparent 60%)' }} />
        <div className="mw-wrap" style={{ position: 'relative', zIndex: 1 }}>
          <div className="mw-anim" style={{ textAlign: 'center', marginBottom: '44px' }}>
            <Eyebrow>Outcomes</Eyebrow>
            <h2 style={{ ...serif, fontSize: 'clamp(22px, 4vw, 34px)', color: 'white', fontWeight: 700, lineHeight: 1.25 }}>
              What you walk away with <span style={{ color: PL, fontStyle: 'italic' }}>after 90 minutes</span>
            </h2>
          </div>

          <div className="mw-card-grid" style={{ marginBottom: '44px' }}>
            {TAKEAWAYS.map((c, i) => (
              <div key={i} className="mw-anim" style={{
                background: 'rgba(255,255,255,0.04)', borderRadius: '14px',
                padding: '20px 22px', border: '1px solid rgba(255,255,255,0.08)',
                display: 'flex', gap: '14px', alignItems: 'flex-start',
              }}>
                <div style={{
                  width: '42px', height: '42px', borderRadius: '50%',
                  background: `linear-gradient(135deg, ${P}, ${PL})`,
                  flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '18px',
                }}>{c.icon}</div>
                <div>
                  <h4 style={{ ...sans, fontSize: '14px', fontWeight: 600, color: 'white', marginBottom: '4px' }}>{c.title}</h4>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 }}>{c.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}><CTABtn /></div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          §8  MEET YOUR MENTOR
      ══════════════════════════════════════ */}
      <section style={{ background: 'white', padding: '80px 20px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 50% 60% at 80% 50%, rgba(216,138,34,0.05), transparent 65%)' }} />
        <div className="mw-wrap mw-grid-2 mw-grid-2-center" style={{ position: 'relative', zIndex: 1 }}>

          {/* Mentor image */}
          <div className="mw-anim" style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
              <div style={{
                borderRadius: '20px', overflow: 'hidden',
                boxShadow: '0 20px 60px -10px rgba(0,0,0,0.2)',
                border: `2px solid rgba(216,138,34,0.2)`,
              }}>
                <img src={GURU_IMG_RESOURCE} alt="Gurudev Anand" style={{ width: '100%', display: 'block', objectFit: 'cover', objectPosition: 'top', minHeight: '360px' }} />
              </div>
              {/* Floating badge */}
              <div style={{
                position: 'absolute', bottom: '-16px', right: '-16px',
                background: THEME_GOLD_GRD, borderRadius: '14px',
                padding: '14px 20px', textAlign: 'center',
                boxShadow: '0 8px 24px rgba(216,138,34,0.35)',
              }}>
                <div style={{ fontSize: '20px', fontWeight: 700, color: CTA_TEXT, ...sans }}>31+</div>
                <div style={{ fontSize: '11px', color: CTA_TEXT, fontWeight: 500, ...sans }}>Years of Legacy</div>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="mw-anim mw-delay">
            <p style={{ fontSize: '12px', fontWeight: 600, color: P, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '10px', ...sans }}>Your Masterclass Host</p>
            <h2 style={{ ...serif, fontSize: 'clamp(26px, 4vw, 36px)', color: INK, marginBottom: '20px', fontWeight: 700 }}>
              Gurudev <span style={{ color: P, fontStyle: 'italic' }}>Anand</span>
            </h2>

            {MENTOR_BULLETS.map(c => <Check key={c}>{c}</Check>)}

            <p style={{ fontSize: '14px', color: INK_MUTED, lineHeight: 1.7, margin: '18px 0 16px' }}>
              A renowned expert in astrology and various related disciplines. Award-winning speaker known for making complex Vedic frameworks accessible and immediately applicable — in any time format, whether 90 minutes or 9 hours.
            </p>

            <p style={{ fontSize: '15px', fontWeight: 600, color: INK, marginBottom: '6px', ...sans }}>Spiritual Speaker &amp; Podcaster</p>
            <p style={{ fontSize: '14px', color: INK_MUTED, lineHeight: 1.65, marginBottom: '20px' }}>
              Has appeared on 100+ speaker series, podcasts, and international webinars. Featured in Asia-Pacific Q&amp;A series. Known for delivering transformative insights in condensed, impactful sessions.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '24px' }}>
              <span style={{ fontSize: '13px', color: INK_MUTED, fontWeight: 500 }}>As Seen In:</span>
              {['Outlook', 'News18', 'LatestLY'].map(b => (
                <span key={b} style={{ border: `1.5px solid ${BORDER}`, borderRadius: '9999px', padding: '4px 14px', color: INK_BODY, fontSize: '12px', fontWeight: 600 }}>{b}</span>
              ))}
            </div>

            <CTABtn />
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════
          §9  FREE BONUS
      ══════════════════════════════════════ */}
      <section style={{ background: LIGHT_ALT, padding: '60px 20px' }}>
        <div className="mw-wrap mw-grid-2 mw-grid-2-center">

          {/* Book cover */}
          <div className="mw-anim" style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'relative', width: '200px', height: '260px' }}>
              <img
                src="https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&q=80&auto=format&fit=crop"
                alt="Vedic Astrology Quick Reference Guide"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', borderRadius: '12px', boxShadow: '0 8px 36px rgba(0,0,0,0.28)', display: 'block' }}
              />
              <div style={{
                position: 'absolute', inset: 0, borderRadius: '12px',
                background: 'linear-gradient(to top, rgba(0,15,40,0.92) 0%, rgba(0,15,40,0.4) 45%, transparent 100%)',
                display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '16px',
              }}>
                <p style={{ color: 'white', fontWeight: 700, fontSize: '12px', lineHeight: 1.3, margin: 0, ...sans }}>VEDIC ASTROLOGY</p>
                <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '11px', margin: '4px 0 0', ...sans }}>Quick Reference Guide</p>
              </div>
              <div style={{
                position: 'absolute', top: '-10px', right: '-10px',
                width: '40px', height: '40px', borderRadius: '50%',
                background: P, display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontWeight: 700, fontSize: '11px',
                boxShadow: '0 3px 10px rgba(0,0,0,0.25)', ...sans,
              }}>FREE</div>
            </div>
          </div>

          {/* Right */}
          <div className="mw-anim mw-delay">
            <span className="mw-pill" style={{ background: THEME_GOLD_GRD, color: CTA_TEXT, marginBottom: '14px', fontSize: '12px', fontWeight: 700, display: 'inline-flex' }}>
              FREE GIFT
            </span>
            <h2 style={{ ...serif, fontSize: 'clamp(20px, 3.5vw, 28px)', color: INK, marginBottom: '12px', fontWeight: 700, lineHeight: 1.35 }}>
              Get Your FREE Vedic Astrology Quick Reference Guide
            </h2>
            <p style={{ fontSize: '14px', color: INK_MUTED, marginBottom: '18px', lineHeight: 1.65 }}>
              Every registered participant receives a concise PDF reference sheet covering the key frameworks taught in the masterclass — free to keep forever.
            </p>
            {BONUS_FEATURES.map(f => <Check key={f}>{f}</Check>)}
            <div style={{ marginTop: '22px' }}><CTABtn text="Claim Your Spot + Free Guide" /></div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════
          §10  FAQ
      ══════════════════════════════════════ */}
      <section style={{ background: THEME_DARK_BG, padding: '80px 20px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse at 50% 100%, rgba(0,94,168,0.1), transparent 70%)' }} />
        <div className="mw-wrap-narrow" style={{ position: 'relative', zIndex: 1 }}>
          <h2 className="mw-anim" style={{ ...serif, fontSize: 'clamp(22px, 4vw, 32px)', color: 'white', marginBottom: '36px', textAlign: 'center', fontWeight: 700 }}>
            <span style={{ color: PL }}>FAQ&apos;S:</span> Everything you want to know
          </h2>

          {FAQ_DATA.map((item, i) => (
            <div key={i} className="mw-anim" style={{
              background: 'rgba(255,255,255,0.03)', borderRadius: '12px',
              border: openFAQ === i ? '1px solid rgba(216,138,34,0.35)' : '1px solid rgba(255,255,255,0.08)',
              marginBottom: '12px', overflow: 'hidden',
            }}>
              <button
                type="button"
                onClick={() => toggle(i)}
                style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 20px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', ...sans }}
              >
                <span style={{ fontSize: '15px', fontWeight: 500, color: 'rgba(255,255,255,0.95)', lineHeight: 1.4 }}>{item.q}</span>
                <span className={`mw-arrow${openFAQ === i ? ' open' : ''}`}>▼</span>
              </button>
              <div className={`mw-faq-body${openFAQ === i ? ' open' : ''}`}>
                <div style={{ padding: '14px 20px 18px', borderTop: '1px solid rgba(255,255,255,0.08)', fontSize: '14px', color: 'rgba(255,255,255,0.88)', lineHeight: 1.65, ...sans }}>
                  {item.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          §12  STICKY BOTTOM BAR
      ══════════════════════════════════════ */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, height: '60px', zIndex: 9998,
        background: 'rgba(0,15,35,0.96)', borderTop: '1px solid rgba(243,183,87,0.28)',
        backdropFilter: 'blur(16px)',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.4)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px',
      }}>
        <div style={{ lineHeight: 1.2 }}>
          <span style={{ fontSize: '20px', fontWeight: 700, color: PL, ...sans }}>₹149/-</span>
          <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.85)', marginLeft: '4px', ...sans }}>Only</span>
          <br />
          <span style={{ fontSize: '12px', color: PL, fontWeight: 400, ...sans }}>(Limited Seats)</span>
        </div>
        <CTABtn text="Register Now →" sm />
      </div>

    </div>
  );
}
