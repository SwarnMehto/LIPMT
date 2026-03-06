import SiteFooter from "../components/SiteFooter";
import logo from "../assets/logo.png";

export default function FacilitiesPage() {

  // ✅ SEO Schema (ADDED ONLY)
  const siteUrl = "https://lipmt.in";
  const pageUrl = `${siteUrl}/facilities`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Facilities",
        item: pageUrl,
      },
    ],
  };

  const facilitiesPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: "Facilities | LIPMT",
    description:
      "Explore modern laboratories, practical training setup, clinical exposure and student support facilities at LIPMT.",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
    },
  };

  const educationalFacilitySchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "LAL INSTITUTE OF PARA MEDICAL TECHNOLOGY",
    url: siteUrl,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Facilities and Training Support",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Advanced Practical Laboratories",
            description:
              "Hands-on practical training with updated instruments and supervised lab sessions.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Clinical and Hospital Exposure",
            description:
              "Hospital workflow understanding, patient handling basics and clinical documentation exposure.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Smart Classrooms and Study Support",
            description:
              "Structured learning, doubt sessions, notes support and exam guidance.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Student Support and Career Help",
            description:
              "Admission guidance, batch support and placement assistance.",
          },
        },
      ],
    },
  };

  const facilities = [
    {
      title: "Advanced Practical Laboratories",
      subtitle: "Hands-on training environment",
      points: [
        "Updated instruments & demo models",
        "Routine practical sessions + supervision",
        "Safety, hygiene & lab discipline focus",
        "Record keeping & reporting basics",
      ],
      forWhom: "Best for: DMLT / ECG / Radiology / Dialysis students",
    },
    {
      title: "Clinical & Hospital Exposure",
      subtitle: "Real-world workflow support",
      points: [
        "OPD/ward workflow understanding",
        "Patient handling & communication basics",
        "Basic documentation & assistance practice",
        "Internship guidance (as per availability)",
      ],
      forWhom: "Best for: OT / Dialysis / Respiratory / Neuro students",
    },
    {
      title: "Smart Classrooms & Study Support",
      subtitle: "Structured learning + guidance",
      points: [
        "Doubt clearing sessions",
        "Notes + exam-oriented guidance",
        "Regular tests & feedback",
        "Career counseling & interview prep",
      ],
      forWhom: "Best for: All programs (foundation + exams)",
    },
    {
      title: "Student Support & Career Help",
      subtitle: "Admissions to placement guidance",
      points: [
        "Admission guidance & documentation help",
        "Fee/batch information support",
        "Placement assistance (basic guidance)",
        "WhatsApp + phone support for queries",
      ],
      forWhom: "Best for: New admissions & ongoing students",
    },
  ];

  const faculty = [
    {
      name: "Dr. Rajesh Sharma",
      role: "Senior Lab Instructor",
      exp: "12+ years experience",
      chips: ["Hematology", "Pathology", "Lab Safety"],
      desc:
        "Specializes in hands-on laboratory training with strong focus on diagnostic accuracy and quality control.",
      img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Dr. Priya Verma",
      role: "Clinical Training Specialist",
      exp: "10+ years experience",
      chips: ["Clinical Skills", "Patient Care", "Hospital SOPs"],
      desc:
        "Guides students in clinical workflow, patient handling and hospital documentation.",
      img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Mr. Amit Kumar",
      role: "Paramedical Technology Trainer",
      exp: "8+ years experience",
      chips: ["ECG", "Dialysis", "Radiology"],
      desc:
        "Provides equipment-based training and practical demos for real hospital environments.",
      img: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=500&q=80",
    },
  ];

  const onImgError = (e) => {
    e.currentTarget.src = logo;
  };

  return (
    <>
      {/* ✅ SEO Schema */}
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>

      <script type="application/ld+json">
        {JSON.stringify(facilitiesPageSchema)}
      </script>

      <script type="application/ld+json">
        {JSON.stringify(educationalFacilitySchema)}
      </script>

      <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-sky-50 via-white to-teal-50 text-slate-900">

        {/* Watermark */}
        <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
          <img
            src={logo}
            alt="LIPMT watermark"
            className="w-[720px] max-w-[92vw] opacity-[0.10] md:w-[480px]"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-5 py-14">

          <h1 className="text-4xl font-extrabold">Facilities</h1>

          <p className="mt-3 text-slate-600">
            Modern labs, practical training environment and student support.
          </p>

          {/* Faculty */}
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {faculty.map((t) => (
              <div key={t.name} className="rounded-3xl border border-slate-200 bg-white p-6 shadow">
                <img
                  src={t.img}
                  onError={onImgError}
                  alt={t.name}
                  className="h-16 w-16 rounded-full object-cover"
                />
                <div className="mt-3 font-bold">{t.name}</div>
                <div className="text-sm text-sky-700">{t.role}</div>
                <p className="mt-2 text-sm text-slate-600">{t.desc}</p>
              </div>
            ))}
          </div>

          {/* Facilities */}
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {facilities.map((f) => (
              <div key={f.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow">
                <div className="text-xs font-semibold text-sky-700">{f.subtitle}</div>
                <h2 className="mt-2 text-xl font-extrabold">{f.title}</h2>

                <ul className="mt-4 space-y-2 text-sm">
                  {f.points.map((p) => (
                    <li key={p}>✅ {p}</li>
                  ))}
                </ul>

                <div className="mt-4 text-sm">
                  <span className="font-semibold">Scope:</span> {f.forWhom}
                </div>
              </div>
            ))}
          </div>

          <div className="h-14 md:h-20" />

        </div>

        <SiteFooter />
      </div>
    </>
  );
}