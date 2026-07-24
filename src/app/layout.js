import { Geist, Geist_Mono } from "next/font/google";
import { GeistPixelCircle } from "geist/font/pixel";
import "./globals.css";
import Navigation from "@/components/navigation";
import PageLoadOverlay from "@/components/ui/page-load-overlay";
import { ThemeProvider } from "@/components/theme-provider";

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
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme') || 'light';
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${GeistPixelCircle.variable} antialiased overflow-x-hidden`}
      >
        <ThemeProvider>
          <PageLoadOverlay />
          <Navigation />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
