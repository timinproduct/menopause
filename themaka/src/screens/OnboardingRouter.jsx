import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { OB01Welcome }    from './onboarding/OB01Welcome';
import { OB02Account }    from './onboarding/OB02Account';
import { OB03NameAge }    from './onboarding/OB03NameAge';
import { OB04Wake }       from './onboarding/OB04Wake';
import { OB05Cycle }      from './onboarding/OB05Cycle';
import { OB06Symptoms }   from './onboarding/OB06Symptoms';
import { OB07Food }       from './onboarding/OB07Food';
import { OB08Move }       from './onboarding/OB08Move';
import { OB09Trigger }    from './onboarding/OB09Trigger';
import { OB10Reward }     from './onboarding/OB10Reward';
import { OB11Investment } from './onboarding/OB11Investment';
import { OB12Ready }      from './onboarding/OB12Ready';

const TOTAL = 12;

export function OnboardingRouter() {
  const { step } = useParams();
  const stepNum = parseInt(step, 10);
  const navigate = useNavigate();
  const { userData, updateUser } = useUser();

  if (!stepNum || stepNum < 1 || stepNum > TOTAL) {
    return <Navigate to="/onboarding/1" replace />;
  }

  const onNext = () => {
    if (stepNum >= TOTAL) {
      updateUser({ onboardingComplete: true });
      navigate('/home');
    } else {
      navigate(`/onboarding/${stepNum + 1}`);
    }
  };

  const onBack = () => {
    if (stepNum > 1) navigate(`/onboarding/${stepNum - 1}`);
  };

  const props = { userData, updateUser, onNext, onBack };

  switch (stepNum) {
    case 1:  return <OB01Welcome    {...props} />;
    case 2:  return <OB02Account    {...props} />;
    case 3:  return <OB03NameAge    {...props} />;
    case 4:  return <OB04Wake       {...props} />;
    case 5:  return <OB05Cycle      {...props} />;
    case 6:  return <OB06Symptoms   {...props} />;
    case 7:  return <OB07Food       {...props} />;
    case 8:  return <OB08Move       {...props} />;
    case 9:  return <OB09Trigger    {...props} />;
    case 10: return <OB10Reward     {...props} />;
    case 11: return <OB11Investment {...props} />;
    case 12: return <OB12Ready      {...props} />;
    default: return <Navigate to="/onboarding/1" replace />;
  }
}
