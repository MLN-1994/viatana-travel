import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { getCategories, addCategory } from "@/lib/categories"
import { categorySchema } from "@/lib/validations/category"

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
    const parseResult = categorySchema.safeParse(newCategoryData)
    if (!parseResult.success) {
      return NextResponse.json({
        error: "Datos inválidos",
        details: parseResult.error.flatten()
      }, { status: 400 })
    }
    const newCategory = await addCategory(parseResult.data)
    return NextResponse.json(newCategory, { status: 201 })
  } catch (error) {
    console.error("Error al crear categoría:", error)
    return NextResponse.json({ error: "Error al crear categoría" }, { status: 500 })
  }
}
