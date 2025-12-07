import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";

import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  UserIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";

export default function Contact() {
  const formRef = useRef();

  const [sending, setSending] = useState(false);     // disable button state
  const [popup, setPopup] = useState(null);         // success/failure popup

  const sendEmail = (e) => {
    e.preventDefault();

    setSending(true); // temporarily disable button only while sending

    emailjs
      .sendForm(
        "service_z3j30zq",
        "template_tnl0031",
        formRef.current,
        "yjF_WVdDlTwyukK7D"
      )
      .then(
        () => {
          setPopup({ type: "success", message: "Your message has been sent!" });
          formRef.current.reset();

          // Disable button for 3 seconds ONLY on success
          setTimeout(() => {
            setSending(false);
            setPopup(null);
          }, 3000);
        },
        () => {
          setPopup({ type: "error", message: "Failed to send message. Try again!" });

          // Do NOT disable button on failed attempt
          setSending(false);

          // auto-hide error popup after 3 seconds
          setTimeout(() => setPopup(null), 3000);
        }
      );
  };

  const phoneE164 = "+918286956020";
  const displayPhone = "+91 82869 56020";
  const email = "yashwantkumarassociates@gmail.com";

  const mailSubject = encodeURIComponent("Website Inquiry");
  const mailBody = encodeURIComponent(
    "Hello YashwantKumar & Associates,\n\nI would like to know more about your services. Please contact me at your convenience.\n\nThanks,\n"
  );

  return (
    <section className="py-10 px-4 relative">

      {/* POPUP MESSAGE */}
      {popup && (
        <div
          className={`fixed top-5 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded shadow-lg text-white z-50
          ${popup.type === "success" ? "bg-green-600" : "bg-red-600"}`}
        >
          {popup.message}
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow max-w-5xl mx-auto">
        <h2 className="text-3xl font-semibold mb-8 text-center">Contact Us</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* LEFT SECTION */}
          <div className="bg-blue-900 text-white p-6 rounded-lg shadow space-y-5">
            <h3 className="text-xl font-semibold mb-2">
              YashwantKumar & Associates
            </h3>

            <p className="flex items-start gap-3">
              <MapPinIcon className="w-6 h-6 text-blue-200" />
              <span>
                <strong>Address:</strong><br />
                Ramabai Colony, Ghatkopar East, Mumbai 400072, Maharashtra, India
              </span>
            </p>

            <p className="flex items-start gap-3">
              <EnvelopeIcon className="w-6 h-6 text-blue-200" />
              <span>
                <strong>Email:</strong><br />
                <a
                  href={`mailto:${email}?subject=${mailSubject}&body=${mailBody}`}
                  className="underline hover:text-blue-200 break-all"
                >
                  {email}
                </a>
              </span>
            </p>

            <p className="flex items-start gap-3">
              <PhoneIcon className="w-6 h-6 text-blue-200" />
              <span>
                <strong>Phone:</strong><br />
                <a
                  href={`tel:${phoneE164}`}
                  className="underline hover:text-blue-200"
                >
                  {displayPhone}
                </a>
              </span>
            </p>

            <p className="mt-2 text-sm text-blue-200">
              We respond within 24 hours. For urgent inquiries, please call or WhatsApp us.
            </p>
          </div>

          {/* RIGHT SECTION — FORM */}
          <div>
            <form ref={formRef} className="space-y-4" onSubmit={sendEmail}>
              <div>
                <label className="block text-sm font-medium mb-1 flex items-center gap-2">
                  <UserIcon className="w-5 h-5 text-blue-900" /> Name
                </label>
                <input
                  name="name"
                  required
                  className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-800 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 flex items-center gap-2">
                  <EnvelopeIcon className="w-5 h-5 text-blue-900" /> Email
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-800 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 flex items-center gap-2">
                  <PhoneIcon className="w-5 h-5 text-blue-900" /> Phone Number
                </label>
                <input
                  name="phone"
                  type="tel"
                  required
                  pattern="[0-9]{10}"
                  placeholder="Enter 10-digit number"
                  className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-800 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 flex items-center gap-2">
                  <PencilSquareIcon className="w-5 h-5 text-blue-900" /> Message
                </label>
                <textarea
                  name="message"
                  required
                  rows="4"
                  className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-800 outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className={`px-4 py-2 text-white rounded transition w-full md:w-auto
                  ${sending ? "bg-gray-500 cursor-not-allowed" : "bg-blue-900 hover:bg-blue-800"}`}
              >
                {sending ? "Sending..." : "Send Message"}
              </button>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
