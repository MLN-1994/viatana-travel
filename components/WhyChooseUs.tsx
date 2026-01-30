'use client';

import { FaShieldAlt, FaUserFriends, FaDollarSign, FaHeadset } from 'react-icons/fa';

export default function WhyChooseUs() {
  const benefits = [
    {
      icon: <FaHeadset />,
      title: 'Atención personalizada',
      description: 'Nada de bots. Personas reales que te escuchan, te asesoran y te acompañan en cada paso del camino.',
    },
    {
      icon: <FaShieldAlt />,
      title: 'Viajes a medida',
      description: 'Paquetes nacionales e internacionales, cruceros y hoteles adaptados exactamente a lo que buscás.',
    },
    {
      icon: <FaDollarSign />,
      title: 'Cuidamos tu bolsillo',
      description: 'Presupuestos inteligentes. Maximizamos tu experiencia optimizando cada centavo de tu inversión.',
    },
    {
      icon: <FaUserFriends />,
      title: 'Acompañamiento total',
      description: 'No te dejamos solo. Estamos presentes antes, durante y después de tu viaje para tu tranquilidad.',
    },
  ];

  const stats = [
    { value: '+10', label: 'Años de trayectoria' },
    { value: '+5000', label: 'Viajeros felices' },
    { value: '+50', label: 'Destinos globales' },
    { value: '98%', label: 'Satisfacción' },
  ];

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* Cabecera */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
            ¿Por qué <span className="text-[#6A3B76]">elegirnos?</span>
          </h2>
          <div className="w-24 h-1.5 bg-[#6A3B76] mx-auto rounded-full mb-8"></div>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
            Tu compañero de aventuras comprometido con hacer realidad tus sueños de viaje con calidez humana y profesionalismo.
          </p>
        </div>

        {/* Grid de Beneficios */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group relative bg-slate-50 rounded-3xl p-8 transition-all duration-300 hover:bg-white hover:shadow-[0_20px_50px_rgba(106,59,118,0.12)] border border-transparent hover:border-slate-100 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6"
            >
              {/* Contenedor del Icono */}
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-2xl bg-[#6A3B76]/10 flex items-center justify-center text-[#6A3B76] text-3xl group-hover:bg-[#6A3B76] group-hover:text-white transition-all duration-300 shadow-sm">
                  {benefit.icon}
                </div>
              </div>

              {/* Contenido de la Card */}
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#6A3B76] transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Sección de Estadísticas (Stats) */}
        {/* <div className="mt-20 md:mt-28 p-8 md:p-12 bg-[#6A3B76] rounded-[2.5rem] shadow-2xl shadow-[#6A3B76]/20 relative overflow-hidden"> */}
          {/* Decoración sutil de fondo para los stats */}
          {/* <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div> */}
          
          {/* <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-3xl md:text-5xl font-black text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm font-medium text-purple-100 uppercase tracking-widest">
                  {stat.label}
                </div>
              </div>
            ))}
          </div> */}
        {/* </div> */}

      </div>
    </section>
  );
}