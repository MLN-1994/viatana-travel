import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getPostBySlug, getActivePosts } from '@/lib/posts';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getActivePosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: 'Post no encontrado | Viatana Travel' };

  return {
    title: `${post.title} | Blog de Viajes Viatana Travel`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.coverImage, width: 1200, height: 630, alt: post.title }],
      type: 'article',
    },
  };
}

export const revalidate = 60;

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="max-w-3xl mx-auto px-4 pt-8 pb-2">
        <nav className="flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-[#6A3B76] transition">Inicio</Link>
          <span>/</span>
          <Link href="/blog-de-viajes" className="hover:text-[#6A3B76] transition">Blog de Viajes</Link>
          <span>/</span>
          <span className="text-gray-600 truncate max-w-[200px]">{post.title}</span>
        </nav>
      </div>

      <article className="max-w-3xl mx-auto px-4 py-8 md:py-12">
        {/* Título */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
          {post.title}
        </h1>

        {/* Subtítulo */}
        {post.subtitle && (
          <h2 className="text-xl md:text-2xl font-light text-[#6A3B76] mb-6">
            {post.subtitle}
          </h2>
        )}

        {/* Fecha */}
        {post.createdAt && (
          <p className="text-sm text-gray-400 mb-8">
            {new Date(post.createdAt).toLocaleDateString('es-AR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        )}

        {/* Imagen destacada */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-10 shadow-md">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover"
            priority
          />
        </div>

        {/* Bloque de texto 1 */}
        <div className="prose prose-lg prose-purple max-w-none text-gray-700 leading-relaxed mb-10 whitespace-pre-wrap">
          {post.contentP1}
        </div>

        {/* Imagen secundaria (opcional) */}
        {post.secondImage && (
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-10 shadow-sm">
            <Image
              src={post.secondImage}
              alt={`Foto adicional - ${post.title}`}
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover"
            />
          </div>
        )}

        {/* Bloque de texto 2 (opcional) */}
        {post.contentP2 && (
          <div className="prose prose-lg prose-purple max-w-none text-gray-700 leading-relaxed mb-10 whitespace-pre-wrap">
            {post.contentP2}
          </div>
        )}

        {/* Volver al blog */}
        <div className="border-t border-gray-100 pt-8 mt-8">
          <Link
            href="/blog-de-viajes"
            className="inline-flex items-center gap-2 text-[#6A3B76] font-semibold hover:underline"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Volver al Blog de Viajes
          </Link>
        </div>
      </article>
    </main>
  );
}
