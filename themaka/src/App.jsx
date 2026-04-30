import { Routes, Route, Navigate } from 'react-router-dom';
import { useUser } from './context/UserContext';
import { OnboardingRouter } from './screens/OnboardingRouter';
import { Home } from './screens/Home';
import { Notification } from './screens/Notification';
import { Login } from './screens/Login';

export default function App() {
  const { userData } = useUser();

  return (
    <div className="app-shell">
      <Routes>
        <Route
          path="/"
          element={
            userData.onboardingComplete
              ? <Navigate to="/home" replace />
              : <Navigate to="/onboarding/1" replace />
          }
        />
        <Route path="/onboarding/:step" element={<OnboardingRouter />} />
        <Route path="/home" element={<Home />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
