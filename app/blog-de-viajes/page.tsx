import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getActivePosts } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'Blog de Viajes | Viatana Travel',
  description: 'Descubrí consejos, destinos y experiencias de viaje. El blog de Viatana Travel para inspirarte en tu próxima aventura.',
  openGraph: {
    title: 'Blog de Viajes | Viatana Travel',
    description: 'Destinos, consejos y experiencias de viaje por Viatana Travel.',
    type: 'website',
  },
};

export const revalidate = 60; // ISR: revalidar cada 60 segundos

export default async function BlogListPage() {
  const posts = await getActivePosts();

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative min-h-[500px] flex items-center justify-center overflow-hidden bg-[#6A3B76]">
        {/* Fondo con degradado refinado */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#6A3B76] via-[#7B4A8B] to-[#8B5A9F]"></div>

        {/* Overlay sutil */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"></div>

        {/* Elemento decorativo */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 container mx-auto px-6 lg:px-12 text-center">
          <div className="max-w-4xl mx-auto">
            <span className="inline-block px-4 py-1 mb-6 text-sm font-medium tracking-widest uppercase bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white/90">
              Blog de Viajes
            </span>

            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight text-white">
              Inspiración para tu{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70">próxima aventura</span>
            </h1>

            <div className="w-20 h-1 bg-[#8B5A9F] mx-auto mb-8 rounded-full shadow-lg"></div>

            <p className="text-lg md:text-2xl text-white/90 leading-relaxed font-light max-w-2xl mx-auto">
              Destinos, consejos y experiencias para que tu viaje sea <span className="font-semibold text-white">inolvidable.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Grid de posts */}
      <section className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">Próximamente nuevas entradas.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                {/* Imagen portada 16:9 */}
                <Link href={`/blog-de-viajes/${post.slug}`} className="relative block w-full aspect-video overflow-hidden">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>

                {/* Contenido */}
                <div className="p-6 flex flex-col flex-1 gap-3">
                  <h2 className="text-lg font-bold text-gray-900 leading-snug group-hover:text-[#6A3B76] transition-colors line-clamp-2">
                    <Link href={`/blog-de-viajes/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 flex-1">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/blog-de-viajes/${post.slug}`}
                    className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-[#6A3B76] hover:underline"
                  >
                    Leer nota
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
