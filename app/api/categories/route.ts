import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { getCategories, addCategory } from "@/lib/categories"

// GET - Obtener todas las categorías (público)
export async function GET() {
  try {
    const categories = await getCategories()
    return NextResponse.json(categories)
  } catch (error) {
    console.error("Error al obtener categorías:", error)
    return NextResponse.json({ error: "Error al obtener categorías" }, { status: 500 })
  }
}

// POST - Crear nueva categoría (requiere autenticación)
export async function POST(request: Request) {
  const session = await auth()
  
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  try {
    const newCategoryData = await request.json()
    const newCategory = await addCategory(newCategoryData)
    return NextResponse.json(newCategory, { status: 201 })
  } catch (error) {
    console.error("Error al crear categoría:", error)
    return NextResponse.json({ error: "Error al crear categoría" }, { status: 500 })
  }
}
