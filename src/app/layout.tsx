import type { Metadata } from "next";
import { Inter } from "next/font/google"; // 1. Đổi sang font Inter
import "./globals.css";

// 2. Cấu hình font Inter
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Clothing Store Assignment",
  description: "Built with Next.js and Prisma",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* 3. Áp dụng class của Inter vào body */}
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}