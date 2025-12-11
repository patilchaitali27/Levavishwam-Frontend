import { useState } from "react";
import { User, Mail, Lock, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    const resp = await signup(formData);
    setLoading(false);

    if (resp.success) {
      setSuccessMsg(resp.message || "Signup successful! Redirecting...");
      setTimeout(() => navigate("/login"), 800);
    } else {
      setError(resp.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 px-6">

      <div className="relative bg-white/70 backdrop-blur-xl p-10 rounded-2xl shadow-xl w-full max-w-md border border-white/40">

        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate("/", { state: { scrollToId: "home" } })}
          className="mb-4 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Home
        </button>

        {/* Logo & Title */}
        <div className="text-center mb-6">
          <div className="mx-auto w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <User className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mt-4">Create Your Account</h2>
          <p className="text-gray-600 text-sm mt-1">
            Join the Levavishwam Community Portal
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Full Name */}
          <div>
            <label className="text-sm font-semibold text-gray-700">Full Name</label>
            <div className="flex items-center gap-3 border rounded-xl px-4 py-3 mt-1 bg-white shadow-sm focus-within:ring-2 focus-within:ring-purple-500">
              <User className="w-5 h-5 text-purple-600" />
              <input
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full bg-transparent outline-none text-gray-800"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-semibold text-gray-700">Email</label>
            <div className="flex items-center gap-3 border rounded-xl px-4 py-3 mt-1 bg-white shadow-sm focus-within:ring-2 focus-within:ring-purple-500">
              <Mail className="w-5 h-5 text-purple-600" />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full bg-transparent outline-none text-gray-800"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-semibold text-gray-700">Password</label>
            <div className="flex items-center gap-3 border rounded-xl px-4 py-3 mt-1 bg-white shadow-sm focus-within:ring-2 focus-within:ring-purple-500">
              <Lock className="w-5 h-5 text-purple-600" />
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                className="w-full bg-transparent outline-none text-gray-800"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm font-semibold text-gray-700">Confirm Password</label>
            <div className="flex items-center gap-3 border rounded-xl px-4 py-3 mt-1 bg-white shadow-sm focus-within:ring-2 focus-within:ring-purple-500">
              <Lock className="w-5 h-5 text-purple-600" />
              <input
                type="password"
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                className="w-full bg-transparent outline-none text-gray-800"
              />
            </div>
          </div>

          {/* Messages */}
          {error && <div className="text-red-600 text-sm text-center">{error}</div>}
          {successMsg && <div className="text-green-600 text-sm text-center">{successMsg}</div>}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold shadow-md hover:shadow-lg transition active:scale-95 disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-gray-700 text-center text-sm mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 font-semibold hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
