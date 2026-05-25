import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function DashboardLayout({ children, searchPlaceholder }: { children: React.ReactNode; searchPlaceholder?: string }) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 ml-[180px]">
        <Topbar placeholder={searchPlaceholder} />
        <div className="mt-14 p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
