import { Link } from "react-router-dom";
import { courses } from "../data/coursesData";
import owner from "../assets/owner.png";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-teal-50 text-slate-900">
      <div className="mx-auto max-w-7xl px-5 py-14">
        {/* ===================== */}
        {/* PREMIUM DIRECTOR HERO */}
        {/* ===================== */}
        <section className="relative overflow-hidden rounded-3xl border border-sky-100 bg-white shadow-[0_12px_40px_rgba(2,132,199,0.08)]">
          {/* soft glow */}
          <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-sky-100 blur-3xl opacity-70" />
          <div className="pointer-events-none absolute -bottom-28 -left-28 h-72 w-72 rounded-full bg-teal-100 blur-3xl opacity-70" />

          <div className="relative p-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-800">
                  <span className="h-2 w-2 rounded-full bg-sky-600" />
                  About the Founder
                </div>

                <h1 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight">
                  Mr. Abhishek Gola
                </h1>

                <p className="mt-2 text-lg font-semibold text-slate-700">
                  Director / Owner • Lal Institute of Para Medical Technology (LIPMT)
                </p>

                <p className="mt-3 max-w-3xl text-slate-600 leading-relaxed">
                  With a strong focus on practical learning, discipline, and career-ready skills,
                  he has guided thousands of students into the healthcare industry.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="tel:+919811343520"
                  className="rounded-xl bg-sky-600 text-white px-5 py-2 text-sm font-semibold hover:bg-sky-700 transition"
                >
                  Admission Helpline
                </a>
                <Link
                  to="/contact"
                  className="rounded-xl border border-slate-200 bg-white px-5 py-2 text-sm font-semibold hover:bg-slate-50 transition"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            <div className="mt-10 grid gap-8 lg:grid-cols-[380px_1fr] items-start">
              {/* IMAGE CARD */}
              <div className="rounded-3xl border border-slate-200 bg-white p-3 shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
                <img
                  src={owner}
                  alt="Mr. Abhishek Gola - Director LIPMT"
                  className="w-full h-[440px] object-cover rounded-2xl"
                  loading="lazy"
                />

                <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-center">
                  <div className="text-lg font-extrabold text-slate-900">
                    Mr. Abhishek Gola
                  </div>
                  <div className="text-sm text-slate-600">
                    Director / Owner • LIPMT
                  </div>
                </div>
              </div>

              {/* MESSAGE + STATS */}
              <div className="space-y-6">
                {/* Director Message */}
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.06)]">
                  <div className="flex items-center gap-2 text-sm font-semibold text-sky-700">
                    <span className="h-2 w-2 rounded-full bg-sky-600" />
                    Director’s Message
                  </div>

                  <p className="mt-4 text-slate-700 leading-relaxed">
                    “Our goal is simple — provide strong fundamentals, modern practical training,
                    and the right discipline so students become confident paramedical professionals.
                    We continuously improve our labs, teaching methods, and student support to match
                    real hospital and diagnostic lab workflow.”
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <Badge>10+ Years Experience</Badge>
                    <Badge>500+ Students Trained</Badge>
                    <Badge>12+ Labs</Badge>
                    <Badge>Placement Guidance</Badge>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <StatCard title="Students Trained" value="500+" sub="Skilled & job-ready learners" />
                  <StatCard title="Placement Support" value="Almost 100%" sub="Strong guidance & preparation" />
                  <StatCard title="Modern Labs" value="12+ Labs" sub="Hands-on practical learning" />
                  <StatCard title="Institute Legacy" value="10+ Years" sub="Trusted education journey" />
                </div>

                {/* Partner strip */}
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.06)]">
                  <div className="text-sm font-semibold text-slate-900">
                    Hospital / Lab Exposure & Network (Highlights)
                  </div>
                  <p className="mt-2 text-sm text-slate-600">
                    We guide students for hospital workflow understanding and clinical exposure as per availability.
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <LogoPill>Diagnostic Labs</LogoPill>
                    <LogoPill>Hospitals</LogoPill>
                    <LogoPill>Clinics</LogoPill>
                    <LogoPill>Health Centers</LogoPill>
                    <LogoPill>Internship Guidance</LogoPill>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== */}
        {/* ABOUT INSTITUTE */}
        {/* ===================== */}
        <section className="mt-10 rounded-3xl border border-sky-100 bg-white p-8 shadow-[0_12px_40px_rgba(2,132,199,0.08)]">
          <div className="text-sm font-semibold text-sky-700">About</div>

          <h2 className="mt-2 text-4xl md:text-5xl font-extrabold tracking-tight">
            Lal Institute of Para Medical Technology (LIPMT)
          </h2>

          <p className="mt-6 text-slate-700 leading-relaxed max-w-5xl">
            Lal Institute of Para Medical Technology (LIPMT) is committed to developing
            highly skilled and professionally trained paramedical experts to serve India’s
            growing healthcare industry. Our institute focuses on practical learning,
            modern laboratory training, and career-oriented education.
          </p>

          <p className="mt-4 text-slate-700 leading-relaxed max-w-5xl">
            With the healthcare sector expanding rapidly, demand for trained paramedical
            professionals is increasing across hospitals, diagnostic labs, clinics,
            and healthcare institutions. We bridge this gap through structured programs
            designed as per industry needs.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <span className="rounded-full border border-sky-100 bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-800">
              ✔ Institute established & running successfully for 10+ years
            </span>
            <span className="rounded-full border border-teal-100 bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-800">
              ✔ 1000+ students trained with strong placement outcomes
            </span>
            <span className="rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-800">
              ✔ 12+ modern labs for practical training
            </span>
          </div>

          {/* Mission + Why Choose */}
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <InfoCard
              title="Our Mission"
              subtitle="What we aim to deliver"
              items={[
                "High-quality paramedical education",
                "Strong practical & clinical training",
                "Career-oriented curriculum & guidance",
                "Professional discipline & ethics",
              ]}
            />
            <InfoCard
              title="Why Choose LIPMT?"
              subtitle="What makes us different"
              items={[
                "Industry-oriented learning approach",
                "Experienced faculty & mentoring",
                "12+ labs with hands-on practical sessions",
                "Student support & exam guidance",
              ]}
            />
          </div>
        </section>

        {/* ===================== */}
        {/* TIMELINE */}
        {/* ===================== */}
        <section className="mt-10 rounded-3xl border border-sky-100 bg-white p-8 shadow-[0_12px_40px_rgba(2,132,199,0.08)]">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <div className="text-sm font-semibold text-sky-700">Journey</div>
              <h2 className="mt-2 text-3xl font-extrabold">Our 10+ Years Timeline</h2>
              <p className="mt-2 text-slate-600">
                A quick look at how LIPMT has grown with a focus on practical paramedical training.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <TimelineCard
              year="Phase 1"
              title="Foundation & Setup"
              desc="Institute setup with a focus on quality teaching, discipline, and student support."
            />
            <TimelineCard
              year="Phase 2"
              title="Lab Strengthening"
              desc="Upgraded equipment, demo models, and structured practical sessions across 12+ labs."
            />
            <TimelineCard
              year="Phase 3"
              title="Career & Placement Focus"
              desc="Career-oriented training, interview preparation, and strong placement guidance for students."
            />
          </div>
        </section>

        {/* ===================== */}
        {/* COURSES PREVIEW */}
        {/* ===================== */}
        <section className="mt-10 rounded-3xl border border-sky-100 bg-white p-8 shadow-[0_12px_40px_rgba(2,132,199,0.08)]">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <div className="text-sm font-semibold text-sky-700">Programs</div>
              <h2 className="mt-2 text-3xl font-extrabold">Our Paramedical Courses</h2>
              <p className="mt-2 text-slate-600">
                Click any course to view duration, syllabus highlights & career options.
              </p>
            </div>

            <Link
              to="/courses"
              className="rounded-xl bg-sky-600 text-white px-4 py-2 text-sm font-semibold hover:bg-sky-700 transition"
            >
              View All Courses →
            </Link>
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
        </section>
      </div>
    </div>
  );
}

/* ===================== */
/* Small UI Components   */
/* ===================== */

function Badge({ children }) {
  return (
    <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
      {children}
    </span>
  );
}

function LogoPill({ children }) {
  return (
    <span className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-[0_8px_20px_rgba(15,23,42,0.05)]">
      {children}
    </span>
  );
}

function StatCard({ title, value, sub }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_12px_24px_rgba(15,23,42,0.06)]">
      <div className="text-xs font-semibold text-slate-500">{title}</div>
      <div className="mt-2 text-2xl font-extrabold text-slate-900">{value}</div>
      <div className="mt-1 text-sm text-slate-600">{sub}</div>
    </div>
  );
}

function InfoCard({ title, subtitle, items }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_12px_24px_rgba(15,23,42,0.06)]">
      <h3 className="text-xl font-extrabold text-slate-900">{title}</h3>
      {subtitle ? <p className="mt-1 text-sm text-slate-600">{subtitle}</p> : null}

      <ul className="mt-5 space-y-3 text-sm text-slate-700">
        {items.map((it) => (
          <li key={it} className="flex gap-3">
            <span className="mt-1.5 h-2 w-2 rounded-full bg-sky-600" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TimelineCard({ year, title, desc }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_12px_24px_rgba(15,23,42,0.06)]">
      <div className="inline-flex items-center rounded-full border border-sky-100 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-800">
        {year}
      </div>
      <h3 className="mt-4 text-lg font-extrabold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-600 leading-relaxed">{desc}</p>
    </div>
  );
}

function CourseCard({ title, duration, eligibility, to }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_10px_26px_rgba(15,23,42,0.06)] hover:shadow-[0_14px_34px_rgba(2,132,199,0.14)] transition">
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
        className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-sky-600 text-white px-4 py-2 text-sm font-semibold hover:bg-sky-700 transition"
      >
        View Details →
      </Link>
    </div>
  );
}