// import { useState } from "react";
// import { Mail, Phone, User, Image, Lock, Calendar, MapPin, Users } from "lucide-react";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// export default function Signup() {
//   const { signup } = useAuth();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     mobile: "",
//     address: "",
//     dob: "",
//     gender: "",
//     communityInfo: "",
//     profilePhoto: "",
//     password: ""
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [successMsg, setSuccessMsg] = useState<string | null>(null);

//   const handleChange = (e: any) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();
//     setError(null);
//     setSuccessMsg(null);
//     setLoading(true);

//     // transform DOB to Date if needed - backend expects DateTime; string usually fine
//     const payload = {
//       ...formData,
//       dob: formData.dob ? new Date(formData.dob) : null
//     };

//     const resp = await signup(payload);
//     setLoading(false);
//     if (resp.success) {
//       setSuccessMsg(resp.message || "Signup successful. Please login.");
//       // wait briefly then redirect or immediately redirect
//       setTimeout(() => navigate("/login"), 800);
//     } else {
//       setError(resp.message || "Signup failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
//       <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-xl">
//         <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">Create Your Account</h2>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           {/* Name */}
//           <div>
//             <label className="text-sm font-semibold text-gray-600">Full Name</label>
//             <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
//               <User className="w-5 h-5 text-blue-500" />
//               <input name="name" required onChange={handleChange} placeholder="Enter your full name" className="w-full outline-none" />
//             </div>
//           </div>

//           {/* Email */}
//           <div>
//             <label className="text-sm font-semibold text-gray-600">Email</label>
//             <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
//               <Mail className="w-5 h-5 text-blue-500" />
//               <input type="email" name="email" required onChange={handleChange} placeholder="Enter your email" className="w-full outline-none" />
//             </div>
//           </div>

//           {/* Mobile */}
//           <div>
//             <label className="text-sm font-semibold text-gray-600">Mobile Number</label>
//             <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
//               <Phone className="w-5 h-5 text-blue-500" />
//               <input name="mobile" required onChange={handleChange} placeholder="Enter mobile number" className="w-full outline-none" />
//             </div>
//           </div>

//           {/* Address */}
//           <div>
//             <label className="text-sm font-semibold text-gray-600">Address</label>
//             <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
//               <MapPin className="w-5 h-5 text-blue-500" />
//               <input name="address" required onChange={handleChange} placeholder="Your address" className="w-full outline-none" />
//             </div>
//           </div>

//           {/* DOB */}
//           <div>
//             <label className="text-sm font-semibold text-gray-600">Date of Birth</label>
//             <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
//               <Calendar className="w-5 h-5 text-blue-500" />
//               <input type="date" name="dob" required onChange={handleChange} className="w-full outline-none" />
//             </div>
//           </div>

//           {/* Gender */}
//           <div>
//             <label className="text-sm font-semibold text-gray-600">Gender</label>
//             <select name="gender" required onChange={handleChange} className="w-full border rounded-lg px-3 py-2">
//               <option value="">Select your gender</option>
//               <option>Male</option>
//               <option>Female</option>
//               <option>Other</option>
//             </select>
//           </div>

//           {/* CommunityInfo */}
//           <div>
//             <label className="text-sm font-semibold text-gray-600">Community Info</label>
//             <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
//               <Users className="w-5 h-5 text-blue-500" />
//               <input name="communityInfo" required onChange={handleChange} placeholder="Community or background" className="w-full outline-none" />
//             </div>
//           </div>

//           {/* Profile Photo */}
//           <div>
//             <label className="text-sm font-semibold text-gray-600">Profile Photo URL</label>
//             <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
//               <Image className="w-5 h-5 text-blue-500" />
//               <input name="profilePhoto" required onChange={handleChange} placeholder="Paste image link" className="w-full outline-none" />
//             </div>
//           </div>

//           {/* Password */}
//           <div>
//             <label className="text-sm font-semibold text-gray-600">Password</label>
//             <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
//               <Lock className="w-5 h-5 text-blue-500" />
//               <input type="password" name="password" required onChange={handleChange} placeholder="Create a password" className="w-full outline-none" />
//             </div>
//           </div>

//           {error && <div className="text-red-600 text-sm">{error}</div>}
//           {successMsg && <div className="text-green-600 text-sm">{successMsg}</div>}

//           {/* Submit Button */}
//           <button type="submit" disabled={loading} className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-60">
//             {loading ? "Creating account..." : "Create Account"}
//           </button>
//         </form>

//         <p className="text-gray-600 text-center text-sm mt-4">
//           Already have an account?{" "}
//           <a href="/login" className="text-blue-600 font-semibold hover:underline">Login</a>
//         </p>
//       </div>
//     </div>
//   );
// }
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

  const payload = {
    name: formData.name,
    email: formData.email,
    password: formData.password,
    confirmPassword: formData.confirmPassword
  };

  const resp = await signup(payload);
  setLoading(false);

  if (resp.success) {
    setSuccessMsg(resp.message || "Signup successful. Please login.");
    setTimeout(() => navigate("/login"), 800);
  } else {
    setError(resp.message || "Signup failed");
  }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <button
          type="button"
          onClick={() => navigate("/", { state: { scrollToId: "home" } })}
          className="mb-4 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Dashboard
        </button>
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="text-sm font-semibold text-gray-600">Full Name</label>
            <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
              <User className="w-5 h-5 text-blue-500" />
              <input
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full outline-none"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-semibold text-gray-600">Email</label>
            <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
              <Mail className="w-5 h-5 text-blue-500" />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-semibold text-gray-600">Password</label>
            <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
              <Lock className="w-5 h-5 text-blue-500" />
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                className="w-full outline-none"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm font-semibold text-gray-600">
              Confirm Password
            </label>
            <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
              <Lock className="w-5 h-5 text-blue-500" />
              <input
                type="password"
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                className="w-full outline-none"
              />
            </div>
          </div>

          {/* Messages */}
          {error && <div className="text-red-600 text-sm">{error}</div>}
          {successMsg && <div className="text-green-600 text-sm">{successMsg}</div>}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="text-gray-600 text-center text-sm mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 font-semibold hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
