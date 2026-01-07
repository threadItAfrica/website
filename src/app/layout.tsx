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
        <Script
          id="mcjs"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{  __html: `
            !function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/3fea375d18ea12601b5d5c484/2951018785749351a2c24dc65.js");
          `}}
        />
        <script id="mcjs">!function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/3fea375d18ea12601b5d5c484/64aa59f1b085c7341cfe5e816.js");</script>
     <script async src="https://www.googletagmanager.com/gtag/js?id=G-1Z4SKEN20Q"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-1Z4SKEN20Q');
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
