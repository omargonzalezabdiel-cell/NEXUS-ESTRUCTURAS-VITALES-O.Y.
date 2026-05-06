import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  mode: 'client' | 'reseller';
  onAddToCart: (quantity: number) => void;
}

export default function ProductCard({
  product,
  mode,
  onAddToCart
}: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const price = mode === 'client' ? product.priceClient : product.priceBase;
  const margin = product.priceClient - product.priceBase;

  const handleAddToCart = () => {
    onAddToCart(quantity);
    setIsAdded(true);
    setQuantity(1);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const bgColor = mode === 'client' ? 'red' : 'yellow';
  const accentClass = mode === 'client'
    ? 'border-red-200 bg-red-50'
    : 'border-yellow-500/30 bg-gray-800';

  return (
    <div
      className={`rounded-2xl overflow-hidden transition-all hover:shadow-xl ${
        mode === 'client'
          ? 'bg-white border border-gray-100'
          : 'bg-gray-900 border border-gray-700'
      }`}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gray-200">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
        {mode === 'reseller' && (
          <div className="absolute top-3 right-3 bg-yellow-500 text-gray-900 px-3 py-1 rounded-full text-xs font-bold">
            PRO
          </div>
        )}
        <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${
          mode === 'client'
            ? 'bg-red-100 text-red-700'
            : 'bg-gray-700 text-yellow-400'
        }`}>
          {product.category}
        </div>
      </div>

      {/* Content */}
      <div className={`p-4 ${mode === 'client' ? '' : 'border-t border-gray-700'}`}>
        <h3 className={`font-bold text-lg mb-2 ${
          mode === 'client' ? 'text-gray-900' : 'text-white'
        }`}>
          {product.name}
        </h3>
        <p className={`text-sm mb-4 h-10 overflow-hidden ${
          mode === 'client' ? 'text-gray-600' : 'text-gray-400'
        }`}>
          {product.description}
        </p>

        {/* Price Section */}
        <div className={`border-t pt-4 mb-4 ${
          mode === 'client' ? 'border-gray-100' : 'border-gray-700'
        }`}>
          {mode === 'reseller' && (
            <div className="mb-3 pb-3 border-b border-gray-700">
              <p className="text-xs text-gray-400 mb-1">Margen de Ganancia</p>
              <p className="text-yellow-500 font-bold">
                ${margin.toLocaleString('es-CO')} por unidad
              </p>
            </div>
          )}
          <div className="flex items-baseline justify-between">
            <span className={`text-2xl font-bold ${
              mode === 'client' ? 'text-red-600' : 'text-yellow-500'
            }`}>
              ${price.toLocaleString('es-CO')}
            </span>
            {mode === 'client' && product.stock > 0 && (
              <span className="text-xs text-gray-500">Stock: {product.stock}</span>
            )}
          </div>
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className={`flex items-center gap-2 rounded-lg border ${
            mode === 'client'
              ? 'bg-gray-100 border-gray-200'
              : 'bg-gray-800 border-gray-700'
          }`}>
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className={`p-2 transition-colors ${
                mode === 'client'
                  ? 'hover:text-red-600'
                  : 'hover:text-yellow-500 text-gray-400'
              }`}
            >
              <Minus size={16} />
            </button>
            <span className={`w-8 text-center font-semibold ${
              mode === 'client' ? 'text-gray-900' : 'text-white'
            }`}>
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className={`p-2 transition-colors ${
                mode === 'client'
                  ? 'hover:text-red-600'
                  : 'hover:text-yellow-500 text-gray-400'
              }`}
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className={`w-full py-3 rounded-lg font-semibold transition-all transform active:scale-95 ${
            isAdded
              ? mode === 'client'
                ? 'bg-green-500 text-white'
                : 'bg-green-600 text-white'
              : mode === 'client'
              ? 'bg-red-600 text-white hover:bg-red-700'
              : 'bg-yellow-500 text-gray-900 hover:bg-yellow-600'
          }`}
        >
          {isAdded ? '✓ Agregado' : 'Agregar al Carrito'}
        </button>
      </div>
    </div>
  );
}
