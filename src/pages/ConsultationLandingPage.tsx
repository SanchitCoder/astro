import { useState, useEffect, useRef, type CSSProperties } from 'react';
import {
  THEME_DARK_BG,
  THEME_GOLD_GRD,
  THEME_DARK_STRIP_BG,
  GURU_IMG_RESOURCE,
  PHONE_TEL,
  PHONE,
} from '../lib/constants';
import './MegaWebinarPage.css';
import { LeadFormModalProvider, useOpenLeadForm } from '../components/LeadFormModalProvider';
import { YouTubeHeroPlayer } from '../components/YouTubeHeroPlayer';

const CONSULTATION_YOUTUBE_ID = 'lUHFBuRRtU0';

/* ── Tokens ── */
const P        = '#D88A22';
const PL       = '#F3B757';
const INK      = '#1F2937';
const INK_BODY = '#4B5563';
const INK_MUTED= '#6B7280';
const LIGHT    = '#F8F9FB';
const LIGHT_ALT= '#EFF1F5';
const BORDER   = '#E5E7EB';
const CTA_TEXT = '#002D60';

const serif: CSSProperties = { fontFamily: "'Playfair Display', serif" };
const sans:  CSSProperties = { fontFamily: "'Poppins', sans-serif" };

/* ── Shared micro-components ── */
function CTABtn({
  text = 'Book Your Consultation',
  full = false,
  sm = false,
  onClick,
}: {
  text?: string;
  full?: boolean;
  sm?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`mw-btn${full ? ' mw-btn-full' : ''}${sm ? ' mw-btn-sm' : ''}`}
    >
      {text}
    </button>
  );
}

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p style={{ fontSize: '11px', fontWeight: '600', color: light ? PL : P, letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '10px', ...sans }}>
      {children}
    </p>
  );
}

function Check({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '9px', fontSize: '14px', color: light ? 'rgba(255,255,255,0.88)' : INK_BODY, ...sans }}>
      <span style={{ color: P, fontWeight: '700', flexShrink: 0 }}>✓</span>
      <span>{children}</span>
    </div>
  );
}

/* ── Content ── */
const FOR_YOU = [
  { icon: '🌀', text: 'You are at a crossroads in career, relationships, or finances and need clarity.' },
  { icon: '📖', text: 'You want your Kundli read personally — not a template report, not an algorithm.' },
  { icon: '🌿', text: 'You are ready to understand the planetary timing shaping your life right now.' },
];

const CONSULT_TYPES = [
  {
    icon: '📞',
    type: 'Audio Consultation',
    duration: '45–60 min',
    includes: [
      'Full Kundli reading by Gurudev Anand',
      'Career, relationship & finance insights',
      'Active Dasha period analysis',
      'Personalised remedies from classical texts',
    ],
    accent: '#005EA8',
    light: false,
  },
  {
    icon: '🎥',
    type: 'Video Consultation',
    duration: '45–60 min',
    includes: [
      'Everything in Audio, plus face-to-face clarity',
      'Screen-shared chart walkthrough',
      'Active Dasha period analysis',
      'Personalised remedies from classical texts',
    ],
    accent: P,
    light: false,
    featured: true,
  },
];

const RECEIVE = [
  { icon: '🔍', title: 'Deep Chart Reading',     desc: 'Every major house, planet, and aspect relevant to your current life situation — read personally.' },
  { icon: '⏰', title: 'Dasha & Transit Timing', desc: 'Understand the planetary period you are in and the key transitions ahead in the next 12 months.' },
  { icon: '🛤️', title: 'Actionable Guidance',   desc: 'Clear, specific guidance for your decisions — career moves, relationship choices, financial timing.' },
  { icon: '🌿', title: 'Classical Remedies',     desc: 'Mantras, rituals, and gemstone recommendations chosen specifically for your Kundli.' },
];

const STEPS = [
  { n: '01', title: 'Book Your Session',   desc: 'Select your preferred format and submit your details. Our team confirms your booking via email.' },
  { n: '02', title: 'Share Birth Details', desc: 'Provide your full name, date, time, and place of birth via WhatsApp or email.' },
  { n: '03', title: 'Receive a Time Slot', desc: 'Gurudev Anand\'s team schedules your session within 24–48 hours of booking.' },
  { n: '04', title: 'Your Session',        desc: 'Join the private call. Ask everything. Walk away with clarity you can act on.' },
];

const MENTOR_POINTS = [
  '31+ years of Vedic astrology practice',
  'Expert in Numerology, Vastu Shastra & Palmistry',
  'Reads every chart personally — no assistants, no templates',
  'Global clients across 50+ countries',
];

const TESTIMONIALS = [
  {
    quote: '"The consultation gave me clarity I had been searching for years. Gurudev Anand read my chart in a way that felt deeply personal — not generic at all."',
    name: 'Priya S.', loc: 'Mumbai',
  },
  {
    quote: '"He told me things about my career timing that turned out to be exactly right. I booked a second session six months later."',
    name: 'Rahul M.', loc: 'Bangalore',
  },
  {
    quote: '"I was skeptical, but the accuracy was remarkable. The remedies he suggested are simple and practical. Highly recommend."',
    name: 'Anita K.', loc: 'Dubai',
  },
];

const FAQ_DATA = [
  { q: 'What information do I need to share before the session?',
    a: 'Your full name, date of birth, exact time of birth, and place of birth. For couple consultations, the same details for both partners. The more accurate your birth time, the more precise the reading.' },
  { q: 'How long does a consultation last?',
    a: 'Sessions typically run 45–60 minutes. Complex charts or charts with multiple active dashas may run slightly longer — there is no hard cutoff.' },
  { q: 'Can I book if I don\'t know my exact birth time?',
    a: 'Yes. Gurudev Anand uses alternative rectification methods when the exact time is unknown. Mention this at booking so the session is planned accordingly.' },
  { q: 'How soon can I get a session?',
    a: 'Most clients receive a confirmed slot within 24–48 hours of booking. Urgent slots are available for pressing situations — mention this when booking.' },
  { q: 'Is the session confidential?',
    a: 'Completely. All consultation details, chart readings, and personal information are kept strictly private. Sessions are never recorded without your explicit consent.' },
  { q: 'Can I ask about a specific topic — only career, or only marriage?',
    a: 'Yes. You can focus the session on one life area. Gurudev Anand will concentrate the reading on the relevant houses and planetary periods for that topic.' },
];

/* ── Main Component ── */
function ConsultationLandingPageContent() {
  const openForm = useOpenLeadForm();
  const heroRef = useRef<HTMLElement>(null);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  useEffect(() => {
    const prev = { top: document.body.style.paddingTop, bottom: document.body.style.paddingBottom };
    document.body.style.paddingTop    = '36px';
    document.body.style.paddingBottom = '60px';
    return () => {
      document.body.style.paddingTop    = prev.top;
      document.body.style.paddingBottom = prev.bottom;
    };
  }, []);

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
        fontSize: '12px', color: CTA_TEXT, letterSpacing: '1.5px', fontWeight: '600', ...sans,
      }}>
        ✦ &nbsp; Personal Consultations Now Open — Limited Slots
      </div>

      {/* ══════════════════════════════════════
          §2  HERO
      ══════════════════════════════════════ */}
      <section
        ref={heroRef}
        style={{ background: THEME_DARK_BG, padding: '64px 20px 72px', position: 'relative', overflow: 'hidden' }}
      >
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 55% 65% at 70% 50%, rgba(216,138,34,0.08), transparent 65%)' }} />

        <div className="mw-wrap mw-grid-2 mw-grid-2-center" style={{ position: 'relative', zIndex: 1 }}>

          {/* Left */}
          <div className="mw-anim">
            <Eyebrow light>One-on-One Consultation</Eyebrow>

            <h1 style={{ ...serif, fontSize: 'clamp(28px, 4.5vw, 48px)', lineHeight: 1.2, color: 'white', fontWeight: 700, marginBottom: '18px' }}>
              Your Chart.<br />
              Your Life.<br />
              <em style={{ color: PL }}>Read Personally.</em>
            </h1>

            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.82)', lineHeight: 1.7, marginBottom: '32px', maxWidth: '440px' }}>
              A private Vedic astrology consultation with Gurudev Anand. No templates, no assistants — your Kundli, read in full, just for you.
            </p>

            {/* Simple detail row */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '32px' }}>
              {[
                { icon: '⏱', text: '45–60 min session' },
                { icon: '🌏', text: 'Online or In-Person' },
                { icon: '🔒', text: 'Fully Confidential'  },
              ].map(d => (
                <div key={d.text} style={{
                  display: 'flex', alignItems: 'center', gap: '7px',
                  background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '9999px', padding: '7px 14px',
                  fontSize: '13px', color: 'rgba(255,255,255,0.88)',
                }}>
                  <span>{d.icon}</span>{d.text}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <CTABtn onClick={openForm} text="Book Your Consultation →" />
              <a href={PHONE_TEL} style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                border: '1px solid rgba(255,255,255,0.25)', borderRadius: '9999px',
                padding: '13px 24px', color: 'white', fontSize: '14px', fontWeight: 500,
                textDecoration: 'none', transition: 'border-color 0.2s', ...sans,
              }}>
                📞 {PHONE}
              </a>
            </div>
          </div>

          {/* RIGHT — YouTube hero video */}
          <div className="mw-anim mw-delay" style={{ width: '100%', maxWidth: '380px', margin: '0 auto' }}>
            <YouTubeHeroPlayer
              videoId={CONSULTATION_YOUTUBE_ID}
              observeRef={heroRef}
              ariaLabel="Consultation preview"
            />
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════
          §3  FEATURED IN
      ══════════════════════════════════════ */}
      <section style={{ background: THEME_DARK_STRIP_BG, padding: '28px 20px', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="mw-wrap" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
          <span style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.5)', letterSpacing: '2px', textTransform: 'uppercase' }}>As seen in</span>
          {['Outlook', 'The Telegraph', 'News18', 'LatestLY', 'The Tribune'].map(b => (
            <span key={b} style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.75)' }}>{b}</span>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          §4  WHO IS THIS FOR
      ══════════════════════════════════════ */}
      <section style={{ background: LIGHT, padding: '72px 20px' }}>
        <div className="mw-wrap" style={{ maxWidth: '720px', margin: '0 auto' }}>
          <div className="mw-anim" style={{ textAlign: 'center', marginBottom: '40px' }}>
            <Eyebrow>This consultation is for you if</Eyebrow>
            <h2 style={{ ...serif, fontSize: 'clamp(24px, 4vw, 34px)', color: INK, fontWeight: 700, lineHeight: 1.25 }}>
              You are ready for <span style={{ color: P }}>real answers</span>
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {FOR_YOU.map((f, i) => (
              <div key={i} className="mw-anim" style={{
                display: 'flex', alignItems: 'flex-start', gap: '16px',
                background: 'white', borderRadius: '14px', padding: '18px 22px',
                border: `1px solid ${BORDER}`, boxShadow: '0 1px 6px rgba(0,0,0,0.04)',
              }}>
                <span style={{ fontSize: '22px', flexShrink: 0 }}>{f.icon}</span>
                <span style={{ fontSize: '15px', color: INK_BODY, lineHeight: 1.6 }}>{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          §5  CONSULTATION TYPES
      ══════════════════════════════════════ */}
      <section style={{ background: 'white', padding: '72px 20px' }}>
        <div className="mw-wrap">
          <div className="mw-anim" style={{ textAlign: 'center', marginBottom: '44px' }}>
            <Eyebrow>Choose Your Session</Eyebrow>
            <h2 style={{ ...serif, fontSize: 'clamp(24px, 4vw, 34px)', color: INK, fontWeight: 700 }}>
              Two ways to connect
            </h2>
            <p style={{ fontSize: '14px', color: INK_MUTED, marginTop: '10px' }}>Both sessions are identical in depth — choose whichever format you prefer.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', maxWidth: '740px', margin: '0 auto' }}>
            {CONSULT_TYPES.map((c, i) => (
              <div key={i} className="mw-anim" style={{
                borderRadius: '18px', padding: '28px',
                border: c.featured ? `2px solid ${P}` : `1px solid ${BORDER}`,
                background: c.featured ? 'white' : LIGHT_ALT,
                boxShadow: c.featured ? '0 8px 32px rgba(216,138,34,0.15)' : '0 2px 8px rgba(0,0,0,0.04)',
                position: 'relative',
              }}>
                {c.featured && (
                  <div style={{
                    position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)',
                    background: THEME_GOLD_GRD, color: CTA_TEXT,
                    borderRadius: '9999px', padding: '4px 18px',
                    fontSize: '11px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase',
                    whiteSpace: 'nowrap', ...sans,
                  }}>Most Booked</div>
                )}

                <div style={{ fontSize: '28px', marginBottom: '12px' }}>{c.icon}</div>
                <h3 style={{ ...sans, fontSize: '17px', fontWeight: 700, color: INK, marginBottom: '4px' }}>{c.type}</h3>
                <p style={{ fontSize: '13px', color: INK_MUTED, marginBottom: '22px' }}>{c.duration}</p>

                <div style={{ marginBottom: '22px' }}>
                  {c.includes.map(line => <Check key={line}>{line}</Check>)}
                </div>

                <CTABtn
                  full
                  onClick={openForm}
                  text={`Book ${c.type.split(' ')[0]} Call`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          §6  WHAT YOU RECEIVE
      ══════════════════════════════════════ */}
      <section style={{ background: LIGHT, padding: '72px 20px' }}>
        <div className="mw-wrap">
          <div className="mw-anim" style={{ textAlign: 'center', marginBottom: '44px' }}>
            <Eyebrow>Every Session Includes</Eyebrow>
            <h2 style={{ ...serif, fontSize: 'clamp(24px, 4vw, 32px)', color: INK, fontWeight: 700 }}>
              What you walk away with
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            {RECEIVE.map((r, i) => (
              <div key={i} className="mw-anim" style={{
                background: 'white', borderRadius: '16px', padding: '22px',
                border: `1px solid ${BORDER}`, boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              }}>
                <div style={{
                  width: '44px', height: '44px', borderRadius: '12px',
                  background: 'rgba(216,138,34,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '20px', marginBottom: '14px',
                }}>{r.icon}</div>
                <h4 style={{ ...sans, fontSize: '15px', fontWeight: 600, color: INK, marginBottom: '6px' }}>{r.title}</h4>
                <p style={{ fontSize: '13px', color: INK_MUTED, lineHeight: 1.6 }}>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          §7  HOW IT WORKS
      ══════════════════════════════════════ */}
      <section style={{ background: THEME_DARK_BG, padding: '72px 20px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(216,138,34,0.07), transparent 60%)' }} />
        <div className="mw-wrap" style={{ position: 'relative', zIndex: 1 }}>
          <div className="mw-anim" style={{ textAlign: 'center', marginBottom: '48px' }}>
            <Eyebrow light>Simple Process</Eyebrow>
            <h2 style={{ ...serif, fontSize: 'clamp(24px, 4vw, 32px)', color: 'white', fontWeight: 700 }}>
              From booking to <span style={{ color: PL }}>breakthrough</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {STEPS.map((s, i) => (
              <div key={i} className="mw-anim" style={{ position: 'relative' }}>
                {/* Connector line between steps on desktop */}
                {i < STEPS.length - 1 && (
                  <div style={{
                    display: 'none',
                    position: 'absolute', top: '22px', left: '100%',
                    width: '100%', height: '1px',
                    background: 'linear-gradient(90deg, rgba(243,183,87,0.4), transparent)',
                  }} />
                )}
                <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '16px', padding: '22px', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '50%',
                    background: i === 0 ? THEME_GOLD_GRD : 'rgba(216,138,34,0.15)',
                    border: i === 0 ? 'none' : `1px solid rgba(216,138,34,0.3)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '12px', fontWeight: 700, color: i === 0 ? CTA_TEXT : PL,
                    marginBottom: '14px', ...sans,
                  }}>{s.n}</div>
                  <h4 style={{ ...sans, fontSize: '14px', fontWeight: 600, color: 'white', marginBottom: '6px' }}>{s.title}</h4>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.6 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '44px' }}>
            <CTABtn onClick={openForm} text="Book Your Session →" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          §8  ABOUT THE MENTOR
      ══════════════════════════════════════ */}
      <section style={{ background: 'white', padding: '72px 20px' }}>
        <div className="mw-wrap mw-grid-2 mw-grid-2-center">

          {/* Photo */}
          <div className="mw-anim" style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{
              width: '100%', maxWidth: '360px',
              borderRadius: '20px', overflow: 'hidden',
              boxShadow: '0 16px 48px -8px rgba(0,0,0,0.15)',
              border: `1px solid ${BORDER}`,
            }}>
              <img
                src={GURU_IMG_RESOURCE}
                alt="Gurudev Anand"
                style={{ width: '100%', display: 'block', objectFit: 'cover', objectPosition: 'top', minHeight: '320px' }}
              />
            </div>
          </div>

          {/* Text */}
          <div className="mw-anim mw-delay">
            <Eyebrow>Your Astrologer</Eyebrow>
            <h2 style={{ ...serif, fontSize: 'clamp(26px, 4vw, 36px)', color: INK, fontWeight: 700, marginBottom: '16px' }}>
              Gurudev <span style={{ color: P, fontStyle: 'italic' }}>Anand</span>
            </h2>
            <p style={{ fontSize: '15px', color: INK_BODY, lineHeight: 1.75, marginBottom: '20px' }}>
              With over 31 years of dedicated practice in Vedic astrology, Gurudev Anand brings scholarly rigour and genuine warmth to every reading. He has conducted over 1.2 lakh consultations and is known for his plain, actionable explanations of complex planetary influences.
            </p>

            {MENTOR_POINTS.map(p => <Check key={p}>{p}</Check>)}

            <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', gap: '3px' }}>
                {[1,2,3,4,5].map(i => (
                  <span key={i} style={{ color: P, fontSize: '16px' }}>★</span>
                ))}
              </div>
              <span style={{ fontSize: '13px', color: INK_MUTED }}>4.9 / 5 &nbsp;·&nbsp; 10,000+ reviews</span>
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════
          §9  TESTIMONIALS
      ══════════════════════════════════════ */}
      <section style={{ background: LIGHT_ALT, padding: '72px 20px' }}>
        <div className="mw-wrap">
          <div className="mw-anim" style={{ textAlign: 'center', marginBottom: '40px' }}>
            <Eyebrow>What Clients Say</Eyebrow>
            <h2 style={{ ...serif, fontSize: 'clamp(22px, 3.5vw, 30px)', color: INK, fontWeight: 700 }}>
              In their own words
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '40px' }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="mw-anim" style={{
                background: 'white', borderRadius: '16px', padding: '24px',
                border: `1px solid ${BORDER}`, boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                position: 'relative',
              }}>
                {/* Quote mark */}
                <div style={{ ...serif, fontSize: '52px', color: 'rgba(216,138,34,0.15)', lineHeight: 1, position: 'absolute', top: '12px', right: '18px', userSelect: 'none' }}>&ldquo;</div>
                <p style={{ fontSize: '14px', color: INK_BODY, lineHeight: 1.7, fontStyle: 'italic', marginBottom: '18px', paddingRight: '20px' }}>
                  {t.quote}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderTop: `1px solid ${BORDER}`, paddingTop: '14px' }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '50%',
                    background: 'rgba(216,138,34,0.12)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '14px', fontWeight: 700, color: P, ...sans,
                  }}>{t.name.charAt(0)}</div>
                  <div>
                    <p style={{ fontSize: '13px', fontWeight: 600, color: INK, margin: 0, ...sans }}>{t.name}</p>
                    <p style={{ fontSize: '12px', color: INK_MUTED, margin: 0, ...sans }}>{t.loc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <CTABtn onClick={openForm} />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          §10  FAQ
      ══════════════════════════════════════ */}
      <section style={{ background: LIGHT, padding: '72px 20px' }}>
        <div className="mw-wrap-narrow">
          <h2 className="mw-anim" style={{ ...serif, fontSize: 'clamp(22px, 4vw, 30px)', color: INK, marginBottom: '36px', textAlign: 'center', fontWeight: 700 }}>
            Common <span style={{ color: P }}>questions</span>
          </h2>

          {FAQ_DATA.map((item, i) => (
            <div key={i} className="mw-anim" style={{
              background: 'white', borderRadius: '12px',
              border: openFAQ === i ? `1px solid rgba(216,138,34,0.35)` : `1px solid ${BORDER}`,
              marginBottom: '10px', overflow: 'hidden',
              boxShadow: openFAQ === i ? '0 4px 16px rgba(216,138,34,0.08)' : 'none',
              transition: 'box-shadow 0.3s ease',
            }}>
              <button
                type="button"
                onClick={() => toggle(i)}
                style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 20px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', ...sans }}
              >
                <span style={{ fontSize: '15px', fontWeight: 500, color: INK, lineHeight: 1.4 }}>{item.q}</span>
                <span className={`mw-arrow${openFAQ === i ? ' open' : ''}`}>▼</span>
              </button>
              <div className={`mw-faq-body${openFAQ === i ? ' open' : ''}`}>
                <div style={{ padding: '14px 20px 18px', borderTop: `1px solid ${BORDER}`, fontSize: '14px', color: INK_MUTED, lineHeight: 1.7, ...sans }}>
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
        background: 'rgba(0,15,35,0.96)', borderTop: '1px solid rgba(243,183,87,0.25)',
        backdropFilter: 'blur(16px)',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.35)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px',
      }}>
        <div style={{ lineHeight: 1.2 }}>
          <span style={{ fontSize: '18px', fontWeight: 700, color: PL, ...sans }}>1-on-1 Consultation</span>
          <br />
          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.55)', fontWeight: 400, ...sans }}>Audio & Video sessions available</span>
        </div>
        <CTABtn onClick={openForm} text="Book Now →" sm />
      </div>

    </div>
  );
}

export function ConsultationLandingPage() {
  return (
    <LeadFormModalProvider source="consultation_form">
      <ConsultationLandingPageContent />
    </LeadFormModalProvider>
  );
}
