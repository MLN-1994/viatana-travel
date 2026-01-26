import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { getPackages, addPackage } from "@/lib/packages"
import { packageSchema } from "@/lib/validations/package"

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
    // 1. Validar datos con Zod
    const parseResult = packageSchema.safeParse(newPackageData)
    if (!parseResult.success) {
      // 2. Si hay errores, devolverlos de forma profesional
      return NextResponse.json({
        error: "Datos inválidos",
        details: parseResult.error.flatten()
      }, { status: 400 })
    }
    // 3. Si es válido, continuar normalmente
    const newPackage = await addPackage(parseResult.data)
    return NextResponse.json(newPackage, { status: 201 })
  } catch (error) {
    console.error("Error al crear paquete:", error)
    return NextResponse.json({ error: "Error al crear paquete" }, { status: 500 })
  }
}
