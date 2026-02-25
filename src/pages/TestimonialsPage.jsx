import { TESTIMONIALS } from "../siteData.js";

export default function TestimonialsPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <h1 className="text-3xl font-extrabold text-zinc-900">Testimonials</h1>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <div key={t.name + i} className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="text-sm text-zinc-600">“{t.text}”</div>
            <div className="mt-4 text-sm font-semibold text-zinc-900">{t.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}