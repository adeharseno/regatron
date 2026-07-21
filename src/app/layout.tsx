import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

// Font khas REGATRON
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PT REGATRON INDONESIA - E-Waste & PCB Processing",
  description: "Solusi terpadu pengolahan limbah elektronik dan daur ulang material industri.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${plusJakartaSans.variable} scroll-smooth`}>
      <body className="font-sans antialiased bg-surface-bright text-on-surface">
        {children}
      </body>
    </html>
  );
}