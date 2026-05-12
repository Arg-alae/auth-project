import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        // position du toast : top-right, top-center, bottom-left etc.
        toastOptions={{
          duration: 3000,
          // disparaît après 3 secondes
          style: {
            borderRadius: '8px',
            fontSize: '14px',
          },
          success: {
            style: {
              background: '#E1F5EE',
              color: '#085041',
            },
          },
          error: {
            style: {
              background: '#FCEBEB',
              color: '#A32D2D',
            },
          },
        }}
      />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}