import { Download, FileText } from "lucide-react";

export default function BrochurePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-teal-50 text-slate-900">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="rounded-3xl border border-sky-100 bg-white p-8 shadow-[0_12px_40px_rgba(2,132,199,0.10)]">
          <div className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-4 py-2 text-sm font-semibold text-sky-700">
            <FileText className="h-4 w-4" />
            Admissions Open • 2026–27
          </div>

          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight">
            Download Brochure
            <span className="text-sky-600">.</span>
          </h1>

          <p className="mt-4 max-w-3xl text-slate-700 leading-relaxed">
            Get complete details about courses, clinical exposure, facilities, eligibility,
            admission process, and contact information in a single PDF brochure.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="/brochure.pdf"
              download
              className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-3 text-white font-semibold shadow hover:bg-sky-700 transition"
            >
              <Download className="h-5 w-5" />
              Download Brochure (PDF)
            </a>

            <a
              href="/brochure.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-sky-200 bg-white px-5 py-3 font-semibold text-sky-700 hover:bg-sky-50 transition"
            >
              Preview in New Tab
            </a>
          </div>

          <div className="mt-10 rounded-2xl overflow-hidden border border-sky-100 bg-sky-50">
            <div className="flex items-center justify-between px-4 py-3 border-b border-sky-100 bg-white">
              <div className="text-sm font-semibold text-slate-700">Brochure Preview</div>
              <div className="text-xs text-slate-500">If preview not visible, click download.</div>
            </div>

            <div className="h-[75vh]">
              <iframe
                title="Brochure Preview"
                src="/brochure.pdf"
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}