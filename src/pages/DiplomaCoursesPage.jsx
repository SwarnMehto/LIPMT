// src/pages/DiplomaCoursesPage.jsx
// ✅ Uses coursesData.jsx (level-based filtering)

import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { courses } from "../data/coursesData.jsx";

export default function DiplomaCoursesPage() {
  const navigate = useNavigate();

  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");

  const levelCourses = useMemo(
    () => courses.filter((c) => (c.level || "").toLowerCase() === "diploma"),
    []
  );

  const categories = useMemo(() => {
    const set = new Set(levelCourses.map((c) => c.category).filter(Boolean));
    return ["All", ...Array.from(set)];
  }, [levelCourses]);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return levelCourses.filter((c) => {
      const matchCat = cat === "All" ? true : c.category === cat;
      const hay = `${c.title} ${c.duration} ${c.eligibility} ${c.category}`.toLowerCase();
      const matchQ = term ? hay.includes(term) : true;
      return matchCat && matchQ;
    });
  }, [levelCourses, q, cat]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1 text-xs text-slate-600">
          <span className="h-2 w-2 rounded-full bg-sky-500" />
          Programs • Diploma
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
              Diploma Courses
            </h1>
            <p className="mt-2 text-slate-600">
              Search & filter courses. Click “View Details” or directly “Enroll”.
            </p>
          </div>

          <button
            onClick={() => navigate("/contact")}
            className="w-full rounded-xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-sky-700 sm:w-auto"
          >
            Admission Helpline
          </button>
        </div>

        {/* Filters */}
        <div className="mt-8 rounded-2xl border bg-white p-5 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="sm:col-span-2">
              <label className="mb-2 block text-xs font-semibold text-slate-600">
                Search Course
              </label>
              <div className="flex items-center gap-2 rounded-xl border px-3 py-2">
                <span className="text-slate-400">🔎</span>
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search by name, duration, eligibility..."
                  className="w-full bg-transparent text-sm outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold text-slate-600">
                Category
              </label>
              <select
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                className="w-full rounded-xl border bg-white px-3 py-2 text-sm outline-none"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-3 text-xs text-slate-500">
            Showing <b>{filtered.length}</b> courses in <b>Diploma</b>
          </div>
        </div>

        {/* List */}
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {filtered.map((c) => (
            <div
              key={c.slug}
              className="rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{c.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">
                    {c.duration} • {c.eligibility}
                  </p>
                  <p className="mt-2 text-xs text-slate-500">
                    Category: <b>{c.category}</b>
                  </p>
                </div>

                {c.popular ? (
                  <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
                    Popular
                  </span>
                ) : null}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={() => navigate(`/courses/${c.slug}`)}
                  className="rounded-xl border px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  View Details
                </button>
                <button
                  onClick={() => navigate(`/contact?course=${encodeURIComponent(c.title)}`)}
                  className="rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
                >
                  Enroll
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="mt-10 rounded-2xl border bg-white py-16 text-center text-slate-600">
            <div className="text-lg font-semibold text-slate-900">No courses found</div>
            <div className="mt-1 text-sm">Try changing search keywords or category.</div>
          </div>
        ) : null}
      </div>
    </div>
  );
}