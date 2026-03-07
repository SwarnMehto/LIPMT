import { useLocation } from "react-router-dom";
import {
  CheckCircle2,
  Briefcase,
  Microscope,
  Hospital,
  GraduationCap,
  Camera,
  PhoneCall,
  MessageCircle,
  ArrowRight,
  Building2,
  ShieldCheck,
} from "lucide-react";
import SiteFooter from "../components/SiteFooter";
import logo from "../assets/logo.png";

function cx(...a) {
  return a.filter(Boolean).join(" ");
}

export default function ServicesPage() {
  const location = useLocation();
  const path = location.pathname;

  const WHATSAPP_NUMBER = "919811342520";
  const whatsappText = encodeURIComponent(
    "Hi Lal Institute of Paramedical Technology, I want details about services / placement."
  );
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappText}`;

  const stats = [
    { value: "10+", label: "Years Experience", icon: ShieldCheck },
    { value: "1000+", label: "Students Trained", icon: GraduationCap },
    { value: "12+", label: "Practical Labs", icon: Microscope },
    { value: "100%", label: "Guidance Support", icon: CheckCircle2 },
  ];

  const services = [
    {
      title: "Career Guidance & Placement Support",
      subtitle: "From admission to job assistance",
      tag: "placement",
      icon: Briefcase,
      points: [
        "Interview preparation sessions",
        "Resume building assistance",
        "Placement guidance support",
        "Professional career counseling",
      ],
    },
    {
      title: "Advanced Practical Training",
      subtitle: "Hands-on lab learning",
      tag: "practical",
      icon: Microscope,
      points: [
        "Modern instruments & equipment",
        "Supervised practical sessions",
        "Real diagnostic practice exposure",
        "Safety & hygiene training focus",
      ],
    },
    {
      title: "Clinical & Hospital Exposure",
      subtitle: "Real-world workflow experience",
      tag: "clinical",
      icon: Hospital,
      points: [
        "OPD & ward understanding",
        "Patient handling practice",
        "Basic documentation training",
        "Internship guidance support",
      ],
    },
    {
      title: "Student Support System",
      subtitle: "Complete learning ecosystem",
      tag: "classroom",
      icon: GraduationCap,
      points: [
        "Doubt clearing sessions",
        "Exam-oriented study materials",
        "Regular assessments",
        "WhatsApp & phone support",
      ],
    },
  ];

  // ✅ Filter services based on URL
  let filteredServices = services;

  if (path.includes("/placement")) {
    filteredServices = services.filter((s) => s.tag === "placement");
  } else if (path.includes("/practical")) {
    filteredServices = services.filter((s) => s.tag === "practical");
  } else if (path.includes("/classroom")) {
    filteredServices = services.filter((s) => s.tag === "classroom");
  } else if (path.includes("/clinical")) {
    filteredServices = services.filter((s) => s.tag === "clinical");
  }

  // ✅ Page Title
  const pageTitle = path.includes("/placement")
    ? "Placement Detail"
    : path.includes("/practical")
    ? "Students Practical"
    : path.includes("/classroom")
    ? "Classroom"
    : path.includes("/gallery")
    ? "Gallery & Lab Photos"
    : path.includes("/clinical")
    ? "Clinical & Hospital Exposure"
    : "Our Services";

  const isGallery = path.includes("/gallery");

  const quickLinks = [
    { label: "Gallery", icon: Camera, path: "/services/gallery" },
    { label: "Practical", icon: Microscope, path: "/services/practical" },
    { label: "Classroom", icon: GraduationCap, path: "/services/classroom" },
    { label: "Placement", icon: Briefcase, path: "/services/placement" },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-sky-50 via-white to-teal-50 text-slate-900">
      {/* Watermark Logo */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
        <img
          src={logo}
          alt="Watermark"
          className="w-[720px] max-w-[92vw] opacity-[0.07] md:w-[480px]"
          loading="lazy"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-14">
        {/* HERO */}
        <section className="rounded-3xl border border-sky-100 bg-white/85 p-8 shadow-[0_12px_40px_rgba(2,132,199,0.10)] backdrop-blur">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-sky-50 px-3 py-1 text-xs font-extrabold text-sky-800">
                <Building2 className="h-4 w-4" />
                LIPMT • Services
              </div>

              <h1 className="mt-3 text-4xl font-extrabold tracking-tight md:text-5xl">
                {pageTitle}
              </h1>

              <p className="mt-3 max-w-3xl text-slate-600">
                Comprehensive training, guidance and professional support for students — practical
                focused learning + career readiness.
              </p>

              {/* QUICK LINKS */}
              <div className="mt-5 flex flex-wrap gap-2">
                {quickLinks.map((q) => {
                  const Icon = q.icon;
                  const active = path === q.path;
                  return (
                    <a
                      key={q.path}
                      href={q.path}
                      className={cx(
                        "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition",
                        active
                          ? "border-sky-200 bg-sky-600 text-white"
                          : "border-slate-200 bg-white text-slate-800 hover:bg-slate-50"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {q.label}
                    </a>
                  );
                })}
              </div>
            </div>

            {/* CTA */}
            <div className="grid w-full gap-3 lg:w-[420px]">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 py-4 text-sm font-extrabold text-white shadow-lg hover:bg-emerald-700"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp for Details
                <ArrowRight className="h-4 w-4" />
              </a>

              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-extrabold text-slate-900 hover:bg-slate-50"
              >
                <PhoneCall className="h-5 w-5" />
                Contact / Enquiry
                <ArrowRight className="h-4 w-4" />
              </a>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-xs font-semibold text-slate-700">
                <span className="font-extrabold">Note:</span> Internship / placement support is as per
                eligibility & availability.
              </div>
            </div>
          </div>

          {/* STATS */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-extrabold text-slate-900">{s.value}</div>
                    <div className="rounded-xl bg-sky-50 p-2">
                      <Icon className="h-5 w-5 text-sky-700" />
                    </div>
                  </div>
                  <div className="mt-1 text-sm font-semibold text-slate-600">{s.label}</div>
                </div>
              );
            })}
          </div>
        </section>

        {/* DIRECTOR / PLACEMENT MESSAGE (Always visible, looks premium) */}
        <section className="mt-10 rounded-3xl border border-slate-200 bg-white/85 p-8 shadow-[0_12px_40px_rgba(15,23,42,0.06)] backdrop-blur">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <div>
              <div className="text-sm font-extrabold text-slate-900">Director’s Message</div>
              <p className="mt-3 text-slate-700 leading-relaxed">
                “Our goal is simple — provide strong fundamentals, modern practical training, and the
                right discipline so students become confident paramedical professionals. We
                continuously improve our labs, teaching methods, and student support to match real
                hospital and diagnostic lab workflow.”
              </p>

              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-xs font-extrabold text-white">
                Mr. Abhishek Gola • 1000+ Students Trained • 12+ Labs
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <div className="text-sm font-extrabold text-slate-900">Placement Support Includes</div>
              <div className="mt-4 grid gap-3">
                {[
                  "Interview practice & communication basics",
                  "Resume / CV guidance",
                  "Job role guidance (Lab / Hospital)",
                  "Referral & assistance (as applicable)",
                ].map((t) => (
                  <div key={t} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600" />
                    <div className="text-sm font-semibold text-slate-700">{t}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* GALLERY */}
        {isGallery && (
          <section className="mt-10">
            <div className="flex items-end justify-between gap-4">
              <div>
                <div className="text-sm font-semibold text-sky-700">Gallery</div>
                <h2 className="mt-1 text-2xl font-extrabold">Lab Photos & Activities</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Add your real photos here (labs, classrooms, practical sessions, placement
                  activities).
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-4">
              {[
                "Lab Photos",
                "Students Practical",
                "Classroom Training",
                "Placement Activities",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-md"
                >
                  <div className="h-32 w-full rounded-xl bg-gradient-to-br from-sky-100 to-teal-100" />
                  <div className="mt-3 font-extrabold">{item}</div>
                  <div className="mt-1 text-xs font-semibold text-slate-600">
                    (Replace with real images)
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SERVICES GRID */}
        {!isGallery && (
          <section className="mt-10">
            <div className="flex items-end justify-between gap-4">
              <div>
                <div className="text-sm font-semibold text-sky-700">Service Modules</div>
                <h2 className="mt-1 text-2xl font-extrabold">What we offer</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Explore detailed services — practical, classroom, clinical exposure and placement
                  guidance.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {filteredServices.map((s) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.title}
                    className="group rounded-3xl border border-slate-200 bg-white/85 p-7 shadow-[0_10px_26px_rgba(15,23,42,0.06)] backdrop-blur transition hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-xs font-semibold text-sky-700">{s.subtitle}</div>
                        <h3 className="mt-2 text-xl font-extrabold text-slate-900">{s.title}</h3>
                      </div>

                      <div className="rounded-2xl bg-sky-50 p-3">
                        <Icon className="h-6 w-6 text-sky-700" />
                      </div>
                    </div>

                    <ul className="mt-5 space-y-2 text-sm text-slate-700">
                      {s.points.map((p) => (
                        <li key={p} className="flex gap-3">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600" />
                          <span className="font-semibold">{p}</span>
                        </li>
                      ))}
                    </ul>

                    {/* mini CTA */}
                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                      <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-extrabold text-white hover:bg-slate-800 sm:w-auto"
                      >
                        WhatsApp
                        <ArrowRight className="h-4 w-4" />
                      </a>
                      <a
                        href="/contact"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-extrabold text-slate-900 hover:bg-slate-50 sm:w-auto"
                      >
                        Enquiry
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        <div className="h-16 md:h-24" />
      </div>

      <SiteFooter />
    </div>
  );
}