// src/pages/FaqsPage.jsx
const faqs = [
  {
    q: "Admission process kya hai?",
    a: "Aap enquiry/enroll form submit kar sakte hain ya helpline par call kar sakte hain. Eligibility verify hone ke baad admission confirm hota hai.",
  },
  {
    q: "Fees structure kaise milega?",
    a: "Fees course-to-course vary karti hai. Latest fees ke liye admission helpline ya WhatsApp par message karein.",
  },
  {
    q: "Batch timings kya hoti hain?",
    a: "Batch timings course aur availability par depend karti hain. Counselling ke time confirm ho jati hain.",
  },
  {
    q: "Placement guaranteed hai?",
    a: "Placement support/guidance diya jata hai, but job guarantee nahi hoti. Final selection employer aur student performance par depend karta hai.",
  },
  {
    q: "Eligibility kya hai?",
    a: "Diploma/degree courses me generally 10+2 (Science preferred) hota hai. Certificate courses me 10th/10+2 acceptable ho sakta hai.",
  },
];

export default function FaqsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-white">
      <div className="mx-auto max-w-4xl px-5 py-14">
        <h1 className="text-4xl font-extrabold text-slate-900">FAQs</h1>
        <p className="mt-4 text-slate-700">
          Admission, fees, batches aur courses se related common questions.
        </p>

        <div className="mt-8 space-y-4">
          {faqs.map((item, idx) => (
            <details
              key={idx}
              className="rounded-2xl border border-slate-200 bg-white p-5"
            >
              <summary className="cursor-pointer text-lg font-bold text-slate-900">
                {item.q}
              </summary>
              <p className="mt-3 text-slate-700">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}