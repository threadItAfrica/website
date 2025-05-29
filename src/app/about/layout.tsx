import type { Metadata } from "next";

import { ModalProvider } from "@/context/ModalContext";
import { Newsletter } from "@/components/Newsletter";
import Script from "next/script";

export const metadata: Metadata = {
  title: "About",
  description: "Sustainable Fashion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <head>
        <Script
          id="mcjs"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
       <script id="mcjs">!function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/3fea375d18ea12601b5d5c484/2951018785749351a2c24dc65.js");</script>
      `,
          }}
        />
      </head>
      <ModalProvider>
        {children}
        <Newsletter />
      </ModalProvider>
    </>
  );
}