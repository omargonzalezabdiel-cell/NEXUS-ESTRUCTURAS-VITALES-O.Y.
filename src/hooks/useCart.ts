import { useState, useEffect } from 'react';
import { CartItem } from '../types';

export function useCart(mode: 'client' | 'reseller') {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(`cart-${mode}`);
    if (saved) {
      setItems(JSON.parse(saved));
    }
  }, [mode]);

  useEffect(() => {
    localStorage.setItem(`cart-${mode}`, JSON.stringify(items));
  }, [items, mode]);

  const addItem = (
    productId: string,
    name: string,
    quantity: number,
    priceClient: number,
    priceBase: number
  ) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.productId === productId);
      if (existing) {
        return prev.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        { productId, name, quantity, priceClient, priceBase }
      ];
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.productId !== productId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalItems = () => items.reduce((sum, item) => sum + item.quantity, 0);

  const getTotal = () => {
    if (mode === 'client') {
      return items.reduce((sum, item) => sum + item.priceClient * item.quantity, 0);
    }
    return items.reduce((sum, item) => sum + item.priceBase * item.quantity, 0);
  };

  const getProfit = () => {
    return items.reduce((sum, item) => {
      const margin = item.priceClient - item.priceBase;
      return sum + margin * item.quantity;
    }, 0);
  };

  return {
    items,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    getTotalItems,
    getTotal,
    getProfit
  };
}
