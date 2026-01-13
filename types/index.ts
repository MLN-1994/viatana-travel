export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  displayOrder: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface TravelPackage {
  id: string;
  title: string;
  destination: string;
  description: string;
  price: number;
  duration: string;
  image: string;
  isOffer?: boolean;
  originalPrice?: number;
  discount?: number;
  included: string[];
  category: string; // Ahora es string dinámico en lugar de union type fijo
  categoryId?: string; // Opcional: ID de la categoría para relación futura
}

export interface Offer extends TravelPackage {
  isOffer: true;
  discount: number;
  originalPrice: number;
}

export interface ContactInfo {
  phone: string;
  whatsapp: string;
  email: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
}
