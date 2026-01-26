import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { getCategoryById, updateCategory, deleteCategory } from "@/lib/categories"
import { categoryUpdateSchema } from "@/lib/validations/category"

// GET - Obtener categoría por ID
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const category = await getCategoryById(id)
    
    if (!category) {
      return NextResponse.json({ error: "Categoría no encontrada" }, { status: 404 })
    }

    return NextResponse.json(category)
  } catch (error) {
    console.error("Error al obtener categoría:", error)
    return NextResponse.json({ error: "Error al obtener categoría" }, { status: 500 })
  }
}

// PUT - Actualizar categoría
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }
  try {
    const { id } = await params
    const updatedData = await request.json()
    const parseResult = categoryUpdateSchema.safeParse(updatedData)
    if (!parseResult.success) {
      return NextResponse.json({
        error: "Datos inválidos",
        details: parseResult.error.flatten()
      }, { status: 400 })
    }
    const updatedCategory = await updateCategory(id, parseResult.data)
    if (!updatedCategory) {
      return NextResponse.json({ error: "Categoría no encontrada" }, { status: 404 })
    }
    return NextResponse.json(updatedCategory)
  } catch (error) {
    console.error("Error al actualizar categoría:", error)
    return NextResponse.json({ error: "Error al actualizar categoría" }, { status: 500 })
  }
}

// DELETE - Eliminar categoría
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  try {
    const { id } = await params
    const deleted = await deleteCategory(id)
    
    if (!deleted) {
      return NextResponse.json({ error: "Categoría no encontrada" }, { status: 404 })
    }

    return NextResponse.json({ message: "Categoría eliminada" })
  } catch (error) {
    console.error("Error al eliminar categoría:", error)
    return NextResponse.json({ error: "Error al eliminar categoría" }, { status: 500 })
  }
}
