// ==============================
// CONFIGURACIÓN FÁCIL
// Cambiá este número por tu WhatsApp.
// Formato: código de país + número, sin +, espacios ni guiones.
// Ejemplo Argentina: 54911XXXXXXXX
// ==============================
const WHATSAPP_NUMBER = '5491123234478';

// Contadores de cada tamaño
for (const card of document.querySelectorAll('.product-card')) {
  card.querySelectorAll('.quantity').forEach(quantity => {
    const value = quantity.querySelector('span');
    quantity.querySelector('[data-action="minus"]').addEventListener('click', () => {
      value.textContent = Math.max(1, Number(value.textContent) - 1);
    });
    quantity.querySelector('[data-action="plus"]').addEventListener('click', () => {
      value.textContent = Number(value.textContent) + 1;
    });
  });
}

// Botones de pedido: abre WhatsApp con sabor, tamaño y cantidad.
document.querySelectorAll('.order-btn').forEach(button => {
  button.addEventListener('click', () => {
    const card = button.closest('.product-card');
    const product = card.dataset.product;
    const size = button.dataset.size;
    const quantity = button.parentElement.querySelector('.quantity span').textContent;
    const price = card.dataset[`price${size.replace(' g','')}`] || '';

    const message = `Hola! Quiero hacer un pedido de Mis Postres 🍰%0A%0A` +
      `Sabor: ${product}%0A` +
      `Tamaño: ${size}%0A` +
      `Cantidad: ${quantity}` +
      (price ? `%0APrecio unitario: $${Number(price).toLocaleString('es-AR')}` : '') +
      `%0A%0A¡Gracias!`;

    if (!WHATSAPP_NUMBER) {
      alert('Primero cambiá WHATSAPP_NUMBER en script.js por tu número de WhatsApp.');
      return;
    }

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  });
});
