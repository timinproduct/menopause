import { T } from '../../tokens';
import { OBFrame, PrimaryBtn } from '../../components/OBShared';

const ages = ['Under 40', '40–44', '45–49', '50–54', '55+'];

export function OB03NameAge({ onNext, onBack, userData, updateUser }) {
  return (
    <OBFrame step={2} total={12} label="Registration · 2 of 2" onBack={onBack}
      footer={<PrimaryBtn onClick={onNext}>Continue</PrimaryBtn>}>
      <div style={{ padding: '24px 28px 0', position: 'relative', zIndex: 1 }}>
        <h1 style={{ fontFamily: T.serif, fontSize: 30, fontWeight: 400, margin: 0, lineHeight: 1.12, letterSpacing: -0.5, color: T.ink }}>
          What shall we call you?
        </h1>
        <p style={{ fontSize: 14, color: T.inkSoft, margin: '12px 0 0', lineHeight: 1.55 }}>
          And a rough age — we'll tailor science to what's most likely for you.
        </p>

        <div style={{ marginTop: 22 }}>
          <div style={{ fontSize: 11, letterSpacing: 1.6, textTransform: 'uppercase', color: T.inkMuted, marginBottom: 8 }}>
            First name
          </div>
          <div style={{
            padding: '14px 16px', background: T.paper, borderRadius: T.radii.md,
            border: `1px solid ${userData.name ? T.terracottaSoft : T.sand}`,
            display: 'flex', alignItems: 'center',
            transition: 'border-color 0.2s',
          }}>
            <input
              className="themaka-text"
              style={{ fontFamily: T.serif, fontSize: 22, color: T.ink, letterSpacing: -0.3 }}
              type="text"
              placeholder="Your name"
              value={userData.name}
              onChange={e => updateUser({ name: e.target.value })}
              autoComplete="given-name"
            />
            {!userData.name && (
              <span style={{ display: 'inline-block', width: 1.2, height: 22, background: T.terracottaDeep, marginLeft: 2, flexShrink: 0, animation: 'themaka-blink 1.1s infinite' }}/>
            )}
          </div>
        </div>

        <div style={{ marginTop: 24 }}>
          <div style={{ fontSize: 11, letterSpacing: 1.6, textTransform: 'uppercase', color: T.inkMuted, marginBottom: 10 }}>
            Age
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {ages.map(a => {
              const on = userData.age === a;
              return (
                <span key={a} onClick={() => updateUser({ age: a })} style={{
                  padding: '9px 14px', borderRadius: T.radii.pill,
                  background: on ? T.terracottaDeep : T.paper,
                  color: on ? T.paper : T.ink,
                  border: `1px solid ${on ? T.terracottaDeep : T.sand}`,
                  fontSize: 13, fontWeight: on ? 500 : 400, cursor: 'pointer',
                  transition: 'all 0.2s',
                }}>{a}</span>
              );
            })}
          </div>
          {userData.age && (
            <div style={{
              marginTop: 14, padding: '10px 14px',
              background: T.creamWarm, borderRadius: T.radii.md, fontSize: 12.5, color: T.inkSoft,
              fontFamily: T.serif, fontStyle: 'italic',
            }}>
              {userData.age === '45–49' || userData.age === '50–54'
                ? <>Most women in this range are in <em style={{ color: T.terracottaDeep }}>early to mid perimenopause</em>.</>
                : userData.age === '55+'
                  ? <>Many women in this range are in <em style={{ color: T.terracottaDeep }}>post-menopause</em>.</>
                  : <>Perimenopause can begin in the <em style={{ color: T.terracottaDeep }}>early 40s</em> — you're in the right place.</>
              }
            </div>
          )}
        </div>
      </div>
    </OBFrame>
  );
}
