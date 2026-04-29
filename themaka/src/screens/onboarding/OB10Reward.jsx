import { T } from '../../tokens';
import { OBFrame, PrimaryBtn, SectionLabel } from '../../components/OBShared';
import { formatTime, calcPhase } from '../../utils';

function MiniStat({ label, value, color }) {
  return (
    <div style={{ flex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 3 }}>
        <span style={{ width: 5, height: 5, borderRadius: 3, background: color }}/>
        <span style={{ fontSize: 9.5, letterSpacing: 1.2, textTransform: 'uppercase', color: T.inkMuted }}>{label}</span>
      </div>
      <div style={{ fontFamily: T.serif, fontSize: 13, color: T.ink, lineHeight: 1.15 }}>{value}</div>
    </div>
  );
}

export function OB10Reward({ onNext, onBack, userData }) {
  const wakeStr = formatTime(userData.wakeMinutes);
  const { phaseLabel, dayNum } = calcPhase(userData.lastPeriodDay, userData.lastPeriodMonth, userData.lastPeriodYear);

  // eating window: wake + 15min start, 12hr window
  const windowStart = formatTime(userData.wakeMinutes + 15);
  const windowEnd = formatTime(userData.wakeMinutes + 15 + 660); // +11hrs

  return (
    <OBFrame step={9} total={12} label="Hook · variable reward" onBack={onBack}
      footer={<PrimaryBtn onClick={onNext}>See tomorrow's plan</PrimaryBtn>}>
      <div style={{ padding: '24px 28px 0', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <SectionLabel>You're {phaseLabel.toLowerCase()} · day {dayNum}</SectionLabel>
        <h1 style={{ fontFamily: T.serif, fontSize: 28, fontWeight: 400, margin: 0, lineHeight: 1.12, letterSpacing: -0.5, color: T.ink }}>
          Here's what <em style={{ color: T.terracottaDeep }}>tomorrow</em> looks like.
        </h1>
      </div>

      <div style={{
        margin: '18px 18px 0', padding: '18px 18px 18px',
        background: T.paper, borderRadius: T.radii.xl,
        border: `1px solid ${T.sand}`, position: 'relative', zIndex: 1,
        boxShadow: '0 20px 40px -24px rgba(61,51,40,0.2)',
      }}>
        <div style={{ position: 'absolute', top: -12, left: 16, padding: '4px 10px', background: T.terracottaDeep, color: T.paper, borderRadius: 999, fontSize: 10, letterSpacing: 1.6, textTransform: 'uppercase', fontWeight: 500 }}>
          First look
        </div>

        <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 4 }}>
          <svg width="54" height="54" viewBox="0 0 54 54">
            <circle cx="27" cy="27" r="24" fill="none" stroke={T.terracottaSoft} strokeWidth="1"/>
            <circle cx="27" cy="27" r="17" fill={T.terracottaSoft} opacity="0.6"/>
            <path d="M10 30 Q 18 22, 27 28 Q 36 34, 44 26" stroke={T.terracottaDeep} strokeWidth="1.4" fill="none" strokeLinecap="round"/>
          </svg>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: T.serif, fontSize: 18, color: T.ink, lineHeight: 1.2 }}>
              Warm oats, <em style={{ color: T.terracottaDeep }}>almond butter</em>, berries
            </div>
            <div style={{ fontSize: 12, color: T.inkMuted, marginTop: 3 }}>
              412 kcal · 18 g protein · steadies mood
            </div>
          </div>
        </div>

        <div style={{ height: 1, background: T.sand, margin: '14px 0' }}/>

        <div style={{ display: 'flex', gap: 14 }}>
          <MiniStat label="Window"    value={`${windowStart} – ${windowEnd}`} color={T.sage}/>
          <MiniStat label="Notif"     value={wakeStr}                          color={T.honey}/>
          <MiniStat label="Wind-down" value="9:30 pm"                         color={T.plum}/>
        </div>
      </div>

      <div style={{ margin: '18px 22px 0', padding: '12px 14px', background: T.creamWarm, borderRadius: T.radii.md, position: 'relative', zIndex: 1 }}>
        <div style={{ fontSize: 13, color: T.ink, lineHeight: 1.5, fontFamily: T.serif, fontStyle: 'italic' }}>
          "Tonight: your sleep window opens around <em style={{ color: T.terracottaDeep }}>9:45 pm</em> — progesterone makes this the easiest night of the month to drift off."
        </div>
      </div>

      <div style={{ flex: 1 }}/>
      <div style={{ padding: '0 28px 4px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ fontSize: 11, color: T.inkMuted, letterSpacing: 0.3 }}>
          A little different every day — tuned to where you are.
        </div>
      </div>
    </OBFrame>
  );
}
