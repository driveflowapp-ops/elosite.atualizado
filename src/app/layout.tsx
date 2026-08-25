import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Elo Digital | Soluções que transformam",
  description: "Desenvolvemos soluções digitais sob medida para pequenas e médias empresas — sites, sistemas de gestão, lojas virtuais e automações com IA.",
  openGraph: {
    title: "Elo Digital | Soluções que transformam",
    description: "Desenvolvemos soluções digitais sob medida para pequenas e médias empresas.",
    url: "https://elodigital.com.br",
    siteName: "Elo Digital",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} antialiased scroll-smooth`}>
      <body className="min-h-screen flex flex-col font-sans bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
