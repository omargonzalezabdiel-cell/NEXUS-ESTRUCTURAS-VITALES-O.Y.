import { useState, useEffect, useCallback } from 'react';
import { CartItem, Product } from '../types';

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

  const addItem = useCallback((
    product: Product,
    selectedSize: string,
    selectedColor: string,
    quantity: number
  ) => {
    setItems((prev) => {
      const existing = prev.find(
        (item) =>
          item.productId === product.id &&
          item.selectedSize === selectedSize &&
          item.selectedColor === selectedColor
      );
      if (existing) {
        return prev.map((item) =>
          item.productId === product.id &&
          item.selectedSize === selectedSize &&
          item.selectedColor === selectedColor
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          productId: product.id,
          name: product.name,
          image: product.image,
          category: product.category,
          selectedSize,
          selectedColor,
          quantity,
        },
      ];
    });
  }, []);

  const updateQuantity = useCallback((
    productId: string,
    selectedSize: string,
    selectedColor: string,
    quantity: number
  ) => {
    if (quantity <= 0) {
      removeItem(productId, selectedSize, selectedColor);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.productId === productId &&
        item.selectedSize === selectedSize &&
        item.selectedColor === selectedColor
          ? { ...item, quantity }
          : item
      )
    );
  }, []);

  const removeItem = useCallback((
    productId: string,
    selectedSize: string,
    selectedColor: string
  ) => {
    setItems((prev) =>
      prev.filter(
        (item) =>
          !(
            item.productId === productId &&
            item.selectedSize === selectedSize &&
            item.selectedColor === selectedColor
          )
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const getTotalItems = useCallback(() =>
    items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  return {
    items,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    getTotalItems,
  };
}
