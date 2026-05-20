import { NextRequest, NextResponse } from 'next/server';
import { getSiteSettings, updateSiteSettings } from '@/lib/site-settings';
import { auth } from '@/lib/auth';

// GET /api/site-settings — público (los textos son públicos)
export async function GET() {
  try {
    const settings = await getSiteSettings();
    return NextResponse.json(settings);
  } catch {
    return NextResponse.json({ error: 'Error al obtener configuración' }, { status: 500 });
  }
}

// PUT /api/site-settings — solo admin
export async function PUT(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const body = await request.json();

    // Validar que sea un objeto plano de strings
    if (typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json({ error: 'Formato inválido' }, { status: 400 });
    }

    const updates: Record<string, string> = {};
    for (const [k, v] of Object.entries(body)) {
      if (typeof v === 'string') updates[k] = v;
    }

    const ok = await updateSiteSettings(updates);
    if (!ok) {
      return NextResponse.json({ error: 'Error al guardar' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Error inesperado' }, { status: 500 });
  }
}
