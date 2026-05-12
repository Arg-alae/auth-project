interface AuthInputProps {
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  rightElement?: React.ReactNode;
  helperText?: string;
}

export default function AuthInput({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  rightElement,
  helperText,
}: AuthInputProps) {
  return (
    <div className="mb-5">
      <label className="block text-[9px] font-bold tracking-widest text-[#8B2635] mb-2 uppercase">
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full border-0 border-b border-[#8B2635] bg-transparent py-1.5 text-sm text-gray-900 outline-none placeholder:text-gray-400"
          style={{ fontFamily: 'Georgia, serif' }}
        />
        {rightElement && (
          <div className="absolute right-0 top-1/2 -translate-y-1/2">
            {rightElement}
          </div>
        )}
      </div>
      {helperText && (
        <p className="text-[11px] text-[#8B2635] mt-1.5">{helperText}</p>
      )}
    </div>
  );
}