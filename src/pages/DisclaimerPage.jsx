// src/pages/DisclaimerPage.jsx
export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-white">
      <div className="mx-auto max-w-4xl px-5 py-14">
        <h1 className="text-4xl font-extrabold text-slate-900">Disclaimer</h1>
        <p className="mt-4 text-slate-700">
          This website is operated by Lal Institute of Paramedical Technology (LIPMT).
          The information provided on this website is for general informational purposes only.
        </p>

        <div className="mt-8 space-y-6 rounded-3xl border border-slate-200 bg-white p-6">
          <section>
            <h2 className="text-xl font-extrabold text-slate-900">1) Accuracy of Information</h2>
            <p className="mt-2 text-slate-700">
              We try to keep information accurate and updated, however LIPMT makes no warranties
              of any kind about completeness, accuracy, reliability, suitability, or availability.
              Course details, fees, batches, eligibility, and placement support may change.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-slate-900">2) Admission & Fees</h2>
            <p className="mt-2 text-slate-700">
              Admission is subject to eligibility verification, seat availability, and institute policies.
              For the latest fee structure and batch timing, please contact the admission team.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-slate-900">3) Placement / Job Assistance</h2>
            <p className="mt-2 text-slate-700">
              Placement support is guidance/assistance based on opportunities available.
              We do not guarantee a job/placement. Final selection depends on employer requirements
              and student performance.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-slate-900">4) External Links</h2>
            <p className="mt-2 text-slate-700">
              This website may contain links to external websites. We do not control those sites and
              are not responsible for their content or privacy practices.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-slate-900">5) Contact</h2>
            <p className="mt-2 text-slate-700">
              For any clarification, please contact us at <b>info@lipmt.in</b> or call the helpline.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}