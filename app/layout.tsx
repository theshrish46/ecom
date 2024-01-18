import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { StoreModalProvider } from "@/providers/store-modal-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import ReactHotToastProvider from "@/providers/hot-toast-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "uniassets",
  description: "Place where student can sell their high quality digital notes and assets",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider
            defaultTheme="system"
          >
            <ReactHotToastProvider />
            <StoreModalProvider />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
