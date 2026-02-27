// src/pages/ContactPage.jsx
import { useState } from "react";
import EnrollModal from "../components/EnrollModal";

export default function ContactPage() {
  const [enrollOpen, setEnrollOpen] = useState(false);

  const mapSrc =
    "https://www.google.com/maps?q=LAL%20INSTITUTE%20OF%20PARA%20MEDICAL%20TECHNOLOGY&output=embed";

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-white">
      <div className="mx-auto max-w-6xl px-5 py-14">
        {/* Header */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center rounded-full border border-sky-200 bg-white px-3 py-1 text-xs font-semibold text-sky-700">
            Contact
          </div>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900">
            Visit campus or request a callback
          </h1>
          <p className="mt-3 text-slate-600">
            Get admission support, fees details, eligibility & batch timings.
          </p>
        </div>

        {/* Main Grid */}
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {/* Left: Contact Card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm font-semibold text-slate-600">Institute</div>
                <div className="mt-1 text-lg font-extrabold text-slate-900">
                  Lal Institute of Paramedical Technology (LIPMT)
                </div>
                <div className="mt-2 text-sm text-slate-600">
                  Centre 2759, Hansa Puri Road, Tri Nagar, Delhi-110035
                  <div className="text-slate-500">(Near Punjab National Bank)</div>
                </div>
              </div>

              <div className="rounded-2xl bg-sky-50 px-4 py-3 text-center">
                <div className="text-xs font-semibold text-slate-600">Helpline</div>
                <div className="mt-1 text-sm font-extrabold text-slate-900">
                  +91 9811343520
                </div>
              </div>
            </div>

            {/* Info Rows */}
            <div className="mt-6 grid gap-3">
              <InfoRow label="Phone" value="+91 9811343520 / +91 9355342520" />
              <InfoRow label="Email" value="info@lipmt.in" />
              <InfoRow label="Landline" value="011-41415029" />
              <InfoRow label="Hours" value="Mon–Sat • 10:00 AM – 6:00 PM" />
            </div>

            {/* Buttons */}
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => setEnrollOpen(true)}
                className="rounded-xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-sky-600/20 hover:bg-sky-700 active:scale-[0.99] transition"
              >
                Enroll / Callback
              </button>

              <a
                href="mailto:info@lipmt.in?subject=Admission%20Enquiry%20-%20LIPMT&body=Hello%20LIPMT%20Team,%0A%0AI%20want%20details%20about%20admission%20(Fees,%20Batch%20Timing,%20Eligibility,%20Documents).%0A%0ACourse:%20%0AName:%20%0AMobile:%20%0ACity:%20%0A%0AThanks"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50 transition"
              >
                ✉ Email
              </a>

              <a
                href="https://wa.me/919811343520?text=Hello%20LIPMT%20Team,%20I%20want%20admission%20details%20(Fees,%20Eligibility,%20Course%20info)."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50 transition"
              >
                💬 WhatsApp
              </a>
            </div>

            {/* Quick action chips */}
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <QuickAction
                title="Call Now"
                desc="Direct admission helpline"
                href="tel:+919811343520"
              />
              <QuickAction
                title="Get Directions"
                desc="Open Google Maps"
                href="https://www.google.com/maps/search/?api=1&query=LAL%20INSTITUTE%20OF%20PARA%20MEDICAL%20TECHNOLOGY"
                newTab
              />
            </div>
          </div>

          {/* Right: Map Card */}
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 p-5">
              <div className="text-sm font-semibold text-slate-700">Location</div>
              <div className="mt-1 text-sm text-slate-600">
                Find us on Google Maps — Tri Nagar, Delhi
              </div>
            </div>

            <div className="h-[420px] w-full">
              <iframe
                title="Google Map"
                src={mapSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modal (same) */}
      <EnrollModal open={enrollOpen} onClose={() => setEnrollOpen(false)} />
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3">
      <div className="text-sm font-semibold text-slate-700">{label}</div>
      <div className="text-sm text-slate-700">{value}</div>
    </div>
  );
}

function QuickAction({ title, desc, href, newTab = false }) {
  return (
    <a
      href={href}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noreferrer" : undefined}
      className="rounded-2xl border border-slate-200 bg-white p-4 hover:bg-slate-50 transition"
    >
      <div className="text-sm font-extrabold text-slate-900">{title}</div>
      <div className="mt-1 text-xs text-slate-600">{desc}</div>
    </a>
  );
}