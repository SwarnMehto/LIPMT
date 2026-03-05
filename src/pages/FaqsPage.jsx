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

  // ⭐ SEO + CONVERSION (Paramedical niche optimized)
  {
    q: "Paramedical course karne ke baad job opportunities kya hoti hain?",
    a: "Paramedical courses complete karne ke baad students hospitals, diagnostic labs, clinics, pathology labs aur healthcare centers me job opportunities paa sakte hain. Common roles me Lab Technician, ECG Technician, OT Assistant, Radiology Technician aur Dialysis Technician shamil hote hain.",
  },
  {
    q: "Kya institute practical training provide karta hai?",
    a: "Haan, students ko regular lab practicals, medical equipment training aur clinical workflow exposure diya jata hai taaki real hospital environment ka experience mile.",
  },
  {
    q: "Paramedical course ke baad salary kitni ho sakti hai?",
    a: "Entry level par salary generally ₹12,000 se ₹25,000 per month tak ho sakti hai. Experience, skills aur specialization ke saath growth aur salary improve hoti hai.",
  },
  {
    q: "Kya paramedical field me career secure hai?",
    a: "Healthcare industry me trained paramedical professionals ki demand consistently rehti hai. Hospitals, labs aur healthcare facilities me skilled technicians ki requirement hoti hai.",
  },
  {
    q: "Course complete hone ke baad placement support milta hai?",
    a: "Institute students ko placement guidance, interview preparation aur opportunities ke liye support provide karta hai. Job guarantee nahi hoti, final selection employer aur student performance par depend karta hai.",
  },
];

export default function FaqsPage() {
  // ✅ FAQ Schema for Google (JSON-LD)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-white">
      {/* ✅ SEO: FAQ Schema (Google Rich Results) */}
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>

      <div className="mx-auto max-w-4xl px-5 py-14">
        <h1 className="text-4xl font-extrabold text-slate-900">FAQs</h1>

        <p className="mt-4 text-slate-700">
          Admission, fees, batches aur paramedical courses se related common questions.
        </p>

        {/* ✅ Trust Highlight Box (Conversion booster) */}
        <div className="mt-6 rounded-2xl border border-sky-100 bg-sky-50 px-5 py-4 text-sm text-slate-800 shadow-sm">
          <span className="font-semibold">Need help?</span> Course, fees ya admission se related
          doubt ho to WhatsApp ya helpline par contact karein.
        </div>

        <div className="mt-8 space-y-4">
          {faqs.map((item, idx) => (
            <details
              key={idx}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <summary className="cursor-pointer text-lg font-bold text-slate-900 flex items-center justify-between">
                {item.q}
                <span className="ml-4 text-sky-600 group-open:rotate-90 transition">▶</span>
              </summary>
              <p className="mt-3 text-slate-700 leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}