import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import NewsSection from "./components/NewsSection";
import ScrollToHash from "./components/ScrollToHash";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NewsDetails from "./pages/NewsDetails";
import EventDetails from "./pages/EventDetails";
import ProfileEdit from "./pages/ProfileEdit";

import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import MenuManagement from "./pages/MenuManagement";

import AdminRoute from "./routes/AdminRoute";
import UserRoute from "./routes/UserRoute";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />

      <Routes>
        {/* USER-ONLY ROUTES */}
        <Route element={<UserRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<NewsSection />} />
          <Route path="/news/:id" element={<NewsDetails />} />
          <Route path="/events/:id" element={<EventDetails />} />
        </Route>

        {/* AUTH ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/edit-profile" element={<ProfileEdit/>} />


        {/* ADMIN-ONLY ROUTES */}
        <Route path="/admin" element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="menu" element={<MenuManagement />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
