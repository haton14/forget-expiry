import { getAuth, signOut } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { fetchAll, Expiry } from '../repositories/Expiries';

const Home = () => {
  const [expiries, setExpiries] = useState<Expiry[]>();
  const auth = getAuth();

  useEffect(() => {
    fetchAll().then(setExpiries);
  }, []);

  return auth.currentUser ? (
    <div>
      <button onClick={() => signOut(auth)}>Sign out</button>
      {expiries?.map((expiry) => (
        <div>
          <div>{expiry.name}</div>
          <div>{expiry.expiry.toMillis()}</div>
        </div>
      ))}
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default Home;
