"use client";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UserCircle2, ChevronDown } from "lucide-react";
import { clearUser } from "@/store/user/slice";
import { logoutUser } from "./api";
import { useRouter } from "next/navigation";

export default function UIavatar() {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    await logoutUser();
    dispatch(clearUser());
    setOpen(false);
    router.push("/login");
  };

  const initials = user?.name?.[0]?.toUpperCase() || "";

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 bg-gray-800 text-white px-3 py-1 rounded-full shadow hover:bg-gray-700 transition"
      >
        <div className="w-8 h-8 rounded-full bg-gray-200 text-black flex items-center justify-center text-sm">
          {isAuthenticated ? initials : <UserCircle2 className="w-4 h-4" />}
        </div>
        <ChevronDown className="w-4 h-4 text-white" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl z-50 p-3 text-sm">
          {isAuthenticated ? (
            <>
              <div className="mb-2 border-b pb-2">
                <p className="text-gray-800 font-medium">{user.name}</p>
                <p className="text-gray-600 text-xs">{user.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-left text-red-600 hover:bg-gray-100 rounded px-2 py-1"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => router.push("/login")}
                className="w-full text-left hover:bg-gray-100 rounded px-2 py-1"
              >
                Login
              </button>
              <button
                onClick={() => router.push("/register")}
                className="w-full text-left hover:bg-gray-100 rounded px-2 py-1"
              >
                Sign up
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
