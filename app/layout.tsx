import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "URL shortener",
  description: "The most simple url shortener",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}
       style={{background: "linear-gradient(to bottom right,#1111ff,#ff00ff)"}}
      >{children}</body>
    </html>
  );
}
