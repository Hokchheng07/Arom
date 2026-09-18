import type { Metadata } from "next";
import { Inter, Noto_Sans_Khmer } from "next/font/google";
import "./index.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const notoSansKhmer = Noto_Sans_Khmer({
  variable: "--font-noto-khmer",
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
    <html lang="en" className={`${inter.variable} ${notoSansKhmer.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
