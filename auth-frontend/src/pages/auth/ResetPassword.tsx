import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';
import toast from 'react-hot-toast';
import AuthLayout from '../../components/common/AuthLayout';
import loginBg from '../../assets/images/login.png';

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!newPassword || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }
    if (newPassword.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await api.post('/auth/reset-password', { token, newPassword });
      setSuccess(true);
    } catch {
      toast.error('This reset link is invalid or has expired.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      image={loginBg}
      title={success ? 'Password updated.' : 'Create new password.'}
      subtitle={success
        ? 'Your password has been reset successfully.'
        : 'Choose a strong password to protect your account.'
      }
    >
      {!success ? (
        <>
          <h1 className="text-2xl font-normal text-gray-900 mb-3 tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
            Create new password
          </h1>
          <p className="text-sm text-gray-400 mb-8">
            Your new password must be at least 8 characters.
          </p>

          {/* NEW PASSWORD */}
          <div className="mb-6">
            <label className="block text-[9px] font-bold tracking-widest text-[#8B2635] mb-2 uppercase">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter new password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                className="w-full border-0 border-b border-[#8B2635] bg-transparent py-1.5 text-sm text-gray-900 outline-none placeholder:text-gray-400 pr-8"
                style={{ fontFamily: 'Georgia, serif' }}
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-transparent border-0 cursor-pointer text-gray-400 hover:text-gray-600 transition-colors p-0"
              >
                {showPassword ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="mb-8">
            <label className="block text-[9px] font-bold tracking-widest text-[#8B2635] mb-2 uppercase">
              Confirm Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className="w-full border-0 border-b border-[#8B2635] bg-transparent py-1.5 text-sm text-gray-900 outline-none placeholder:text-gray-400"
              style={{ fontFamily: 'Georgia, serif' }}
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full py-3.5 bg-[#8B2635] text-white text-[10px] font-bold tracking-widest uppercase mb-5 transition-opacity ${
              loading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer hover:opacity-90'
            }`}
            style={{ fontFamily: 'Georgia, serif' }}
          >
            {loading ? 'RESETTING...' : 'RESET PASSWORD'}
          </button>

          <p className="text-center text-sm text-gray-400" style={{ fontFamily: 'Georgia, serif' }}>
            Remember your password?{' '}
            <span
              onClick={() => navigate('/login')}
              className="text-gray-900 font-bold cursor-pointer hover:underline"
            >
              Sign in
            </span>
          </p>
        </>
      ) : (
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.8">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </div>
          <h1 className="text-2xl font-normal text-gray-900 mb-3" style={{ fontFamily: 'Georgia, serif' }}>
            Password Reset!
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            Your password has been reset successfully. You can now login with your new password.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="w-full bg-[#8B2635] text-white text-xs font-bold tracking-widest uppercase py-3 px-6 hover:bg-[#7a1f2d] transition-colors cursor-pointer"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Go to Login
          </button>
        </div>
      )}
    </AuthLayout>
  );
}