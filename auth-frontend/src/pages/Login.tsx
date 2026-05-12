import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import AuthLayout from '../components/AuthLayout';
import AuthInput from '../components/AuthInput';
import AuthButton from '../components/AuthButton';
import loginBg from '../assets/login.png';

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
            className="bg-transparent border-0 cursor-pointer text-gray-400 text-sm p-0"
          >
            {showPassword ? '🙈' : '👁'}
          </button>
        }
      />

      {/* Forgot password */}
      <div className="flex justify-end -mt-3 mb-8">
        <a href="#" className="text-xs text-[#8B2635]" style={{ fontFamily: 'Georgia, serif' }}>
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