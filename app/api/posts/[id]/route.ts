import { NextRequest, NextResponse } from 'next/server';
import { getPostById, updatePost, deletePost } from '@/lib/posts';
import { auth } from '@/lib/auth';
import { postUpdateSchema } from '@/lib/validations/post';

// GET /api/posts/[id]
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const post = await getPostById(id);
    if (!post) {
      return NextResponse.json({ error: 'Post no encontrado' }, { status: 404 });
    }
    return NextResponse.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json({ error: 'Error al obtener post' }, { status: 500 });
  }
}

// PUT /api/posts/[id]
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
    const parseResult = postUpdateSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: 'Datos inválidos', details: parseResult.error.flatten() },
        { status: 400 }
      );
    }

    const updated = await updatePost(id, parseResult.data);
    if (!updated) {
      return NextResponse.json({ error: 'Error al actualizar post' }, { status: 500 });
    }
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json({ error: 'Error al actualizar post' }, { status: 500 });
  }
}

// DELETE /api/posts/[id]
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
    const ok = await deletePost(id);
    if (!ok) {
      return NextResponse.json({ error: 'Error al eliminar post' }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json({ error: 'Error al eliminar post' }, { status: 500 });
  }
}
