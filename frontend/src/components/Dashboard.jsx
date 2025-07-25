// components/DashboardView.tsx
import CameraFeed from "./CameraFeed";
import IncidentDetails from "./IncidentDetails";

export default function DashboardView() {
  return (
    <div className="flex flex-col md:flex-row gap-4 px-6 py-4 bg-[#111] min-h-[calc(100vh-60px)]">
      <CameraFeed />
      <IncidentDetails />
    </div>
  );
}
