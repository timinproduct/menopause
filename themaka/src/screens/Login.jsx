import { useNavigate } from 'react-router-dom';
import { T } from '../tokens';
import { OBFrame, PrimaryBtn, GhostBtn } from '../components/OBShared';

export function Login() {
  const navigate = useNavigate();

  return (
    <OBFrame step={0} total={0} label="Sign in" onBack={null} showSkip={false}
      footer={<>
        <PrimaryBtn color={T.terracottaDeep} onClick={() => navigate('/home')}>
          Sign in
        </PrimaryBtn>
        <GhostBtn onClick={() => navigate('/onboarding/1')}>
          Create account
        </GhostBtn>
      </>}>
      <div style={{ padding: '48px 28px 0' }}>
        <div style={{ fontFamily: T.serif, fontSize: 22, fontStyle: 'italic', color: T.terracottaDeep, marginBottom: 20 }}>
          Themaka
        </div>
        <h1 style={{ fontFamily: T.serif, fontSize: 32, fontWeight: 400, margin: 0, lineHeight: 1.12, letterSpacing: -0.5, color: T.ink }}>
          Welcome back.
        </h1>
        <p style={{ fontSize: 14, color: T.inkSoft, margin: '12px 0 32px', lineHeight: 1.55 }}>
          Sign in to pick up where you left off.
        </p>

        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, letterSpacing: 1.6, textTransform: 'uppercase', color: T.inkMuted, marginBottom: 8 }}>Email</div>
          <div style={{ padding: '14px 16px', background: T.paper, borderRadius: T.radii.md, border: `1px solid ${T.sand}` }}>
            <input className="themaka-text" type="email" placeholder="you@example.com"
              style={{ fontFamily: T.serif, fontSize: 16, color: T.ink }}
              autoComplete="email"
            />
          </div>
        </div>

        <div>
          <div style={{ fontSize: 11, letterSpacing: 1.6, textTransform: 'uppercase', color: T.inkMuted, marginBottom: 8 }}>Password</div>
          <div style={{ padding: '14px 16px', background: T.paper, borderRadius: T.radii.md, border: `1px solid ${T.sand}` }}>
            <input className="themaka-text" type="password" placeholder="••••••••"
              style={{ fontFamily: T.serif, fontSize: 16, color: T.ink }}
              autoComplete="current-password"
            />
          </div>
        </div>

        <div style={{ textAlign: 'right', marginTop: 10 }}>
          <span style={{ fontSize: 13, color: T.terracottaDeep, cursor: 'pointer' }}>Forgot password?</span>
        </div>
      </div>
    </OBFrame>
  );
}
