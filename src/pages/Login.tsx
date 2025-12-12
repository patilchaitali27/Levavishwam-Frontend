import { useState } from "react";
import { Mail, Lock, ChevronLeft, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const email = formData.email.trim();
    const password = formData.password.trim();

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      return "Email is required";
    }
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }

    // Password validation
    if (!password) {
      return "Password is required";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters long";
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Run validation
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    const resp = await login(
      formData.email.trim(),
      formData.password.trim()
    );
    setLoading(false);

    if (resp.success) {
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      if (user.role?.toLowerCase() === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/", { state: { scrollToId: "home" } });
      }
    } else {
      setError(resp.message || "Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 px-6">

      <div className="relative bg-white/70 backdrop-blur-xl p-10 rounded-2xl shadow-xl w-full max-w-md border border-white/40">

        {/* Back button */}
        <button
          onClick={() => navigate("/", { state: { scrollToId: "home" } })}
          className="mb-4 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Home
        </button>

        {/* Logo + Title */}
        <div className="text-center mb-6">
          <div className="mx-auto w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <User className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mt-4">Welcome Back</h2>
          <p className="text-gray-600 text-sm mt-1">
            Login to continue to Levavishwam Portal
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="text-sm font-semibold text-gray-700">Email</label>
            <div className="flex items-center gap-3 border rounded-xl px-4 py-3 mt-1 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
              <Mail className="w-5 h-5 text-blue-600" />
              <input
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full bg-transparent outline-none text-gray-800"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">Password</label>
            <div className="flex items-center gap-3 border rounded-xl px-4 py-3 mt-1 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
              <Lock className="w-5 h-5 text-blue-600" />
              <input
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full bg-transparent outline-none text-gray-800"
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="text-red-600 text-sm text-center mt-1 font-medium">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-md hover:shadow-lg transition active:scale-95 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Signup Link */}
        <p className="text-gray-700 text-center text-sm mt-6">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="text-blue-600 font-semibold hover:underline"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
