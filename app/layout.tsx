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
  title: {
    default: "Viatana Travel | Agencia de Viajes en Argentina",
    template: "%s | Viatana Travel",
  },
  description: "Agencia de viajes en Argentina. Paquetes turísticos nacionales e internacionales, cruceros y viajes a medida con atención personalizada. Sin bots, personas reales.",
  keywords: [
    "agencia de viajes Argentina",
    "paquetes turísticos Argentina",
    "viajes a medida",
    "agencia de viajes Buenos Aires",
    "paquetes de viaje AMBA",
    "turismo nacional Argentina",
    "viajes internacionales Argentina",
    "cruceros Argentina",
    "Viatana Travel",
    "viajes baratos Argentina",
  ],
  authors: [{ name: "Viatana Travel" }],
  creator: "Viatana Travel",
  publisher: "Viatana Travel",
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'https://viatana.travel'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Viatana Travel | Agencia de Viajes en Argentina",
    description: "Paquetes turísticos nacionales e internacionales con atención personalizada. Viajá con Viatana — sin bots, personas reales.",
    url: "https://viatana.travel",
    siteName: "Viatana Travel",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Viatana Travel - Agencia de Viajes Argentina",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Viatana Travel | Agencia de Viajes en Argentina",
    description: "Paquetes turísticos nacionales e internacionales con atención personalizada.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
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
        {/* JSON-LD: LocalBusiness para Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TravelAgency",
              name: "Viatana Travel",
              url: "https://viatana.travel",
              logo: "https://viatana.travel/logo largo violeta.png",
              image: "https://viatana.travel/og-image.jpg",
              description: "Agencia de viajes en Argentina. Paquetes turísticos nacionales e internacionales con atención personalizada.",
              telephone: "+5491147899755",
              email: "info@viatana.travel",
              address: {
                "@type": "PostalAddress",
                addressCountry: "AR",
                addressRegion: "Buenos Aires",
              },
              areaServed: ["Argentina"],
              priceRange: "$$",
              sameAs: [
                "https://www.facebook.com/people/Viatana-Travel/61581315252933/",
                "https://www.instagram.com/viatana_travel/",
              ],
            }),
          }}
        />
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
