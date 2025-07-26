// app/login/page.tsx
"use client";
import { useState } from "react";
import { loginUser } from "@/components/api";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/user/slice";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser({ email, password });
      dispatch(setUser(data));
      router.push("/"); 
    } catch (error) {
      setErr(error?.response?.data?.message || "Login failed");
      alert(error.message)
    }
  };

  return (
    <div className="min-h-screen bg-slate-500 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm space-y-4"
      >
        <h2 className="text-xl font-semibold text-center">Login</h2>
        {err && <p className="text-red-500 text-sm">{err}</p>}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border border-gray-300 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border border-gray-300 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-slate-700 text-white py-2 rounded hover:bg-slate-800 transition"
        >
          Login
        </button>
        <p
          onClick={() => router.push("/register")}
          className="text-sm text-center text-blue-700 hover:underline cursor-pointer"
        >
          {Don't have an account? Register}
        </p>
      </form>
    </div>
  );
}
