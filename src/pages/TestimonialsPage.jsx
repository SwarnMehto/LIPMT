import { useEffect, useMemo, useRef, useState } from "react";
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
      "Very professional environment and disciplined training. The OT Technology course gave me strong confidence.",
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

/** ✅ Premium Star Picker:
 * - tap/click any star (1-5)
 * - hover preview (desktop)
 * - works on mobile tap
 */
function StarPicker({ value, onChange }) {
  const [hover, setHover] = useState(0);
  const v = clampRating(value);
  const show = hover ? clampRating(hover) : v;

  return (
    <div className="flex items-center gap-3">
      <div
        className="flex items-center"
        onMouseLeave={() => setHover(0)}
        role="radiogroup"
        aria-label="Rating"
      >
        {[1, 2, 3, 4, 5].map((s) => {
          const active = s <= show;
          return (
            <button
              key={s}
              type="button"
              onClick={() => onChange(s)}
              onMouseEnter={() => setHover(s)}
              className="px-1"
              aria-label={`${s} star`}
              title={`${s} star`}
            >
              <span className={active ? "text-yellow-500 text-3xl" : "text-slate-300 text-3xl"}>
                ★
              </span>
            </button>
          );
        })}
      </div>

      <div className="text-sm font-semibold text-slate-700">{v} / 5</div>
    </div>
  );
}

function cx(...a) {
  return a.filter(Boolean).join(" ");
}

export default function TestimonialsPage() {
  // ✅ ensure initial items have createdAt too
  const boot = useMemo(
    () =>
      initialTestimonials.map((t) => ({
        ...t,
        createdAt: Date.now() - Math.floor(Math.random() * 10000000),
      })),
    []
  );

  const [testimonials, setTestimonials] = useState(boot);

  // ✅ Modal
  const [reviewOpen, setReviewOpen] = useState(false);

  // Form
  const [reviewType, setReviewType] = useState("Student");
  const [reviewName, setReviewName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // ✅ Filter + Sort
  const [tab, setTab] = useState("All"); // All | Student | Parent
  const [sortBy, setSortBy] = useState("newest"); // newest | highest

  // ✅ IMPORTANT FIX: hydration guard (prevents overwrite on refresh)
  const hydratedRef = useRef(false);

  // ✅ Load from LocalStorage on first mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const clean = parsed
            .map((t) => ({
              name: String(t?.name || "").trim(),
              type: t?.type === "Parent" ? "Parent" : "Student",
              rating: clampRating(t?.rating ?? 5),
              review: String(t?.review || "").trim(),
              createdAt: typeof t?.createdAt === "number" ? t.createdAt : Date.now(),
            }))
            .filter((t) => t.name && t.review);

          if (clean.length > 0) setTestimonials(clean);
        }
      }
    } catch (e) {
      // ignore
    } finally {
      hydratedRef.current = true; // ✅ now allow saving
    }
  }, []);

  // ✅ Save to LocalStorage whenever testimonials change (AFTER hydration)
  useEffect(() => {
    if (!hydratedRef.current) return; // ✅ prevents overwrite bug
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(testimonials));
    } catch (e) {
      // ignore
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

    const breakdown = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    testimonials.forEach((t) => {
      breakdown[clampRating(t.rating)] += 1;
    });

    return { total, students, parents, avg: Number(avg.toFixed(1)), breakdown };
  }, [testimonials]);

  const visibleTestimonials = useMemo(() => {
    let list = [...testimonials];

    if (tab !== "All") list = list.filter((t) => t.type === tab);

    if (sortBy === "highest") {
      list.sort((a, b) => clampRating(b.rating) - clampRating(a.rating));
    } else {
      list.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    }

    return list;
  }, [testimonials, tab, sortBy]);

  function handleSubmit(e) {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    const name = reviewName.trim();
    const text = reviewText.trim();

    if (!name || name.length < 2) {
      setErrorMsg("❌ Name minimum 2 characters hona chahiye.");
      return;
    }

    // ✅ NO minimum length now (sirf empty block nahi hona chahiye)
    if (!text) {
      setErrorMsg("❌ Please write your review.");
      return;
    }

    const newReview = {
      name,
      type: reviewType,
      rating: clampRating(reviewRating),
      review: text,
      createdAt: Date.now(),
    };

    setTestimonials((prev) => [newReview, ...prev]);

    setReviewName("");
    setReviewText("");
    setReviewType("Student");
    setReviewRating(5);

    setSuccessMsg("✅ Thank you! Your review has been added.");
    setTimeout(() => setSuccessMsg(""), 2500);

    setTimeout(() => setReviewOpen(false), 400);
  }

  function clearAllSavedReviews() {
    const ok = window.confirm(
      "Are you sure? This will remove all saved reviews from this device."
    );
    if (!ok) return;
    localStorage.removeItem(STORAGE_KEY);
    setTestimonials(boot);
  }

  // ✅ ESC close modal
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setReviewOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const maxCount = Math.max(1, ...Object.values(stats.breakdown || { 1: 1 }));

  const mapSrc =
    "https://www.google.com/maps?q=LAL%20INSTITUTE%20OF%20PARA%20MEDICAL%20TECHNOLOGY&output=embed";

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-sky-50 via-white to-teal-50 text-slate-900 overflow-hidden">
      {/* ✅ Background Watermark */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
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

      {/* ✅ REVIEW MODAL */}
      {reviewOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setReviewOpen(false);
          }}
        >
          <div className="w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between bg-amber-500 px-6 py-4">
              <div>
                <div className="text-lg font-extrabold text-slate-900">Write a Review</div>
                <div className="text-xs font-semibold text-slate-900/80">
                  Lal Institute of Paramedical Technology
                </div>
              </div>
              <button
                onClick={() => setReviewOpen(false)}
                className="rounded-xl bg-white/30 px-3 py-1 text-sm font-extrabold text-slate-900 hover:bg-white/40"
                type="button"
              >
                ✕ Close
              </button>
            </div>

            <div className="p-6">
              {successMsg && (
                <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800">
                  {successMsg}
                </div>
              )}
              {errorMsg && (
                <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="grid gap-3 md:grid-cols-3">
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

                <div className="md:col-span-3">
                  <label className="text-xs font-semibold text-slate-700">Rating</label>
                  <div className="mt-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <StarPicker value={reviewRating} onChange={setReviewRating} />
                    <div className="mt-1 text-xs text-slate-500">
                      Tip: Stars par tap/click karke 1-5 rating select karo.
                    </div>
                  </div>
                </div>

                <div className="md:col-span-3">
                  <label className="text-xs font-semibold text-slate-700">Your Review</label>
                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Write your experience..."
                    className="mt-2 min-h-[130px] w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-sky-400"
                    required
                  />
                </div>

                <div className="md:col-span-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-xs text-slate-500">
                   
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
          </div>
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-14">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-4xl font-extrabold">Testimonials</h1>
            <p className="mt-3 text-slate-600">Student success stories and feedback.</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setReviewOpen(true)}
              className="rounded-xl bg-sky-600 px-5 py-3 text-sm font-extrabold text-white hover:bg-sky-700 transition"
              type="button"
            >
              ✍️ Write a Review
            </button>
            <button
              onClick={clearAllSavedReviews}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold hover:bg-slate-50"
              type="button"
            >
              Reset Reviews
            </button>
          </div>
        </div>

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

        {/* Breakdown + filters */}
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_26px_rgba(15,23,42,0.06)]">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-lg font-extrabold">Rating Breakdown</div>
              <div className="text-sm text-slate-600">Overall distribution of ratings</div>
            </div>

            <div className="flex flex-wrap gap-2">
              {["All", "Student", "Parent"].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTab(t)}
                  className={cx(
                    "rounded-full px-4 py-2 text-sm font-semibold border transition",
                    tab === t
                      ? "bg-sky-600 text-white border-sky-600"
                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                  )}
                >
                  {t === "All" ? "All" : t === "Student" ? "Students" : "Parents"}
                </button>
              ))}
            </div>

            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold outline-none focus:border-sky-400"
              >
                <option value="newest">Newest</option>
                <option value="highest">Highest rating</option>
              </select>
            </div>
          </div>

          <div className="mt-5 grid gap-2">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = stats.breakdown?.[star] || 0;
              const pct = stats.total ? Math.round((count / stats.total) * 100) : 0;
              const w = Math.max(4, Math.round((count / maxCount) * 100));
              return (
                <div key={star} className="flex items-center gap-3">
                  <div className="w-16 text-sm font-semibold">{star}★</div>
                  <div className="flex-1 rounded-full bg-slate-100 h-3 overflow-hidden">
                    <div className="h-3 bg-sky-500" style={{ width: `${w}%` }} />
                  </div>
                  <div className="w-20 text-right text-sm text-slate-600">
                    {count} ({pct}%)
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Reviews grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleTestimonials.map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow hover:shadow-lg transition"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-bold">{item.name}</h3>
                <span
                  className={cx(
                    "text-xs font-semibold px-3 py-1 rounded-full border",
                    item.type === "Parent"
                      ? "text-teal-800 bg-teal-50 border-teal-100"
                      : "text-sky-800 bg-sky-50 border-sky-100"
                  )}
                >
                  {item.type}
                </span>
              </div>

              <Stars value={item.rating} />

              <p className="mt-3 text-sm text-slate-600 leading-relaxed">{item.review}</p>

              {!!item.createdAt && (
                <div className="mt-4 text-xs text-slate-400">
                  {new Date(item.createdAt).toLocaleDateString()} •{" "}
                  {new Date(item.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Google Map section */}
        <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_26px_rgba(15,23,42,0.06)]">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-xl font-extrabold">Visit Us</div>
              <div className="text-sm text-slate-600">
                Find Lal Institute of Para Medical Technology on Google Maps
              </div>

              <div className="mt-2 text-sm font-semibold text-slate-800">
                Review us on Google Map —{" "}
                <span className="text-sky-700">Best Paramedical Institute in India</span>
              </div>
            </div>

            <button
              onClick={() => setReviewOpen(true)}
              className="rounded-xl bg-amber-500 px-4 py-2 text-sm font-extrabold text-slate-900 hover:bg-amber-400 transition"
              type="button"
            >
              ⭐ Add Review
            </button>
          </div>

          <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200">
            <iframe
              title="LIPMT Location"
              src={mapSrc}
              width="100%"
              height="360"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ border: 0 }}
            />
          </div>
        </div>
      </div>

      <div className="relative z-10">
        <SiteFooter />
      </div>
    </div>
  );
}