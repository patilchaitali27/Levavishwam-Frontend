import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import NewsSection from "./components/NewsSection";
import ScrollToHash from "./components/ScrollToHash";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NewsDetails from "./pages/NewsDetails";
import EventDetails from "./pages/EventDetails";

// 🔥 IMPORT ADMIN PAGES
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import MenuManagement from "./pages/MenuManagement";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />

      <Routes>
        {/* USER ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<NewsSection />} />
        <Route path="/news/:id" element={<NewsDetails />} />
<<<<<<< Updated upstream

        <Route path="/events/:id" element={<EventDetails />} />

        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
=======
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ADMIN ROUTES */}
      <Route path="/admin" element={<AdminLayout />}>
  <Route path="dashboard" element={<AdminDashboard />} />
  <Route path="menu" element={<MenuManagement />} />  {/* KEY CHANGE */}
</Route>

>>>>>>> Stashed changes
      </Routes>
    </BrowserRouter>
  );
}
