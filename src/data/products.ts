import { Product } from '../types';

// ============================================================
// CATALOGO nexus - PRODUCTOS
// ============================================================
// Para agregar un producto nuevo: copia un objeto existente y cambia los datos.
// Para quitar un producto: simplemente borra el objeto del arreglo.
// Las imagenes usan Unsplash (w=500&h=500&fit=crop).
// ============================================================

export const products: Product[] = [
  // ==========================================
  // 👕 ROPA
  // ==========================================
  {
    id: 'r1',
    name: 'Camiseta Niño',
    description: 'Camiseta de alta calidad para niños - 45x35 cm',
    priceClient: 9,
    priceBase: 3.30,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
    stock: 100,
    category: 'ROPA',
    subcategory: 'Camisetas'
  },
  {
    id: 'r2',
    name: 'Camiseta Niña',
    description: 'Camiseta de alta calidad para niñas - 45x35 cm',
    priceClient: 9,
    priceBase: 3.30,
    image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=500&h=500&fit=crop',
    stock: 100,
    category: 'ROPA',
    subcategory: 'Camisetas'
  },
  {
    id: 'r3',
    name: 'Camiseta Mujer',
    description: 'Camiseta premium para mujer - 60x45 cm',
    priceClient: 11.50,
    priceBase: 4.00,
    image: 'https://images.unsplash.com/photo-1578932750294-708xcc07b6ad?w=500&h=500&fit=crop',
    stock: 80,
    category: 'ROPA',
    subcategory: 'Camisetas'
  },
  {
    id: 'r4',
    name: 'Camiseta Hombre',
    description: 'Camiseta clásica para hombre - 65x50 cm',
    priceClient: 11.50,
    priceBase: 4.00,
    image: 'https://images.unsplash.com/photo-1501572543425-94c2bfc0c05a?w=500&h=500&fit=crop',
    stock: 90,
    category: 'ROPA',
    subcategory: 'Camisetas'
  },
  {
    id: 'r5',
    name: 'Crop Top',
    description: 'Crop top moderno - 40x40 cm',
    priceClient: 13.50,
    priceBase: 4.20,
    image: 'https://images.unsplash.com/photo-1485462537746-965f05f7f51a?w=500&h=500&fit=crop',
    stock: 50,
    category: 'ROPA',
    subcategory: 'Camisetas'
  },
  {
    id: 'r6',
    name: 'Polo',
    description: 'Polo de calidad premium - 65x50 cm',
    priceClient: 16.50,
    priceBase: 5.00,
    image: 'https://images.unsplash.com/photo-1606156544350-803bda220d42?w=500&h=500&fit=crop',
    stock: 60,
    category: 'ROPA',
    subcategory: 'Polos'
  },
  {
    id: 'r7',
    name: 'Hoodie Premium',
    description: 'Sudadera con capucha - 70x55 cm',
    priceClient: 30,
    priceBase: 11.80,
    image: 'https://images.unsplash.com/photo-1556821552-9f6db051ccd1?w=500&h=500&fit=crop',
    stock: 40,
    category: 'ROPA',
    subcategory: 'Hoodies'
  },

  // ==========================================
  // 🥤 TAZAS Y BOTELLAS
  // ==========================================
  {
    id: 't1',
    name: 'Taza Estándar 11oz',
    description: 'Taza cerámica clásica - 11 oz',
    priceClient: 9,
    priceBase: 3.30,
    image: 'https://images.unsplash.com/photo-1514432324607-2e467f4af445?w=500&h=500&fit=crop',
    stock: 70,
    category: 'TAZAS Y BOTELLAS',
    subcategory: 'Tazas'
  },
  {
    id: 't2',
    name: 'Taza Mágica 11oz',
    description: 'Taza que cambia de color con calor - 11 oz',
    priceClient: 11,
    priceBase: 4.50,
    image: 'https://images.unsplash.com/photo-1556901289-a3c52607c8?w=500&h=500&fit=crop',
    stock: 50,
    category: 'TAZAS Y BOTELLAS',
    subcategory: 'Tazas'
  },
  {
    id: 't3',
    name: 'Jarra 16oz',
    description: 'Jarra cerámica grande - 16 oz',
    priceClient: 12,
    priceBase: 4.00,
    image: 'https://images.unsplash.com/photo-1527993996988-ec2e21042d45?w=500&h=500&fit=crop',
    stock: 60,
    category: 'TAZAS Y BOTELLAS',
    subcategory: 'Tazas'
  },
  {
    id: 't4',
    name: 'Botella Aluminio 500ml',
    description: 'Botella térmica de aluminio - 500 ml',
    priceClient: 12.50,
    priceBase: 4.00,
    image: 'https://images.unsplash.com/photo-1556742043-52dbbcc22f81?w=500&h=500&fit=crop',
    stock: 50,
    category: 'TAZAS Y BOTELLAS',
    subcategory: 'Botellas'
  },
  {
    id: 't5',
    name: 'Botella Aluminio 750ml',
    description: 'Botella térmica grande de aluminio - 750 ml',
    priceClient: 14,
    priceBase: 4.60,
    image: 'https://images.unsplash.com/photo-1523038141100-7aa4d64cb953?w=500&h=500&fit=crop',
    stock: 45,
    category: 'TAZAS Y BOTELLAS',
    subcategory: 'Botellas'
  },

  // ==========================================
  // 🎁 ARTÍCULOS PEQUEÑOS
  // ==========================================
  {
    id: 'a1',
    name: 'Llavero MDF',
    description: 'Llavero personalizado en MDF - 5x5 cm',
    priceClient: 4,
    priceBase: 1.40,
    image: 'https://images.unsplash.com/photo-1627948815214-9a428f83b6da?w=500&h=500&fit=crop',
    stock: 150,
    category: 'ARTÍCULOS PEQUEÑOS',
    subcategory: 'Llaveros'
  },
  {
    id: 'a2',
    name: 'Pin Personalizado',
    description: 'Pin de calidad personalizado - 5x5 cm',
    priceClient: 4,
    priceBase: 1.90,
    image: 'https://images.unsplash.com/photo-1599572953804-51fe2c7e0a1c?w=500&h=500&fit=crop',
    stock: 120,
    category: 'ARTÍCULOS PEQUEÑOS',
    subcategory: 'Pines'
  },
  {
    id: 'a3',
    name: 'Lanyard',
    description: 'Cinta porta credenciales personalizada - 45 cm',
    priceClient: 3.50,
    priceBase: 1.20,
    image: 'https://images.unsplash.com/photo-1617627148106-a1f67f84e069?w=500&h=500&fit=crop',
    stock: 100,
    category: 'ARTÍCULOS PEQUEÑOS',
    subcategory: 'Accesorios'
  },
  {
    id: 'a4',
    name: 'Bolígrafo Personalizado',
    description: 'Bolígrafo con diseño sublimado - 14 cm',
    priceClient: 3,
    priceBase: 1.00,
    image: 'https://images.unsplash.com/photo-1585336261024-6f8deec8d5d5?w=500&h=500&fit=crop',
    stock: 200,
    category: 'ARTÍCULOS PEQUEÑOS',
    subcategory: 'Escritorio'
  },
  {
    id: 'a5',
    name: 'Rompecabezas',
    description: 'Puzzle personalizado - 20x15 cm',
    priceClient: 6.50,
    priceBase: 2.15,
    image: 'https://images.unsplash.com/photo-1560506676-04071c5f467b?w=500&h=500&fit=crop',
    stock: 40,
    category: 'ARTÍCULOS PEQUEÑOS',
    subcategory: 'Juegos'
  },

  // ==========================================
  // 🧱 PRODUCTOS ESPECIALES
  // ==========================================
  {
    id: 'e1',
    name: 'Placa de Aluminio',
    description: 'Placa de aluminio personalizada - 30x20 cm',
    priceClient: 17.50,
    priceBase: 6.10,
    image: 'https://images.unsplash.com/photo-1555180675-26e3dee84e43?w=500&h=500&fit=crop',
    stock: 35,
    category: 'ESPECIALES',
    subcategory: 'Placas'
  },
  {
    id: 'e2',
    name: 'Piedra Sublimable',
    description: 'Piedra decorativa personalizada - 20x15 cm',
    priceClient: 13.50,
    priceBase: 5.00,
    image: 'https://images.unsplash.com/photo-1578926314433-a66f9a487ebc?w=500&h=500&fit=crop',
    stock: 30,
    category: 'ESPECIALES',
    subcategory: 'Decoración'
  },
  {
    id: 'e3',
    name: 'Lámpara LED',
    description: 'Lámpara LED personalizada - 20x10 cm',
    priceClient: 22.50,
    priceBase: 9.20,
    image: 'https://images.unsplash.com/photo-1565636192335-14f828d4c6c2?w=500&h=500&fit=crop',
    stock: 20,
    category: 'ESPECIALES',
    subcategory: 'Iluminación'
  },
  {
    id: 'e4',
    name: 'Cover Celular',
    description: 'Funda de celular personalizada - 15x7 cm',
    priceClient: 15,
    priceBase: 5.50,
    image: 'https://images.unsplash.com/photo-1601784551446-2a6b5e60c8a1?w=500&h=500&fit=crop',
    stock: 60,
    category: 'ESPECIALES',
    subcategory: 'Accesorios Tech'
  },

  // ==========================================
  // ⚽ DEPORTIVO
  // ==========================================
  {
    id: 'd1',
    name: 'Camiseta Deportiva',
    description: 'Camiseta dry-fit para deportes - 65x50 cm',
    priceClient: 16.50,
    priceBase: 5.50,
    image: 'https://images.unsplash.com/photo-1576585672006-439f0b2198b8?w=500&h=500&fit=crop',
    stock: 70,
    category: 'DEPORTIVO',
    subcategory: 'Camisetas'
  },
  {
    id: 'd2',
    name: 'Short Deportivo',
    description: 'Short para deportes - 40x30 cm',
    priceClient: 12.50,
    priceBase: 4.50,
    image: 'https://images.unsplash.com/photo-1560243563-062bfc001d68?w=500&h=500&fit=crop',
    stock: 60,
    category: 'DEPORTIVO',
    subcategory: 'Shorts'
  },
  {
    id: 'd3',
    name: 'Medias Deportivas',
    description: 'Medias deportivas personalizadas - Talla estándar',
    priceClient: 6.50,
    priceBase: 2.50,
    image: 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=500&h=500&fit=crop',
    stock: 100,
    category: 'DEPORTIVO',
    subcategory: 'Accesorios'
  }
];

// ============================================================
// COMBOS NEXUS
// ============================================================
// Para agregar un combo nuevo: copia un objeto existente y cambia los datos.
// Para quitar un combo: simplemente borra el objeto del arreglo.
// ============================================================

export interface Combo {
  id: string;
  name: string;
  description: string;
  includes: string;
  priceClient: number;
  priceBase: number;
  category: string;
  icon: string;
}

export const combos: Combo[] = [
  // 👕 COMBOS ROPA
  {
    id: 'cr1',
    name: 'Duo Camisetas',
    description: '2 camisetas con diseño personalizado',
    includes: '2 camisetas',
    priceClient: 20,
    priceBase: 6.60,
    category: 'COMBOS ROPA',
    icon: '👕'
  },
  {
    id: 'cr2',
    name: 'Familiar 3 Camisetas',
    description: '3 camisetas para toda la familia',
    includes: '3 camisetas',
    priceClient: 28.50,
    priceBase: 9.90,
    category: 'COMBOS ROPA',
    icon: '👕'
  },
  {
    id: 'cr3',
    name: 'Familiar 4 Camisetas',
    description: '4 camisetas con descuento especial',
    includes: '4 camisetas',
    priceClient: 37.50,
    priceBase: 13.20,
    category: 'COMBOS ROPA',
    icon: '👕'
  },
  {
    id: 'cr4',
    name: 'Familiar 5+ Camisetas',
    description: '5 o más camisetas con precio especial',
    includes: '5+ camisetas',
    priceClient: 45,
    priceBase: 16.50,
    category: 'COMBOS ROPA',
    icon: '👕'
  },

  // 🥤 COMBOS TAZAS
  {
    id: 'ct1',
    name: 'Duo Tazas',
    description: '2 tazas personalizadas',
    includes: '2 tazas',
    priceClient: 15,
    priceBase: 6.60,
    category: 'COMBOS TAZAS',
    icon: '🥤'
  },
  {
    id: 'ct2',
    name: 'Trio Tazas',
    description: '3 tazas con diseño coordinado',
    includes: '3 tazas',
    priceClient: 22,
    priceBase: 9.90,
    category: 'COMBOS TAZAS',
    icon: '🥤'
  },
  {
    id: 'ct3',
    name: 'Familiar Tazas',
    description: '5 tazas para toda la familia',
    includes: '5 tazas',
    priceClient: 35,
    priceBase: 16.50,
    category: 'COMBOS TAZAS',
    icon: '🥤'
  },
  {
    id: 'ct4',
    name: 'Regalo Taza + Llavero',
    description: 'Taza personalizada con llavero incluido',
    includes: '1 taza + 1 llavero',
    priceClient: 12,
    priceBase: 4.70,
    category: 'COMBOS TAZAS',
    icon: '🥤'
  },

  // 🎁 COMBOS ARTÍCULOS
  {
    id: 'ca1',
    name: 'Pack 3 Llaveros',
    description: '3 llaveros MDF personalizados',
    includes: '3 llaveros',
    priceClient: 8,
    priceBase: 4.20,
    category: 'COMBOS ARTÍCULOS',
    icon: '🎁'
  },
  {
    id: 'ca2',
    name: 'Pack 5 Llaveros',
    description: '5 llaveros MDF con descuento',
    includes: '5 llaveros',
    priceClient: 12,
    priceBase: 7.00,
    category: 'COMBOS ARTÍCULOS',
    icon: '🎁'
  },
  {
    id: 'ca3',
    name: 'Escolar',
    description: 'Lanyard + bolígrafo personalizado',
    includes: '1 lanyard + 1 bolígrafo',
    priceClient: 5,
    priceBase: 2.20,
    category: 'COMBOS ARTÍCULOS',
    icon: '🎁'
  },
  {
    id: 'ca4',
    name: 'Recuerdo',
    description: 'Llavero + rompecabezas personalizado',
    includes: '1 llavero + 1 rompecabezas',
    priceClient: 7,
    priceBase: 3.55,
    category: 'COMBOS ARTÍCULOS',
    icon: '🎁'
  }
];

// ============================================================
// PAQUETES DE EVENTOS
// ============================================================

export const eventPackages = [
  {
    id: 'event1',
    name: 'Fiesta 30 personas',
    icon: '🎂',
    cost: 149,
    price: 300,
    profit: 101,
    labor: 50,
    description: 'Paquete completo para fiesta de 30 personas'
  },
  {
    id: 'event2',
    name: 'Fiesta 50 personas',
    icon: '🎂',
    cost: 247,
    price: 500,
    profit: 173,
    labor: 80,
    description: 'Paquete completo para fiesta de 50 personas'
  },
  {
    id: 'event3',
    name: 'Velorio 40 personas',
    icon: '🕊️',
    cost: 245,
    price: 450,
    profit: 135,
    labor: 70,
    description: 'Paquete especial para velorio de 40 personas'
  },
  {
    id: 'event4',
    name: 'Graduación 40 personas',
    icon: '🎓',
    cost: 260,
    price: 550,
    profit: 200,
    labor: 90,
    description: 'Paquete de graduación para 40 personas'
  },
  {
    id: 'event5',
    name: 'Equipo 25 personas',
    icon: '⚽',
    cost: 256,
    price: 600,
    profit: 244,
    labor: 100,
    description: 'Paquete para equipos de 25 personas'
  }
];

// ============================================================
// DISEÑOS PREDETERMINADOS (GALERÍA)
// ============================================================
// Para agregar un diseño nuevo: copia un objeto y cambia los datos.
// Para quitar un diseño: simplemente borra el objeto del arreglo.
// Estos son los diseños que los revendedores pueden usar como base.
// ============================================================

export interface DesignTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  tags: string[];
}

export const designTemplates: DesignTemplate[] = [
  {
    id: 'dt1',
    name: 'Urbano Básico',
    description: 'Diseño urbano minimalista con tipografía bold',
    category: 'URBANO',
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    tags: ['minimalista', 'urbano', 'texto']
  },
  {
    id: 'dt2',
    name: 'Deportivo Pro',
    description: 'Diseño dinámico para ropa deportiva',
    category: 'DEPORTIVO',
    imageUrl: 'https://images.unsplash.com/photo-1576585672006-439f0b2198b8?w=400&h=400&fit=crop',
    tags: ['deporte', 'dinámico', 'equipo']
  },
  {
    id: 'dt3',
    name: 'Fiesta Neon',
    description: 'Diseño con colores neón para eventos',
    category: 'EVENTOS',
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161378a6?w=400&h=400&fit=crop',
    tags: ['neon', 'fiesta', 'colorido']
  },
  {
    id: 'dt4',
    name: 'Corporativo Elegante',
    description: 'Diseño profesional para empresas',
    category: 'CORPORATIVO',
    imageUrl: 'https://images.unsplash.com/photo-1606156544350-803bda220d42?w=400&h=400&fit=crop',
    tags: ['empresa', 'elegante', 'profesional']
  },
  {
    id: 'dt5',
    name: 'Graduación Classic',
    description: 'Diseño clásico para graduaciones',
    category: 'EVENTOS',
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c476?w=400&h=400&fit=crop',
    tags: ['graduación', 'clásico', 'formal']
  },
  // ---- AGREGAR MAS DISEÑOS AQUI ----
  // {
  //   id: 'dt6',
  //   name: 'Nombre del Diseño',
  //   description: 'Descripción del diseño',
  //   category: 'CATEGORÍA',
  //   imageUrl: 'https://images.unsplash.com/photo-XXXXX?w=400&h=400&fit=crop',
  //   tags: ['tag1', 'tag2']
  // },
];
