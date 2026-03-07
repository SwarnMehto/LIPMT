import { useEffect, useMemo, useRef, useState } from "react";
import {
  MessageCircle,
  X,
  Send,
  Phone,
  MapPin,
  BookOpen,
  Download,
  MessageSquare,
} from "lucide-react";

const quickQuestions = [
  "Courses kaun-kaun se hain?",
  "Admission kaise hoga?",
  "Eligibility kya hai?",
  "Brochure chahiye",
  "Contact number do",
  "Location batao",
];

const coursesList = [
  "Diploma in Medical Laboratory Technology (DMLT)",
  "Diploma in X-ray Technology",
  "Diploma in OT Technology",
  "Diploma in Dialysis Technology",
  "Diploma in Dental Technology",
  "Diploma in Ophthalmic Technology",
  "Diploma in Physiotherapy",
  "Diploma in Respiratory Technology",
  "Diploma in Neurophysiology Technology",
  "Diploma in ECG Technology",
  "Certificate in ECG Technology",
  "Certificate in Lab Assistant",
  "B.Sc. Medical Laboratory Technology",
  "B.Sc. Radiology & Imaging Technology",
];

function normalizeText(text = "") {
  return text.toLowerCase().trim();
}

function getBotReply(message) {
  const msg = normalizeText(message);

  if (
    msg.includes("course") ||
    msg.includes("courses") ||
    msg.includes("kaun") ||
    msg.includes("available")
  ) {
    return `LIPMT me ye major courses available hain:\n\n${coursesList
      .map((c, i) => `${i + 1}. ${c}`)
      .join("\n")}\n\nAap chahein to main eligibility ya best course bhi bata sakta hoon.`;
  }

  if (
    msg.includes("admission") ||
    msg.includes("apply") ||
    msg.includes("enroll") ||
    msg.includes("form")
  ) {
    return `Admission process simple hai:\n\n1. Course select karo\n2. Basic documents submit karo\n3. Counseling / inquiry complete karo\n4. Admission confirmation lo\n\nDocuments generally:\n- 10th marksheet\n- 12th marksheet (if applicable)\n- Aadhaar card\n- Passport size photos\n\nDirect inquiry ke liye Call/WhatsApp bhi kar sakte ho.`;
  }

  if (
    msg.includes("eligibility") ||
    msg.includes("eligible") ||
    msg.includes("qualification") ||
    msg.includes("12th") ||
    msg.includes("10th")
  ) {
    return `Eligibility course ke according vary karti hai:\n\n- Certificate courses: 10th / 12th\n- Diploma courses: 10th / 12th\n- B.Sc. courses: 12th preferred\n\nExact eligibility confirm karne ke liye institute se contact karna best rahega.`;
  }

  if (
    msg.includes("fee") ||
    msg.includes("fees") ||
    msg.includes("price") ||
    msg.includes("kitna paisa")
  ) {
    return `Fees course ke hisaab se alag hoti hai. Exact latest fees ke liye institute se direct confirm karna best rahega.\n\nAap chaho to main aapko contact / WhatsApp option dikha sakta hoon.`;
  }

  if (
    msg.includes("duration") ||
    msg.includes("kitne saal") ||
    msg.includes("time period")
  ) {
    return `Course duration generally course type par depend karti hai:\n\n- Certificate: around 6 months to 1 year\n- Diploma: around 1 to 2 years\n- B.Sc.: around 3 years\n\nAgar aap specific course ka naam bhejo to uska exact duration bata dunga.`;
  }

  if (
    msg.includes("brochure") ||
    msg.includes("pdf") ||
    msg.includes("prospectus")
  ) {
    return `Brochure download karne ke liye Brochure page open karein.\n\nAgar website me brochure already uploaded hai, to aap seedha "Download Brochure" button se PDF le sakte hain.`;
  }

  if (
    msg.includes("contact") ||
    msg.includes("number") ||
    msg.includes("phone") ||
    msg.includes("call")
  ) {
    return `Contact ke liye aap is number par baat kar sakte hain:\n\n+91 98113 42520\n\nAgar chaho to WhatsApp par bhi inquiry kar sakte ho.`;
  }

  if (
    msg.includes("whatsapp") ||
    msg.includes("chat") ||
    msg.includes("msg")
  ) {
    return `WhatsApp inquiry ke liye aap institute ko direct message bhej sakte ho.\n\nButton par click karke direct chat start kar sakte ho.`;
  }

  if (
    msg.includes("location") ||
    msg.includes("address") ||
    msg.includes("map") ||
    msg.includes("kaha")
  ) {
    return `Institute ki location dekhne ke liye Contact page ya Google Map section open karein.\n\nAgar aap chaho to main aapko location CTA bhi dikhata hoon.`;
  }

  if (
    msg.includes("job") ||
    msg.includes("placement") ||
    msg.includes("career")
  ) {
    return `In courses ke baad aap hospitals, diagnostic labs, clinics, imaging centers aur healthcare setups me kaam kar sakte ho.\n\nPopular roles:\n- Lab Technician\n- ECG Technician\n- X-ray Technician\n- OT Technician\n- Dialysis Technician\n- Assistant roles in hospitals`;
  }

  if (
    msg.includes("hello") ||
    msg.includes("hi") ||
    msg.includes("hii") ||
    msg.includes("namaste")
  ) {
    return `Namaste 👋\nLIPMT Admission Help Desk me welcome hai.\n\nAap mujhse courses, admission, eligibility, brochure, fees, contact aur location ke baare me pooch sakte hain.`;
  }

  return `Main LIPMT admission assistant hoon 🤖\n\nAap ye pooch sakte ho:\n- Courses\n- Admission process\n- Eligibility\n- Duration\n- Brochure\n- Contact number\n- Location\n- Placement / jobs`;
}

export default function AdmissionChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Namaste 👋\nMain LIPMT Admission Assistant hoon.\nAap courses, admission, eligibility, brochure, contact aur location ke baare me pooch sakte ho.",
    },
  ]);

  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, open]);

  const whatsappLink = useMemo(() => {
    const phone = "9198113 42520";
    const text = encodeURIComponent(
      "Hello LIPMT, mujhe admission ke baare me jankari chahiye."
    );
    return `https://wa.me/${phone}?text=${text}`;
  }, []);

  const sendMessage = (customText) => {
    const text = (customText ?? input).trim();
    if (!text) return;

    const userMsg = {
      id: Date.now(),
      sender: "user",
      text,
    };

    const botMsg = {
      id: Date.now() + 1,
      sender: "bot",
      text: getBotReply(text),
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen((s) => !s)}
        className="fixed bottom-20 right-4 z-[120] flex h-14 w-14 items-center justify-center rounded-full bg-yellow-400 text-slate-900 shadow-[0_10px_30px_rgba(0,0,0,0.18)] transition hover:scale-105 md:bottom-6"
        aria-label="Open admission chatbot"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-36 right-4 z-[120] w-[calc(100vw-2rem)] max-w-sm rounded-3xl border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.20)] transition-all duration-300 md:bottom-24 ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        {/* Header */}
        <div className="rounded-t-3xl bg-sky-600 px-4 py-4 text-white">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-base font-extrabold">LIPMT Admission Help Desk</div>
              <div className="mt-1 text-xs text-sky-100">
                Ask about courses, admission, brochure and contact
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="rounded-full bg-white/10 p-2 hover:bg-white/20"
              aria-label="Close chatbot"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div
          ref={listRef}
          className="max-h-[380px] min-h-[320px] space-y-3 overflow-y-auto bg-slate-50 px-3 py-3"
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] whitespace-pre-line rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                  msg.sender === "user"
                    ? "rounded-br-md bg-sky-600 text-white"
                    : "rounded-bl-md bg-white text-slate-800 border border-slate-200"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {/* Quick Actions */}
          <div className="pt-1">
            <div className="mb-2 text-xs font-semibold text-slate-500">
              Quick questions
            </div>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-sky-50"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="border-t border-slate-200 bg-white px-3 py-3">
          <div className="mb-3 grid grid-cols-2 gap-2">
            


            <a
              href="/brochure"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              <Download className="h-4 w-4" />
              Brochure
            </a>

            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              <MapPin className="h-4 w-4" />
              Location
            </a>
          </div>

          {/* Input */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
              placeholder="Type your question..."
              className="h-11 flex-1 rounded-xl border border-slate-200 px-3 text-sm outline-none ring-0 placeholder:text-slate-400 focus:border-sky-400"
            />
            <button
              onClick={() => sendMessage()}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-400 text-slate-900 hover:bg-yellow-500"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}