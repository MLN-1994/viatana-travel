import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lexend",
});

export const metadata: Metadata = {
  title: "Viatana Travel - Tu Próxima Aventura Comienza Aquí",
  description: "Descubre los mejores paquetes de viaje con Viatana Travel. Ofertas exclusivas, destinos increíbles y experiencias inolvidables.",
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
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
