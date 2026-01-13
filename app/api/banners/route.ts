import { NextRequest, NextResponse } from 'next/server';
import { getBanners, getActiveBanners, addBanner } from '@/lib/banners';
import { auth } from '@/lib/auth';
import type { Banner } from '@/types';

// GET /api/banners - Obtener banners (públicos activos o todos si es admin)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const activeOnly = searchParams.get('active') === 'true';

  try {
    const banners = activeOnly ? await getActiveBanners() : await getBanners();
    return NextResponse.json(banners);
  } catch (error) {
    console.error('Error fetching banners:', error);
    return NextResponse.json(
      { error: 'Error al obtener banners' },
      { status: 500 }
    );
  }
}

// POST /api/banners - Crear nuevo banner (requiere autenticación)
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    const body = await request.json();
    
    // Validaciones básicas
    if (!body.title || !body.imageUrl) {
      return NextResponse.json(
        { error: 'Título e imagen son requeridos' },
        { status: 400 }
      );
    }

    const bannerData: Omit<Banner, 'id' | 'createdAt' | 'updatedAt'> = {
      title: body.title,
      subtitle: body.subtitle || '',
      imageUrl: body.imageUrl,
      linkUrl: body.linkUrl || '',
      buttonText: body.buttonText || '',
      isActive: body.isActive !== undefined ? body.isActive : true,
      displayOrder: body.displayOrder || 0,
    };

    const newBanner = await addBanner(bannerData);

    if (!newBanner) {
      return NextResponse.json(
        { error: 'Error al crear banner' },
        { status: 500 }
      );
    }

    return NextResponse.json(newBanner, { status: 201 });
  } catch (error) {
    console.error('Error creating banner:', error);
    return NextResponse.json(
      { error: 'Error al crear banner' },
      { status: 500 }
    );
  }
}
