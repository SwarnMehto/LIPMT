import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Phone, Mail } from "lucide-react";
import { COURSES } from "../siteData.js";

export default function EnrollModal({ open, onClose, presetCourse = "" }) {
  const [status, setStatus] = useState("idle");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    course: presetCourse,
    city: "",
    msg: "",
  });

  useEffect(() => {
    if (open) setForm((p) => ({ ...p, course: presetCourse || p.course }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, presetCourse]);

  async function submit() {
    try {
      setStatus("loading");
      await new Promise((r) => setTimeout(r, 700)); // replace with API later
      setStatus("ok");
      setForm({ name: "", phone: "", email: "", course: "", city: "", msg: "" });
      setTimeout(() => onClose(), 900);
    } catch {
      setStatus("err");
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
          >
            <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-zinc-100 p-5">
                <div>
                  <div className="text-lg font-semibold text-zinc-900">Enroll Now</div>
                  <div className="text-sm text-zinc-500">Fill details — we’ll call you back.</div>
                </div>
                <button
                  onClick={onClose}
                  className="rounded-xl border border-zinc-200 p-2 hover:bg-zinc-50"
                  aria-label="Close"
                >
                  <X className="h-5 w-5 text-zinc-700" />
                </button>
              </div>

              <form
                className="space-y-4 p-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  submit();
                }}
              >
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <label className="block">
                    <div className="mb-1 text-sm font-medium text-zinc-700">Full Name</div>
                    <input
                      className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-zinc-900/10"
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                      required
                    />
                  </label>

                  <label className="block">
                    <div className="mb-1 text-sm font-medium text-zinc-700">Mobile</div>
                    <div className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2 focus-within:ring-2 focus-within:ring-zinc-900/10">
                      <Phone className="h-4 w-4 text-zinc-500" />
                      <input
                        className="w-full bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-400"
                        placeholder="10-digit number"
                        value={form.phone}
                        onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                        inputMode="numeric"
                        pattern="[0-9]{10}"
                        required
                      />
                    </div>
                  </label>
                </div>

                <label className="block">
                  <div className="mb-1 text-sm font-medium text-zinc-700">Email (optional)</div>
                  <div className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2 focus-within:ring-2 focus-within:ring-zinc-900/10">
                    <Mail className="h-4 w-4 text-zinc-500" />
                    <input
                      className="w-full bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-400"
                      placeholder="you@email.com"
                      value={form.email}
                      onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                      type="email"
                    />
                  </div>
                </label>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <label className="block">
                    <div className="mb-1 text-sm font-medium text-zinc-700">Course</div>
                    <select
                      className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-zinc-900/10"
                      value={form.course}
                      onChange={(e) => setForm((p) => ({ ...p, course: e.target.value }))}
                      required
                    >
                      <option value="" disabled>
                        Select a course
                      </option>
                      {COURSES.map((c) => (
                        <option key={c.title} value={c.title}>
                          {c.title}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="block">
                    <div className="mb-1 text-sm font-medium text-zinc-700">City</div>
                    <input
                      className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-zinc-900/10"
                      placeholder="Delhi"
                      value={form.city}
                      onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))}
                      required
                    />
                  </label>
                </div>

                <label className="block">
                  <div className="mb-1 text-sm font-medium text-zinc-700">Message (optional)</div>
                  <textarea
                    className="h-24 w-full resize-none rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-zinc-900/10"
                    placeholder="Any query..."
                    value={form.msg}
                    onChange={(e) => setForm((p) => ({ ...p, msg: e.target.value }))}
                  />
                </label>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full rounded-2xl bg-zinc-900 px-4 py-3 text-sm font-semibold text-white shadow hover:bg-zinc-800 disabled:opacity-60"
                >
                  {status === "loading" ? "Submitting..." : "Submit Enquiry"}
                </button>

                {status === "ok" && (
                  <div className="rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800">
                    Submitted ✅ We’ll contact you shortly.
                  </div>
                )}
                {status === "err" && (
                  <div className="rounded-xl bg-rose-50 p-3 text-sm text-rose-800">
                    Error ❌ Try again.
                  </div>
                )}

                <div className="text-xs text-zinc-500">
                  By submitting you agree to be contacted by phone/WhatsApp.
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}