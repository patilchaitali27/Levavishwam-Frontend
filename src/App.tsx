import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NewsSection from "./components/NewsSection";
import ScrollToHash from "./components/ScrollToHash";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NewsDetails from "./pages/NewsDetails";
import EventDetails from "./pages/EventDetails";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<NewsSection />} />
        <Route path="/news/:id" element={<NewsDetails />} />

        <Route path="/events/:id" element={<EventDetails />} />

        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}
