export const WHATSAPP_NUMBER_DISPLAY = "(62) 99497-6543";
export const WHATSAPP_NUMBER_RAW = "5562994976543";
export const WHATSAPP_DEFAULT_MESSAGE = "Olá! Gostaria de saber mais sobre os serviços da Elo Digital.";

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER_RAW}?text=${encodeURIComponent(
  WHATSAPP_DEFAULT_MESSAGE
)}`;
