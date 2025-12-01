import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { getPackages, addPackage } from "@/lib/packages"

// GET - Obtener todos los paquetes
export async function GET() {
  try {
    const packages = await getPackages()
    return NextResponse.json(packages)
  } catch (error) {
    console.error("Error al obtener paquetes:", error)
    return NextResponse.json({ error: "Error al obtener paquetes" }, { status: 500 })
  }
}

// POST - Crear nuevo paquete
export async function POST(request: Request) {
  const session = await auth()
  
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  try {
    const newPackageData = await request.json()
    const newPackage = await addPackage(newPackageData)
    return NextResponse.json(newPackage, { status: 201 })
  } catch (error) {
    console.error("Error al crear paquete:", error)
    return NextResponse.json({ error: "Error al crear paquete" }, { status: 500 })
  }
}
