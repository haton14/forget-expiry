import { initializeApp } from 'firebase/app';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AuthRoute from './components/RouteAuth';
import { FirebaseConfig } from './config/firebase';
import GoogleLoginPage from './pages/Google';
import HomePage from './pages/Home';

initializeApp(FirebaseConfig);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AuthRoute>
              <HomePage />
            </AuthRoute>
          }
        />
        <Route path="/login" element={<GoogleLoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
