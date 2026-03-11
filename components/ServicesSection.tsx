'use client';

import { FaPlane, FaShip, FaMapMarkedAlt, FaHotel } from 'react-icons/fa';

const services = [
  {
    icon: <FaPlane />,
    title: 'Paquetes nacionales e internacionales',
    description:
      'Diseñamos viajes completos a los destinos más populares y exclusivos del mundo, con todo incluido o a medida según tus preferencias.',
  },
  {
    icon: <FaShip />,
    title: 'Cruceros',
    description:
      'Accedemos a las mejores navieras del mercado y te asesoramos para elegir el crucero ideal según tu presupuesto y estilo de viaje.',
  },
  {
    icon: <FaHotel />,
    title: 'Hoteles y alojamiento',
    description:
      'Seleccionamos alojamientos de calidad en cada destino, adaptados a tus necesidades, desde hospedajes boutique hasta grandes cadenas internacionales.',
  },
  {
    icon: <FaMapMarkedAlt />,
    title: 'Asesoramiento personalizado',
    description:
      'Te acompañamos en cada etapa: desde la planificación hasta tu regreso. Sin bots, sin respuestas automáticas, solo atención humana real.',
  },
];

export default function ServicesSection() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Encabezado */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            ¿Cuál es nuestra{' '}
            <span className="text-[#6A3B76]">función?</span>
          </h2>
          <div className="w-24 h-1.5 bg-[#6A3B76] mx-auto rounded-full mb-6"></div>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
            Somos una agencia de viajes especializada en crear experiencias únicas e
            inolvidables para cada viajero, con atención humana, precios competitivos y
            acompañamiento en todo momento.
          </p>
        </div>

        {/* Grid de Servicios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-7 shadow-sm border border-gray-100 hover:shadow-[0_20px_50px_rgba(106,59,118,0.12)] hover:border-[#6A3B76]/20 transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#6A3B76]/10 flex items-center justify-center text-[#6A3B76] text-2xl mb-5 group-hover:bg-[#6A3B76] group-hover:text-white transition-all duration-300">
                {service.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-[#6A3B76] transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
