import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import CheckEmail from './pages/auth/CheckEmail';
import VerifyEmail from './pages/auth/VerifyEmail';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import Dashboard from './pages/dashboard/Dashboard';
import Products from './pages/dashboard/Products';
import AddProduct from './pages/dashboard/AddProduct';
import Orders from './pages/dashboard/Orders';
import LandingPage from './pages/dashboard/LandingPage';
import MediaLibrary from './pages/dashboard/MediaLibrary';
import Settings from './pages/dashboard/Settings';
import ProtectedRoute from './components/common/ProtectedRoute';

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: { borderRadius: '8px', fontSize: '14px' },
          success: { style: { background: '#E1F5EE', color: '#085041' } },
          error: { style: { background: '#FCEBEB', color: '#A32D2D' } },
        }}
      />
      <Routes>
        {/* Routes publiques */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/check-email" element={<CheckEmail />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Routes protégées */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/dashboard/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
        <Route path="/dashboard/products/add" element={<ProtectedRoute><AddProduct /></ProtectedRoute>} />
        <Route path="/dashboard/products/edit/:id" element={<ProtectedRoute><AddProduct /></ProtectedRoute>} />
        <Route path="/dashboard/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
        <Route path="/dashboard/landing-page" element={<ProtectedRoute><LandingPage /></ProtectedRoute>} />
        <Route path="/dashboard/media" element={<ProtectedRoute><MediaLibrary /></ProtectedRoute>} />
        <Route path="/dashboard/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}