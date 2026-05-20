import { supabase, supabaseAdmin } from './supabase';
import type { Testimonial } from '@/types';

function dbToTestimonial(row: any): Testimonial {
  return {
    id: row.id,
    firstName: row.first_name,
    lastName: row.last_name,
    destination: row.destination,
    content: row.content,
    date: row.date,
    rating: row.rating ?? 5,
    avatarUrl: row.avatar_url ?? undefined,
    photo1Url: row.photo_1_url ?? undefined,
    photo2Url: row.photo_2_url ?? undefined,
    photo3Url: row.photo_3_url ?? undefined,
    isActive: row.is_active,
    displayOrder: row.display_order,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function testimonialToDb(t: Partial<Testimonial>): any {
  const db: any = {};
  if (t.firstName !== undefined) db.first_name = t.firstName;
  if (t.lastName !== undefined) db.last_name = t.lastName;
  if (t.destination !== undefined) db.destination = t.destination;
  if (t.content !== undefined) db.content = t.content;
  if (t.date !== undefined) db.date = t.date;
  if (t.rating !== undefined) db.rating = t.rating;
  if (t.avatarUrl !== undefined) db.avatar_url = t.avatarUrl;
  if (t.photo1Url !== undefined) db.photo_1_url = t.photo1Url;
  if (t.photo2Url !== undefined) db.photo_2_url = t.photo2Url;
  if (t.photo3Url !== undefined) db.photo_3_url = t.photo3Url;
  if (t.isActive !== undefined) db.is_active = t.isActive;
  if (t.displayOrder !== undefined) db.display_order = t.displayOrder;
  return db;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const { data, error } = await supabaseAdmin
    .from('testimonials')
    .select('*')
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
  return data.map(dbToTestimonial);
}

export async function getActiveTestimonials(): Promise<Testimonial[]> {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching active testimonials:', error);
    return [];
  }
  return data.map(dbToTestimonial);
}

export async function getTestimonialById(id: string): Promise<Testimonial | null> {
  const { data, error } = await supabaseAdmin
    .from('testimonials')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) return null;
  return dbToTestimonial(data);
}

export async function addTestimonial(t: Omit<Testimonial, 'id' | 'createdAt' | 'updatedAt'>): Promise<Testimonial | null> {
  const { data, error } = await supabaseAdmin
    .from('testimonials')
    .insert(testimonialToDb(t))
    .select()
    .single();

  if (error || !data) {
    console.error('Error adding testimonial:', error);
    return null;
  }
  return dbToTestimonial(data);
}

export async function updateTestimonial(id: string, t: Partial<Testimonial>): Promise<Testimonial | null> {
  const { data, error } = await supabaseAdmin
    .from('testimonials')
    .update(testimonialToDb(t))
    .eq('id', id)
    .select()
    .single();

  if (error || !data) {
    console.error('Error updating testimonial:', error);
    return null;
  }
  return dbToTestimonial(data);
}

export async function deleteTestimonial(id: string): Promise<boolean> {
  const { error } = await supabaseAdmin
    .from('testimonials')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting testimonial:', error);
    return false;
  }
  return true;
}
