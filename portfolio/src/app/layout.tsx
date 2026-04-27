import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "./components/layout/ThemeProvider";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Atul Koshta — Full-Stack Software Engineer",
  description:
    "Portfolio of Atul Koshta — Building scalable platforms with Node.js, React, and AWS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
        <script
          src="https://widget-dev.cateringrewards.com/loader.js"
          data-cr-partner-key="wp_602a2c7bb789c64ca34995598dfb9d6c"
          data-cr-position="bottom-right"
          async
        />
      </body>
    </html>
  );
}
