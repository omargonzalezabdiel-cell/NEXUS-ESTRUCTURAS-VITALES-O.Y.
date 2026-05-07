export type Category = 'textil' | 'hogar' | 'accesorios';

export interface Product {
  id: string;
  name: string;
  image: string;
  category: Category;
  hasSizes: boolean;
  colors: string[];
}

export interface CartItem {
  productId: string;
  name: string;
  image: string;
  category: Category;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}
