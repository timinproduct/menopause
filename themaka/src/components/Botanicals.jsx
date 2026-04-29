import { T } from '../tokens';

export function BotanicalSprig({ size = 80, color = T.sageDeep, opacity = 0.55, style }) {
  return (
    <svg width={size} height={size * 1.3} viewBox="0 0 80 104" style={style}
         fill="none" stroke={color} strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" opacity={opacity}>
      <path d="M40 102 C 40 70, 38 40, 42 6" />
      <path d="M42 20 C 52 16, 60 20, 62 28 C 54 28, 46 26, 42 22 Z" fill={color} fillOpacity="0.12"/>
      <path d="M40 34 C 30 32, 22 36, 20 44 C 28 44, 36 42, 40 38 Z" fill={color} fillOpacity="0.12"/>
      <path d="M41 50 C 51 48, 59 52, 61 60 C 53 60, 45 58, 41 54 Z" fill={color} fillOpacity="0.12"/>
      <path d="M40 66 C 30 64, 22 68, 20 76 C 28 76, 36 74, 40 70 Z" fill={color} fillOpacity="0.12"/>
      <path d="M40 82 C 48 80, 55 83, 57 89" />
    </svg>
  );
}

export function PhaseWaves({ w = 280, h = 200, phase = 'luteal' }) {
  const palettes = {
    menstrual: [T.terracottaDeep, T.terracotta, T.clay],
    follicular: [T.sage, T.sageSoft, T.honey],
    ovulation:  [T.honey, T.clay, T.terracottaSoft],
    luteal:     [T.terracotta, T.honey, T.sage],
  };
  const [c1, c2, c3] = palettes[phase] || palettes.luteal;
  return (
    <svg width={w} height={h} viewBox="0 0 280 200" fill="none"
         strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="140" cy="118" rx="110" ry="46" fill={c1} opacity="0.08"/>
      <path d="M14 120 Q 60 72, 110 104 Q 160 140, 210 96 Q 246 72, 268 98"
            stroke={c1} strokeWidth="1.6" opacity="0.85"/>
      <path d="M14 138 Q 60 110, 110 128 Q 160 152, 210 122 Q 246 104, 268 130"
            stroke={c2} strokeWidth="1.3" opacity="0.75"/>
      <path d="M14 156 Q 60 142, 110 152 Q 160 168, 210 146 Q 246 132, 268 158"
            stroke={c3} strokeWidth="1.1" opacity="0.6"/>
      <circle cx="160" cy="152" r="5" fill={c1}/>
      <circle cx="160" cy="152" r="11" fill="none" stroke={c1} strokeWidth="1" opacity="0.4"/>
    </svg>
  );
}

export function Branch({ w = 80, color = T.sageDeep, opacity = 0.5 }) {
  return (
    <svg width={w} height="18" viewBox="0 0 80 18" fill="none" stroke={color}
         strokeWidth="1" strokeLinecap="round" opacity={opacity}>
      <path d="M0 9 H 34"/>
      <path d="M46 9 H 80"/>
      <path d="M36 9 C 38 5, 42 5, 44 9 C 42 13, 38 13, 36 9 Z" fill={color} fillOpacity="0.2"/>
    </svg>
  );
}

export function SeedDot({ active, color = T.terracotta }) {
  return (
    <span style={{
      width: active ? 22 : 7, height: 7, borderRadius: 4,
      background: active ? color : 'rgba(61,51,40,0.2)',
      display: 'inline-block', transition: 'all .35s ease',
    }}/>
  );
}
