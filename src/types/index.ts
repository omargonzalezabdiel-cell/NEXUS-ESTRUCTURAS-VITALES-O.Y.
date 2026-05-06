export interface Product {
  id: string;
  name: string;
  description: string;
  priceClient: number;
  priceBase: number;
  image: string;
  stock: number;
  category: string;
  subcategory?: string;
}

export interface CustomDesign {
  id: string;
  name: string;
  logoUrl?: string;
  colors: string[];
  description: string;
  products: string[];
  createdAt: Date;
}

export interface CartItem {
  productId: string;
  name: string;
  quantity: number;
  priceClient: number;
  priceBase: number;
}

export interface Cart {
  items: CartItem[];
  mode: 'client' | 'reseller';
}
