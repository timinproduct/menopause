import { T } from '../../tokens';
import { OBFrame, PrimaryBtn } from '../../components/OBShared';

const LEVELS = [
  { k: 'gentle', t: 'Gentle', s: 'Walks, yoga, stretching' },
  { k: 'active', t: 'Active', s: 'A few workouts a week' },
  { k: 'strong', t: 'Strong', s: 'Structured training' },
  { k: 'rest',   t: 'Resting', s: 'Healing, low energy' },
];

function BarsGlyph({ level }) {
  const heights = { gentle: [6,9,6], active: [7,13,9], strong: [8,15,12], rest: [5,5,5] }[level] || [6,9,6];
  return (
    <svg width="20" height="18" viewBox="0 0 20 18">
      {heights.map((h, i) => <rect key={i} x={3 + i * 6} y={16 - h} width="4" height={h} rx="1" fill="currentColor"/>)}
    </svg>
  );
}

export function OB08Move({ onNext, onBack, userData, updateUser }) {
  return (
    <OBFrame step={7} total={12} label="Personalize · how you move" onBack={onBack}
      footer={<PrimaryBtn onClick={onNext}>Continue</PrimaryBtn>}>
      <div style={{ padding: '24px 28px 0', position: 'relative', zIndex: 1 }}>
        <h1 style={{ fontFamily: T.serif, fontSize: 30, fontWeight: 400, margin: 0, lineHeight: 1.12, letterSpacing: -0.5, color: T.ink }}>
          How's your body <em style={{ color: T.terracottaDeep }}>moving</em>?
        </h1>
        <p style={{ fontSize: 14, color: T.inkSoft, margin: '12px 0 0', lineHeight: 1.55 }}>
          Perimenopause changes what your body thanks you for. We'll match effort to your phase — some weeks gentler, some stronger.
        </p>
      </div>

      <div style={{ padding: '18px 22px 0', display: 'flex', flexDirection: 'column', gap: 10, position: 'relative', zIndex: 1 }}>
        {LEVELS.map(l => {
          const on = userData.movementLevel === l.k;
          return (
            <div key={l.k} onClick={() => updateUser({ movementLevel: l.k })} style={{
              padding: '14px 16px', borderRadius: T.radii.md,
              background: on ? T.creamWarm : T.paper,
              border: `1px solid ${on ? T.terracottaSoft : T.sand}`,
              display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 18,
                background: on ? T.terracottaDeep : T.cream,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: on ? T.paper : T.inkMuted,
                transition: 'all 0.15s ease',
              }}>
                <BarsGlyph level={l.k}/>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: T.serif, fontSize: 17, color: T.ink, lineHeight: 1.1 }}>{l.t}</div>
                <div style={{ fontSize: 12.5, color: T.inkMuted, marginTop: 2 }}>{l.s}</div>
              </div>
              <div style={{
                width: 20, height: 20, borderRadius: 10,
                border: `1.2px solid ${on ? T.terracottaDeep : T.inkMuted}66`,
                background: on ? T.terracottaDeep : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.15s ease',
              }}>
                {on && (
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke={T.paper} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2.5 6.2l2.5 2.5L9.5 3.5"/>
                  </svg>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </OBFrame>
  );
}
