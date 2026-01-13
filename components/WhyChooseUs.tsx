'use client';

import { FaShieldAlt, FaUserFriends, FaDollarSign, FaHeadset, FaMapMarkedAlt, FaStar } from 'react-icons/fa';

export default function WhyChooseUs() {
  const benefits = [
    {
      icon: <FaShieldAlt className="text-4xl" />,
      title: 'Confianza y Seguridad',
      description: 'Viaja con tranquilidad. Todos nuestros paquetes cuentan con seguros y garantías.',
    },
    {
      icon: <FaDollarSign className="text-4xl" />,
      title: 'Mejores Precios',
      description: 'Ofertas exclusivas y precios competitivos. Calidad sin comprometer tu presupuesto.',
    },
    {
      icon: <FaUserFriends className="text-4xl" />,
      title: 'Experiencia Personalizada',
      description: 'Adaptamos cada viaje a tus necesidades. Tu experiencia, a tu medida.',
    },
    {
      icon: <FaHeadset className="text-4xl" />,
      title: 'Atención 24/7',
      description: 'Estamos contigo antes, durante y después de tu viaje. Soporte constante.',
    },
    {
      icon: <FaMapMarkedAlt className="text-4xl" />,
      title: 'Destinos Únicos',
      description: 'Seleccionamos los mejores destinos y experiencias inolvidables para ti.',
    },
    {
      icon: <FaStar className="text-4xl" />,
      title: 'Años de Experiencia',
      description: 'Más de 10 años creando momentos especiales y recuerdos que duran toda la vida.',
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 md:mb-4">
            ¿Por Qué Elegirnos?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base lg:text-lg">
            Tu compañero de aventuras comprometido con hacer realidad tus sueños de viaje.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-5 md:p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center"
            >
              <div className="text-[#6A3B76] mb-3 md:mb-4 flex justify-center">
                {benefit.icon}
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 md:mb-3">
                {benefit.title}
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats section */}
        <div className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
          <div>
            <div className="text-3xl md:text-4xl font-bold text-[#6A3B76] mb-1 md:mb-2">+10</div>
            <div className="text-xs md:text-sm text-gray-600">Años</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-[#6A3B76] mb-1 md:mb-2">+5000</div>
            <div className="text-xs md:text-sm text-gray-600">Viajeros</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-[#6A3B76] mb-1 md:mb-2">+50</div>
            <div className="text-xs md:text-sm text-gray-600">Destinos</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-[#6A3B76] mb-1 md:mb-2">98%</div>
            <div className="text-xs md:text-sm text-gray-600">Satisfacción</div>
          </div>
        </div>
      </div>
    </section>
  );
}
