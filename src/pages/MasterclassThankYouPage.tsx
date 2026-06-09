import { useEffect, useState } from 'react';
import { CheckCircle2, Copy, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BRAND_NAME, MASTERCLASS_WHATSAPP_COMMUNITY_URL } from '../lib/constants';

export function MasterclassThankYouPage() {
  const [status, setStatus] = useState('Opening WhatsApp…');
  const [copied, setCopied] = useState(false);

  const communityUrl = MASTERCLASS_WHATSAPP_COMMUNITY_URL;

  useEffect(() => {
    if (!communityUrl) {
      setStatus('Community link will be shared with you shortly.');
      return;
    }

    const timer = window.setTimeout(() => {
      window.open(communityUrl, '_blank', 'noopener,noreferrer');
      setStatus('Opening WhatsApp…');
    }, 600);

    return () => window.clearTimeout(timer);
  }, [communityUrl]);

  const joinCommunity = () => {
    if (!communityUrl) return;
    window.open(communityUrl, '_blank', 'noopener,noreferrer');
    setStatus('Opening WhatsApp…');
  };

  const copyLink = async () => {
    if (!communityUrl) return;
    try {
      await navigator.clipboard.writeText(communityUrl);
      setCopied(true);
      setStatus('Link copied to clipboard.');
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setStatus('Could not copy — please use the button above.');
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center px-4 py-12 font-montserrat"
      style={{ background: 'linear-gradient(180deg, #F8F9FB 0%, #EFF1F5 100%)' }}
    >
      <div
        className="w-full max-w-lg rounded-2xl border-2 px-8 py-10 text-center shadow-[0_8px_40px_rgba(0,45,96,0.08)] sm:px-12 sm:py-12"
        style={{
          background: 'linear-gradient(180deg, #FFFBF5 0%, #FFF8EE 100%)',
          borderColor: 'rgba(216,138,34,0.45)',
        }}
      >
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-emerald-400/35 bg-emerald-500/15">
          <CheckCircle2 className="text-emerald-500" size={34} strokeWidth={2.25} />
        </div>

        <h1 className="font-cinzel text-xl font-bold leading-snug text-nebula-700 sm:text-2xl">
          You&apos;re Just One Step Away from Joining Our Private Community
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ink-600 sm:text-[15px]">
          Tap below and join our{' '}
          <strong className="font-semibold text-ink-800">exclusive WhatsApp community</strong>{' '}
          to get masterclass updates, reminders, and resources from {BRAND_NAME}.
        </p>

        <button
          type="button"
          onClick={joinCommunity}
          disabled={!communityUrl}
          className="btn-shimmer mt-8 w-full rounded-xl py-4 text-sm font-bold uppercase tracking-wide text-nebula-900 shadow-[0_4px_20px_rgba(216,138,34,0.35)] transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
          style={{ background: 'linear-gradient(135deg, #F3B757 0%, #D88A22 50%, #9A5E14 100%)' }}
        >
          Join the Community Now
        </button>

        <button
          type="button"
          onClick={copyLink}
          disabled={!communityUrl}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 bg-white/80 py-3.5 text-sm font-semibold text-nebula-700 transition-colors hover:border-gold-400/60 hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
          style={{ borderColor: 'rgba(216,138,34,0.4)' }}
        >
          {copied ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
          {copied ? 'Link Copied!' : 'Copy Join Link'}
        </button>

        <p className="mt-5 text-xs text-ink-400">{status}</p>

        <Link
          to="/masterclass"
          className="mt-6 inline-block text-xs font-medium text-gold-600 underline-offset-2 hover:text-gold-500 hover:underline"
        >
          ← Back to masterclass page
        </Link>
      </div>
    </div>
  );
}
