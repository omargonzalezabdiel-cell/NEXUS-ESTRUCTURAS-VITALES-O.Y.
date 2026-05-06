import { X, Trash2, Plus, Minus } from 'lucide-react';
import { CartItem } from '../types';

interface CartModalProps {
  items: CartItem[];
  mode: 'client' | 'reseller';
  total: number;
  profit?: number;
  onClose: () => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onSendOrder: () => void;
}

export default function CartModal({
  items,
  mode,
  total,
  profit,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onSendOrder
}: CartModalProps) {
  const price = mode === 'client' ? 'priceClient' : 'priceBase';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end md:items-center md:justify-center p-4">
      <div className={`w-full md:w-full max-w-2xl rounded-t-3xl md:rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto ${
        mode === 'client' ? 'bg-white' : 'bg-gray-900 border border-gray-700'
      }`}>
        {/* Header */}
        <div className={`sticky top-0 flex items-center justify-between p-6 border-b ${
          mode === 'client'
            ? 'bg-red-50 border-gray-100'
            : 'bg-gray-800 border-gray-700'
        }`}>
          <h2 className={`text-2xl font-bold ${
            mode === 'client' ? 'text-gray-900' : 'text-white'
          }`}>
            {items.length > 0 ? 'Mi Carrito' : 'Carrito Vacío'}
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-full transition-colors ${
              mode === 'client'
                ? 'hover:bg-red-100 text-gray-700'
                : 'hover:bg-gray-700 text-gray-300'
            }`}
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <p className={`text-lg mb-6 ${
                mode === 'client' ? 'text-gray-600' : 'text-gray-400'
              }`}>
                Tu carrito está vacío. Agrega productos para continuar.
              </p>
              <button
                onClick={onClose}
                className={mode === 'client' ? 'btn-red' : 'btn-gold'}
              >
                Continuar Comprando
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.productId}
                  className={`border rounded-lg p-4 flex gap-4 ${
                    mode === 'client'
                      ? 'bg-gray-50 border-gray-200'
                      : 'bg-gray-800 border-gray-700'
                  }`}
                >
                  <div className="flex-1">
                    <h3 className={`font-semibold mb-1 ${
                      mode === 'client' ? 'text-gray-900' : 'text-white'
                    }`}>
                      {item.name}
                    </h3>
                    <p className={`text-sm mb-3 ${
                      mode === 'client' ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      ${item[price as keyof CartItem].toLocaleString('es-CO')} c/u
                    </p>

                    <div className="flex items-center gap-3">
                      <div className={`flex items-center gap-1 rounded-lg border ${
                        mode === 'client'
                          ? 'bg-white border-gray-300'
                          : 'bg-gray-700 border-gray-600'
                      }`}>
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.productId, item.quantity - 1)
                          }
                          className={`p-1 ${
                            mode === 'client'
                              ? 'hover:bg-red-50 text-gray-700'
                              : 'hover:bg-gray-600 text-gray-300'
                          }`}
                        >
                          <Minus size={16} />
                        </button>
                        <span className={`w-6 text-center text-sm font-semibold ${
                          mode === 'client' ? 'text-gray-900' : 'text-white'
                        }`}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.productId, item.quantity + 1)
                          }
                          className={`p-1 ${
                            mode === 'client'
                              ? 'hover:bg-red-50 text-gray-700'
                              : 'hover:bg-gray-600 text-gray-300'
                          }`}
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.productId)}
                        className={`p-2 rounded-lg transition-colors ml-auto ${
                          mode === 'client'
                            ? 'hover:bg-red-100 text-red-600'
                            : 'hover:bg-red-500/20 text-red-400'
                        }`}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className={`font-bold text-lg ${
                      mode === 'client' ? 'text-red-600' : 'text-yellow-500'
                    }`}>
                      ${(item[price as keyof CartItem] * item.quantity).toLocaleString('es-CO')}
                    </p>
                    {mode === 'reseller' && (
                      <p className="text-yellow-600 text-sm mt-2">
                        +${((item.priceClient - item.priceBase) * item.quantity).toLocaleString('es-CO')}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Summary & Actions */}
        {items.length > 0 && (
          <div className={`border-t p-6 ${
            mode === 'client'
              ? 'bg-gray-50 border-gray-100'
              : 'bg-gray-800 border-gray-700'
          }`}>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className={mode === 'client' ? 'text-gray-600' : 'text-gray-400'}>
                  Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items):
                </span>
                <span className={`font-semibold ${
                  mode === 'client' ? 'text-gray-900' : 'text-white'
                }`}>
                  ${total.toLocaleString('es-CO')}
                </span>
              </div>

              {mode === 'reseller' && profit !== undefined && (
                <div className="pt-3 border-t border-gray-700 flex justify-between bg-yellow-500/10 -m-2 p-3 rounded">
                  <span className="text-yellow-400 font-semibold">
                    Ganancia Esperada:
                  </span>
                  <span className="text-yellow-500 font-bold text-lg">
                    ${profit.toLocaleString('es-CO')}
                  </span>
                </div>
              )}
            </div>

            <button
              onClick={onSendOrder}
              className={`w-full py-4 rounded-lg font-bold text-lg transition-all active:scale-95 mb-3 ${
                mode === 'client'
                  ? 'bg-green-500 hover:bg-green-600 text-white'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              Enviar por WhatsApp
            </button>

            <button
              onClick={onClose}
              className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                mode === 'client'
                  ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Seguir Comprando
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
