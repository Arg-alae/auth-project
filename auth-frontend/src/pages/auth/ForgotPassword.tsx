import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import toast from 'react-hot-toast';
import AuthLayout from '../../components/common/AuthLayout';
import loginBg from '../../assets/images/login.png';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }
    setLoading(true);
    try {
      await api.post('/auth/forgot-password', { email });
      setSent(true);
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      image={loginBg}
      title={sent ? 'Check your inbox.' : 'Forgot your password?'}
      subtitle={sent
        ? 'We sent you a link to reset your password.'
        : 'No worries. We will send you a reset link.'
      }
    >
      {!sent ? (
        <>
          <h1 className="text-2xl font-normal text-gray-900 mb-3 tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
            Reset your password
          </h1>
          <p className="text-sm text-gray-400 mb-8">
            Enter your email address and we'll send you a link to reset your password.
          </p>

          <div className="mb-6">
            <label className="block text-[9px] font-bold tracking-widest text-[#8B2635] mb-2 uppercase">
              Email Address
            </label>
            <input
              type="email"
              placeholder="e.thorne@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
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
            {loading ? 'SENDING...' : 'SEND RESET LINK'}
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
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8B2635" strokeWidth="1.5">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </div>
          <h1 className="text-2xl font-normal text-gray-900 mb-3" style={{ fontFamily: 'Georgia, serif' }}>
            Check your email
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            We sent a password reset link to <strong>{email}</strong>. Click the link to reset your password.
          </p>
          <p className="text-xs text-gray-400">
            Didn't receive the email?{' '}
            <span
              onClick={() => setSent(false)}
              className="text-[#8B2635] cursor-pointer hover:underline"
            >
              Try again
            </span>
          </p>
        </div>
      )}
    </AuthLayout>
  );
}