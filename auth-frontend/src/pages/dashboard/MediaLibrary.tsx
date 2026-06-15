import DashboardLayout from '../../components/dashboard/DashboardLayout';
import ComingSoon from '../../components/dashboard/ComingSoon';

export default function MediaLibrary() {
  return (
    <DashboardLayout>
      <ComingSoon
        title="Media Library"
        description="Media library is coming soon. You'll be able to upload and manage all your images and files here."
        icon={
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8B2635" strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <path d="M21 15l-5-5L5 21"/>
          </svg>
        }
      />
    </DashboardLayout>
  );
}