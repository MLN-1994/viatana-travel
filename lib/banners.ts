import { supabase, supabaseAdmin } from './supabase';
import type { Banner } from '@/types';

// Conversión de snake_case (DB) a camelCase (TypeScript)
function dbToBanner(row: any): Banner {
  return {
    id: row.id,
    title: row.title,
    subtitle: row.subtitle,
    imageUrl: row.image_url,
    linkUrl: row.link_url,
    buttonText: row.button_text,
    isActive: row.is_active,
    displayOrder: row.display_order,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

// Conversión de camelCase (TypeScript) a snake_case (DB)
function bannerToDb(banner: Partial<Banner>): any {
  const dbBanner: any = {};
  
  if (banner.title !== undefined) dbBanner.title = banner.title;
  if (banner.subtitle !== undefined) dbBanner.subtitle = banner.subtitle;
  if (banner.imageUrl !== undefined) dbBanner.image_url = banner.imageUrl;
  if (banner.linkUrl !== undefined) dbBanner.link_url = banner.linkUrl;
  if (banner.buttonText !== undefined) dbBanner.button_text = banner.buttonText;
  if (banner.isActive !== undefined) dbBanner.is_active = banner.isActive;
  if (banner.displayOrder !== undefined) dbBanner.display_order = banner.displayOrder;
  
  return dbBanner;
}

/**
 * Obtener todos los banners (admin)
 * @returns Array de todos los banners ordenados por display_order
 */
export async function getBanners(): Promise<Banner[]> {
  const { data, error } = await supabase
    .from('banners')
    .select('*')
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching banners:', error);
    return [];
  }

  return data.map(dbToBanner);
}

/**
 * Obtener solo banners activos (público)
 * @returns Array de banners activos ordenados por display_order
 */
export async function getActiveBanners(): Promise<Banner[]> {
  const { data, error } = await supabase
    .from('banners')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching active banners:', error);
    return [];
  }

  return data.map(dbToBanner);
}

/**
 * Obtener un banner por ID
 * @param id - ID del banner
 * @returns Banner encontrado o null
 */
export async function getBannerById(id: string): Promise<Banner | null> {
  const { data, error } = await supabase
    .from('banners')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching banner:', error);
    return null;
  }

  return dbToBanner(data);
}

/**
 * Crear un nuevo banner (requiere permisos admin)
 * @param banner - Datos del banner a crear
 * @returns Banner creado o null si hay error
 */
export async function addBanner(banner: Omit<Banner, 'id' | 'createdAt' | 'updatedAt'>): Promise<Banner | null> {
  const dbBanner = bannerToDb(banner);

  const { data, error } = await supabaseAdmin
    .from('banners')
    .insert([dbBanner])
    .select()
    .single();

  if (error) {
    console.error('Error adding banner:', error);
    return null;
  }

  return dbToBanner(data);
}

/**
 * Actualizar un banner existente (requiere permisos admin)
 * @param id - ID del banner a actualizar
 * @param updates - Campos a actualizar
 * @returns Banner actualizado o null si hay error
 */
export async function updateBanner(id: string, updates: Partial<Banner>): Promise<Banner | null> {
  const dbUpdates = bannerToDb(updates);

  const { data, error } = await supabaseAdmin
    .from('banners')
    .update(dbUpdates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating banner:', error);
    return null;
  }

  return dbToBanner(data);
}

/**
 * Eliminar un banner (requiere permisos admin)
 * @param id - ID del banner a eliminar
 * @returns true si se eliminó correctamente, false si hay error
 */
export async function deleteBanner(id: string): Promise<boolean> {
  const { error } = await supabaseAdmin
    .from('banners')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting banner:', error);
    return false;
  }

  return true;
}
