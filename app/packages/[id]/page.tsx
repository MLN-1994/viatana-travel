import type { Metadata } from 'next';
import { getPackageById } from '@/lib/packages';
import PackageDetailClient from './PackageDetailClient';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const pkg = await getPackageById(id);

  if (!pkg) {
    return { title: 'Paquete no encontrado' };
  }

  const description = `${pkg.description.slice(0, 150)}… Duración: ${pkg.duration}. Consultá disponibilidad con Viatana Travel.`;

  return {
    title: `${pkg.title} — ${pkg.destination}`,
    description,
    alternates: { canonical: `/packages/${id}` },
    openGraph: {
      title: `${pkg.title} | Viatana Travel`,
      description,
      url: `https://viatana.travel/packages/${id}`,
      images: pkg.image ? [{ url: pkg.image, alt: pkg.title }] : [],
    },
  };
}

export default function PackageDetailPage() {
  return <PackageDetailClient />;
}

