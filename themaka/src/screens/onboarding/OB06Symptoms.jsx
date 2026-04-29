import { T } from '../../tokens';
import { OBFrame, PrimaryBtn } from '../../components/OBShared';

const ITEMS = [
  { k: 'sleep',  t: 'Broken sleep',  s: '3am wake-ups' },
  { k: 'hot',    t: 'Hot flushes',   s: 'day or night' },
  { k: 'mood',   t: 'Mood shifts',   s: 'irritable, low' },
  { k: 'fog',    t: 'Brain fog' },
  { k: 'belly',  t: 'Belly weight' },
  { k: 'joint',  t: 'Achy joints' },
  { k: 'energy', t: 'Low energy',    s: 'afternoons' },
  { k: 'dry',    t: 'Dryness' },
];

export function OB06Symptoms({ onNext, onBack, userData, updateUser }) {
  const toggle = (key) => {
    const current = userData.symptoms;
    const next = current.includes(key)
      ? current.filter(k => k !== key)
      : [...current, key];
    updateUser({ symptoms: next });
  };

  return (
    <OBFrame step={5} total={12} label="Personalize · what you're feeling" onBack={onBack}
      footer={<PrimaryBtn onClick={onNext}>Continue</PrimaryBtn>}>
      <div style={{ padding: '24px 28px 0', position: 'relative', zIndex: 1 }}>
        <h1 style={{ fontFamily: T.serif, fontSize: 30, fontWeight: 400, margin: 0, lineHeight: 1.12, letterSpacing: -0.5, color: T.ink }}>
          What's been <em style={{ color: T.terracottaDeep }}>louder</em> lately?
        </h1>
        <p style={{ fontSize: 14, color: T.inkSoft, margin: '12px 0 0', lineHeight: 1.55 }}>
          Choose as many as feel true. Nothing here is a diagnosis — it shapes what we suggest each morning.
        </p>
      </div>

      <div style={{ padding: '20px 22px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, position: 'relative', zIndex: 1 }}>
        {ITEMS.map(it => {
          const on = userData.symptoms.includes(it.k);
          return (
            <div key={it.k} onClick={() => toggle(it.k)} style={{
              padding: '12px 14px', borderRadius: T.radii.md,
              background: on ? T.terracottaDeep : T.paper,
              border: `1px solid ${on ? T.terracottaDeep : T.sand}`,
              color: on ? T.paper : T.ink,
              position: 'relative', cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}>
              <div style={{ fontFamily: T.serif, fontSize: 15, lineHeight: 1.2 }}>{it.t}</div>
              {it.s && <div style={{ fontSize: 11, marginTop: 2, color: on ? 'rgba(255,251,242,0.75)' : T.inkMuted }}>{it.s}</div>}
              {on && (
                <div style={{ position: 'absolute', top: 8, right: 8, width: 16, height: 16, borderRadius: 8, background: T.paper, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke={T.terracottaDeep} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2.5 6.2l2.5 2.5L9.5 3.5"/>
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ flex: 1 }}/>
      <div style={{ padding: '0 22px 10px', fontSize: 12, color: T.inkMuted, textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <span style={{ color: T.terracottaDeep, fontWeight: 500 }}>{userData.symptoms.length}</span>
        {' '}selected · add any time from your journal
      </div>
    </OBFrame>
  );
}
