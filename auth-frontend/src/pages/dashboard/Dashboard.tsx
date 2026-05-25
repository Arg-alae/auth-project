import DashboardLayout from '../../components/dashboard/DashboardLayout';

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">Dashboard</h1>
        <p className="text-sm text-gray-500">Welcome to Morazon Admin.</p>
      </div>
    </DashboardLayout>
  );
}
