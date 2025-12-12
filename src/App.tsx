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
import NewsManagement from "./pages/Admin/NewsManagement";
import EventManagement from "./pages/Admin/EventManagement";
import CommitteeManagement from "./pages/Admin/CommitteeManagement";
import DownloadsManagement from "./pages/Admin/DownloadsManagement";
import UserApproval from "./pages/Admin/UserApproval";
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
        <Route path="/profile" element={<ProfileEdit/>} />


        {/* ADMIN-ONLY ROUTES */}
        <Route path="/admin" element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="menu" element={<MenuManagement />} />
            <Route path="news" element={<NewsManagement />} />
            <Route path="events" element={<EventManagement />} />
            <Route path="committee" element={<CommitteeManagement />} />
            <Route path="downloads" element={<DownloadsManagement />} />
            <Route path="user-approvals" element={<UserApproval />} />


          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
