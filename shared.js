/* ========= This file is for cart and product list page ========= */

/* all product Info  */
const PRODUCTS = {
  q1: { name: 'Activated Charcoal Latte', price: 8.0, img: 'Assets/Activated Charcoal Latte.webp' },
  q2: { name: 'Butterfly Pea Blue Matcha Latte', price: 8.0, img: 'Assets/Butterfly Pea Blue Matcha Latte.webp' },
  q3: { name: 'Beetroot Latte', price: 8.0, img: 'Assets/Beetroot Latte.webp'},
};

/* Get Info from localStorage */
function getCart() {
  return JSON.parse(localStorage.getItem('cart') || '{}');
}

/* Save Info to localStorage */
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}
