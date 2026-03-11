'use client';

import { FaPlane, FaShip, FaHotel, FaMapMarkedAlt, FaPassport, FaUsers } from 'react-icons/fa';

export default function NuestrosServicios() {
  const services = [
    {
      icon: <FaPlane />,
      title: 'Vuelos nacionales e internacionales',
      description: 'Buscamos las mejores tarifas aéreas para que llegues a cualquier destino del mundo sin gastar de más.',
    },
    {
      icon: <FaShip />,
      title: 'Cruceros',
      description: 'Experiencias únicas navegando por los destinos más soñados, con todo incluido y servicio de primera.',
    },
    {
      icon: <FaHotel />,
      title: 'Alojamiento',
      description: 'Hoteles, apart-hoteles y alojamientos boutique seleccionados para que tu estadía sea perfecta.',
    },
    {
      icon: <FaMapMarkedAlt />,
      title: 'Paquetes a medida',
      description: 'Armamos tu itinerario completo según tus preferencias, fechas y presupuesto, sin moldes ni plantillas.',
    },
    {
      icon: <FaPassport />,
      title: 'Asesoramiento integral',
      description: 'Te orientamos en visas, documentación, seguros de viaje y todo lo que necesitás antes de partir.',
    },
    {
      icon: <FaUsers />,
      title: 'Viajes grupales y empresariales',
      description: 'Organizamos viajes para grupos, familias, amigos y eventos corporativos con atención dedicada.',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-6">

        {/* Cabecera */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
            ¿Qué <span className="text-[#6A3B76]">hacemos?</span>
          </h2>
          <div className="w-24 h-1.5 bg-[#6A3B76] mx-auto rounded-full mb-8"></div>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
            Somos tu agencia de viajes de confianza. Te ayudamos a planificar, reservar y vivir experiencias
            inolvidables, con asesoramiento real en cada etapa.
          </p>
        </div>

        {/* Grid de Servicios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-3xl p-8 transition-all duration-300 hover:shadow-[0_20px_50px_rgba(106,59,118,0.12)] border border-slate-100 hover:border-[#6A3B76]/20 flex flex-col items-start gap-5"
            >
              {/* Icono */}
              <div className="w-14 h-14 rounded-2xl bg-[#6A3B76]/10 flex items-center justify-center text-[#6A3B76] text-2xl group-hover:bg-[#6A3B76] group-hover:text-white transition-all duration-300 shadow-sm flex-shrink-0">
                {service.icon}
              </div>

              {/* Contenido */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-[#6A3B76] transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-500 leading-relaxed text-sm md:text-base">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
