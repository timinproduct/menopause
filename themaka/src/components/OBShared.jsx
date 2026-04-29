import { T, paperGrainUrl } from '../tokens';

export function OBFrame({ step, total, label, onBack, onSkip, bg = T.cream, children, footer, showSkip = true }) {
  return (
    <div style={{
      width: '100%', height: '100%', background: bg,
      fontFamily: T.sans, color: T.ink, position: 'relative',
      overflow: 'hidden', display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: paperGrainUrl, opacity: 0.5, pointerEvents: 'none' }}/>

      <div style={{ padding: '18px 22px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 2 }}>
        {onBack !== null ? (
          <button onClick={onBack} style={chromeBtn}>← Back</button>
        ) : <div style={{ width: 44 }}/>}
        <div style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: T.inkMuted }}>
          {label}
        </div>
        {showSkip && onSkip ? (
          <button onClick={onSkip} style={{ ...chromeBtn, textAlign: 'right' }}>Skip</button>
        ) : <div style={{ width: 44 }}/>}
      </div>

      <div style={{ padding: '12px 22px 0', display: 'flex', gap: 3, position: 'relative', zIndex: 2 }}>
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} style={{
            flex: 1, height: 2, borderRadius: 1,
            background: i < step ? T.terracottaDeep : (i === step ? T.terracottaSoft : T.sand),
          }}/>
        ))}
      </div>

      <div style={{ flex: 1, overflow: 'hidden', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>

      {footer && <div style={{ padding: '0 22px 26px', position: 'relative', zIndex: 2 }}>{footer}</div>}
    </div>
  );
}

const chromeBtn = {
  border: 'none', background: 'transparent', color: T.inkMuted,
  fontSize: 13, cursor: 'pointer', padding: 0, minWidth: 44, textAlign: 'left',
  fontFamily: T.sans,
};

export function PrimaryBtn({ children, color = T.ink, onClick }) {
  return (
    <button onClick={onClick} style={{
      width: '100%', padding: '14px', borderRadius: T.radii.pill,
      background: color, color: T.paper, border: 'none',
      fontFamily: T.sans, fontSize: 14.5, fontWeight: 500, letterSpacing: 0.3, cursor: 'pointer',
    }}>{children}</button>
  );
}

export function GhostBtn({ children, onClick }) {
  return (
    <button onClick={onClick} style={{
      width: '100%', padding: '13px', borderRadius: T.radii.pill,
      background: 'transparent', color: T.ink, border: `1px solid ${T.ink}66`,
      fontFamily: T.sans, fontSize: 14, fontWeight: 500, cursor: 'pointer',
    }}>{children}</button>
  );
}

export function SectionLabel({ children, color = T.sageDeep }) {
  return <div style={{ fontSize: 10.5, letterSpacing: 2.4, textTransform: 'uppercase', color, marginBottom: 10 }}>{children}</div>;
}

export function Title({ children, size = 30 }) {
  return <h1 style={{
    fontFamily: T.serif, fontSize: size, fontWeight: 400, margin: 0,
    lineHeight: 1.12, letterSpacing: -0.5, textWrap: 'pretty', color: T.ink,
  }}>{children}</h1>;
}

export function Blurb({ children }) {
  return <p style={{
    fontSize: 14, color: T.inkSoft, margin: '12px 0 0', lineHeight: 1.55, textWrap: 'pretty',
  }}>{children}</p>;
}

export function MiniCalendar({ selected, highlight = [], month = 3, year = 2026, onSelect }) {
  // Calculate first day of week and days in month dynamically
  const firstDay = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= days; d++) cells.push(d);
  while (cells.length % 7) cells.push(null);

  const today = { day: 28, month: 3, year: 2026 };
  const isFuture = (d) => {
    if (year > today.year) return true;
    if (year === today.year && month > today.month) return true;
    if (year === today.year && month === today.month && d > today.day) return true;
    return false;
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 }}>
      {cells.map((d, i) => {
        const isSel = d === selected;
        const isHl = highlight.includes(d) && !isSel;
        const future = d ? isFuture(d) : false;
        return (
          <div key={i} onClick={() => d && !future && onSelect && onSelect(d)}
            style={{
              aspectRatio: '1 / 1', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12.5,
              color: d ? (isSel ? T.paper : future ? T.inkMuted + '66' : T.ink) : 'transparent',
              borderRadius: 999,
              background: isSel ? T.terracottaDeep : (isHl ? T.terracottaSoft + '55' : 'transparent'),
              fontFamily: isSel ? T.serif : T.sans,
              fontWeight: isSel ? 500 : 400,
              cursor: d && !future ? 'pointer' : 'default',
            }}>{d || '·'}</div>
        );
      })}
    </div>
  );
}

export const calNav = {
  width: 28, height: 28, borderRadius: 14, border: `1px solid ${T.sand}`,
  background: 'transparent', color: T.inkSoft, cursor: 'pointer', fontSize: 14, lineHeight: 1,
};

export const chipStyle = (on) => ({
  padding: '8px 14px', borderRadius: T.radii.pill,
  background: on ? T.ink : T.paper, color: on ? T.paper : T.ink,
  border: `1px solid ${on ? T.ink : T.sand}`,
  fontSize: 13, fontFamily: T.sans, fontWeight: on ? 500 : 400,
  display: 'inline-flex', alignItems: 'center',
});
