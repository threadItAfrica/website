import type { Metadata } from "next";
import * as React from "react";
import { ModalProvider } from "@/context/ModalContext"; 
import "./globals.css";
import { Newsletter } from "@/components/Newsletter";

export const metadata: Metadata = {
  title: "ThreadIt",
  description: "Sustainable Fashion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body> 
          <ModalProvider>
            {children}
            <Newsletter />
          </ModalProvider> 
      </body>
    </html>
  );
}
