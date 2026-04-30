export function formatTime(totalMinutes) {
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  const ampm = h < 12 ? 'am' : 'pm';
  const displayH = h === 0 ? 12 : h > 12 ? h - 12 : h;
  const displayM = String(m).padStart(2, '0');
  return `${displayH}:${displayM} ${ampm}`;
}

export function wakeLabel(totalMinutes) {
  if (totalMinutes < 360) return 'very early riser';
  if (totalMinutes < 420) return 'early riser';
  if (totalMinutes < 480) return 'morning person';
  if (totalMinutes < 540) return 'mid-morning start';
  return 'late starter';
}

export function calcPhase(day, month, year) {
  const today = new Date();
  const last = new Date(year, month, day);
  const diffMs = today - last;
  const dayNum = Math.max(1, Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1);
  const cycleDayNum = ((dayNum - 1) % 28) + 1;

  let phase, label;
  if (cycleDayNum <= 5) {
    phase = 'menstrual'; label = 'the shedding phase';
  } else if (cycleDayNum <= 13) {
    phase = 'follicular'; label = 'the rising phase';
  } else if (cycleDayNum <= 16) {
    phase = 'ovulation'; label = 'the peak phase';
  } else {
    phase = 'luteal'; label = 'the gathering phase';
  }

  const phaseLabel = phase.charAt(0).toUpperCase() + phase.slice(1);
  return { phase, label, phaseLabel, dayNum: cycleDayNum };
}

export function formatDate(day, month, year) {
  const d = new Date(year, month, day);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' });
}

export function daysAgo(day, month, year) {
  const today = new Date();
  const last = new Date(year, month, day);
  return Math.floor((today - last) / (1000 * 60 * 60 * 24));
}
