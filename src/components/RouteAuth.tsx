import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthRouteProps {
  children: React.ReactNode;
}

const AuthRoute = (props: AuthRouteProps) => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const authCheck = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(false);
      } else {
        console.log('none auth');
        navigate('/login');
      }
    });
    return () => {
      authCheck();
    };
  }, [auth]);
  if (loading) return <p>loading ...</p>;

  return <>{props.children}</>;
};

export default AuthRoute;
