import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXTAUTH_URL || 'https://viatanatravel.com'
  
  // Obtener paquetes dinámicamente
  let packages: any[] = []
  try {
    const response = await fetch(`${baseUrl}/api/packages`, { cache: 'no-store' })
    if (response.ok) {
      packages = await response.json()
    }
  } catch (error) {
    console.error('Error fetching packages for sitemap:', error)
  }

  // Rutas estáticas
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ]

  // Rutas dinámicas de paquetes
  const packageRoutes = packages.map((pkg) => ({
    url: `${baseUrl}/packages/${pkg.id}`,
    lastModified: new Date(pkg.updatedAt || pkg.createdAt || new Date()),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  return [...routes, ...packageRoutes]
}
