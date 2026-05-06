# Resumen Visual - NEXUS

## 🎯 Vista General Rápida

### Qué es NEXUS?
Una plataforma de e-commerce donde:
- **Clientes** compran ropa y artículos personalizados
- **Revendedores** compran barato para vender caro

---

## 📱 Flujo de Usuario

### CLIENTE
```
┌─────────────────────────────────────────┐
│  1. Entra a la app                      │
│  ┌─────────────────────────────────────┐│
│  │ ¿Eres cliente o revendedor?         ││
│  │  [CLIENTE]  [REVENDEDOR]            ││
│  └─────────────────────────────────────┘│
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│  2. Pantalla de inicio                  │
│  ┌─────────────────────────────────────┐│
│  │ Estilo que te impulsa               ││
│  │                                      ││
│  │ ┌────────┐ ┌────────┐ ┌──────────┐ ││
│  │ │CATÁLOGO│ │CARRITO │ │ENVIAR POR││
│  │ │  👕    │ │  🛒    │ │WHATSAPP  ││
│  │ └────────┘ └────────┘ │  ✈️      ││
│  │                        └──────────┘ ││
│  │ ┌─────────────────────────────────┐ ││
│  │ │ ¿Diseño personalizado?         │ ││
│  │ │ Escribenos y lo hacemos realidad││
│  │ │        [Quiero uno]             │ ││
│  │ └─────────────────────────────────┘ ││
│  └─────────────────────────────────────┘│
└─────────────────────────────────────────┘
       │              │          │
       └──────┬───────┴────┬─────┘
              ↓            ↓
        VER PRODUCTOS   CARRITO
              │            │
              ↓            ↓
        ┌───────────┐  ┌──────────────┐
        │ Filtrar   │  │ Resumen de   │
        │ Categoría │  │ compra       │
        │ [ROPA]    │  │ - Camiseta 2 │
        │ [TAZAS]   │  │ - Taza 1     │
        │ [...]     │  │ Total: $XX   │
        │           │  │ [ENVIAR]     │
        │ Grid de   │  └──────────────┘
        │ 4x4       │
        │ productos │
        │ [+] agr.  │
        └───────────┘
              │
              ↓
       ┌─────────────────┐
       │ WhatsApp        │
       │ Mensaje con     │
       │ pedido          │
       │                 │
       │ - Camiseta Niño │
       │   Cantidad: 2   │
       │   Total: $18    │
       │ +507 6498-7682  │
       └─────────────────┘
```

### REVENDEDOR
```
┌─────────────────────────────────────────┐
│  1. Entra a la app → Elige REVENDEDOR   │
│  2. Se registra (o entra directamente)  │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│  3. Pantalla de inicio REVENDEDOR       │
│  ┌─────────────────────────────────────┐│
│  │ Bienvenido, Revendedor              ││
│  │ Haz crecer tu negocio               ││
│  │                                      ││
│  │ ┌────────────┐ ┌──────────────────┐ ││
│  │ │CATÁLOGO PRO│ │CALCULADORA DE    │ ││
│  │ │    👔      │ │GANANCIAS         │ ││
│  │ │            │ │    🧮            │ ││
│  │ │Ver catálogo│ │Calcular ahora    │ ││
│  │ └────────────┘ └──────────────────┘ ││
│  │                                      ││
│  │ ┌────────────┐ ┌──────────────────┐ ││
│  │ │PEDIDOS     │ │INFORMACIÓN DE    │ ││
│  │ │PROVEEDOR   │ │NEGOCIO           │ ││
│  │ │   📦       │ │    ℹ️             │ ││
│  │ │Hacer pedido│ │Ver información   │ ││
│  │ └────────────┘ └──────────────────┘ ││
│  │                                      ││
│  │ ┌────────────────────────────────┐  ││
│  │ │Más vendes, más ganas ⭐        │  ││
│  │ │Descuentos por volumen          │  ││
│  │ └────────────────────────────────┘  ││
│  │                                      ││
│  │ ┌────────────────────────────────┐  ││
│  │ │ ¿Dudas o consultas?            │  ││
│  │ │ Escribenos por WhatsApp        │  ││
│  │ │        [Contactar]             │  ││
│  │ └────────────────────────────────┘  ││
│  └─────────────────────────────────────┘│
└─────────────────────────────────────────┘
    ↓            ↓             ↓         ↓
    └─────┬──────┴─────┬───────┴────┬────┘
          │            │             │
    CATÁLOGO        CALCULAR       INFO
      PRO            GANANCIAS
          │            │             │
          ↓            ↓             ↓

    VER              VER GANANCIAS   OPCIONES DE
    PRODUCTOS        POR PRODUCTO    REVENDEDOR
          │            │             │
    - ROPA            - Camiseta      - Opción 1:
    - TAZAS           Cantidad: 2       Vender con
    - ARTÍCULOS       Tu costo: $6.60   NEXUS
    - ESPECIALES      Ganancia: $7      Comisión: $3-5
    - DEPORTIVO       
                      - Taza
    Filtrar por       Cantidad: 1      - Opción 2:
    categoría         Tu costo: $3.30    Crear tu marca
                      Ganancia: $5.70    Ganancia: $7
    2 Precios:                           por producto
    - Tu costo        ┌──────────────┐
    - Precio venta    │  RESUMEN     │
    - Tu ganancia     │              │
                      │Ganancia      │
    Grid 4x4          │Total: $12.70 │
    productos         │              │
    Agregar al        │Inversión:    │
    carrito           │Total: $9.90  │
                      │              │
                      │Ratio: 1.28   │
                      │(ganas 1.28x) │
                      └──────────────┘
```

---

## 🏗️ Estructura de Carpetas

```
src/
│
├── main.tsx                    ← Punto de entrada (DOM)
├── App.tsx                     ← Enrutador principal
├── index.css                   ← Estilos globales (Tailwind)
│
├── types/
│   └── index.ts               ← Tipos TypeScript
│
├── data/
│   └── products.ts            ← BASE DE DATOS DE PRODUCTOS
│                                 (Productos, Combos, Eventos, Plantillas)
│
├── hooks/                      ← Lógica reutilizable
│   ├── useCart.ts             ← Manejo del carrito
│   ├── useWhatsApp.ts         ← Integración WhatsApp
│   └── useCustomDesigns.ts    ← Gestión de diseños
│
├── components/                 ← Componentes visuales pequeños
│   ├── ProductCard.tsx        ← Tarjeta de un producto
│   └── CartModal.tsx          ← Ventana flotante del carrito
│
└── pages/                      ← Páginas completas
    ├── ModeSelector.tsx       ← Inicio: Cliente o Revendedor
    ├── ClientMode.tsx         ← Página para clientes
    ├── Reseller.tsx           ← Panel de revendedor
    └── ResellerRegistration.tsx ← Registro de revendedor
```

---

## 🔄 Ciclo de Vida de un Pedido (CLIENTE)

```
1. INICIO
   └─ Cliente abre la app

2. SELECCIÓN
   └─ ModeSelector: Elige "CLIENTE"
      └─ Navega a ClientMode

3. NAVEGACIÓN
   └─ Está en HOME
      └─ Ve 3 cards grandes:
         - CATÁLOGO (rojo)
         - CARRITO (naranja)
         - ENVIAR (verde)

4. EXPLORACIÓN
   └─ Click en CATÁLOGO
      └─ Va a vista CATALOG
         └─ Ve filtros de categoría
         └─ Grid 4x4 de productos

5. SELECCIÓN DE PRODUCTOS
   └─ Selecciona categoría ROPA
      └─ Ve Camiseta Niño
      └─ Click "+ Agregar"
      └─ Elige cantidad: 2
      └─ Click "Agregar al Carrito"
      └─ Producto entra al carrito
      └─ Badge del carrito muestra +1 cantidad

6. MÁS COMPRAS
   └─ Selecciona otra categoría TAZAS
      └─ Ve Taza 11oz
      └─ Click "+ Agregar"
      └─ Cantidad: 1
      └─ Click "Agregar al Carrito"

7. VER CARRITO
   └─ Click en icono de carrito (arriba)
      └─ Se abre CartModal
         └─ Muestra:
            * Camiseta Niño x2 = $18
            * Taza 11oz x1 = $9
            * TOTAL: $27
         └─ Botones: -/+ cantidad, eliminar, enviar

8. ENVIAR PEDIDO
   └─ Click "Enviar Pedido por WhatsApp"
      └─ Se genera mensaje:
         
         📝 PEDIDO CLIENTE
         
         • Camiseta Niño
           Cantidad: 2 x $9.00
           Subtotal: $18.00
         
         • Taza 11oz
           Cantidad: 1 x $9.00
           Subtotal: $9.00
         
         TOTAL A PAGAR: $27.00
         
         📞 WhatsApp: +507 6498-7682
      
      └─ Se abre WhatsApp automáticamente
      └─ Cliente copia/pega el mensaje
      └─ Envía a +507 6498-7682
      └─ Revendedor recibe el pedido
      └─ Carrito se vacía
      └─ CartModal se cierra

9. FIN
   └─ Revendedor responde por WhatsApp
      - Confirma pedido
      - Cobra
      - Envía producto
```

---

## 💰 Ciclo de Vida de Ganancias (REVENDEDOR)

```
1. VE CATÁLOGO
   └─ Reseller HOME → Click "CATÁLOGO PRO"
      └─ Filtra por categoría
      └─ Ve ProductCard con:
         - Imagen
         - Nombre: "Camiseta Niño"
         - Tu costo: $3.30
         - Precio venta: $9.00
         - Tu ganancia: $5.70 (172%)

2. AGREGA AL CARRITO
   └─ Cantidad: 10
      └─ Click "Agregar al Carrito"
      └─ Se agrega:
         - Producto ID: 'r1'
         - Cantidad: 10
         - Precio unitario cliente: $9
         - Precio unitario base: $3.30

3. VA A CALCULADORA
   └─ Reseller HOME → Click "CALCULADORA"
      └─ Ve calculator view
      └─ Muestra cada item:
         
         Camiseta Niño
         Cantidad: 10
         Costo unitario: $3.30
         Ganancia unitaria: $5.70 (172%)
         
         ┌─────────────────────────┐
         │ Costo total:    $33.00  │
         │ Ganancia total: $57.00  │
         │ Ratio:          1.72x   │
         └─────────────────────────┘

4. DECIDE SI COMPRAR
   └─ Si le conviene: Agrega más productos
      └─ Si no le conviene: Vacía carrito

5. HACE PEDIDO A PROVEEDOR
   └─ Click en carrito
      └─ Ve CartModal
      └─ Ve ganancia total
      └─ Click "Enviar Pedido"
      └─ Se genera mensaje especial:
         
         📝 PEDIDO REVENDEDOR
         
         • Camiseta Niño
           Cantidad: 10 x $3.30
           Subtotal: $33.00
         
         INVERSIÓN TOTAL: $33.00
         💰 Mi ganancia: $57.00
         💸 Mi inversión: $33.00
         
         📞 WhatsApp: +507 6498-7682
      
      └─ Se abre WhatsApp
      └─ Revendedor envía a +507 6498-7682
      └─ Proveedor (nosotros) confirmamos
      └─ Enviamos 10 camisetas

6. REVENDEDOR RECIBE
   └─ Recibe 10 camisetas
   └─ Precio base fue $3.30 c/u
   └─ Puede vender a:
      - $9 = gana $5.70 (igual que nosotros sugieren)
      - $12 = gana $8.70 (más margen)
      - $15 = gana $11.70 (máximo margen)

7. VENDE
   └─ Revendedor vende a sus clientes
      - Ejemplo: 5 camisetas a $12 c/u = $60
      - Ganancia: 5 x (12 - 3.30) = 5 x 8.70 = $43.50
      - Recupera $43.50 de inversión de $33

8. FIN
   └─ Revendedor ganó dinero
   └─ Puede hacer más pedidos
   └─ Nosotros ganamos también (vendimos barato al revendedor)
```

---

## 📊 Datos en Acción

### Ejemplo: Producto "Camiseta Niño"

```
ID: 'r1'
Nombre: 'Camiseta Niño'
Descripción: 'Camiseta de alta calidad para niños - 45x35 cm'
Imagen: https://images.unsplash.com/photo-...
Stock: 100
Categoría: 'ROPA'
Subcategoría: 'Camisetas'

PRECIOS:
  priceClient: 9      ← Lo que paga un cliente final
  priceBase: 3.30     ← Lo que paga un revendedor

GANANCIA REVENDEDOR: 9 - 3.30 = $5.70
MARGEN: (5.70 / 3.30) × 100 = 172%

FLUJO DE DINERO:
  Revendedor paga: $3.30
         ↓
  Nosotros ganhamos: $3.30
         ↓
  Revendedor vende a cliente a: $9.00
         ↓
  Revendedor ganancia: $5.70
         ↓
  Cliente paga: $9.00
```

### Ejemplo: Combo "Duo Camisetas"

```
ID: 'cr1'
Nombre: 'Duo Camisetas'
Descripción: '2 camisetas con diseño personalizado'
Incluye: '2 camisetas'
Icono: 👕

PRECIOS:
  priceClient: 20     ← 2 camisetas a precio combo
  priceBase: 6.60     ← Costo base al revendedor

GANANCIA REVENDEDOR: 20 - 6.60 = $13.40
MARGEN: (13.40 / 6.60) × 100 = 203%

FLUJO:
  Normalmente 2 camisetas costarían: 2 × $3.30 = $6.60
  Revendedor paga: $6.60 (mismo precio)
  Revendedor vende a: $20
  Revendedor gana: $13.40 (202% de ganancia!)
  
  ¿POR QUÉ es mejor el combo?
  - El cliente pensa que ahorra (2 × $9 = $18, paga $20)
  - El revendedor GANA MÁS ($13.40 vs $5.70 × 2 = $11.40)
  - Win-win para todos
```

---

## 🎨 Sistema de Diseños Personalizados

```
PLANTILLAS PREDEFINIDAS
(En src/data/products.ts - designTemplates)

• Urbano Básico
• Deportivo Pro
• Fiesta Neon
• Corporativo Elegante
• Graduación Classic
↓
Revendedor puede:
- Ver en galería
- Hacer click para descargar
- Usar como referencia para vender

DISEÑOS PERSONALIZADOS DEL REVENDEDOR
(Guardados en localStorage - "custom-designs")

Revendedor sube:
1. Nombre: "Mi primer diseño"
2. Descripción: "Diseño de verano"
3. Imagen: (desde PC o galería)
4. Productos aplicables: 
   [✓] Camiseta Niño
   [✓] Camiseta Mujer
   [ ] Taza
   etc.

Se guarda como:
{
  id: "1234567890",
  name: "Mi primer diseño",
  description: "Diseño de verano",
  imageData: "data:image/png;base64,iVBORw0KGgo...",
  products: ["r1", "r3"],
  createdAt: "2024-05-05T..."
}

Revendedor puede:
- Ver en galería "Mis Diseños"
- Descargar la imagen
- Usar en redes sociales
- Mostrar a clientes
```

---

## 🚀 Tecnologías Usadas

```
FRONTEND
├─ React 18          ← Framework principal
├─ TypeScript        ← Tipado seguro
├─ Tailwind CSS      ← Estilos (clases)
├─ Lucide Icons      ← Iconos SVG
└─ Vite              ← Empaquetador rápido

ALMACENAMIENTO LOCAL
└─ localStorage      ← Datos en navegador
                      (carrito, diseños)

SERVICIOS EXTERNOS
├─ Unsplash          ← Imágenes gratis
├─ WhatsApp API      ← Mensajería
└─ (Pronto: Supabase) ← Base de datos

DESARROLLO
├─ npm               ← Gestor de paquetes
├─ ESLint            ← Linter
└─ TypeScript Check  ← Verificación de tipos
```

---

## 📈 Escalabilidad Futura

```
ACTUAL (MVP)
├─ Datos hardcodeados en products.ts
├─ Carrito en localStorage (local)
├─ Autenticación: NADA
└─ Base de datos: NINGUNA

FUTURO ESCALADO
├─ Base de datos: Supabase
│  └─ tabla: products
│  └─ tabla: users (clientes + revendedores)
│  └─ tabla: orders (pedidos)
│  └─ tabla: custom_designs
│
├─ Autenticación: Supabase Auth
│  └─ Clientes login con email
│  └─ Revendedores login con credenciales
│
├─ API (Edge Functions Supabase)
│  └─ GET /products (lista productos)
│  └─ POST /orders (guardar pedido)
│  └─ POST /designs (guardar diseño)
│
├─ Pagos: Stripe
│  └─ Clientes pagan online
│  └─ Revendedores pagan online
│
├─ Notificaciones
│  └─ Email de confirmación
│  └─ Notificaciones de estado
│
└─ Admin Panel
   └─ Ver pedidos
   └─ Gestionar productos
   └─ Analíticas de ventas
```

---

## ✅ Checklist de Funcionamiento

- [x] Selector de modo (Cliente / Revendedor)
- [x] Página de cliente con catálogo
- [x] Página de revendedor con múltiples herramientas
- [x] Carrito persistente (localStorage)
- [x] Integración WhatsApp
- [x] Calculadora de ganancias
- [x] Gestor de diseños
- [x] Filtros por categoría
- [x] 22 productos en catálogo
- [x] 12 combos
- [x] 5 eventos especiales
- [x] 5 plantillas de diseño
- [x] Diseños personalizados de usuarios
- [x] Descargar diseños
- [x] UI responsive
- [x] Interfaz limpia y profesional

---

## 🎯 Próximos Pasos

1. **Supabase**: Conectar base de datos real
2. **Autenticación**: Sistema de login
3. **Pagos**: Stripe integration
4. **Admin**: Panel de administración
5. **Analytics**: Estadísticas de ventas
6. **Notificaciones**: Email/SMS

---

**¡NEXUS está listo para despegar! ✈️**
