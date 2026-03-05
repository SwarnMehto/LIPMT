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
import ServicesPage from "./pages/ServicesPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import CoursesPage from "./pages/CoursesPage.jsx";
import FacilitiesPage from "./pages/FacilitiesPage.jsx";
import TestimonialsPage from "./pages/TestimonialsPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import BrochurePage from "./pages/BrochurePage.jsx";
import GalleryPage from "./pages/GalleryPage.jsx";
import PracticalPage from "./pages/PracticalPage.jsx";
import ClassroomPage from "./pages/ClassroomPage.jsx";

import CourseDetailPage from "./pages/CourseDetailPage.jsx";
import logo from "./assets/logo.png";

function cx(...a) {
  return a.filter(Boolean).join(" ");
}

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [menu, setMenu] = useState(false);

  // ✅ WhatsApp (CHANGE NUMBER HERE)
  const WHATSAPP_NUMBER = "918700116436";
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

  // ✅ Nav (Courses dropdown + Services dropdown)
  const nav = [
    { label: "HOME", path: "/" },
    { label: "ABOUT", path: "/about" },

    { label: "COURSES", path: "/courses", isDropdown: true, dropdownKey: "courses" },
    { label: "SERVICES", path: "/services", isDropdown: true, dropdownKey: "services" },

    { label: "FACILITIES", path: "/facilities" },
    { label: "TESTIMONIALS", path: "/testimonials" },
    { label: "BROCHURE", path: "/brochure" },
    { label: "CONTACT", path: "/contact" },
  ];

  // ✅ Dropdown items: Courses
  const courseMenu = [
    { label: "Certificate Courses", path: "/courses/certificate" },
    { label: "Diploma Courses", path: "/courses/diploma" },
    { label: "Degree Courses", path: "/courses/degree" },
  ];

  // ✅ Dropdown items: Services
  const servicesMenu = [
    { label: "Gallery & Lab Photos", path: "/services/gallery" },
    { label: "Students Practical", path: "/services/practical" },
    { label: "Classroom", path: "/services/classroom" },
    { label: "Placement", path: "/services/placement" },
  ];

  // ✅ Desktop dropdown state
  const [openCourses, setOpenCourses] = useState(false);
  const [openServices, setOpenServices] = useState(false);

  // ✅ Mobile submenu state
  const [openCoursesMobile, setOpenCoursesMobile] = useState(false);
  const [openServicesMobile, setOpenServicesMobile] = useState(false);

  // ✅ route change close dropdown
  useEffect(() => {
    setOpenCourses(false);
    setOpenServices(false);
    setOpenCoursesMobile(false);
    setOpenServicesMobile(false);
  }, [location.pathname]);

  const go = (path) => {
    setMenu(false);
    setOpenCourses(false);
    setOpenServices(false);
    setOpenCoursesMobile(false);
    setOpenServicesMobile(false);
    navigate(path);
  };

  const isActive = (path) => location.pathname === path;
  const isCoursesActive = () => location.pathname.startsWith("/courses");
  const isServicesActive = () => location.pathname.startsWith("/services");

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* ✅ Styles */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        .nav-btn{
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.22);
          background: rgba(15,23,42,0.08);
          padding: 10px 14px;
          font-weight: 800;
          line-height: 1;
        }
        .nav-btn:hover{
          background: rgba(15,23,42,0.12);
        }

        .dd{
          border-radius: 12px;
          overflow: hidden;
          background: #073763;
          border: 1px solid rgba(255,255,255,0.12);
          box-shadow: 0 18px 40px rgba(2,8,23,0.28);
        }
        .dd-item{
          width: 100%;
          display: block;
          text-align: left;
          padding: 12px 14px;
          font-weight: 700;
          font-size: 13px;
          color: #fff;
          background: transparent;
        }
        .dd-item:hover{
          background: rgba(255,255,255,0.10);
        }
      `}</style>

      {/* ================= WHATSAPP FLOATING ================= */}
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

      {/* ================= POPUP ================= */}
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
                {popupStage === "program" ? "Job Oriented Program" : "Free Enquiry"}
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
                        Paramedical courses designed for job readiness with hands-on training.
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="flex items-center gap-2 rounded-xl border border-slate-200 p-3">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                      <div className="text-sm font-semibold">Industry-relevant syllabus</div>
                    </div>
                    <div className="flex items-center gap-2 rounded-xl border border-slate-200 p-3">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                      <div className="text-sm font-semibold">Internship / Placement help</div>
                    </div>
                    <div className="flex items-center gap-2 rounded-xl border border-slate-200 p-3">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                      <div className="text-sm font-semibold">Affordable fees</div>
                    </div>
                    <div className="flex items-center gap-2 rounded-xl border border-slate-200 p-3">
                      <Clock className="h-5 w-5 text-sky-700" />
                      <div className="text-sm font-semibold">Next: Free enquiry in 5 sec</div>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center gap-3">
                    <button
                      onClick={() => go("/courses")}
                      className="w-full rounded-xl bg-sky-600 px-4 py-3 text-sm font-extrabold text-white hover:bg-sky-700"
                      type="button"
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
                      type="button"
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
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center sm:justify-end gap-2 px-6 py-2">
          <a href="#" className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20" aria-label="Facebook">
            <Facebook className="h-4 w-4" />
          </a>
          <a href="#" className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20" aria-label="Instagram">
            <Instagram className="h-4 w-4" />
          </a>
          <a href="#" className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20" aria-label="Twitter">
            <Twitter className="h-4 w-4" />
          </a>
          <a href="#" className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20" aria-label="YouTube">
            <Youtube className="h-4 w-4" />
          </a>
          <a href="#" className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20" aria-label="LinkedIn">
            <Linkedin className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* ================= HEADER (sticky) ================= */}
      <header
        className={cx(
          "sticky top-0 z-[999999] border-b transition overflow-visible",
          scrolled ? "border-slate-200 bg-white/95 backdrop-blur shadow-sm" : "border-slate-200 bg-white"
        )}
      >
        <div className="mx-auto max-w-7xl px-6 py-4 overflow-visible">
          <div className="flex items-center justify-between gap-4">
            {/* Left Logo */}
            <button onClick={() => go("/")} className="flex items-center gap-4" type="button">
              <img
                src={logo}
                alt="Lal Institute of Paramedical Technology"
                className="h-20 w-20 rounded-xl object-cover"
              />
              <div className="hidden sm:block leading-tight">
                <div className="text-xs font-semibold text-slate-500">Skill • Training • Career</div>
              </div>
            </button>

            {/* Center Title */}
            <div className="flex-1 text-center">
              <div className="text-[18px] sm:text-[28px] font-extrabold tracking-wide text-red-600 uppercase">
                Lal Institute of Paramedical Technology
              </div>

              <div className="mt-1 text-[11px] sm:text-[13px] font-extrabold text-slate-900">
                REGD. OF DELHI GOVT. AS NO.: F/1375 • AN ISO 9001 : 2005 CERTIFIED
              </div>

              <div className="mt-1 text-[10px] sm:text-[12px] font-semibold text-slate-600">
                An institute with a glorious past of training para-medics
              </div>
            </div>

            <div className="w-[70px] sm:w-[92px]" />
          </div>
        </div>

        {/* Nav bar */}
        <div className="border-t border-slate-200 bg-amber-500/95 relative z-[999999] overflow-visible">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 overflow-visible">
            {/* ✅ Desktop Nav */}
            <nav className="no-scrollbar hidden sm:flex items-center gap-4 text-[13px] font-bold text-slate-900 whitespace-nowrap max-w-[70%] sm:max-w-none overflow-visible">
              {nav.map((item) => {
                // ✅ COURSES dropdown
                if (item.isDropdown && item.dropdownKey === "courses") {
                  return (
                    <div
                      key={item.path}
                      className="relative pb-3"
                      onMouseEnter={() => setOpenCourses(true)}
                      onMouseLeave={() => setOpenCourses(false)}
                    >
                      <button
                        onClick={() => go(item.path)}
                        className={cx("nav-btn flex items-center gap-2", isCoursesActive() ? "ring-2 ring-white/40" : "")}
                        aria-haspopup="menu"
                        aria-expanded={openCourses}
                        type="button"
                      >
                        COURSES
                        <span className={cx("transition", openCourses ? "rotate-180" : "")}>▼</span>
                      </button>

                      {openCourses && (
                        <div className="absolute left-0 top-full z-[999999] mt-2">
                          <div className="dd w-64 flex flex-col py-1">
                            {courseMenu.map((c) => (
                              <button key={c.path} onClick={() => go(c.path)} className="dd-item" type="button">
                                {c.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                // ✅ SERVICES dropdown
                if (item.isDropdown && item.dropdownKey === "services") {
                  return (
                    <div
                      key={item.path}
                      className="relative pb-3"
                      onMouseEnter={() => setOpenServices(true)}
                      onMouseLeave={() => setOpenServices(false)}
                    >
                      <button
                        onClick={() => go(item.path)}
                        className={cx("nav-btn flex items-center gap-2", isServicesActive() ? "ring-2 ring-white/40" : "")}
                        aria-haspopup="menu"
                        aria-expanded={openServices}
                        type="button"
                      >
                        SERVICES
                        <span className={cx("transition", openServices ? "rotate-180" : "")}>▼</span>
                      </button>

                      {openServices && (
                        <div className="absolute left-0 top-full z-[999999] mt-2">
                          <div className="dd w-72 flex flex-col py-1">
                            {servicesMenu.map((s) => (
                              <button key={s.path} onClick={() => go(s.path)} className="dd-item" type="button">
                                {s.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                // ✅ normal links
                return (
                  <button
                    key={item.path}
                    onClick={() => go(item.path)}
                    className={cx(
                      "px-2 py-1 transition hover:opacity-90",
                      isActive(item.path) ? "underline underline-offset-8" : ""
                    )}
                    type="button"
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <button
                onClick={() => go("/contact")}
                className="rounded-full bg-white px-3 py-2 text-sm font-extrabold text-slate-900 hover:bg-white/90 sm:px-4"
                type="button"
              >
                Apply Now →
              </button>

              <button
                className="sm:hidden rounded-xl border border-white/30 bg-white/10 p-2 text-slate-900"
                onClick={() => setMenu(true)}
                aria-label="Open menu"
                type="button"
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
              <button onClick={() => setMenu(false)} aria-label="Close menu" type="button">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              {nav.map((item) => {
                if (item.isDropdown && item.dropdownKey === "courses") {
                  return (
                    <div key={item.path} className="flex flex-col gap-2">
                      <button
                        onClick={() => setOpenCoursesMobile((v) => !v)}
                        className={cx(
                          "rounded-xl border border-slate-200 px-4 py-3 text-left font-semibold hover:bg-slate-50 flex items-center justify-between",
                          isCoursesActive() ? "bg-slate-50" : ""
                        )}
                        type="button"
                      >
                        <span>COURSES</span>
                        <span className="text-sm">{openCoursesMobile ? "−" : "+"}</span>
                      </button>

                      {openCoursesMobile && (
                        <div className="ml-3 flex flex-col gap-2">
                          {courseMenu.map((c) => (
                            <button
                              key={c.path}
                              onClick={() => go(c.path)}
                              className="rounded-xl border border-slate-200 px-4 py-3 text-left font-semibold hover:bg-slate-50"
                              type="button"
                            >
                              {c.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                if (item.isDropdown && item.dropdownKey === "services") {
                  return (
                    <div key={item.path} className="flex flex-col gap-2">
                      <button
                        onClick={() => setOpenServicesMobile((v) => !v)}
                        className={cx(
                          "rounded-xl border border-slate-200 px-4 py-3 text-left font-semibold hover:bg-slate-50 flex items-center justify-between",
                          isServicesActive() ? "bg-slate-50" : ""
                        )}
                        type="button"
                      >
                        <span>SERVICES</span>
                        <span className="text-sm">{openServicesMobile ? "−" : "+"}</span>
                      </button>

                      {openServicesMobile && (
                        <div className="ml-3 flex flex-col gap-2">
                          {servicesMenu.map((s) => (
                            <button
                              key={s.path}
                              onClick={() => go(s.path)}
                              className="rounded-xl border border-slate-200 px-4 py-3 text-left font-semibold hover:bg-slate-50"
                              type="button"
                            >
                              {s.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <button
                    key={item.path}
                    onClick={() => go(item.path)}
                    className={cx(
                      "rounded-xl border border-slate-200 px-4 py-3 text-left font-semibold hover:bg-slate-50",
                      isActive(item.path) ? "bg-slate-50" : ""
                    )}
                    type="button"
                  >
                    {item.label}
                  </button>
                );
              })}

              <button
                onClick={() => go("/contact")}
                className="mt-4 rounded-xl bg-sky-600 px-4 py-3 font-semibold text-white"
                type="button"
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

        {/* Courses */}
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/certificate" element={<CoursesPage />} />
        <Route path="/courses/diploma" element={<CoursesPage />} />
        <Route path="/courses/degree" element={<CoursesPage />} />
        <Route path="/courses/:slug" element={<CourseDetailPage />} />

        {/* Services */}
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/gallery" element={<GalleryPage />} />
        <Route path="/services/practical" element={<PracticalPage />} />
        <Route path="/services/classroom" element={<ClassroomPage />} />
        <Route path="/services/placement" element={<ServicesPage />} />

        {/* Others */}
        <Route path="/facilities" element={<FacilitiesPage />} />
        <Route path="/testimonials" element={<TestimonialsPage />} />
        <Route path="/brochure" element={<BrochurePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<div style={{ padding: 40 }}>Page Not Found</div>} />
      </Routes>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10 text-sm text-slate-600">
          © {new Date().getFullYear()} Lal Institute of Paramedical Technology. All rights reserved.
        </div>
      </footer>
    </div>
  );
}