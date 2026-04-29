import { useState } from 'react';
import { T } from '../../tokens';
import { OBFrame, PrimaryBtn, MiniCalendar, calNav } from '../../components/OBShared';
import { formatDate, daysAgo } from '../../utils';

const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];

export function OB05Cycle({ onNext, onBack, userData, updateUser }) {
  const [viewMonth, setViewMonth] = useState(userData.lastPeriodMonth);
  const [viewYear, setViewYear]   = useState(userData.lastPeriodYear);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const selected = (viewMonth === userData.lastPeriodMonth && viewYear === userData.lastPeriodYear)
    ? userData.lastPeriodDay : null;

  const highlight = selected ? Array.from({ length: 4 }, (_, i) => selected + i + 1) : [];

  const ago = selected ? daysAgo(selected, viewMonth, viewYear) : null;
  const dateStr = selected ? formatDate(selected, viewMonth, viewYear) : null;

  return (
    <OBFrame step={4} total={12} label="Personalize · your rhythm" onBack={onBack}
      footer={<>
        <PrimaryBtn onClick={onNext}>Continue</PrimaryBtn>
        <div style={{ textAlign: 'center', marginTop: 10 }}>
          <button style={{ border: 'none', background: 'transparent', color: T.inkMuted, fontSize: 12, cursor: 'pointer' }}>
            I'm not sure — help me estimate
          </button>
        </div>
      </>}>
      <div style={{ padding: '24px 28px 0', position: 'relative', zIndex: 1 }}>
        <h1 style={{ fontFamily: T.serif, fontSize: 30, fontWeight: 400, margin: 0, lineHeight: 1.12, letterSpacing: -0.5, color: T.ink }}>
          When did your last <em style={{ color: T.terracottaDeep }}>period</em> begin?
        </h1>
        <p style={{ fontSize: 14, color: T.inkSoft, margin: '12px 0 0', lineHeight: 1.55 }}>
          Approximate is perfect — perimenopause makes cycles unpredictable, and we'll learn your rhythm with you.
        </p>
      </div>

      <div style={{
        margin: '22px 22px 0', padding: '16px 18px 20px',
        background: T.paper, borderRadius: T.radii.xl,
        border: `1px solid ${T.sand}`, position: 'relative', zIndex: 1,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <button style={calNav} onClick={prevMonth}>‹</button>
          <div style={{ fontFamily: T.serif, fontSize: 17 }}>{MONTH_NAMES[viewMonth]} {viewYear}</div>
          <button style={calNav} onClick={nextMonth}>›</button>
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2,
          fontSize: 10, color: T.inkMuted, marginBottom: 6, textAlign: 'center',
          letterSpacing: 1, textTransform: 'uppercase',
        }}>
          {['S','M','T','W','T','F','S'].map((d, i) => <div key={i}>{d}</div>)}
        </div>
        <MiniCalendar
          selected={selected}
          highlight={highlight}
          month={viewMonth}
          year={viewYear}
          onSelect={(day) => updateUser({ lastPeriodDay: day, lastPeriodMonth: viewMonth, lastPeriodYear: viewYear })}
        />
        <div style={{
          marginTop: 14, padding: '10px 12px', borderRadius: T.radii.md,
          background: T.creamWarm, fontSize: 12.5, color: T.inkSoft,
          fontFamily: T.serif, fontStyle: 'italic',
          minHeight: 38,
        }}>
          {selected
            ? <><em style={{ color: T.terracottaDeep }}>{dateStr}</em> — about {ago} {ago === 1 ? 'day' : 'days'} ago. Sound right?</>
            : <span style={{ color: T.inkMuted }}>Tap a date above to select your last period start.</span>
          }
        </div>
      </div>
    </OBFrame>
  );
}
