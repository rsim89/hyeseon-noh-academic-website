import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hyeseon Noh, Ph.D. | Criminology & Criminal Justice",
  description:
    "Academic website of Hyeseon Noh, a criminologist studying overlooked victimization, technology, law, and AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
