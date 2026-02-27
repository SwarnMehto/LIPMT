// src/pages/HomePage.jsx
// ✅ Premium animated homepage (blue theme)
// ✅ Uses local assets: src/assets/slide1.png ... slide5.png + logo.png
// ✅ IMPORTANT: Header/Footer removed (App.jsx header+footer already there)
// ✅ Google map embed included (works without pb code)

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, useMotionValue, animate } from "framer-motion";

// ✅ Assets
import logo from "../assets/logo.png";
import slide1 from "../assets/slide1.png";
import slide2 from "../assets/slide2.png";
import slide3 from "../assets/slide3.png";
import slide4 from "../assets/slide4.png";
import slide5 from "../assets/slide5.png";

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
        "rounded-xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-sky-600/20 transition hover:bg-sky-700 active:scale-[0.99]",
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
        "rounded-xl border border-white/40 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20 active:scale-[0.99]",
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
    <div
      className={cx("max-w-2xl", align === "center" ? "mx-auto text-center" : "")}
    >
      {kicker ? <Badge>{kicker}</Badge> : null}
      <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
        {title}
      </h2>
      {desc ? (
        <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
          {desc}
        </p>
      ) : null}
    </div>
  );
}

function CountUp({ to = 100, suffix = "+", duration = 1.4 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const mv = useMotionValue(0);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const unsub = mv.on("change", (v) => setVal(Math.round(v)));
    return () => unsub();
  }, [mv]);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, { duration, ease: "easeOut" });
    return () => controls.stop();
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
    <div className="fixed inset-0 z-[100]">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
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

  // ✅ Programs + Image (11 courses)
  const programs = [
    { name: "Diploma in Medical Lab Technology (DMLT)", duration: "2 Years", image: dmltImg },
    { name: "Diploma in Operation Theatre Technician (OTT)", duration: "2 Years", image: ottImg },
    { name: "Diploma in Radiology Technician", duration: "2 Years", image: radiologyImg },
    { name: "Diploma in ECG Technician", duration: "1 Year", image: ecgImg },
    { name: "Diploma in Dialysis Technician", duration: "2 Years", image: dialysisImg },
    { name: "Diploma in Dental Technician", duration: "2 Years", image: dentalImg },

    // ✅ Added 5 more (images reused so build error na aaye)
    { name: "Diploma in ICU Technician", duration: "1 Year", image: slide3 },
    { name: "Diploma in Physiotherapy Technician", duration: "2 Years", image: slide4 },
    { name: "Diploma in Optometry Technician", duration: "2 Years", image: slide5 },
    { name: "Diploma in Medical Record Technology (MRT)", duration: "1 Year", image: slide2 },
    { name: "Diploma in OT Assistant", duration: "1 Year", image: slide1 },
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

  // ✅ Form state (✅ ADDED: city)
  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "", // ✅ ADDED
    course: "",
    otherCourse: "",
    message: "",
  });

  return (
    <div className="bg-slate-50 text-slate-900">
      {/* ===== HERO ===== */}
      <section id="home" className="relative overflow-hidden">
        <div className="relative h-[78vh] min-h-[560px] w-full">
          <motion.img
            key={slideData.src}
            src={slideData.src}
            alt="Hero Slide"
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />

          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-950/45 to-slate-950/15" />

          <div className="absolute inset-0">
            <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(to_right,rgba(255,255,255,0.22)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.22)_1px,transparent_1px)] [background-size:36px_36px]" />
            <div className="absolute -left-40 top-24 h-72 w-72 rounded-full bg-sky-500/25 blur-3xl" />
            <div className="absolute -right-40 bottom-0 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
          </div>

          <Container className="relative flex h-full items-center">
            <div className="max-w-2xl text-white">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
              >
                <Badge>Admissions Open • 2026–27</Badge>

                <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
                  {slideData.title}
                  <span className="text-sky-300">.</span>
                </h1>

                <p className="mt-4 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
                  {slideData.subtitle}
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <PrimaryBtn onClick={() => setEnrollOpen(true)}>Enroll / Apply</PrimaryBtn>
                  <GhostBtn onClick={() => go("courses")}>Explore Courses</GhostBtn>
                  <GhostBtn onClick={() => go("contact")}>Get Callback</GhostBtn>
                </div>

                <div className="mt-10 grid max-w-xl grid-cols-2 gap-3 md:grid-cols-4">
                  <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                    <div className="text-2xl font-extrabold">
                      <CountUp to={10} suffix="+" />
                    </div>
                    <div className="mt-1 text-xs text-white/70">Years Experience</div>
                  </div>
                  <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                    <div className="text-2xl font-extrabold">
                      <CountUp to={12} suffix="+" />
                    </div>
                    <div className="mt-1 text-xs text-white/70">Labs & Units</div>
                  </div>
                  <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                    <div className="text-2xl font-extrabold">
                      <CountUp to={25} suffix="+" />
                    </div>
                    <div className="mt-1 text-xs text-white/70">Courses / Modules</div>
                  </div>
                  <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                    <div className="text-2xl font-extrabold">
                      <CountUp to={100} suffix="%" />
                    </div>
                    <div className="mt-1 text-xs text-white/70">Guidance Support</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </Container>

          <div className="absolute bottom-6 left-0 right-0">
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
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSlide((s) => (s - 1 + heroSlides.length) % heroSlides.length)}
                  className="rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm font-semibold text-white backdrop-blur hover:bg-white/20"
                >
                  ←
                </button>
                <button
                  onClick={() => setSlide((s) => (s + 1) % heroSlides.length)}
                  className="rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm font-semibold text-white backdrop-blur hover:bg-white/20"
                >
                  →
                </button>
              </div>
            </Container>
          </div>
        </div>
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
                  <img src={slide2} alt="About" className="h-full w-full object-cover" />
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-3 gap-3">
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
                      className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
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

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {programs.map((p, idx) => (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.35, ease: "easeOut", delay: idx * 0.03 }}
                >
                  <Card className="h-full overflow-hidden">
                    <div className="h-40 overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>

                    <div className="p-5">
                      <div className="text-sm font-extrabold text-slate-900">{p.name}</div>
                      <div className="mt-2 text-sm text-slate-600">
                        Duration: <span className="font-semibold">{p.duration}</span>
                      </div>

                      <div className="mt-4 flex gap-2">
                        <button
                          onClick={() => setEnrollOpen(true)}
                          className="rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
                        >
                          Enroll
                        </button>
                        <button
                          onClick={() => go("contact")}
                          className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                        >
                          Ask Details
                        </button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
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
                    className="bg-sky-600 text-white hover:bg-sky-700"
                  >
                    Apply / Enroll Now
                  </PrimaryBtn>
                </div>
              </div>
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
                  <img src={src} alt="Facility" className="h-[220px] w-full object-cover" />
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

                <div className="flex flex-wrap gap-3">
                  <PrimaryBtn onClick={() => setEnrollOpen(true)}>Enroll / Callback</PrimaryBtn>

                  <a
                    href="mailto:info@lipmt.in?subject=Admission%20Enquiry%20-%20LIPMT&body=Hello%20LIPMT%20Team,%0A%0AI%20want%20details%20about%20admission%20(Fees,%20Batch%20Timing,%20Eligibility,%20Documents).%0A%0ACourse:%20%0AName:%20%0AMobile:%20%0ACity:%20%0A%0AThanks"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50 transition"
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

      {/* ===== Enroll Modal ===== */}
      <Modal open={enrollOpen} onClose={() => setEnrollOpen(false)} title="Admission / Enquiry Form">
        <form
          onSubmit={async (e) => {
            e.preventDefault();

            const selectedCourse =
              form.course === "Other" ? form.otherCourse.trim() : form.course;

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
                  city: form.city, // ✅ ADDED
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
                  city: "", // ✅ ADDED reset
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
              className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-sky-400"
              placeholder="Your name"
            />
          </div>

          <div className="grid gap-1">
            <label className="text-sm font-semibold text-slate-700">Phone</label>
            <input
              required
              value={form.phone}
              onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
              className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-sky-400"
              placeholder="WhatsApp number"
            />
          </div>

          {/* ✅ ADDED: City field */}
          <div className="grid gap-1">
            <label className="text-sm font-semibold text-slate-700">City</label>
            <input
              required
              value={form.city}
              onChange={(e) => setForm((s) => ({ ...s, city: e.target.value }))}
              className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-sky-400"
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
              className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-sky-400"
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
                className="mt-2 rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-sky-400"
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
              className="w-full rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}