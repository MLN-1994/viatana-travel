import { NextRequest, NextResponse } from 'next/server';
import { getTestimonialById, updateTestimonial, deleteTestimonial } from '@/lib/testimonials';
import { auth } from '@/lib/auth';
import { testimonialUpdateSchema } from '@/lib/validations/testimonial';

// GET /api/testimonials/[id]
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const testimonial = await getTestimonialById(id);
    if (!testimonial) {
      return NextResponse.json({ error: 'Testimonio no encontrado' }, { status: 404 });
    }
    return NextResponse.json(testimonial);
  } catch (error) {
    console.error('Error fetching testimonial:', error);
    return NextResponse.json({ error: 'Error al obtener testimonio' }, { status: 500 });
  }
}

// PUT /api/testimonials/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const parseResult = testimonialUpdateSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: 'Datos inválidos', details: parseResult.error.flatten() },
        { status: 400 }
      );
    }

    const updated = await updateTestimonial(id, parseResult.data);
    if (!updated) {
      return NextResponse.json({ error: 'Error al actualizar testimonio' }, { status: 500 });
    }
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating testimonial:', error);
    return NextResponse.json({ error: 'Error al actualizar testimonio' }, { status: 500 });
  }
}

// DELETE /api/testimonials/[id]
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { id } = await params;
    const ok = await deleteTestimonial(id);
    if (!ok) {
      return NextResponse.json({ error: 'Error al eliminar testimonio' }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    return NextResponse.json({ error: 'Error al eliminar testimonio' }, { status: 500 });
  }
}
