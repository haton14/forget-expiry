import { getAuth, signOut } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import Input from '../components/Input';
import { fetchAll, create, Expiry } from '../repositories/Expiries';

const Home = () => {
  const [expiries, setExpiries] = useState<Expiry[]>();
  const auth = getAuth();

  useEffect(() => {
    fetchAll().then(setSortExpiries);
  }, []);

  const setSortExpiries = (expiries: Expiry[]) => {
    const expiriesCopy = expiries?.slice().sort((a, b) => a.expiry.toMillis() - b.expiry.toMillis());
    setExpiries(expiriesCopy);
  };

  const addExpiry = (expiry: Expiry) => {
    const expiriesCopy = expiries?.slice();
    expiriesCopy?.push(expiry);
    if (expiriesCopy) {
      setSortExpiries(expiriesCopy);
    }
  };

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}/${month}/${day}`;
  };

  return auth.currentUser ? (
    <div>
      <button onClick={() => signOut(auth)}>Sign out</button>
      {expiries?.map((expiry) => (
        <div key={expiry.id}>
          <div>{expiry.name}</div>
          <div>{formatDate(expiry.expiry.toDate())}</div>
        </div>
      ))}
      <Input createHandler={create} addExpiry={addExpiry} />
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default Home;
