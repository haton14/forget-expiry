import { Timestamp } from 'firebase/firestore';
import { useState } from 'react';

import { Expiry, newExpiry } from '../repositories/Expiries';

interface InputProps {
  createHandler: (expiry: Expiry) => Promise<void>;
}

const Input = (props: InputProps) => {
  const timestamp = (datetimeStr: string) => {
    return Timestamp.fromDate(new Date(datetimeStr));
  };

  const add = async () => {
    const data = newExpiry(name, timestamp(expiry));
    await props.createHandler(data);
  };

  const [name, setName] = useState<string>('');
  const [expiry, setExpiry] = useState<string>('');
  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.currentTarget.value);
        }}
      />
      <input
        type="date"
        value={expiry}
        onChange={(e) => {
          setExpiry(e.currentTarget.value);
        }}
      />
      <button onClick={add}>add</button>
    </div>
  );
};

export default Input;
