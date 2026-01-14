import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "@/components/ConditionalLayout";

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lexend",
});

export const metadata: Metadata = {
  title: "Viatana Travel - Tu Próxima Aventura Comienza Aquí",
  description: "Descubre los mejores paquetes de viaje con Viatana Travel. Ofertas exclusivas, destinos increíbles y experiencias inolvidables.",
  keywords: ["viajes", "turismo", "paquetes turísticos", "vacaciones", "tours", "aventuras"],
  authors: [{ name: "Viatana Travel" }],
  creator: "Viatana Travel",
  publisher: "Viatana Travel",
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),
  openGraph: {
    title: "Viatana Travel - Tu Próxima Aventura Comienza Aquí",
    description: "Descubre los mejores paquetes de viaje con Viatana Travel.",
    url: "/",
    siteName: "Viatana Travel",
    locale: "es_PE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Viatana Travel",
    description: "Descubre los mejores paquetes de viaje con Viatana Travel.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${lexend.variable} font-sans antialiased`}>
        <div className="min-h-screen flex flex-col">
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </div>
      </body>
    </html>
  );
}
