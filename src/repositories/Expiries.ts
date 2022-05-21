import { getFirestore, collection, getDocs, addDoc, FirestoreDataConverter, DocumentData, QueryDocumentSnapshot, SnapshotOptions, Timestamp } from 'firebase/firestore';

export interface Expiry {
  name: string;
  expiry: Timestamp;
}

export const newExpiry: (name: string, expiry: Timestamp) => Expiry = (name, expiry) => {
  return {
    id: '',
    name: name,
    expiry: expiry,
  };
};

const expiryConverter: FirestoreDataConverter<Expiry> = {
  toFirestore(expiry: Expiry): DocumentData {
    return {
      name: expiry.name,
      expiry: expiry.expiry,
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Expiry {
    const data = snapshot.data(options);
    return {
      name: data['name'],
      expiry: data['expiry'],
    };
  },
};

export const fetchAll = async (): Promise<Expiry[]> => {
  const db = getFirestore();
  const collRef = collection(db, 'expiries').withConverter(expiryConverter);
  const snapshot = await getDocs(collRef);
  return snapshot.docs.map((doc) => doc.data());
};

export const create = async (expiry: Expiry) => {
  const db = getFirestore();
  const collRef = collection(db, 'expiries').withConverter(expiryConverter);
  await addDoc(collRef, expiry);
};
