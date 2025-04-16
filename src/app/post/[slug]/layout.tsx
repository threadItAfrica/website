import type { Metadata } from "next";

import { ModalProvider } from "@/context/ModalContext";
import { Newsletter } from "@/components/Newsletter";

export const metadata: Metadata = {
  title: "Post",
  description: "Sustainable Fashion",
};

export default function Layout({
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
