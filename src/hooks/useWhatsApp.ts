import { CartItem } from '../types';

const WHATSAPP_NUMBER = '50764987682';

export function useWhatsApp() {
  const generateOrderMessage = (items: CartItem[], mode: 'client' | 'reseller') => {
    let message = 'Hola NEXUS! Quiero cotizar estos productos base:\n\n';

    items.forEach((item) => {
      const sizeText = item.selectedSize
        ? ` (Talla ${item.selectedSize}, Color ${item.selectedColor})`
        : ` (Color ${item.selectedColor})`;
      message += `- ${item.quantity}x ${item.name}${sizeText}\n`;
    });

    message += '\nAdjunto los diseños para que me den el precio total.';

    if (mode === 'reseller') {
      message += '\n\nSoy revendedor, me interesa precio mayorista.';
    }

    return message;
  };

  const sendToWhatsApp = (message: string) => {
    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
    window.open(url, '_blank');
  };

  return {
    generateOrderMessage,
    sendToWhatsApp,
  };
}
