import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import HomePage from "./pages/HomePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import CoursesPage from "./pages/CoursesPage.jsx";
import FacilitiesPage from "./pages/FacilitiesPage.jsx";
import TestimonialsPage from "./pages/TestimonialsPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";

import logo from "./assets/logo.png";

function cx(...a) {
  return a.filter(Boolean).join(" ");
}

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menu, setMenu] = useState(false);

  // Sticky effect
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = [
    { label: "HOME", path: "/" },
    { label: "ABOUT", path: "/about" },
    { label: "COURSES", path: "/courses" },
    { label: "FACILITIES", path: "/facilities" },
    { label: "TESTIMONIALS", path: "/testimonials" },
    { label: "CONTACT", path: "/contact" },
  ];

  const go = (path) => {
    setMenu(false);
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      
      {/* ================= HEADER ================= */}
      <header
        className={cx(
          "sticky top-0 z-50 border-b transition",
          scrolled
            ? "border-slate-200 bg-white/90 backdrop-blur"
            : "border-transparent bg-white"
        )}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          
          {/* Logo Section */}
          <button onClick={() => go("/")} className="flex items-center gap-3">
            <img
              src={logo}
              alt="LIPMT"
              className="h-10 w-10 rounded-xl object-cover"
            />
            <div className="text-left leading-tight">
              <div className="text-sm font-extrabold">LIPMT</div>
              <div className="text-[11px] text-slate-500">
                Skill • Training • Career
              </div>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-700 md:flex">
            {nav.map((item) => (
              <button
                key={item.path}
                onClick={() => go(item.path)}
                className={cx(
                  "hover:text-sky-700",
                  location.pathname === item.path ? "text-slate-900" : ""
                )}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Buttons */}
          <div className="hidden items-center gap-3 md:flex">
            <button
              onClick={() => go("/contact")}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-50"
            >
              Admission Open
            </button>

            <button
              onClick={() => go("/contact")}
              className="rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
            >
              Apply Now
            </button>
          </div>

          {/* Mobile Menu Icon */}
          <button
            className="md:hidden rounded-xl border border-slate-200 p-2"
            onClick={() => setMenu(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* ================= MOBILE DRAWER ================= */}
      {menu && (
        <div className="fixed inset-0 z-[60] bg-black/40">
          <div className="absolute right-0 top-0 h-full w-[80%] max-w-sm bg-white p-6">
            <div className="flex items-center justify-between">
              <div className="font-bold">Menu</div>
              <button onClick={() => setMenu(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              {nav.map((item) => (
                <button
                  key={item.path}
                  onClick={() => go(item.path)}
                  className="rounded-xl border border-slate-200 px-4 py-3 text-left font-semibold hover:bg-slate-50"
                >
                  {item.label}
                </button>
              ))}

              <button
                onClick={() => go("/contact")}
                className="mt-4 rounded-xl bg-sky-600 px-4 py-3 font-semibold text-white"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= ROUTES ================= */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/facilities" element={<FacilitiesPage />} />
        <Route path="/testimonials" element={<TestimonialsPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-10 text-sm text-slate-600">
          © {new Date().getFullYear()} LIPMT. All rights reserved.
        </div>
      </footer>
    </div>
  );
}