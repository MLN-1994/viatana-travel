'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { TravelPackage } from '@/types';
import { contactInfo } from '@/data/packages';
import { FaWhatsapp, FaArrowLeft, FaClock, FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa';

export default function PackageDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [pkg, setPkg] = useState<TravelPackage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const response = await fetch(`/api/packages/${params.id}`);
        if (response.ok) {
          const data = await response.json();
          setPkg(data);
        } else {
          console.error('Package not found');
        }
      } catch (error) {
        console.error('Error fetching package:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackage();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">Cargando...</div>
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <div className="text-2xl text-gray-600">Paquete no encontrado</div>
        <button
          onClick={() => router.push('/')}
          className="px-6 py-3 bg-[#6A3B76] text-white rounded-lg hover:bg-[#5a2f66] transition-colors"
        >
          Volver al inicio
        </button>
      </div>
    );
  }

  const whatsappMessage = `Hola! Estoy interesado en el paquete: ${pkg.title} - ${pkg.destination}. Me gustaría recibir más información.`;
  const whatsappLink = `https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="flex-1 bg-gradient-to-b from-purple-50 to-white">
      {/* Header Section */}
      <div className="relative h-[400px] md:h-[500px] w-full">
        <Image
          src={pkg.image}
          alt={pkg.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="absolute top-8 left-8 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all hover:scale-105 z-10"
        >
          <FaArrowLeft className="text-xl" />
        </button>

        {/* Offer Badge */}
        {pkg.isOffer && pkg.discount && (
          <div className="absolute top-8 right-8 bg-red-500 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg z-10">
            -{pkg.discount}% OFF
          </div>
        )}

        {/* Title Section */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="max-w-6xl mx-auto">
            <div className="inline-block bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-4">
              {pkg.category.charAt(0).toUpperCase() + pkg.category.slice(1)}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 drop-shadow-lg">
              {pkg.title}
            </h1>
            <div className="flex items-center gap-6 text-white text-lg">
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-xl" />
                <span>{pkg.destination}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaClock className="text-xl" />
                <span>{pkg.duration}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Descripción del Paquete</h2>
              <p className="text-gray-700 text-lg leading-relaxed">{pkg.description}</p>
            </div>

            {/* What's Included */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                <FaCheckCircle className="inline mr-3 text-green-500" />
                ¿Qué incluye?
              </h2>
              <ul className="space-y-4">
                {pkg.included.map((item, index) => (
                  <li key={index} className="flex items-start gap-4 text-gray-700">
                    <span className="text-green-500 text-2xl mt-1">✓</span>
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Additional Information */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Información Adicional</h2>
              <div className="space-y-3 text-gray-700">
                <p className="flex items-center gap-3">
                  <span className="font-semibold text-[#6A3B76]">Duración:</span>
                  <span>{pkg.duration}</span>
                </p>
                <p className="flex items-center gap-3">
                  <span className="font-semibold text-[#6A3B76]">Destino:</span>
                  <span>{pkg.destination}</span>
                </p>
                <p className="flex items-center gap-3">
                  <span className="font-semibold text-[#6A3B76]">Categoría:</span>
                  <span className="capitalize">{pkg.category}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar - Booking Card */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-2xl p-8 sticky top-8">
              <div className="text-center mb-6">
                <div className="text-gray-600 text-sm mb-2">Precio por persona</div>
                {pkg.isOffer && pkg.originalPrice && (
                  <div className="text-gray-400 line-through text-xl mb-1">
                    USD ${pkg.originalPrice}
                  </div>
                )}
                <div className="text-5xl font-bold text-[#6A3B76] mb-1">
                  ${pkg.price}
                </div>
                <div className="text-gray-600 text-sm">USD por persona</div>
              </div>

              <div className="border-t border-gray-200 pt-6 mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">Resumen rápido:</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <FaClock className="text-[#6A3B76]" />
                    <span>{pkg.duration}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-[#6A3B76]" />
                    <span>{pkg.destination}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500" />
                    <span>{pkg.included.length} servicios incluidos</span>
                  </li>
                </ul>
              </div>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-lg transition-all transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg"
              >
                <FaWhatsapp className="text-2xl" />
                <span>Consultar disponibilidad</span>
              </a>

              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  o llámanos al{' '}
                  <a href={`tel:${contactInfo.phone}`} className="text-[#6A3B76] font-semibold hover:underline">
                    {contactInfo.phone}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
