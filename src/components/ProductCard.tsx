import { useState } from 'react';
import { Plus, Minus, Check } from 'lucide-react';
import { Product } from '../types';
import { SIZES, CATEGORY_LABELS } from '../data/products';

interface ProductCardProps {
  product: Product;
  mode: 'client' | 'reseller';
  onAddToCart: (selectedSize: string, selectedColor: string, quantity: number) => void;
}

export default function ProductCard({ product, mode, onAddToCart }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const canAdd = () => {
    if (product.hasSizes && !selectedSize) return false;
    if (!selectedColor) return false;
    return true;
  };

  const handleAddToCart = () => {
    if (!canAdd()) return;
    onAddToCart(selectedSize, selectedColor, quantity);
    setIsAdded(true);
    setQuantity(1);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const isClient = mode === 'client';
  const accentBg = isClient ? 'bg-red-600' : 'bg-yellow-500';
  const accentHover = isClient ? 'hover:bg-red-700' : 'hover:bg-yellow-600';
  const accentText = isClient ? 'text-red-600' : 'text-yellow-500';
  const accentBadge = isClient ? 'bg-red-100 text-red-700' : 'bg-yellow-500/20 text-yellow-400';
  const cardBg = isClient ? 'bg-white border border-gray-100' : 'bg-gray-900 border border-gray-700';
  const textPrimary = isClient ? 'text-gray-900' : 'text-white';
  const textSecondary = isClient ? 'text-gray-600' : 'text-gray-400';
  const selectorBg = isClient ? 'bg-gray-100 border-gray-200' : 'bg-gray-800 border-gray-700';
  const selectorActive = isClient ? 'bg-red-600 text-white' : 'bg-yellow-500 text-gray-900';
  const selectorInactive = isClient ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' : 'bg-gray-700 text-gray-300 hover:bg-gray-600';

  return (
    <div className={`rounded-2xl overflow-hidden transition-all hover:shadow-xl ${cardBg}`}>
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gray-200">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain p-4 hover:scale-105 transition-transform duration-300"
        />
        {!isClient && (
          <div className="absolute top-3 right-3 bg-yellow-500 text-gray-900 px-3 py-1 rounded-full text-xs font-bold">
            PRO
          </div>
        )}
        <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${accentBadge}`}>
          {CATEGORY_LABELS[product.category]}
        </div>
      </div>

      {/* Content */}
      <div className={`p-4 ${!isClient ? 'border-t border-gray-700' : ''}`}>
        <h3 className={`font-bold text-lg mb-3 ${textPrimary}`}>
          {product.name}
        </h3>

        {/* Size Selector */}
        {product.hasSizes && (
          <div className="mb-3">
            <p className={`text-xs font-semibold mb-2 ${textSecondary}`}>Talla:</p>
            <div className="flex gap-2">
              {SIZES.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-10 h-10 rounded-lg text-sm font-bold transition-all ${
                    selectedSize === size ? selectorActive : selectorInactive
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Color Selector */}
        <div className="mb-3">
          <p className={`text-xs font-semibold mb-2 ${textSecondary}`}>Color:</p>
          <div className="flex flex-wrap gap-2">
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedColor === color ? selectorActive : selectorInactive
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div className="flex items-center gap-3 mb-4">
          <p className={`text-xs font-semibold ${textSecondary}`}>Cantidad:</p>
          <div className={`flex items-center gap-2 rounded-lg border ${selectorBg}`}>
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className={`p-2 transition-colors ${accentText}`}
            >
              <Minus size={16} />
            </button>
            <span className={`w-8 text-center font-semibold ${textPrimary}`}>
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className={`p-2 transition-colors ${accentText}`}
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        {/* Price placeholder */}
        <div className={`border-t pt-3 mb-3 ${isClient ? 'border-gray-100' : 'border-gray-700'}`}>
          <p className={`text-lg font-bold ${accentText}`}>A cotizar</p>
        </div>

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          disabled={!canAdd()}
          className={`w-full py-3 rounded-lg font-semibold transition-all transform active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed ${
            isAdded
              ? 'bg-green-500 text-white'
              : `${accentBg} text-white ${accentHover}`
          }`}
        >
          {isAdded ? (
            <span className="flex items-center justify-center gap-2">
              <Check size={18} /> Agregado
            </span>
          ) : (
            'Agregar al Carrito'
          )}
        </button>
      </div>
    </div>
  );
}
