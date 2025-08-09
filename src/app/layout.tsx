import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import SessionProvider from "@/components/providers/SessionProvider";
import SWRProvider from "@/components/providers/SWRProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
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
        url: "/profile1.jpg",
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
    images: ["/profile1.jpg"],
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
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black z-10 w-full min-h-[100dvh]`}
      >
        <SessionProvider>
          <SWRProvider>
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
          </SWRProvider>
        </SessionProvider>
      </body>
    </html>
  );
}