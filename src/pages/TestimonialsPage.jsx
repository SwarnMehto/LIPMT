import { useEffect, useMemo, useState } from "react";
import SiteFooter from "../components/SiteFooter";
import logo from "../assets/logo.png";

const STORAGE_KEY = "lipmt_testimonials_v1";

const initialTestimonials = [
  {
    name: "Rahul Sharma",
    type: "Student",
    rating: 5,
    review:
      "LIPMT provided excellent practical exposure. Faculty support and lab infrastructure helped me secure a hospital job within months.",
  },
  {
    name: "Priya Verma",
    type: "Student",
    rating: 5,
    review:
      "Very professional environment and disciplined training. The OT Technician course gave me strong confidence.",
  },
  {
    name: "Amit Kumar",
    type: "Student",
    rating: 5,
    review:
      "The ECG practical sessions were very helpful. Highly recommend this institute for paramedical courses.",
  },
  {
    name: "Sneha Gupta",
    type: "Student",
    rating: 5,
    review:
      "Supportive teachers and structured syllabus. The physiotherapy labs are well equipped.",
  },
  {
    name: "Arjun Mehta",
    type: "Student",
    rating: 5,
    review:
      "Best institute for healthcare career. I got great clinical exposure during my training.",
  },
  {
    name: "Mrs. Kavita Sharma",
    type: "Parent",
    rating: 5,
    review:
      "My son received excellent training and discipline here. The institute maintains professional standards.",
  },
  {
    name: "Mr. Rajesh Gupta",
    type: "Parent",
    rating: 5,
    review:
      "Faculty is very supportive. They focus on practical knowledge and skill development.",
  },
  {
    name: "Mrs. Anjali Verma",
    type: "Parent",
    rating: 5,
    review:
      "Safe and career-focused environment. We are very satisfied with our daughter’s progress.",
  },
];

function clampRating(n) {
  const num = Number(n);
  if (Number.isNaN(num)) return 5;
  return Math.min(5, Math.max(1, Math.round(num)));
}

function Stars({ value = 5 }) {
  const v = clampRating(value);
  return (
    <div className="mt-2 text-yellow-500 text-lg" aria-label={`${v} star rating`}>
      {"★".repeat(v)}
      <span className="text-slate-300">{"★".repeat(5 - v)}</span>
    </div>
  );
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState(initialTestimonials);

  // Form states
  const [reviewType, setReviewType] = useState("Student");
  const [reviewName, setReviewName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [successMsg, setSuccessMsg] = useState("");

  // ✅ Load from LocalStorage on first mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // sanitize
          const clean = parsed
            .map((t) => ({
              name: String(t?.name || "").trim(),
              type: t?.type === "Parent" ? "Parent" : "Student",
              rating: clampRating(t?.rating ?? 5),
              review: String(t?.review || "").trim(),
            }))
            .filter((t) => t.name && t.review);
          if (clean.length > 0) setTestimonials(clean);
        }
      }
    } catch (e) {
      // ignore corrupted storage
    }
  }, []);

  // ✅ Save to LocalStorage whenever testimonials change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(testimonials));
    } catch (e) {
      // ignore storage errors
    }
  }, [testimonials]);

  const stats = useMemo(() => {
    const total = testimonials.length;
    const students = testimonials.filter((t) => t.type === "Student").length;
    const parents = testimonials.filter((t) => t.type === "Parent").length;

    const avg =
      total === 0
        ? 0
        : testimonials.reduce((sum, t) => sum + clampRating(t.rating), 0) / total;

    return { total, students, parents, avg: Number(avg.toFixed(1)) };
  }, [testimonials]);

  function handleSubmit(e) {
    e.preventDefault();
    setSuccessMsg("");

    const name = reviewName.trim();
    const text = reviewText.trim();

    if (!name || !text) return;

    const newReview = {
      name,
      type: reviewType,
      rating: clampRating(reviewRating),
      review: text,
    };

    // Add on top (latest first)
    setTestimonials((prev) => [newReview, ...prev]);

    // Reset form
    setReviewName("");
    setReviewText("");
    setReviewType("Student");
    setReviewRating(5);

    setSuccessMsg("✅ Thank you! Your review has been added.");
    setTimeout(() => setSuccessMsg(""), 2500);
  }

  function clearAllSavedReviews() {
    const ok = window.confirm(
      "Are you sure? This will remove all saved reviews from this device."
    );
    if (!ok) return;
    localStorage.removeItem(STORAGE_KEY);
    setTestimonials(initialTestimonials);
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-sky-50 via-white to-teal-50 text-slate-900 overflow-hidden">
      {/* ✅ Background Watermark */}
      <div
  className="pointer-events-none absolute inset-0"
  style={{
    // 1) Light blue tint overlay
    // 2) Diagonal pattern
    // 3) Big centered logo watermark
    backgroundImage: `
      linear-gradient(rgba(2, 132, 199, 0.08), rgba(20, 184, 166, 0.06)),
      repeating-linear-gradient(135deg, rgba(2, 132, 199, 0.10) 0px, rgba(2, 132, 199, 0.10) 1px, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0) 18px),
      url(${logo})
    `,
    backgroundRepeat: "no-repeat, repeat, no-repeat",
    backgroundPosition: "center, center, center",
    backgroundSize: "cover, auto, 40%",
    opacity: 1,
    filter: "saturate(1.05)",
  }}
/>

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-14">
        <h1 className="text-4xl font-extrabold">Testimonials</h1>
        <p className="mt-3 text-slate-600">Student success stories and feedback.</p>

        {/* Stats */}
        <div className="mt-6 flex flex-wrap gap-2 text-sm">
          <span className="rounded-full border border-slate-200 bg-white px-4 py-2">
            Total Reviews: <b>{stats.total}</b>
          </span>
          <span className="rounded-full border border-sky-100 bg-sky-50 px-4 py-2 text-sky-800">
            Students: <b>{stats.students}</b>
          </span>
          <span className="rounded-full border border-teal-100 bg-teal-50 px-4 py-2 text-teal-800">
            Parents: <b>{stats.parents}</b>
          </span>
          <span className="rounded-full border border-amber-100 bg-amber-50 px-4 py-2 text-amber-900">
            Average Rating: <b>{stats.avg || 0}</b> / 5
          </span>
        </div>

        {/* ✅ Add Review Form */}
        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_26px_rgba(15,23,42,0.06)]">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-extrabold">Add Your Review</h2>
              <p className="mt-1 text-sm text-slate-600">
                Student / Parent can submit review. It will be saved on this device.
              </p>
            </div>
            {successMsg ? (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800">
                {successMsg}
              </div>
            ) : (
              <button
                onClick={clearAllSavedReviews}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-50"
                title="Clear saved reviews from this device"
              >
                Reset Reviews
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="mt-6 grid gap-3 md:grid-cols-3">
            {/* Type */}
            <div>
              <label className="text-xs font-semibold text-slate-700">I am a</label>
              <select
                value={reviewType}
                onChange={(e) => setReviewType(e.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-sky-400"
              >
                <option value="Student">Student</option>
                <option value="Parent">Parent</option>
              </select>
            </div>

            {/* Name */}
            <div className="md:col-span-2">
              <label className="text-xs font-semibold text-slate-700">Your Name</label>
              <input
                value={reviewName}
                onChange={(e) => setReviewName(e.target.value)}
                placeholder="Enter your name"
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-sky-400"
                required
              />
            </div>

            {/* Rating */}
            <div className="md:col-span-3">
              <label className="text-xs font-semibold text-slate-700">Rating</label>
              <div className="mt-2 grid gap-3 md:grid-cols-3">
                <select
                  value={reviewRating}
                  onChange={(e) => setReviewRating(Number(e.target.value))}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-sky-400"
                >
                  <option value={1}>★ 1 Star</option>
                  <option value={2}>★★ 2 Stars</option>
                  <option value={3}>★★★ 3 Stars</option>
                  <option value={4}>★★★★ 4 Stars</option>
                  <option value={5}>★★★★★ 5 Stars</option>
                </select>

                <div className="md:col-span-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <div className="text-xs font-semibold text-slate-700">Preview</div>
                  <Stars value={reviewRating} />
                </div>
              </div>
            </div>

            {/* Review */}
            <div className="md:col-span-3">
              <label className="text-xs font-semibold text-slate-700">Your Review</label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Write your experience..."
                className="mt-2 min-h-[110px] w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-sky-400"
                required
              />
            </div>

            <div className="md:col-span-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-xs text-slate-500">
                Tip: Reviews are saved in your browser (LocalStorage).
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white hover:bg-sky-700 transition"
              >
                ✅ Submit Review
              </button>
            </div>
          </form>
        </div>

        {/* Testimonials Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow hover:shadow-lg transition"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-bold">{item.name}</h3>
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    item.type === "Parent"
                      ? "text-teal-800 bg-teal-50 border border-teal-100"
                      : "text-sky-800 bg-sky-50 border border-sky-100"
                  }`}
                >
                  {item.type}
                </span>
              </div>

              <Stars value={item.rating} />

              <p className="mt-3 text-sm text-slate-600 leading-relaxed">{item.review}</p>
            </div>
          ))}
        </div>

        {/* More Reviews Button */}
        <div className="mt-12 text-center">
          <button className="rounded-xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white hover:bg-sky-700 transition">
            ⭐ More Reviews
          </button>
        </div>
      </div>

      <div className="relative z-10">
        <SiteFooter />
      </div>
    </div>
  );
}