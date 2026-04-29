import { T, paperGrainUrl } from '../tokens';
import { BotanicalSprig, PhaseWaves } from '../components/Botanicals';
import { calcPhase, formatTime } from '../utils';

export function Home({ onNavigate, userData }) {
  const { phase, phaseLabel, label, dayNum } = calcPhase(
    userData.lastPeriodDay, userData.lastPeriodMonth, userData.lastPeriodYear
  );
  const name = userData.name || 'Mara';
  const cyclePct = Math.min(((dayNum - 1) / 28) * 100, 100);

  const tips = {
    menstrual:  { text: 'Your body is shedding. Rest is productive today — iron-rich foods like lentils and leafy greens will support your energy.', tags: ['Lentils', 'Leafy greens', 'Rest'] },
    follicular: { text: 'Oestrogen is rising. This is your most energetic phase — great time for trying new recipes and stronger workouts.', tags: ['Eggs', 'Seeds', 'Movement'] },
    ovulation:  { text: 'You\'re at your peak. Communication, creativity, and energy are all heightened — make the most of it.', tags: ['Berries', 'Avocado', 'Protein'] },
    luteal:     { text: 'Progesterone is rising. Warm, grounding meals and a little extra magnesium will settle your nervous system tonight.', tags: ['Sweet potato', 'Leafy greens', 'Dark chocolate'] },
  };
  const tip = tips[phase] || tips.luteal;
  const wakeStr = formatTime(userData.wakeMinutes);

  return (
    <div style={{
      width: '100%', height: '100%', background: T.cream,
      fontFamily: T.sans, color: T.ink, position: 'relative',
      overflow: 'hidden', display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: paperGrainUrl, opacity: 0.7, pointerEvents: 'none' }}/>
      <div style={{ position: 'absolute', top: -8, right: -14, opacity: 0.9 }}>
        <BotanicalSprig size={120} color={T.sageDeep} opacity={0.35}/>
      </div>

      {/* Greeting */}
      <div style={{ padding: '22px 28px 0', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 11, letterSpacing: 2.4, textTransform: 'uppercase', color: T.inkMuted }}>
            Monday · April 28
          </span>
          <div style={{
            width: 34, height: 34, borderRadius: 17, background: T.sand,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: T.serif, fontSize: 14, color: T.ink,
          }}>{name[0].toUpperCase()}</div>
        </div>
        <h1 style={{
          fontFamily: T.serif, fontSize: 32, fontWeight: 400, lineHeight: 1.15,
          margin: '18px 0 4px', letterSpacing: -0.4,
        }}>
          Good morning, <em style={{ fontStyle: 'italic', color: T.terracottaDeep }}>{name}</em>.
        </h1>
        <p style={{ fontSize: 14, color: T.inkSoft, margin: 0, lineHeight: 1.5 }}>
          Your body is steady today. Here's what it's asking for.
        </p>
      </div>

      {/* Phase card */}
      <div style={{
        margin: '24px 20px 0', padding: '22px 22px 20px',
        background: T.paper, borderRadius: T.radii.xl,
        boxShadow: '0 1px 0 rgba(61,51,40,0.05), 0 14px 30px -16px rgba(61,51,40,0.12)',
        position: 'relative', zIndex: 1, overflow: 'hidden',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: 10.5, letterSpacing: 2.2, textTransform: 'uppercase', color: T.sageDeep, marginBottom: 6 }}>
              Phase
            </div>
            <div style={{ fontFamily: T.serif, fontSize: 22, lineHeight: 1.2, color: T.ink }}>
              {phaseLabel} <span style={{ color: T.terracottaDeep }}>—</span> <em>Day {dayNum}</em>
            </div>
          </div>
          <div style={{ fontFamily: T.serif, fontSize: 12, fontStyle: 'italic', color: T.inkMuted, marginTop: 4 }}>
            {label}
          </div>
        </div>

        <div style={{ margin: '12px -4px 6px' }}>
          <PhaseWaves w={260} h={130} phase={phase}/>
        </div>

        {/* Cycle track */}
        <div>
          <div style={{ height: 3, borderRadius: 2, background: T.sand, position: 'relative', overflow: 'visible' }}>
            <div style={{
              position: 'absolute', left: 0, top: 0, bottom: 0, width: `${cyclePct}%`,
              background: `linear-gradient(90deg, ${T.sageSoft}, ${T.honey}, ${T.terracotta})`,
              borderRadius: 2,
            }}/>
            <div style={{
              position: 'absolute', left: `${cyclePct}%`, top: -3, width: 9, height: 9, borderRadius: 5,
              background: T.terracottaDeep, transform: 'translateX(-4px)',
              boxShadow: `0 0 0 3px ${T.paper}`,
            }}/>
          </div>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            marginTop: 8, fontSize: 10, letterSpacing: 1.2, textTransform: 'uppercase', color: T.inkMuted,
          }}>
            <span>Menstrual</span><span>Follicular</span><span>Ovulation</span>
            <span style={{ color: phase === 'luteal' ? T.terracottaDeep : T.inkMuted, fontWeight: phase === 'luteal' ? 500 : 400 }}>Luteal</span>
          </div>
        </div>
      </div>

      {/* Today's tip */}
      <div style={{
        margin: '16px 20px 0', padding: '18px 22px 20px',
        background: T.terracottaSoft + '55', borderRadius: T.radii.xl,
        border: `1px solid ${T.terracottaSoft}88`, position: 'relative', zIndex: 1,
      }}>
        <div style={{ fontSize: 10.5, letterSpacing: 2.2, textTransform: 'uppercase', color: T.terracottaDeep, marginBottom: 8 }}>
          Today's tip
        </div>
        <p style={{ fontFamily: T.serif, fontSize: 17, lineHeight: 1.38, margin: '0 0 12px', color: T.ink }}>
          {tip.text}
        </p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {tip.tags.map(t => (
            <span key={t} style={{
              fontSize: 11.5, padding: '5px 10px', borderRadius: T.radii.pill,
              background: T.paper, color: T.terracottaDeep, border: `1px solid ${T.terracottaSoft}`,
            }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Glance row */}
      <div style={{ display: 'flex', gap: 10, margin: '14px 20px 0', position: 'relative', zIndex: 1 }}>
        <GlanceCard label="Morning check-in" value={wakeStr} accent={T.sage}/>
        <GlanceCard label="Movement" value={movementLabel(userData.movementLevel)} accent={T.honey}/>
      </div>

      <div style={{ flex: 1 }}/>
      <HomeNav onNavigate={onNavigate} active="home"/>
    </div>
  );
}

function movementLabel(level) {
  return { gentle: 'Gentle · yoga', active: 'Walk · 30 min', strong: 'Strength · 45 min', rest: 'Rest today' }[level] || 'Walk · 30 min';
}

function GlanceCard({ label, value, accent }) {
  return (
    <div style={{
      flex: 1, padding: '12px 14px', background: T.paper,
      borderRadius: T.radii.md, border: `1px solid ${T.sand}`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
        <span style={{ width: 5, height: 5, borderRadius: 3, background: accent }}/>
        <span style={{ fontSize: 10, letterSpacing: 1.6, textTransform: 'uppercase', color: T.inkMuted }}>{label}</span>
      </div>
      <div style={{ fontFamily: T.serif, fontSize: 15, color: T.ink, lineHeight: 1.2 }}>{value}</div>
    </div>
  );
}

function HomeNav({ onNavigate, active }) {
  const items = [
    { k: 'home',    label: 'Today',   icon: <circle cx="12" cy="12" r="4"/> },
    { k: 'cycle',   label: 'Cycle',   icon: <><circle cx="12" cy="12" r="7"/><circle cx="16" cy="10" r="1.2" fill="currentColor"/></> },
    { k: 'eat',     label: 'Eat',     icon: <path d="M8 4v16M16 4v8a3 3 0 0 0 3 3"/> },
    { k: 'journal', label: 'Journal', icon: <path d="M6 4h10l2 2v14H6z M10 10h6 M10 14h4"/> },
  ];
  return (
    <nav style={{
      display: 'flex', justifyContent: 'space-around', padding: '14px 12px 18px',
      background: T.paper, borderTop: `1px solid ${T.sand}`, position: 'relative', zIndex: 1,
    }}>
      {items.map(it => {
        const isActive = it.k === active;
        return (
          <button key={it.k} onClick={() => onNavigate && onNavigate(it.k)}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, border: 'none', background: 'transparent', cursor: 'pointer', padding: '4px 8px' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                 stroke={isActive ? T.terracottaDeep : T.inkMuted} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              {it.icon}
            </svg>
            <span style={{
              fontSize: 10.5, letterSpacing: 0.4,
              color: isActive ? T.terracottaDeep : T.inkMuted,
              fontWeight: isActive ? 500 : 400,
            }}>{it.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
