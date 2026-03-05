import SiteFooter from "../components/SiteFooter";
import logo from "../assets/logo.png";

/*
✅ HOW TO ADD CLASSROOM PHOTOS:
1) Create folder: src/assets/classroom/
2) Put images: c1.png, c2.png...
3) Import here:
   import c1 from "../assets/classroom/c1.png";
4) Add inside classroomImages[] below.
*/

// Example imports (uncomment after you add files)
// import c1 from "../assets/classroom/c1.png";
// import c2 from "../assets/classroom/c2.png";

const classroomImages = [
  // { src: c1, title: "Smart Classroom" },
  // { src: c2, title: "Lecture Session" },
];

export default function ClassroomPage() {
  const points = [
    "Doubt clearing sessions",
    "Exam-oriented study materials",
    "Regular assessments",
    "Structured teaching & guidance",
    "WhatsApp & phone support",
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-sky-50 via-white to-teal-50 text-slate-900">
      {/* Watermark */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
        <img
          src={logo}
          alt="Watermark"
          className="w-[720px] max-w-[92vw] opacity-[0.06] md:w-[480px]"
          loading="lazy"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-14">
        <h1 className="text-4xl font-extrabold">Classroom</h1>
        <p className="mt-3 text-slate-600">
          Learning environment, notes, assessments & student support.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {/* Left */}
          <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-[0_10px_26px_rgba(15,23,42,0.06)] backdrop-blur">
            <div className="text-xs font-semibold text-sky-700">Student Support System</div>
            <h2 className="mt-2 text-xl font-extrabold text-slate-900">Classroom features</h2>

            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {points.map((p) => (
                <li key={p} className="flex gap-2">
                  <span className="mt-0.5">✅</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right */}
          <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-[0_10px_26px_rgba(15,23,42,0.06)] backdrop-blur">
            <div className="text-xs font-semibold text-sky-700">Classroom Glimpses</div>
            <h2 className="mt-2 text-xl font-extrabold text-slate-900">Photos</h2>

            {classroomImages.length > 0 ? (
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {classroomImages.map((it, i) => (
                  <div
                    key={i}
                    className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
                  >
                    <img src={it.src} alt={it.title} className="h-36 w-full object-cover" />
                    <div className="p-3 text-sm font-semibold text-slate-900">{it.title}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-4 rounded-xl border border-slate-200 bg-sky-50 p-4 text-sm text-slate-700">
                ✅ Classroom photos add karne ke liye: <b>src/assets/classroom/</b> me upload karo,
                phir yaha import karke <b>classroomImages[]</b> me add kar do.
              </div>
            )}
          </div>
        </div>

        <div className="h-16 md:h-24" />
      </div>

      <SiteFooter />
    </div>
  );
}