import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import AuthLayout from '../../components/common/AuthLayout';
import AuthInput from '../../components/common/AuthInput';
import AuthButton from '../../components/common/AuthButton';
import loginBg from '../../assets/images/login.png';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading } = useAuth();

  return (
    <AuthLayout
      image={loginBg}
      title="Welcome Back."
      subtitle="Access your seller dashboard to manage your inventory, track orders, and showcase your latest collections to the world."
    >
      <h1 className="text-2xl font-normal text-gray-900 mb-10 tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
        Seller Sign In
      </h1>

      <AuthInput
        label="Email Address"
        type="email"
        placeholder="e.thorne@example.com"
        value={email}
        onChange={setEmail}
      />

      <AuthInput
        label="Password"
        type={showPassword ? 'text' : 'password'}
        placeholder="password123"
        value={password}
        onChange={setPassword}
        rightElement={
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="bg-transparent border-0 cursor-pointer text-gray-400 hover:text-gray-600 transition-colors p-0"
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
        }
      />

      {/* Forgot password */}
      <div className="flex justify-end -mt-3 mb-8">
        <a href="/forgot-password" className="text-xs text-[#8B2635]" style={{ fontFamily: 'Georgia, serif' }}>
         Forgot password?
       </a>
      </div>

      <AuthButton
        onClick={() => login({ email, password })}
        loading={loading}
        loadingText="SIGNING IN..."
        text="SELLER SIGN IN"
      />

      <p className="text-center text-sm text-gray-400" style={{ fontFamily: 'Georgia, serif' }}>
        Don't have an account ?{' '}
        <a href="/register" className="text-gray-900 font-bold no-underline">
          Sign up
        </a>
      </p>
    </AuthLayout>
  );
}