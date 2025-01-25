
import { Bell } from "lucide-react";

const ProfileHeader = () => {
  return (
    <div className="flex items-center justify-between bg-black text-white p-4">
      <div className="flex items-center space-x-4">
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-red-600 overflow-hidden">
          
        </div>
        <span className="text-sm font-medium">Harsh Vardhan</span>
      </div>
      <div className="flex items-center space-x-2">
        <Bell className="w-5 h-5 text-gray-400" />
        <div className="w-2 h-2 bg-blue-500 rounded-full" />
      </div>
    </div>
  );
};

export default ProfileHeader;
