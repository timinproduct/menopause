import { createContext, useContext, useState } from 'react';

const DEFAULT_USER = {
  email: '',
  name: '',
  age: '',
  wakeMinutes: 405,
  lastPeriodDay: 1,
  lastPeriodMonth: new Date().getMonth(),
  lastPeriodYear: new Date().getFullYear(),
  symptoms: [],
  foodStyle: '',
  foodAvoid: [],
  movementLevel: 'active',
  notifAllowed: null,
  rituals: [],
  onboardingComplete: false,
};

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [userData, setUserData] = useState(() => {
    try {
      const saved = localStorage.getItem('themaka_user');
      return saved ? { ...DEFAULT_USER, ...JSON.parse(saved) } : DEFAULT_USER;
    } catch {
      return DEFAULT_USER;
    }
  });

  const updateUser = (partial) => {
    setUserData(prev => {
      const next = { ...prev, ...partial };
      try { localStorage.setItem('themaka_user', JSON.stringify(next)); } catch {}
      return next;
    });
  };

  const resetUser = () => {
    try { localStorage.removeItem('themaka_user'); } catch {}
    setUserData(DEFAULT_USER);
  };

  return (
    <UserContext.Provider value={{ userData, updateUser, resetUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
