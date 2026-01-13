import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sobre Nosotros - Viatana Travel',
  description: 'Conoce nuestra historia, misión, visión y valores. Viatana Travel es tu agencia de viajes de confianza con años de experiencia creando experiencias inolvidables.',
  keywords: 'sobre nosotros, viatana travel, agencia de viajes, nuestra historia, misión, visión, valores',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-r from-[#6A3B76] to-[#8B5A9F] flex items-center justify-center text-white">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Sobre Nosotros</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Tu agencia de viajes de confianza, creando experiencias inolvidables desde hace años
          </p>
        </div>
      </section>

      {/* Nuestra Historia */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#6A3B76] mb-6 text-center">
              📖 Nuestra Historia
            </h2>
            <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
              <p>
                <strong>Viatana Travel</strong> nació del sueño de compartir la belleza del mundo con viajeros que buscan experiencias auténticas y memorables. Fundada por un equipo de apasionados por los viajes, nuestra agencia se ha convertido en un referente de confianza para miles de familias, parejas y aventureros.
              </p>
              <p>
                Desde nuestros inicios, hemos mantenido un compromiso inquebrantable: ofrecer paquetes de viaje personalizados que superen las expectativas de nuestros clientes. Cada destino que ofrecemos ha sido cuidadosamente seleccionado y cada itinerario diseñado pensando en crear recuerdos que duren toda la vida.
              </p>
              <p>
                Hoy, con presencia en múltiples destinos alrededor del mundo, seguimos creciendo gracias a la confianza de nuestros viajeros y nuestro equipo de expertos dedicados a hacer de cada viaje una experiencia extraordinaria.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Misión */}
            <div className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-[#6A3B76]">
              <div className="text-5xl mb-4 text-center">🎯</div>
              <h3 className="text-2xl font-bold text-[#6A3B76] mb-4 text-center">
                Nuestra Misión
              </h3>
              <p className="text-gray-700 text-center leading-relaxed">
                Proporcionar experiencias de viaje excepcionales que inspiren, transformen y creen recuerdos inolvidables, ofreciendo un servicio personalizado y de calidad que supere las expectativas de cada viajero.
              </p>
            </div>

            {/* Visión */}
            <div className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-[#6A3B76]">
              <div className="text-5xl mb-4 text-center">🌟</div>
              <h3 className="text-2xl font-bold text-[#6A3B76] mb-4 text-center">
                Nuestra Visión
              </h3>
              <p className="text-gray-700 text-center leading-relaxed">
                Ser la agencia de viajes líder reconocida por nuestra excelencia en servicio, innovación en experiencias turísticas y compromiso con el viajero, conectando personas con destinos extraordinarios alrededor del mundo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Nuestros Valores */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#6A3B76] mb-12 text-center">
            💎 Nuestros Valores
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {/* Valor 1 */}
            <div className="text-center p-6 rounded-lg hover:bg-gray-50 transition">
              <div className="text-5xl mb-4">🤝</div>
              <h4 className="text-xl font-bold text-[#6A3B76] mb-2">Confianza</h4>
              <p className="text-gray-600">
                Construimos relaciones duraderas basadas en la transparencia y el compromiso con nuestros clientes.
              </p>
            </div>

            {/* Valor 2 */}
            <div className="text-center p-6 rounded-lg hover:bg-gray-50 transition">
              <div className="text-5xl mb-4">⭐</div>
              <h4 className="text-xl font-bold text-[#6A3B76] mb-2">Excelencia</h4>
              <p className="text-gray-600">
                Buscamos la perfección en cada detalle, ofreciendo servicios de la más alta calidad.
              </p>
            </div>

            {/* Valor 3 */}
            <div className="text-center p-6 rounded-lg hover:bg-gray-50 transition">
              <div className="text-5xl mb-4">🌍</div>
              <h4 className="text-xl font-bold text-[#6A3B76] mb-2">Pasión</h4>
              <p className="text-gray-600">
                Amamos lo que hacemos y esa pasión se refleja en cada viaje que organizamos.
              </p>
            </div>

            {/* Valor 4 */}
            <div className="text-center p-6 rounded-lg hover:bg-gray-50 transition">
              <div className="text-5xl mb-4">💡</div>
              <h4 className="text-xl font-bold text-[#6A3B76] mb-2">Innovación</h4>
              <p className="text-gray-600">
                Constantemente buscamos nuevas formas de mejorar y sorprender a nuestros viajeros.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Por Qué Elegirnos */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#6A3B76] mb-12 text-center">
            ✨ ¿Por Qué Elegir Viatana Travel?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-3">👨‍✈️</div>
              <h4 className="text-xl font-bold text-[#6A3B76] mb-3">Expertos en Viajes</h4>
              <p className="text-gray-600">
                Nuestro equipo cuenta con años de experiencia y conocimiento profundo de cada destino que ofrecemos.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-3">🎨</div>
              <h4 className="text-xl font-bold text-[#6A3B76] mb-3">Paquetes Personalizados</h4>
              <p className="text-gray-600">
                Cada viaje se adapta a tus necesidades, preferencias y presupuesto para una experiencia única.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-3">🛡️</div>
              <h4 className="text-xl font-bold text-[#6A3B76] mb-3">Garantía y Seguridad</h4>
              <p className="text-gray-600">
                Viaja con tranquilidad sabiendo que cuentas con nuestro respaldo y asistencia 24/7.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-3">💰</div>
              <h4 className="text-xl font-bold text-[#6A3B76] mb-3">Mejor Relación Calidad-Precio</h4>
              <p className="text-gray-600">
                Negociamos directamente con proveedores para ofrecerte las mejores tarifas sin comprometer calidad.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-3">💬</div>
              <h4 className="text-xl font-bold text-[#6A3B76] mb-3">Atención Personalizada</h4>
              <p className="text-gray-600">
                Desde la planificación hasta tu regreso, estaremos contigo en cada paso del camino.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-3">🌟</div>
              <h4 className="text-xl font-bold text-[#6A3B76] mb-3">Miles de Viajeros Felices</h4>
              <p className="text-gray-600">
                Nuestra mejor referencia son los testimonios y recomendaciones de quienes ya viajaron con nosotros.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-[#6A3B76] to-[#8B5A9F] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Listo para tu próxima aventura?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Déjanos ayudarte a planificar el viaje de tus sueños. Nuestro equipo de expertos está listo para crear una experiencia inolvidable solo para ti.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#paquetes"
              className="bg-white text-[#6A3B76] hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition inline-block"
            >
              Ver Paquetes
            </Link>
            <Link
              href="/#contacto"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-[#6A3B76] font-bold py-3 px-8 rounded-lg transition inline-block"
            >
              Contáctanos
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
