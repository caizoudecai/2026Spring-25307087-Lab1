import { PRODUCTS, CATEGORIES } from "./products.js";
import { addToCart, getCart, getCartCount, updateCartItem, clearCart } from "./store.js";

const page = document.body.dataset.page;

function formatPrice(value) {
  return `¥${value.toFixed(2)}`;
}

function getQuery() {
  return new URLSearchParams(window.location.search);
}

function setCartBadge() {
  const badge = document.querySelector("#cartBadge");
  if (!badge) return;
  badge.textContent = String(getCartCount());
}

function productCard(product) {
  return `
    <article class="product-card">
      <img src="${product.image}" alt="${product.name}" loading="lazy">
      <div class="product-card-body">
        <h3>${product.name}</h3>
        <p class="desc">${product.desc}</p>
        <p class="meta">${product.category} · 销量 ${product.sales}</p>
        <div class="price-row">
          <strong>${formatPrice(product.price)}</strong>
          <button data-action="add" data-id="${product.id}">加入购物车</button>
        </div>
        <a class="detail-link" href="product.html?id=${product.id}">查看详情</a>
      </div>
    </article>
  `;
}

function bindAddToCart(container) {
  container.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLButtonElement)) return;
    if (target.dataset.action !== "add") return;
    const productId = target.dataset.id;
    if (!productId) return;
    addToCart(productId, 1);
    setCartBadge();
    target.textContent = "已加入";
    setTimeout(() => {
      target.textContent = "加入购物车";
    }, 700);
  });
}

function renderHome() {
  const categoryBox = document.querySelector("#quickCategories");
  const grid = document.querySelector("#featuredGrid");
  const countdownEl = document.querySelector("#countdown");
  if (!categoryBox || !grid || !countdownEl) return;

  categoryBox.innerHTML = CATEGORIES.filter((c) => c !== "全部")
    .map((name) => `<a href="products.html?category=${encodeURIComponent(name)}">${name}</a>`)
    .join("");

  let cursor = 0;
  const chunk = 4;
  const refreshFeatured = () => {
    const list = [];
    for (let i = 0; i < chunk; i += 1) {
      list.push(PRODUCTS[(cursor + i) % PRODUCTS.length]);
    }
    cursor = (cursor + 1) % PRODUCTS.length;
    grid.innerHTML = list.map(productCard).join("");
  };
  refreshFeatured();
  setInterval(refreshFeatured, 8000);
  bindAddToCart(grid);

  const target = Date.now() + 2 * 60 * 60 * 1000;
  setInterval(() => {
    const diff = Math.max(0, target - Date.now());
    const h = Math.floor(diff / 3600000).toString().padStart(2, "0");
    const m = Math.floor((diff % 3600000) / 60000).toString().padStart(2, "0");
    const s = Math.floor((diff % 60000) / 1000).toString().padStart(2, "0");
    countdownEl.textContent = `${h}:${m}:${s}`;
  }, 250);
}

function renderProducts() {
  const searchInput = document.querySelector("#listSearchInput");
  const categoryFilter = document.querySelector("#categoryFilter");
  const sortFilter = document.querySelector("#sortFilter");
  const grid = document.querySelector("#productsGrid");
  const emptyState = document.querySelector("#emptyState");
  if (!searchInput || !categoryFilter || !sortFilter || !grid || !emptyState) return;

  categoryFilter.innerHTML = CATEGORIES.map(
    (c) => `<option value="${c}">${c}</option>`
  ).join("");

  const query = getQuery();
  searchInput.value = query.get("q") || "";
  categoryFilter.value = query.get("category") || "全部";

  const apply = () => {
    const keyword = searchInput.value.trim().toLowerCase();
    const category = categoryFilter.value;
    const sort = sortFilter.value;
    const filtered = PRODUCTS.filter((item) => {
      const hitKeyword =
        !keyword ||
        item.name.toLowerCase().includes(keyword) ||
        item.desc.toLowerCase().includes(keyword) ||
        item.category.toLowerCase().includes(keyword);
      const hitCategory = category === "全部" || item.category === category;
      return hitKeyword && hitCategory;
    });

    if (sort === "priceAsc") filtered.sort((a, b) => a.price - b.price);
    if (sort === "priceDesc") filtered.sort((a, b) => b.price - a.price);
    if (sort === "salesDesc") filtered.sort((a, b) => b.sales - a.sales);

    grid.innerHTML = filtered.map(productCard).join("");
    emptyState.classList.toggle("hidden", filtered.length > 0);
  };

  [searchInput, categoryFilter, sortFilter].forEach((el) =>
    el.addEventListener("input", apply)
  );
  apply();
  bindAddToCart(grid);
}

function renderProductDetail() {
  const panel = document.querySelector("#detailPanel");
  if (!panel) return;

  const id = getQuery().get("id");
  const item = PRODUCTS.find((p) => p.id === id);
  if (!item) {
    panel.innerHTML = `
      <h1>商品不存在</h1>
      <p>该商品可能已下架或链接有误。</p>
      <a class="button primary" href="products.html">返回商品页</a>
    `;
    return;
  }

  panel.innerHTML = `
    <div class="detail-layout">
      <img src="${item.image}" alt="${item.name}" class="detail-image">
      <div>
        <p class="hero-tag">${item.category}</p>
        <h1>${item.name}</h1>
        <p>${item.desc}</p>
        <p class="detail-rating">评分 ${item.rating} / 5 · 销量 ${item.sales}</p>
        <p class="detail-price">${formatPrice(item.price)}</p>
        <div class="detail-actions">
          <button id="addOne">加入购物车</button>
          <a class="button ghost" href="cart.html">去结算</a>
        </div>
      </div>
    </div>
  `;

  const addOne = document.querySelector("#addOne");
  if (!addOne) return;
  addOne.addEventListener("click", () => {
    addToCart(item.id, 1);
    setCartBadge();
    addOne.textContent = "已加入购物车";
  });
}

function renderCart() {
  const list = document.querySelector("#cartList");
  const summary = document.querySelector("#cartSummary");
  const empty = document.querySelector("#cartEmpty");
  if (!list || !summary || !empty) return;

  const rerender = () => {
    const cart = getCart();
    const rows = Object.entries(cart)
      .map(([id, qty]) => {
        const item = PRODUCTS.find((p) => p.id === id);
        if (!item) return null;
        return { ...item, qty };
      })
      .filter(Boolean);

    if (!rows.length) {
      list.innerHTML = "";
      empty.classList.remove("hidden");
      summary.classList.add("hidden");
      setCartBadge();
      return;
    }

    empty.classList.add("hidden");
    summary.classList.remove("hidden");

    list.innerHTML = rows
      .map(
        (item) => `
      <article class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-main">
          <h3>${item.name}</h3>
          <p>${item.desc}</p>
          <strong>${formatPrice(item.price)}</strong>
        </div>
        <div class="cart-actions">
          <div class="qty-box">
            <button data-type="minus" data-id="${item.id}">-</button>
            <span>${item.qty}</span>
            <button data-type="plus" data-id="${item.id}">+</button>
          </div>
          <button data-type="remove" data-id="${item.id}" class="danger">删除</button>
        </div>
      </article>
    `
      )
      .join("");

    const totalQty = rows.reduce((s, item) => s + item.qty, 0);
    const totalPrice = rows.reduce((s, item) => s + item.qty * item.price, 0);
    summary.innerHTML = `
      <p>共 <strong>${totalQty}</strong> 件商品，合计 <strong>${formatPrice(totalPrice)}</strong></p>
      <div class="hero-actions">
        <button id="checkoutBtn">模拟结算</button>
        <button id="clearBtn" class="ghost">清空购物车</button>
      </div>
    `;

    const checkoutBtn = document.querySelector("#checkoutBtn");
    const clearBtn = document.querySelector("#clearBtn");
    if (checkoutBtn) {
      checkoutBtn.addEventListener("click", () => {
        alert("演示项目：结算流程可继续扩展为支付页。");
      });
    }
    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        clearCart();
        rerender();
      });
    }
    setCartBadge();
  };

  list.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLButtonElement)) return;
    const type = target.dataset.type;
    const id = target.dataset.id;
    if (!id || !type) return;
    const currentQty = getCart()[id] || 0;
    if (type === "plus") updateCartItem(id, currentQty + 1);
    if (type === "minus") updateCartItem(id, currentQty - 1);
    if (type === "remove") updateCartItem(id, 0);
    rerender();
  });

  rerender();
}

setCartBadge();
if (page === "home") renderHome();
if (page === "products") renderProducts();
if (page === "productDetail") renderProductDetail();
if (page === "cart") renderCart();
