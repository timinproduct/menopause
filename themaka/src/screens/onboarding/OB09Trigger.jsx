import { T } from '../../tokens';
import { OBFrame, PrimaryBtn, SectionLabel } from '../../components/OBShared';
import { formatTime } from '../../utils';

export function OB09Trigger({ onNext, onBack, userData, updateUser }) {
  const allow = () => { updateUser({ notifAllowed: true }); onNext(); };
  const decline = () => { updateUser({ notifAllowed: false }); onNext(); };
  const wakeStr = formatTime(userData.wakeMinutes);

  return (
    <OBFrame step={8} total={12} label="Hook · external trigger" onBack={onBack}
      footer={<>
        <PrimaryBtn color={T.terracottaDeep} onClick={allow}>Allow morning check-in</PrimaryBtn>
        <div style={{ textAlign: 'center', marginTop: 10 }}>
          <button onClick={decline} style={{ border: 'none', background: 'transparent', color: T.inkMuted, fontSize: 12, cursor: 'pointer' }}>
            Not now
          </button>
        </div>
      </>}>
      <div style={{ padding: '24px 28px 0', position: 'relative', zIndex: 1 }}>
        <SectionLabel color={T.terracottaDeep}>The morning nudge</SectionLabel>
        <h1 style={{ fontFamily: T.serif, fontSize: 30, fontWeight: 400, margin: 0, lineHeight: 1.12, letterSpacing: -0.5, color: T.ink }}>
          One small <em style={{ color: T.terracottaDeep }}>ping</em> at {wakeStr}.
        </h1>
        <p style={{ fontSize: 14, color: T.inkSoft, margin: '12px 0 0', lineHeight: 1.55 }}>
          So you don't have to remember us — we'll arrive exactly when your body will thank you for a warm breakfast.
        </p>
      </div>

      <div style={{
        margin: '22px 18px 0', padding: 16, borderRadius: T.radii.xl,
        background: T.paper, border: `1px solid ${T.sand}`, position: 'relative', zIndex: 1,
      }}>
        <div style={{ fontSize: 10, letterSpacing: 1.8, textTransform: 'uppercase', color: T.inkMuted, marginBottom: 10 }}>
          Preview · tomorrow morning
        </div>
        <div style={{
          padding: '12px 14px', background: T.cream, borderRadius: T.radii.md,
          border: `1px solid ${T.sand}`, display: 'flex', gap: 10, alignItems: 'flex-start',
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: 14, background: T.terracottaDeep, flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: T.serif, fontSize: 15, color: T.paper, fontStyle: 'italic',
          }}>t</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', gap: 8, fontSize: 11, color: T.inkMuted, letterSpacing: 0.5, marginBottom: 4 }}>
              <span style={{ fontWeight: 500 }}>THEMAKA</span><span>·</span><span>{wakeStr}</span>
            </div>
            <div style={{ fontFamily: T.serif, fontSize: 15, color: T.ink, lineHeight: 1.3 }}>
              Good morning{userData.name ? `, ${userData.name}` : ''}.
            </div>
            <div style={{ fontSize: 13, color: T.inkSoft, lineHeight: 1.4, marginTop: 2 }}>
              Eat within 15 min — here's what your body wants today.
            </div>
          </div>
        </div>
      </div>

      <div style={{ margin: '18px 28px 0', display: 'flex', alignItems: 'center', gap: 10, position: 'relative', zIndex: 1 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 16, background: T.sageSoft,
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: T.sageDeep, flexShrink: 0,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <rect x="4" y="5" width="16" height="16" rx="2"/><path d="M8 3v4M16 3v4M4 10h16"/>
          </svg>
        </div>
        <div style={{ fontSize: 13, color: T.inkSoft, lineHeight: 1.4 }}>
          Once a day, gently. No streaks, no guilt.
        </div>
      </div>
    </OBFrame>
  );
}
