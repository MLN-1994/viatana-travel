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
  category: 'nacional' | 'europa' | 'centroamerica' | 'mundial' | 'sudamerica';
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
