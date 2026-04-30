import { useNavigate } from 'react-router-dom';
import { T, paperGrainUrl } from '../tokens';
import { BotanicalSprig } from '../components/Botanicals';
import { calcPhase, formatTime } from '../utils';
import { useUser } from '../context/UserContext';

export function Notification() {
  const navigate = useNavigate();
  const { userData } = useUser();

  const name = userData.name || 'there';
  const wakeStr = formatTime(userData.wakeMinutes);
  const { phaseLabel, dayNum } = calcPhase(
    userData.lastPeriodDay, userData.lastPeriodMonth, userData.lastPeriodYear
  );

  const now = new Date();
  const dayName = now.toLocaleDateString('en-GB', { weekday: 'long' });
  const dateStr = now.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' });

  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative',
      background: `linear-gradient(180deg, ${T.sand} 0%, ${T.creamWarm} 45%, ${T.cream} 100%)`,
      fontFamily: T.sans, color: T.ink, overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: paperGrainUrl, opacity: 0.5, mixBlendMode: 'multiply' }}/>
      <div style={{ position: 'absolute', top: 20, left: -20, opacity: 0.4, pointerEvents: 'none' }}>
        <BotanicalSprig size={180} color={T.sageDeep} opacity={0.28}/>
      </div>

      {/* Lockscreen clock */}
      <div style={{ textAlign: 'center', marginTop: 34, position: 'relative', zIndex: 1 }}>
        <div style={{ fontFamily: T.serif, fontSize: 68, fontWeight: 400, lineHeight: 1, letterSpacing: -2 }}>
          {wakeStr.replace(' am','').replace(' pm','')}
        </div>
        <div style={{ fontSize: 12, letterSpacing: 2.4, textTransform: 'uppercase', marginTop: 8, opacity: 0.75 }}>
          {dayName} · {dateStr}
        </div>
      </div>

      {/* Notification card */}
      <div style={{
        position: 'absolute', left: 14, right: 14, bottom: 96, zIndex: 2,
        background: T.paper, borderRadius: T.radii.xl,
        padding: '18px 18px 16px',
        boxShadow: '0 20px 50px -18px rgba(61,51,40,0.28), 0 2px 4px rgba(61,51,40,0.05)',
        border: `1px solid ${T.sand}`,
      }}>
        {/* App line */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <div style={{
            width: 26, height: 26, borderRadius: 13, background: T.terracottaDeep,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: T.serif, fontSize: 14, color: T.paper, fontStyle: 'italic',
          }}>t</div>
          <span style={{ fontSize: 11.5, letterSpacing: 1.4, textTransform: 'uppercase', color: T.inkMuted, fontWeight: 500 }}>
            Themaka
          </span>
          <span style={{ flex: 1 }}/>
          <span style={{ fontSize: 11, color: T.inkMuted }}>now</span>
        </div>

        <h2 style={{
          fontFamily: T.serif, fontSize: 22, fontWeight: 400, margin: '0 0 4px',
          lineHeight: 1.2, letterSpacing: -0.3,
        }}>
          Good morning, {name} — eat within <em style={{ color: T.terracottaDeep }}>15 minutes</em>.
        </h2>
        <p style={{ fontSize: 13.5, color: T.inkSoft, margin: '0 0 14px', lineHeight: 1.5 }}>
          {phaseLabel} Day {dayNum}: starting with protein will steady your mood through the afternoon dip.
        </p>

        {/* Meal suggestions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { t: 'Oats with almond butter & berries', s: '412 kcal · 18g protein', rec: true },
            { t: 'Two eggs on sourdough, avocado',    s: '398 kcal · 22g protein' },
            { t: 'Greek yogurt, walnuts, honey',      s: '330 kcal · 24g protein' },
          ].map(d => (
            <div key={d.t} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '10px 12px', background: d.rec ? T.cream : 'transparent',
              border: `1px solid ${d.rec ? T.terracottaSoft : T.sand}`, borderRadius: T.radii.md,
            }}>
              <MealGlyph kind={d.t}/>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, color: T.ink, lineHeight: 1.3, fontWeight: 500 }}>{d.t}</div>
                <div style={{ fontSize: 11.5, color: T.inkMuted, marginTop: 2 }}>{d.s}</div>
              </div>
              {d.rec && <span style={{ fontSize: 10, letterSpacing: 1, textTransform: 'uppercase', color: T.terracottaDeep, fontWeight: 500 }}>Today</span>}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
          <button onClick={() => navigate('/home')} style={btnPrimary}>I'll have this</button>
          <button style={btnGhost}>More ideas</button>
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)',
        width: 120, height: 4, borderRadius: 2, background: T.ink, opacity: 0.3, zIndex: 3,
      }}/>
    </div>
  );
}

function MealGlyph({ kind = '' }) {
  const k = kind.toLowerCase();
  let body;
  if (k.includes('oat') || k.includes('yogurt')) {
    body = (<>
      <path d="M6 18 Q 6 24, 20 24 Q 34 24, 34 18 L 32 14 H 8 Z" fill={T.sand} stroke={T.inkMuted} strokeWidth="1"/>
      <circle cx="14" cy="13" r="2" fill={T.terracottaDeep}/><circle cx="20" cy="12" r="2" fill={T.plum}/><circle cx="26" cy="13" r="2" fill={T.terracotta}/>
    </>);
  } else if (k.includes('egg')) {
    body = (<>
      <rect x="6" y="15" width="28" height="10" rx="2" fill={T.honey} stroke={T.inkMuted} strokeWidth="1"/>
      <ellipse cx="15" cy="14" rx="4.5" ry="3" fill={T.paper} stroke={T.inkMuted} strokeWidth="0.8"/><circle cx="15" cy="14" r="1.8" fill={T.honey}/>
      <ellipse cx="25" cy="14" rx="4.5" ry="3" fill={T.paper} stroke={T.inkMuted} strokeWidth="0.8"/><circle cx="25" cy="14" r="1.8" fill={T.honey}/>
    </>);
  } else {
    body = <circle cx="20" cy="20" r="12" fill={T.sageSoft} stroke={T.inkMuted} strokeWidth="1"/>;
  }
  return (
    <div style={{ width: 40, height: 40, borderRadius: 20, background: T.paper, border: `1px solid ${T.sand}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">{body}</svg>
    </div>
  );
}

const btnPrimary = {
  flex: 1, padding: '11px 14px', borderRadius: T.radii.pill,
  background: T.ink, color: T.paper, border: 'none',
  fontFamily: 'inherit', fontSize: 13, fontWeight: 500, letterSpacing: 0.2, cursor: 'pointer',
};
const btnGhost = {
  flex: 1, padding: '11px 14px', borderRadius: T.radii.pill,
  background: 'transparent', color: T.ink, border: `1px solid ${T.ink}`,
  fontFamily: 'inherit', fontSize: 13, fontWeight: 500, letterSpacing: 0.2, cursor: 'pointer',
};
