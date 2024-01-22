import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "classnote",
  description: "Publish and sell your digital assets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="en">
      <body className={inter.className}>
        {/* <Toast /> */}
        <Toaster />
        <div className="w-full h-full">
          {children}
        </div>
      </body>
    </html>

  );
}
