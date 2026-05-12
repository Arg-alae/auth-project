import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import AuthLayout from '../components/AuthLayout';
import AuthInput from '../components/AuthInput';
import AuthButton from '../components/AuthButton';
import registerBg from '../assets/register-bg.png';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const { register, loading } = useAuth();

  return (
    <AuthLayout
      image={registerBg}
      title="Join the Collective."
      subtitle="Start your journey with Morazon. Showcase your unique craft to a global audience and manage your boutique with our premium tools."
    >
      <h1 className="text-2xl font-normal text-gray-900 mb-8 tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
        Seller Registration
      </h1>

      <AuthInput
        label="Full Name"
        placeholder="Julianne Vane"
        value={name}
        onChange={setName}
      />

      <AuthInput
        label="Email Address"
        type="email"
        placeholder="julianne.vane@archive"
        value={email}
        onChange={setEmail}
      />

      <AuthInput
        label="Password"
        type={showPassword ? 'text' : 'password'}
        placeholder="secret"
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
        helperText="ⓘ Password must be at least 8 characters"
      />

      {/* Checkbox */}
      <div className="flex items-center gap-2 mb-5">
        <input
          type="checkbox"
          checked={agreed}
          onChange={e => setAgreed(e.target.checked)}
          className="w-3.5 h-3.5 cursor-pointer accent-[#8B2635] shrink-0"
        />
        <span className="text-xs text-gray-500 leading-snug" style={{ fontFamily: 'Georgia, serif' }}>
          I agree to the{' '}
          <a href="#" className="text-gray-900 font-normal underline">
            Terms of Service
          </a>
          {' '}and{' '}
          <a href="#" className="text-gray-900 font-normal underline">
            Privacy Policy
          </a>.
        </span>
      </div>

      <AuthButton
        onClick={() => register({ name, email, password })}
        disabled={!agreed}
        loading={loading}
        loadingText="CREATING ACCOUNT..."
        text="START SELLING"
      />

      <p className="text-center text-sm text-gray-400" style={{ fontFamily: 'Georgia, serif' }}>
        Already a member?{' '}
        <a href="/login" className="text-gray-900 font-bold no-underline">
          Sign in
        </a>
      </p>
    </AuthLayout>
  );
}