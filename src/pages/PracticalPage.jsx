import SiteFooter from "../components/SiteFooter";
import logo from "../assets/logo.png";

/*
✅ HOW TO ADD PRACTICAL PHOTOS:
1) Create folder: src/assets/practical/
2) Put images: p1.png, p2.png...
3) Import here:
   import p1 from "../assets/practical/p1.png";
4) Add inside practicalImages[] below.
*/

// Example imports (uncomment after you add files)
// import p1 from "../assets/practical/p1.png";
// import p2 from "../assets/practical/p2.png";

const practicalImages = [
  // { src: p1, title: "Blood Testing Practical" },
  // { src: p2, title: "Microscope Training" },
];

export default function PracticalPage() {
  const points = [
    "Modern instruments & equipment",
    "Supervised practical sessions",
    "Real diagnostic practice exposure",
    "Safety & hygiene training focus",
    "Case-based learning & reporting basics",
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
        <h1 className="text-4xl font-extrabold">Students Practical</h1>
        <p className="mt-3 text-slate-600">
          Hands-on lab learning & skill building for job readiness.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {/* Left: Points */}
          <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-[0_10px_26px_rgba(15,23,42,0.06)] backdrop-blur">
            <div className="text-xs font-semibold text-sky-700">Advanced Practical Training</div>
            <h2 className="mt-2 text-xl font-extrabold text-slate-900">What students learn</h2>

            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {points.map((p) => (
                <li key={p} className="flex gap-2">
                  <span className="mt-0.5">✅</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Photos */}
          <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-[0_10px_26px_rgba(15,23,42,0.06)] backdrop-blur">
            <div className="text-xs font-semibold text-sky-700">Practical Glimpses</div>
            <h2 className="mt-2 text-xl font-extrabold text-slate-900">Photos / Activities</h2>

            {practicalImages.length > 0 ? (
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {practicalImages.map((it, i) => (
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
                ✅ Practical photos add karne ke liye: <b>src/assets/practical/</b> me upload karo,
                phir yaha import karke <b>practicalImages[]</b> me add kar do.
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