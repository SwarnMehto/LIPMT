import SiteFooter from "../components/SiteFooter";

export default function FacilitiesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-teal-50 text-slate-900">
      <div className="mx-auto max-w-7xl px-5 py-14">
        <h1 className="text-4xl font-extrabold">Facilities</h1>
        <p className="mt-3 text-slate-600">
          Modern labs, practical training environment and student support.
        </p>

        {/* ✅ Your existing facilities content stays here */}
      </div>

      {/* ✅ Footer (Quick Links yaha aayenge) */}
      <SiteFooter />
    </div>
  );
}