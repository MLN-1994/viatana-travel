import Header from '@/components/Header';
import OffersCarousel from '@/components/OffersCarousel';
import WhyChooseUs from '@/components/WhyChooseUs';
import PackagesGrid from '@/components/PackagesGrid';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <OffersCarousel />
        <PackagesGrid />
        <WhyChooseUs />
      </main>
      <Footer />
    </div>
  );
}
