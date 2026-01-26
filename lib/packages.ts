import { TravelPackage } from "@/types"
import { supabase, supabaseAdmin } from "./supabase"

// Mapeo de nombres de columnas (DB usa snake_case, TypeScript usa camelCase)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function dbToPackage(dbRow: any): TravelPackage {
  return {
    id: dbRow.id,
    title: dbRow.title,
    destination: dbRow.destination,
    description: dbRow.description,
    price: dbRow.price,
    duration: dbRow.duration,
    image: dbRow.image,
    category: dbRow.category,
    isOffer: dbRow.is_offer,
    originalPrice: dbRow.original_price,
    discount: dbRow.discount,
    included: typeof dbRow.included === 'string' ? JSON.parse(dbRow.included) : dbRow.included
  }
}

function packageToDb(pkg: Partial<TravelPackage>): Record<string, unknown> {
  return {
    title: pkg.title,
    destination: pkg.destination,
    description: pkg.description,
    price: pkg.price,
    duration: pkg.duration,
    image: pkg.image,
    category: pkg.category,
    is_offer: pkg.isOffer || false,
    original_price: pkg.isOffer ? (pkg.originalPrice ?? 0) : null,
    discount: pkg.isOffer ? (pkg.discount ?? 0) : null,
    included: Array.isArray(pkg.included) ? pkg.included : [], // JSONB espera array
  }
}

export async function getPackages(): Promise<TravelPackage[]> {
  const { data, error } = await supabase
    .from('packages')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching packages:', error)
    return []
  }

  return data.map(dbToPackage)
}

export async function getPackageById(id: string): Promise<TravelPackage | null> {
  const { data, error } = await supabase
    .from('packages')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching package:', error)
    return null
  }

  return dbToPackage(data)
}

export async function addPackage(newPackage: Omit<TravelPackage, "id">): Promise<TravelPackage> {
  const dbData = packageToDb(newPackage)
  
  const { data, error } = await supabaseAdmin
    .from('packages')
    .insert([dbData])
    .select()
    .single()

  if (error) {
    console.error('Error adding package:', error)
    throw new Error('Failed to add package')
  }

  return dbToPackage(data)
}

export async function updatePackage(id: string, updatedData: Partial<TravelPackage>): Promise<TravelPackage | null> {
  const dbData = packageToDb(updatedData)
  
  const { data, error } = await supabaseAdmin
    .from('packages')
    .update(dbData)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating package:', error)
    return null
  }

  return dbToPackage(data)
}

export async function deletePackage(id: string): Promise<boolean> {
  const { error } = await supabaseAdmin
    .from('packages')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting package:', error)
    return false
  }

  return true
}
