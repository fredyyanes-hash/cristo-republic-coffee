/* Cristo Republic Coffee: product catalog and shopping cart.
   Load at the end of <body> on every page:
   <script src="cart.js"></script>

   Any button with class "add-to-cart" and data-id="<product id>" adds that
   product to the cart. The cart is saved in the visitor's browser, so it
   follows them from page to page. */

const PRODUCTS = {
    // Single-origin coffees
    'santa-ana-reserve': {
        name: 'Santa Ana Reserve', price: 24.99, category: 'Single-Origin Coffees', coffee: true,
        roast: 'Medium roast', notes: ['Chocolate', 'Citrus'],
        description: 'Medium roast with notes of chocolate and citrus.',
        image: 'https://rhoadsroast-coffees.com/cdn/shop/products/el-salvador-santa-ana-reserva-organic-natural-ep-fresh-100percent-arabica-coffee-beans-2-5-lbs-10-lbs-selections-rhoadsroast-coffees-and-importers-4_1500x.progressive.jpg?v=1657563861'
    },
    'usulutan-heights': {
        name: 'Usulután Heights', price: 22.99, category: 'Single-Origin Coffees', coffee: true,
        roast: 'Light roast', notes: ['Floral', 'Honey'],
        description: 'Light roast with floral and honey notes.',
        image: 'https://rhoadsroast-coffees.com/cdn/shop/products/2-lbs-5-lbs-el-salvador-shg-red-bourbon-buenos-aires-fresh-roasted-100percent-arabica-coffee-beans-rhoadsroast-coffees-and-importers-5_1500x.progressive.jpg?v=1657627708'
    },
    'la-libertad-estate': {
        name: 'La Libertad Estate', price: 26.99, category: 'Single-Origin Coffees', coffee: true,
        roast: 'Dark roast', notes: ['Caramel', 'Nutty'],
        description: 'Dark roast with caramel and nutty notes.',
        image: 'https://rhoadsroast-coffees.com/cdn/shop/products/el-salvador-shg-santa-maria-rfa-fresh-roasted-100percent-arabica-coffee-beans-rhoadsroast-coffees-and-importers-5_1500x.progressive.jpg?v=1657563721'
    },
    'chalatenango-select': {
        name: 'Chalatenango Select', price: 25.99, category: 'Single-Origin Coffees', coffee: true,
        roast: 'Medium-dark roast', notes: ['Berry'],
        description: 'Medium-dark roast with berry notes.',
        image: 'https://rhoadsroast-coffees.com/cdn/shop/products/2-5-lbs-el-salvador-santa-ana-reserva-organic-natural-ep-fresh-lightmedium-roast-100percent-arabica-coffee-beans-rhoadsroast-coffees-and-importers-4_1500x.progressive.jpg?v=1657599139'
    },

    // Signature blends
    'morning-ritual-blend': {
        name: 'Morning Ritual Blend', price: 21.99, category: 'Signature Blends', coffee: true,
        roast: 'Signature blend', notes: ['Balanced'],
        description: 'Balanced blend perfect for your daily cup.',
        image: 'images/card1.jpeg'
    },
    'espresso-artisan': {
        name: 'Espresso Artisan', price: 23.99, category: 'Signature Blends', coffee: true,
        roast: 'Espresso roast', notes: ['Rich', 'Bold'],
        description: 'Rich and bold espresso blend.',
        image: 'images/card3.jpeg'
    },
    'decaf-dreams': {
        name: 'Decaf Dreams', price: 20.99, category: 'Signature Blends', coffee: true,
        roast: 'Swiss Water Process decaf', notes: ['Decaf'],
        description: 'Swiss Water Process decaf blend.',
        image: 'https://cdn.dribbble.com/users/973/screenshots/2934743/attachments/609308/coffee-beans-2.jpg'
    },
    'baristas-choice': {
        name: "Barista's Choice", price: 27.99, category: 'Signature Blends', coffee: true,
        roast: 'Signature blend', notes: ['Complex'],
        description: 'Complex blend for coffee enthusiasts.',
        image: 'https://i.pinimg.com/736x/c4/3a/05/c43a055deadcea6b1d021012e29492ae.jpg'
    },

    // Curated gift sets
    'tasters-collection': {
        name: "Taster's Collection", price: 89.99, category: 'Curated Gift Sets', coffee: true,
        roast: 'Gift set', notes: ['Four blends'],
        description: 'Four signature blends in one box.',
        image: 'images/card2.jpeg'
    },
    'brewing-essentials': {
        name: 'Brewing Essentials', price: 149.99, category: 'Curated Gift Sets', coffee: true,
        roast: 'Gift set', notes: ['Starter kit', 'Equipment'],
        description: 'Complete starter kit with equipment.',
        image: 'images/frenchpress.jpeg'
    },
    'connoisseurs-choice': {
        name: "Connoisseur's Choice", price: 199.99, category: 'Curated Gift Sets', coffee: true,
        roast: 'Gift set', notes: ['Premium', 'Tasting notes'],
        description: 'Premium selection with tasting notes.',
        image: 'images/ourstory2.jpeg'
    },
    'monthly-subscription': {
        name: 'Monthly Subscription', price: 249.99, category: 'Curated Gift Sets', coffee: true,
        roast: 'Subscription', notes: ['Three months'],
        description: 'Three months of curated coffee.',
        image: 'images/ourstory1.jpeg'
    }
};

const GRINDS = ['Whole bean', 'Drip', 'Pour-over', 'French press', 'Espresso'];
const FALLBACK_IMAGE = 'images/cristogold.png';
const CART_KEY = 'cristo-cart';

const money = (n) => '$' + n.toFixed(2);

function loadCart() {
    try {
        const items = JSON.parse(localStorage.getItem(CART_KEY));
        return Array.isArray(items) ? items.filter((item) => PRODUCTS[item.id]) : [];
    } catch (e) {
        return [];
    }
}

function saveCart(items) {
    try {
        localStorage.setItem(CART_KEY, JSON.stringify(items));
    } catch (e) {
        // Storage blocked (private browsing); the cart still works on this page
    }
}

let cart = loadCart();

function addToCart(id, grind, qty) {
    if (!PRODUCTS[id]) return;
    grind = PRODUCTS[id].coffee ? (grind || GRINDS[0]) : '';
    qty = Math.max(1, parseInt(qty, 10) || 1);
    const existing = cart.find((item) => item.id === id && item.grind === grind);
    if (existing) existing.qty += qty;
    else cart.push({ id, grind, qty });
    saveCart(cart);
    renderCart();
}

function changeQty(index, delta) {
    cart[index].qty += delta;
    if (cart[index].qty < 1) cart.splice(index, 1);
    saveCart(cart);
    renderCart();
}

function renderCart() {
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    document.querySelectorAll('.cart-count').forEach((badge) => {
        badge.textContent = count;
        badge.hidden = count === 0;
    });

    const cartButton = document.getElementById('cartButton');
    if (cartButton) cartButton.setAttribute('aria-label', `Cart, ${count} item${count === 1 ? '' : 's'}`);

    const list = document.querySelector('.cart-items');
    if (!list) return;
    list.innerHTML = '';

    if (cart.length === 0) {
        list.innerHTML = `<div class="cart-empty">${icon('bag')}<p>Your cart is empty.</p><a href="shop.html" class="text-link">Browse the shop</a></div>`;
    }

    cart.forEach((item, index) => {
        const product = PRODUCTS[item.id];
        const row = document.createElement('div');
        row.className = 'cart-item';
        row.innerHTML = `
            <img src="${product.image || FALLBACK_IMAGE}" alt="">
            <div class="cart-item-details">
                <h4><a href="product.html?id=${item.id}">${product.name}</a></h4>
                <p>${item.grind ? item.grind + ' · ' : ''}${money(product.price)}</p>
                <div class="cart-item-qty">
                    <button type="button" data-delta="-1" aria-label="One less ${product.name}">−</button>
                    <span aria-live="polite">${item.qty}</span>
                    <button type="button" data-delta="1" aria-label="One more ${product.name}">+</button>
                </div>
            </div>
            <button type="button" class="cart-item-remove" aria-label="Remove ${product.name} from cart">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
            </button>`;
        row.querySelectorAll('[data-delta]').forEach((btn) => {
            btn.addEventListener('click', () => changeQty(index, Number(btn.dataset.delta)));
        });
        row.querySelector('.cart-item-remove').addEventListener('click', () => changeQty(index, -item.qty));
        list.appendChild(row);
    });

    const subtotal = cart.reduce((sum, item) => sum + PRODUCTS[item.id].price * item.qty, 0);
    const subtotalEl = document.querySelector('.cart-subtotal span:last-child');
    if (subtotalEl) subtotalEl.textContent = money(subtotal);

    document.querySelectorAll('.cart-footer .cart-button').forEach((btn) => {
        btn.disabled = cart.length === 0;
    });
}

/* ---------- Cart drawer: open, close, keyboard ---------- */

function setUpCartDrawer() {
    const cartButton = document.getElementById('cartButton');
    const modal = document.getElementById('cartModal');
    const closeBtn = document.getElementById('closeCart');
    if (!cartButton || !modal) return;

    const panel = modal.querySelector('.cart-content');
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'true');
    panel.setAttribute('aria-label', 'Shopping cart');
    panel.setAttribute('tabindex', '-1');
    cartButton.setAttribute('role', 'button');
    if (closeBtn) closeBtn.setAttribute('aria-label', 'Close cart');

    const open = () => {
        modal.classList.add('active');
        panel.focus();
    };
    const close = () => {
        modal.classList.remove('active');
        cartButton.focus();
    };

    cartButton.addEventListener('click', (e) => {
        e.preventDefault();
        open();
    });
    if (closeBtn) closeBtn.addEventListener('click', close);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) close();
    });
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;
        if (e.key === 'Escape') close();
        if (e.key === 'Tab') {
            // Keep keyboard focus inside the open cart
            const focusable = panel.querySelectorAll('a[href], button:not([disabled]), input, select');
            if (!focusable.length) return;
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    });

    window.openCart = open;
}

/* ---------- Add to cart buttons ---------- */

function setUpAddButtons() {
    document.querySelectorAll('.add-to-cart[data-id]').forEach((btn) => {
        btn.addEventListener('click', () => {
            const form = btn.closest('form');
            const grind = form && form.querySelector('[name="grind"]') ? form.querySelector('[name="grind"]').value : '';
            const qty = form && form.querySelector('[name="qty"]') ? form.querySelector('[name="qty"]').value : 1;
            addToCart(btn.dataset.id, grind, qty);

            if (!btn.dataset.label) btn.dataset.label = btn.textContent;
            btn.textContent = 'Added ✓';
            btn.classList.add('added');
            clearTimeout(btn.resetTimer);
            btn.resetTimer = setTimeout(() => {
                btn.textContent = btn.dataset.label;
                btn.classList.remove('added');
            }, 1500);
        });
    });
}

/* ---------- Line icons (same 24px stroke set as the header icons) ---------- */

const ICON_PATHS = {
    bag: '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>',
    pin: '<path d="M20 10c0 5-5.5 10.2-7.4 11.8a1 1 0 0 1-1.2 0C9.5 20.2 4 15 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
    handshake: '<path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/><path d="m21 3 1 11h-2"/><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/><path d="M3 4h8"/>',
    leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>'
};

function icon(name) {
    return `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${ICON_PATHS[name]}</svg>`;
}

/* ---------- Mobile menu ---------- */

function setUpMobileMenu() {
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.getElementById('mainNav');
    const header = document.querySelector('header');
    if (!toggle || !nav || !header) return;

    const setHeaderHeight = () => {
        document.documentElement.style.setProperty('--header-h', `${header.offsetHeight}px`);
    };
    const setOpen = (open) => {
        document.body.classList.toggle('menu-open', open);
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        if (open) {
            setHeaderHeight();
            const first = nav.querySelector('a');
            if (first) setTimeout(() => first.focus(), 50);
        }
    };

    toggle.addEventListener('click', () => setOpen(!document.body.classList.contains('menu-open')));
    nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && document.body.classList.contains('menu-open')) {
            setOpen(false);
            toggle.focus();
        }
    });
    window.addEventListener('resize', () => {
        setHeaderHeight();
        if (window.innerWidth > 768) setOpen(false);
    });
    setHeaderHeight();
}

/* ---------- Product page (product.html?id=...) ---------- */

function renderProductPage() {
    const root = document.getElementById('productPage');
    if (!root) return;

    const id = new URLSearchParams(location.search).get('id');
    const product = PRODUCTS[id];

    if (!product) {
        root.innerHTML = `
            <div class="product-missing">
                <h1>We couldn't find that coffee</h1>
                <p><a href="shop.html" class="cta-button">Back to the shop</a></p>
            </div>`;
        return;
    }

    document.title = `${product.name} | Cristo Republic Coffee`;
    const grindField = product.coffee ? `
        <div>
            <label for="grind">Grind</label>
            <select id="grind" name="grind">
                ${GRINDS.map((g) => `<option>${g}</option>`).join('')}
            </select>
        </div>` : '';

    root.innerHTML = `
        <img class="product-page-image" src="${product.image || FALLBACK_IMAGE}" alt="${product.name}">
        <div>
            <div class="product-breadcrumb"><a href="shop.html">Shop</a> / ${product.category}</div>
            <h1>${product.name}</h1>
            <p class="product-price">${money(product.price)}</p>
            <ul class="product-notes">
                <li>${product.roast}</li>
                ${product.notes.map((n) => `<li>${n}</li>`).join('')}
            </ul>
            <p>${product.description}</p>
            <form class="product-options" onsubmit="return false">
                ${grindField}
                <div>
                    <label for="qty">Quantity</label>
                    <input id="qty" name="qty" type="number" min="1" max="20" value="1">
                </div>
                <button type="button" class="add-to-cart" data-id="${id}">Add to cart</button>
            </form>
            <ul class="product-assurances">
                <li>${icon('pin')}Grown in El Salvador</li>
                <li>${icon('handshake')}Direct trade, fair wages</li>
                <li>${icon('leaf')}Organic farming practices</li>
            </ul>
        </div>`;
}

/* ---------- Shop page: tasting notes, filters, sort ---------- */

function setUpShopTools() {
    // Tasting-note chips on every product card
    document.querySelectorAll('.product .add-to-cart[data-id]').forEach((btn) => {
        const card = btn.closest('.product');
        const product = PRODUCTS[btn.dataset.id];
        if (!card || !product) return;
        card.dataset.category = product.category;
        card.dataset.price = product.price;
        if (card.querySelector('.product-notes')) return;
        const notes = document.createElement('ul');
        notes.className = 'product-notes';
        notes.innerHTML = [product.roast, ...product.notes].map((n) => `<li>${n}</li>`).join('');
        const price = card.querySelector('.product-price');
        card.insertBefore(notes, price);
    });

    const bar = document.querySelector('.shop-filters');
    if (!bar) return;
    const sections = [...document.querySelectorAll('.products-section')];
    sections.forEach((section) => {
        section.querySelectorAll('.product').forEach((card, i) => { card.dataset.order = i; });
    });

    bar.querySelectorAll('.filter-chip').forEach((chip) => {
        chip.addEventListener('click', () => {
            bar.querySelectorAll('.filter-chip').forEach((c) => {
                c.classList.toggle('active', c === chip);
                c.setAttribute('aria-pressed', c === chip ? 'true' : 'false');
            });
            const filter = chip.dataset.filter;
            sections.forEach((section) => {
                const cards = [...section.querySelectorAll('.product')];
                const show = filter === 'all' || cards.some((c) => c.dataset.category === filter);
                section.hidden = !show;
            });
        });
    });

    const sort = document.getElementById('shopSort');
    if (sort) {
        sort.addEventListener('change', () => {
            sections.forEach((section) => {
                const grid = section.querySelector('.products-grid');
                if (!grid) return;
                const cards = [...grid.querySelectorAll('.product')];
                cards.sort((a, b) => {
                    if (sort.value === 'price-asc') return a.dataset.price - b.dataset.price;
                    if (sort.value === 'price-desc') return b.dataset.price - a.dataset.price;
                    return a.dataset.order - b.dataset.order;
                });
                cards.forEach((c) => grid.appendChild(c));
            });
        });
    }
}

function init() {
    setUpMobileMenu();
    renderProductPage();
    setUpCartDrawer();
    setUpAddButtons();
    setUpShopTools();
    renderCart();
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();
