import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ApiProvider } from "@/components/providers/api-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AIHUB",
  description: "AI 서비스를 가격, 기능, 리뷰로 비교하고 탐색하는 플랫폼",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ApiProvider>{children}</ApiProvider>
      </body>
    </html>
  );
}
