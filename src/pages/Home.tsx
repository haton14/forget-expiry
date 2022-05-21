import { getAuth, signOut } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import Input from '../components/Input';
import { fetchAll, create, Expiry } from '../repositories/Expiries';

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
        <div key={expiry.name}>
          <div>{expiry.name}</div>
          <div>{expiry.expiry.toMillis()}</div>
        </div>
      ))}
      <Input createHandler={create} />
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default Home;
