import type { Metadata } from "next";
import { Geist, Geist_Mono, Syne, Space_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://pratham-potfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  verification: {
    google: "sBaksVoJbeQ1fnEl1QJbrE7Waql39PFYSRz6iYrUVrQ",
  },
  icons: {
    icon: [{ url: "/icon.png", type: "image/svg+xml" }],
  },
  title: "Pratham Israni - Full-Stack Developer & Innovation Builder",
  description: "SIH 2024 Finalist specializing in interactive web experiences. 600+ LeetCode problems solved. Building innovative solutions with React, Next.js, and modern web technologies. Available for full-stack developer roles.",
  keywords: "Full-Stack Developer, React Developer, Next.js, SIH 2024 Finalist, Competitive Programming, Web Development, JavaScript, TypeScript, Innovation, Interactive Web Experiences",
  authors: [{ name: "Pratham Israni" }],
  creator: "Pratham Israni",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pratham-potfolio.vercel.app",
    title: "Pratham Israni - Full-Stack Developer & Innovation Builder",
    description: "SIH 2024 Finalist specializing in interactive web experiences. Building innovative solutions with modern web technologies.",
    siteName: "Pratham Israni Portfolio",
    images: [
      {
        url: "/profile3.jpg",
        width: 1200,
        height: 630,
        alt: "Pratham Israni - Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pratham Israni - Full-Stack Developer & Innovation Builder",
    description: "SIH 2024 Finalist specializing in interactive web experiences. Building innovative solutions with modern web technologies.",
    images: ["/profile3.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Pratham Israni",
    jobTitle: "Full-Stack Developer",
    description:
      "Full-Stack Developer specializing in interactive web experiences. SIH 2024 Finalist.",
    url: SITE_URL,
    image: `${SITE_URL}/profile3.jpg`,
    email: "mailto:pk2732004@gmail.com",
    sameAs: [
      "https://github.com/Pratham2703003",
      "https://www.linkedin.com/in/pratham-israni-a6b672275/",
      "https://leetcode.com/u/Pratham012/",
    ],
    knowsAbout: [
      "Full-Stack Development",
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Tailwind CSS",
      "Prisma",
      "PostgreSQL",
    ],
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} ${spaceMono.variable} antialiased bg-black z-10 w-full min-h-[100dvh]`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <div className="flex flex-col min-h-[100dvh] relative">
          {/* Fixed background decorative elements */}
          <div className="fixed inset-0 z-0 pointer-events-none">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute w-[40rem] h-[40rem] bg-purple-500 rounded-full blur-3xl -top-48 -left-48 animate-pulse" />
              <div className="absolute w-[40rem] h-[40rem] bg-blue-500 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse" />
            </div>
          </div>

          {/* Main content container */}
          <Navbar />
          <main className="flex-1 relative overflow-x-hidden z-10 max-w-screen">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}