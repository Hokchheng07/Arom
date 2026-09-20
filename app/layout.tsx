import type { Metadata } from "next";
import { Inter, Kantumruy_Pro } from "next/font/google";
import "./index.css";
import { LanguageProvider } from "./_components/language-provider";
import { DetectionProvider } from "./_components/detection-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const kantumruyPro = Kantumruy_Pro({
  variable: "--font-kantumruy-pro",
  subsets: ["khmer", "latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "AROM — Your wellness space",
    template: "%s · AROM",
  },
  description: "A calmer mind, a brighter you.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${kantumruyPro.variable} antialiased`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <LanguageProvider>
          <DetectionProvider>
            {children}
          </DetectionProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
