import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  title: {
    default: "Physics Hub",
    template: "%s - Physics Hub",
  },
  description: "Место объединяющее физиков со всего мира. Международный физический клуб и комьюнити. Учите физику с нами! 🚀 Решение интересных задач по физике, полезные материалы, профессора для написания научных работ, форум физиков, участия на олимпиадах по физике.",
  twitter: {
    card: "summary_large_image",
  }
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
        <SpeedInsights />
      </body>
    </html>
  );
}
