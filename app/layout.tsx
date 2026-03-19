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
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '915119514646115');
              fbq('track', 'PageView');
            `,
          }}
        />
        {/* @ts-ignore */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=915119514646115&ev=PageView&noscript=1"
            alt="Meta Pixel"
          />
        </noscript>
      </head>
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
