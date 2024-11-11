import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";

export const metadata: Metadata = {
  title: "Physics Hub",
  description: "Место объединяющее физиков со всего мира. Международный физический клуб и комьюнити.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${GeistSans.className}`}
      >
        {children}
      </body>
    </html>
  );
}
