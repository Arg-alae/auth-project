interface AuthButtonProps {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  loadingText: string;
  text: string;
}

export default function AuthButton({
  onClick,
  disabled,
  loading,
  loadingText,
  text,
}: AuthButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`w-full py-3.5 bg-[#8B2635] text-white text-[10px] font-bold tracking-widest uppercase mb-5 transition-opacity ${
        disabled || loading
          ? 'opacity-70 cursor-not-allowed'
          : 'cursor-pointer hover:opacity-90'
      }`}
      style={{ fontFamily: 'Georgia, serif' }}
    >
      {loading ? loadingText : text}
    </button>
  );
}