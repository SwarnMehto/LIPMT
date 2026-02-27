import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import {
  Menu,
  X,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  Twitter,
  MessageCircle,
  Briefcase,
  Clock,
  CheckCircle2,
} from "lucide-react";

import HomePage from "./pages/HomePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import CoursesPage from "./pages/CoursesPage.jsx";
import FacilitiesPage from "./pages/FacilitiesPage.jsx";
import TestimonialsPage from "./pages/TestimonialsPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";

import CourseDetailPage from "./pages/CourseDetailPage.jsx"; // ✅ only once
import logo from "./assets/logo.png";

function cx(...a) {
  return a.filter(Boolean).join(" ");
}

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [menu, setMenu] = useState(false);

  // ✅ WhatsApp (CHANGE NUMBER HERE)
  const WHATSAPP_NUMBER = "918700116436"; // 91 + number (no +)
  const whatsappText = encodeURIComponent(
    "Hi Lal Institute of Paramedical Technology, I want details about admission."
  );
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappText}`;

  // Sticky effect (for header shadow/backdrop)
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ✅ Popup: Job Oriented Program -> after 5 sec Free Enquiry (same popup)
  const [showPopup, setShowPopup] = useState(false);
  const [popupStage, setPopupStage] = useState("program"); // "program" | "enquiry"
  const timerRef = useRef(null);
  const [popupTriggered, setPopupTriggered] = useState(false);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem("job_popup_shown");
    if (alreadyShown) return;

    const onFirstScroll = () => {
      if (popupTriggered) return;
      if (window.scrollY <= 10) return;

      setPopupTriggered(true);
      setShowPopup(true);
      setPopupStage("program");
      sessionStorage.setItem("job_popup_shown", "1");

      timerRef.current = window.setTimeout(() => {
        setPopupStage("enquiry");
      }, 5000);

      window.removeEventListener("scroll", onFirstScroll);
    };

    window.addEventListener("scroll", onFirstScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onFirstScroll);
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [popupTriggered]);

  const closePopup = () => {
    setShowPopup(false);
    if (timerRef.current) window.clearTimeout(timerRef.current);
  };

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

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* ================= WHATSAPP FLOATING (stable corner) ================= */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-[90] flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500 shadow-xl hover:bg-emerald-600"
        aria-label="Chat on WhatsApp"
        title="WhatsApp"
      >
        <MessageCircle className="h-7 w-7 text-white" />
      </a>

      {/* ================= POPUP (Job -> Free Enquiry after 5 sec) ================= */}
      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
            <button
              onClick={closePopup}
              className="absolute right-4 top-4 rounded-lg p-1 text-slate-500 hover:text-red-500"
              aria-label="Close popup"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="bg-amber-500 px-6 py-4">
              <div className="text-center text-lg font-extrabold text-slate-900">
                {popupStage === "program"
                  ? "Job Oriented Program"
                  : "Free Enquiry"}
              </div>
              <div className="mt-1 text-center text-xs font-semibold text-slate-900/80">
                Lal Institute of Paramedical Technology
              </div>
            </div>

            <div className="p-6">
              {popupStage === "program" ? (
                <div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 rounded-xl bg-sky-50 p-2">
                      <Briefcase className="h-5 w-5 text-sky-700" />
                    </div>
                    <div>
                      <div className="text-base font-extrabold text-slate-900">
                        100% Practical + Career Support
                      </div>
                      <div className="mt-1 text-sm text-slate-600">
                        Paramedical courses designed for job readiness with
                        hands-on training.
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="flex items-center gap-2 rounded-xl border border-slate-200 p-3">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                      <div className="text-sm font-semibold">
                        Industry-relevant syllabus
                      </div>
                    </div>
                    <div className="flex items-center gap-2 rounded-xl border border-slate-200 p-3">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                      <div className="text-sm font-semibold">
                        Internship / Placement help
                      </div>
                    </div>
                    <div className="flex items-center gap-2 rounded-xl border border-slate-200 p-3">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                      <div className="text-sm font-semibold">
                        Affordable fees
                      </div>
                    </div>
                    <div className="flex items-center gap-2 rounded-xl border border-slate-200 p-3">
                      <Clock className="h-5 w-5 text-sky-700" />
                      <div className="text-sm font-semibold">
                        Next: Free enquiry in 5 sec
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center gap-3">
                    <button
                      onClick={() => go("/courses")}
                      className="w-full rounded-xl bg-sky-600 px-4 py-3 text-sm font-extrabold text-white hover:bg-sky-700"
                    >
                      View Courses
                    </button>
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-center text-sm font-extrabold text-slate-900 hover:bg-slate-50"
                    >
                      WhatsApp Now
                    </a>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="text-center text-sm text-slate-600">
                    Fill details — our team will contact you soon.
                  </div>

                  <form
                    className="mt-5 space-y-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      alert("Enquiry Submitted ✅");
                      closePopup();
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500"
                      required
                    />
                    <input
                      type="tel"
                      placeholder="Mobile Number"
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500"
                      required
                    />
                    <button
                      type="submit"
                      className="w-full rounded-xl bg-sky-600 py-3 font-semibold text-white hover:bg-sky-700"
                    >
                      Submit Enquiry
                    </button>
                  </form>

                  <div className="mt-4 text-center">
                    <button
                      onClick={() => {
                        closePopup();
                        go("/contact");
                      }}
                      className="text-sm font-semibold text-sky-700 hover:underline"
                    >
                      Go to Contact Page →
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= TOP SOCIAL BAR ================= */}
      <div className="w-full bg-slate-900">
        {/* ✅ Added: flex-wrap + center on mobile */}
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center sm:justify-end gap-2 px-6 py-2">
          <a
            href="#"
            className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            aria-label="Facebook"
          >
            <Facebook className="h-4 w-4" />
          </a>
          <a
            href="#"
            className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            aria-label="Instagram"
          >
            <Instagram className="h-4 w-4" />
          </a>
          <a
            href="#"
            className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            aria-label="Twitter"
          >
            <Twitter className="h-4 w-4" />
          </a>
          <a
            href="#"
            className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            aria-label="YouTube"
          >
            <Youtube className="h-4 w-4" />
          </a>
          <a
            href="#"
            className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* ================= HEADER (sticky) ================= */}
      <header
        className={cx(
          "sticky top-0 z-50 border-b transition",
          scrolled
            ? "border-slate-200 bg-white/95 backdrop-blur shadow-sm"
            : "border-slate-200 bg-white"
        )}
      >
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Left Logo */}
            <button onClick={() => go("/")} className="flex items-center gap-4">
              <img
                src={logo}
                alt="Lal Institute of Paramedical Technology"
                className="h-20 w-20 rounded-xl object-cover"
              />
              <div className="hidden sm:block leading-tight">
                <div className="text-xs font-semibold text-slate-500">
                  Skill • Training • Career
                </div>
              </div>
            </button>

            {/* Center Title */}
            <div className="flex-1 text-center">
              <div className="text-[18px] sm:text-[28px] font-extrabold tracking-wide text-red-600 uppercase">
                Lal Institute of Paramedical Technology
              </div>
              <div className="mt-1 text-[10px] sm:text-[12px] font-semibold text-slate-600">
                An institute with a glorious past of training para-medics
              </div>
            </div>

            <div className="w-[70px] sm:w-[92px]" />
          </div>
        </div>

        <div className="border-t border-slate-200 bg-amber-500/95">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
            {/* ✅ Added: hidden on mobile (so duplicate nav wont show with hamburger) */}
            <nav className="hidden sm:flex items-center gap-4 text-[13px] font-bold text-slate-900 overflow-x-auto whitespace-nowrap max-w-[70%] sm:max-w-none">
              {nav.map((item) => (
                <button
                  key={item.path}
                  onClick={() => go(item.path)}
                  className={cx(
                    "px-2 py-1 transition hover:opacity-90",
                    isActive(item.path) ? "underline underline-offset-8" : ""
                  )}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              {/* ✅ Added: mobile-friendly size (no big circle) */}
              <button
                onClick={() => go("/contact")}
                className="rounded-full bg-white px-3 py-2 text-sm font-extrabold text-slate-900 hover:bg-white/90 sm:px-4"
              >
                Apply Now →
              </button>

              <button
                className="sm:hidden rounded-xl border border-white/30 bg-white/10 p-2 text-slate-900"
                onClick={() => setMenu(true)}
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ================= MOBILE DRAWER ================= */}
      {menu && (
        <div className="fixed inset-0 z-[60] bg-black/40">
          <div className="absolute right-0 top-0 h-full w-[80%] max-w-sm bg-white p-6">
            <div className="flex items-center justify-between">
              <div className="font-bold">Menu</div>
              <button onClick={() => setMenu(false)} aria-label="Close menu">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              {nav.map((item) => (
                <button
                  key={item.path}
                  onClick={() => go(item.path)}
                  className={cx(
                    "rounded-xl border border-slate-200 px-4 py-3 text-left font-semibold hover:bg-slate-50",
                    isActive(item.path) ? "bg-slate-50" : ""
                  )}
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

      {/* ================= ROUTES (✅ dynamic route included) ================= */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:slug" element={<CourseDetailPage />} />
        <Route path="/facilities" element={<FacilitiesPage />} />
        <Route path="/testimonials" element={<TestimonialsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route
          path="*"
          element={<div style={{ padding: 40 }}>Page Not Found</div>}
        />
      </Routes>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10 text-sm text-slate-600">
          © {new Date().getFullYear()} Lal Institute of Paramedical Technology.
          All rights reserved.
        </div>
      </footer>
    </div>
  );
}