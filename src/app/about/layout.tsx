import type { Metadata } from "next";

import { ModalProvider } from "@/context/ModalContext";
import { Newsletter } from "@/components/Newsletter";

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