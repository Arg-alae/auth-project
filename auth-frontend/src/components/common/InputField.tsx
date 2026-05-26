interface InputFieldProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  
}

export default function InputField({
  placeholder,
  value,
  onChange,
  type = 'text',
}: InputFieldProps) {
  return (
    <input
      placeholder={placeholder}
      value={value}
      type={type}
      onChange={e => onChange(e.target.value)}
      style={{
        display: 'block',
        width: '100%',
        marginBottom: 10,
        padding: 8,
        borderRadius: 6,
        border: '1px solid #ddd',
        fontSize: 14,
      }}
    />
  );
}