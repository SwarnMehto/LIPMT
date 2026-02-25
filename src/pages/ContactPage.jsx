import { BRAND } from "../siteData.js";

export default function ContactPage({ onEnroll }) {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <h1 className="text-3xl font-extrabold text-zinc-900">Contact</h1>

      <div className="mt-6 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="text-sm text-zinc-600">
          <div><b>Phone:</b> {BRAND.phone}</div>
          <div><b>Email:</b> {BRAND.email}</div>
          <div><b>Address:</b> {BRAND.address}</div>
        </div>

        <button
          onClick={() => onEnroll("")}
          className="mt-6 rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white hover:bg-zinc-800"
        >
          Open Enroll Form
        </button>
      </div>
    </div>
  );
}