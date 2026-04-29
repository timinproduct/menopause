import { T } from '../../tokens';
import { OBFrame, PrimaryBtn, chipStyle } from '../../components/OBShared';

const STYLES = [
  { k: 'omni',   t: 'Everything' },
  { k: 'plants', t: 'Mostly plants' },
  { k: 'fish',   t: 'Pescatarian' },
  { k: 'veg',    t: 'Vegetarian' },
  { k: 'vegan',  t: 'Vegan' },
];
const AVOID = [
  { k: 'gluten', t: 'Gluten' },
  { k: 'dairy',  t: 'Dairy' },
  { k: 'caff',   t: 'Caffeine' },
  { k: 'alc',    t: 'Alcohol' },
  { k: 'sugar',  t: 'Added sugar' },
  { k: 'spicy',  t: 'Very spicy' },
];

export function OB07Food({ onNext, onBack, userData, updateUser }) {
  const toggleAvoid = (key) => {
    const current = userData.foodAvoid;
    updateUser({
      foodAvoid: current.includes(key) ? current.filter(k => k !== key) : [...current, key],
    });
  };

  return (
    <OBFrame step={6} total={12} label="Personalize · what nourishes you" onBack={onBack}
      footer={<PrimaryBtn onClick={onNext}>Continue</PrimaryBtn>}>
      <div style={{ padding: '24px 28px 0', position: 'relative', zIndex: 1 }}>
        <h1 style={{ fontFamily: T.serif, fontSize: 30, fontWeight: 400, margin: 0, lineHeight: 1.12, letterSpacing: -0.5, color: T.ink }}>
          How do you like to <em style={{ color: T.terracottaDeep }}>eat</em>?
        </h1>
        <p style={{ fontSize: 14, color: T.inkSoft, margin: '12px 0 0', lineHeight: 1.55 }}>
          This shapes your morning suggestions. Change it anytime — your taste will shift too.
        </p>
      </div>

      <div style={{ padding: '20px 22px 0', position: 'relative', zIndex: 1 }}>
        <div style={{ fontSize: 10.5, letterSpacing: 1.8, textTransform: 'uppercase', color: T.sageDeep, marginBottom: 10 }}>
          Your style
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {STYLES.map(s => {
            const on = userData.foodStyle === s.k;
            return (
              <span key={s.k} onClick={() => updateUser({ foodStyle: s.k })}
                style={{ ...chipStyle(on), cursor: 'pointer', transition: 'all 0.15s' }}>
                {s.t}
              </span>
            );
          })}
        </div>

        <div style={{ fontSize: 10.5, letterSpacing: 1.8, textTransform: 'uppercase', color: T.sageDeep, margin: '22px 0 10px' }}>
          I'd rather skip
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {AVOID.map(s => {
            const on = userData.foodAvoid.includes(s.k);
            return (
              <span key={s.k} onClick={() => toggleAvoid(s.k)}
                style={{ ...chipStyle(on), cursor: 'pointer', transition: 'all 0.15s', display: 'inline-flex', alignItems: 'center' }}>
                {on && <span style={{ opacity: 0.7, marginRight: 4 }}>✕</span>}{s.t}
              </span>
            );
          })}
        </div>
      </div>
    </OBFrame>
  );
}
