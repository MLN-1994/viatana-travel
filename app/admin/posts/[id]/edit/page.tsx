'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import PostForm from '@/components/PostForm';
import type { Post } from '@/types';

export default function EditPostPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/posts/${id}`)
      .then((r) => r.json())
      .then((data) => setPost(data))
      .catch(() => setPost(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Cargando entrada...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Entrada no encontrada.</p>
      </div>
    );
  }

  return <PostForm mode="edit" initial={post} postId={id} />;
}
