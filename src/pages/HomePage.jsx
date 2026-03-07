// src/pages/HomePage.jsx
// ✅ Premium animated homepage (blue theme) + TRUST sections + MOBILE friendly
// ✅ No header/footer here (App.jsx handles it)
// ✅ Added: sticky mobile bottom bar (Call / WhatsApp / Apply)
// ✅ Added: Trust proof strip, Google reviews CTA, Placement partners, FAQs
// ✅ Added: SEO trust blocks + internal links + improved schema
// ✅ Kept your existing logic & sections (no breaking)

import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { Hospital, Microscope, ScanLine, Stethoscope } from "lucide-react";

// ✅ Assets
import logo from "../assets/logo.png";
import slide1 from "../assets/slide1.png";
import slide2 from "../assets/slide2.png";
import slide3 from "../assets/slide3.png";
import slide4 from "../assets/slide4.png";
import slide5 from "../assets/slide5.png";

// ✅ NEW assets (as per your folder)
import bestMedical from "../assets/best_medical.png";
import coverImg from "../assets/cover.png"; // ✅ REGD banner image
import heroImg from "../assets/hero.png";
import heroImg1 from "../assets/hero1.png";
import heroImg2 from "../assets/hero2.png";
import trustImg from "../assets/trust.png";
import trust1 from "../assets/trust1.png";
import trust2 from "../assets/trust2.png";
import trust3 from "../assets/trust3.png";

// ✅ Course images (make sure these exist in src/assets/courses/)
import dmltImg from "../assets/courses/dmlt.png";
import ottImg from "../assets/courses/ott.png";
import radiologyImg from "../assets/courses/radiology.png";
import ecgImg from "../assets/courses/ecg.png";
import dialysisImg from "../assets/courses/dialysis.png";
import dentalImg from "../assets/courses/dental.png";

function cx(...a) {
  return a.filter(Boolean).join(" ");
}

function Container({ children, className = "" }) {
  return (
    <div className={cx("mx-auto w-full max-w-6xl px-4 md:px-6", className)}>
      {children}
    </div>
  );
}

function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-sky-200/60 bg-white/70 px-3 py-1 text-xs font-semibold text-sky-700 backdrop-blur">
      {children}
    </span>
  );
}

function PrimaryBtn({ children, onClick, className = "", type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cx(
        "min-h-[44px] rounded-xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-sky-600/20 transition hover:bg-sky-700 active:scale-[0.99]",
        className
      )}
    >
      {children}
    </button>
  );
}

function GhostBtn({ children, onClick, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        "min-h-[44px] rounded-xl border border-white/40 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20 active:scale-[0.99]",
        className
      )}
    >
      {children}
    </button>
  );
}

function Card({ children, className = "" }) {
  return (
    <div
      className={cx(
        "rounded-2xl border border-slate-200/60 bg-white shadow-sm shadow-slate-200/60",
        className
      )}
    >
      {children}
    </div>
  );
}

function SectionTitle({ kicker, title, desc, align = "left" }) {
  return (
    <div className={cx("max-w-2xl", align === "center" ? "mx-auto text-center" : "")}>
      {kicker ? <Badge>{kicker}</Badge> : null}
      <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
        {title}
      </h2>
      {desc ? (
        <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">{desc}</p>
      ) : null}
    </div>
  );
}

/* ✅ FIX: Mobile par 0 na dikhaye — inView reliable + fallback start */
function CountUp({ to = 100, suffix = "+", duration = 1.4 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const mv = useMotionValue(0);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const unsub = mv.on("change", (v) => setVal(Math.round(v)));
    return () => unsub();
  }, [mv]);

  useEffect(() => {
    let controls;

    const start = () => {
      controls = animate(mv, to, { duration, ease: "easeOut" });
    };

    if (inView) start();

    const t = setTimeout(() => {
      if (!inView && val === 0) start();
    }, 600);

    return () => {
      clearTimeout(t);
      controls?.stop?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, mv, to, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {val}
      {suffix}
    </span>
  );
}

function Modal({ open, onClose, title, children }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose?.();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1000001]">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 14, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl"
        >
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <div className="text-base font-bold text-slate-900">{title}</div>
            <button
              className="rounded-lg px-2 py-1 text-slate-500 hover:bg-slate-100"
              onClick={onClose}
              aria-label="Close"
              type="button"
            >
              ✕
            </button>
          </div>
          <div className="p-5">{children}</div>
        </motion.div>
      </div>
    </div>
  );
}

/* ✅ NEW: FAQ (trust booster) */
function FAQ({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="mt-8 grid gap-3">
      {items.map((it, idx) => {
        const isOpen = open === idx;
        return (
          <button
            key={it.q}
            type="button"
            onClick={() => setOpen(isOpen ? -1 : idx)}
            className="rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:bg-slate-50"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="text-sm font-extrabold text-slate-900">{it.q}</div>
              <div className="text-slate-500">{isOpen ? "−" : "+"}</div>
            </div>
            {isOpen && <div className="mt-2 text-sm text-slate-600">{it.a}</div>}
          </button>
        );
      })}
    </div>
  );
}

/* ✅ NEW: Mobile bottom sticky bar */
function MobileStickyBar({ onApply, phone = "+919811343520", wa = "919811343520" }) {
  const msg = encodeURIComponent("Hello LIPMT, I want admission details (fees, batches & process).");
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[90] border-t border-slate-200 bg-white/95 backdrop-blur shadow-[0_-6px_20px_rgba(15,23,42,0.06)] md:hidden">
      <div className="mx-auto grid max-w-6xl grid-cols-3 gap-2 px-2 py-2">
        <a
          href={`tel:${phone}`}
          className="flex min-h-[42px] items-center justify-center rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm font-extrabold text-slate-900"
          aria-label="Call LIPMT"
        >
          📞 Call
        </a>
        <a
          href={`https://wa.me/${wa}?text=${msg}`}
          target="_blank"
          rel="noreferrer"
          className="flex min-h-[46px] items-center justify-center rounded-2xl bg-green-600 px-3 py-2 text-sm font-extrabold text-white"
          aria-label="Chat on WhatsApp"
        >
          💬 WhatsApp
        </a>
        <button
          type="button"
          onClick={onApply}
          className="min-h-[46px] rounded-2xl bg-sky-600 px-3 py-2 text-sm font-extrabold text-white"
          aria-label="Apply for admission"
        >
          ✅ Apply
        </button>
      </div>
    </div>
  );
}

function AdmissionChatbot({
  onApply,
  phone = "919811343520",
  instituteName = "LAL INSTITUTE OF PARA MEDICAL TECHNOLOGY",
}) {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: `Hello 👋 Welcome to ${instituteName}. Ask me about courses, fees, eligibility, batches, admission or contact details.`,
    },
  ]);

  const whatsappLink = (text) =>
    `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

  const botReply = (input) => {
    const m = input.toLowerCase().trim();

    if (!m) {
      return "Please type your question.";
    }

    if (
      m.includes("fee") ||
      m.includes("fees") ||
      m.includes("price") ||
      m.includes("cost")
    ) {
      return "Fees course-wise different hoti hai. Exact fee details ke liye Apply kare ya WhatsApp par message kare.";
    }

    if (
      m.includes("course") ||
      m.includes("courses") ||
      m.includes("program") ||
      m.includes("dmlt") ||
      m.includes("ecg") ||
      m.includes("radiology") ||
      m.includes("dialysis") ||
      m.includes("ott") ||
      m.includes("dental")
    ) {
      return "Available popular courses: DMLT, Operation Theatre Technology, Radiology, ECG Technology, Dialysis Technology, Dental Technology. Detailed list ke liye Courses section dekhein.";
    }

    if (
      m.includes("admission") ||
      m.includes("apply") ||
      m.includes("enroll") ||
      m.includes("enrol")
    ) {
      return "Admissions open hain ✅ Aap Apply button par click karke form fill kar sakte hain ya WhatsApp par direct enquiry bhej sakte hain.";
    }

    if (
      m.includes("eligibility") ||
      m.includes("qualification") ||
      m.includes("12th") ||
      m.includes("10th")
    ) {
      return "Eligibility course par depend karti hai. Generally diploma courses ke liye 10+2 preferred hota hai. Exact eligibility ke liye specific course ka naam bhejein.";
    }

    if (
      m.includes("batch") ||
      m.includes("timing") ||
      m.includes("class") ||
      m.includes("start")
    ) {
      return "Batch timing aur start date seat availability par depend karti hai. Latest batch details ke liye admission team se contact karein.";
    }

    if (
      m.includes("placement") ||
      m.includes("job") ||
      m.includes("career")
    ) {
      return "Institute practical training, interview guidance aur career support provide karta hai. Final placement student performance aur openings par depend karta hai.";
    }

    if (
      m.includes("contact") ||
      m.includes("phone") ||
      m.includes("number") ||
      m.includes("call")
    ) {
      return "Admission helpline: +91 9811343520. Aap Call ya WhatsApp dono kar sakte hain.";
    }

    if (
      m.includes("address") ||
      m.includes("location") ||
      m.includes("where") ||
      m.includes("map")
    ) {
      return "Institute location details ke liye Contact section aur Google Map dekh sakte hain. Chahein to main aapko WhatsApp enquiry bhi open karwa deta hoon.";
    }

    if (
      m.includes("brochure") ||
      m.includes("pdf") ||
      m.includes("prospectus")
    ) {
      return "Brochure homepage se download ki ja sakti hai. Download Brochure button par click karein.";
    }

    if (
      m.includes("hello") ||
      m.includes("hi") ||
      m.includes("hii") ||
      m.includes("namaste")
    ) {
      return "Namaste 👋 Aap course, fees, admission, eligibility, batch ya contact ke baare me pooch sakte hain.";
    }

    return "Is question ke liye best rahega ki aap admission team se WhatsApp par baat karein. Main aapko direct connect kar deta hoon.";
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

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <>
      {open && (
        <div className="fixed bottom-40 left-4 z-[96] w-[92vw] max-w-sm overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.20)] md:bottom-24 md:left-6">
          <div className="flex items-center justify-between bg-gradient-to-r from-sky-600 to-cyan-500 px-4 py-4 text-white">
            <div>
              <div className="text-sm font-extrabold">LIPMT Admission Help</div>
              <div className="text-xs text-white/90">Online now</div>
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

          <div className="h-72 space-y-3 overflow-y-auto bg-slate-50 p-4">
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
          </div>

          <div className="border-t border-slate-200 bg-white p-3">
            <div className="mb-3 flex flex-wrap gap-2">
              {["Fees", "Courses", "Admission", "Eligibility", "Contact"].map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => {
                    const reply = botReply(q);
                    setMessages((prev) => [
                      ...prev,
                      { type: "user", text: q },
                      { type: "bot", text: reply },
                    ]);
                  }}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-sky-50 hover:text-sky-700"
                >
                  {q}
                </button>
              ))}
            </div>

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
                className="min-h-[44px] rounded-xl bg-sky-600 px-4 py-3 text-sm font-bold text-white hover:bg-sky-700"
              >
                Send
              </button>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={onApply}
                className="min-h-[44px] rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-900 hover:bg-slate-50"
              >
                🎓 Apply Now
              </button>

              <a
                href={whatsappLink(
                  "Hello LIPMT, I want admission details about courses, fees, eligibility and batches."
                )}
                target="_blank"
                rel="noreferrer"
                className="flex min-h-[44px] items-center justify-center rounded-xl bg-green-600 px-3 py-2 text-xs font-bold text-white hover:bg-green-700"
              >
                💬 WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function HomePage() {
  const instituteName = "LAL INSTITUTE OF PARA MEDICAL TECHNOLOGY";

  // ✅ Apps Script Web App URL
  const WEB_APP_URL =
    "https://script.google.com/macros/s/AKfycbzglTlOE7xVwMmbzEuj8AcMUYYu9ZfRR_xwhczcvx-Rame0u5macQZzhfE3CSlOsH2i/exec";

  const heroSlides = useMemo(
    () => [
      {
        src: slide1,
        title: "Career Support",
        subtitle: "Placement assistance, interview prep, and professional guidance.",
      },
      {
        src: slide2,
        title: "Modern Laboratories",
        subtitle: "Hands-on training with updated equipment & practical learning.",
      },
      {
        src: slide3,
        title: "Clinical Exposure",
        subtitle: "Hospital training & real-world skills for job readiness.",
      },
      {
        src: slide4,
        title: "Expert Faculty",
        subtitle: "Guidance from experienced teachers focused on results.",
      },
      {
        src: slide5,
        title: "Admissions Open",
        subtitle: "Apply now for the new session — limited seats available.",
      },
    ],
    []
  );

  const [slide, setSlide] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % heroSlides.length), 5000);
    return () => clearInterval(t);
  }, [heroSlides.length]);

  const [enrollOpen, setEnrollOpen] = useState(false);

  const go = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // ✅ Programs + Image (ONLY main 6 courses)
  const programs = [
    { name: "Diploma in Medical Lab Technology (DMLT)", duration: "2 Years", image: dmltImg },
    { name: "Diploma in Operation Theatre Technology (OTT)", duration: "2 Years", image: ottImg },
    { name: "Diploma in Radiology Technology", duration: "2 Years", image: radiologyImg },
    { name: "Diploma in ECG Technology", duration: "1 Year", image: ecgImg },
    { name: "Diploma in Dialysis Technology", duration: "2 Years", image: dialysisImg },
    { name: "Diploma in Dental Technology", duration: "2 Years", image: dentalImg },
  ];

  const features = [
    { title: "Hospital Training", desc: "Clinical exposure & internship support.", icon: "🏥" },
    { title: "Modern Labs", desc: "Practical sessions & updated equipment.", icon: "🧪" },
    { title: "Experienced Faculty", desc: "Strong fundamentals + exam support.", icon: "👨‍🏫" },
    { title: "Placement Assistance", desc: "Guidance for interviews & jobs.", icon: "💼" },
  ];

  const testimonials = [
    { name: "Student", role: "DMLT", quote: "Lab practicals helped me gain confidence." },
    { name: "Student", role: "OTT", quote: "Great training environment and support." },
    { name: "Student", role: "Radiology", quote: "Faculty is supportive and structured." },
  ];

  const mapSrc =
    "https://www.google.com/maps?q=LAL%20INSTITUTE%20OF%20PARA%20MEDICAL%20TECHNOLOGY&output=embed";

  const slideData = heroSlides[slide];

  // ✅ Form state
  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    course: "",
    otherCourse: "",
    message: "",
  });

  // ✅ Hero quick highlights
  const heroHighlights = [
    "100% Practical Training",
    "Experienced Faculty",
    "Modern Laboratory Setup",
    "Placement Guidance Support",
  ];

  // ✅ Why Choose Us
  const whyChoose = [
    {
      title: "Practical Skill Training",
      desc: "Hands-on sessions with updated instruments and proper supervision.",
      icon: "✅",
    },
    {
      title: "Clinical Exposure",
      desc: "Hospital workflow understanding, documentation & patient handling basics.",
      icon: "🏥",
    },
    {
      title: "Exam + Career Guidance",
      desc: "Structured notes, doubt sessions, and interview preparation support.",
      icon: "📘",
    },
    {
      title: "Admission Support",
      desc: "Fees, eligibility, documents & batch timing guidance for students.",
      icon: "📞",
    },
  ];

  // ✅ Placement section list
  const placementPoints = [
    "Hospital / Diagnostic center internship guidance",
    "Resume + interview preparation support",
    "Career guidance for job-ready skills",
    "Continuous student support & mentorship",
  ];

  // ✅ Trust proof strip (ADD)
  const trustProofs = [
    { k: "REGD / ISO", v: "Verified institute details" },
    { k: "Practical Labs", v: "Hands-on training" },
    { k: "Guidance", v: "Admission + career support" },
    { k: "Support", v: "Quick response on WhatsApp" },
  ];

  // ✅ FAQs (ADD)
  const faqs = [
    {
      q: "क्या fees / eligibility details WhatsApp पर mil jayegi?",
      a: "Yes. Enquiry form submit करने के बाद आप WhatsApp पर bhi details le sakte hain (fees, batches, documents).",
    },
    {
      q: "Internship / hospital training milega?",
      a: "We provide clinical exposure guidance + practical workflow training. Internship support availability batch-wise depend kar sakti hai.",
    },
    {
      q: "Documents kaun-kaun se lagenge?",
      a: "10th/12th marksheet, ID proof, photos, and admission form. Exact list admissions team confirm karegi.",
    },
    {
      q: "Classes kab se start hongi?",
      a: "Batch timing seat availability ke hisaab se. Apply/Callback par team aapko next batch date bata degi.",
    },
  ];

  // ✅ Extra trust cards
  const trustCards = [
    {
      title: "Trusted Learning Environment",
      desc: "Students get structured training, practical exposure and direct admission guidance.",
    },
    {
      title: "Focused on Job Readiness",
      desc: "Our approach is based on practical skills, confidence building and career support.",
    },
    {
      title: "Easy Student Support",
      desc: "Call, WhatsApp and admission help available for course, fee and batch queries.",
    },
  ];

  // ✅✅✅ SEO ADD
  const siteUrl = "https://lipmt.in";
  const pageUrl = `${siteUrl}/`;
  const phone = "+919811343520";
  const logoUrl = `${siteUrl}/logo.png`;

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "LocalBusiness"],
    "@id": `${siteUrl}/#organization`,
    name: instituteName,
    url: siteUrl,
    telephone: phone,
    image: logoUrl,
    logo: logoUrl,
    areaServed: "India",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Centre 2759, Hansa Puri Road, Tri Nagar",
      addressLocality: "Delhi",
      postalCode: "110035",
      addressCountry: "IN",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: phone,
        contactType: "admissions",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi"],
      },
    ],
    sameAs: [`${siteUrl}/about`, `${siteUrl}/courses`, `${siteUrl}/contact`],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: instituteName,
    publisher: { "@id": `${siteUrl}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/?s={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const webpageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: `${instituteName} | Paramedical Courses & Admissions`,
    isPartOf: { "@id": `${siteUrl}/#website` },
    about: { "@id": `${siteUrl}/#organization` },
    primaryImageOfPage: logoUrl,
    description:
      "LIPMT offers paramedical diploma courses, practical labs, admission guidance, student support and career-focused training in Delhi.",
  };

  return (
    <div className="bg-slate-50 pb-16 text-slate-900 md:pb-0">
      {/* ✅✅✅ SEO ADD: Schema JSON-LD */}
      <script type="application/ld+json">{JSON.stringify(orgSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(webpageSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>

      {/* ✅ Mobile sticky bar */}
      <AdmissionChatbot
        onApply={() => setEnrollOpen(true)}
        phone="919811343520"
        instituteName={instituteName}
      />

      {/* ===== HERO ===== */}
      <section id="home" className="relative overflow-hidden">
        <div className="relative h-[540px] w-full sm:h-[600px] md:h-[660px] lg:h-[700px]">
          <motion.img
            key={slideData.src}
            src={slideData.src}
            alt={`${slideData.title} - LIPMT`}
            className="absolute inset-0 h-full w-full object-cover object-center"
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />

          <div className="absolute inset-0 bg-slate-950/45" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-950/45 to-sky-950/20" />

          <div className="absolute inset-0">
            <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(to_right,rgba(255,255,255,0.22)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.22)_1px,transparent_1px)] [background-size:40px_40px]" />
            <div className="absolute -left-40 top-20 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl" />
            <div className="absolute -right-40 bottom-10 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
          </div>

          <Container className="relative z-10 flex h-full items-center">
            <div className="w-full max-w-3xl pt-10 sm:pt-12 md:pt-0">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="text-white"
              >
                <Badge>Admissions Open • 2026–27</Badge>

                <h1 className="mt-5 max-w-2xl text-[34px] font-extrabold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                  {slideData.title}
                  <span className="text-sky-300">.</span>
                </h1>

                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base md:text-lg">
                  {slideData.subtitle}
                </p>

                <div className="mt-6 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2">
                  {heroHighlights.map((t) => (
                    <div
                      key={t}
                      className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white/90 backdrop-blur"
                    >
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300">
                        ✔
                      </span>
                      <span className="font-semibold">{t}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                  <PrimaryBtn onClick={() => setEnrollOpen(true)} className="rounded-2xl px-6">
                    Enroll / Apply
                  </PrimaryBtn>

                  <GhostBtn onClick={() => go("courses")} className="rounded-2xl px-6">
                    Explore Courses
                  </GhostBtn>

                  <GhostBtn onClick={() => go("contact")} className="rounded-2xl px-6">
                    Get Callback
                  </GhostBtn>

                  <a
                    href="/brochure.pdf"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Download brochure"
                    className="inline-flex min-h-[44px] items-center justify-center rounded-2xl border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20 active:scale-[0.99]"
                  >
                    Download Brochure
                  </a>
                </div>

                <div className="mt-8 grid max-w-3xl grid-cols-2 gap-3 md:grid-cols-4">
                  <div className="rounded-3xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                    <div className="text-2xl font-extrabold sm:text-3xl">
                      <CountUp to={10} suffix="+" />
                    </div>
                    <div className="mt-1 text-xs text-white/70">Years Experience</div>
                  </div>
                  <div className="rounded-3xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                    <div className="text-2xl font-extrabold sm:text-3xl">
                      <CountUp to={12} suffix="+" />
                    </div>
                    <div className="mt-1 text-xs text-white/70">Labs & Units</div>
                  </div>
                  <div className="rounded-3xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                    <div className="text-2xl font-extrabold sm:text-3xl">
                      <CountUp to={25} suffix="+" />
                    </div>
                    <div className="mt-1 text-xs text-white/70">Courses / Modules</div>
                  </div>
                  <div className="rounded-3xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                    <div className="text-2xl font-extrabold sm:text-3xl">
                      <CountUp to={100} suffix="%" />
                    </div>
                    <div className="mt-1 text-xs text-white/70">Guidance Support</div>
                  </div>
                </div>

                {/* <div className="mt-6 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2">
                  {trustProofs.map((t) => (
                    <div
                      key={t.k}
                      className="rounded-2xl border border-white/15 bg-white/10 px-4 py-4 backdrop-blur"
                    >
                      <div className="text-sm font-extrabold text-white">{t.k}</div>
                      <div className="mt-1 text-sm text-white/80">{t.v}</div>
                    </div>
                  ))}
                </div> */}
              </motion.div>
            </div>
          </Container>

          <div className="absolute bottom-[94px] left-0 right-0 sm:bottom-[100px] md:bottom-8">
            <Container className="flex items-center justify-between">
              <div className="flex gap-2">
                {heroSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSlide(i)}
                    className={cx(
                      "h-2.5 w-8 rounded-full transition",
                      i === slide ? "bg-white" : "bg-white/35 hover:bg-white/60"
                    )}
                    aria-label={`Slide ${i + 1}`}
                    type="button"
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSlide((s) => (s - 1 + heroSlides.length) % heroSlides.length)}
                  className="rounded-2xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur hover:bg-white/20"
                  aria-label="Previous slide"
                  type="button"
                >
                  ←
                </button>
                <button
                  onClick={() => setSlide((s) => (s + 1) % heroSlides.length)}
                  className="rounded-2xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur hover:bg-white/20"
                  aria-label="Next slide"
                  type="button"
                >
                  →
                </button>
              </div>
            </Container>
          </div>
        </div>
      </section>

      {/* ===== ADMISSION BANNER ===== */}
      <section className="bg-gradient-to-r from-sky-600 to-cyan-500 py-4 text-center text-white">
        <Container>
          <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
            <div className="text-sm font-extrabold md:text-base">
              🎓 Admissions Open for 2026 Session • Limited Seats Available
            </div>

            <div className="flex gap-3">
              <a
                href="tel:+919811343520"
                className="rounded-xl bg-white px-4 py-2 text-sm font-bold text-sky-700"
              >
                📞 Call
              </a>

              <button
                onClick={() => setEnrollOpen(true)}
                className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white"
                type="button"
              >
                Apply Now
              </button>
            </div>
          </div>
        </Container>
      </section>

      {/* ✅ TRUST MINI BAR */}
      <section className="py-6">
        <Container>
          <div className="grid gap-4 md:grid-cols-3">
            {trustCards.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="text-sm font-extrabold text-slate-900">{item.title}</div>
                <div className="mt-2 text-sm leading-relaxed text-slate-600">{item.desc}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ===== ABOUT ===== */}
      <section id="about" className="py-14 md:py-20">
        <Container>
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <SectionTitle
                kicker="About Institute"
                title={instituteName}
                desc="We focus on practical skill-building, strong fundamentals, and clinical exposure. Our training model helps students become job-ready for hospitals, labs, and healthcare centers."
              />

              <div className="mt-4">
                <img
                  src={coverImg}
                  alt="LIPMT registration and certification banner"
                  className="w-full max-w-xl rounded-xl border border-slate-200 bg-white p-2 shadow-sm"
                />
              </div>

              <div className="mt-6 grid gap-3">
                {features.map((f) => (
                  <div
                    key={f.title}
                    className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                  >
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-sky-50 text-lg">
                      {f.icon}
                    </div>
                    <div>
                      <div className="text-sm font-extrabold text-slate-900">{f.title}</div>
                      <div className="mt-1 text-sm text-slate-600">{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="tel:+919811343520"
                  aria-label="Call for admission"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  📞 Call Now
                </a>
                <a
                  href="https://wa.me/919811343520"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp for admission"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white hover:bg-green-700"
                >
                  💬 WhatsApp
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="relative"
            >
              <div className="absolute -inset-6 rounded-[28px] bg-gradient-to-br from-sky-200/35 via-cyan-200/20 to-transparent blur-2xl" />
              <Card className="relative overflow-hidden">
                <div className="aspect-[4/3] w-full">
                  <img src={heroImg1} alt="LIPMT campus and training" className="h-full w-full object-cover" />
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <div className="text-xl font-extrabold text-slate-900">
                        <CountUp to={500} suffix="+" />
                      </div>
                      <div className="mt-1 text-xs text-slate-600">Students Trained</div>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <div className="text-xl font-extrabold text-slate-900">
                        <CountUp to={50} suffix="+" />
                      </div>
                      <div className="mt-1 text-xs text-slate-600">Hospital Tie-ups</div>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <div className="text-xl font-extrabold text-slate-900">
                        <CountUp to={24} suffix="×7" />
                      </div>
                      <div className="mt-1 text-xs text-slate-600">Support</div>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <PrimaryBtn onClick={() => setEnrollOpen(true)}>Start Admission</PrimaryBtn>
                    <button
                      onClick={() => go("facilities")}
                      className="min-h-[44px] rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                      type="button"
                    >
                      View Facilities
                    </button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ===== COURSES ===== */}
      <section id="courses" className="py-14 md:py-20">
        <Container>
          <div className="flex flex-col gap-8">
            <SectionTitle
              kicker="Courses"
              title="Job-focused diploma programs"
              desc="Top paramedical programs for hospital & lab careers."
              align="center"
            />

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {programs.map((p, idx) => (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.35, ease: "easeOut", delay: idx * 0.03 }}
                >
                  <Card className="h-full overflow-hidden">
                    <div className="h-40 overflow-hidden bg-slate-50">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                        loading="lazy"
                      />
                    </div>

                    <div className="p-5">
                      <div className="text-sm font-extrabold text-slate-900">{p.name}</div>
                      <div className="mt-2 text-sm text-slate-600">
                        Duration: <span className="font-semibold">{p.duration}</span>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        <button
                          onClick={() => setEnrollOpen(true)}
                          className="min-h-[44px] rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
                          type="button"
                        >
                          Enroll
                        </button>
                        <button
                          onClick={() => go("contact")}
                          className="min-h-[44px] rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                          type="button"
                        >
                          Ask Details
                        </button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.35, ease: "easeOut", delay: programs.length * 0.03 }}
              >
                <Card className="h-full overflow-hidden">
                  <div className="h-40 bg-gradient-to-br from-sky-50 to-slate-50" />
                  <div className="p-5">
                    <div className="text-sm font-extrabold text-slate-900">More Programs</div>
                    <div className="mt-2 text-sm text-slate-600">
                      View all courses with details, duration, eligibility & fees guidance.
                    </div>

                    <div className="mt-5">
                      <Link
                        to="/courses"
                        className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
                      >
                        View All Courses →
                      </Link>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>

            <div className="rounded-3xl bg-gradient-to-r from-sky-600 to-cyan-500 p-6 text-white md:p-10">
              <div className="grid gap-6 md:grid-cols-[1.3fr_.7fr] md:items-center">
                <div>
                  <div className="text-sm font-semibold text-white/90">Seats Limited • New Session</div>
                  <div className="mt-2 text-2xl font-extrabold md:text-3xl">
                    Admissions Open — Get a callback
                  </div>
                  <div className="mt-2 text-sm text-white/90">
                    Submit your details for course, fees, eligibility & documents.
                  </div>
                </div>
                <div className="flex flex-col gap-3 md:items-end">
                  <PrimaryBtn
                    onClick={() => setEnrollOpen(true)}
                    className="bg-slate-900 text-white hover:bg-slate-800"
                  >
                    Apply / Enroll Now
                  </PrimaryBtn>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ===== STUDENT SUCCESS ===== */}
      <section className="py-14 md:py-20 bg-white">
        <Container>
          <SectionTitle
            kicker="Student Success"
            title="Students building careers in healthcare"
            desc="Our students gain practical skills and confidence for hospitals, labs and healthcare centers."
            align="center"
          />

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { name: "Lab Technician", place: "Diagnostic Center" },
              { name: "OT Assistant", place: "Hospital OT Department" },
              { name: "Radiology Technician", place: "Imaging Center" },
            ].map((s, i) => (
              <Card key={i} className="p-6 text-center">
                <div className="text-3xl">🎓</div>
                <div className="mt-3 text-lg font-extrabold text-slate-900">{s.name}</div>
                <div className="mt-1 text-sm text-slate-600">{s.place}</div>

                <div className="mt-4 text-xs text-slate-500">
                  LIPMT trained student working in healthcare field
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* ✅ WHY CHOOSE US */}
      <section id="why" className="py-14 md:py-20">
        <Container>
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <SectionTitle
                kicker="Why Choose Us"
                title="Job-ready training with practical exposure"
                desc="We focus on hands-on practicals, strong fundamentals, and student support to help you build a career in hospitals, labs & healthcare centers."
              />

              <div className="mt-6 grid gap-3">
                {whyChoose.map((w) => (
                  <div
                    key={w.title}
                    className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                  >
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-sky-50 text-lg">
                      {w.icon}
                    </div>
                    <div>
                      <div className="text-sm font-extrabold text-slate-900">{w.title}</div>
                      <div className="mt-1 text-sm text-slate-600">{w.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="text-xl font-extrabold text-slate-900">
                    <CountUp to={500} suffix="+" />
                  </div>
                  <div className="mt-1 text-xs text-slate-600">Students Trained</div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="text-xl font-extrabold text-slate-900">
                    <CountUp to={10} suffix="+" />
                  </div>
                  <div className="mt-1 text-xs text-slate-600">Courses</div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="text-xl font-extrabold text-slate-900">
                    <CountUp to={50} suffix="+" />
                  </div>
                  <div className="mt-1 text-xs text-slate-600">Practical Sessions</div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="text-xl font-extrabold text-slate-900">
                    <CountUp to={100} suffix="%" />
                  </div>
                  <div className="mt-1 text-xs text-slate-600">Student Support</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="relative"
            >
              <div className="absolute -inset-6 rounded-[28px] bg-gradient-to-br from-sky-200/35 via-cyan-200/20 to-transparent blur-2xl" />
              <Card className="relative overflow-hidden">
                <div className="aspect-[4/3] w-full">
                  <img src={heroImg} alt="Why choose LIPMT" className="h-full w-full object-cover" />
                </div>
                <div className="p-6">
                  <div className="text-sm font-extrabold text-slate-900">Quick Admission Help</div>
                  <div className="mt-2 text-sm text-slate-600">
                    Get details about eligibility, fees, documents & batch timings.
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <PrimaryBtn onClick={() => setEnrollOpen(true)}>Apply Now</PrimaryBtn>
                    <button
                      onClick={() => go("contact")}
                      className="min-h-[44px] rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                      type="button"
                    >
                      Contact Us
                    </button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ✅ PLACEMENT */}
      <section id="placement" className="py-14 md:py-20">
        <Container>
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <SectionTitle
                kicker="Career"
                title="Placement Assistance & Career Support"
                desc="We support students with career guidance, interview preparation and job-ready practical training."
              />

              <div className="mt-6 grid gap-3">
                {placementPoints.map((t) => (
                  <div
                    key={t}
                    className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                  >
                    <div className="mt-0.5 grid h-8 w-8 place-items-center rounded-xl bg-sky-50 text-sky-700">
                      ✔
                    </div>
                    <div className="text-sm font-semibold text-slate-800">{t}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <PrimaryBtn onClick={() => setEnrollOpen(true)}>Get Placement Guidance</PrimaryBtn>
                <button
                  onClick={() => go("courses")}
                  className="min-h-[44px] rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                  type="button"
                >
                  View Courses
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="relative"
            >
              <div className="absolute -inset-6 rounded-[28px] bg-gradient-to-br from-sky-200/35 via-cyan-200/20 to-transparent blur-2xl" />
              <Card className="relative overflow-hidden">
                <div className="aspect-[4/3] w-full">
                  <img src={bestMedical} alt="Placement and career guidance" className="h-full w-full object-cover" />
                </div>
                <div className="p-6">
                  <div className="text-sm font-extrabold text-slate-900">Career Growth Support</div>
                  <div className="mt-2 text-sm text-slate-600">
                    Guidance for internships, jobs and professional development.
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6">
            <div className="text-sm font-extrabold text-slate-900">Placement / Training Support</div>
            <div className="mt-1 text-sm text-slate-600">
              Hospitals, diagnostic labs & healthcare centers (as per availability).
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {["Hospital", "Diagnostic Lab", "Imaging Center", "Clinic"].map((p) => (
                <div
                  key={p}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-center text-xs font-extrabold text-slate-700"
                >
                  {p}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ===== PLACEMENT PARTNERS ===== */}
      <section className="py-16 md:py-24 bg-slate-50 overflow-hidden">
        <Container>
          <SectionTitle
            kicker="Placement Network"
            title="Hospitals & labs where students get exposure"
            desc="Students receive guidance for opportunities in hospitals, labs and healthcare centers."
            align="center"
          />

          <div className="mt-12 grid grid-cols-2 gap-5 md:grid-cols-4">
            <div className="group rounded-2xl border border-slate-200 bg-white px-6 py-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <Hospital className="mx-auto mb-4 h-8 w-8 text-sky-600 transition group-hover:scale-110" />
              <div className="text-sm font-bold text-slate-800">Hospital</div>
            </div>

            <div className="group rounded-2xl border border-slate-200 bg-white px-6 py-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <Microscope className="mx-auto mb-4 h-8 w-8 text-sky-600 transition group-hover:scale-110" />
              <div className="text-sm font-bold text-slate-800">Diagnostic Lab</div>
            </div>

            <div className="group rounded-2xl border border-slate-200 bg-white px-6 py-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <ScanLine className="mx-auto mb-4 h-8 w-8 text-sky-600 transition group-hover:scale-110" />
              <div className="text-sm font-bold text-slate-800">Imaging Center</div>
            </div>

            <div className="group rounded-2xl border border-slate-200 bg-white px-6 py-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <Stethoscope className="mx-auto mb-4 h-8 w-8 text-sky-600 transition group-hover:scale-110" />
              <div className="text-sm font-bold text-slate-800">Private Clinic</div>
            </div>
          </div>

          <div className="mt-14 rounded-3xl border border-sky-100 bg-white p-6 shadow-sm">
            <div className="text-center mb-6">
              <div className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-4 py-1 text-xs font-bold uppercase tracking-wide text-sky-700">
                Training / Placement Support
              </div>

              <p className="mt-3 text-sm text-slate-600 max-w-2xl mx-auto">
                Students may receive exposure and opportunity guidance across hospitals,
                labs, imaging centers and clinics.
              </p>
            </div>

            <div className="relative overflow-hidden">
              <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-12 bg-gradient-to-r from-white to-transparent" />
              <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 bg-gradient-to-l from-white to-transparent" />

              <div className="flex w-max animate-[scroll_26s_linear_infinite] gap-4">
                {[
                  "Apollo Hospital",
                  "Fortis Healthcare",
                  "Max Hospital",
                  "Medanta",
                  "Dr Lal PathLabs",
                  "SRL Diagnostics",
                  "Narayana Health",
                  "Private Clinics",
                  "Imaging Centers",
                  "Diagnostic Labs",
                  "Apollo Hospital",
                  "Fortis Healthcare",
                  "Max Hospital",
                  "Medanta",
                  "Dr Lal PathLabs",
                  "SRL Diagnostics",
                  "Narayana Health",
                  "Private Clinics",
                  "Imaging Centers",
                  "Diagnostic Labs",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="whitespace-nowrap rounded-full border border-slate-200 bg-slate-50 px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-sky-50 hover:border-sky-200"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-slate-500 max-w-2xl mx-auto">
            Placement / training support depends on availability, student performance,
            practical exposure and institute guidance.
          </p>

          <style>{`
            @keyframes scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
          `}</style>
        </Container>
      </section>

      {/* ✅ CAMPUS / GALLERY */}
      <section id="gallery" className="py-14 md:py-20">
        <Container>
          <SectionTitle
            kicker="Gallery"
            title="Campus & Practical Training Glimpses"
            desc="A quick look at our learning environment, labs and practical exposure."
            align="center"
          />

          <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white">
            <div className="grid gap-3 p-4 md:grid-cols-3">
              {[trust1, trust2, trust3].map((src, i) => (
                <div key={i} className="relative overflow-hidden rounded-2xl">
                  <img src={src} alt={`Campus glimpse ${i + 1}`} className="h-[220px] w-full object-cover" loading="lazy" />
                  <div className="absolute bottom-3 left-3 rounded-xl bg-white/90 px-3 py-2 text-xs font-semibold text-slate-900 backdrop-blur">
                    Practical Training
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ===== FACILITIES ===== */}
      <section id="facilities" className="py-14 md:py-20">
        <Container>
          <SectionTitle
            kicker="Facilities"
            title="Modern infrastructure & practical labs"
            desc="High quality labs & learning environment."
          />

          <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white">
            <div className="grid gap-3 p-4 md:grid-cols-3">
              {[slide3, slide4, slide5].map((src, i) => (
                <div key={i} className="relative overflow-hidden rounded-2xl">
                  <img src={src} alt={`Facility ${i + 1}`} className="h-[220px] w-full object-cover" loading="lazy" />
                  <div className="absolute bottom-3 left-3 rounded-xl bg-white/90 px-3 py-2 text-xs font-semibold text-slate-900 backdrop-blur">
                    Practical Area
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section id="testimonials" className="py-14 md:py-20">
        <Container>
          <SectionTitle
            kicker="Testimonials"
            title="What students say"
            desc="Trusted by students for practical training & guidance."
            align="center"
          />

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {testimonials.map((t, idx) => (
              <motion.div
                key={t.role}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.35, ease: "easeOut", delay: idx * 0.04 }}
              >
                <Card className="h-full p-6">
                  <div className="text-sm font-semibold text-slate-600">{t.role}</div>
                  <div className="mt-3 text-sm leading-relaxed text-slate-800">“{t.quote}”</div>
                  <div className="mt-5 flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-2xl bg-sky-50 text-sky-700">
                      ★
                    </div>
                    <div>
                      <div className="text-sm font-extrabold text-slate-900">{t.name}</div>
                      <div className="text-xs text-slate-500">Verified Student</div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-sm font-extrabold text-slate-900">Google Reviews</div>
                <div className="mt-1 text-sm text-slate-600">
                  Read real feedback from students & parents (open in Google).
                </div>
              </div>
              <a
                className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
                href="https://www.google.com/search?q=LAL%20INSTITUTE%20OF%20PARA%20MEDICAL%20TECHNOLOGY%20reviews"
                target="_blank"
                rel="noreferrer"
                aria-label="View Google Reviews"
              >
                View Reviews →
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* ✅ EXTRA TRUST / INTERNAL LINKS */}
      <section className="py-14 md:py-20">
        <Container>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
              <div>
                <div className="inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-extrabold text-sky-700">
                  Student Trust
                </div>
                <h2 className="mt-4 text-2xl font-extrabold text-slate-900 md:text-3xl">
                  Why students and parents feel confident with LIPMT
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
                  We focus on practical paramedical education, support for admission queries, clear
                  guidance for courses and an easy communication process through phone and WhatsApp.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {[
                    "Admission guidance available",
                    "Practical learning environment",
                    "Structured faculty support",
                    "Career-oriented training approach",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800"
                    >
                      ✔ {item}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-sm font-extrabold uppercase tracking-wider text-slate-900">
                  Important Pages
                </div>
                <div className="mt-4 grid gap-3">
                  <Link
                    to="/courses"
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800 transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700"
                  >
                    View All Courses →
                  </Link>
                  <Link
                    to="/facilities"
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800 transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700"
                  >
                    Explore Facilities →
                  </Link>
                  <Link
                    to="/testimonials"
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800 transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700"
                  >
                    Read Student Testimonials →
                  </Link>
                  <Link
                    to="/faqs"
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800 transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700"
                  >
                    Frequently Asked Questions →
                  </Link>
                  <Link
                    to="/contact"
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800 transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700"
                  >
                    Contact for Admission Help →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ✅ FAQ (Trust) */}
      <section id="faq" className="py-14 md:py-20">
        <Container>
          <SectionTitle
            kicker="FAQs"
            title="Admissions, fees & training — quick answers"
            desc="Students usually ask these questions before taking admission."
            align="center"
          />
          <FAQ items={faqs} />
        </Container>
      </section>

      {/* ===== CONTACT + MAP ===== */}
      <section id="contact" className="py-14 md:py-20">
        <Container>
          <div className="grid gap-8 md:grid-cols-2 md:items-start">
            <div>
              <SectionTitle
                kicker="Contact"
                title="Visit campus or request a callback"
                desc="For admissions and course details, contact us."
              />

              <div className="mt-6 grid gap-3">
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="text-sm font-extrabold text-slate-900">Institute</div>
                  <div className="mt-1 text-sm text-slate-600">{instituteName}</div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="text-sm font-extrabold text-slate-900">Quick Help</div>
                  <div className="mt-2 flex flex-wrap gap-3">
                    <a
                      href="tel:+919811343520"
                      className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                    >
                      Call Admission Team
                    </a>
                    <a
                      href="https://wa.me/919811343520"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
                    >
                      WhatsApp Now
                    </a>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <PrimaryBtn onClick={() => setEnrollOpen(true)}>Enroll / Callback</PrimaryBtn>

                  <a
                    href="mailto:info@lipmt.in?subject=Admission%20Enquiry%20-%20LIPMT&body=Hello%20LIPMT%20Team,%0A%0AI%20want%20details%20about%20admission%20(Fees,%20Batch%20Timing,%20Eligibility,%20Documents).%0A%0ACourse:%20%0AName:%20%0AMobile:%20%0ACity:%20%0A%0AThanks"
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
                  >
                    ✉ Email
                  </a>
                </div>
              </div>
            </div>

            <Card className="overflow-hidden">
              <div className="h-[420px] w-full">
                <iframe
                  title="Google Map"
                  src={mapSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* ✅ SEO TEXT BLOCK */}
      <section className="pb-14 md:pb-20">
        <Container>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
            <div className="flex items-start gap-4">
              <img
                src={logo}
                alt="LIPMT logo"
                className="h-14 w-14 rounded-2xl border border-slate-200 bg-white object-contain p-2"
              />
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 md:text-2xl">
                  Best paramedical institute in Delhi for practical learning and career-focused training
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
                  LIPMT provides paramedical diploma programs with practical labs, clinical exposure,
                  student support and admission guidance. Students looking for DMLT, ECG Technician,
                  Radiology Technician, Dialysis Technician, Dental Technician and Operation Theatre
                  Technology related training can explore our programs, facilities and contact support
                  for details about eligibility, batches and admission process.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ===== Enroll Modal ===== */}
      <Modal open={enrollOpen} onClose={() => setEnrollOpen(false)} title="Admission / Enquiry Form">
        <form
          onSubmit={async (e) => {
            e.preventDefault();

            const selectedCourse = form.course === "Other" ? form.otherCourse.trim() : form.course;

            if (!selectedCourse) {
              alert("Please select course ✅");
              return;
            }

            try {
              const res = await fetch(WEB_APP_URL, {
                method: "POST",
                headers: { "Content-Type": "text/plain;charset=utf-8" },
                body: JSON.stringify({
                  secret: "LIPMT_2026_SECRET",
                  source: "Website",
                  page: window.location.href,
                  name: form.name,
                  phone: form.phone,
                  city: form.city,
                  course: selectedCourse,
                  message: form.message,
                }),
              });

              const text = await res.text();
              let data;
              try {
                data = JSON.parse(text);
              } catch (err) {
                throw new Error("Non-JSON response: " + text);
              }

              if (data.ok) {
                alert("Form submitted ✅");
                setEnrollOpen(false);

                setForm({
                  name: "",
                  phone: "",
                  city: "",
                  course: "",
                  otherCourse: "",
                  message: "",
                });
              } else {
                alert("Error: " + (data.error || "Unknown"));
              }
            } catch (err) {
              alert("Submission failed ❌\n" + String(err));
            }
          }}
          className="grid gap-4"
        >
          <div className="grid gap-1">
            <label className="text-sm font-semibold text-slate-700">Full Name</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
              className="min-h-[44px] rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-sky-400"
              placeholder="Your name"
            />
          </div>

          <div className="grid gap-1">
            <label className="text-sm font-semibold text-slate-700">Phone</label>
            <input
              required
              value={form.phone}
              onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
              className="min-h-[44px] rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-sky-400"
              placeholder="WhatsApp number"
            />
          </div>

          <div className="grid gap-1">
            <label className="text-sm font-semibold text-slate-700">City</label>
            <input
              required
              value={form.city}
              onChange={(e) => setForm((s) => ({ ...s, city: e.target.value }))}
              className="min-h-[44px] rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-sky-400"
              placeholder="Your city"
            />
          </div>

          <div className="grid gap-1">
            <label className="text-sm font-semibold text-slate-700">Course</label>
            <select
              required
              value={form.course}
              onChange={(e) =>
                setForm((s) => ({
                  ...s,
                  course: e.target.value,
                  otherCourse: e.target.value === "Other" ? s.otherCourse : "",
                }))
              }
              className="min-h-[44px] rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-sky-400"
            >
              <option value="">Choose a course</option>
              {programs.map((p) => (
                <option key={p.name} value={p.name}>
                  {p.name}
                </option>
              ))}
              <option value="Other">Other</option>
            </select>

            {form.course === "Other" && (
              <input
                required
                value={form.otherCourse}
                onChange={(e) => setForm((s) => ({ ...s, otherCourse: e.target.value }))}
                className="mt-2 min-h-[44px] rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-sky-400"
                placeholder="Type your course name"
              />
            )}
          </div>

          <div className="grid gap-1">
            <label className="text-sm font-semibold text-slate-700">Message</label>
            <textarea
              rows={3}
              value={form.message}
              onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
              className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-sky-400"
              placeholder="Fees / Eligibility / Documents..."
            />
          </div>

          <div className="flex gap-3 pt-2">
            <PrimaryBtn type="submit" className="w-full">
              Submit
            </PrimaryBtn>
            <button
              type="button"
              onClick={() => setEnrollOpen(false)}
              className="min-h-[44px] w-full rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              Cancel
            </button>
          </div>

          <div className="text-xs text-slate-500">
            ✅ Your details are safe. We use your info only for admission enquiry.
          </div>
        </form>
      </Modal>
    </div>
  );
}