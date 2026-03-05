import SiteFooter from "../components/SiteFooter";
import logo from "../assets/logo.png";

/*
✅ HOW TO ADD PHOTOS:
1) Create folder: src/assets/gallery/
2) Put images: g1.png, g2.png...
3) Import here:
   import g1 from "../assets/gallery/g1.png";
4) Add inside images[] below.
*/

// Example imports (uncomment after you add files)
// import g1 from "../assets/gallery/g1.png";
// import g2 from "../assets/gallery/g2.png";

const images = [
  // { src: g1, title: "Lab Photo 1" },
  // { src: g2, title: "Campus Area" },
];

function PlaceholderCard({ title, subtitle }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-[0_10px_26px_rgba(15,23,42,0.06)] backdrop-blur transition hover:shadow-lg">
      <div className="h-36 w-full rounded-xl border border-slate-200 bg-gradient-to-br from-sky-100 to-teal-100" />
      <div className="mt-3 font-extrabold text-slate-900">{title}</div>
      <div className="mt-1 text-xs text-slate-600">{subtitle}</div>
    </div>
  );
}

export default function GalleryPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-sky-50 via-white to-teal-50 text-slate-900">
      {/* Watermark Logo */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
        <img
          src={logo}
          alt="Watermark"
          className="w-[720px] max-w-[92vw] opacity-[0.06] md:w-[480px]"
          loading="lazy"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-14">
        <h1 className="text-4xl font-extrabold">Gallery & Lab Photos</h1>
        <p className="mt-3 text-slate-600">
          Campus, labs, classroom and students practical glimpses.
        </p>

        {/* Content */}
        {images.length > 0 ? (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {images.map((it, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition"
              >
                <img src={it.src} alt={it.title} className="h-44 w-full object-cover" />
                <div className="p-4">
                  <div className="text-sm font-extrabold text-slate-900">{it.title}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <PlaceholderCard title="Lab Photos" subtitle="Add lab images in src/assets/gallery/" />
            <PlaceholderCard title="Students Practical" subtitle="Add practical images in gallery folder" />
            <PlaceholderCard title="Classroom" subtitle="Add classroom images in gallery folder" />
            <PlaceholderCard title="Campus Glimpses" subtitle="Add campus images in gallery folder" />
          </div>
        )}

        {/* Note */}
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white/70 p-5 text-sm text-slate-700">
          : <b>src/assets/gallery/</b> me photos upload karna,
          is file me import karke <b>images[]</b> list me add karna hai.
        </div>

        <div className="h-16 md:h-24" />
      </div>

      <SiteFooter />
    </div>
  );
}