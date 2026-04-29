import { T } from '../../tokens';
import { BotanicalSprig } from '../../components/Botanicals';
import { OBFrame, PrimaryBtn } from '../../components/OBShared';

export function OB01Welcome({ onNext }) {
  return (
    <OBFrame step={0} total={12} label="Welcome" onBack={null} showSkip={false}
      footer={<>
        <PrimaryBtn color={T.terracottaDeep} onClick={onNext}>Begin · about 2 minutes</PrimaryBtn>
        <div style={{ textAlign: 'center', marginTop: 12, fontSize: 12, color: T.inkMuted }}>
          Already with us? <span style={{ color: T.terracottaDeep, fontWeight: 500, cursor: 'pointer' }}>Sign in</span>
        </div>
      </>}>
      <div style={{ position: 'absolute', top: 40, left: -30, opacity: 0.5 }}>
        <BotanicalSprig size={140} color={T.sageDeep} opacity={0.4}/>
      </div>
      <div style={{ position: 'absolute', bottom: 40, right: -30, transform: 'rotate(170deg)', opacity: 0.45 }}>
        <BotanicalSprig size={120} color={T.terracottaDeep} opacity={0.35}/>
      </div>

      <div style={{ padding: '56px 30px 0', textAlign: 'left', position: 'relative', zIndex: 1 }}>
        <div style={{ fontFamily: T.serif, fontSize: 22, fontStyle: 'italic', color: T.terracottaDeep, letterSpacing: -0.3, marginBottom: 18 }}>
          Themaka
        </div>
        <h1 style={{ fontFamily: T.serif, fontSize: 38, fontWeight: 400, margin: 0, lineHeight: 1.12, letterSpacing: -0.5, color: T.ink }}>
          For the <em style={{ fontStyle: 'italic', color: T.terracottaDeep }}>middle</em> years.
        </h1>
        <p style={{ fontFamily: T.serif, fontSize: 16, fontStyle: 'italic', color: T.inkSoft, margin: '18px 0 0', lineHeight: 1.45 }}>
          A quiet companion for perimenopause — eating and moving with your body as it changes.
        </p>
      </div>

      <div style={{ flex: 1 }}/>

      <div style={{ padding: '0 30px 16px', position: 'relative', zIndex: 1 }}>
        {[
          'A morning nudge within 15 minutes of waking.',
          "Meals tuned to the phase you're in today.",
          'Movement that matches your energy, not the calendar.',
        ].map((t, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, padding: '9px 0', alignItems: 'flex-start' }}>
            <span style={{ width: 6, height: 6, borderRadius: 3, background: T.terracottaDeep, marginTop: 8, flexShrink: 0 }}/>
            <span style={{ fontSize: 14, color: T.ink, lineHeight: 1.45 }}>{t}</span>
          </div>
        ))}
      </div>
    </OBFrame>
  );
}
