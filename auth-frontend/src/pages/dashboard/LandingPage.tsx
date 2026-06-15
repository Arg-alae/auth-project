import DashboardLayout from '../../components/dashboard/DashboardLayout';
import ComingSoon from '../../components/dashboard/ComingSoon';

export default function LandingPage() {
  return (
    <DashboardLayout>
      <ComingSoon
        title="Landing Page"
        description="Landing page management is coming soon. You'll be able to customize your public storefront here."
        icon={
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8B2635" strokeWidth="1.5">
            <rect x="2" y="3" width="20" height="14" rx="2"/>
            <path d="M8 21h8M12 17v4"/>
          </svg>
        }
      />
    </DashboardLayout>
  );
}