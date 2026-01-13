'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { TravelPackage } from '@/types';
import { contactInfo } from '@/data/packages';
import { FaWhatsapp } from 'react-icons/fa';

interface PackageCardProps {
  package: TravelPackage;
}

export default function PackageCard({ package: pkg }: PackageCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const whatsappMessage = `Hola! Estoy interesado en el paquete: ${pkg.title} - ${pkg.destination}. Me gustaría recibir más información.`;
  const whatsappLink = `https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-2xl transform hover:-translate-y-2 flex flex-col min-h-[600px]">
      <Link href={`/packages/${pkg.id}`} className="relative h-64 overflow-hidden shrink-0 cursor-pointer group">
        <Image
          src={pkg.image}
          alt={pkg.title}
          fill
          className="object-cover transition-transform group-hover:scale-110"
        />
        {pkg.isOffer && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full font-bold">
            -{pkg.discount}% OFF
          </div>
        )}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
          {pkg.category.charAt(0).toUpperCase() + pkg.category.slice(1)}
        </div>
        {/* Overlay with "Ver más" text */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="text-white text-xl font-bold bg-[#6A3B76] px-6 py-3 rounded-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
            Ver más detalles
          </span>
        </div>
      </Link>

      <div className="p-6 flex flex-col grow">
        <Link href={`/packages/${pkg.id}`}>
          <h3 className="text-2xl font-bold text-gray-800 mb-2 line-clamp-2 hover:text-[#6A3B76] transition-colors cursor-pointer">{pkg.title}</h3>
        </Link>
        <p className="text-gray-600 mb-3 flex items-center gap-2">
          <span>📍</span> {pkg.destination}
        </p>
        <p className="text-gray-700 mb-4 line-clamp-3">{pkg.description}</p>

        <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <span>⏱️</span> {pkg.duration}
          </span>
        </div>

        {/* Included items */}
        {isExpanded && (
          <div className="mb-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">✅ Incluye:</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              {pkg.included.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-[#6A3B76] text-sm font-medium mb-4 hover:underline"
        >
          {isExpanded ? '▲ Ver menos' : '▼ Ver qué incluye'}
        </button>

        {/* Price section */}
        <div className="border-t pt-4 mt-auto">
          <div className="flex items-end justify-between mb-4">
            <div>
              {pkg.isOffer && pkg.originalPrice && (
                <span className="text-gray-400 line-through text-sm block">
                  S/ {pkg.originalPrice}
                </span>
              )}
              <span className="text-3xl font-bold text-[#6A3B76]">
                Desde usd$ {pkg.price}
              </span>
              <span className="text-gray-600 text-sm ml-1">x persona</span>
            </div>
          </div>

          <div className="space-y-2">
            <Link
              href={`/packages/${pkg.id}`}
              className="w-full bg-[#6A3B76] hover:bg-[#5a2f66] text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              Ver más detalles
            </Link>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <FaWhatsapp className="text-xl" />
              Consulta por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
