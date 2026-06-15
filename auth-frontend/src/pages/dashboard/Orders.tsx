import DashboardLayout from '../../components/dashboard/DashboardLayout';
import ComingSoon from '../../components/dashboard/ComingSoon';

export default function Orders() {
  return (
    <DashboardLayout>
      <ComingSoon
        title="Orders"
        description="Order management is coming soon. You'll be able to track and manage all customer orders here."
        icon={
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8B2635" strokeWidth="1.5">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
        }
      />
    </DashboardLayout>
  );
}