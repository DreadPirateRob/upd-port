import { Geist, Geist_Mono } from "next/font/google";
import { GeistPixelCircle } from "geist/font/pixel";
import "lenis/dist/lenis.css";
import "./globals.css";
import Navigation from "@/components/navigation";
import SmoothScroll from "@/components/smooth-scroll";
import { siteDescription, siteName, siteUrl } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} - Developer`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName,
    url: "/",
    title: `${siteName} - Developer`,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} - Developer`,
    description: siteDescription,
  },
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
        <SmoothScroll />
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
