import {
  LayoutDashboard,
  Camera,
  MonitorPlay,
  AlertTriangle,
  Users
} from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="text-white shadow-2xl w-full ">
      {/* Glowing Gradient Background */}
      <div className="bg-gradient-to-r from-black via-yellow-900 to-black">
        <div className="flex items-center justify-between px-6 py-2 max-w-screen-xl mx-auto">
          {/* Left: Logo */}
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-pink-600 flex items-center justify-center font-bold text-xs">
              M
            </div>
            <span className="text-lg font-semibold tracking-wide">MANDLACX</span>
          </div>

          {/* Center: Navigation Items */}
          <div className="flex gap-6 text-xs items-center">
            <div className="flex items-center gap-1 cursor-pointer hover:text-yellow-400">
              <LayoutDashboard size={16} />
              Dashboard
            </div>
            <div className="flex items-center gap-1 cursor-pointer hover:text-yellow-400">
              <Camera size={16} />
              Cameras
            </div>
            <div className="flex items-center gap-1 cursor-pointer hover:text-yellow-400">
              <MonitorPlay size={16} />
              Scenes
            </div>
            <div className="flex items-center gap-1 cursor-pointer hover:text-yellow-400">
              <AlertTriangle size={16} />
              Incidents
            </div>
            <div className="flex items-center gap-1 cursor-pointer hover:text-yellow-400">
              <Users size={16} />
              Users
            </div>
          </div>

          {/* Right: User Info */}
          <div className="flex items-center gap-3 text-right">
            <div className="text-[11px] leading-tight hidden md:block">
              <div className="text-white font-medium">Mohammed Ajmal</div>
              <div className="text-gray-400">Super Administrator</div>
            </div>
            <div className="w-7 h-7 bg-gray-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
              M
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
