import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import Head from 'next/head';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mental Gym - Train Your Mind",
  description: "A Duolingo-style platform for training critical thinking, creativity, and self-awareness in just 10 minutes a day.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
        <link rel="apple-touch-icon" href="/icons/apple-icon-180.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </Head>
      <body className={`${inter.className} min-h-full bg-gray-50 dark:bg-gray-900`}>
        <div className="flex min-h-screen flex-col">
          <Navigation />
          <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
