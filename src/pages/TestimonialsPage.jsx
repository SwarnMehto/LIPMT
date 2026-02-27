import SiteFooter from "../components/SiteFooter";

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-teal-50 text-slate-900">
      <div className="mx-auto max-w-7xl px-5 py-14">
        <h1 className="text-4xl font-extrabold">Testimonials</h1>
        <p className="mt-3 text-slate-600">
          Student success stories and feedback.
        </p>

        {/* ✅ Your existing testimonials content stays here */}
      </div>

      <SiteFooter />
    </div>
  );
}