import { useState, useEffect } from 'react';
import { CustomDesign } from '../types';

export function useCustomDesigns() {
  const [designs, setDesigns] = useState<CustomDesign[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('custom-designs');
    if (saved) {
      setDesigns(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('custom-designs', JSON.stringify(designs));
  }, [designs]);

  const createDesign = (design: Omit<CustomDesign, 'id'>) => {
    const newDesign: CustomDesign = {
      ...design,
      id: Date.now().toString()
    };
    setDesigns([...designs, newDesign]);
    return newDesign;
  };

  const updateDesign = (id: string, updates: Partial<CustomDesign>) => {
    setDesigns(designs.map(d => d.id === id ? { ...d, ...updates } : d));
  };

  const deleteDesign = (id: string) => {
    setDesigns(designs.filter(d => d.id !== id));
  };

  const getDesign = (id: string) => {
    return designs.find(d => d.id === id);
  };

  return {
    designs,
    createDesign,
    updateDesign,
    deleteDesign,
    getDesign
  };
}
