import { Link } from "react-router-dom";

export default function QuickLinks({ courses = [] }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
      <div className="text-sm font-extrabold tracking-wider uppercase text-slate-900">
        Quick Link
      </div>
      <div className="mt-2 h-0.5 w-14 bg-sky-600 rounded-full" />

      <div className="mt-5 space-y-3">
        {courses.map((c) => (
          <Link
            key={c.slug}
            to={`/courses/${c.slug}`}
            className="group flex items-start gap-3 text-slate-700 hover:text-sky-700 transition"
          >
            <span className="mt-1 inline-flex h-7 w-7 items-center justify-center rounded-full border border-sky-100 bg-sky-50 text-sky-700 group-hover:bg-sky-100">
              ↪
            </span>
            <span className="text-sm font-semibold leading-snug">
              {c.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}