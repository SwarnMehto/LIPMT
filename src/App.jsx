// src/App.jsx
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
  Phone,
  Send,
  Download,
  MapPin,
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
import AdmissionChatbot from "./components/AdmissionChatbot";
import CourseDetailPage from "./pages/CourseDetailPage.jsx";

// ✅ NEW PAGES (ADDED)
import DisclaimerPage from "./pages/DisclaimerPage.jsx";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage.jsx";
import TermsPage from "./pages/TermsPage.jsx";
import FaqsPage from "./pages/FaqsPage.jsx";

import logo from "./assets/logo.png";

function cx(...a) {
  return a.filter(Boolean).join(" ");
}

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [menu, setMenu] = useState(false);

  // ✅ WhatsApp (CHANGE NUMBER HERE)
  const WHATSAPP_NUMBER = "9198113 42520";
  const whatsappText = encodeURIComponent(
    "Hi Lal Institute of Paramedical Technology, I want details about admission."
  );
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappText}`;

  // ✅ Global Ask LIPMT Chatbot
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "Hello 👋 Welcome to LIPMT. Ask me about courses, fees, admission, eligibility, batches or contact details.",
    },
  ]);

  const quickQuestions = [
    "Fees",
    "Courses",
    "Admission",
    "Eligibility",
    "Contact",
    "Brochure",
  ];

  const chatBodyRef = useRef(null);

  const buildWhatsAppLink = (text) =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

  const onApply = () => {
    navigate("/contact");
    setOpen(false);
  };

  const botReply = (text) => {
    const q = text.toLowerCase();

    if (q.includes("fee") || q.includes("fees")) {
      return "Fees course ke according alag hoti hain. Exact fee details ke liye Contact page par enquiry bhejiye ya WhatsApp par message kariye.";
    }

    if (q.includes("course") || q.includes("courses")) {
      return "LIPMT me certificate, diploma aur degree level paramedical courses available hain. Aap Courses section me full details dekh sakte hain.";
    }

    if (q.includes("admission") || q.includes("apply")) {
      return "Admission ke liye aap Apply Now ya Contact page se enquiry submit kar sakte hain. Hamari team aapko guide karegi.";
    }

    if (q.includes("eligibility")) {
      return "Eligibility course par depend karti hai. Kuch courses 10th base par aur kuch 10+2 base par hote hain.";
    }

    if (q.includes("batch") || q.includes("timing")) {
      return "Batch timing aur new sessions ki exact details ke liye institute se direct contact karna best rahega.";
    }

    if (
      q.includes("contact") ||
      q.includes("phone") ||
      q.includes("number") ||
      q.includes("whatsapp")
    ) {
      return "Aap Contact page par institute ke phone number, address aur enquiry options dekh sakte hain. WhatsApp option bhi available hai.";
    }

    if (q.includes("location") || q.includes("address")) {
      return "Institute ka address aur map details Contact page par available hain.";
    }

    if (q.includes("brochure")) {
      return "Aap Brochure page par jaakar institute brochure dekh ya download kar sakte hain.";
    }

    return "Main aapki help courses, fees, admission, eligibility, batches, brochure aur contact details ke baare me kar sakta hoon. Aap short question pooch sakte hain.";
  };

  const handleSend = () => {
    if (!msg.trim()) return;

    const userText = msg.trim();
    const reply = botReply(userText);

    setMessages((prev) => [
      ...prev,
      { type: "user", text: userText },
      { type: "bot", text: reply },
    ]);
    setMsg("");
  };

  const handleQuickQuestion = (text) => {
    const reply = botReply(text);
    setMessages((prev) => [
      ...prev,
      { type: "user", text },
      { type: "bot", text: reply },
    ]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  // Sticky effect (for header shadow/backdrop)
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ✅ Scroll to top on every route change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname]);

  // ✅ Close menu/dropdowns/chat on route change
  useEffect(() => {
    setMenu(false);
    setOpenCourses(false);
    setOpenServices(false);
    setOpenCoursesMobile(false);
    setOpenServicesMobile(false);
    setOpen(false);
  }, [location.pathname]);

  // ✅ Auto scroll chatbot body
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, open]);

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

  // ✅ refs for click-outside close
  const coursesWrapRef = useRef(null);
  const servicesWrapRef = useRef(null);

  // ✅ Mobile submenu state
  const [openCoursesMobile, setOpenCoursesMobile] = useState(false);
  const [openServicesMobile, setOpenServicesMobile] = useState(false);

  // ✅ close dropdown when click outside (desktop)
  useEffect(() => {
    const onDown = (e) => {
      const t = e.target;
      if (coursesWrapRef.current && coursesWrapRef.current.contains(t)) return;
      if (servicesWrapRef.current && servicesWrapRef.current.contains(t)) return;
      setOpenCourses(false);
      setOpenServices(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

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

  // ✅ Hide footer on: Facilities, Testimonials, AND all Services pages (services + its subpages)
  const shouldShowFooter =
    location.pathname !== "/facilities" &&
    location.pathname !== "/testimonials" &&
    !location.pathname.startsWith("/services");

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* ✅ Styles */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        /* ✅ make ALL nav items same height/position */
        .nav-btn{
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.22);
          background: rgba(15,23,42,0.08);
          padding: 10px 14px;
          font-weight: 800;
          line-height: 1;
          display: inline-flex;
          align-items: center;
          gap: 8px;
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
        className="fixed bottom-6 right-6 z-[90] hidden h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500 shadow-xl hover:bg-emerald-600 md:flex"
        aria-label="Chat on WhatsApp"
        title="WhatsApp"
      >
        <MessageCircle className="h-7 w-7 text-white" />
      </a>

      {/* ================= GLOBAL ASK LIPMT CHATBOT ================= */}
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        className="fixed bottom-4 right-4 z-[95] flex min-h-[54px] items-center justify-center rounded-full bg-yellow-400 px-5 py-3 text-sm font-extrabold text-slate-900 shadow-[0_14px_32px_rgba(0,0,0,0.18)] transition hover:scale-[1.02] hover:bg-yellow-300 md:bottom-6 md:left-6 md:right-auto"
        aria-label="Open admission chatbot"
      >
        💬 Ask LIPMT
      </button>

      {open && (
        <div className="fixed bottom-36 left-4 right-4 z-[96] w-auto max-w-sm overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.20)] md:bottom-24 md:left-6 md:right-auto">
          {/* Header */}
          <div className="flex items-center justify-between bg-gradient-to-r from-sky-600 to-cyan-500 px-4 py-4 text-white">
            <div>
              <div className="text-sm font-extrabold">LIPMT Admission Help</div>
              <div className="text-xs text-white/90">
                Ask about courses, fees, brochure & contact
              </div>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg bg-white/10 px-2 py-1 text-sm font-bold hover:bg-white/20"
              aria-label="Close chatbot"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div
            ref={chatBodyRef}
            className="min-h-[320px] max-h-[380px] space-y-3 overflow-y-auto bg-slate-50 p-4"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={
                    m.type === "user"
                      ? "max-w-[85%] rounded-2xl rounded-br-md bg-sky-600 px-4 py-3 text-sm text-white"
                      : "max-w-[85%] rounded-2xl rounded-bl-md border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
                  }
                >
                  {m.text}
                </div>
              </div>
            ))}

            {/* Quick Questions */}
            <div className="pt-1">
              <div className="mb-2 text-xs font-semibold text-slate-500">
                Quick Questions
              </div>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => handleQuickQuestion(q)}
                    className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-sky-50 hover:text-sky-700"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-slate-200 bg-white p-3">
            {/* CTA buttons */}
            {/* <div className="mb-3 grid grid-cols-2 gap-2">
              <a
                href="tel:+9198113 42520"
                className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-sky-600 px-3 py-2 text-xs font-bold text-white hover:bg-sky-700"
              >
                <Phone className="h-4 w-4" />
                Call Now
              </a>

              <a
                href={buildWhatsAppLink(
                  "Hello LIPMT, I want admission details about courses, fees, eligibility and batches."
                )}
                target="_blank"
                rel="noreferrer"
                className="flex min-h-[44px] items-center justify-center rounded-xl bg-green-600 px-3 py-2 text-xs font-bold text-white hover:bg-green-700"
              >
                💬 WhatsApp
              </a>

              <button
                type="button"
                onClick={() => {
                  navigate("/brochure");
                  setOpen(false);
                }}
                className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-900 hover:bg-slate-50"
              >
                <Download className="h-4 w-4" />
                Brochure
              </button>

              <button
                type="button"
                onClick={() => {
                  navigate("/contact");
                  setOpen(false);
                }}
                className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-900 hover:bg-slate-50"
              >
                <MapPin className="h-4 w-4" />
                Contact
              </button>
            </div> */}

            {/* Input */}
            <div className="flex gap-2">
              <input
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about fees, course, batch..."
                className="min-h-[44px] flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-sky-400"
              />

              <button
                type="button"
                onClick={handleSend}
                className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl bg-sky-600 px-4 py-3 text-sm font-bold text-white hover:bg-sky-700"
                aria-label="Send"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>

            {/* Bottom actions */}
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={onApply}
                className="min-h-[44px] rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-900 hover:bg-slate-50"
              >
                🎓 Apply Now
              </button>

              <a
                href={buildWhatsAppLink(
                  "Hello LIPMT, I want admission details about courses, fees, eligibility and batches."
                )}
                target="_blank"
                rel="noreferrer"
                className="flex min-h-[44px] items-center justify-center rounded-xl bg-emerald-600 px-3 py-2 text-xs font-bold text-white hover:bg-emerald-700"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ================= POPUP ================= */}
      {showPopup && (
        <div className="fixed inset-0 z-[1000001] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
            <button
              onClick={closePopup}
              className="absolute right-4 top-4 rounded-lg p-1 text-slate-500 hover:text-red-500"
              aria-label="Close popup"
              type="button"
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

      {/* ================= TOP SOCIAL BAR (SCROLL AWAY) ================= */}
      <div className="w-full bg-slate-900">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-2 px-6 py-2 sm:justify-end">
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

      {/* ================= STICKY HEADER ONLY ================= */}
      <div className="sticky top-0 z-[999999]">
        {/* ================= HEADER ================= */}
        <header
          className={cx(
            "border-b transition overflow-visible",
            scrolled ? "border-slate-200 bg-white/95 backdrop-blur shadow-sm" : "border-slate-200 bg-white"
          )}
        >
          <div className="mx-auto max-w-7xl px-3 py-2 sm:px-6 sm:py-4 overflow-visible">
            <div className="flex items-center justify-between gap-2 sm:gap-4">
              <button onClick={() => go("/")} className="flex items-center gap-3 sm:gap-4" type="button">
                <img
                  src={logo}
                  alt="Lal Institute of Paramedical Technology"
                  className="h-12 w-12 rounded-xl object-cover sm:h-20 sm:w-20"
                />
                <div className="hidden leading-tight sm:block">
                  <div className="text-xs font-semibold text-slate-500">Skill • Training • Career</div>
                </div>
              </button>

              <div className="min-w-0 flex-1 text-center">
                <div className="truncate text-[11px] font-extrabold uppercase leading-[1.2] tracking-normal text-red-600 sm:text-[28px] sm:tracking-wide">
                  Lal Institute of Paramedical Technology
                </div>

                <div className="mt-1 text-[8px] font-extrabold leading-[1.25] text-slate-900 sm:text-[13px]">
                  REGD. OF DELHI GOVT. AS NO.: F/1375 • AN ISO 9001 : 2005 CERTIFIED
                </div>

                <div className="mt-1 text-[7px] font-semibold leading-[1.25] text-slate-600 sm:text-[12px]">
                  An institute with a glorious past of training para-medics
                </div>
              </div>

              <div className="w-[40px] sm:w-[92px]" />
            </div>
          </div>

          <div className="relative z-[999999] border-t border-slate-200 bg-amber-500/95 overflow-visible">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-3 py-2 sm:px-6 overflow-visible">
              <nav className="no-scrollbar hidden max-w-[70%] items-center gap-4 overflow-visible whitespace-nowrap text-[13px] font-bold text-slate-900 sm:flex sm:max-w-none">
                {nav.map((item) => {
                  if (item.isDropdown && item.dropdownKey === "courses") {
                    return (
                      <div
                        key={item.path}
                        ref={coursesWrapRef}
                        className="relative"
                        onMouseEnter={() => setOpenCourses(true)}
                        onMouseLeave={() => setOpenCourses(false)}
                      >
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setOpenCourses((v) => !v);
                            setOpenServices(false);
                          }}
                          className={cx("nav-btn", isCoursesActive() ? "ring-2 ring-white/40" : "")}
                          aria-haspopup="menu"
                          aria-expanded={openCourses}
                          type="button"
                        >
                          COURSES
                          <span className={cx("transition", openCourses ? "rotate-180" : "")}>▼</span>
                        </button>

                        <div className="absolute left-0 top-full h-3 w-full" />

                        {openCourses && (
                          <div className="absolute left-0 top-full z-[999999] mt-0 pt-2">
                            <div className="dd flex w-64 flex-col py-1">
                              <button onClick={() => go("/courses")} className="dd-item" type="button">
                                All Courses
                              </button>
                              {courseMenu.map((c) => (
                                <button
                                  key={c.path}
                                  onClick={() => go(c.path)}
                                  className="dd-item"
                                  type="button"
                                >
                                  {c.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  }

                  if (item.isDropdown && item.dropdownKey === "services") {
                    return (
                      <div
                        key={item.path}
                        ref={servicesWrapRef}
                        className="relative"
                        onMouseEnter={() => setOpenServices(true)}
                        onMouseLeave={() => setOpenServices(false)}
                      >
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setOpenServices((v) => !v);
                            setOpenCourses(false);
                          }}
                          className={cx("nav-btn", isServicesActive() ? "ring-2 ring-white/40" : "")}
                          aria-haspopup="menu"
                          aria-expanded={openServices}
                          type="button"
                        >
                          SERVICES
                          <span className={cx("transition", openServices ? "rotate-180" : "")}>▼</span>
                        </button>

                        <div className="absolute left-0 top-full h-3 w-full" />

                        {openServices && (
                          <div className="absolute left-0 top-full z-[999999] mt-0 pt-2">
                            <div className="dd flex w-72 flex-col py-1">
                              <button onClick={() => go("/services")} className="dd-item" type="button">
                                All Services
                              </button>
                              {servicesMenu.map((s) => (
                                <button
                                  key={s.path}
                                  onClick={() => go(s.path)}
                                  className="dd-item"
                                  type="button"
                                >
                                  {s.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <button
                      key={item.path}
                      onClick={() => go(item.path)}
                      className={cx("nav-btn", isActive(item.path) ? "ring-2 ring-white/40" : "")}
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
                  className="rounded-full bg-white px-3 py-2 text-[13px] font-extrabold text-slate-900 hover:bg-white/90 sm:px-4"
                  type="button"
                >
                  Apply Now →
                </button>

                <button
                  className="shrink-0 rounded-xl border border-white/30 bg-white/10 p-2 text-slate-900 sm:hidden"
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
      </div>

      {/* ================= MOBILE DRAWER ================= */}
      {menu && (
        <div className="fixed inset-0 z-[1000000] bg-black/40">
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
                          "flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-left font-semibold hover:bg-slate-50",
                          isCoursesActive() ? "bg-slate-50" : ""
                        )}
                        type="button"
                      >
                        <span>COURSES</span>
                        <span className="text-sm">{openCoursesMobile ? "−" : "+"}</span>
                      </button>

                      {openCoursesMobile && (
                        <div className="ml-3 flex flex-col gap-2">
                          <button
                            onClick={() => go("/courses")}
                            className="rounded-xl border border-slate-200 px-4 py-3 text-left font-semibold hover:bg-slate-50"
                            type="button"
                          >
                            All Courses
                          </button>
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
                          "flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-left font-semibold hover:bg-slate-50",
                          isServicesActive() ? "bg-slate-50" : ""
                        )}
                        type="button"
                      >
                        <span>SERVICES</span>
                        <span className="text-sm">{openServicesMobile ? "−" : "+"}</span>
                      </button>

                      {openServicesMobile && (
                        <div className="ml-3 flex flex-col gap-2">
                          <button
                            onClick={() => go("/services")}
                            className="rounded-xl border border-slate-200 px-4 py-3 text-left font-semibold hover:bg-slate-50"
                            type="button"
                          >
                            All Services
                          </button>
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

        {/* ✅ NEW: Footer Pages */}
        <Route path="/faqs" element={<FaqsPage />} />
        <Route path="/disclaimer" element={<DisclaimerPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsPage />} />

        <Route path="*" element={<div style={{ padding: 40 }}>Page Not Found</div>} />
      </Routes>

      {/* ================= FOOTER ================= */}
      {shouldShowFooter && (
        <footer className="border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-10 text-sm text-slate-600">
            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <div className="font-extrabold text-slate-900">LIPMT</div>
                <div className="mt-2 text-slate-600">
                  Centre 2759, Hansa Puri Road, Tri Nagar, Delhi-110035
                  <div className="text-slate-500">(Near Punjab National Bank)</div>
                </div>
                <div className="mt-3 space-y-1">
                  <div>info@lipmt.in</div>
                  <div>+91-9811343520</div>
                  <div>+91-9355342520</div>
                  <div>011-41415029</div>
                </div>
                <div className="mt-4 inline-flex items-center gap-2 rounded-2xl border border-sky-100 bg-sky-50 px-4 py-2 text-xs font-semibold text-slate-700">
                  <span className="h-2 w-2 rounded-full bg-sky-600" />
                  Office Hours: • 9:00 AM – 8:00 PM • 7 Days Working
                </div>
              </div>

              <div>
                <div className="font-extrabold text-slate-900">IMPORTANT LINKS</div>
                <div className="mt-3 grid gap-2">
                  <button onClick={() => go("/about")} className="text-left hover:underline" type="button">
                    About
                  </button>
                  <button onClick={() => go("/courses")} className="text-left hover:underline" type="button">
                    Courses
                  </button>
                  <button onClick={() => go("/facilities")} className="text-left hover:underline" type="button">
                    Facilities
                  </button>
                  <button onClick={() => go("/testimonials")} className="text-left hover:underline" type="button">
                    Testimonials
                  </button>
                  <button onClick={() => go("/contact")} className="text-left hover:underline" type="button">
                    Contact
                  </button>
                </div>
              </div>

              <div>
                <div className="font-extrabold text-slate-900">POLICIES</div>
                <div className="mt-3 grid gap-2">
                  <button onClick={() => go("/faqs")} className="text-left hover:underline" type="button">
                    FAQs
                  </button>
                  <button onClick={() => go("/disclaimer")} className="text-left hover:underline" type="button">
                    Disclaimer
                  </button>
                  <button onClick={() => go("/privacy-policy")} className="text-left hover:underline" type="button">
                    Privacy Policy
                  </button>
                  <button onClick={() => go("/terms")} className="text-left hover:underline" type="button">
                    Terms &amp; Conditions
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-slate-200 pt-6 text-xs text-slate-500">
              © {new Date().getFullYear()} Lal Institute of Paramedical Technology. All rights reserved.
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}