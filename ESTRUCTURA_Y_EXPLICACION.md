# Documentación Completa - Vuelo Urbano

## 📋 Índice
1. [Estructura del Proyecto](#estructura-del-proyecto)
2. [Tipos de Datos](#tipos-de-datos)
3. [Datos (Productos, Combos, Eventos)](#datos)
4. [Hooks Personalizados](#hooks-personalizados)
5. [Componentes](#componentes)
6. [Páginas](#páginas)
7. [Flujo de Aplicación](#flujo-de-aplicación)
8. [Guía de Modificación](#guía-de-modificación)

---

## 🏗️ Estructura del Proyecto

```
/src
├── main.tsx                 # Punto de entrada de React
├── App.tsx                  # Componente raíz que maneja navegación
├── index.css                # Estilos globales (Tailwind CSS)
│
├── /types                   # Definiciones de tipos TypeScript
│   └── index.ts            # Tipos de datos (Product, Combo, etc.)
│
├── /data                    # Datos estáticos de la aplicación
│   └── products.ts         # Productos, combos, eventos, plantillas
│
├── /hooks                   # Hooks personalizados de React
│   ├── useCart.ts          # Manejo del carrito
│   ├── useWhatsApp.ts      # Integración con WhatsApp
│   └── useCustomDesigns.ts # Gestión de diseños personalizados
│
├── /components             # Componentes reutilizables
│   ├── ProductCard.tsx     # Tarjeta de producto
│   └── CartModal.tsx       # Modal del carrito
│
└── /pages                  # Páginas principales
    ├── ModeSelector.tsx    # Pantalla principal (Cliente o Revendedor)
    ├── ClientMode.tsx      # Página del cliente
    ├── Reseller.tsx        # Página del revendedor
    └── ResellerRegistration.tsx # Registro de revendedores
```

---

## 🔧 Tipos de Datos (`src/types/index.ts`)

### Definiciones principales:

```typescript
// Interfaz de un producto
interface Product {
  id: string;              // ID único (ej: 'r1', 't1')
  name: string;            // Nombre del producto (ej: "Camiseta Niño")
  description: string;     // Descripción
  priceClient: number;     // Precio para cliente final
  priceBase: number;       // Costo base (lo que paga el revendedor)
  image: string;           // URL de la imagen
  stock: number;           // Cantidad disponible
  category: string;        // Categoría (ROPA, TAZAS, ARTÍCULOS, etc.)
  subcategory: string;     // Subcategoría
}

// Interfaz de un combo
interface Combo {
  id: string;              // ID único (ej: 'cr1')
  name: string;            // Nombre (ej: "Duo Camisetas")
  description: string;     // Descripción
  includes: string;        // Qué incluye (ej: "2 camisetas")
  priceClient: number;     // Precio de venta
  priceBase: number;       // Costo base
  category: string;        // Categoría (COMBOS ROPA, COMBOS TAZAS, etc.)
  icon: string;            // Emoji representativo
}

// Elemento del carrito
interface CartItem {
  productId: string;       // ID del producto
  name: string;            // Nombre del producto
  quantity: number;        // Cantidad
  priceClient: number;     // Precio unitario para cliente
  priceBase: number;       // Costo unitario
}
```

---

## 📊 Datos (`src/data/products.ts`)

Este archivo es el **"corazón de datos"** de toda la aplicación. Contiene:

### 1️⃣ **Array `products`** (22 productos)

Divididos en 5 categorías:

**ROPA** (7 productos):
```typescript
{
  id: 'r1',
  name: 'Camiseta Niño',
  description: 'Camiseta de alta calidad para niños - 45x35 cm',
  priceClient: 9,      // Lo que paga el cliente
  priceBase: 3.30,     // Lo que cuesta hacer
  image: 'https://images.unsplash.com/photo-...',
  stock: 100,
  category: 'ROPA',
  subcategory: 'Camisetas'
}
```

**TAZAS Y BOTELLAS** (5 productos)
**ARTÍCULOS PEQUEÑOS** (5 productos)
**ESPECIALES** (4 productos)
**DEPORTIVO** (3 productos)

### 2️⃣ **Array `combos`** (12 combos)

Agrupados en 3 categorías:
- **COMBOS ROPA** (4): Duo, Familiar 3, Familiar 4, Familiar 5+
- **COMBOS TAZAS** (4): Duo, Trio, Familiar, Regalo
- **COMBOS ARTÍCULOS** (4): Pack 3, Pack 5, Escolar, Recuerdo

```typescript
{
  id: 'cr1',
  name: 'Duo Camisetas',
  description: '2 camisetas con diseño personalizado',
  includes: '2 camisetas',
  priceClient: 20,
  priceBase: 6.60,
  category: 'COMBOS ROPA',
  icon: '👕'
}
```

### 3️⃣ **Array `eventPackages`** (5 paquetes)

Para eventos especiales:
```typescript
{
  id: 'event1',
  name: 'Fiesta 30 personas',
  icon: '🎂',
  cost: 149,           // Costo de fabricación
  price: 300,          // Precio sugerido
  profit: 101,         // Ganancia = price - cost - labor
  labor: 50,           // Mano de obra
  description: '...'
}
```

### 4️⃣ **Array `designTemplates`** (5 plantillas)

Diseños predeterminados que pueden usar los revendedores:
```typescript
{
  id: 'dt1',
  name: 'Urbano Básico',
  description: 'Diseño urbano minimalista con tipografía bold',
  category: 'URBANO',
  imageUrl: 'https://...',
  tags: ['minimalista', 'urbano', 'texto']
}
```

---

## 🎣 Hooks Personalizados

### 1️⃣ **useCart** (`src/hooks/useCart.ts`)

Maneja la lógica del carrito de compras.

**Funciones principales:**
```typescript
const cart = useCart('client'); // o 'reseller'

// Agregar item al carrito
cart.addItem(
  productId: string,
  name: string,
  quantity: number,
  priceClient: number,
  priceBase: number
);

// Actualizar cantidad
cart.updateQuantity(productId: string, quantity: number);

// Eliminar del carrito
cart.removeItem(productId: string);

// Obtener total a pagar
cart.getTotal();           // Suma de (priceClient * qty)

// Obtener ganancia (solo revendedor)
cart.getProfit();          // Suma de ((priceClient - priceBase) * qty)

// Obtener cantidad de items
cart.getTotalItems();      // Cantidad total

// Limpiar carrito
cart.clearCart();
```

**Almacenamiento:**
- Usa `localStorage` para guardar el carrito
- Clave: `cart-client` o `cart-reseller`
- Los datos persisten aunque cierres la página

### 2️⃣ **useWhatsApp** (`src/hooks/useWhatsApp.ts`)

Integra la aplicación con WhatsApp Business.

**Funciones:**
```typescript
const { generateOrderMessage, sendToWhatsApp } = useWhatsApp();

// Generar mensaje de pedido formateado
generateOrderMessage(
  items: CartItem[],
  mode: 'client' | 'reseller',
  total: number,
  profit?: number
);
// Devuelve un mensaje tipo:
// "Pedido Cliente:
//  - Camiseta Niño x2 = $18.00
//  Total: $18.00
//  +507 6498-7682"

// Enviar a WhatsApp
sendToWhatsApp(message: string);
// Abre WhatsApp con el mensaje pre-escrito
```

### 3️⃣ **useCustomDesigns** (`src/hooks/useCustomDesigns.ts`)

Gestiona los diseños personalizados subidos por revendedores.

**Funciones:**
```typescript
const designs = useCustomDesigns();

designs.addDesign(design: CustomDesign);
designs.removeDesign(id: string);
designs.getAll();
```

---

## 🧩 Componentes Reutilizables

### 1️⃣ **ProductCard** (`src/components/ProductCard.tsx`)

Tarjeta individual de un producto.

**Props:**
```typescript
interface Props {
  product: Product;           // Datos del producto
  mode: 'client' | 'reseller'; // Modo de visualización
  onAddToCart: (qty: number) => void; // Callback al agregar
}
```

**Características:**
- Muestra imagen, nombre, descripción
- Botón para agregar al carrito (con selector de cantidad)
- En modo `client`: muestra solo `priceClient`
- En modo `reseller`: muestra ambos precios y calcula ganancia
- Diseño responsive (tarjeta adaptable)

### 2️⃣ **CartModal** (`src/components/CartModal.tsx`)

Modal (ventana flotante) que muestra el carrito.

**Props:**
```typescript
interface Props {
  items: CartItem[];
  mode: 'client' | 'reseller';
  total: number;
  profit?: number;           // Solo en revendedor
  onClose: () => void;       // Cerrar modal
  onUpdateQuantity: (id, qty) => void;
  onRemoveItem: (id) => void;
  onSendOrder: () => void;   // Enviar a WhatsApp
}
```

**Funcionalidades:**
- Lista de items en el carrito
- Botones para aumentar/disminuir cantidad
- Botón para eliminar item
- Resumen de totales
- Botón "Enviar Pedido por WhatsApp"

---

## 📄 Páginas Principales

### 1️⃣ **ModeSelector** (`src/pages/ModeSelector.tsx`)

**Propósito:** Pantalla inicial donde el usuario elige si es Cliente o Revendedor.

**Estructura:**
```
┌─────────────────────────┐
│   Logo Vuelo Urbano     │
│ Bienvenido a Vuelo      │
│ Urbano                  │
└─────────────────────────┘
         ↓
┌────────────┬────────────┐
│  CLIENTE   │ REVENDEDOR │
│ Tarjeta    │ Tarjeta    │
│ Roja       │ Amarilla   │
└────────────┴────────────┘
         ↓
┌────────────────────────┐
│  BENEFICIOS (3)        │
│ 📦 Envios Rapidos      │
│ ⭐ Calidad Premium     │
│ 💼 Negocio Escalable   │
└────────────────────────┘
```

**Estado:**
```typescript
const [mode, setMode] = useState<'client' | 'reseller' | 'register'>('idle');
```

**Flujo:**
1. Usuario ve 2 tarjetas grandes (Cliente/Revendedor)
2. Al hacer click, llama `onSelect(mode)`
3. La app navega a ClientMode o ResellerRegistration

---

### 2️⃣ **ClientMode** (`src/pages/ClientMode.tsx`)

**Propósito:** Página para clientes finales que compran productos.

**Estructura de vistas:**

#### Vista HOME (inicio)
```
┌─────────────────────────────┐
│  Logo                       │
│  "Estilo que te impulsa"    │
│  "Ropa urbana..."           │
└─────────────────────────────┘
         ↓
┌──────────┬────────┬────────┐
│CATÁLOGO  │CARRITO │ENVIAR  │
│(Rojo)    │(Naranja)│PEDIDO  │
│👕        │🛒      │(Verde) │
│          │        │✈️      │
└──────────┴────────┴────────┘
         ↓
┌─────────────────────────────┐
│ ¿Diseño personalizado?      │
│ [Quiero uno] 💬             │
└─────────────────────────────┘
         ↓
┌──────────┬──────────┬────────┐
│🚚 Envios │✓ Calidad │❤️ Pasión│
│Rápidos   │Garantizada│         │
└──────────┴──────────┴────────┘
```

#### Vista CATALOG
```
┌─────────────────────────┐
│ Filtros de Categoría    │
│ [ROPA] [TAZAS] [...]    │
└─────────────────────────┘
         ↓
┌─────────────────────────┐
│ Grid de 4 ProductCards  │
│ [Camiseta] [Taza] ...   │
└─────────────────────────┘
```

**Estados:**
```typescript
const [viewMode, setViewMode] = useState<'home' | 'catalog'>('home');
const [selectedCategory, setSelectedCategory] = useState('ROPA');
const [showCart, setShowCart] = useState(false);
```

**Flujo:**
1. Inicia en HOME
2. Usuario puede:
   - Click en CATÁLOGO → ir a CATALOG
   - Click en CARRITO → mostrar CartModal
   - Click en ENVIAR → generar mensaje WhatsApp
3. En CATALOG puede filtrar por categoría
4. Agregar productos al carrito
5. CartModal permite enviar pedido

---

### 3️⃣ **Reseller** (`src/pages/Reseller.tsx`)

**Propósito:** Panel completo para revendedores con múltiples herramientas.

**Estructura de vistas:**

#### Vista HOME (inicio revendedor)
```
┌──────────────────────────┐
│ Logo Vuelo Urbano        │
│ "Bienvenido, Revendedor" │
│ "Haz crecer tu negocio"  │
└──────────────────────────┘
         ↓
┌────────┬────────┬────────┬───────┐
│CATÁLOGO│GANANCIA│PEDIDOS │INFO   │
│PRO     │        │DIRECTO │NEGOCIO│
│👔      │🧮      │📦      │ℹ️     │
└────────┴────────┴────────┴───────┘
         ↓
┌─────────────────────────────┐
│ Más vendes, más ganas       │
│ Descuentos + Beneficios     │
└─────────────────────────────┘
```

#### Vista CATALOG
- Igual a ClientMode pero con 2 precios visibles
- Muestra ganancia por producto

#### Vista CALCULATOR
```
┌──────────────────────────┐
│ Simulador de Ganancias   │
├──────────────────────────┤
│ Para cada item:          │
│ - Cantidad               │
│ - Costo unitario         │
│ - Ganancia unitaria      │
│ - Ganancia total         │
├──────────────────────────┤
│ RESUMEN FINAL:           │
│ Ganancia Total: $XXX     │
│ Inversión: $XXX          │
└──────────────────────────┘
```

#### Vista INFO
- Opciones de revendedor (opción 1 vs opción 2)
- Desglose de costos
- Consejos para vender

#### Vista DESIGNS
- Galería de plantillas predefinidas
- Posibilidad de subir diseños propios
- Descargar diseños

**Estados:**
```typescript
const [viewMode, setViewMode] = useState<
  'home' | 'catalog' | 'combos' | 'events' | 'designs' | 'calculator' | 'info'
>('home');
const [customDesigns, setCustomDesigns] = useState<CustomDesign[]>(
  JSON.parse(localStorage.getItem('custom-designs') || '[]')
);
const [showDesignForm, setShowDesignForm] = useState(false);
```

**Funcionalidades especiales:**

**Subir Diseño:**
```typescript
// Usuario hace click en "Nuevo Diseño"
// Formulario aparece con:
// - Input de nombre
// - Input de descripción
// - Botón subir imagen (desde PC o galería)
// - Checkboxes de productos donde aplica
// - Botón Guardar

// Al guardar se crea objeto CustomDesign:
{
  id: timestamp,
  name: nombre,
  description: descripción,
  imageData: base64,  // Imagen convertida a texto
  products: [ids],
  createdAt: timestamp
}

// Se guarda en localStorage bajo 'custom-designs'
```

**Descargar Diseño:**
```typescript
const downloadDesign = (imageData, name) => {
  // Crea un link temporal
  const link = document.createElement('a');
  link.href = imageData;
  link.download = `${name}.png`;
  link.click();
  // Usuario descarga la imagen a su dispositivo
}
```

---

### 4️⃣ **ResellerRegistration** (`src/pages/ResellerRegistration.tsx`)

Página de registro para nuevos revendedores.

---

## 🔄 Flujo de Aplicación Completo

### Inicio de la aplicación:

```
main.tsx (Punto de entrada)
    ↓
App.tsx (Componente raíz)
    ↓
    ├─ currentPage === 'modeSelector'?
    │   ↓
    │   ModeSelector
    │   ├─ onClick CLIENT → ClientMode
    │   ├─ onClick RESELLER → ResellerRegistration
    │   └─ onClick RESELLER (ya registrado) → Reseller
    │
    ├─ currentPage === 'client'?
    │   ↓
    │   ClientMode
    │   ├─ viewMode: 'home' (inicio)
    │   │   ├─ Click "Ver productos" → viewMode='catalog'
    │   │   ├─ Click "Ver carrito" → showCart=true
    │   │   └─ Click "Enviar por WhatsApp" → sendToWhatsApp()
    │   │
    │   ├─ viewMode: 'catalog'
    │   │   ├─ Click categoría → filtrar productos
    │   │   ├─ Click "Agregar" → cart.addItem()
    │   │   └─ CartModal abierto → sendToWhatsApp()
    │   │
    │   └─ onBack() → volver a ModeSelector
    │
    └─ currentPage === 'reseller'?
        ↓
        Reseller
        ├─ viewMode: 'home'
        │   ├─ Click "CATÁLOGO PRO" → viewMode='catalog'
        │   ├─ Click "CALCULADORA" → viewMode='calculator'
        │   ├─ Click "INFO" → viewMode='info'
        │   └─ Click "DISEÑOS" → viewMode='designs'
        │
        ├─ viewMode: 'catalog'
        │   ├─ Filtrar por categoría
        │   ├─ Ver 2 precios: cliente y revendedor
        │   ├─ Agregar al carrito
        │   └─ Ver ganancia por producto
        │
        ├─ viewMode: 'calculator'
        │   ├─ Mostrar items en carrito
        │   ├─ Calcular ganancia por item
        │   └─ Mostrar ganancia total + inversión
        │
        ├─ viewMode: 'designs'
        │   ├─ Subir nuevos diseños (PC o galería)
        │   ├─ Descargar diseños propios
        │   ├─ Descargar plantillas predeterminadas
        │   └─ Eliminar diseños
        │
        ├─ viewMode: 'info'
        │   ├─ Opciones de negocio
        │   ├─ Desglose de costos
        │   └─ Consejos de venta
        │
        └─ onBack() → volver a ModeSelector
```

---

## 🛠️ Guía de Modificación

### 1️⃣ AGREGAR UN NUEVO PRODUCTO

**Archivo:** `src/data/products.ts`

```typescript
// En el array 'products', agrega:
{
  id: 'r8',  // ID único, seguir patrón
  name: 'Sudadera Premium',
  description: 'Sudadera de alta calidad',
  priceClient: 45,
  priceBase: 15.50,
  image: 'https://images.unsplash.com/photo-XXXXX?w=500&h=500&fit=crop',
  stock: 30,
  category: 'ROPA',  // Debe existir la categoría
  subcategory: 'Sudaderas'
}
```

### 2️⃣ AGREGAR UN NUEVO COMBO

```typescript
// En el array 'combos':
{
  id: 'cr5',
  name: 'Pack Verano',
  description: '3 camisetas + botella',
  includes: '3 camisetas + 1 botella',
  priceClient: 35,
  priceBase: 12.50,
  category: 'COMBOS ROPA',  // Usar categoría existente
  icon: '☀️'
}
```

### 3️⃣ AGREGAR UNA PLANTILLA DE DISEÑO

```typescript
// En el array 'designTemplates':
{
  id: 'dt6',
  name: 'Retro Vibes',
  description: 'Diseño retro con colores vivos',
  category: 'RETRO',
  imageUrl: 'https://images.unsplash.com/photo-XXXXX?w=400&h=400&fit=crop',
  tags: ['retro', 'vintage', 'colores']
}
```

### 4️⃣ CAMBIAR UN PRECIO

```typescript
// En products.ts, busca el producto y cambia priceClient o priceBase
{
  id: 'r1',
  name: 'Camiseta Niño',
  priceClient: 10,  // ← Cambiar aquí
  priceBase: 3.50,  // ← O aquí
  ...
}
```

### 5️⃣ CAMBIAR UNA IMAGEN

```typescript
// En products.ts, busca el producto y cambia 'image':
{
  id: 'r1',
  image: 'https://images.unsplash.com/photo-NUEVA-URL?w=500&h=500&fit=crop',
  // ← Reemplazar con nueva URL de Unsplash
  ...
}
```

### 6️⃣ AGREGAR NUEVA CATEGORÍA

```typescript
// 1. Agrega productos con category: 'NUEVA_CATEGORIA'
// 2. Los filtros se generan automáticamente desde los productos:

const categories = Array.from(new Set(products.map(p => p.category)));
// Esto crea un array único de todas las categorías que existen
```

### 7️⃣ MODIFICAR NÚMERO DE WHATSAPP

**Archivo:** `src/hooks/useWhatsApp.ts`

```typescript
const WHATSAPP_NUMBER = '+507 6498-7682'; // Cambiar aquí
```

O también en las páginas directamente:
```typescript
// ClientMode.tsx, Reseller.tsx, ModeSelector.tsx
sendToWhatsApp('mensaje')
// Usa el número definido en el hook
```

### 8️⃣ CAMBIAR COLORES Y TEMA

**Archivo:** `src/index.css` (Tailwind CSS)

Tailwind usa clases como:
- `bg-red-600` (rojo)
- `bg-yellow-500` (amarillo)
- `text-white` (texto blanco)

Busca en las páginas y cambia las clases Tailwind:
```typescript
<button className="bg-red-600 hover:bg-red-700">
  // ↓ Cambiar a:
<button className="bg-blue-600 hover:bg-blue-700">
```

---

## 📱 Desglose de Tipos de Usuario

### CLIENTE
1. Accede a ModeSelector
2. Selecciona "Cliente"
3. Ve interfaz simplificada con:
   - Home con 3 cards principales
   - Catálogo para ver productos
   - Carrito para ver pedido
   - Envío por WhatsApp
4. Ve solo precio cliente (`priceClient`)
5. No ve ganancias ni costos

### REVENDEDOR
1. Accede a ModeSelector
2. Selecciona "Revendedor"
3. Completa registro (opcional)
4. Ve interfaz completa con:
   - Home con 4 cards principales
   - Catálogo PRO (ve 2 precios)
   - Calculadora de ganancias
   - Gestor de diseños
   - Información de negocio
5. Ve tanto `priceClient` como `priceBase`
6. Puede calcular ganancias

---

## 💾 Almacenamiento de Datos

### localStorage (Navegador del usuario)

```typescript
// Carrito Cliente
localStorage.getItem('cart-client')
localStorage.setItem('cart-client', JSON.stringify(items))

// Carrito Revendedor
localStorage.getItem('cart-reseller')
localStorage.setItem('cart-reseller', JSON.stringify(items))

// Diseños Personalizados
localStorage.getItem('custom-designs')
localStorage.setItem('custom-designs', JSON.stringify(designs))
```

### Datos en memoria (se pierden al recargar)
- `viewMode` estado de la página actual
- `showCart` si el modal está abierto
- `customDesigns` mientras el usuario está en la página

---

## 🎯 Casos de Uso Principales

### CLIENTE QUIERE HACER UN PEDIDO

```
1. Entra a la app
2. ModeSelector → selecciona "Cliente"
3. ClientMode HOME aparece
4. Click en "CATÁLOGO" → va a CATALOG
5. Selecciona categoría (ROPA, TAZAS, etc.)
6. Ve productos disponibles
7. Click "Agregar" en un producto
8. Elige cantidad
9. Producto entra al carrito
10. Repite 7-9 con más productos
11. Click "CARRITO" o botón de carrito
12. CartModal muestra el resumen
13. Click "Enviar Pedido por WhatsApp"
14. Se genera mensaje con:
    - Listado de productos
    - Cantidades
    - Total a pagar
    - Número WhatsApp: +507 6498-7682
15. Se abre WhatsApp con el mensaje
16. Cliente envía el mensaje
17. Revendedor ve el pedido y responde
```

### REVENDEDOR QUIERE CALCULAR GANANCIAS

```
1. Entra a la app
2. ModeSelector → selecciona "Revendedor"
3. Reseller HOME aparece
4. Click "CATÁLOGO PRO"
5. Ve productos con 2 precios:
   - Precio cliente: $11.50
   - Tu costo: $4.00
   - Tu ganancia: $7.50
6. Selecciona una categoría
7. Agrega varios productos al carrito
8. Click "CALCULADORA"
9. Ve desglose de ganancias:
   - Por producto
   - Por total
10. Calcula si le conviene el pedido
11. Si le gusta, puede hacer el pedido
12. Click en carrito → CartModal
13. Click "Enviar Pedido" → WhatsApp
14. Envía su pedido al proveedor
```

### REVENDEDOR SUBE UN DISEÑO

```
1. Está en Reseller
2. Click "DISEÑOS" (en home o vía tab)
3. Aparece lista de diseños (vacía al principio)
4. Click "Nuevo Diseño"
5. Formulario aparece:
   - Input de nombre: "Mi primer diseño"
   - Input de descripción: "Diseño de verano"
6. Click "Subir desde PC"
7. Selecciona una imagen de su computadora
8. La imagen aparece como preview
9. Selecciona qué productos se pueden usar
   - Checkboxes de Camiseta Niño, Camiseta Mujer, etc.
10. Click "Guardar Diseño"
11. El diseño se guarda en localStorage
12. Aparece en la galería "Mis Diseños"
13. Click icono de descarga → descarga la imagen
14. Puede usar esa imagen en su publicidad
```

---

## 🔐 Seguridad y Consideraciones

1. **No hay autenticación real**: Cualquiera puede ser revendedor
   - En producción, agregar autenticación con Supabase Auth

2. **LocalStorage no es seguro**: 
   - Datos del carrito se ven en consola
   - En producción, usar base de datos

3. **Imágenes externas**:
   - Usa URLs de Unsplash (públicas)
   - Las imágenes se cargan desde internet

4. **WhatsApp manual**:
   - El usuario debe copiar/pegar el mensaje
   - O hace click y se abre WhatsApp automáticamente
   - En producción, usar API de WhatsApp Business

---

## 📊 Resumen de Archivos Críticos

| Archivo | Líneas | Propósito |
|---------|--------|----------|
| `src/data/products.ts` | ~300 | Datos de productos, combos, eventos, diseños |
| `src/pages/ClientMode.tsx` | ~200 | Interfaz para clientes |
| `src/pages/Reseller.tsx` | ~500 | Panel completo de revendedores |
| `src/hooks/useCart.ts` | ~80 | Lógica del carrito |
| `src/components/ProductCard.tsx` | ~100 | Tarjeta de producto |
| `src/components/CartModal.tsx` | ~150 | Modal del carrito |
| `src/App.tsx` | ~50 | Navegación principal |

**Total: ~1,400 líneas de código funcional**

---

## ✅ Checklist para Agregar Nueva Funcionalidad

- [ ] ¿Necesito nuevos datos? → Editar `src/data/products.ts`
- [ ] ¿Necesito nueva página? → Crear archivo en `src/pages/`
- [ ] ¿Necesito nuevo hook? → Crear archivo en `src/hooks/`
- [ ] ¿Necesito nuevo componente? → Crear archivo en `src/components/`
- [ ] ¿Cambió un tipo de dato? → Actualizar `src/types/index.ts`
- [ ] ¿Nuevas rutas/navegación? → Editar `src/App.tsx`
- [ ] ¿Hacer build? → `npm run build`
- [ ] ¿Verificar errores? → `npm run typecheck`

---

**Fin de la documentación. ¡Ahora entiendes toda la estructura!**
