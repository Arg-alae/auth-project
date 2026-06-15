interface ComingSoonProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function ComingSoon({ title, description, icon }: ComingSoonProps) {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
      <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h1 className="text-xl font-semibold text-gray-900 mb-2">{title}</h1>
      <p className="text-sm text-gray-400 max-w-sm">{description}</p>
      <span className="mt-4 text-xs font-semibold px-3 py-1 rounded-full bg-red-50 text-[#8B2635]">
        Coming Soon
      </span>
    </div>
  );
}