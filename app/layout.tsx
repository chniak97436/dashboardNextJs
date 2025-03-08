import {roboto} from "@/app/ui/fonts";
import type { Metadata } from "next";
import "./globals.css";



export const metadata: Metadata = {
  title: "Dashbord",
  description: "Exercice app next.js creation d'un dashborad en typescript",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>{children}</body>
    </html>
  );
}
