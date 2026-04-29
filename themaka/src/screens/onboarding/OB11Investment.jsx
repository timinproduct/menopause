import { T } from '../../tokens';
import { OBFrame, PrimaryBtn } from '../../components/OBShared';

const RITUALS = [
  { k: 'eat15',  t: 'Eat within 15 min of waking',          s: 'steadies cortisol' },
  { k: 'walk',   t: 'A morning walk, three times this week', s: 'mood & insulin' },
  { k: 'mag',    t: 'Magnesium-rich dinner tonight',         s: 'better sleep' },
  { k: 'wind',   t: 'Phone down by 9:45 pm',                 s: 'in sync with your phase' },
  { k: 'note',   t: 'One-word mood log each evening',        s: "30 seconds, that's it" },
  { k: 'strong', t: 'One strength session this week',        s: 'bones & belly' },
];

const MAX = 3;

export function OB11Investment({ onNext, onBack, userData, updateUser }) {
  const selected = userData.rituals;

  const toggle = (key) => {
    const on = selected.includes(key);
    if (!on && selected.length >= MAX) return; // enforce max
    updateUser({
      rituals: on ? selected.filter(k => k !== key) : [...selected, key],
    });
  };

  return (
    <OBFrame step={10} total={12} label="Hook · your investment" onBack={onBack}
      footer={<PrimaryBtn color={T.terracottaDeep} onClick={onNext}>These three · let's begin</PrimaryBtn>}>
      <div style={{ padding: '24px 28px 0', position: 'relative', zIndex: 1 }}>
        <h1 style={{ fontFamily: T.serif, fontSize: 30, fontWeight: 400, margin: 0, lineHeight: 1.12, letterSpacing: -0.5, color: T.ink }}>
          Pick <em style={{ color: T.terracottaDeep }}>three</em> to try this week.
        </h1>
        <p style={{ fontSize: 14, color: T.inkSoft, margin: '12px 0 0', lineHeight: 1.55 }}>
          Small rituals you actually commit to. We'll gently check in, and adjust as your body responds.
        </p>
      </div>

      <div style={{ padding: '18px 22px 0', display: 'flex', flexDirection: 'column', gap: 8, position: 'relative', zIndex: 1 }}>
        {RITUALS.map(r => {
          const on = selected.includes(r.k);
          const disabled = !on && selected.length >= MAX;
          return (
            <div key={r.k} onClick={() => !disabled && toggle(r.k)} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '12px 14px',
              background: T.paper,
              border: `1px solid ${on ? T.terracottaDeep : T.sand}`,
              borderRadius: T.radii.md,
              cursor: disabled ? 'default' : 'pointer',
              opacity: disabled ? 0.45 : 1,
              transition: 'all 0.15s ease',
            }}>
              <div style={{
                width: 22, height: 22, borderRadius: 11,
                border: `1.2px solid ${on ? T.terracottaDeep : T.inkMuted}55`,
                background: on ? T.terracottaDeep : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                transition: 'all 0.15s ease',
              }}>
                {on && (
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke={T.paper} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2.5 6.2l2.5 2.5L9.5 3.5"/>
                  </svg>
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: T.serif, fontSize: 14.5, color: T.ink, lineHeight: 1.3 }}>{r.t}</div>
                <div style={{ fontSize: 11.5, color: T.inkMuted, marginTop: 2, fontStyle: 'italic' }}>{r.s}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ flex: 1 }}/>
      <div style={{ padding: '0 22px 8px', textAlign: 'center', fontSize: 11.5, color: T.inkMuted, position: 'relative', zIndex: 1 }}>
        <span style={{ color: T.terracottaDeep, fontWeight: 500 }}>{selected.length}</span> of {MAX} chosen
      </div>
    </OBFrame>
  );
}
