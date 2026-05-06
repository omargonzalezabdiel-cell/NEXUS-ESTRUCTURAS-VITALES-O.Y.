import { useState, useRef, useCallback } from 'react';
import { Menu, X, ShoppingCart, Download, Upload, Trash2, Image, MessageCircle, ArrowRight } from 'lucide-react';
import { products, combos, eventPackages, designTemplates } from '../data/products';
import { useCart } from '../hooks/useCart';
import { useWhatsApp } from '../hooks/useWhatsApp';
import ProductCard from '../components/ProductCard';
import CartModal from '../components/CartModal';

interface ResellerProps {
  onBack: () => void;
}

interface CustomDesign {
  id: string;
  name: string;
  description: string;
  imageData: string;
  products: string[];
  createdAt: string;
}

export default function Reseller({ onBack }: ResellerProps) {
  const [showCart, setShowCart] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [viewMode, setViewMode] = useState<'home' | 'catalog' | 'combos' | 'events' | 'designs' | 'calculator' | 'info'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('ROPA');
  const [showDesignForm, setShowDesignForm] = useState(false);
  const [customDesigns, setCustomDesigns] = useState<CustomDesign[]>(() => {
    const saved = localStorage.getItem('custom-designs');
    return saved ? JSON.parse(saved) : [];
  });
  const [newDesign, setNewDesign] = useState({ name: '', description: '', products: [] as string[] });
  const [designImage, setDesignImage] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const cart = useCart('reseller');
  const { generateOrderMessage, sendToWhatsApp } = useWhatsApp();

  const categories = Array.from(new Set(products.map(p => p.category)));
  const filteredProducts = selectedCategory
    ? products.filter(p => p.category === selectedCategory)
    : products;

  const handleSendOrder = () => {
    if (cart.items.length === 0) {
      alert('Agrega productos al carrito');
      return;
    }
    const message = generateOrderMessage(
      cart.items,
      'reseller',
      cart.getTotal(),
      cart.getProfit()
    );
    sendToWhatsApp(message);
    cart.clearCart();
    setShowCart(false);
  };

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setDesignImage(result);
    };
    reader.readAsDataURL(file);
  }, []);

  const saveCustomDesign = () => {
    if (!newDesign.name || !designImage) {
      alert('Agrega un nombre y una imagen para el diseño');
      return;
    }
    const design: CustomDesign = {
      id: Date.now().toString(),
      name: newDesign.name,
      description: newDesign.description,
      imageData: designImage,
      products: newDesign.products,
      createdAt: new Date().toISOString()
    };
    const updated = [...customDesigns, design];
    setCustomDesigns(updated);
    localStorage.setItem('custom-designs', JSON.stringify(updated));
    setNewDesign({ name: '', description: '', products: [] });
    setDesignImage('');
    setShowDesignForm(false);
  };

  const deleteCustomDesign = (id: string) => {
    const updated = customDesigns.filter(d => d.id !== id);
    setCustomDesigns(updated);
    localStorage.setItem('custom-designs', JSON.stringify(updated));
  };

  const downloadDesign = (imageData: string, name: string) => {
    const link = document.createElement('a');
    link.href = imageData;
    link.download = `${name.replace(/\s+/g, '_')}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadTemplate = (imageUrl: string, name: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `${name.replace(/\s+/g, '_')}.png`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleProductInDesign = (productId: string) => {
    setNewDesign(prev => ({
      ...prev,
      products: prev.products.includes(productId)
        ? prev.products.filter(id => id !== productId)
        : [...prev.products, productId]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-black shadow-sm sticky top-0 z-40 border-b border-yellow-700">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="lg:hidden text-yellow-500"
          >
            {showMenu ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="flex items-center justify-center flex-1 lg:flex-initial">
            <img src="/img/mi_logo.png" alt="Vuelo Urbano" className="h-16" />
          </div>

          <button
            onClick={() => setShowCart(true)}
            className="relative p-2 text-yellow-500 hover:bg-yellow-500/10 rounded-full transition-colors"
          >
            <ShoppingCart size={28} />
            {cart.getTotalItems() > 0 && (
              <span className="absolute -top-1 -right-1 bg-yellow-500 text-black text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                {cart.getTotalItems()}
              </span>
            )}
          </button>
        </div>

        {showMenu && (
          <div className="lg:hidden border-t border-gray-800 p-4 space-y-3 bg-gray-950">
            <button
              onClick={onBack}
              className="w-full px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
            >
              Volver al inicio
            </button>
          </div>
        )}
      </header>

      {/* Home View */}
      {viewMode === 'home' && (
        <div className="min-h-screen bg-gray-900">
          {/* Hero Section */}
          <div className="bg-gradient-to-b from-gray-800 to-gray-900 px-4 py-8">
            <div className="max-w-3xl mx-auto">
              {/* Title */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Bienvenido, Revendedor</h1>
                <p className="text-yellow-200">Haz crecer tu negocio con Vuelo Urbano.</p>
              </div>

              {/* Benefits Row */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                <div className="bg-gray-800 border border-yellow-700 rounded-lg p-3 text-center">
                  <div className="text-2xl mb-1">👑</div>
                  <p className="text-yellow-500 font-semibold text-xs">Productos de calidad</p>
                </div>
                <div className="bg-gray-800 border border-yellow-700 rounded-lg p-3 text-center">
                  <div className="text-2xl mb-1">📈</div>
                  <p className="text-yellow-500 font-semibold text-xs">Altas ganancias</p>
                </div>
                <div className="bg-gray-800 border border-yellow-700 rounded-lg p-3 text-center">
                  <div className="text-2xl mb-1">🤝</div>
                  <p className="text-yellow-500 font-semibold text-xs">Soporte constante</p>
                </div>
              </div>

              {/* Action Cards - 2x2 Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {/* Catalog PRO Card */}
                <button
                  onClick={() => setViewMode('catalog')}
                  className="bg-gray-800 border-2 border-yellow-600 hover:border-yellow-400 text-white rounded-2xl p-6 transition-all hover:shadow-lg hover:shadow-yellow-500/20 group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-3xl">👔</div>
                    <ArrowRight size={20} className="text-yellow-500 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <h3 className="text-lg font-bold mb-1">CATÁLOGO PRO</h3>
                  <p className="text-yellow-200 text-sm mb-4">Accede a precios especiales y productos exclusivos.</p>
                  <div className="bg-yellow-600 hover:bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg font-semibold text-sm inline-flex items-center gap-2">
                    Ver catálogo <span>→</span>
                  </div>
                </button>

                {/* Calculator Card */}
                <button
                  onClick={() => setViewMode('calculator')}
                  className="bg-gray-800 border-2 border-yellow-600 hover:border-yellow-400 text-white rounded-2xl p-6 transition-all hover:shadow-lg hover:shadow-yellow-500/20 group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-3xl">🧮</div>
                    <ArrowRight size={20} className="text-yellow-500 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <h3 className="text-lg font-bold mb-1">CALCULADORA DE GANANCIAS</h3>
                  <p className="text-yellow-200 text-sm mb-4">Calcula tu inversión y tus ganancias.</p>
                  <div className="bg-yellow-600 hover:bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg font-semibold text-sm inline-flex items-center gap-2">
                    Calcular ahora <span>→</span>
                  </div>
                </button>

                {/* Orders Card */}
                <button
                  onClick={() => setViewMode('catalog')}
                  className="bg-gray-800 border-2 border-yellow-600 hover:border-yellow-400 text-white rounded-2xl p-6 transition-all hover:shadow-lg hover:shadow-yellow-500/20 group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-3xl">📦</div>
                    <ArrowRight size={20} className="text-yellow-500 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <h3 className="text-lg font-bold mb-1">PEDIDOS A PROVEEDOR</h3>
                  <p className="text-yellow-200 text-sm mb-4">Realiza tus pedidos directamente.</p>
                  <div className="bg-yellow-600 hover:bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg font-semibold text-sm inline-flex items-center gap-2">
                    Hacer pedido <span>→</span>
                  </div>
                </button>

                {/* Info Card */}
                <button
                  onClick={() => setViewMode('info')}
                  className="bg-gray-800 border-2 border-yellow-600 hover:border-yellow-400 text-white rounded-2xl p-6 transition-all hover:shadow-lg hover:shadow-yellow-500/20 group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-3xl">ℹ️</div>
                    <ArrowRight size={20} className="text-yellow-500 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <h3 className="text-lg font-bold mb-1">INFORMACIÓN DE NEGOCIO</h3>
                  <p className="text-yellow-200 text-sm mb-4">Consejos, estrategias y todo lo que necesitas saber.</p>
                  <div className="bg-yellow-600 hover:bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg font-semibold text-sm inline-flex items-center gap-2">
                    Ver información <span>→</span>
                  </div>
                </button>
              </div>

              {/* More Benefits Card */}
              <button
                onClick={() => setViewMode('info')}
                className="w-full bg-gray-800 border-2 border-yellow-600 hover:border-yellow-400 text-white rounded-2xl p-6 transition-all hover:shadow-lg hover:shadow-yellow-500/20 mb-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold mb-1">Más vendes, más ganas</h3>
                    <p className="text-yellow-200 text-sm">Descuentos por volumen y beneficios exclusivos.</p>
                  </div>
                  <div className="text-3xl">⭐</div>
                </div>
              </button>

              {/* Contact Card */}
              <div className="bg-gray-800 border-2 border-yellow-600 rounded-2xl p-6 text-center">
                <h3 className="text-white font-bold mb-2">¿Dudas o consultas?</h3>
                <p className="text-yellow-200 text-sm mb-4">Escribenos por WhatsApp</p>
                <button
                  onClick={() => sendToWhatsApp('Hola, tengo dudas sobre el programa de revendedores')}
                  className="bg-yellow-600 hover:bg-yellow-500 text-gray-900 px-6 py-2 rounded-full font-semibold text-sm inline-flex items-center gap-2"
                >
                  <MessageCircle size={16} />
                  Contactar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Catalog View */}
      {viewMode === 'catalog' && (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <button
            onClick={() => setViewMode('home')}
            className="mb-6 text-yellow-500 hover:text-yellow-400 font-semibold flex items-center gap-1"
          >
            ← Volver
          </button>

          <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 mb-8">
            <p className="text-gray-300 font-semibold mb-3">Categorías:</p>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all text-sm ${
                    selectedCategory === cat
                      ? 'bg-yellow-600 text-gray-900'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                mode="reseller"
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

          <div className="text-center">
            <button
              onClick={() => setViewMode('home')}
              className="bg-yellow-600 hover:bg-yellow-500 text-gray-900 px-8 py-3 rounded-full font-semibold transition-colors"
            >
              Volver al Inicio
            </button>
          </div>
        </div>
      )}

      {/* Calculator View */}
      {viewMode === 'calculator' && (
        <div className="max-w-3xl mx-auto px-4 py-8">
          <button
            onClick={() => setViewMode('home')}
            className="mb-6 text-yellow-500 hover:text-yellow-400 font-semibold flex items-center gap-1"
          >
            ← Volver
          </button>

          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-yellow-500 mb-6">Simulador de Ganancias</h3>

            {cart.items.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400 mb-4">Agrega productos al carrito para ver tus ganancias</p>
                <button
                  onClick={() => setViewMode('catalog')}
                  className="bg-yellow-600 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
                >
                  Ir al Catálogo
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {cart.items.map((item) => {
                  const margin = item.priceClient - item.priceBase;
                  const marginPercent = ((margin / item.priceBase) * 100).toFixed(1);
                  return (
                    <div key={item.productId} className="border border-gray-700 rounded-lg p-4 bg-gray-900">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="text-white font-semibold">{item.name}</h4>
                          <p className="text-gray-400 text-sm">Cantidad: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-yellow-500 font-bold">${margin.toFixed(2)} por unidad</p>
                          <p className="text-gray-400 text-sm">{marginPercent}% ganancia</p>
                        </div>
                      </div>
                      <div className="bg-gray-800 rounded p-3 text-sm">
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-400">Costo total:</span>
                          <span className="text-white">${(item.priceBase * item.quantity).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between border-t border-gray-700 pt-2">
                          <span className="text-yellow-500 font-semibold">Ganancia total:</span>
                          <span className="text-yellow-500 font-bold">${(margin * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}

                <div className="bg-yellow-500/10 border-2 border-yellow-600 rounded-lg p-6 mt-8">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-400 text-sm">Ganancia Total Proyectada</p>
                      <p className="text-yellow-500 text-3xl font-bold">
                        ${cart.getProfit().toFixed(2)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-400 text-sm">Inversión Total</p>
                      <p className="text-white text-2xl font-bold">
                        ${cart.getTotal().toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Info View */}
      {viewMode === 'info' && (
        <div className="max-w-3xl mx-auto px-4 py-8">
          <button
            onClick={() => setViewMode('home')}
            className="mb-6 text-yellow-500 hover:text-yellow-400 font-semibold flex items-center gap-1"
          >
            ← Volver
          </button>

          <div className="space-y-6">
            {/* Reseller Options */}
            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-yellow-500 mb-6">Opciones de Revendedor</h3>
              <div className="space-y-6">
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
                  <h4 className="text-white font-bold text-lg mb-2">Opción 1: Vender con Vuelo Urbano</h4>
                  <p className="text-gray-400 mb-3">Usas nuestra marca y nuestros diseños</p>
                  <div className="bg-yellow-500/10 rounded-lg p-3">
                    <p className="text-yellow-500 font-semibold">Comisión promedio: $3 - $5 por producto</p>
                  </div>
                </div>
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
                  <h4 className="text-white font-bold text-lg mb-2">Opción 2: Crear Tu Marca</h4>
                  <p className="text-gray-400 mb-3">Logo gratis, compras barato, vendes mas caro</p>
                  <div className="bg-green-500/10 rounded-lg p-3 space-y-1">
                    <p className="text-green-500 font-semibold">Ejemplo:</p>
                    <p className="text-gray-300 text-sm">Compra: $8 | Venta: $15 | Ganancia: $7</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-yellow-500 mb-4">Consejos para Revendedores</h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex gap-4">
                  <span className="text-yellow-500 text-xl font-bold">1</span>
                  <span>Comienza con un lote pequeño para conocer la demanda</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-yellow-500 text-xl font-bold">2</span>
                  <span>Aprovecha los diseños nuevos cada semana</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-yellow-500 text-xl font-bold">3</span>
                  <span>Promociona en redes sociales para maximizar ventas</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Cart Modal */}
      {showCart && (
        <CartModal
          items={cart.items}
          mode="reseller"
          total={cart.getTotal()}
          profit={cart.getProfit()}
          onClose={() => setShowCart(false)}
          onUpdateQuantity={cart.updateQuantity}
          onRemoveItem={cart.removeItem}
          onSendOrder={handleSendOrder}
        />
      )}
    </div>
  );
}
