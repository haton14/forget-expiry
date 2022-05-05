import { getAuth, signOut } from 'firebase/auth';
import { Navigate } from 'react-router-dom';

interface HomeProps {
  token: string;
}

const Home = () => {
  const auth = getAuth();
  return auth.currentUser ? (
    <div>
      <button onClick={() => signOut(auth)}>Sign out</button>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default Home;
