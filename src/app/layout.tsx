import type { Metadata } from "next";
import { Inter, Noto_Nastaliq_Urdu } from "next/font/google";
import { LanguageProvider } from "@/stores/languageStore";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const notoNastaliqUrdu = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  variable: "--font-urdu",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Kaarobar One",
  description: "Business management application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${notoNastaliqUrdu.variable} font-sans`}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
