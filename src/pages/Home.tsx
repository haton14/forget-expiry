import { getAuth, signOut } from 'firebase/auth';
import { Navigate } from 'react-router-dom';

interface HomeProps {
  token: string;
}

const Home = (props: HomeProps) => {
  const auth = getAuth();
  return auth.currentUser ? (
    <div>
      <p>Home Page</p>
      <p>idToken: {props.token}</p>
      <button onClick={() => signOut(auth)}>Sign out</button>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default Home;
