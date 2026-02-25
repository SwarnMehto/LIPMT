import { COURSES } from "../siteData.js";

export default function CoursesPage({ onEnroll }) {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <h1 className="text-3xl font-extrabold text-zinc-900">Courses</h1>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {COURSES.map((c) => (
          <div key={c.title} className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="text-lg font-semibold text-zinc-900">{c.title}</div>
            <div className="mt-2 text-sm text-zinc-600">{c.desc}</div>
            <div className="mt-4 inline-flex rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs text-zinc-700">
              Duration: {c.duration}
            </div>

            <button
              onClick={() => onEnroll(c.title)}
              className="mt-6 w-full rounded-2xl bg-zinc-900 px-4 py-3 text-sm font-semibold text-white hover:bg-zinc-800"
            >
              Enroll for {c.title}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}