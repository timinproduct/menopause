import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { T } from '../tokens';

const ENDPOINT = 'https://formspree.io/f/xeeneyvz';

export function FeedbackWidget() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [vote, setVote] = useState(null);
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState('idle');

  const screenName = location.pathname;

  const handleSubmit = async () => {
    setStatus('sending');
    try {
      await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          vote: vote === 'up' ? 'Positive 👍' : 'Negative 👎',
          screen: screenName,
          comment: comment.trim() || '—',
        }),
      });
      setStatus('done');
      setTimeout(() => {
        setOpen(false);
        setVote(null);
        setComment('');
        setStatus('idle');
      }, 2200);
    } catch {
      setStatus('idle');
    }
  };

  const close = () => {
    if (status === 'sending') return;
    setOpen(false);
    setVote(null);
    setComment('');
    setStatus('idle');
  };

  return (
    <>
      {/* Floating tab */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Give feedback"
          style={{
            position: 'fixed',
            right: 0,
            top: '42%',
            zIndex: 50,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '8px 10px 8px 12px',
            background: T.terracottaDeep,
            color: T.paper,
            border: 'none',
            borderRadius: '8px 0 0 8px',
            cursor: 'pointer',
            boxShadow: '-2px 2px 12px rgba(61,51,40,0.18)',
            fontFamily: T.sans,
            fontSize: 11.5,
            fontWeight: 500,
            letterSpacing: 0.4,
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            transform: 'rotate(180deg)',
          }}
        >
          <ChatIcon/>
          Feedback
        </button>
      )}

      {/* Overlay */}
      {open && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          {/* Backdrop */}
          <div
            onClick={close}
            style={{ position: 'absolute', inset: 0, background: 'rgba(61,51,40,0.35)', backdropFilter: 'blur(2px)' }}
          />

          {/* Sheet */}
          <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: 430,
            background: T.paper,
            borderRadius: '20px 20px 0 0',
            padding: '28px 24px 44px',
            boxShadow: '0 -8px 40px rgba(61,51,40,0.18)',
          }}>
            {/* Handle */}
            <div style={{ width: 36, height: 4, borderRadius: 2, background: T.sand, margin: '0 auto 24px' }}/>

            {status === 'done' ? (
              <ThankYou/>
            ) : (
              <>
                <p style={{
                  fontFamily: T.serif, fontSize: 20, fontWeight: 400,
                  margin: '0 0 6px', color: T.ink, lineHeight: 1.25,
                }}>
                  How's this feeling?
                </p>
                <p style={{ fontSize: 13, color: T.inkMuted, margin: '0 0 24px', lineHeight: 1.5 }}>
                  One tap is enough — your view matters.
                </p>

                {/* Thumbs */}
                <div style={{ display: 'flex', gap: 12, marginBottom: vote ? 20 : 0 }}>
                  <ThumbBtn
                    direction="up"
                    active={vote === 'up'}
                    onClick={() => setVote(v => v === 'up' ? null : 'up')}
                  />
                  <ThumbBtn
                    direction="down"
                    active={vote === 'down'}
                    onClick={() => setVote(v => v === 'down' ? null : 'down')}
                  />
                </div>

                {/* Optional comment — fades in after vote */}
                {vote && (
                  <>
                    <div style={{
                      padding: '12px 14px',
                      background: T.cream,
                      border: `1px solid ${T.sand}`,
                      borderRadius: T.radii.md,
                      marginBottom: 14,
                    }}>
                      <input
                        className="themaka-text"
                        autoFocus
                        placeholder="What made you say that? (optional)"
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                        style={{ fontSize: 14, color: T.ink, fontFamily: T.sans }}
                      />
                    </div>

                    <button
                      onClick={handleSubmit}
                      disabled={status === 'sending'}
                      style={{
                        width: '100%',
                        padding: '13px 14px',
                        borderRadius: T.radii.pill,
                        background: status === 'sending' ? T.sand : T.ink,
                        color: T.paper,
                        border: 'none',
                        fontFamily: T.sans,
                        fontSize: 14,
                        fontWeight: 500,
                        letterSpacing: 0.2,
                        cursor: status === 'sending' ? 'default' : 'pointer',
                        transition: 'background 0.2s',
                      }}
                    >
                      {status === 'sending' ? 'Sending…' : 'Send feedback'}
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function ThumbBtn({ direction, active, onClick }) {
  const isUp = direction === 'up';
  return (
    <button
      onClick={onClick}
      style={{
        flex: 1,
        padding: '18px 0',
        borderRadius: T.radii.md,
        border: `1.5px solid ${active ? (isUp ? T.sageDeep : T.terracottaDeep) : T.sand}`,
        background: active ? (isUp ? T.sageSoft : T.terracottaSoft) : 'transparent',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        transition: 'all 0.15s',
      }}
    >
      <span style={{ fontSize: 28, lineHeight: 1 }}>{isUp ? '👍' : '👎'}</span>
      <span style={{
        fontSize: 11.5,
        fontFamily: T.sans,
        fontWeight: 500,
        letterSpacing: 0.4,
        color: active ? (isUp ? T.sageDeep : T.terracottaDeep) : T.inkMuted,
        transition: 'color 0.15s',
      }}>
        {isUp ? 'Loving it' : 'Not quite'}
      </span>
    </button>
  );
}

function ThankYou() {
  return (
    <div style={{ textAlign: 'center', padding: '12px 0 8px' }}>
      <div style={{ fontSize: 40, marginBottom: 14 }}>🌿</div>
      <p style={{ fontFamily: T.serif, fontSize: 20, color: T.ink, margin: '0 0 6px' }}>
        Thank you.
      </p>
      <p style={{ fontSize: 13.5, color: T.inkMuted, margin: 0, lineHeight: 1.5 }}>
        Your feedback shapes every update.
      </p>
    </div>
  );
}

function ChatIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={{ transform: 'rotate(180deg)' }}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  );
}
