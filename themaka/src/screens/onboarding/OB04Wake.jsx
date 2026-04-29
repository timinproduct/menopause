import { T } from '../../tokens';
import { OBFrame, PrimaryBtn } from '../../components/OBShared';
import { formatTime, wakeLabel } from '../../utils';

export function OB04Wake({ onNext, onBack, userData, updateUser }) {
  const v = userData.wakeMinutes;
  const time = formatTime(v);
  const [displayH, displayM, ampm] = time.split(/[: ]/);
  const pct = (v - 240) / (720 - 240); // 4am=0 … noon=1

  return (
    <OBFrame step={3} total={12} label="Personalize · morning rhythm" onBack={onBack}
      footer={<PrimaryBtn onClick={onNext}>Continue</PrimaryBtn>}>
      <div style={{ padding: '24px 28px 0', position: 'relative', zIndex: 1 }}>
        <h1 style={{ fontFamily: T.serif, fontSize: 30, fontWeight: 400, margin: 0, lineHeight: 1.12, letterSpacing: -0.5, color: T.ink }}>
          When do you usually <em style={{ color: T.terracottaDeep }}>wake</em>?
        </h1>
        <p style={{ fontSize: 14, color: T.inkSoft, margin: '12px 0 0', lineHeight: 1.55 }}>
          We'll send your morning check-in within 15 minutes of this time. Cortisol peaks naturally right as you wake — breakfast here changes everything.
        </p>
      </div>

      {/* Big time display */}
      <div style={{ textAlign: 'center', marginTop: 24, position: 'relative', zIndex: 1 }}>
        <div style={{ fontFamily: T.serif, fontSize: 68, lineHeight: 1, letterSpacing: -2, color: T.ink }}>
          {displayH}<span style={{ color: T.terracottaDeep }}>:</span>{displayM}
          <span style={{ fontFamily: T.sans, fontSize: 20, color: T.inkMuted, marginLeft: 8, letterSpacing: 0 }}>{ampm}</span>
        </div>
        <div style={{ fontFamily: T.serif, fontStyle: 'italic', fontSize: 13, color: T.sageDeep, marginTop: 8 }}>
          {wakeLabel(v)}
        </div>
      </div>

      {/* Slider */}
      <div style={{ padding: '28px 28px 0', position: 'relative', zIndex: 1 }}>
        <div style={{
          height: 48, borderRadius: 24, background: T.paper, border: `1px solid ${T.sand}`,
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Tick marks */}
          <div style={{ position: 'absolute', inset: 0, display: 'flex', pointerEvents: 'none' }}>
            {Array.from({ length: 25 }).map((_, i) => (
              <div key={i} style={{
                flex: 1,
                borderLeft: i % 6 === 0 ? `1px solid ${T.inkMuted}44` : `1px solid ${T.sand}`,
                height: i % 6 === 0 ? 10 : 6, marginTop: 'auto', marginBottom: 6,
              }}/>
            ))}
          </div>
          {/* Visual thumb */}
          <div style={{
            position: 'absolute',
            left: `calc(${pct * 100}% - ${pct * 36}px)`,
            top: '50%', transform: 'translateY(-50%)',
            width: 36, height: 36, borderRadius: 18, background: T.terracottaDeep,
            border: `3px solid ${T.paper}`, boxShadow: `0 0 0 1px ${T.terracottaDeep}`,
            pointerEvents: 'none', transition: 'left 0.05s',
          }}/>
          {/* Native range input (invisible, handles all pointer events) */}
          <input
            type="range"
            className="themaka-range"
            min={240} max={720} step={15}
            value={v}
            onChange={e => updateUser({ wakeMinutes: Number(e.target.value) })}
          />
        </div>
        <div style={{
          display: 'flex', justifyContent: 'space-between', marginTop: 10,
          fontSize: 11, color: T.inkMuted, letterSpacing: 1, textTransform: 'uppercase',
        }}>
          <span>4 am</span><span>8 am</span><span>Noon</span>
        </div>
      </div>

      <div style={{ flex: 1 }}/>

      <div style={{ margin: '0 22px 16px', padding: '12px 16px', background: T.creamWarm, borderRadius: T.radii.md, position: 'relative', zIndex: 1 }}>
        <div style={{ fontSize: 10.5, letterSpacing: 2, textTransform: 'uppercase', color: T.sageDeep, marginBottom: 4 }}>
          Why it matters
        </div>
        <div style={{ fontSize: 13, color: T.inkSoft, lineHeight: 1.5 }}>
          Eating within 15 minutes of waking steadies cortisol — a simple habit that eases afternoon fatigue and evening cravings.
        </div>
      </div>
    </OBFrame>
  );
}
