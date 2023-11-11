import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "React Hook Form with Multi ZOD Schema",
  description:
    "React Hook Form with Multi ZOD Schema based on user location and country",
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": 160,
    "max-video-preview": -1,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": 160,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
