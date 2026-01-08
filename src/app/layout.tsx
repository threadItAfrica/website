import type { Metadata } from "next";
import Script from "next/script";
import * as React from "react";
import { ModalProvider } from "@/context/ModalContext"; 
import "./globals.css";
import { Newsletter } from "@/components/Newsletter";
import {Analytics} from "@vercel/analytics/next"

export const metadata: Metadata = {
  title: "Threadit | Sustainable Fashion",
  description: "Sustainable Fashion, African Fashion, and more",
  openGraph: {
    title: "Threadit | Sustainable Fashion",
    description: "Sustainable Fashion, African Fashion, and more",
    url: "https://www.threaditafrica.com/",
    siteName: "Threadit",
    images: [
      {
        url: "https://www.threaditafrica.com/globe.svg",
        width: 1200,
        height: 630,
        alt: "Threadit - Sustainable Fashion",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    title: "Threadit | Sustainable Fashion",
    description: "Sustainable Fashion, African Fashion, and more",
    card: "summary_large_image",
    images: ["https://www.threaditafrica.com/globe.svg"],
  },
  icons: {
    icon: "/favicon.ico", 
  },
  themeColor: "#006838", 
  robots: {
    index: true,
    follow: true,
    nocache: true,
  },
  keywords: [
    "sustainable fashion",
    "african fashion",
    "ethical clothing",
    "eco-friendly fashion",
    "slow fashion",
    "sustainable style",
    "fashion trends",
    "sustainable brands",
    "fashion blog",
    "sustainable living",
    "fashion news",
    "sustainable lifestyle",
    "fashion tips",
    "sustainable clothing",
    "fashion inspiration",
    "sustainable accessories",
    "sustainable textiles",
    "sustainable materials",
    "sustainable fashion blog",
    "sustainable fashion trends",
    "sustainable fashion brands",
    "sustainable fashion news",
    "sustainable fashion tips",
    "sustainable fashion inspiration",
    "sustainable fashion lifestyle",
    "threadit"
  ] 
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        
     <script>
      {`(function(w,d,e,u,f,l,n){w[f]=w[f]||function(){(w[f].q=w[f].q||[])
      .push(arguments);},l=d.createElement(e),l.async=1,l.src=u,
      n=d.getElementsByTagName(e)[0],n.parentNode.insertBefore(l,n);})
      (window,document,'script','https://assets.mailerlite.com/js/universal.js','ml');
      ml('account', '2024098');`}
    </script>
      </head>
      <body>
        <ModalProvider>
          {children}
          <Newsletter />
        </ModalProvider>
        <Analytics />
      </body>
    </html>
  );
}
