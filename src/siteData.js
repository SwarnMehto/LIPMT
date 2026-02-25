import logo from "./assets/logo.png";
import slide1 from "./assets/slide1.png";
import slide2 from "./assets/slide2.png";
import slide3 from "./assets/slide3.png";
import slide4 from "./assets/slide4.png";
import slide5 from "./assets/slide5.png"; // optional

export const BRAND = {
  name: "LIPMT",
  tagline: "Paramedical Institute • Admissions Open",
  phone: "+91 87001 16436",
  email: "admission@lipmt.in",
  address: "Delhi, India",
  whatsapp: "918700116436", // no +

  topPhones: "+91 9811343520, +91 9355342520",
  topEmail: "info@lipmt.in",

  logo,
};

export const HERO_SLIDES = [
  { src: slide1, alt: "Slide 1" },
  { src: slide2, alt: "Slide 2" },
  { src: slide3, alt: "Slide 3" },
  { src: slide4, alt: "Slide 4" },
  { src: slide5, alt: "Slide 5" },
].filter((x) => x?.src);

export const COURSES = [
  { title: "DMLT", desc: "Lab Technician course with practical training", duration: "1–2 Years" },
  { title: "X-Ray Technician", desc: "Radiology basics & machine handling", duration: "1–2 Years" },
  { title: "OT Technician", desc: "Operation theatre assisting & protocols", duration: "1 Year" },
  { title: "Nursing Assistant", desc: "Clinical support & patient care", duration: "6–12 Months" },
];

export const TESTIMONIALS = [
  { name: "Student", text: "Counselling support was quick, and admission process was smooth." },
  { name: "Parent", text: "Faculty is supportive and the course structure is practical." },
  { name: "Student", text: "Good institute for paramedical courses with guidance." },
];