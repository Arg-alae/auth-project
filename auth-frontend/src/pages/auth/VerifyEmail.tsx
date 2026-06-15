import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';
import AuthLayout from '../../components/common/AuthLayout';
import loginBg from '../../assets/images/login.png';

export default function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const hasVerified = useRef(false);

  useEffect(() => {
    if (hasVerified.current) return;
    hasVerified.current = true;

    const verify = async () => {
      try {
        await api.get(`/auth/verify-email/${token}`);
        setStatus('success');
      } catch {
        setStatus('error');
      }
    };
    verify();
  }, [token]);

  const titles = {
    loading: 'Verifying...',
    success: 'Welcome aboard.',
    error: 'Something went wrong.',
  };

  const subtitles = {
    loading: 'Please wait a moment.',
    success: 'Your account is now active. Start managing your artisanal collection.',
    error: 'The verification link may have expired or already been used.',
  };

  return (
    <AuthLayout
      image={loginBg}
      title={titles[status]}
      subtitle={subtitles[status]}
    >
      <div className="text-center">

        {/* LOADING */}
        {status === 'loading' && (
          <div>
            <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-6 animate-pulse">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8B2635" strokeWidth="1.5">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <h1 className="text-2xl font-normal text-gray-900 mb-3" style={{ fontFamily: 'Georgia, serif' }}>
              Verifying your email...
            </h1>
            <p className="text-sm text-gray-400">Please wait a moment.</p>
          </div>
        )}

        {/* SUCCESS */}
        {status === 'success' && (
          <div>
            <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.8">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <h1 className="text-2xl font-normal text-gray-900 mb-3" style={{ fontFamily: 'Georgia, serif' }}>
              Account Activated!
            </h1>
            <p className="text-sm text-gray-500 mb-8">
              Your email has been verified successfully. Your Morazon account is now active.
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

        {/* ERROR */}
        {status === 'error' && (
          <div>
            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8B2635" strokeWidth="1.8">
                <circle cx="12" cy="12" r="10"/>
                <line x1="15" y1="9" x2="9" y2="15"/>
                <line x1="9" y1="9" x2="15" y2="15"/>
              </svg>
            </div>
            <h1 className="text-2xl font-normal text-gray-900 mb-3" style={{ fontFamily: 'Georgia, serif' }}>
              Verification Failed
            </h1>
            <p className="text-sm text-gray-500 mb-8">
              This verification link is invalid or has already been used. Please register again.
            </p>
            <button
              onClick={() => navigate('/register')}
              className="w-full bg-[#8B2635] text-white text-xs font-bold tracking-widest uppercase py-3 px-6 hover:bg-[#7a1f2d] transition-colors cursor-pointer"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Back to Register
            </button>
          </div>
        )}

      </div>
    </AuthLayout>
  );
}