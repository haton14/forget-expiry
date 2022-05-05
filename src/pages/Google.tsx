import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GoogleLogin = () => {
  const auth = getAuth();

  const navigate = useNavigate();
  const [authing, setAuthing] = useState(false);

  const signIn = async () => {
    setAuthing(true);
    signInWithPopup(auth, new GoogleAuthProvider())
      .then((response) => {
        console.log(response.user.uid);
        response.user
          .getIdToken()
          .then()
          .catch((error) => {
            console.log(error);
          });

        navigate('/');
      })
      .catch((error) => {
        console.log(error);
        setAuthing(false);
      });
  };

  return (
    <div>
      <p>Login Page</p>
      <button onClick={() => signIn()} disabled={authing}>
        Sign in with Google
      </button>
    </div>
  );
};

export default GoogleLogin;
