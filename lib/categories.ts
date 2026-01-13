import { Category } from "@/types"
import { supabase, supabaseAdmin } from "./supabase"

// Mapeo de nombres de columnas (DB usa snake_case, TypeScript usa camelCase)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function dbToCategory(dbRow: any): Category {
  return {
    id: dbRow.id,
    name: dbRow.name,
    slug: dbRow.slug,
    description: dbRow.description,
    icon: dbRow.icon,
    displayOrder: dbRow.display_order,
    createdAt: dbRow.created_at,
    updatedAt: dbRow.updated_at
  }
}

function categoryToDb(category: Partial<Category>): Record<string, unknown> {
  return {
    name: category.name,
    slug: category.slug,
    description: category.description || null,
    icon: category.icon || null,
    display_order: category.displayOrder || 0
  }
}

// Obtener todas las categorías ordenadas
export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('display_order', { ascending: true })
    .order('name', { ascending: true }) // Orden alfabético como segundo criterio

  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }

  return data.map(dbToCategory)
}

// Obtener categoría por ID
export async function getCategoryById(id: string): Promise<Category | null> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching category:', error)
    return null
  }

  return dbToCategory(data)
}

// Obtener categoría por slug
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Error fetching category:', error)
    return null
  }

  return dbToCategory(data)
}

// Crear nueva categoría
export async function addCategory(newCategory: Omit<Category, "id" | "createdAt" | "updatedAt">): Promise<Category> {
  const dbData = categoryToDb(newCategory)
  
  const { data, error } = await supabaseAdmin
    .from('categories')
    .insert([dbData])
    .select()
    .single()

  if (error) {
    console.error('Error adding category:', error)
    throw new Error('Failed to add category')
  }

  return dbToCategory(data)
}

// Actualizar categoría
export async function updateCategory(id: string, updatedData: Partial<Category>): Promise<Category | null> {
  const dbData = categoryToDb(updatedData)
  
  const { data, error } = await supabaseAdmin
    .from('categories')
    .update(dbData)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating category:', error)
    return null
  }

  return dbToCategory(data)
}

// Eliminar categoría
export async function deleteCategory(id: string): Promise<boolean> {
  const { error } = await supabaseAdmin
    .from('categories')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting category:', error)
    return false
  }

  return true
}
