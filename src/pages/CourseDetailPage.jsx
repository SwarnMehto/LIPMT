import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCourseBySlug } from "../data/coursesData";

export default function CourseDetailPage() {
  const { slug } = useParams();
  const course = useMemo(() => getCourseBySlug(slug), [slug]);
  const [openEnroll, setOpenEnroll] = useState(false);

  if (!course) {
    return (
      <div className="mx-auto max-w-6xl px-5 py-16 text-slate-900">
        <h1 className="text-3xl font-extrabold">Course not found</h1>
        <p className="mt-3 text-slate-600">Please go back to courses list.</p>
        <Link
          to="/courses"
          className="mt-6 inline-block rounded-xl bg-sky-600 px-4 py-2 text-white hover:bg-sky-700"
        >
          Back to Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-teal-50 text-slate-900">
      <div className="mx-auto max-w-6xl px-5 py-14">
        {/* Top bar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-sm font-semibold text-sky-700">Course Details</div>
            <h1 className="mt-1 text-3xl md:text-4xl font-extrabold tracking-tight">
              {course.title}
            </h1>
          </div>

          <Link
            to="/courses"
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm hover:bg-slate-50 transition"
          >
            ← Back
          </Link>
        </div>

        {/* Badges */}
        <div className="mt-6 flex flex-wrap gap-2">
          <Badge label={`Duration: ${course.duration}`} />
          <Badge label={`Eligibility: ${course.eligibility}`} />
        </div>

        {/* Overview Card */}
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
          <h2 className="text-xl font-extrabold">Overview</h2>
          <p className="mt-3 text-slate-700 leading-relaxed">{course.overview}</p>
        </div>

        {/* Grid sections */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <GlassCard title="What Students Study in this Course">
            <ul className="mt-3 space-y-2 text-slate-700 text-sm">
              {(course.whatYouStudy || []).map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-sky-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </GlassCard>

          <GlassCard title="Jobs After Diploma">
            <ul className="mt-3 space-y-2 text-slate-700 text-sm">
              {(course.jobs || []).map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-teal-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </GlassCard>

          <GlassCard title="Work Areas (Where Students Can Work)">
            <ul className="mt-3 space-y-2 text-slate-700 text-sm">
              {(course.workAreas || []).map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-900" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </GlassCard>

          <GlassCard title="Benefits of this Course">
            <ul className="mt-3 space-y-2 text-slate-700 text-sm">
              {(course.benefits || []).map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-sky-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </GlassCard>
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 rounded-2xl border border-sky-100 bg-white p-6 shadow-[0_10px_30px_rgba(2,132,199,0.08)] flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="text-sm font-semibold text-sky-700">Need Admission Help?</div>
            <div className="text-lg font-extrabold">
              Contact us for fees, batch timing & admission process
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="tel:+919811343520"
              className="rounded-xl bg-sky-600 text-white px-4 py-2 text-sm font-semibold hover:bg-sky-700"
            >
              Call Now
            </a>
            <a
              href="mailto:info@lipmt.in"
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm hover:bg-slate-50"
            >
              Email
            </a>

            <button
              onClick={() => setOpenEnroll(true)}
              className="rounded-xl bg-teal-600 text-white px-4 py-2 text-sm font-semibold hover:bg-teal-700"
            >
              Enroll Now
            </button>
          </div>
        </div>
      </div>

      {/* Enroll Modal */}
      {openEnroll && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpenEnroll(false)}
          />
          <div className="relative w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-semibold text-sky-700">Enroll Request</div>
                <div className="mt-1 text-xl font-extrabold">{course.title}</div>
                <div className="mt-2 text-sm text-slate-600">
                  Fill details — our team will contact you for fees, batches & admission process.
                </div>
              </div>
              <button
                onClick={() => setOpenEnroll(false)}
                className="rounded-lg border border-slate-200 bg-white px-3 py-1 text-sm hover:bg-slate-50"
              >
                ✕
              </button>
            </div>

            <form
              className="mt-6 grid gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Submitted ✅ (Demo). Next: WhatsApp integration.");
                setOpenEnroll(false);
              }}
            >
              <input
                required
                placeholder="Your Name"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-sky-400"
              />
              <input
                required
                placeholder="Mobile Number"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-sky-400"
              />
              <input
                placeholder="City"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-sky-400"
              />

              <button
                type="submit"
                className="mt-2 rounded-xl bg-sky-600 text-white px-4 py-3 text-sm font-semibold hover:bg-sky-700"
              >
                Submit Enroll Request
              </button>

              <div className="mt-2 text-xs text-slate-500">
                Or call:{" "}
                <a className="underline hover:text-slate-900" href="tel:+919811343520">
                  +91-9811343520
                </a>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function Badge({ label }) {
  return (
    <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700">
      {label}
    </span>
  );
}

function GlassCard({ title, children }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
      <h3 className="font-extrabold">{title}</h3>
      {children}
    </div>
  );
}