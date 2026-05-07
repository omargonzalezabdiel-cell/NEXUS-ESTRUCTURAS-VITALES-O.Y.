import { Product } from '../types';

export const products: Product[] = [
  // TEXTIL
  {
    id: 't1',
    name: 'Camiseta de Hombre',
    image: '/img/camiseta_de_hombre.png',
    category: 'textil',
    hasSizes: true,
    colors: ['Blanco', 'Negro', 'Gris', 'Rojo', 'Azul'],
  },
  {
    id: 't2',
    name: 'Camiseta de Mujeres',
    image: '/img/camiseta_de_mujeres.png',
    category: 'textil',
    hasSizes: true,
    colors: ['Blanco', 'Negro', 'Rosa', 'Gris', 'Azul'],
  },
  {
    id: 't3',
    name: 'Camiseta de Niños',
    image: '/img/camiseta_de_niños.png',
    category: 'textil',
    hasSizes: true,
    colors: ['Blanco', 'Negro', 'Rojo', 'Azul', 'Verde'],
  },
  {
    id: 't4',
    name: 'Camiseta de Niñas',
    image: '/img/camiseta_de_niñas.png',
    category: 'textil',
    hasSizes: true,
    colors: ['Blanco', 'Rosa', 'Lila', 'Amarillo', 'Celeste'],
  },
  {
    id: 't5',
    name: 'Gorra',
    image: '/img/gorra.png',
    category: 'textil',
    hasSizes: false,
    colors: ['Blanco', 'Negro', 'Rojo', 'Azul', 'Gris'],
  },
  {
    id: 't6',
    name: 'Ropa para Mascota',
    image: '/img/ropa_para_mascota.png',
    category: 'textil',
    hasSizes: true,
    colors: ['Blanco', 'Negro', 'Rojo', 'Rosa'],
  },

  // HOGAR
  {
    id: 'h1',
    name: 'Taza',
    image: '/img/taza.png',
    category: 'hogar',
    hasSizes: false,
    colors: ['Blanco', 'Negro', 'Rojo', 'Azul'],
  },
  {
    id: 'h2',
    name: 'Jarra Cervezera',
    image: '/img/jarra_cervezera.png',
    category: 'hogar',
    hasSizes: false,
    colors: ['Transparente', 'Blanco', 'Negro'],
  },
  {
    id: 'h3',
    name: 'Termos',
    image: '/img/termos.png',
    category: 'hogar',
    hasSizes: false,
    colors: ['Blanco', 'Negro', 'Gris', 'Rojo'],
  },
  {
    id: 'h4',
    name: 'Almohada',
    image: '/img/ALMOHADA.png',
    category: 'hogar',
    hasSizes: false,
    colors: ['Blanco', 'Negro', 'Gris'],
  },
  {
    id: 'h5',
    name: 'Baldosa de Ceramica',
    image: '/img/baldosa_de_cerramica.png',
    category: 'hogar',
    hasSizes: false,
    colors: ['Blanco', 'Beige', 'Negro'],
  },
  {
    id: 'h6',
    name: 'Rompecabeza',
    image: '/img/rompecabeza.png',
    category: 'hogar',
    hasSizes: false,
    colors: ['Multicolor'],
  },
  {
    id: 'h7',
    name: 'Lamina de Aluminio',
    image: '/img/lamina_de_aluminio.png',
    category: 'hogar',
    hasSizes: false,
    colors: ['Plata', 'Negro', 'Blanco'],
  },

  // ACCESORIOS
  {
    id: 'a1',
    name: 'Llavero',
    image: '/img/llavero.png',
    category: 'accesorios',
    hasSizes: false,
    colors: ['Madera', 'Blanco', 'Negro', 'Rojo'],
  },
  {
    id: 'a2',
    name: 'Boligrafo Pluma',
    image: '/img/boligrafo_pluma.png',
    category: 'accesorios',
    hasSizes: false,
    colors: ['Negro', 'Azul', 'Rojo', 'Blanco'],
  },
  {
    id: 'a3',
    name: 'Mousepad',
    image: '/img/mousepad.png',
    category: 'accesorios',
    hasSizes: false,
    colors: ['Negro', 'Blanco', 'Azul', 'Rojo'],
  },
  {
    id: 'a4',
    name: 'Collar para Mascota',
    image: '/img/collar_para_mascota.png',
    category: 'accesorios',
    hasSizes: true,
    colors: ['Rojo', 'Azul', 'Negro', 'Rosa'],
  },
];

export const SIZES = ['S', 'M', 'L', 'XL'] as const;
export type Size = (typeof SIZES)[number];

export const CATEGORY_LABELS: Record<string, string> = {
  textil: 'Textil',
  hogar: 'Hogar',
  accesorios: 'Accesorios',
};
