import { T } from '../../tokens';
import { OBFrame, PrimaryBtn } from '../../components/OBShared';

export function OB02Account({ onNext, onBack, userData, updateUser }) {
  return (
    <OBFrame step={1} total={12} label="Registration · 1 of 2" onBack={onBack}
      footer={<>
        <PrimaryBtn onClick={onNext}>Continue with email</PrimaryBtn>
        <div style={{ textAlign: 'center', marginTop: 12, fontSize: 11, color: T.inkMuted, lineHeight: 1.5 }}>
          By continuing you agree to our <u>terms</u> and <u>privacy</u>.
        </div>
      </>}>
      <div style={{ padding: '24px 28px 0', position: 'relative', zIndex: 1 }}>
        <h1 style={{ fontFamily: T.serif, fontSize: 28, fontWeight: 400, margin: 0, lineHeight: 1.12, letterSpacing: -0.5, color: T.ink }}>
          Let's make a <em style={{ color: T.terracottaDeep }}>space</em> that's yours.
        </h1>
        <p style={{ fontSize: 14, color: T.inkSoft, margin: '12px 0 0', lineHeight: 1.55 }}>
          Your cycle and symptom data stays on your phone. We only sync what you choose.
        </p>

        <div style={{ marginTop: 22 }}>
          <div style={{ fontSize: 11, letterSpacing: 1.6, textTransform: 'uppercase', color: T.inkMuted, marginBottom: 8 }}>
            Email
          </div>
          <div style={{
            padding: '14px 16px', background: T.paper, borderRadius: T.radii.md,
            border: `1px solid ${userData.email ? T.terracottaSoft : T.sand}`,
            fontFamily: T.serif, fontSize: 16, color: T.ink,
            display: 'flex', alignItems: 'center',
            transition: 'border-color 0.2s',
          }}>
            <input
              className="themaka-text"
              style={{ fontFamily: T.serif, fontSize: 16, color: T.ink }}
              type="email"
              placeholder="you@example.com"
              value={userData.email}
              onChange={e => updateUser({ email: e.target.value })}
              autoComplete="email"
            />
            {!userData.email && (
              <span style={{ display: 'inline-block', width: 1.2, height: 18, background: T.terracottaDeep, marginLeft: 2, flexShrink: 0, animation: 'themaka-blink 1.1s infinite' }}/>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '22px 0' }}>
          <div style={{ flex: 1, height: 1, background: T.sand }}/>
          <span style={{ fontSize: 11, color: T.inkMuted, letterSpacing: 1 }}>OR</span>
          <div style={{ flex: 1, height: 1, background: T.sand }}/>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <SocialBtn label="Continue with Apple" glyph="apple"/>
          <SocialBtn label="Continue with Google" glyph="google"/>
        </div>
      </div>
    </OBFrame>
  );
}

function SocialBtn({ label, glyph }) {
  const icons = {
    apple: <path d="M16.4 12.8c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.8-2-1.6-.2-3.2.9-4 .9-.8 0-2.1-.9-3.5-.9-1.8 0-3.5 1-4.4 2.7-1.9 3.3-.5 8.1 1.4 10.8.9 1.3 2 2.7 3.4 2.7 1.4-.1 1.9-.9 3.5-.9 1.6 0 2.1.9 3.5.8 1.5 0 2.4-1.3 3.3-2.6 1-1.5 1.5-3 1.5-3.1-.1-.1-2.8-1.1-2.8-4.5zM13.9 5.1c.7-.9 1.2-2.1 1-3.4-1.1.1-2.4.7-3.1 1.6-.7.8-1.2 2.1-1.1 3.3 1.2.1 2.5-.6 3.2-1.5z" fill={T.ink}/>,
    google: <path d="M21.35 11.1H12v3.83h5.35A5.36 5.36 0 0 1 12 19.27a7.27 7.27 0 1 1 0-14.54c1.74 0 3.3.7 4.47 1.84l2.71-2.71A11.1 11.1 0 1 0 12 23.27c6.07 0 10.1-4.26 10.1-10.26 0-.7-.07-1.22-.15-1.91z" fill={T.ink}/>,
  };
  return (
    <button style={{
      width: '100%', padding: '13px', borderRadius: T.radii.pill,
      background: T.paper, border: `1px solid ${T.sand}`,
      fontFamily: 'inherit', fontSize: 14, fontWeight: 500, color: T.ink,
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, cursor: 'pointer',
    }}>
      <svg width="18" height="18" viewBox="0 0 24 24">{icons[glyph]}</svg>
      {label}
    </button>
  );
}
