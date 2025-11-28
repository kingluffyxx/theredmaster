import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
});

const poppins = Poppins({
  weight: ['400', '600', '700', '800'],
  subsets: ["latin"],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: "The Red Master | Sékou BAYOGO - Design, Illustration et Motion Design",
  description: "Portfolio professionnel de Sékou BAYOGO - Expert en design graphique, illustration, motion design et design numérique.",
  keywords: ["design", "illustration", "motion design", "graphisme", "portfolio", "Sékou BAYOGO"],
  authors: [{ name: "Sékou BAYOGO" }],
  creator: "Sékou BAYOGO",
  openGraph: {
    title: "The Red Master | Sékou BAYOGO",
    description: "Portfolio professionnel - Design, Illustration et Motion Design",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${poppins.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
