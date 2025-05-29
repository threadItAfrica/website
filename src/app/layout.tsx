import type { Metadata } from "next";
import Script from "next/script";
import * as React from "react";
import { ModalProvider } from "@/context/ModalContext"; 
import "./globals.css";
import { Newsletter } from "@/components/Newsletter";

export const metadata: Metadata = {
  title: "Threadit | Sustainble fashion",
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
        <Script
          id="mcjs"
          strategy="lazyOnload"
          src="https://chimpstatic.com/mcjs-connected/js/users/3fea375d18ea12601b5d5c484/2951018785749351a2c24dc65.js"
        />
        <ModalProvider>
          {children}
          <Newsletter />
        </ModalProvider> 
      </body>
    </html>
  );
}
