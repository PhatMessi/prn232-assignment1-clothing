import type { Metadata } from "next";
import { Inter } from "next/font/google"; // 1. Đổi sang font Inter
import "./globals.css";
import Footer from "@/components/Footer";

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
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        {/* Nội dung chính */}
        <div className="flex-grow">
          {children}
        </div>
        
        {/* Footer luôn nằm dưới cùng */}
        <Footer />
      </body>
    </html>
  );
}