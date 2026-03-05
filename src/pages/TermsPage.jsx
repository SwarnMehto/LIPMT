// src/pages/TermsPage.jsx
export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-white">
      <div className="mx-auto max-w-4xl px-5 py-14">
        <h1 className="text-4xl font-extrabold text-slate-900">Terms & Conditions</h1>
        <p className="mt-4 text-slate-700">
          By using this website, you agree to the following terms and conditions.
        </p>

        <div className="mt-8 space-y-6 rounded-3xl border border-slate-200 bg-white p-6">
          <section>
            <h2 className="text-xl font-extrabold text-slate-900">1) Website Use</h2>
            <p className="mt-2 text-slate-700">
              You agree to use this website for lawful purposes only and not to misuse, hack,
              or disrupt website services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-slate-900">2) Course Information</h2>
            <p className="mt-2 text-slate-700">
              Course content, eligibility, fees, and duration may change without notice.
              Final confirmation is provided by the admission office.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-slate-900">3) Intellectual Property</h2>
            <p className="mt-2 text-slate-700">
              All content, logos, graphics, and materials on this website belong to LIPMT.
              Unauthorized copying or reuse is prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-slate-900">4) Limitation of Liability</h2>
            <p className="mt-2 text-slate-700">
              LIPMT is not liable for any loss or damage arising from use of this website
              or reliance on information provided here.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-slate-900">5) Changes</h2>
            <p className="mt-2 text-slate-700">
              We may update these terms anytime. Continued use of the website means you accept updates.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-slate-900">6) Contact</h2>
            <p className="mt-2 text-slate-700">
              For queries, contact <b>info@lipmt.in</b>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}