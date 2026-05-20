import { supabase, supabaseAdmin } from './supabase';
import type { Post } from '@/types';

function dbToPost(row: any): Post {
  return {
    id: row.id,
    title: row.title,
    subtitle: row.subtitle ?? undefined,
    slug: row.slug,
    coverImage: row.cover_image,
    secondImage: row.second_image ?? undefined,
    contentP1: row.content_p1,
    contentP2: row.content_p2 ?? undefined,
    excerpt: row.excerpt,
    isActive: row.is_active,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function postToDb(p: Partial<Post>): any {
  const db: any = {};
  if (p.title !== undefined) db.title = p.title;
  if (p.subtitle !== undefined) db.subtitle = p.subtitle;
  if (p.slug !== undefined) db.slug = p.slug;
  if (p.coverImage !== undefined) db.cover_image = p.coverImage;
  if (p.secondImage !== undefined) db.second_image = p.secondImage;
  if (p.contentP1 !== undefined) db.content_p1 = p.contentP1;
  if (p.contentP2 !== undefined) db.content_p2 = p.contentP2;
  if (p.excerpt !== undefined) db.excerpt = p.excerpt;
  if (p.isActive !== undefined) db.is_active = p.isActive;
  return db;
}

// ---- Lectura pública (cliente anon) ----

export async function getActivePosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
  return data.map(dbToPost);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (error || !data) return null;
  return dbToPost(data);
}

// ---- Admin (service role) ----

export async function getAllPosts(): Promise<Post[]> {
  const { data, error } = await supabaseAdmin
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts (admin):', error);
    return [];
  }
  return data.map(dbToPost);
}

export async function getPostById(id: string): Promise<Post | null> {
  const { data, error } = await supabaseAdmin
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) return null;
  return dbToPost(data);
}

export async function addPost(p: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>): Promise<Post | null> {
  const { data, error } = await supabaseAdmin
    .from('posts')
    .insert([postToDb(p)])
    .select()
    .single();

  if (error || !data) {
    console.error('Error adding post:', error);
    return null;
  }
  return dbToPost(data);
}

export async function updatePost(id: string, p: Partial<Post>): Promise<Post | null> {
  const { data, error } = await supabaseAdmin
    .from('posts')
    .update(postToDb(p))
    .eq('id', id)
    .select()
    .single();

  if (error || !data) {
    console.error('Error updating post:', error);
    return null;
  }
  return dbToPost(data);
}

export async function deletePost(id: string): Promise<boolean> {
  const { error } = await supabaseAdmin
    .from('posts')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting post:', error);
    return false;
  }
  return true;
}
