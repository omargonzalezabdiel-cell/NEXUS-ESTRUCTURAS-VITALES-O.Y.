# Ejemplos de Código - NEXUS

## 📚 Guía con Ejemplos Reales

---

## 1️⃣ TIPOS DE DATOS (TypeScript)

### Archivo: `src/types/index.ts`

```typescript
// Interfaz para un producto que se vende
export interface Product {
  id: string;              // "r1", "t5", etc. - ID único
  name: string;            // "Camiseta Niño"
  description: string;     // "Camiseta de alta calidad para niños - 45x35 cm"
  priceClient: number;     // 9 - Precio que paga el cliente final
  priceBase: number;       // 3.30 - Costo que paga el revendedor
  image: string;           // "https://images.unsplash.com/..." - URL de imagen
  stock: number;           // 100 - Cantidad disponible
  category: string;        // "ROPA", "TAZAS Y BOTELLAS", etc.
  subcategory: string;     // "Camisetas", "Polos", etc.
}

// Interfaz para un combo (varias cosas juntas)
export interface Combo {
  id: string;              // "cr1", "ct2", etc.
  name: string;            // "Duo Camisetas"
  description: string;     // "2 camisetas con diseño personalizado"
  includes: string;        // "2 camisetas" - Qué incluye el combo
  priceClient: number;     // 20 - Precio de venta
  priceBase: number;       // 6.60 - Costo
  category: string;        // "COMBOS ROPA", "COMBOS TAZAS", etc.
  icon: string;            // "👕" - Emoji representativo
}

// Interfaz para un item en el carrito
export interface CartItem {
  productId: string;       // ID del producto
  name: string;            // Nombre para mostrar
  quantity: number;        // Cantidad que el usuario agregó
  priceClient: number;     // Precio unitario para cliente
  priceBase: number;       // Costo unitario
}

// Interfaz para un diseño personalizado que sube el revendedor
export interface CustomDesign {
  id: string;              // Timestamp como ID
  name: string;            // "Mi primer diseño"
  description: string;     // Descripción opcional
  imageData: string;       // Base64 de la imagen (texto largo)
  products: string[];      // IDs de productos donde aplica: ["r1", "t2"]
  createdAt: string;       // Fecha ISO cuando se creó
}
```

**¿Para qué sirven?**
- Dicen a TypeScript qué estructura debe tener cada dato
- Si intentas crear un Product sin estos campos, TypeScript te avisa error
- Ayuda a evitar bugs

---

## 2️⃣ DATOS DE PRODUCTOS

### Archivo: `src/data/products.ts`

```typescript
import { Product } from '../types';

export const products: Product[] = [
  // ==========================================
  // 👕 ROPA
  // ==========================================
  {
    id: 'r1',
    name: 'Camiseta Niño',
    description: 'Camiseta de alta calidad para niños - 45x35 cm',
    priceClient: 9,        // Cliente paga $9
    priceBase: 3.30,       // Revendedor paga $3.30
    image: 'https://images.unsplash.com/photo-521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
    stock: 100,            // Hay 100 disponibles
    category: 'ROPA',
    subcategory: 'Camisetas'
  },
  
  {
    id: 'r2',
    name: 'Camiseta Niña',
    description: 'Camiseta de alta calidad para niñas - 45x35 cm',
    priceClient: 9,
    priceBase: 3.30,
    image: 'https://images.unsplash.com/photo-519238263530-99bdd11df2ea?w=500&h=500&fit=crop',
    stock: 100,
    category: 'ROPA',
    subcategory: 'Camisetas'
  },
  
  // ... más productos ...
];

// Combos (múltiples productos)
export const combos: Combo[] = [
  {
    id: 'cr1',
    name: 'Duo Camisetas',
    description: '2 camisetas con diseño personalizado',
    includes: '2 camisetas',
    priceClient: 20,      // Por $20 llevas 2 camisetas
    priceBase: 6.60,      // Te cuestan $6.60 al revendedor
    category: 'COMBOS ROPA',
    icon: '👕'
  },
  // ... más combos ...
];

// Plantillas de diseños que revendedores pueden usar
export const designTemplates: DesignTemplate[] = [
  {
    id: 'dt1',
    name: 'Urbano Básico',
    description: 'Diseño urbano minimalista con tipografía bold',
    category: 'URBANO',
    imageUrl: 'https://images.unsplash.com/photo-...',
    tags: ['minimalista', 'urbano', 'texto']
  },
];
```

**¿Por qué en un archivo separado?**
- Fácil de actualizar precios, stock, productos
- Toda la lógica de negocio en un lugar
- Si quieres cambiar algo, cambias aquí y listo

---

## 3️⃣ HOOK: useCart

### Archivo: `src/hooks/useCart.ts`

```typescript
import { useState, useCallback } from 'react';
import { CartItem } from '../types';

export const useCart = (mode: 'client' | 'reseller') => {
  // Clave para guardar en localStorage
  const storageKey = `cart-${mode}`;
  
  // Estado del carrito
  const [items, setItems] = useState<CartItem[]>(() => {
    // Al cargar, intenta leer del localStorage
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : [];
  });

  // Cada vez que items cambia, guarda en localStorage
  const saveToStorage = useCallback((newItems: CartItem[]) => {
    setItems(newItems);
    localStorage.setItem(storageKey, JSON.stringify(newItems));
  }, [storageKey]);

  // Agregar un producto al carrito
  const addItem = useCallback((
    productId: string,
    name: string,
    quantity: number,
    priceClient: number,
    priceBase: number
  ) => {
    setItems(prev => {
      // Busca si el producto ya está en el carrito
      const existing = prev.find(item => item.productId === productId);
      
      if (existing) {
        // Si ya existe, aumenta la cantidad
        return prev.map(item =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Si no existe, lo agrega nuevo
        return [...prev, { productId, name, quantity, priceClient, priceBase }];
      }
    });
  }, []);

  // Actualizar cantidad de un producto
  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      // Si cantidad es 0, elimina el producto
      removeItem(productId);
      return;
    }
    
    const newItems = items.map(item =>
      item.productId === productId
        ? { ...item, quantity }
        : item
    );
    saveToStorage(newItems);
  }, [items, saveToStorage]);

  // Eliminar un producto del carrito
  const removeItem = useCallback((productId: string) => {
    const newItems = items.filter(item => item.productId !== productId);
    saveToStorage(newItems);
  }, [items, saveToStorage]);

  // Calcular total a pagar
  const getTotal = useCallback(() => {
    return items.reduce((sum, item) => sum + (item.priceClient * item.quantity), 0);
  }, [items]);

  // Calcular ganancia del revendedor
  // Ganancia = (priceClient - priceBase) * cantidad
  const getProfit = useCallback(() => {
    return items.reduce(
      (sum, item) => sum + ((item.priceClient - item.priceBase) * item.quantity),
      0
    );
  }, [items]);

  // Obtener cantidad total de items
  const getTotalItems = useCallback(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  // Vaciar todo el carrito
  const clearCart = useCallback(() => {
    saveToStorage([]);
  }, [saveToStorage]);

  // Retornar todas las funciones y el estado
  return {
    items,
    addItem,
    updateQuantity,
    removeItem,
    getTotal,
    getProfit,
    getTotalItems,
    clearCart
  };
};
```

**Ejemplo de uso en un componente:**

```typescript
// En ClientMode.tsx o Reseller.tsx
import { useCart } from '../hooks/useCart';

export default function MiComponente() {
  // Crear el carrito para "client"
  const cart = useCart('client');
  
  // Agregar producto cuando usuario hace click
  const handleAddToCart = () => {
    cart.addItem(
      'r1',              // ID del producto
      'Camiseta Niño',   // Nombre
      2,                 // Cantidad (2 camisetas)
      9,                 // Precio cliente
      3.30               // Precio base
    );
  };

  // Ver items agregados
  console.log(cart.items);           // [{ productId: 'r1', quantity: 2, ... }]
  console.log(cart.getTotal());      // 18 (9 * 2)
  console.log(cart.getTotalItems()); // 2
  
  return (
    <button onClick={handleAddToCart}>
      Agregar {cart.getTotalItems()} items
    </button>
  );
}
```

---

## 4️⃣ HOOK: useWhatsApp

### Archivo: `src/hooks/useWhatsApp.ts`

```typescript
import { CartItem } from '../types';

export const useWhatsApp = () => {
  const WHATSAPP_NUMBER = '+507 6498-7682';

  // Generar mensaje formateado para WhatsApp
  const generateOrderMessage = (
    items: CartItem[],
    mode: 'client' | 'reseller',
    total: number,
    profit?: number
  ): string => {
    // Construir el mensaje línea por línea
    let message = mode === 'client' 
      ? '📝 *PEDIDO CLIENTE*\n\n'
      : '📝 *PEDIDO REVENDEDOR*\n\n';
    
    // Agregar cada producto
    items.forEach(item => {
      const itemTotal = (item.priceClient * item.quantity).toFixed(2);
      message += `• ${item.name}\n`;
      message += `  Cantidad: ${item.quantity} x $${item.priceClient.toFixed(2)}\n`;
      message += `  Subtotal: $${itemTotal}\n\n`;
    });

    // Agregar total
    message += `*TOTAL A PAGAR:* $${total.toFixed(2)}\n\n`;

    // Si es revendedor, agregar ganancia
    if (mode === 'reseller' && profit !== undefined) {
      message += `💰 Tu ganancia: $${profit.toFixed(2)}\n`;
      message += `💸 Tu inversión: $${(total - profit).toFixed(2)}\n\n`;
    }

    // Agregar número para contacto
    message += `📞 WhatsApp: ${WHATSAPP_NUMBER}`;
    
    return message;
  };

  // Enviar mensaje a WhatsApp
  const sendToWhatsApp = (message: string) => {
    // Codificar el mensaje para URL
    const encodedMessage = encodeURIComponent(message);
    
    // URL de WhatsApp API
    const whatsappUrl = `https://api.whatsapp.com/send/?phone=507${WHATSAPP_NUMBER.replace(/\D/g, '')}&text=${encodedMessage}`;
    
    // Abrir en nueva ventana
    window.open(whatsappUrl, '_blank');
  };

  return { generateOrderMessage, sendToWhatsApp };
};
```

**Ejemplo de uso:**

```typescript
const { generateOrderMessage, sendToWhatsApp } = useWhatsApp();

// Cuando usuario hace click en "Enviar Pedido"
const handleSendOrder = () => {
  const message = generateOrderMessage(
    cart.items,   // [{ productId: 'r1', name: 'Camiseta', quantity: 2, ... }]
    'client',     // Modo cliente
    cart.getTotal() // 18
  );

  // Mensaje generado:
  // 📝 *PEDIDO CLIENTE*
  // 
  // • Camiseta Niño
  //   Cantidad: 2 x $9.00
  //   Subtotal: $18.00
  // 
  // *TOTAL A PAGAR:* $18.00
  // 
  // 📞 WhatsApp: +507 6498-7682

  sendToWhatsApp(message);
  // Se abre WhatsApp con el mensaje
};
```

---

## 5️⃣ COMPONENTE: ProductCard

### Archivo: `src/components/ProductCard.tsx`

```typescript
import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  mode: 'client' | 'reseller';
  onAddToCart: (quantity: number) => void;
}

export default function ProductCard({ product, mode, onAddToCart }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    onAddToCart(quantity);
    setQuantity(1); // Reiniciar la cantidad
  };

  // Calcular ganancia (solo visible para revendedor)
  const profit = product.priceClient - product.priceBase;
  const profitPercent = ((profit / product.priceBase) * 100).toFixed(0);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
      {/* Imagen del producto */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform"
        />
      </div>

      {/* Contenido de la tarjeta */}
      <div className="p-4">
        {/* Nombre y categoría */}
        <h3 className="font-bold text-gray-900">{product.name}</h3>
        <p className="text-gray-500 text-xs mb-2">{product.subcategory}</p>

        {/* Descripción */}
        <p className="text-gray-600 text-sm mb-3">{product.description}</p>

        {/* Precios */}
        {mode === 'client' ? (
          // VISTA CLIENTE: Solo muestra precio de venta
          <div className="mb-4">
            <p className="text-3xl font-bold text-red-600">
              ${product.priceClient.toFixed(2)}
            </p>
          </div>
        ) : (
          // VISTA REVENDEDOR: Muestra ambos precios y ganancia
          <div className="bg-gray-50 rounded-lg p-3 mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Tu costo:</span>
              <span className="text-gray-900 font-semibold">
                ${product.priceBase.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Precio venta:</span>
              <span className="text-yellow-600 font-bold">
                ${product.priceClient.toFixed(2)}
              </span>
            </div>
            <div className="border-t border-gray-200 pt-2 flex justify-between text-sm">
              <span className="text-gray-600">Tu ganancia:</span>
              <span className="text-green-600 font-bold">
                ${profit.toFixed(2)} ({profitPercent}%)
              </span>
            </div>
          </div>
        )}

        {/* Selector de cantidad */}
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="p-1 hover:bg-gray-100 rounded-lg"
          >
            <Minus size={16} />
          </button>
          
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-12 text-center border border-gray-300 rounded-lg"
          />
          
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="p-1 hover:bg-gray-100 rounded-lg"
          >
            <Plus size={16} />
          </button>
        </div>

        {/* Botón agregar al carrito */}
        <button
          onClick={handleAddToCart}
          className={`w-full py-2 rounded-lg font-semibold text-white transition-colors ${
            mode === 'client'
              ? 'bg-red-600 hover:bg-red-700'
              : 'bg-yellow-600 hover:bg-yellow-700'
          }`}
        >
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
}
```

**Ejemplo de uso:**

```typescript
// En ClientMode.tsx o Reseller.tsx
import ProductCard from '../components/ProductCard';

// Dentro del componente:
<div className="grid grid-cols-4 gap-6">
  {filteredProducts.map(product => (
    <ProductCard
      key={product.id}
      product={product}
      mode="client"  // o "reseller"
      onAddToCart={(quantity) => {
        cart.addItem(
          product.id,
          product.name,
          quantity,
          product.priceClient,
          product.priceBase
        );
      }}
    />
  ))}
</div>
```

---

## 6️⃣ PÁGINA: ClientMode

### Archivo: `src/pages/ClientMode.tsx` (RESUMEN)

```typescript
import { useState } from 'react';
import { products, combos } from '../data/products';
import { useCart } from '../hooks/useCart';
import { useWhatsApp } from '../hooks/useWhatsApp';

interface ClientModeProps {
  onBack: () => void;  // Volver a ModeSelector
}

export default function ClientMode({ onBack }: ClientModeProps) {
  // ============================================
  // ESTADO
  // ============================================
  
  // ¿Qué vista mostrar? 'home' o 'catalog'
  const [viewMode, setViewMode] = useState<'home' | 'catalog'>('home');
  
  // ¿El menú está abierto en mobile?
  const [showMenu, setShowMenu] = useState(false);
  
  // ¿El modal del carrito está abierto?
  const [showCart, setShowCart] = useState(false);
  
  // Qué categoría está seleccionada
  const [selectedCategory, setSelectedCategory] = useState('ROPA');

  // ============================================
  // HOOKS
  // ============================================
  
  const cart = useCart('client');
  const { generateOrderMessage, sendToWhatsApp } = useWhatsApp();

  // ============================================
  // FUNCIONES
  // ============================================

  // Enviar pedido por WhatsApp
  const handleSendOrder = () => {
    if (cart.items.length === 0) {
      alert('Agrega productos al carrito');
      return;
    }
    
    // Generar mensaje
    const message = generateOrderMessage(
      cart.items,
      'client',
      cart.getTotal()
    );
    
    // Enviar a WhatsApp
    sendToWhatsApp(message);
    
    // Limpiar carrito
    cart.clearCart();
    setShowCart(false);
  };

  // ============================================
  // DATOS DERIVADOS
  // ============================================
  
  // Array de categorías únicas
  const categories = Array.from(new Set(products.map(p => p.category)));
  // Resultado: ['ROPA', 'TAZAS Y BOTELLAS', 'ARTÍCULOS PEQUEÑOS', ...]
  
  // Productos filtrados por categoría seleccionada
  const filteredProducts = selectedCategory
    ? products.filter(p => p.category === selectedCategory)
    : products;

  // ============================================
  // RENDER
  // ============================================

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={() => setShowMenu(!showMenu)}>
            {showMenu ? <X /> : <Menu />}
          </button>
          
          <img src="/img/mi_logo.png" alt="Logo" className="h-16" />
          
          <button onClick={() => setShowCart(true)} className="relative">
            <ShoppingCart size={28} />
            {cart.getTotalItems() > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-6 h-6 rounded-full">
                {cart.getTotalItems()}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* HOME VIEW */}
      {viewMode === 'home' && (
        <div className="px-4 py-8">
          <h1 className="text-3xl font-bold mb-4">Estilo que te impulsa</h1>
          
          {/* 3 Cards principales */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {/* Card 1: Catálogo */}
            <button
              onClick={() => setViewMode('catalog')}
              className="bg-red-600 text-white rounded-2xl p-6"
            >
              <div className="text-4xl mb-3">👕</div>
              <h3 className="font-bold mb-2">CATÁLOGO</h3>
              <p className="text-sm">Ver productos</p>
            </button>

            {/* Card 2: Carrito */}
            <button
              onClick={() => setShowCart(true)}
              className="bg-orange-500 text-white rounded-2xl p-6"
            >
              <div className="text-4xl mb-3">🛒</div>
              <h3 className="font-bold mb-2">CARRITO</h3>
              <p className="text-sm">Ver mi pedido</p>
            </button>

            {/* Card 3: WhatsApp */}
            <button
              onClick={() => sendToWhatsApp('Hola, quiero hacer un pedido')}
              className="bg-green-500 text-white rounded-2xl p-6"
            >
              <div className="text-4xl mb-3">✈️</div>
              <h3 className="font-bold mb-2">ENVIAR</h3>
              <p className="text-sm">Por WhatsApp</p>
            </button>
          </div>
        </div>
      )}

      {/* CATALOG VIEW */}
      {viewMode === 'catalog' && (
        <div className="px-4 py-8">
          {/* Botón Volver */}
          <button
            onClick={() => setViewMode('home')}
            className="text-red-600 font-bold mb-6"
          >
            ← Volver
          </button>

          {/* Filtros de categoría */}
          <div className="bg-white rounded-xl p-4 mb-8">
            <p className="font-bold mb-3">Categorías:</p>
            <div className="flex gap-2 flex-wrap">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg font-bold transition-all ${
                    selectedCategory === cat
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid de productos */}
          <div className="grid grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                mode="client"
                onAddToCart={(quantity) => {
                  cart.addItem(
                    product.id,
                    product.name,
                    quantity,
                    product.priceClient,
                    product.priceBase
                  );
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* CART MODAL */}
      {showCart && (
        <CartModal
          items={cart.items}
          mode="client"
          total={cart.getTotal()}
          onClose={() => setShowCart(false)}
          onUpdateQuantity={cart.updateQuantity}
          onRemoveItem={cart.removeItem}
          onSendOrder={handleSendOrder}
        />
      )}
    </div>
  );
}
```

---

## 7️⃣ PÁGINA: Reseller (VISTA HOME)

```typescript
// Reseller.tsx - Vista HOME (resumen)

export default function Reseller({ onBack }: ResellerProps) {
  const [viewMode, setViewMode] = useState<'home' | 'catalog' | 'calculator' | 'info'>('home');
  const cart = useCart('reseller');
  const { generateOrderMessage, sendToWhatsApp } = useWhatsApp();

  // RENDER HOME
  if (viewMode === 'home') {
    return (
      <div className="bg-gray-900 px-4 py-8">
        <h1 className="text-3xl font-white mb-4">Bienvenido, Revendedor</h1>
        
        {/* 4 Cards en 2x2 */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {/* Card 1: Catálogo PRO */}
          <button
            onClick={() => setViewMode('catalog')}
            className="bg-gray-800 border-2 border-yellow-600 text-white rounded-2xl p-6"
          >
            <div className="text-3xl mb-3">👔</div>
            <h3 className="font-bold mb-2">CATÁLOGO PRO</h3>
            <p className="text-yellow-200 text-sm mb-4">
              Accede a precios especiales y productos exclusivos.
            </p>
            <button className="bg-yellow-600 text-gray-900 px-4 py-2 rounded-lg font-bold">
              Ver catálogo →
            </button>
          </button>

          {/* Card 2: Calculadora */}
          <button
            onClick={() => setViewMode('calculator')}
            className="bg-gray-800 border-2 border-yellow-600 text-white rounded-2xl p-6"
          >
            <div className="text-3xl mb-3">🧮</div>
            <h3 className="font-bold mb-2">CALCULADORA</h3>
            <p className="text-yellow-200 text-sm mb-4">
              Calcula tu inversión y tus ganancias.
            </p>
            <button className="bg-yellow-600 text-gray-900 px-4 py-2 rounded-lg font-bold">
              Calcular ahora →
            </button>
          </button>

          {/* Card 3: Pedidos */}
          <button
            onClick={() => setViewMode('catalog')}
            className="bg-gray-800 border-2 border-yellow-600 text-white rounded-2xl p-6"
          >
            <div className="text-3xl mb-3">📦</div>
            <h3 className="font-bold mb-2">PEDIDOS</h3>
            <p className="text-yellow-200 text-sm mb-4">
              Realiza tus pedidos directamente.
            </p>
            <button className="bg-yellow-600 text-gray-900 px-4 py-2 rounded-lg font-bold">
              Hacer pedido →
            </button>
          </button>

          {/* Card 4: Info */}
          <button
            onClick={() => setViewMode('info')}
            className="bg-gray-800 border-2 border-yellow-600 text-white rounded-2xl p-6"
          >
            <div className="text-3xl mb-3">ℹ️</div>
            <h3 className="font-bold mb-2">INFORMACIÓN</h3>
            <p className="text-yellow-200 text-sm mb-4">
              Consejos y estrategias de negocio.
            </p>
            <button className="bg-yellow-600 text-gray-900 px-4 py-2 rounded-lg font-bold">
              Ver información →
            </button>
          </button>
        </div>

        {/* Card Bonus */}
        <div className="bg-gray-800 border-2 border-yellow-600 text-white rounded-2xl p-6 mb-6">
          <h3 className="font-bold mb-2">Más vendes, más ganas ⭐</h3>
          <p className="text-yellow-200 text-sm">
            Descuentos por volumen y beneficios exclusivos.
          </p>
        </div>

        {/* Card Contacto */}
        <div className="bg-gray-800 border-2 border-yellow-600 text-white rounded-2xl p-6 text-center">
          <h3 className="font-bold mb-2">¿Dudas o consultas?</h3>
          <p className="text-yellow-200 mb-4">Escribenos por WhatsApp</p>
          <button
            onClick={() => sendToWhatsApp('Hola, tengo dudas')}
            className="bg-yellow-600 text-gray-900 px-6 py-2 rounded-full font-bold"
          >
            Contactar 📞
          </button>
        </div>
      </div>
    );
  }

  // ... otras vistas (catalog, calculator, info) ...
}
```

---

## 8️⃣ App.tsx - Navegación Principal

```typescript
import { useState } from 'react';
import ModeSelector from './pages/ModeSelector';
import ClientMode from './pages/ClientMode';
import Reseller from './pages/Reseller';
import ResellerRegistration from './pages/ResellerRegistration';

export default function App() {
  // Estado de qué página mostrar
  const [currentPage, setCurrentPage] = useState<
    'modeSelector' | 'client' | 'reseller' | 'register'
  >('modeSelector');

  return (
    <div>
      {/* Página: Seleccionar Cliente o Revendedor */}
      {currentPage === 'modeSelector' && (
        <ModeSelector
          onSelect={(mode) => {
            if (mode === 'client') {
              setCurrentPage('client');
            } else if (mode === 'register') {
              setCurrentPage('register');
            } else if (mode === 'reseller') {
              setCurrentPage('reseller');
            }
          }}
        />
      )}

      {/* Página: Cliente */}
      {currentPage === 'client' && (
        <ClientMode
          onBack={() => setCurrentPage('modeSelector')}
        />
      )}

      {/* Página: Formulario de Registro */}
      {currentPage === 'register' && (
        <ResellerRegistration
          onBack={() => setCurrentPage('modeSelector')}
          onRegisterSuccess={() => setCurrentPage('reseller')}
        />
      )}

      {/* Página: Revendedor */}
      {currentPage === 'reseller' && (
        <Reseller
          onBack={() => setCurrentPage('modeSelector')}
        />
      )}
    </div>
  );
}
```

**Flujo de navegación:**
```
ModeSelector
    ↓
    ├─ "Cliente" → ClientMode
    ├─ "Registrarse" → ResellerRegistration → Reseller
    └─ "Revendedor (ya registrado)" → Reseller
    
Cualquier página:
    ↓
    onBack() → Vuelve a ModeSelector
```

---

## ✨ Resumen Visual de Estructura

```
┌──────────────────────────────────────────┐
│           App.tsx                        │
│   (Controla qué página mostrar)         │
└──────────────────────────────────────────┘
                ↓
    ┌───────────┴───────────┐
    ↓                       ↓
┌─────────────┐      ┌──────────────┐
│ModeSelector │      │ClientMode /  │
│(inicio)     │      │Reseller      │
└─────────────┘      └──────────────┘
                            ↓
                    ┌───────┴───────┐
                    ↓               ↓
              ┌──────────┐    ┌─────────────┐
              │Hooks     │    │Components   │
              │(useCart) │    │(ProductCard)│
              └──────────┘    └─────────────┘
                    ↓               ↓
              ┌──────────┐    ┌─────────────┐
              │localStorage    │Data        │
              │(Carrito)│      │(products)  │
              └──────────┘    └─────────────┘
```

---

**¡Ahora entiendes todo el flujo del código!** 🎉

Cada pieza trabaja junta para crear una aplicación funcional y escalable.
