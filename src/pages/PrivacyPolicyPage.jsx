// src/pages/PrivacyPolicyPage.jsx
export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-white">
      <div className="mx-auto max-w-4xl px-5 py-14">
        <h1 className="text-4xl font-extrabold text-slate-900">Privacy Policy</h1>
        <p className="mt-4 text-slate-700">
          LIPMT respects your privacy. This policy explains how we collect, use, and protect your data.
        </p>

        <div className="mt-8 space-y-6 rounded-3xl border border-slate-200 bg-white p-6">
          <section>
            <h2 className="text-xl font-extrabold text-slate-900">1) Information We Collect</h2>
            <ul className="mt-2 list-disc pl-5 text-slate-700 space-y-2">
              <li>Name, phone number, city (when you submit enquiry/enroll forms)</li>
              <li>Basic device/browser data (for website performance & security)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-slate-900">2) How We Use Information</h2>
            <ul className="mt-2 list-disc pl-5 text-slate-700 space-y-2">
              <li>To contact you for admission, fees, batches, and counselling</li>
              <li>To improve our services and user experience</li>
              <li>To prevent fraud/spam and maintain security</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-slate-900">3) Sharing of Information</h2>
            <p className="mt-2 text-slate-700">
              We do not sell your data. We may share your details only with our internal team
              for admission support or as required by law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-slate-900">4) Data Security</h2>
            <p className="mt-2 text-slate-700">
              We take reasonable security measures to protect your data, but no method of transmission
              over the internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-slate-900">5) Cookies</h2>
            <p className="mt-2 text-slate-700">
              We may use cookies for basic analytics and improving website experience.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-slate-900">6) Contact</h2>
            <p className="mt-2 text-slate-700">
              Questions? Email us at <b>info@lipmt.in</b>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}