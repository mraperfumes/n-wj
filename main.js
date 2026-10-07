/* ============================================================
   NAWAJE PERFUMES — Main Application Logic
   ============================================================ */

(function () {
  "use strict";

  /* ---------- Helpers ---------- */
  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));
  const formatNaira = (n) => "₦" + Number(n).toLocaleString("en-NG");

  /* ---------- State ---------- */
  let cart = [];
  try {
    const saved = sessionStorage.getItem("nawaje_cart");
    if (saved) cart = JSON.parse(saved);
  } catch (e) { cart = []; }

  const saveCart = () => {
    try { sessionStorage.setItem("nawaje_cart", JSON.stringify(cart)); } catch (e) {}
  };

  /* ---------- Toast ---------- */
  const toast = $("#toast");
  let toastTimer;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
  }

  /* ---------- Product Card Template ---------- */
  function productCard(p) {
    return `
      <article class="product-card reveal" data-id="${p.id}" data-category="${p.category}">
        <div class="product-img-wrap">
          ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ""}
          <img src="${p.image}" alt="${p.name} — Nawaje Perfumes" loading="lazy">
        </div>
        <div class="product-info">
          <span class="product-cat">${p.category}</span>
          <h3 class="product-name">${p.name}</h3>
          <p class="product-desc">${p.description}</p>
          <p class="product-price"><span>${formatNaira(p.price)}</span></p>
          <div class="product-actions">
            <button class="btn btn-primary add-to-cart" data-id="${p.id}">Add to Cart</button>
            <button class="btn btn-glass view-details" data-id="${p.id}">Details</button>
          </div>
        </div>
      </article>`;
  }

  /* ---------- Render: Featured ---------- */
  function renderFeatured() {
    const grid = $("#featuredGrid");
    const featured = PRODUCTS.filter((p) => p.featured).slice(0, 8);
    grid.innerHTML = featured.map(productCard).join("");
  }

  /* ---------- Render: Shop + Filters ---------- */
  let activeFilter = "all";

  function renderFilters() {
    const bar = $("#filterBar");
    const cats = ["all", ...new Set(PRODUCTS.map((p) => p.category))];
    bar.innerHTML = cats
      .map(
        (c) =>
          `<button class="filter-btn ${c === activeFilter ? "active" : ""}" data-filter="${c}" role="tab" aria-selected="${c === activeFilter}">${c === "all" ? "All" : c}</button>`
      )
      .join("");
  }

  function renderShop() {
    const grid = $("#shopGrid");
    const items =
      activeFilter === "all"
        ? PRODUCTS
        : PRODUCTS.filter((p) => p.category === activeFilter);
    grid.innerHTML = items.map(productCard).join("");
    observeReveals();
  }

  /* ---------- Reveal on Scroll ---------- */
  let observer;
  function observeReveals() {
    if (!("IntersectionObserver" in window)) {
      $$(".reveal").forEach((el) => el.classList.add("visible"));
      return;
    }
    if (!observer) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
      );
    }
    $$(".reveal:not(.visible)").forEach((el) => observer.observe(el));
  }

  /* ---------- Cart ---------- */
  function cartCount() {
    return cart.reduce((sum, item) => sum + item.qty, 0);
  }

  function cartSubtotal() {
    return cart.reduce((sum, item) => {
      const p = PRODUCTS.find((x) => x.id === item.id);
      return p ? sum + p.price * item.qty : sum;
    }, 0);
  }

  function updateBadge() {
    $("#cartBadge").textContent = cartCount();
  }

  function addToCart(id, qty) {
    const existing = cart.find((item) => item.id === id);
    if (existing) existing.qty += qty || 1;
    else cart.push({ id, qty: qty || 1 });
    saveCart();
    updateBadge();
    renderCartItems();
    const p = PRODUCTS.find((x) => x.id === id);
    showToast(p ? `${p.name} added to cart` : "Added to cart");
  }

  function changeQty(id, delta) {
    const item = cart.find((x) => x.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) cart = cart.filter((x) => x.id !== id);
    saveCart();
    updateBadge();
    renderCartItems();
  }

  function removeFromCart(id) {
    cart = cart.filter((x) => x.id !== id);
    saveCart();
    updateBadge();
    renderCartItems();
  }

  function renderCartItems() {
    const wrap = $("#cartItems");
    if (cart.length === 0) {
      wrap.innerHTML = `
        <div class="cart-empty">
          <div class="cart-empty-icon">🛍</div>
          <p>Your cart is empty.<br>Browse the collection and add your favourites.</p>
        </div>`;
    } else {
      wrap.innerHTML = cart
        .map((item) => {
          const p = PRODUCTS.find((x) => x.id === item.id);
          if (!p) return "";
          return `
          <div class="cart-item">
            <img class="cart-item-img" src="${p.image}" alt="${p.name}">
            <div class="cart-item-info">
              <p class="cart-item-name">${p.name}</p>
              <p class="cart-item-price">${formatNaira(p.price)} × ${item.qty} = ${formatNaira(p.price * item.qty)}</p>
              <div class="cart-qty">
                <button data-cart-dec="${p.id}" aria-label="Decrease quantity">−</button>
                <span>${item.qty}</span>
                <button data-cart-inc="${p.id}" aria-label="Increase quantity">+</button>
              </div>
            </div>
            <button class="cart-item-remove" data-cart-remove="${p.id}" aria-label="Remove ${p.name}">&times;</button>
          </div>`;
        })
        .join("");
    }
    $("#cartSubtotal").textContent = formatNaira(cartSubtotal());
  }

  /* ---------- Cart Drawer ---------- */
  const cartDrawer = $("#cartDrawer");
  const cartOverlay = $("#cartOverlay");

  function openCart() {
    renderCartItems();
    cartDrawer.classList.add("open");
    cartOverlay.classList.add("open");
    cartDrawer.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeCart() {
    cartDrawer.classList.remove("open");
    cartOverlay.classList.remove("open");
    cartDrawer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  /* ---------- WhatsApp Checkout ---------- */
  function buildOrderMessage() {
    const name = $("#custName").value.trim();
    const phone = $("#custPhone").value.trim();
    const address = $("#custAddress").value.trim();

    let lines = ["Hello Nawaje Perfumes, I would like to place an order.", ""];
    cart.forEach((item) => {
      const p = PRODUCTS.find((x) => x.id === item.id);
      if (!p) return;
      lines.push(
        `Product: ${p.name}`,
        `Quantity: ${item.qty}`,
        `Price: ${formatNaira(p.price)}`,
        `Total: ${formatNaira(p.price * item.qty)}`,
        "---"
      );
    });
    lines.push(`Grand Total: ${formatNaira(cartSubtotal())}`, "");
    lines.push(`Customer name: ${name || "—"}`);
    lines.push(`Phone: ${phone || "—"}`);
    lines.push(`Delivery address: ${address || "—"}`);
    lines.push("", "Thank you.");
    return lines.join("\n");
  }

  function checkout(numberIndex) {
    if (cart.length === 0) {
      showToast("Your cart is empty");
      return;
    }
    const num = CONTACT_NUMBERS[numberIndex];
    if (!num) return;
    const msg = buildOrderMessage();
    const url = `https://wa.me/${num.wa}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank", "noopener");
    showToast(`Opening WhatsApp — ${num.label}`);
  }

  /* ---------- Product Modal ---------- */
  const modal = $("#productModal");
  const modalOverlay = $("#modalOverlay");
  const modalBody = $("#modalBody");

  function openProductModal(id) {
    const p = PRODUCTS.find((x) => x.id === id);
    if (!p) return;
    modalBody.innerHTML = `
      <div class="modal-img-wrap">
        <img src="${p.image}" alt="${p.name} — Nawaje Perfumes">
      </div>
      <div class="modal-info">
        <span class="product-cat">${p.category}</span>
        <h2>${p.name}</h2>
        <p class="modal-price">${formatNaira(p.price)}</p>
        <p class="modal-desc">${p.description}</p>
        <div class="modal-actions">
          <button class="btn btn-primary add-to-cart" data-id="${p.id}">Add to Cart</button>
          <a class="btn btn-glass" href="https://wa.me/${CONTACT_NUMBERS[0].wa}?text=${encodeURIComponent(
            `Hello Nawaje Perfumes, I would like to order:\n\nProduct: ${p.name}\nPrice: ${formatNaira(p.price)}\n\nThank you.`
          )}" target="_blank" rel="noopener">Order on WhatsApp</a>
        </div>
      </div>`;
    modal.classList.add("open");
    modalOverlay.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeProductModal() {
    modal.classList.remove("open");
    modalOverlay.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  /* ---------- Navigation ---------- */
  const nav = $("#nav");
  const navToggle = $("#navToggle");
  const navLinks = $("#navLinks");

  navToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    navToggle.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", open);
  });

  navLinks.addEventListener("click", (e) => {
    if (e.target.closest("a")) {
      navLinks.classList.remove("open");
      navToggle.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });

  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 40);
  }, { passive: true });

  /* Active nav link on scroll */
  const sections = ["home", "shop", "about", "contact", "policies"];
  window.addEventListener("scroll", () => {
    const pos = window.scrollY + 140;
    let current = "home";
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= pos) current = id;
    });
    $$(".nav-link").forEach((l) => {
      l.classList.toggle("active", l.getAttribute("href") === "#" + current);
    });
  }, { passive: true });

  /* ---------- Policy Tabs ---------- */
  function setPolicyTab(key) {
    $$(".policy-tab").forEach((t) => {
      const active = t.dataset.policy === key;
      t.classList.toggle("active", active);
      t.setAttribute("aria-selected", active);
    });
    $$(".policy-panel").forEach((p) => p.classList.remove("active"));
    const panel = $("#policy-" + key);
    if (panel) panel.classList.add("active");
  }

  $$(".policy-tab").forEach((tab) => {
    tab.addEventListener("click", () => setPolicyTab(tab.dataset.policy));
  });

  $$("[data-policy-link]").forEach((link) => {
    link.addEventListener("click", () => setPolicyTab(link.dataset.policyLink));
  });

  /* ---------- Global Click Delegation ---------- */
  document.addEventListener("click", (e) => {
    const addBtn = e.target.closest(".add-to-cart");
    if (addBtn) {
      addToCart(addBtn.dataset.id, 1);
      return;
    }

    const viewBtn = e.target.closest(".view-details");
    if (viewBtn) {
      openProductModal(viewBtn.dataset.id);
      return;
    }

    const filterBtn = e.target.closest(".filter-btn");
    if (filterBtn) {
      activeFilter = filterBtn.dataset.filter;
      renderFilters();
      renderShop();
      return;
    }

    const inc = e.target.closest("[data-cart-inc]");
    if (inc) { changeQty(inc.dataset.cartInc, 1); return; }

    const dec = e.target.closest("[data-cart-dec]");
    if (dec) { changeQty(dec.dataset.cartDec, -1); return; }

    const rem = e.target.closest("[data-cart-remove]");
    if (rem) { removeFromCart(rem.dataset.cartRemove); return; }
  });

  /* ---------- Cart open/close ---------- */
  $(".nav-cart-link").addEventListener("click", (e) => {
    e.preventDefault();
    openCart();
  });
  $("#cartClose").addEventListener("click", closeCart);
  cartOverlay.addEventListener("click", closeCart);

  /* ---------- Modal close ---------- */
  $("#modalClose").addEventListener("click", closeProductModal);
  modalOverlay.addEventListener("click", closeProductModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { closeCart(); closeProductModal(); }
  });

  /* ---------- Checkout buttons ---------- */
  $("#checkoutBtn1").addEventListener("click", () => checkout(0));
  $("#checkoutBtn2").addEventListener("click", () => checkout(1));

  /* ---------- Init ---------- */
  $("#year").textContent = new Date().getFullYear();
  renderFeatured();
  renderFilters();
  renderShop();
  updateBadge();
  renderCartItems();
  observeReveals();
})();
