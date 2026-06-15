import { useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/common/AuthLayout';
import loginBg from '../../assets/images/login.png';

export default function CheckEmail() {
  const navigate = useNavigate();

  return (
    <AuthLayout
      image={loginBg}
      title="One last step."
      subtitle="Check your inbox and verify your email to activate your Morazon account."
    >
      <div className="text-center">

        {/* ICONE EMAIL */}
        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8B2635" strokeWidth="1.5">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
        </div>

        <h1 className="text-2xl font-normal text-gray-900 mb-3" style={{ fontFamily: 'Georgia, serif' }}>
          Check your email
        </h1>

        <p className="text-sm text-gray-500 mb-2">
          We've sent a verification link to your email address.
        </p>
        <p className="text-sm text-gray-400 mb-8">
          Click the link in the email to activate your account.
        </p>

        {/* STEPS */}
        <div className="text-left bg-gray-50 rounded-lg p-4 mb-8">
          {[
            'Open your email inbox',
            'Find the email from Morazon',
            'Click "Verify Email Address"',
            'You\'re all set!'
          ].map((step, index) => (
            <div key={index} className="flex items-center gap-3 mb-3 last:mb-0">
              <div className="w-5 h-5 rounded-full bg-[#8B2635] flex items-center justify-center flex-shrink-0">
                <span className="text-white text-[10px] font-bold">{index + 1}</span>
              </div>
              <span className="text-sm text-gray-600">{step}</span>
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-400">
          Already have an account ?{' '}
          <span
            onClick={() => navigate('/login')}
            className="text-[#8B2635] cursor-pointer hover:underline"
          >
            Sign in
          </span>
        </p>

      </div>
    </AuthLayout>
  );
}