import { initializeApp } from 'firebase/app';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AuthRoute from './components/auth/RouteAuth';
import { FirebaseConfig } from './config/firebase';
import HomePage from './pages/Home';
import GoogleLoginPage from './pages/auth/Google';

initializeApp(FirebaseConfig);

const App = () => {
  const [idToken, setIdToken] = useState(String);
  const saveToken = (token: string) => {
    setIdToken(token);
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AuthRoute>
              <HomePage token={idToken} />
            </AuthRoute>
          }
        />
        <Route path="/login" element={<GoogleLoginPage saveToken={saveToken} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
