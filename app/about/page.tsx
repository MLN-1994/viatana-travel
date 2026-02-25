import type { Metadata } from 'next';
import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';
import { contactInfo } from '@/data/packages';

export const metadata: Metadata = {
  title: 'Sobre Nosotros - Viatana Travel',
  description: 'Conoce nuestra historia, misión, visión y valores. Viatana Travel es tu agencia de viajes de confianza con años de experiencia creando experiencias inolvidables.',
  keywords: 'sobre nosotros, viatana travel, agencia de viajes, nuestra historia, misión, visión, valores',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Sección Sobre Nosotros actualizada */}
      <section className="relative min-h-[500px] flex items-center justify-center overflow-hidden bg-[#6A3B76]">
  {/* Fondo con degradado refinado y un toque de textura */}
  <div className="absolute inset-0 bg-gradient-to-br from-[#6A3B76] via-[#7B4A8B] to-[#8B5A9F]"></div>
  
  {/* Overlay sutil para mejorar legibilidad sin oscurecer demasiado */}
  <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"></div>

  {/* Elemento decorativo: Círculo difuminado para dar profundidad visual */}
  <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

  <div className="relative z-10 container mx-auto px-6 lg:px-12 text-center">
    <div className="max-w-4xl mx-auto">
      {/* Etiqueta superior opcional para contexto */}
      <span className="inline-block px-4 py-1 mb-6 text-sm font-medium tracking-widest uppercase bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white/90">
        Bienvenido a Viatana
      </span>

      <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight text-white">
        Viajar debería ser <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70">simple, seguro y memorable.</span>
      </h1>

      <div className="w-20 h-1 bg-[#8B5A9F] mx-auto mb-8 rounded-full shadow-lg"></div>

      <p className="text-lg md:text-2xl text-white/90 leading-relaxed font-light max-w-2xl mx-auto">
        En Viatana combinamos años de experiencia y atención humana para transformar cada destino en una <span className="font-semibold text-white">experiencia única.</span>
      </p>
      
      {/* Espacio para un botón de acción (Call to Action) */}
      
    </div>
  </div>
</section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#6A3B76] mb-8 text-center">NUESTRA HISTORIA</h2>
            <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
              <p className="text-center">
                <span className="font-bold text-[#6A3B76]">Viatana Travel</span> nace con una idea clara: volver a poner a las <span className="font-bold">personas</span> en el centro del viaje. Después de más de <span className="font-bold">20 años de experiencia</span> en la industria turística, entendimos que <span className="font-bold">viajar</span> no debería sentirse como una compra automática, sino como una <span className="font-bold">experiencia acompañada</span> desde el primer momento. Por eso creamos una agencia enfocada en <span className="font-bold">escuchar</span>, asesorar y diseñar viajes reales para personas reales. Cada destino, cada propuesta y cada detalle están pensados para que el viajero disfrute con tranquilidad, sabiendo que hay un equipo profesional detrás que lo acompaña antes, durante y después del viaje. Porque creemos que los mejores recuerdos empiezan con una <span className="font-bold">buena atención</span>.
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
                Brindar experiencias de viaje diseñadas a medida, con atención humana real, precios competitivos y acompañamiento integral, para que cada persona viaje tranquila, sin sorpresas y con la confianza de estar respaldada en cada etapa del camino.
              </p>
            </div>

            {/* Visión */}
            <div className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-[#6A3B76]">
              <div className="text-5xl mb-4 text-center">🌟</div>
              <h3 className="text-2xl font-bold text-[#6A3B76] mb-4 text-center">
                Nuestra Visión
              </h3>
              <p className="text-gray-700 text-center leading-relaxed">
                Ser una agencia de viajes referente por su cercanía y excelencia en servicio, combinando experiencia, innovación y alianzas estratégicas con operadores y aerolíneas para ofrecer viajes cada vez más accesibles, eficientes y personalizados, conectando a las personas con el mundo de una manera simple y confiable.
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
              <div className="text-5xl mb-4">🧑‍🤝‍🧑</div>
              <h4 className="text-xl font-bold text-[#6A3B76] mb-2">Atencion humana real</h4>
              <p className="text-gray-600">
                Personas reales acompañando cada viaje, sin automatizaciones ni respuestas impersonales.
              </p>
            </div>

            {/* Valor 2 */}
            <div className="text-center p-6 rounded-lg hover:bg-gray-50 transition">
              <div className="text-5xl mb-4">⭐</div>
              <h4 className="text-xl font-bold text-[#6A3B76] mb-2">Compromiso con el viajero</h4>
              <p className="text-gray-600">
                Acompañamos antes, durante y después del viaje, cuidando cada detalle.
              </p>
            </div>

            {/* Valor 3 */}
            <div className="text-center p-6 rounded-lg hover:bg-gray-50 transition">
              <div className="text-5xl mb-4">🌍</div>
              <h4 className="text-xl font-bold text-[#6A3B76] mb-2">Pasión por viajar</h4>
              <p className="text-gray-600">
                Exploramos destinos y experiencias para ofrecer propuestas auténticas.
              </p>
            </div>

            {/* Valor 4 */}
            <div className="text-center p-6 rounded-lg hover:bg-gray-50 transition">
              <div className="text-5xl mb-4">🤝</div>
              <h4 className="text-xl font-bold text-[#6A3B76] mb-2">Confianza y transparencia</h4>
              <p className="text-gray-600">
                Asesoramos con honestidad para encontrar siempre la mejor opción.

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
                Más de 20 años de experiencia en la industria turística respaldan cada propuesta y recomendación que realizamos.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-3">🎨</div>
              <h4 className="text-xl font-bold text-[#6A3B76] mb-3">Paquetes Personalizados</h4>
              <p className="text-gray-600">
               Todos los destinos y experiencias que ofrecemos son previamente evaluados por nuestro equipo, asegurando calidad y confianza en cada viaje.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-3">🛡️</div>
              <h4 className="text-xl font-bold text-[#6A3B76] mb-3">Garantía y Seguridad</h4>
              <p className="text-gray-600">
                Acompañamiento permanente y asistencia ante imprevistos para que viajes con tranquilidad en todo momento.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-3">💰</div>
              <h4 className="text-xl font-bold text-[#6A3B76] mb-3">Mejor Relación Calidad-Precio</h4>
              <p className="text-gray-600">
                Creamos viajes a medida y combinaciones exclusivas que optimizan costos sin resignar experiencia ni calidad.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-3">💬</div>
              <h4 className="text-xl font-bold text-[#6A3B76] mb-3">Atención Personalizada</h4>
              <p className="text-gray-600">
                Te escuchamos, te asesoramos y diseñamos tu viaje de manera directa y humana, sin bots ni respuestas automáticas
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-3">🌟</div>
              <h4 className="text-xl font-bold text-[#6A3B76] mb-3">Miles de Viajeros Felices</h4>
              <p className="text-gray-600">
                Viajeros y empresas nos eligen y recomiendan desde hace más de dos décadas gracias a nuestro compromiso y servicio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-[#6A3B76] to-[#8B5A9F] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Listo para tu próxima experiencia?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Dejanos ayudarte a planificar el viaje que estás imaginando.
Nuestro equipo está listo para acompañarte y crear una experiencia inolvidable pensada especialmente para vos.

          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#paquetes"
              className="bg-white text-[#6A3B76] font-bold py-3 px-8 rounded-lg transition inline-block border-2 border-white hover:bg-[#6A3B76] hover:text-white hover:border-white"
            >
              Ver paquetes
            </Link>
            <a
              href={`https://wa.me/${contactInfo.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3 px-8 rounded-xl transition-all shadow-sm shadow-green-100 text-base md:text-lg"
              title="Consultar por WhatsApp"
            >
              <FaWhatsapp className="text-2xl" />
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
