import { useState, useEffect, useRef } from "react";
import { Menu, X, User, LogOut, Search, ChevronDown, Edit } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useMenuContext } from "../context/MenuContext"; // ⬅ Added

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();
  const { menus } = useMenuContext(); // ⬅ Dynamic menus from DB
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Convert DB path "/news" → "news"
  const convertPathToId = (path: string) =>
    path.replace("/", "").trim().toLowerCase();

  // Final dynamic nav items (only active + public)
  const dynamicNavItems = menus.map((m) => ({
    id: convertPathToId(m.path),
    label: m.title,
  }));

  const SCROLL_OFFSET = 88;

  const attemptScroll = (targetId: string) => {
    let el = document.getElementById(targetId);

    if (!el)
      el = document.querySelector(`[id*="${targetId}"]`) as HTMLElement | null;

    if (!el)
      el = document.querySelector(
        `[data-section="${targetId}"]`
      ) as HTMLElement | null;

    if (el) {
      window.scrollTo({
        top: el.offsetTop - SCROLL_OFFSET,
        behavior: "smooth",
      });
      return true;
    }
    return false;
  };

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    setIsProfileDropdownOpen(false);

    const mapping: Record<string, string> = {
      about: "information",
      contact: "contact",
    };

    const targetId = mapping[id] ?? id;

    if (location.pathname === "/") {
      attemptScroll(targetId);
      return;
    }

    navigate("/", { state: { scrollToId: targetId } });
    setTimeout(() => attemptScroll(targetId), 250);
  };

  const handleEditProfile = () => {
    setIsProfileDropdownOpen(false);
    navigate("/edit-profile");
  };

  const handleLogout = () => {
    logout();
    setIsProfileDropdownOpen(false);
    navigate("/login");
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-100"
          : "bg-white/90 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          
          {/* LEFT - LOGO */}
          <div className="flex items-center space-x-3">
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => scrollToSection("home")}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Levavishwam
                </h1>
                <p className="text-xs text-gray-500">Community Portal</p>
              </div>
            </div>
          </div>

          {/* SEARCH */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search community..."
                className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          </div>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-1">
            {dynamicNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* PROFILE + LOGIN BUTTON */}
          <div
            className="hidden lg:flex items-center gap-3"
            ref={profileDropdownRef}
          >
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() =>
                    setIsProfileDropdownOpen(!isProfileDropdownOpen)
                  }
                  className="flex items-center gap-3 pl-3 border-l border-gray-200 hover:bg-gray-50 rounded-lg p-2 transition"
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-0.5">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                      <User className="w-4 h-4 text-blue-500" />
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-900">
                      {user.name.split(" ")[0]}
                    </p>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-500 transition ${
                      isProfileDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg border rounded-xl py-2 z-50">
                    <div className="px-4 py-3 border-b">
                      <p className="text-sm font-semibold">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>

                    <button
                      onClick={handleEditProfile}
                      className="w-full flex gap-2 px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      <Edit className="w-4 h-4" /> Edit Profile
                    </button>

                    <button
                      onClick={handleLogout}
                      className="w-full flex gap-2 px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => (window.location.href = "/login")}
                className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg flex items-center gap-2"
              >
                <User className="w-4 h-4" /> Login
              </button>
            )}
          </div>

          {/* MOBILE MENU TOGGLE */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {isOpen && (
          <div className="lg:hidden pb-4 border-t mt-2 pt-4">
            <nav className="space-y-1">
              {dynamicNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="w-full text-left px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-xl"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
