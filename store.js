const CART_KEY = "taoqu_cart_v1";

function readCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return typeof parsed === "object" && parsed ? parsed : {};
  } catch {
    return {};
  }
}

function writeCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function getCart() {
  return readCart();
}

export function getCartCount() {
  const cart = readCart();
  return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
}

export function addToCart(productId, qty = 1) {
  const cart = readCart();
  const next = (cart[productId] || 0) + qty;
  cart[productId] = Math.min(next, 99);
  writeCart(cart);
  return cart;
}

export function updateCartItem(productId, qty) {
  const cart = readCart();
  if (qty <= 0) {
    delete cart[productId];
  } else {
    cart[productId] = Math.min(qty, 99);
  }
  writeCart(cart);
  return cart;
}

export function clearCart() {
  writeCart({});
}
