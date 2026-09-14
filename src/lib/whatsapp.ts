export const WHATSAPP_NUMBER = '201099352531'; // +20 109 935 2531
export const WHATSAPP_DISPLAY = '01099352531';

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function formatPrice(price: number): string {
  return `${price} ج.م`;
}
