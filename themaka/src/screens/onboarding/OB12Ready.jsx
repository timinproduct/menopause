import { T } from '../../tokens';
import { BotanicalSprig } from '../../components/Botanicals';
import { OBFrame, PrimaryBtn, SectionLabel } from '../../components/OBShared';
import { formatTime, calcPhase } from '../../utils';

function SummaryRow({ label, value, last }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '12px 0', borderBottom: last ? 'none' : `1px solid ${T.sand}`,
    }}>
      <span style={{ fontSize: 11, letterSpacing: 1.4, textTransform: 'uppercase', color: T.inkMuted }}>{label}</span>
      <span style={{ fontFamily: T.serif, fontSize: 15, color: T.ink }}>{value}</span>
    </div>
  );
}

export function OB12Ready({ onNext, userData }) {
  const name = userData.name || 'you';
  const wakeStr = formatTime(userData.wakeMinutes);
  const { phaseLabel, dayNum } = calcPhase(userData.lastPeriodDay, userData.lastPeriodMonth, userData.lastPeriodYear);
  const ritualCount = userData.rituals.length;

  return (
    <OBFrame step={11} total={12} label="Ready" onBack={null} showSkip={false}
      footer={<PrimaryBtn color={T.terracottaDeep} onClick={onNext}>Take me home</PrimaryBtn>}>
      <div style={{ padding: '46px 30px 0', position: 'relative', zIndex: 1 }}>
        <div style={{ position: 'absolute', top: 20, right: -20, opacity: 0.5 }}>
          <BotanicalSprig size={120} color={T.sageDeep} opacity={0.45}/>
        </div>

        <SectionLabel color={T.terracottaDeep}>We're ready, {name}</SectionLabel>
        <h1 style={{ fontFamily: T.serif, fontSize: 34, fontWeight: 400, margin: 0, lineHeight: 1.12, letterSpacing: -0.5, color: T.ink }}>
          Tomorrow at <em style={{ color: T.terracottaDeep }}>{wakeStr}</em>, we begin.
        </h1>
        <p style={{ fontFamily: T.serif, fontSize: 16, fontStyle: 'italic', color: T.inkSoft, margin: '18px 0 0', lineHeight: 1.5 }}>
          Your first morning check-in is set. Until then, rest — the rest of today is just for you.
        </p>
      </div>

      <div style={{ margin: '32px 22px 0', padding: '16px 18px', background: T.paper, borderRadius: T.radii.xl, border: `1px solid ${T.sand}`, position: 'relative', zIndex: 1 }}>
        <SummaryRow label="Morning check-in" value={wakeStr}/>
        <SummaryRow label="Current phase"    value={`${phaseLabel} · day ${dayNum}`}/>
        <SummaryRow label="This week"        value={`${ritualCount} small ritual${ritualCount !== 1 ? 's' : ''}`} last/>
      </div>

      <div style={{ flex: 1 }}/>
      <div style={{ padding: '0 28px 8px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ fontFamily: T.serif, fontStyle: 'italic', fontSize: 13.5, color: T.terracottaDeep, letterSpacing: 0.2 }}>
          Welcome home{userData.name ? `, ${userData.name}` : ''}.
        </div>
      </div>
    </OBFrame>
  );
}
