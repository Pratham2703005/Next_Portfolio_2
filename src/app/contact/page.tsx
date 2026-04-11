"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import CurrentButton from "@/components/ui/CurrentButton";
import { Toaster } from "react-hot-toast";
// import TypingEffect from 'react-typing-effect';
import toast from "react-hot-toast";
import emailjs from "emailjs-com";
import Footer from "@/components/shared/Footer";
import PageHeading from "@/components/ui/PageHeading";

// Contact Cards Constants
const CONTACT_CARDS = [
  {
    id: 1,
    label: "LinkedIn Profile",
    qrPath: "/qrs/linkedin.svg",
    link: "https://www.linkedin.com/in/pratham-kumar-a6b672275/",
    delay: 0.2,
  },
  {
    id: 2,
    label: "Connect With Me",
    qrPath: "/qrs/linkedin.svg",
    link: "https://linkedin.com",
    delay: 0.35,
  },
];

// Types
interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

// Form validation
const validateForm = (data: FormData): FormErrors => {
  const errors: FormErrors = {};

  if (!data.name.trim()) {
    errors.name = "Name is required";
  } else if (data.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters";
  }

  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!data.message.trim()) {
    errors.message = "Message is required";
  } else if (data.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters";
  }

  return errors;
};

// Contact Card Component
interface ContactCardProps {
  label: string;
  qrPath: string;
  link: string;
  delay: number;
}

const ContactCard = ({ label, qrPath, link, delay }: ContactCardProps) => (
  <motion.div
    className="flex flex-col items-center gap-4 p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:border-blue-500/50 transition-all duration-300"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, delay }}
  >
    <div className="w-24 h-24 flex items-center justify-center">
      <img
        src={qrPath}
        alt={label}
        className="w-full h-full object-contain"
      />
    </div>
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm text-blue-400 hover:text-blue-300 transition-colors font-semibold"
    >
      {label}
    </a>
  </motion.div>
);

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [mount, setMount] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));

      // Clear error when user starts typing
      if (errors[name as keyof FormErrors]) {
        setErrors((prev) => ({
          ...prev,
          [name]: undefined,
        }));
      }
    },
    [errors],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // Validate form
      const formErrors = validateForm(formData);
      if (Object.keys(formErrors).length > 0) {
        setErrors(formErrors);
        return;
      }

      setIsSubmitting(true);

      try {
        await emailjs.sendForm(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
          e.target as HTMLFormElement,
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "",
        );

        toast.success("Message sent successfully! I'll get back to you soon.");
        setFormData({
          name: "",
          email: "",
          message: "",
        });
        setErrors({});
      } catch (error) {
        console.error("EmailJS Error:", error);
        toast.error(
          "Failed to send message. Please try again or contact me directly.",
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData],
  );

  const formAnimation = useMemo(
    () => ({
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6, delay: 0.2 },
    }),
    [],
  );

  if (!mount) return <> </>;
  return (
    <>
      <section
        className="py-12 text-white max-w-7xl mx-auto relative select-none"
        aria-labelledby="contact-heading"
      >
        {/* Page Heading */}
        <div className="px-4 sm:px-16 mb-8">
          <PageHeading
            title="GET IN TOUCH"
            shadowColor="rgba(59, 130, 246, 0.5)"
          />
        </div>

        <div className="absolute inset-0 pointer-events-none"></div>
        <div className="flex flex-col md:flex-row container mx-auto px-4 relative z-10 gap-8 md:gap-12">
          {/* Left Side - Contact Cards */}
          <div className="w-full md:w-[45%] grid grid-rows-2 gap-8">
            {CONTACT_CARDS.map((card) => (
              <ContactCard
                key={card.id}
                label={card.label}
                qrPath={card.qrPath}
                link={card.link}
                delay={card.delay}
              />
            ))}
          </div>

          {/* Right Side Form */}
          <motion.div className="w-full md:w-[55%]" {...formAnimation}>
            <form
              onSubmit={handleSubmit}
              className="bg-black/20 backdrop-blur-sm p-4 md:p-8 rounded-lg space-y-6 border border-gray-800"
              noValidate
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-md font-semibold select-none mb-2"
                >
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full p-3 bg-transparent border-2 rounded-lg focus:outline-none focus:ring-2 text-white placeholder-gray-400 transition-colors ${
                    errors.name
                      ? "border-red-500 focus:ring-red-500"
                      : "border-blue-500 focus:ring-cyan-500"
                  }`}
                  placeholder="Your full name"
                  aria-describedby={errors.name ? "name-error" : undefined}
                  aria-invalid={!!errors.name}
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <p
                    id="name-error"
                    className="text-red-400 text-sm mt-1"
                    role="alert"
                  >
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-md font-semibold select-none mb-2"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full p-3 bg-transparent border-2 rounded-lg focus:outline-none focus:ring-2 text-white placeholder-gray-400 transition-colors ${
                    errors.email
                      ? "border-red-500 focus:ring-red-500"
                      : "border-blue-500 focus:ring-cyan-500"
                  }`}
                  placeholder="your.email@example.com"
                  aria-describedby={errors.email ? "email-error" : undefined}
                  aria-invalid={!!errors.email}
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p
                    id="email-error"
                    className="text-red-400 text-sm mt-1"
                    role="alert"
                  >
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-md font-semibold select-none mb-2"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full p-3 bg-transparent border-2 rounded-lg focus:outline-none focus:ring-2 text-white placeholder-gray-400 transition-colors resize-vertical ${
                    errors.message
                      ? "border-red-500 focus:ring-red-500"
                      : "border-blue-500 focus:ring-cyan-500"
                  }`}
                  rows={5}
                  placeholder="Tell me about your project, question, or just say hello..."
                  aria-describedby={
                    errors.message ? "message-error" : undefined
                  }
                  aria-invalid={!!errors.message}
                  disabled={isSubmitting}
                />
                {errors.message && (
                  <p
                    id="message-error"
                    className="text-red-400 text-sm mt-1"
                    role="alert"
                  >
                    {errors.message}
                  </p>
                )}
              </div>

              <div className="relative">
                <CurrentButton disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </CurrentButton>
              </div>
            </form>
          </motion.div>
        </div>

        {/* Toast notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#1a1a1a",
              color: "#fff",
              border: "1px solid #3b82f6",
            },
            success: {
              iconTheme: {
                primary: "#10b981",
                secondary: "#fff",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#fff",
              },
            },
          }}
        />
      </section>
      <Footer />
    </>
  );
};

export default Contact;
