import { useState } from 'react';
import { PhoneFrame } from './components/PhoneFrame';
import { Home } from './screens/Home';
import { Notification } from './screens/Notification';
import { OB01Welcome }    from './screens/onboarding/OB01Welcome';
import { OB02Account }    from './screens/onboarding/OB02Account';
import { OB03NameAge }    from './screens/onboarding/OB03NameAge';
import { OB04Wake }       from './screens/onboarding/OB04Wake';
import { OB05Cycle }      from './screens/onboarding/OB05Cycle';
import { OB06Symptoms }   from './screens/onboarding/OB06Symptoms';
import { OB07Food }       from './screens/onboarding/OB07Food';
import { OB08Move }       from './screens/onboarding/OB08Move';
import { OB09Trigger }    from './screens/onboarding/OB09Trigger';
import { OB10Reward }     from './screens/onboarding/OB10Reward';
import { OB11Investment } from './screens/onboarding/OB11Investment';
import { OB12Ready }      from './screens/onboarding/OB12Ready';
import { T } from './tokens';

const SCREENS = [
  'ob01','ob02','ob03','ob04','ob05','ob06',
  'ob07','ob08','ob09','ob10','ob11','ob12',
  'notif','home',
];

const DEFAULT_USER = {
  email: '',
  name: '',
  age: '',
  wakeMinutes: 405,       // 6:45 am
  lastPeriodDay: 4,
  lastPeriodMonth: 3,     // 0-indexed, 3 = April
  lastPeriodYear: 2026,
  symptoms: ['sleep', 'hot', 'fog', 'energy'],
  foodStyle: 'plants',
  foodAvoid: ['gluten', 'alc'],
  movementLevel: 'active',
  notifAllowed: null,
  rituals: ['eat15', 'walk', 'mag'],
};

function ScreenContent({ screen, goTo, userData, updateUser }) {
  const next = () => {
    const idx = SCREENS.indexOf(screen);
    if (idx < SCREENS.length - 1) goTo(SCREENS[idx + 1]);
  };
  const back = () => {
    const idx = SCREENS.indexOf(screen);
    if (idx > 0) goTo(SCREENS[idx - 1]);
  };

  const ob = { userData, updateUser, onNext: next, onBack: back };

  switch (screen) {
    case 'ob01':  return <OB01Welcome    {...ob}/>;
    case 'ob02':  return <OB02Account    {...ob}/>;
    case 'ob03':  return <OB03NameAge    {...ob}/>;
    case 'ob04':  return <OB04Wake       {...ob}/>;
    case 'ob05':  return <OB05Cycle      {...ob}/>;
    case 'ob06':  return <OB06Symptoms   {...ob}/>;
    case 'ob07':  return <OB07Food       {...ob}/>;
    case 'ob08':  return <OB08Move       {...ob}/>;
    case 'ob09':  return <OB09Trigger    {...ob}/>;
    case 'ob10':  return <OB10Reward     {...ob}/>;
    case 'ob11':  return <OB11Investment {...ob}/>;
    case 'ob12':  return <OB12Ready      {...ob}/>;
    case 'notif': return <Notification   onNavigate={goTo} userData={userData}/>;
    case 'home':  return <Home           onNavigate={goTo} userData={userData}/>;
    default:      return <Home           onNavigate={goTo} userData={userData}/>;
  }
}

export default function App() {
  const [screen, setScreen] = useState('ob01');
  const [userData, setUserData] = useState(DEFAULT_USER);

  const updateUser = (partial) => setUserData(prev => ({ ...prev, ...partial }));

  const navItems = [
    { id: 'ob01',  label: 'Onboarding' },
    { id: 'notif', label: 'Notification' },
    { id: 'home',  label: 'Home' },
  ];

  const isOB = screen.startsWith('ob');

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f0eee9',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '40px 24px 60px',
      gap: 32,
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontFamily: T.serif, fontSize: 26, fontStyle: 'italic', color: T.terracottaDeep, letterSpacing: -0.3 }}>
          Themaka
        </div>
        <div style={{ fontSize: 11, letterSpacing: 2.2, textTransform: 'uppercase', color: T.inkMuted, marginTop: 4 }}>
          Design prototype
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        {navItems.map(n => {
          const active = n.id === 'ob01' ? isOB : screen === n.id;
          return (
            <button key={n.id} onClick={() => setScreen(n.id)} style={{
              padding: '8px 18px', borderRadius: T.radii.pill,
              background: active ? T.terracottaDeep : T.paper,
              color: active ? T.paper : T.inkSoft,
              border: `1px solid ${T.sand}`,
              fontFamily: T.sans, fontSize: 13, fontWeight: 500, cursor: 'pointer',
              transition: 'all 0.2s',
            }}>{n.label}</button>
          );
        })}
      </div>

      <PhoneFrame>
        <ScreenContent screen={screen} goTo={setScreen} userData={userData} updateUser={updateUser}/>
      </PhoneFrame>

      {isOB && (
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          {['ob01','ob02','ob03','ob04','ob05','ob06','ob07','ob08','ob09','ob10','ob11','ob12'].map(s => (
            <button key={s} onClick={() => setScreen(s)} style={{
              width: screen === s ? 20 : 7, height: 7, borderRadius: 4,
              background: screen === s ? T.terracottaDeep : 'rgba(61,51,40,0.2)',
              border: 'none', cursor: 'pointer', padding: 0,
              transition: 'all 0.3s ease',
            }}/>
          ))}
        </div>
      )}

      <div style={{ fontSize: 11.5, color: T.inkMuted, textAlign: 'center', maxWidth: 320, lineHeight: 1.6 }}>
        Tap <strong>Continue</strong> or <strong>Back</strong> to navigate the flow.
        Use the buttons above to jump to a section.
      </div>
    </div>
  );
}
