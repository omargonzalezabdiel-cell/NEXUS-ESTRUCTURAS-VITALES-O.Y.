import { CartItem } from '../types';

const WHATSAPP_NUMBER = '50764987682';

export function useWhatsApp() {
  const generateOrderMessage = (
    items: CartItem[],
    mode: 'client' | 'reseller',
    total: number,
    profit?: number
  ) => {
    let message = 'Hola, me gustaría realizar un pedido:\n\n';

    items.forEach((item) => {
      const price = mode === 'client' ? item.priceClient : item.priceBase;
      const itemTotal = price * item.quantity;
      message += `${item.name}\n`;
      message += `  Cantidad: ${item.quantity} x $${price.toLocaleString('es-CO')}\n`;
      message += `  Subtotal: $${itemTotal.toLocaleString('es-CO')}\n\n`;
    });

    message += `Total: $${total.toLocaleString('es-CO')}\n`;

    if (mode === 'reseller' && profit !== undefined) {
      message += `Ganancia esperada: $${profit.toLocaleString('es-CO')}\n`;
    }

    message += '\nPor favor confirmar disponibilidad y coordinar envío.';

    return message;
  };

  const sendToWhatsApp = (message: string) => {
    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
    window.open(url, '_blank');
  };

  const openWhatsAppChat = (message: string) => {
    sendToWhatsApp(message);
  };

  return {
    generateOrderMessage,
    sendToWhatsApp,
    openWhatsAppChat
  };
}
