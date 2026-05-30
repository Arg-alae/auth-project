import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function DashboardLayout({
  children,
  searchPlaceholder,
  onSearchChange,
}: {
  children: React.ReactNode;
  searchPlaceholder?: string;
  onSearchChange?: (value: string) => void;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 ml-[180px]">
        <Topbar placeholder={searchPlaceholder} onSearchChange={onSearchChange} />
        <div className="mt-14 p-8">
          {children}
        </div>
      </div>
    </div>
  );
}