import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { PageTransitions } from "./providers";
import Layout from "@/components/Layout";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Maharashtrian Thalis - Authentic Food Delivery",
  description: "Order authentic Maharashtrian thalis from top restaurants near you. Veg, non-veg and special thalis available.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${geistMono.variable} antialiased bg-[--color-background] text-[--color-foreground]`}>
        <Layout>
          <PageTransitions>{children}</PageTransitions>
        </Layout>
      </body>
    </html>
  );
}
