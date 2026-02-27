import { Link } from "react-router-dom";
import { courses } from "../data/coursesData";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-teal-50 text-slate-900">
      <div className="mx-auto max-w-7xl px-5 py-14">
        {/* ABOUT */}
        <section className="rounded-3xl border border-sky-100 bg-white p-8 shadow-[0_12px_40px_rgba(2,132,199,0.08)]">
          <div className="text-sm font-semibold text-sky-700">About</div>
          <h1 className="mt-2 text-4xl md:text-5xl font-extrabold tracking-tight">
            Lal Institute of Para Medical Technology (LIPMT)
          </h1>

          <p className="mt-6 text-slate-700 leading-relaxed max-w-5xl">
            Lal Institute of Para Medical Technology (LIPMT) is committed to developing
            highly skilled and professionally trained paramedical experts to serve
            India’s growing healthcare industry. Our institute focuses on practical
            learning, modern laboratory training, and career-oriented education.
          </p>

          <p className="mt-4 text-slate-700 leading-relaxed max-w-5xl">
            With the healthcare sector expanding rapidly, the demand for trained
            paramedical professionals is increasing across hospitals, diagnostic labs,
            clinics, and healthcare institutions. We aim to bridge this gap by delivering
            structured diploma programs designed according to industry requirements.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <InfoCard
              title="Our Mission"
              items={[
                "Provide high-quality paramedical education",
                "Strong practical & clinical training",
                "Career-oriented curriculum",
                "Placement guidance support",
              ]}
            />
            <InfoCard
              title="Why Choose LIPMT?"
              items={[
                "Industry-oriented curriculum",
                "Experienced faculty",
                "Modern lab facilities",
                "Student support & guidance",
              ]}
            />
          </div>
        </section>

        {/* COURSES PREVIEW */}
        <section className="mt-8 rounded-3xl border border-sky-100 bg-white p-8 shadow-[0_12px_40px_rgba(2,132,199,0.08)]">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <div className="text-sm font-semibold text-sky-700">Programs</div>
              <h2 className="mt-2 text-3xl font-extrabold">Our Paramedical Courses</h2>
              <p className="mt-2 text-slate-600">
                Click any course to view duration, syllabus highlights & career options.
              </p>
            </div>

            <a
              href="tel:+919811343520"
              className="rounded-xl bg-sky-600 text-white px-4 py-2 text-sm font-semibold hover:bg-sky-700 transition"
            >
              Admission Helpline
            </a>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(courses || []).slice(0, 6).map((c) => (
              <CourseCard
                key={c.slug}
                title={c.title}
                duration={c.duration}
                eligibility={c.eligibility}
                to={`/courses/${c.slug}`}
              />
            ))}
          </div>

          <div className="mt-8">
            <Link
              to="/courses"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-50"
            >
              View All Courses →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

function InfoCard({ title, items }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
      <h3 className="text-lg font-extrabold text-slate-900">{title}</h3>
      <ul className="mt-4 space-y-2 text-sm text-slate-700">
        {items.map((it) => (
          <li key={it} className="flex gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-sky-600" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CourseCard({ title, duration, eligibility, to }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_26px_rgba(15,23,42,0.06)] hover:shadow-[0_14px_34px_rgba(2,132,199,0.14)] transition">
      <div className="text-xs font-semibold text-sky-700">Course</div>
      <h3 className="mt-2 text-lg font-extrabold leading-snug text-slate-900">{title}</h3>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-full border border-sky-100 bg-sky-50 px-3 py-1 text-xs text-sky-800">
          {duration}
        </span>
        <span className="rounded-full border border-teal-100 bg-teal-50 px-3 py-1 text-xs text-teal-800">
          Eligibility: {eligibility}
        </span>
      </div>

      <Link
        to={to}
        className="mt-6 inline-flex items-center justify-center rounded-xl bg-sky-600 text-white px-4 py-2 text-sm font-semibold hover:bg-sky-700 transition"
      >
        View Details →
      </Link>
    </div>
  );
}