import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { courses } from "../data/coursesData";

export default function SiteFooter() {
  return (
    <footer className="mt-14 border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-5 py-12">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* LEFT: Brand + Address */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="LIPMT"
                className="h-12 w-12 rounded-xl border border-slate-200 bg-white object-contain p-1"
              />
              <div>
                <div className="text-lg font-extrabold text-slate-900">LIPMT</div>
                <div className="text-sm text-slate-600">
                  Lal Institute of Para Medical Technology
                </div>
              </div>
            </div>

            <div className="mt-5 text-sm text-slate-700 leading-relaxed">
              Centre 2759, Hansa Puri Road, Tri Nagar, Delhi-110035
              <div className="text-slate-500">(Near Punjab National Bank)</div>
            </div>

            <div className="mt-4 space-y-2 text-sm">
              <a className="block text-slate-700 hover:text-sky-700" href="mailto:info@lipmt.in">
                info@lipmt.in
              </a>
              <a className="block text-slate-700 hover:text-sky-700" href="tel:+919811343520">
                +91-9811343520
              </a>
              <a className="block text-slate-700 hover:text-sky-700" href="tel:+919355342520">
                +91-9355342520
              </a>
              <div className="text-slate-700">011-41415029</div>
            </div>

            <div className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-sky-100 bg-sky-50 px-4 py-3 text-sm">
              <span className="h-2 w-2 rounded-full bg-sky-600" />
              <span className="font-semibold text-slate-900">Office Hours:</span>
              <span className="text-slate-700">Mon–Sat • 10:00 AM – 6:00 PM</span>
            </div>
          </div>

          {/* MIDDLE: Important links */}
          <div className="lg:col-span-1">
            <div className="text-sm font-extrabold tracking-wider uppercase text-slate-900">
              Important Links
            </div>
            <div className="mt-2 h-0.5 w-14 rounded-full bg-sky-600" />

            <div className="mt-5 space-y-2 text-sm">
              <FooterLink to="/about">About</FooterLink>
              <FooterLink to="/courses">Courses</FooterLink>
              <FooterLink to="/facilities">Facilities</FooterLink>
              <FooterLink to="/testimonials">Testimonials</FooterLink>
              <FooterLink to="/contact">Contact</FooterLink>

              <div className="mt-4 border-t border-slate-200 pt-4" />

              <FooterLink to="/disclaimer">Disclaimer</FooterLink>
              <FooterLink to="/privacy-policy">Privacy Policy</FooterLink>
              <FooterLink to="/terms">Terms & Conditions</FooterLink>
            </div>
          </div>

          {/* RIGHT: Quick Links (Courses) */}
          <div className="lg:col-span-1">
            <div className="text-sm font-extrabold tracking-wider uppercase text-slate-900">
              Quick Links
            </div>
            <div className="mt-2 h-0.5 w-14 rounded-full bg-sky-600" />

            <div className="mt-5 space-y-3">
              {(courses || []).map((c) => (
                <Link
                  key={c.slug}
                  to={`/courses/${c.slug}`}
                  className="group flex items-start gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-sky-50 hover:border-sky-200 hover:text-sky-700 transition"
                >
                  <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-lg border border-sky-100 bg-sky-50 text-sky-700">
                    ↪
                  </span>
                  <span className="font-semibold leading-snug">{c.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* <div className="mt-10 flex flex-col gap-2 border-t border-slate-200 pt-6 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} LIPMT. All rights reserved.</div>
          <div className="text-slate-500">Designed for a clean hospital vibe.</div>
        </div> */}
      </div>
    </footer>
  );
}

function FooterLink({ to, children }) {
  return (
    <Link to={to} className="block text-slate-700 hover:text-sky-700 transition">
      {children}
    </Link>
  );
}