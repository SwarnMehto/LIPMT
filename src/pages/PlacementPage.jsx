import { CheckCircle2, Briefcase, Clock } from "lucide-react";

export default function PlacementPage() {
  const points = [
    "1000+ Students Trained (overall)",
    "Internship / Hospital exposure support (as per availability)",
    "Resume / interview guidance",
    "Placement guidance for eligible students",
    "Practical focused training for job readiness",
    "Support in connecting with labs & diagnostic centers",
  ];

  const stats = [
    { value: "1000+", label: "Students Trained" },
    { value: "12+", label: "Practical Labs" },
    { value: "10+", label: "Years Experience" },
    { value: "100%", label: "Guidance Support" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-slate-50 text-slate-900">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="rounded-3xl border border-sky-100 bg-white p-8 shadow-[0_12px_40px_rgba(2,132,199,0.08)]">
          <div className="text-sm font-semibold text-sky-700">Services</div>
          <h1 className="mt-2 text-4xl md:text-5xl font-extrabold tracking-tight">
            Placement Guidance
          </h1>

          <p className="mt-4 max-w-3xl text-slate-600">
            Lal Institute of Paramedical Technology provides career guidance and placement support.
            Our focus is practical training + interview readiness to help students become job-ready.
          </p>

          {/* Stats */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="text-2xl font-extrabold text-slate-900">{s.value}</div>
                <div className="mt-1 text-sm font-semibold text-slate-600">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Highlights */}
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-sky-50 p-2">
                  <Briefcase className="h-5 w-5 text-sky-700" />
                </div>
                <div className="text-base font-extrabold">Career Support</div>
              </div>
              <p className="mt-3 text-sm text-slate-600">
                Guidance for job roles, work areas, and building confidence for lab/hospital workflow.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-emerald-50 p-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-700" />
                </div>
                <div className="text-base font-extrabold">Practical First</div>
              </div>
              <p className="mt-3 text-sm text-slate-600">
                Practical-based learning and skill training to match real diagnostic lab needs.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-amber-50 p-2">
                  <Clock className="h-5 w-5 text-amber-700" />
                </div>
                <div className="text-base font-extrabold">Guided Process</div>
              </div>
              <p className="mt-3 text-sm text-slate-600">
                Interview guidance + resume support + internship/placement assistance (as applicable).
              </p>
            </div>
          </div>

          {/* Bullet points */}
          <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <div className="text-lg font-extrabold">What we support</div>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {points.map((p) => (
                <div key={p} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600" />
                  <div className="text-sm font-semibold text-slate-700">{p}</div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href="https://wa.me/918700116436?text=Hi%20Lal%20Institute,%20I%20want%20placement%20details."
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto rounded-xl bg-sky-600 px-6 py-3 text-center text-sm font-extrabold text-white hover:bg-sky-700"
            >
              WhatsApp for Placement Details
            </a>
            <a
              href="/contact"
              className="w-full sm:w-auto rounded-xl border border-slate-300 bg-white px-6 py-3 text-center text-sm font-extrabold text-slate-900 hover:bg-slate-50"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}