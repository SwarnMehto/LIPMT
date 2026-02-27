import SiteFooter from "../components/SiteFooter";
import logo from "../assets/logo.png";

export default function FacilitiesPage() {
  const facilities = [
    {
      title: "Advanced Practical Laboratories",
      subtitle: "Hands-on training environment",
      points: [
        "Updated instruments & demo models",
        "Routine practical sessions + supervision",
        "Safety, hygiene & lab discipline focus",
        "Record keeping & reporting basics",
      ],
      forWhom: "Best for: DMLT / ECG / Radiology / Dialysis students",
    },
    {
      title: "Clinical & Hospital Exposure",
      subtitle: "Real-world workflow support",
      points: [
        "OPD/ward workflow understanding",
        "Patient handling & communication basics",
        "Basic documentation & assistance practice",
        "Internship guidance (as per availability)",
      ],
      forWhom: "Best for: OT / Dialysis / Respiratory / Neuro students",
    },
    {
      title: "Smart Classrooms & Study Support",
      subtitle: "Structured learning + guidance",
      points: [
        "Doubt clearing sessions",
        "Notes + exam-oriented guidance",
        "Regular tests & feedback",
        "Career counseling & interview prep",
      ],
      forWhom: "Best for: All programs (foundation + exams)",
    },
    {
      title: "Student Support & Career Help",
      subtitle: "Admissions to placement guidance",
      points: [
        "Admission guidance & documentation help",
        "Fee/batch information support",
        "Placement assistance (basic guidance)",
        "WhatsApp + phone support for queries",
      ],
      forWhom: "Best for: New admissions & ongoing students",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-sky-50 via-white to-teal-50 text-slate-900">
      {/* ✅ Background logo watermark */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
        <img
          src={logo}
          alt="LIPMT watermark"
          className="w-[720px] max-w-[92vw] opacity-[0.10] md:w-[480px]"
          loading="lazy"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-14">
        <h1 className="text-4xl font-extrabold">Facilities</h1>
        <p className="mt-3 text-slate-600">
          Modern labs, practical training environment and student support.
        </p>

        {/* ✅ Facilities content */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {facilities.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-[0_10px_26px_rgba(15,23,42,0.06)] backdrop-blur"
            >
              <div className="text-xs font-semibold text-sky-700">{f.subtitle}</div>
              <h2 className="mt-2 text-xl font-extrabold text-slate-900">{f.title}</h2>

              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {f.points.map((p) => (
                  <li key={p} className="flex gap-2">
                    <span className="mt-0.5">✅</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 rounded-xl border border-sky-100 bg-sky-50 px-4 py-3 text-sm text-slate-800">
                <span className="font-semibold">Scope:</span> {f.forWhom}
              </div>
            </div>
          ))}
        </div>

        {/* ✅ Extra space so content doesn't touch footer (Quick Links) */}
        <div className="h-14 md:h-20" />
      </div>

      {/* ✅ Footer (Quick Links yaha aayenge) */}
      <SiteFooter />
    </div>
  );
}