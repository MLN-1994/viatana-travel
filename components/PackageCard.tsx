'use client';

import Image from 'next/image';
import Link from 'next/link';
import { TravelPackage } from '@/types';
import { contactInfo } from '@/data/packages';
import { FaWhatsapp } from 'react-icons/fa';

interface PackageCardProps {
  package: TravelPackage;
}

export default function PackageCard({ package: pkg }: PackageCardProps) {
  const whatsappMessage = `Hola! Estoy interesado en el paquete: ${pkg.title} - ${pkg.destination}. Me gustaría recibir más información.`;
  const whatsappLink = `https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-2xl flex flex-col h-full">
      <Link href={`/packages/${pkg.id}`} className="relative h-48 md:h-56 overflow-hidden shrink-0 cursor-pointer group">
        <Image
          src={pkg.image}
          alt={pkg.title}
          fill
          className="object-cover transition-transform group-hover:scale-110"
        />
        {pkg.isOffer && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-2.5 py-1 rounded-full font-bold text-sm">
            -{pkg.discount}% OFF
          </div>
        )}
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700">
          {pkg.category.charAt(0).toUpperCase() + pkg.category.slice(1)}
        </div>
        {/* Overlay with "Ver más" text */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="text-white text-lg font-bold bg-[#6A3B76] px-5 py-2.5 rounded-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
            Ver detalles
          </span>
        </div>
      </Link>

      <div className="p-5 flex flex-col grow">
        <Link href={`/packages/${pkg.id}`}>
          <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 hover:text-[#6A3B76] transition-colors cursor-pointer min-h-[3.5rem]">{pkg.title}</h3>
        </Link>
        <p className="text-gray-600 mb-3 flex items-center gap-1.5 text-sm">
          <span>📍</span> {pkg.destination}
        </p>
        <p className="text-gray-700 mb-4 text-sm line-clamp-2 min-h-[2.5rem]">{pkg.description}</p>

        <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <span>⏱️</span> {pkg.duration}
          </span>
        </div>

        {/* Price section */}
        <div className="border-t pt-4 mt-auto">
          <div className="flex items-end justify-between mb-4">
            <div>
              {pkg.isOffer && pkg.originalPrice && (
                <span className="text-gray-400 line-through text-xs block">
                  USD$ {pkg.originalPrice}
                </span>
              )}
              <span className="text-2xl md:text-3xl font-bold text-[#6A3B76]">
                USD$ {pkg.price}
              </span>
              <span className="text-gray-600 text-xs ml-1 block md:inline">x persona</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Link
              href={`/packages/${pkg.id}`}
              className="w-full bg-[#6A3B76] hover:bg-[#5a2f66] text-white font-semibold py-2.5 px-4 rounded-lg transition-all text-center text-sm"
            >
              Ver detalles
            </Link>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-all flex items-center justify-center gap-2 text-sm"
            >
              <FaWhatsapp className="text-lg" />
              Consultar
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
