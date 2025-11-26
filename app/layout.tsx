import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}
