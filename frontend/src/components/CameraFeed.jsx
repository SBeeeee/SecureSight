// components/CameraFeed.tsx
import { CircleDot,CalendarDays } from "lucide-react";
export default function CameraFeed() {
    return (
      <div className="w-[45%] md:w-2/3 p-4 relative">
        <div className="relative rounded-md overflow-hidden shadow-md">
          {/* Main Camera Feed Image */}
          <img
            src="https://media.istockphoto.com/id/1496748127/photo/home-security-camera-footage-of-package-delivery.webp?a=1&b=1&s=612x612&w=0&k=20&c=5yMH-Rz56_VhEo6sEvD-mz2Gri4vjBFqSCRoQo5X0RI="
            alt="Main Camera Feed"
            className="w-full object-cover"
          />
  
          {/* Top Left: Date and Time */}
          <div className="absolute gap-2 flex items-center top-2 left-2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
            <CalendarDays size={16} className="text-slate-500"/> 07:15:22 AM | 24-07-2025
          </div>
  
          {/* Bottom Left: Camera Tag */}
          <div className="absolute bottom-2 left-2 bg-slate-950 flex gap-1 items-center text-white text-xs font-medium px-2 py-1 rounded">
           <CircleDot size={12} className="text-red-600 font-semibold"/> Camera - 03
          </div>
  
          {/* Bottom Right: Mini camera previews */}
          <div className="absolute bottom-2 right-2 flex gap-2">
            {[1, 2].map((id) => (
              <div key={id}>
                <div className="bg-black text-sm font-light text-white ">Camera-01</div>
              <img
                
                src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn3OhbgshmMn0uH2ire-QfaUpYwDfAiagvMw&s`}
                className="w-[140px] h-[75px] object-cover  "
                alt={`Preview ${id}`}
              />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  