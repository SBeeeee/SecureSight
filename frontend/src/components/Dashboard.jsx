// components/DashboardView.tsx
import CameraFeed from "./CameraFeed";
import IncidentDetails from "./IncidentDetails";

export default function DashboardView() {
  return (
    <div className="flex flex-col md:flex-row gap-1 items-center px-6 py-4 ">
      <CameraFeed />
      <IncidentDetails />
    </div>
  );
}
