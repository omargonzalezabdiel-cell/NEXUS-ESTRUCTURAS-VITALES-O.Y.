import { X, Trash2, Plus, Minus, MessageCircle } from 'lucide-react';
import { CartItem } from '../types';

interface CartModalProps {
  items: CartItem[];
  mode: 'client' | 'reseller';
  onClose: () => void;
  onUpdateQuantity: (productId: string, selectedSize: string, selectedColor: string, quantity: number) => void;
  onRemoveItem: (productId: string, selectedSize: string, selectedColor: string) => void;
  onSendOrder: () => void;
}

export default function CartModal({
  items,
  mode,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onSendOrder,
}: CartModalProps) {
  const isClient = mode === 'client';
  const bgMain = isClient ? 'bg-white' : 'bg-gray-900 border border-gray-700';
  const bgHeader = isClient ? 'bg-red-50 border-gray-100' : 'bg-gray-800 border-gray-700';
  const bgItem = isClient ? 'bg-gray-50 border-gray-200' : 'bg-gray-800 border-gray-700';
  const bgFooter = isClient ? 'bg-gray-50 border-gray-100' : 'bg-gray-800 border-gray-700';
  const textPrimary = isClient ? 'text-gray-900' : 'text-white';
  const textSecondary = isClient ? 'text-gray-600' : 'text-gray-400';
  const accentText = isClient ? 'text-red-600' : 'text-yellow-500';
  const btnAccent = isClient ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-yellow-500 hover:bg-yellow-600 text-gray-900';
  const btnSecondary = isClient ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' : 'bg-gray-700 text-gray-300 hover:bg-gray-600';

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center md:justify-center p-4">
      <div className={`w-full max-w-2xl rounded-t-3xl md:rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto ${bgMain}`}>
        {/* Header */}
        <div className={`sticky top-0 flex items-center justify-between p-6 border-b ${bgHeader} z-10`}>
          <h2 className={`text-2xl font-bold ${textPrimary}`}>
            {items.length > 0 ? 'Mi Carrito' : 'Carrito Vacio'}
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-full transition-colors ${
              isClient ? 'hover:bg-red-100 text-gray-700' : 'hover:bg-gray-700 text-gray-300'
            }`}
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <p className={`text-lg mb-6 ${textSecondary}`}>
                Tu carrito esta vacio. Agrega productos base para continuar.
              </p>
              <button onClick={onClose} className={`${btnAccent} px-6 py-3 rounded-full font-semibold`}>
                Continuar Comprando
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => {
                const itemKey = `${item.productId}-${item.selectedSize}-${item.selectedColor}`;
                return (
                  <div key={itemKey} className={`border rounded-lg p-4 flex gap-4 ${bgItem}`}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-contain rounded-lg bg-white p-1"
                    />
                    <div className="flex-1">
                      <h3 className={`font-semibold mb-1 ${textPrimary}`}>
                        {item.name}
                      </h3>
                      <p className={`text-sm mb-2 ${textSecondary}`}>
                        {item.selectedSize && `Talla ${item.selectedSize} | `}
                        Color {item.selectedColor}
                      </p>

                      <div className="flex items-center gap-3">
                        <div className={`flex items-center gap-1 rounded-lg border ${
                          isClient ? 'bg-white border-gray-300' : 'bg-gray-700 border-gray-600'
                        }`}>
                          <button
                            onClick={() =>
                              onUpdateQuantity(item.productId, item.selectedSize, item.selectedColor, item.quantity - 1)
                            }
                            className={`p-1 ${isClient ? 'hover:bg-red-50 text-gray-700' : 'hover:bg-gray-600 text-gray-300'}`}
                          >
                            <Minus size={16} />
                          </button>
                          <span className={`w-8 text-center text-sm font-semibold ${textPrimary}`}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              onUpdateQuantity(item.productId, item.selectedSize, item.selectedColor, item.quantity + 1)
                            }
                            className={`p-1 ${isClient ? 'hover:bg-red-50 text-gray-700' : 'hover:bg-gray-600 text-gray-300'}`}
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.productId, item.selectedSize, item.selectedColor)}
                          className={`p-2 rounded-lg transition-colors ml-auto ${
                            isClient ? 'hover:bg-red-100 text-red-600' : 'hover:bg-red-500/20 text-red-400'
                          }`}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>

                    <div className="text-right self-center">
                      <p className={`font-bold ${accentText}`}>A cotizar</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Summary & Actions */}
        {items.length > 0 && (
          <div className={`border-t p-6 ${bgFooter}`}>
            {/* Cotizacion message */}
            <div className={`rounded-xl p-4 mb-6 text-center ${
              isClient ? 'bg-red-50 border border-red-200' : 'bg-yellow-500/10 border border-yellow-500/30'
            }`}>
              <p className={`font-bold text-lg mb-1 ${accentText}`}>
                Cotizacion final via WhatsApp
              </p>
              <p className={`text-sm ${textSecondary}`}>
                {items.reduce((s, i) => s + i.quantity, 0)} productos base seleccionados
              </p>
            </div>

            <button
              onClick={onSendOrder}
              className="w-full py-4 rounded-lg font-bold text-lg transition-all active:scale-95 mb-3 flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white"
            >
              <MessageCircle size={22} />
              Enviar por WhatsApp
            </button>

            <button
              onClick={onClose}
              className={`w-full py-3 rounded-lg font-semibold transition-colors ${btnSecondary}`}
            >
              Seguir Comprando
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
