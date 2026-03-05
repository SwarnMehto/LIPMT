// src/data/coursesData.jsx

import certificateecg from "../assets/courses/certificate-ecg.png";
import certificatelanassi from "../assets/courses/certificate-lab-assistant.png";
import bscdmlt from "../assets/courses/bsc-mlt.png";
import bscradiology from "../assets/courses/bsc-radiology.png";
export const courses = [
  {
    level: "Diploma",
    slug: "dmlt",
    title: "Diploma in Medical Laboratory Technology (DMLT)",
    category: "Lab",
    popular: true,
    duration: "2 Years",
    eligibility: "10+2 (Science preferred)",
    overview:
      "This diploma builds strong lab diagnostic skills used in hospitals and diagnostic centers. Students learn sample collection, lab testing, reporting basics, quality control and lab safety.",
    whatYouStudy: [
      "Human anatomy & physiology basics",
      "Biochemistry & clinical pathology basics",
      "Microbiology & infection control",
      "Hematology (blood tests) + blood grouping",
      "Histopathology basics",
      "Sample collection, labeling & preservation",
      "Lab instruments handling & calibration",
      "Quality control, lab safety & biomedical waste",
      "Report format & clinical correlation basics",
    ],
    jobs: [
      "Medical Lab Technology",
      "Phlebotomist / Sample Collection Technology",
      "Lab Assistant / Lab Executive",
      "Pathology Lab Technology (Junior)",
      "Quality Control Assistant (Lab)",
    ],
    workAreas: [
      "Hospitals (Pathology / Lab Department)",
      "Diagnostic Laboratories",
      "Clinics & Nursing Homes",
      "Blood Banks",
      "Research & Testing Labs",
    ],
    benefits: [
      "High demand in hospitals & diagnostic labs",
      "Strong practical skill-based course",
      "Multiple job roles available quickly",
      "Good foundation for higher studies/specialization",
    ],
  },

  {
    level: "Diploma",
    slug: "radiology-imaging",
    title: "Diploma in X-ray Technology",
    category: "Imaging",
    popular: true,
    duration: "2 Years",
    eligibility: "10+2 (Science preferred)",
    overview:
      "This course trains students in imaging procedures and patient handling. Students learn basics of radiography, imaging equipment, safety protocols and assistance in diagnostic imaging workflow.",
    whatYouStudy: [
      "Radiography fundamentals",
      "Basics of human anatomy for imaging",
      "Imaging equipment & operation basics",
      "Patient positioning & communication",
      "Radiation safety & protection",
      "Image quality basics & common errors",
      "Record keeping & reporting workflow basics",
      "Ethics & patient care in imaging",
    ],
    jobs: [
      "Radiology Technology (Assistant/Junior)",
      "X-Ray Technology (Junior)",
      "Imaging Center Assistant",
      "Diagnostic Imaging Support Staff",
    ],
    workAreas: [
      "Hospitals (Radiology Department)",
      "Diagnostic Imaging Centers",
      "Clinics with imaging facilities",
      "Mobile imaging units",
    ],
    benefits: [
      "Growing demand in imaging centers",
      "Hands-on patient handling & imaging workflow",
      "Strong career options in hospitals",
      "Good base for advanced imaging training",
    ],
  },

  {
    level: "Diploma",
    slug: "ot-Technology",
    title: "Diploma in OT Technology",
    category: "Surgery / OT",
    popular: true,
    duration: "1 Year",
    eligibility: "10+2",
    overview:
      "OT Technology diploma prepares students for operation theatre assistance. Students learn sterilization, OT setup, surgical instruments handling, infection control and patient preparation.",
    whatYouStudy: [
      "OT protocols & discipline",
      "Sterilization techniques (autoclave basics)",
      "Surgical instruments identification & handling",
      "OT setup & maintenance",
      "Infection control & aseptic techniques",
      "Patient shifting & preparation basics",
      "Biomedical waste management",
      "Basic emergency support & teamwork",
    ],
    jobs: [
      "OT Technology (Junior)",
      "OT Assistant",
      "Sterilization Technology (CSSD assistant)",
      "Surgical Support Staff",
    ],
    workAreas: [
      "Hospitals (Operation Theatre)",
      "Surgical Centers",
      "Nursing Homes",
      "Trauma & Emergency Units (OT support)",
    ],
    benefits: [
      "Direct hospital job role focused course",
      "High practical exposure in OT environment",
      "Strong demand in surgical setups",
      "Skill-based career with quick placements",
    ],
  },

  {
    level: "Diploma",
    slug: "dialysis-Technology",
    title: "Diploma in Dialysis Technology",
    category: "Dialysis",
    popular: true,
    duration: "1-2 Years",
    eligibility: "10+2 (Science preferred)",
    overview:
      "This course trains students to assist in dialysis procedures. Students learn dialysis machine basics, patient monitoring, infection control and pre/post dialysis care support.",
    whatYouStudy: [
      "Kidney function basics & dialysis concept",
      "Dialysis machine overview & safety",
      "Patient monitoring (BP, pulse, symptoms)",
      "Infection control & aseptic handling",
      "Pre-dialysis & post-dialysis care basics",
      "Consumables handling & record keeping",
      "Emergency signs & immediate reporting",
    ],
    jobs: [
      "Dialysis Technology (Junior)",
      "Dialysis Unit Assistant",
      "Patient Care Technology (Dialysis support)",
    ],
    workAreas: [
      "Hospitals (Dialysis Unit)",
      "Dialysis Centers",
      "Nephrology Clinics",
    ],
    benefits: [
      "High demand in dialysis centers & hospitals",
      "Hands-on clinical workflow based training",
      "Strong job stability in healthcare",
      "Opportunity to grow in nephrology support roles",
    ],
  },

  {
    level: "Diploma",
    slug: "dental-Technology",
    title: "Diploma in Dental Technology",
    category: "Dental",
    popular: false,
    duration: "2 Years",
    eligibility: "10+2",
    overview:
      "Dental Technology course focuses on dental lab work and assisting dental procedures. Students learn dental material basics, impressions, dentures/crowns support and clinic workflow.",
    whatYouStudy: [
      "Dental anatomy basics",
      "Dental materials & lab safety",
      "Impression & casting basics",
      "Crown/bridge basics (lab assistance)",
      "Denture support basics",
      "Instruments identification & sterilization",
      "Chairside assistance basics",
      "Clinic record keeping & patient support",
    ],
    jobs: [
      "Dental Technology (Junior)",
      "Dental Lab Assistant",
      "Dental Clinic Assistant",
      "Prosthetic Lab Support Staff",
    ],
    workAreas: [
      "Dental Clinics",
      "Dental Hospitals",
      "Dental Laboratories",
      "Orthodontic/Dental centers",
    ],
    benefits: [
      "Stable demand in clinics & dental labs",
      "Skill-oriented practical career",
      "Good scope to learn advanced dental lab skills",
      "Opens path for specialized dental lab roles",
    ],
  },

  {
    level: "Diploma",
    slug: "ophthalmic-Technology",
    title: "Diploma in ophthalmic Technology",
    category: "Eye Care",
    popular: false,
    duration: "2 Years",
    eligibility: "10+2",
    overview:
      "This diploma trains students to assist in eye care services. Students learn eye testing basics, patient handling, OPD workflow, instruments handling and assisting ophthalmologists.",
    whatYouStudy: [
      "Basic anatomy of eye",
      "Vision testing basics",
      "Eye instruments handling basics",
      "OPD workflow & patient coordination",
      "Basic eye procedures assistance",
      "Infection control in eye care",
      "Patient counseling basics",
    ],
    jobs: [
      "Ophthalmic Technology (Junior)",
      "Eye Clinic Assistant",
      "Vision Testing Technology (Assistant)",
      "Optometry Assistant (basic support)",
    ],
    workAreas: [
      "Eye Hospitals",
      "Ophthalmology Clinics",
      "Vision Centers",
      "Hospital OPD",
    ],
    benefits: [
      "High demand in eye clinics & hospitals",
      "Clean OPD-based work environment",
      "Good growth opportunities in eye care",
      "Strong patient-handling skills development",
    ],
  },

  {
    level: "Diploma",
    slug: "physiotherapy",
    title: "Diploma in Physiotherapy",
    category: "Physiotherapy",
    popular: true,
    duration: "2 Years",
    eligibility: "10+2",
    overview:
      "Physiotherapy diploma helps students learn rehabilitation support and therapy assistance. Students learn body movement basics, exercises, therapy machines basics and patient care support.",
    whatYouStudy: [
      "Basic anatomy & muscle/joint movements",
      "Exercise therapy basics",
      "Electrotherapy basics (modalities overview)",
      "Rehabilitation support basics",
      "Sports injury & posture basics",
      "Patient assessment support basics",
      "Patient communication & safety",
    ],
    jobs: [
      "Physiotherapy Assistant",
      "Rehab Assistant",
      "Clinic Physiotherapy Support Staff",
      "Sports Therapy Assistant (basic)",
    ],
    workAreas: [
      "Physiotherapy Clinics",
      "Hospitals (Rehab Department)",
      "Sports rehab centers",
      "Orthopedic centers",
    ],
    benefits: [
      "Strong demand in rehab & orthopedic care",
      "Good patient interaction and long-term career scope",
      "Practical skill-based course",
      "Opportunity to grow with specialization",
    ],
  },

  {
    level: "Diploma",
    slug: "respiratory-Technology",
    title: "Diploma in Respiratory Technology",
    category: "Respiratory",
    popular: false,
    duration: "2 Years",
    eligibility: "10+2 (Science preferred)",
    overview:
      "Respiratory Technology course trains students to support respiratory care. Students learn oxygen therapy basics, breathing support devices basics and patient monitoring assistance.",
    whatYouStudy: [
      "Respiratory system basics",
      "Oxygen therapy basics",
      "Nebulization & inhalation therapy basics",
      "Patient monitoring & vital signs",
      "Basic respiratory equipment handling",
      "Infection control & patient safety",
      "Emergency signs identification & reporting",
    ],
    jobs: [
      "Respiratory Care Assistant (Junior)",
      "Respiratory Technology (Assistant)",
      "ICU Respiratory Support Staff (basic)",
    ],
    workAreas: [
      "Hospitals (ICU / Respiratory unit)",
      "Pulmonary Clinics",
      "Emergency units",
    ],
    benefits: [
      "High demand in hospitals (ICU support roles)",
      "Practical clinical exposure",
      "Good scope in emergency & critical care support",
      "Strong growth potential with experience",
    ],
  },

  {
    level: "Diploma",
    slug: "neurophysiology-Technology",
    title: "Diploma in Neurophysiology Technology",
    category: "Neuro",
    popular: false,
    duration: "2 Years",
    eligibility: "10+2 (Science preferred)",
    overview:
      "This diploma introduces students to neuro diagnostic support. Students learn basics of brain/nerve testing support, patient handling, recording basics and clinical workflow assistance.",
    whatYouStudy: [
      "Nervous system basics",
      "Neuro diagnostic basics (concept level)",
      "Patient preparation & safety",
      "Device setup & recording workflow basics",
      "Report workflow & documentation basics",
      "Infection control & ethical practices",
    ],
    jobs: [
      "Neurophysiology Technology (Assistant/Junior)",
      "Neuro Diagnostic Assistant",
      "Hospital Neurology Support Staff",
    ],
    workAreas: [
      "Hospitals (Neurology Department)",
      "Neuro clinics",
      "Diagnostic centers (neuro testing)",
    ],
    benefits: [
      "Specialized field with strong hospital demand",
      "Good long-term growth in neurology support",
      "Skill-based healthcare career option",
      "Exposure to advanced diagnostic workflow",
    ],
  },

  {
    level: "Diploma",
    slug: "ecg-Technology",
    title: "Diploma in ECG Technology",
    category: "Cardiology",
    popular: true,
    duration: "6 Months - 1 Year",
    eligibility: "10+2",
    overview:
      "ECG Technology course trains students to record ECG and assist in basic cardiac diagnostic workflow. Students learn patient preparation, ECG lead placement and reporting process basics.",
    whatYouStudy: [
      "Basic heart anatomy & physiology",
      "ECG machine handling basics",
      "Lead placement & procedure steps",
      "Patient preparation & safety",
      "Common artifacts/errors and prevention",
      "Basic documentation & workflow",
    ],
    jobs: [
      "ECG Technology",
      "Cardiac Diagnostic Assistant (basic)",
      "Hospital OPD/Diagnostic Support Staff",
    ],
    workAreas: [
      "Hospitals (Cardiology/OPD)",
      "Diagnostic centers",
      "Clinics",
      "Health check-up centers",
    ],
    benefits: [
      "Fast entry into healthcare job market",
      "Short duration + practical skill course",
      "Demand in hospitals & diagnostics",
      "Good base for cardiac specializations",
    ],
  },

  {
    level: "Diploma",
    slug: "cardio-Technology",
    title: "Diploma in Cardio Technology",
    category: "Cardiology",
    popular: true,
    duration: "2 Years",
    eligibility: "10+2 (Science preferred)",
    overview:
      "Cardio Technology diploma prepares students for cardiac diagnostic support and patient monitoring. Students learn cardiac testing workflow basics, patient handling and hospital cardiology support.",
    whatYouStudy: [
      "Heart anatomy & cardiac basics",
      "Patient monitoring (BP, pulse, symptoms)",
      "Cardiac testing workflow basics",
      "Equipment handling basics",
      "Emergency signs identification & reporting",
      "Patient communication & clinical ethics",
      "Record keeping & documentation",
    ],
    jobs: [
      "Cardio Technology (Junior)",
      "Cardiac Care Assistant",
      "Diagnostic Support Staff (Cardiology)",
    ],
    workAreas: [
      "Hospitals (Cardiology Department)",
      "Diagnostic centers",
      "ICU/CCU support (basic)",
      "Health check-up centers",
    ],
    benefits: [
      "Strong demand in hospitals (cardiology support)",
      "Practical patient monitoring skills",
      "Good growth path in cardiac care",
      "Stable healthcare career option",
    ],
  },

  // ===================== CERTIFICATE COURSES (ADDED) =====================

  {
    level: "Certificate",
    slug: "certificate-ecg",
    title: "Certificate in ECG Technology",
    category: "Cardiology",
    image: certificateecg,
    popular: false,
    duration: "6 Months",
    eligibility: "10th / 10+2",
    overview:
      "Short-term course focused on ECG recording basics and patient preparation. Students learn ECG machine handling and basic diagnostic workflow.",
    whatYouStudy: [
      "Basic heart anatomy",
      "ECG machine handling basics",
      "Lead placement & procedure steps",
      "Patient preparation & safety",
      "Basic documentation",
    ],
    jobs: [
      "ECG Assistant",
      "Diagnostic Assistant (Cardiology)",
      "Hospital OPD Support Staff",
    ],
    workAreas: [
      "Hospitals (OPD / Cardiology)",
      "Diagnostic centers",
      "Clinics",
    ],
    benefits: [
      "Short duration course",
      "Quick entry into healthcare jobs",
      "Good base for Diploma/advanced cardiac training",
    ],
  },

  {
    level: "Certificate",
    slug: "certificate-lab-assistant",
    title: "Certificate in Lab Assistant",
    category: "Lab",
    image: certificatelanassi,
    popular: false,
    duration: "6 Months",
    eligibility: "10th / 10+2",
    overview:
      "Entry-level lab course for assisting technicians in sample collection, labeling and basic lab workflow.",
    whatYouStudy: [
      "Sample collection basics",
      "Labeling & record keeping",
      "Lab hygiene & safety",
      "Basic lab workflow support",
    ],
    jobs: [
      "Lab Assistant",
      "Sample Collection Assistant",
      "Lab Support Staff",
    ],
    workAreas: [
      "Diagnostic Laboratories",
      "Hospitals (Lab Department)",
      "Clinics",
    ],
    benefits: [
      "Fast entry-level job options",
      "Good foundation for DMLT",
      "Practical skill-based training",
    ],
  },

  // ===================== DEGREE COURSES (ADDED) =====================

  {
    level: "Degree",
    slug: "bmlt",
    title: "B.Sc. Medical Laboratory Technology",
    category: "Lab",
    image: bscdmlt,
    popular: true,
    duration: "3 Years",
    eligibility: "10+2 (Science)",
    overview:
      "BMLT degree focuses on advanced laboratory diagnostics including pathology, microbiology and clinical biochemistry with stronger academic + practical training.",
    whatYouStudy: [
      "Advanced pathology",
      "Clinical biochemistry",
      "Microbiology",
      "Hematology & diagnostics",
      "Lab management basics",
    ],
    jobs: [
      "Medical Lab Technologist",
      "Lab Supervisor (Junior)",
      "Quality Control Executive (Lab)",
    ],
    workAreas: [
      "Hospitals",
      "Diagnostic Laboratories",
      "Research & testing labs",
    ],
    benefits: [
      "Higher qualification than Diploma",
      "Better salary & growth opportunities",
      "Good base for specialization / higher studies",
    ],
  },

  {
    level: "Degree",
    slug: "bsc-radiology",
    title: "B.Sc. Radiology & Imaging Technology",
    category: "Imaging",
    image: bscradiology,
    popular: true,
    duration: "3 Years",
    eligibility: "10+2 (Science)",
    overview:
      "Degree program focused on advanced imaging workflow and safety, including modern imaging modalities like CT and MRI at concept level.",
    whatYouStudy: [
      "Radiology imaging fundamentals",
      "CT / MRI basics (concept level)",
      "Radiation safety & protection",
      "Patient handling & positioning",
      "Imaging workflow & documentation",
    ],
    jobs: [
      "Radiology Technologist",
      "Imaging Technician",
      "Diagnostic Imaging Support Staff",
    ],
    workAreas: [
      "Hospitals (Radiology Department)",
      "Diagnostic imaging centers",
    ],
    benefits: [
      "Advanced career path in imaging",
      "High demand in hospitals & imaging centers",
      "Better long-term growth opportunities",
    ],
  },
];

export function getCourseBySlug(slug) {
  return courses.find((c) => c.slug === slug);
}