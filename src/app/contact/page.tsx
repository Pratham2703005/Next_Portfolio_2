"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { Linkedin, Github, Instagram } from "lucide-react";
import { BsTwitterX } from "react-icons/bs";
import CurrentButton from "@/components/ui/CurrentButton";
import emailjs from "emailjs-com";
import Footer from "@/components/shared/Footer";
import PageHeading from "@/components/ui/PageHeading";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import { myToast } from "@/utils/toast";
import Image from "next/image";

// Contact Cards Constants
const CONTACT_CARDS = [
  {
    id: 1,
    label: "LinkedIn",
    qrPath: "/qrs/linkedin.svg",
    link: "https://www.linkedin.com/in/pratham-kumar-a6b672275/",
    delay: 0.1,
    colors: [
      [59, 130, 246],
      [37, 99, 235],
    ], // Blue shades
    icon: Linkedin,
  },
  {
    id: 2,
    label: "GitHub",
    qrPath: "/qrs/github.svg",
    link: "https://github.com",
    delay: 0.2,
    colors: [
      [168, 85, 247],
      [147, 51, 234],
    ], // Purple shades
    icon: Github,
  },
  {
    id: 3,
    label: "Instagram",
    qrPath: "/qrs/instagram.svg",
    link: "https://instagram.com",
    delay: 0.3,
    colors: [
      [236, 72, 153],
      [219, 39, 119],
    ], // Pink shades
    icon: Instagram,
  },
  {
    id: 4,
    label: "X",
    qrPath: "/qrs/twitter.svg",
    link: "https://twitter.com",
    delay: 0.4,
    colors: [
      [14, 165, 233],
      [6, 182, 212],
    ], // Cyan/Sky shades
    icon: BsTwitterX,
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

// QR Card Component with Canvas Reveal Effect
interface QRCardProps {
  label: string;
  qrPath: string;
  link: string;
  delay: number;
  colors: number[][];
  icon: React.ComponentType<{ size: number; className?: string }>;
}

const QRCard = ({
  label,
  qrPath,
  link,
  delay,
  colors,
  icon: Icon,
}: QRCardProps) => {
  const [revealed, setRevealed] = useState(false);

  const handleInteraction = () => {
    setRevealed(true);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRevealed(true);
    window.open(link, "_blank");
  };

  return (
    <motion.div
      className="border border-white/[0.2] group/qr-card flex items-center justify-center dark:border-white/[0.2] w-full aspect-square relative cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      onMouseEnter={handleInteraction}
      onClick={handleCardClick}
    >
      <CornerIcon className="absolute h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 -top-2 sm:-top-3 -left-2 sm:-left-3 text-white" />
      <CornerIcon className="absolute h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 -bottom-2 sm:-bottom-3 -left-2 sm:-left-3 text-white" />
      <CornerIcon className="absolute h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 -top-2 sm:-top-3 -right-2 sm:-right-3 text-white" />
      <CornerIcon className="absolute h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 -bottom-2 sm:-bottom-3 -right-2 sm:-right-3 text-white" />

      {/* Canvas Reveal Effect - Shown until revealed */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: revealed ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="h-full w-full absolute inset-0 pointer-events-none"
      >
        <CanvasRevealEffect
          animationSpeed={3}
          containerClassName="bg-black"
          colors={colors}
          dotSize={2}
          showGradient={true}
        />
      </motion.div>

      {/* Icon - Shown when not revealed */}
      <motion.div
        initial={{ opacity: 1, scale: 1 }}
        animate={{ opacity: revealed ? 0 : 1, scale: revealed ? 0.8 : 1 }}
        transition={{ duration: 0.3 }}
        className="absolute z-20 pointer-events-none"
      >
        <Icon
          size={48}
          className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-white"
        />
      </motion.div>

      {/* QR Code - Permanently revealed */}
      <div className="relative z-20 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: revealed ? 1 : 0, scale: revealed ? 1 : 0.8 }}
          transition={{ duration: 0.3 }}
          className="w-[80%] h-[80%] flex items-center justify-center"
        >
          <Image
            src={qrPath}
            alt={label}
            className="w-full h-full object-contain"
            height={200}
            width={200}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

const CornerIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M2 2V10M2 2H10M2 2L8 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

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

        myToast({
          message:"Message sent successfully! I'll get back to you soon.",
          type: "success",
          robotVariant: "wave",
        });

        setFormData({
          name: "",
          email: "",
          message: "",
        });
        setErrors({});
      } catch (error) {
        console.error("EmailJS Error:", error);
        myToast({
          message: "Failed to send message. Please try again or contact me directly.",
          type: "error",
          robotVariant: "error",
        });
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
        className="py-8 sm:py-12 md:py-16 lg:py-20 text-white w-full relative select-none"
        aria-labelledby="contact-heading"
      >
        {/* Page Heading */}
        <div className="px-4 sm:px-6 md:px-8 lg:px-16 mb-8 sm:mb-12 md:mb-16">
          <PageHeading
            title="GET IN TOUCH"
            shadowColor="rgba(59, 130, 246, 0.5)"
          />
        </div>

        <div className="absolute inset-0 pointer-events-none"></div>
        <div className="w-full px-4 sm:px-6 md:px-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-16">
              {/* Left Side - QR Cards 2x2 Grid */}
              <div className="w-full flex items-center lg:w-[35%] flex-shrink-0">
                <div className="grid grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                {CONTACT_CARDS.map((card) => (
                  <QRCard
                    key={card.id}
                    label={card.label}
                    qrPath={card.qrPath}
                    link={card.link}
                    delay={card.delay}
                    colors={card.colors}
                    icon={card.icon}
                  />
                ))}
                </div>
              </div>

              {/* Right Side Form */}
              <motion.div className="w-full lg:w-[55%]" {...formAnimation}>
                <form
                  onSubmit={handleSubmit}
                  className="bg-black/20 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-lg space-y-5 md:space-y-6 border border-gray-800"
                  noValidate
                >
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm sm:text-base md:text-md font-semibold select-none mb-2"
                    >
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-transparent border-2 rounded-lg focus:outline-none focus:ring-2 text-white placeholder-gray-400 transition-colors text-sm sm:text-base ${
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
                      className="block text-sm sm:text-base md:text-md font-semibold select-none mb-2"
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-transparent border-2 rounded-lg focus:outline-none focus:ring-2 text-white placeholder-gray-400 transition-colors text-sm sm:text-base ${
                        errors.email
                          ? "border-red-500 focus:ring-red-500"
                          : "border-blue-500 focus:ring-cyan-500"
                      }`}
                      placeholder="your.email@example.com"
                      aria-describedby={
                        errors.email ? "email-error" : undefined
                      }
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
                      className="block text-sm sm:text-base md:text-md font-semibold select-none mb-2"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-transparent border-2 rounded-lg focus:outline-none focus:ring-2 text-white placeholder-gray-400 transition-colors resize-vertical text-sm sm:text-base ${
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
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Contact;
