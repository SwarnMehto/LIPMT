import SiteFooter from "../components/SiteFooter";
import logo from "../assets/logo.png";

export default function ServicesPage() {
  const services = [
    {
      title: "Career Guidance & Placement Support",
      subtitle: "From admission to job assistance",
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
      points: [
        "Doubt clearing sessions",
        "Exam-oriented study materials",
        "Regular assessments",
        "WhatsApp & phone support",
      ],
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-sky-50 via-white to-teal-50 text-slate-900">

      {/* Watermark Logo */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
        <img
          src={logo}
          alt="Watermark"
          className="w-[720px] max-w-[92vw] opacity-[0.08] md:w-[480px]"
          loading="lazy"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-14">
        <h1 className="text-4xl font-extrabold">Our Services</h1>
        <p className="mt-3 text-slate-600">
          Comprehensive training, guidance and professional support for students.
        </p>

        {/* Services Grid */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {services.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-[0_10px_26px_rgba(15,23,42,0.06)] backdrop-blur hover:shadow-lg transition"
            >
              <div className="text-xs font-semibold text-sky-700">{s.subtitle}</div>
              <h2 className="mt-2 text-xl font-extrabold text-slate-900">{s.title}</h2>

              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {s.points.map((p) => (
                  <li key={p} className="flex gap-2">
                    <span className="mt-0.5">✅</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="h-16 md:h-24" />
      </div>

      {/* Footer (Quick Links rahega) */}
      <SiteFooter />
    </div>
  );
}