import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { courses } from "../data/coursesData";

import dmltImg from "../assets/courses/dmlt.png";
import ottImg from "../assets/courses/ott.png";
import radiologyImg from "../assets/courses/radiology.png";
import ecgImg from "../assets/courses/ecg.png";
import dialysisImg from "../assets/courses/dialysis.png";
import dentalImg from "../assets/courses/dental.png";

const WHATSAPP_NUMBER = "919811343520"; // ✅ change if needed (without +)

export default function CoursesPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [openEnroll, setOpenEnroll] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // ✅ FIXED: slug mapping exactly as coursesData.jsx
  const courseImageMap = useMemo(() => {
    return {
      // exact slugs from coursesData.jsx
      dmlt: dmltImg,
      "ot-technician": ottImg,
      "radiology-imaging": radiologyImg,
      "ecg-technician": ecgImg,
      "dialysis-technician": dialysisImg,
      "dental-technician": dentalImg,

      // optional title fallback (only if you use titles somewhere else)
      "Diploma in Medical Laboratory Technology": dmltImg,
      "Diploma in OT Technician": ottImg,
      "Diploma in Radiology imaging Technology": radiologyImg,
      "Diploma in ECG Technician": ecgImg,
      "Diploma in Dialysis Technician": dialysisImg,
      "Diploma in Dental Technician": dentalImg,
    };
  }, []);

  const normalizedCourses = useMemo(() => {
    return (courses || []).map((c) => ({
      ...c,
      category: c.category || "General",
      popular: Boolean(c.popular),
      image: courseImageMap[c.slug] || courseImageMap[c.title] || null,
    }));
  }, [courseImageMap]);

  const categories = useMemo(() => {
    const set = new Set(normalizedCourses.map((c) => c.category));
    return ["All", ...Array.from(set)];
  }, [normalizedCourses]);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return normalizedCourses.filter((c) => {
      const matchCat = cat === "All" ? true : c.category === cat;
      const matchQ =
        query.length === 0
          ? true
          : `${c.title} ${c.overview || ""} ${c.duration || ""} ${c.eligibility || ""}`
              .toLowerCase()
              .includes(query);
      return matchCat && matchQ;
    });
  }, [normalizedCourses, q, cat]);

  function openEnrollModal(course) {
    setSelectedCourse(course);
    setOpenEnroll(true);
  }

  function whatsappEnroll(course, name, phone, city) {
    const text = `Hello LIPMT,%0A%0AI want to enroll.%0A%0ACourse: ${encodeURIComponent(
      course?.title || ""
    )}%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(
      phone
    )}%0ACity: ${encodeURIComponent(city || "")}%0A%0APlease share fees, batch timing & admission process.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-teal-50 text-slate-900">
      <div className="mx-auto max-w-7xl px-5 py-14">
        {/* Heading */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-white px-3 py-1 text-xs font-semibold text-sky-700 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-sky-500" />
              Programs
            </div>
            <h1 className="mt-4 text-4xl font-extrabold">Our Paramedical Courses</h1>
            <p className="mt-2 text-slate-600">
              Search & filter courses. Click “View Details” or directly “Enroll”.
            </p>
          </div>

          <a
            href="tel:+919811343520"
            className="inline-flex items-center justify-center rounded-xl bg-sky-600 text-white px-4 py-2 text-sm font-semibold hover:bg-sky-700 transition"
          >
            Admission Helpline
          </a>
        </div>

        {/* Filters */}
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_10px_26px_rgba(15,23,42,0.06)]">
          <div className="grid gap-3 md:grid-cols-3">
            {/* Search */}
            <div className="md:col-span-2">
              <label className="text-xs font-semibold text-slate-700">Search Course</label>
              <div className="mt-2 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2">
                <span className="text-slate-400">🔎</span>
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search by name, duration, eligibility..."
                  className="w-full text-sm outline-none"
                />
                {q?.length > 0 && (
                  <button
                    onClick={() => setQ("")}
                    className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs hover:bg-slate-50"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="text-xs font-semibold text-slate-700">Category</label>
              <select
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none hover:bg-slate-50"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
            <div>
              Showing <span className="font-semibold text-slate-900">{filtered.length}</span> courses
              {cat !== "All" && (
                <>
                  {" "}
                  in <span className="font-semibold text-slate-900">{cat}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((course) => (
            <CourseCard key={course.slug} course={course} onEnroll={() => openEnrollModal(course)} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-700">
            <div className="text-lg font-extrabold">No courses found</div>
            <div className="mt-2 text-sm text-slate-600">Try changing search keywords or category.</div>
          </div>
        )}
      </div>

      {openEnroll && (
        <EnrollModal
          course={selectedCourse}
          onClose={() => setOpenEnroll(false)}
          onWhatsApp={(name, phone, city) => whatsappEnroll(selectedCourse, name, phone, city)}
        />
      )}

      <WhatsAppFloat />
    </div>
  );
}

/* ---------------- Components ---------------- */

function CourseCard({ course, onEnroll }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_26px_rgba(15,23,42,0.06)] hover:shadow-[0_14px_34px_rgba(2,132,199,0.14)] transition">
      {/* ✅ Image */}
      {course.image ? (
        <div className="h-44 w-full overflow-hidden bg-slate-50">
          <img
            src={course.image}
            alt={course.title}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="h-44 w-full bg-gradient-to-br from-sky-50 to-slate-50" />
      )}

      <div className="p-6">
        {course.popular && (
          <div className="absolute right-4 top-4 rounded-full bg-amber-100 px-3 py-1 text-xs font-extrabold text-amber-900">
            ⭐ Most Popular
          </div>
        )}

        <div className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-800">
          {course.category || "General"}
        </div>

        <h3 className="mt-3 text-lg font-extrabold text-slate-900">{course.title}</h3>

        <p className="mt-2 text-sm text-slate-600 line-clamp-2">
          {course.overview || "Course overview will be available on details page."}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full border border-sky-100 bg-sky-50 px-3 py-1 text-xs text-sky-800">
            {course.duration}
          </span>
          <span className="rounded-full border border-teal-100 bg-teal-50 px-3 py-1 text-xs text-teal-800">
            {course.eligibility}
          </span>
        </div>

        <div className="mt-6 grid gap-3">
          <Link
            to={`/courses/${course.slug}`}
            className="inline-flex w-full items-center justify-center rounded-xl bg-sky-600 text-white px-4 py-3 text-sm font-semibold hover:bg-sky-700 transition"
          >
            View Details →
          </Link>

          <button
            onClick={onEnroll}
            className="inline-flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50 transition"
          >
            📞 Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
}

function EnrollModal({ course, onClose, onWhatsApp }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-sky-700">Enroll Request</div>
            <div className="mt-1 text-xl font-extrabold text-slate-900">{course?.title}</div>
            <div className="mt-2 text-sm text-slate-600">
              Share details — we’ll contact you for fees, batches & admission process.
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg border border-slate-200 bg-white px-3 py-1 text-sm hover:bg-slate-50"
          >
            ✕
          </button>
        </div>

        <form
          className="mt-6 grid gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            onWhatsApp(name, phone, city);
            onClose();
          }}
        >
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-sky-400"
          />
          <input
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Mobile Number"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-sky-400"
          />
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City (optional)"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-sky-400"
          />

          <button
            type="submit"
            className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-teal-600 text-white px-4 py-3 text-sm font-semibold hover:bg-teal-700 transition"
          >
            💬 Send on WhatsApp
          </button>

          <div className="mt-2 text-xs text-slate-500">
            We will reply soon with fee structure & admission process.
          </div>
        </form>
      </div>
    </div>
  );
}

function WhatsAppFloat() {
  const msg = encodeURIComponent("Hello LIPMT, I want admission details (fees, batches & process).");
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-green-600 px-4 py-3 text-sm font-extrabold text-white shadow-lg hover:bg-green-700 transition"
      aria-label="WhatsApp"
    >
      💬 WhatsApp
      <span className="rounded-full bg-white/15 px-2 py-0.5 text-xs">Chat</span>
    </a>
  );
}