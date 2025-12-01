import { TravelPackage } from "@/types"
import { readFile, writeFile } from "fs/promises"
import { join } from "path"

const DATA_FILE = join(process.cwd(), "data", "packages.json")

export async function getPackages(): Promise<TravelPackage[]> {
  try {
    const data = await readFile(DATA_FILE, "utf-8")
    return JSON.parse(data)
  } catch {
    // Si el archivo no existe, usar los paquetes iniciales
    const { travelPackages } = await import("@/data/packages")
    await savePackages(travelPackages)
    return travelPackages
  }
}

export async function savePackages(packages: TravelPackage[]): Promise<void> {
  await writeFile(DATA_FILE, JSON.stringify(packages, null, 2), "utf-8")
}

export async function addPackage(newPackage: Omit<TravelPackage, "id">): Promise<TravelPackage> {
  const packages = await getPackages()
  const maxId = packages.length > 0 
    ? Math.max(...packages.map(pkg => parseInt(pkg.id)))
    : 0
  
  const packageWithId = {
    ...newPackage,
    id: (maxId + 1).toString()
  }
  
  packages.push(packageWithId)
  await savePackages(packages)
  return packageWithId
}

export async function updatePackage(id: string, updatedData: Partial<TravelPackage>): Promise<TravelPackage | null> {
  const packages = await getPackages()
  const index = packages.findIndex(pkg => pkg.id === id)
  
  if (index === -1) return null
  
  packages[index] = { ...packages[index], ...updatedData, id }
  await savePackages(packages)
  return packages[index]
}

export async function deletePackage(id: string): Promise<boolean> {
  const packages = await getPackages()
  const index = packages.findIndex(pkg => pkg.id === id)
  
  if (index === -1) return false
  
  packages.splice(index, 1)
  await savePackages(packages)
  return true
}
