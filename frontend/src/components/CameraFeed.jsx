// components/CameraFeed.tsx
export default function CameraFeed() {
    return (
      <div className="w-full md:w-2/3 p-4 relative">
        <div className="relative rounded-md overflow-hidden shadow-md">
          {/* Main Camera Feed Image */}
          <img
            src="https://media.istockphoto.com/id/1496748127/photo/home-security-camera-footage-of-package-delivery.webp?a=1&b=1&s=612x612&w=0&k=20&c=5yMH-Rz56_VhEo6sEvD-mz2Gri4vjBFqSCRoQo5X0RI="
            alt="Main Camera Feed"
            className="w-full h-[400px] object-cover"
          />
  
          {/* Top Left: Date and Time */}
          <div className="absolute top-2 left-2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
            07:15:22 AM | 24-07-2025
          </div>
  
          {/* Bottom Left: Camera Tag */}
          <div className="absolute bottom-2 left-2 bg-red-600 text-white text-xs font-medium px-2 py-1 rounded">
            Camera - 03
          </div>
  
          {/* Bottom Right: Mini camera previews */}
          <div className="absolute bottom-2 right-2 flex gap-2">
            {[1, 2].map((id) => (
              <img
                key={id}
                src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn3OhbgshmMn0uH2ire-QfaUpYwDfAiagvMw&s`}
                className="w-[100px] h-[60px] object-cover rounded-sm border border-white"
                alt={`Preview ${id}`}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
  