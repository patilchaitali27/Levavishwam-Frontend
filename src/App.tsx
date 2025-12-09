import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NewsSection from "./components/NewsSection";
import NewsDetailsPage from "./pages/NewsDetailsPage";
import ScrollToHash from "./components/ScrollToHash";
import EventDetailsPage from "./pages/EventDetailsPage";


export default function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/news" element={<NewsSection />} />
        <Route path="/news/:id" element={<NewsDetailsPage />} />
        <Route path="/events/:id" element={<EventDetailsPage />} />
        
      </Routes>
    </BrowserRouter>
  );
}
