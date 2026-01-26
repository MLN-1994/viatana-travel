import { NextRequest, NextResponse } from 'next/server';
import { getBannerById, updateBanner, deleteBanner } from '@/lib/banners';
import { auth } from '@/lib/auth';
import { bannerUpdateSchema } from "@/lib/validations/banner";

// GET /api/banners/[id] - Obtener banner por ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const banner = await getBannerById(id);

    if (!banner) {
      return NextResponse.json(
        { error: 'Banner no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(banner);
  } catch (error) {
    console.error('Error fetching banner:', error);
    return NextResponse.json(
      { error: 'Error al obtener banner' },
      { status: 500 }
    );
  }
}

// PUT /api/banners/[id] - Actualizar banner (requiere autenticación)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }
    const { id } = await params;
    const body = await request.json();
    const parseResult = bannerUpdateSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json({
        error: "Datos inválidos",
        details: parseResult.error.flatten()
      }, { status: 400 });
    }
    const updatedBanner = await updateBanner(id, parseResult.data);
    if (!updatedBanner) {
      return NextResponse.json(
        { error: 'Error al actualizar banner' },
        { status: 500 }
      );
    }
    return NextResponse.json(updatedBanner);
  } catch (error) {
    console.error('Error updating banner:', error);
    return NextResponse.json(
      { error: 'Error al actualizar banner' },
      { status: 500 }
    );
  }
}

// DELETE /api/banners/[id] - Eliminar banner (requiere autenticación)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }
    const { id } = await params;
    const success = await deleteBanner(id);

    if (!success) {
      return NextResponse.json(
        { error: 'Error al eliminar banner' },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: 'Banner eliminado correctamente' });
  } catch (error) {
    console.error('Error deleting banner:', error);
    return NextResponse.json(
      { error: 'Error al eliminar banner' },
      { status: 500 }
    );
  }
}
