import { Geist, Geist_Mono } from "next/font/google";
import { GeistPixelCircle } from "geist/font/pixel";
import "./globals.css";
import Navigation from "@/components/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Adrian Garcia - Developer",
  description:
    "Full-stack engineer specializing in high-performance trading systems, OEMS architecture, and AI-assisted developer tooling for institutional crypto markets.",
  icons: {
    icon: "/hacker-cat.png",
    shortcut: "/hacker-cat.png",
    apple: "/hacker-cat.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`dark ${geistSans.variable} ${geistMono.variable} ${GeistPixelCircle.variable}`}>
      <body className="antialiased overflow-x-hidden">
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
