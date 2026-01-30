

// AVISO TEMPORAL: Pantalla "Sitio en construcción" solo en producción
// Elimina este bloque cuando el sitio esté listo
import OffersCarousel from '@/components/OffersCarousel';
import Headline from '@/components/Headline';
import WhyChooseUs from '@/components/WhyChooseUs';
import PackagesCarousel from '@/components/PackagesCarousel';


export default function Home() {
  return (
    <>
      <OffersCarousel />
      <Headline />
      <PackagesCarousel />
      <WhyChooseUs />
    </>
  );
}
