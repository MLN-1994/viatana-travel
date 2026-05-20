import { NextRequest, NextResponse } from 'next/server';
import { getTestimonials, getActiveTestimonials, addTestimonial } from '@/lib/testimonials';
import { auth } from '@/lib/auth';
import { testimonialSchema } from '@/lib/validations/testimonial';

// GET /api/testimonials?active=true  → activos (público)
// GET /api/testimonials              → todos (requiere auth)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const activeOnly = searchParams.get('active') === 'true';

  try {
    const data = activeOnly ? await getActiveTestimonials() : await getTestimonials();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json({ error: 'Error al obtener testimonios' }, { status: 500 });
  }
}

// POST /api/testimonials - Crear testimonio (requiere auth)
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const body = await request.json();
    const parseResult = testimonialSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: 'Datos inválidos', details: parseResult.error.flatten() },
        { status: 400 }
      );
    }

    const newTestimonial = await addTestimonial(parseResult.data);
    if (!newTestimonial) {
      return NextResponse.json({ error: 'Error al crear testimonio' }, { status: 500 });
    }

    return NextResponse.json(newTestimonial, { status: 201 });
  } catch (error) {
    console.error('Error creating testimonial:', error);
    return NextResponse.json({ error: 'Error al crear testimonio' }, { status: 500 });
  }
}
