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
    url: "https://elodigital.dev.br",
    siteName: "Elo Digital",
    locale: "pt_BR",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} antialiased scroll-smooth`}>
      <body className="min-h-screen flex flex-col font-sans bg-white text-gray-900 overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
