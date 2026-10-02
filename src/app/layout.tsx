import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ginamu Aesthetics | Beauty & Wellbeing in Westlands",
  description:
    "Ginamu Aesthetics — a ritual of beauty & wellbeing at Bricks Court, Mpaka Road, Westlands, Nairobi.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
