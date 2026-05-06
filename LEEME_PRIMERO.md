# 📚 Documentación NEXUS - Lee Esto Primero

## 👋 Bienvenido!

Has recibido la documentación completa de **NEXUS**, una plataforma de e-commerce moderna para clientes y revendedores.

---

## 📖 Documentos Disponibles

### 1. **LEEME_PRIMERO.md** (Este archivo)
Guía rápida e índice de documentación.

### 2. **ESTRUCTURA_Y_EXPLICACION.md** ⭐ START HERE
**Lectura recomendada: 15-20 minutos**

- Estructura completa del proyecto
- Explicación de cada archivo
- Tipos de datos (TypeScript)
- Hooks personalizados
- Componentes
- Páginas
- Flujo de aplicación
- Guía de modificación

**Temas cubiertos:**
- ¿Qué es cada archivo?
- ¿Para qué sirve?
- ¿Cómo funciona?
- ¿Cómo modificarlo?

### 3. **EJEMPLOS_DE_CODIGO.md**
**Lectura recomendada: 20-30 minutos**

Código real con ejemplos prácticos:
- Tipos de datos con ejemplos
- Datos (productos, combos, eventos)
- Hooks con ejemplos de uso
- Componentes (ProductCard, CartModal)
- Páginas completas (ClientMode, Reseller)
- App.tsx - Navegación principal

**Mejor para:** Ver código real y entender cómo se usa.

### 4. **RESUMEN_VISUAL.md**
**Lectura recomendada: 10-15 minutos**

Diagramas y flujos visuales:
- Flujo de usuario (Cliente)
- Flujo de usuario (Revendedor)
- Estructura de carpetas
- Ciclo de vida de un pedido
- Ciclo de vida de ganancias
- Sistema de diseños personalizados
- Tecnologías usadas
- Escalabilidad futura

**Mejor para:** Entender el "big picture" rápidamente.

---

## 🚀 Cómo Empezar

### Opción 1: Aprendizaje Completo (Recomendado)

```
1. Lee LEEME_PRIMERO.md (este archivo)
2. Lee RESUMEN_VISUAL.md (flujos y diagramas)
3. Lee ESTRUCTURA_Y_EXPLICACION.md (detalles técnicos)
4. Lee EJEMPLOS_DE_CODIGO.md (código real)
```

**Tiempo total:** ~1 hora

### Opción 2: Entendimiento Rápido

```
1. Lee RESUMEN_VISUAL.md
2. Mira ESTRUCTURA_Y_EXPLICACION.md sección "Guía de Modificación"
3. Busca en EJEMPLOS_DE_CODIGO.md lo que necesitas
```

**Tiempo total:** ~30 minutos

### Opción 3: Solo Código

```
1. Abre EJEMPLOS_DE_CODIGO.md
2. Copia/pega ejemplos
3. Modifica según necesites
```

**Tiempo total:** Variable

---

## 📁 Estructura del Proyecto

```
vuelo-urbano/
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── types/index.ts
│   ├── data/products.ts          ← BASE DE DATOS
│   ├── hooks/                     ← LÓGICA
│   │   ├── useCart.ts
│   │   ├── useWhatsApp.ts
│   │   └── useCustomDesigns.ts
│   ├── components/                ← COMPONENTES
│   │   ├── ProductCard.tsx
│   │   └── CartModal.tsx
│   └── pages/                     ← PÁGINAS
│       ├── ModeSelector.tsx
│       ├── ClientMode.tsx
│       ├── Reseller.tsx
│       └── ResellerRegistration.tsx
│
├── public/
│   └── img/mi_logo.png
│
├── LEEME_PRIMERO.md              ← ESTE ARCHIVO
├── ESTRUCTURA_Y_EXPLICACION.md   ← TÉCNICO
├── EJEMPLOS_DE_CODIGO.md         ← CÓDIGO
├── RESUMEN_VISUAL.md             ← DIAGRAMAS
│
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── eslint.config.js
└── index.html
```

---

## 🎯 Conceptos Clave

### 1. **Dos Tipos de Usuarios**

**CLIENTE**
- Compra productos
- Ve solo precio final
- No ve ganancias
- Puede contactar por WhatsApp

**REVENDEDOR**
- Compra en volumen barato
- Ve 2 precios (costo + venta)
- Ve ganancias calculadas
- Panel con múltiples herramientas

### 2. **Datos Centralizados**

Todo en `src/data/products.ts`:
- 22 Productos
- 12 Combos
- 5 Eventos especiales
- 5 Plantillas de diseño

Para cambiar algo (precio, imagen, producto) → edita aquí!

### 3. **Carrito Persistente**

Se guarda en `localStorage`:
- `cart-client`: Carrito de clientes
- `cart-reseller`: Carrito de revendedores
- `custom-designs`: Diseños subidos

Persiste aunque cierres la página.

### 4. **Integración WhatsApp**

Cuando un usuario hace un pedido:
1. Se genera un mensaje formateado
2. Se abre WhatsApp automáticamente
3. El usuario envía el mensaje
4. El proveedor recibe el pedido

### 5. **Diseños Personalizados**

Los revendedores pueden:
- Subir imágenes desde PC o galería
- Asociarlas a productos específicos
- Descargar para usar en marketing
- Usar plantillas predefinidas

---

## 💡 Tareas Comunes

### Agregar un Nuevo Producto

**Archivo:** `src/data/products.ts`

```typescript
// En el array 'products', agrega:
{
  id: 'r8',  // ID único
  name: 'Mi Producto',
  description: 'Descripción',
  priceClient: 20,    // Precio cliente
  priceBase: 7.50,    // Precio revendedor
  image: 'https://images.unsplash.com/...',
  stock: 50,
  category: 'ROPA',   // Categoria existente
  subcategory: 'Mi Subcategoria'
}
```

### Cambiar un Precio

**Archivo:** `src/data/products.ts`

Busca el producto y cambia `priceClient` o `priceBase`.

### Cambiar una Imagen

**Archivo:** `src/data/products.ts`

Cambia el valor de `image` a una URL de Unsplash:
```
https://images.unsplash.com/photo-XXXXX?w=500&h=500&fit=crop
```

### Agregar una Categoría Nueva

Los filtros se generan automáticamente. Solo agrega un producto con `category: 'MI_CATEGORIA'`.

### Cambiar el Número de WhatsApp

**Archivos:** `src/hooks/useWhatsApp.ts` y en páginas

Busca `+507 6498-7682` y reemplaza.

---

## 🔍 Dónde Encontrar Cosas

| Lo que Buscas | Archivo |
|---|---|
| Agregar/cambiar producto | `src/data/products.ts` |
| Cambiar precio | `src/data/products.ts` |
| Cambiar imagen | `src/data/products.ts` |
| Lógica de carrito | `src/hooks/useCart.ts` |
| Integración WhatsApp | `src/hooks/useWhatsApp.ts` |
| Tarjeta de producto | `src/components/ProductCard.tsx` |
| Modal de carrito | `src/components/CartModal.tsx` |
| Interfaz cliente | `src/pages/ClientMode.tsx` |
| Interfaz revendedor | `src/pages/Reseller.tsx` |
| Tipos de datos | `src/types/index.ts` |
| Navegación principal | `src/App.tsx` |
| Estilos globales | `src/index.css` |

---

## 🛠️ Desarrollo

### Requisitos
- Node.js 16+
- npm o yarn

### Instalar Dependencias
```bash
npm install
```

### Ejecutar en Desarrollo
```bash
npm run dev
```
Abre: `http://localhost:5173`

### Compilar para Producción
```bash
npm run build
```
Genera carpeta `/dist` lista para publicar.

### Verificar Tipos
```bash
npm run typecheck
```

### Linter
```bash
npm run lint
```

---

## 🎨 Tecnologías Clave

### React 18
Framework principal para la UI.

### TypeScript
Tipado seguro - evita bugs.

### Tailwind CSS
Estilos con clases (sin CSS externo).

### Lucide Icons
Iconos SVG pequeños y claros.

### Vite
Empaquetador rápido y moderno.

### localStorage
Almacenamiento en el navegador (datos locales).

---

## 🚀 Funcionalidades Principales

✅ **Selector de modo** (Cliente/Revendedor)
✅ **Catálogo con 22 productos**
✅ **Filtros por categoría**
✅ **Carrito persistente**
✅ **Calculadora de ganancias**
✅ **Integración WhatsApp**
✅ **Combos (12)**
✅ **Eventos especiales (5)**
✅ **Gestor de diseños personalizados**
✅ **Plantillas de diseño (5)**
✅ **Descarga de diseños**
✅ **Interfaz responsive**
✅ **UI moderna y profesional**

---

## 📊 Estadísticas del Código

- **Líneas de código:** ~1,400
- **Archivos:** 14 principales
- **Componentes:** 2 reutilizables
- **Páginas:** 4 principales
- **Hooks:** 3 personalizados
- **Productos:** 22
- **Combos:** 12
- **Plantillas:** 5

---

## 🔐 Notas de Seguridad

### Actual (Prototipo)
- Sin autenticación real
- Datos locales en localStorage
- No hay base de datos
- WhatsApp manual

### Futuro (Producción)
- Agregar Supabase Auth
- Base de datos real
- API Edge Functions
- Pagos con Stripe
- Admin panel

---

## 📞 Contacto

**WhatsApp:** +507 6498-7682

---

## 📚 Orden de Lectura Recomendado

### Para Entender la Estructura
1. **RESUMEN_VISUAL.md** - Mira los flujos
2. **ESTRUCTURA_Y_EXPLICACION.md** - Lee los detalles

### Para Modificar Código
1. **EJEMPLOS_DE_CODIGO.md** - Ve ejemplos reales
2. **ESTRUCTURA_Y_EXPLICACION.md** - Sección "Guía de Modificación"
3. **El archivo específico** que necesitas cambiar

### Para Agregar Funcionalidad Nueva
1. **ESTRUCTURA_Y_EXPLICACION.md** - Sección "Guía de Modificación"
2. **EJEMPLOS_DE_CODIGO.md** - Busca algo similar
3. **El código existente** - Adapta según necesites

---

## ✨ Características Destacadas

### Panel de Cliente
- Home con 3 cards grandes (Catálogo, Carrito, Enviar)
- Catálogo con filtros por categoría
- Vista de productos en grid
- Carrito flotante con resumen
- Envío directo por WhatsApp

### Panel de Revendedor
- Home con 4 cards principales
- Catálogo PRO con 2 precios visibles
- Calculadora de ganancias en tiempo real
- Gestor de diseños (subir, descargar)
- Plantillas predefinidas
- Información de negocio

### Diseños Personalizados
- Subir desde PC
- Subir desde galería (móvil)
- Asociar a productos
- Descargar en PNG
- Galería de plantillas

---

## 🎓 Conceptos TypeScript Usados

```typescript
// Interfaces (definir forma de datos)
interface Product { ... }

// Types (crear alias)
type CartItem = { ... }

// Generics (funciones flexibles)
useState<CustomType>()

// React Hooks (useState, useCallback, etc.)

// Destructuring (extraer valores)
const { addItem, removeItem } = useCart()

// Operador ternario
condition ? valueA : valueB

// Array methods (map, filter, reduce)
products.map(p => <ProductCard key={p.id} />)
```

---

## 🎯 Ejemplos Rápidos

### Agregar Producto
```typescript
{
  id: 'r8',
  name: 'Chaqueta',
  priceClient: 50,
  priceBase: 18,
  // ... resto de datos
}
```

### Usar Carrito
```typescript
const cart = useCart('client');
cart.addItem('r1', 'Camiseta', 2, 9, 3.30);
console.log(cart.getTotal()); // 18
```

### Enviar WhatsApp
```typescript
const { sendToWhatsApp } = useWhatsApp();
sendToWhatsApp('Hola, quiero un pedido');
```

---

## 🚦 Estado del Proyecto

- ✅ Funcionalidad completa
- ✅ Interfaz moderna
- ✅ Responsive design
- ✅ Catálogo extenso
- ✅ Herramientas de revendedor
- ✅ Integración WhatsApp
- ⏳ Base de datos (próximo paso)
- ⏳ Autenticación (próximo paso)
- ⏳ Pagos (próximo paso)

---

## 📝 Última Actualización

- **Fecha:** Mayo 2026
- **Versión:** 1.0.0
- **Estado:** Producción-listo (con data mockup)

---

## 🎉 ¡Listo Para Empezar!

Ahora que has leído esto, elige tu siguiente documento:

1. **Para ver diagramas:** `RESUMEN_VISUAL.md`
2. **Para entender todo:** `ESTRUCTURA_Y_EXPLICACION.md`
3. **Para ver código:** `EJEMPLOS_DE_CODIGO.md`
4. **Para modificar:** Vai a `src/data/products.ts`

---

**¡NEXUS está listo para despegar! ✈️**

Cualquier pregunta, ve a la documentación específica o contacta por WhatsApp.
