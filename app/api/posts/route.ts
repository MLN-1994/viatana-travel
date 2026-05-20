import { NextRequest, NextResponse } from 'next/server';
import { getAllPosts, getActivePosts, addPost } from '@/lib/posts';
import { auth } from '@/lib/auth';
import { postSchema } from '@/lib/validations/post';

// GET /api/posts?active=true  → activos (público)
// GET /api/posts              → todos (requiere auth)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const activeOnly = searchParams.get('active') === 'true';

  try {
    const data = activeOnly ? await getActivePosts() : await getAllPosts();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Error al obtener posts' }, { status: 500 });
  }
}

// POST /api/posts - Crear post (requiere auth)
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const body = await request.json();
    const parseResult = postSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: 'Datos inválidos', details: parseResult.error.flatten() },
        { status: 400 }
      );
    }

    const newPost = await addPost(parseResult.data);
    if (!newPost) {
      return NextResponse.json({ error: 'Error al crear post' }, { status: 500 });
    }

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: 'Error al crear post' }, { status: 500 });
  }
}
