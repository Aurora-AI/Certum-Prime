import type { Metadata } from "next";
import { Inter, Playfair_Display, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import SmoothScroller from "@/components/SmoothScroller";
import SovereignLayout from "@/components/layout/SovereignLayout";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Certum Prime | Sovereign Wealth",
  description: "Advanced Wealth Management Protocol",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased bg-void text-platinum selection:bg-antique-gold selection:text-black`}
      >
        <SmoothScroller />
        <SovereignLayout>
            {children}
        </SovereignLayout>
      </body>
    </html>
  );
}
