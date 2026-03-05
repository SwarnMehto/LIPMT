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

  // ✅ Faculty data (NO local imports to avoid build error)
  const faculty = [
    {
      name: "Dr. Rajesh Sharma",
      role: "Senior Lab Instructor",
      exp: "12+ years experience",
      chips: ["Hematology", "Pathology", "Lab Safety"],
      desc:
        "Specializes in hands-on laboratory training with strong focus on diagnostic accuracy, reporting formats and quality control in routine lab practice.",
      img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Dr. Priya Verma",
      role: "Clinical Training Specialist",
      exp: "10+ years experience",
      chips: ["Clinical Skills", "Patient Care", "Hospital SOPs"],
      desc:
        "Guides students in clinical workflow, patient handling and documentation. Focused on making students job-ready for real hospital environments.",
      // ✅ Use a different valid image (previous one sometimes fails)
      img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Mr. Amit Kumar",
      role: "Paramedical Technology Trainer",
      exp: "8+ years experience",
      chips: ["ECG", "Dialysis", "Radiology"],
      desc:
        "Provides equipment-based training with practical demos, checklists and strong fundamentals so students build confidence for OT/ICU support roles.",
      img: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=500&q=80",
    },
  ];

  // ✅ Image fallback (if URL fails)
  const onImgError = (e) => {
    e.currentTarget.src = logo;
  };

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

        {/* ✅ PREMIUM FACULTY SECTION */}
        <div className="mt-12">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/70 px-3 py-1 text-xs font-semibold text-sky-800 backdrop-blur">
                ✅ Verified Trainers
                <span className="h-1 w-1 rounded-full bg-sky-500" />
                Practical + Clinical Focus
              </div>

              <h2 className="mt-3 text-2xl font-extrabold text-slate-900">
                Our Expert Faculty
              </h2>
              <p className="mt-2 max-w-2xl text-slate-600">
                Skilled mentors who guide students through practical labs, clinical exposure and
                job-ready training for hospital environments.
              </p>
            </div>

            <div className="mt-2 rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 text-sm text-slate-700 shadow-sm backdrop-blur sm:mt-0">
              <div className="font-bold text-slate-900">Training Approach</div>
              <div className="mt-1">Daily practical + supervision + guidance</div>
            </div>
          </div>

          <div className="mt-7 grid gap-6 md:grid-cols-3">
            {faculty.map((t) => (
              <div
                key={t.name}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-[0_14px_34px_rgba(15,23,42,0.08)] backdrop-blur transition hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(15,23,42,0.12)]"
              >
                <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-sky-100 via-white to-teal-100" />

                <div className="relative flex items-start gap-4">
                  <div className="relative">
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-sky-300 to-teal-300 opacity-70 blur" />
                    <img
                      src={t.img}
                      alt={t.name}
                      onError={onImgError}
                      className="relative h-16 w-16 rounded-full border-4 border-white object-cover shadow-md bg-white"
                      loading="lazy"
                    />
                  </div>

                  <div className="min-w-0">
                    <div className="truncate text-lg font-extrabold text-slate-900">
                      {t.name}
                    </div>
                    <div className="mt-0.5 text-sm font-semibold text-sky-800">
                      {t.role}
                    </div>

                    <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                      ⭐ {t.exp}
                    </div>
                  </div>
                </div>

                <p className="relative mt-4 text-sm leading-relaxed text-slate-600">
                  {t.desc}
                </p>

                <div className="relative mt-4 flex flex-wrap gap-2">
                  {t.chips.map((c) => (
                    <span
                      key={c}
                      className="rounded-full border border-sky-100 bg-sky-50 px-3 py-1 text-xs font-semibold text-slate-700"
                    >
                      {c}
                    </span>
                  ))}
                </div>

                <div className="relative mt-5 h-[1px] w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

                <div className="relative mt-4 text-xs font-semibold text-slate-600">
                  Focus:{" "}
                  <span className="text-slate-800">
                    Practical Training + Job Preparation
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

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

        <div className="h-14 md:h-20" />
      </div>

      <SiteFooter />
    </div>
  );
}