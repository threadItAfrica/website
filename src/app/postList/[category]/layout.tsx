import type { Metadata } from "next";

import { ModalProvider } from "@/context/ModalContext";
import { Newsletter } from "@/components/Newsletter"; 

export const metadata: Metadata = {
  title: "Post",
  description: "Sustainable Fashion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <ModalProvider> 
        {children}
        <Newsletter /> 
      </ModalProvider>
  );
}
