import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { getPackageById, updatePackage, deletePackage } from "@/lib/packages"

// GET - Obtener paquete por ID
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const pkg = await getPackageById(id)
    
    if (!pkg) {
      return NextResponse.json({ error: "Paquete no encontrado" }, { status: 404 })
    }

    return NextResponse.json(pkg)
  } catch (error) {
    console.error("Error al obtener paquete:", error)
    return NextResponse.json({ error: "Error al obtener paquete" }, { status: 500 })
  }
}

// PUT - Actualizar paquete
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

    const updatedPackage = await updatePackage(id, updatedData)
    
    if (!updatedPackage) {
      return NextResponse.json({ error: "Paquete no encontrado" }, { status: 404 })
    }

    return NextResponse.json(updatedPackage)
  } catch (error) {
    console.error("Error al actualizar paquete:", error)
    return NextResponse.json({ error: "Error al actualizar paquete" }, { status: 500 })
  }
}

// DELETE - Eliminar paquete
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
    const deleted = await deletePackage(id)
    
    if (!deleted) {
      return NextResponse.json({ error: "Paquete no encontrado" }, { status: 404 })
    }

    return NextResponse.json({ message: "Paquete eliminado" })
  } catch (error) {
    console.error("Error al eliminar paquete:", error)
    return NextResponse.json({ error: "Error al eliminar paquete" }, { status: 500 })
  }
}
