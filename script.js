/**
 * SANCTUARY CAFÉ & ART ATELIER
 * Core Interactive Experience Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Initialize all interactive modules
  initHeaderAndNav();
  initLiveHoursStatus();
  initArtisanMenu();
  initCartDrawer();
  initArtGallery();
  initHugWall();
  initWorkshops();
  initReservationSystem();
  initNewsletter();
});

/* ==========================================================================
   1. HEADER, NAVIGATION & ANNOUNCEMENT
   ========================================================================== */
function initHeaderAndNav() {
  const navbar = document.getElementById('navbar');
  const banner = document.getElementById('top-announcement');
  const closeBannerBtn = document.getElementById('close-banner');
  const mobileToggle = document.getElementById('mobile-toggle-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileCloseBtn = document.getElementById('mobile-close-btn');
  const drawerOverlay = document.getElementById('drawer-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link, .drawer-cta');

  // Sticky header shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Close announcement banner
  if (closeBannerBtn && banner) {
    closeBannerBtn.addEventListener('click', () => {
      banner.style.display = 'none';
    });
  }

  // Mobile drawer controls
  const openDrawer = () => {
    mobileDrawer.classList.add('open');
    drawerOverlay.classList.add('active');
    mobileToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    mobileDrawer.classList.remove('open');
    drawerOverlay.classList.remove('active');
    mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
  if (mobileCloseBtn) mobileCloseBtn.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* ==========================================================================
   2. LIVE OPERATING HOURS ENGINE
   ========================================================================== */
function initLiveHoursStatus() {
  const statusPill = document.getElementById('live-hours-pill');
  const statusText = document.getElementById('status-text');
  const statusDot = statusPill?.querySelector('.status-dot');
  const cardHoursStatus = document.getElementById('card-hours-status');

  const now = new Date();
  const day = now.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
  const hour = now.getHours();
  const minutes = now.getMinutes();
  const currentTime = hour + minutes / 60;

  // Hours:
  // Mon - Thu: 7:30 (7.5) to 21:00 (21.0)
  // Fri - Sat: 7:30 (7.5) to 22:30 (22.5)
  // Sun: 8:00 (8.0) to 20:00 (20.0)
  let openTime = 7.5;
  let closeTime = 21.0;
  let closeFormatted = '9:00 PM';

  if (day === 0) { // Sunday
    openTime = 8.0;
    closeTime = 20.0;
    closeFormatted = '8:00 PM';
  } else if (day === 5 || day === 6) { // Friday & Saturday
    openTime = 7.5;
    closeTime = 22.5;
    closeFormatted = '10:30 PM';
  }

  const isOpen = currentTime >= openTime && currentTime < closeTime;

  if (statusText && statusDot) {
    if (isOpen) {
      statusText.textContent = `Open Now • Closes ${closeFormatted}`;
      statusDot.classList.remove('closed');
    } else {
      statusText.textContent = 'Closed Now • Opens 7:30 AM';
      statusDot.classList.add('closed');
    }
  }

  if (cardHoursStatus) {
    if (isOpen) {
      cardHoursStatus.textContent = `● Open today until ${closeFormatted}`;
      cardHoursStatus.style.color = '#34d399';
    } else {
      cardHoursStatus.textContent = `○ Currently Closed (Opens at ${day === 0 ? '8:00 AM' : '7:30 AM'})`;
      cardHoursStatus.style.color = '#f87171';
    }
  }
}

/* ==========================================================================
   3. ARTISAN MENU SYSTEM
   ========================================================================== */
const MENU_ITEMS = [
  {
    id: 'm1',
    name: 'Sanctuary Velvet Cortado',
    category: 'coffee',
    price: 5.25,
    tags: ['House Blend', 'Signature'],
    desc: 'Equal parts velvety micro-foamed oat milk and double ristretto extracted from our Ethiopian heirloom beans.',
    flavor: 'Notes of dark cacao, candied orange & hazelnut'
  },
  {
    id: 'm2',
    name: 'Smoked Vanilla Honey Latte',
    category: 'coffee',
    price: 6.50,
    tags: ['Popular'],
    desc: 'Slow-steeped Madagascar bourbon vanilla beans, local raw wildflower honey, and espresso over silky textured milk.',
    flavor: 'Smooth, fragrant & delicately sweet'
  },
  {
    id: 'm3',
    name: 'Yirgacheffe Single-Origin Chemex',
    category: 'coffee',
    price: 6.00,
    tags: ['Single Origin'],
    desc: 'Artisanal manual pour-over showcasing floral jasmine aromatics, bright bergamot acidity, and crisp peach finish.',
    flavor: 'Light body, clean tea-like elegance'
  },
  {
    id: 'm4',
    name: 'Ceremonial Matcha Sparkling Tonic',
    category: 'tea',
    price: 6.75,
    tags: ['Signature', 'Vegan'],
    desc: 'First-harvest Uji ceremonial matcha hand-whisked to order over elderflower tonic water, fresh mint and lime zest.',
    flavor: 'Vibrant, effervescent & antioxidant-rich'
  },
  {
    id: 'm5',
    name: 'Blue Lotus & Jasmine Oolong',
    category: 'tea',
    price: 5.75,
    tags: ['Botanical'],
    desc: 'High mountain organic Taiwanese oolong scented with night-blooming jasmine flowers and sacred Egyptian blue lotus.',
    flavor: 'Silky, calming & deeply contemplative'
  },
  {
    id: 'm6',
    name: 'Wild Mountain Chamomile & Lavender',
    category: 'tea',
    price: 5.25,
    tags: ['Caffeine-Free', 'Organic'],
    desc: 'Whole sun-dried golden chamomile blossoms paired with French Provence lavender and dried lemon verbena.',
    flavor: 'Soothing floral nectar aroma'
  },
  {
    id: 'm7',
    name: 'Rose & Pistachio French Croissant',
    category: 'pastry',
    price: 5.50,
    tags: ['Fresh Baked', 'Popular'],
    desc: 'Laminated with cultured Normandy butter, filled with rosewater almond frangipane and crushed Sicilian pistachios.',
    flavor: 'Flaky layers with aromatic crunch'
  },
  {
    id: 'm8',
    name: 'Wild Mushroom & Truffle Tartine',
    category: 'pastry',
    price: 12.50,
    tags: ['Kitchen Special'],
    desc: 'Sautéed chanterelle and cremini mushrooms on toasted artisan country sourdough with cashew garlic cream.',
    flavor: 'Earthy, rich & comforting savory bite'
  },
  {
    id: 'm9',
    name: 'Fig & Vegan Chèvre Sourdough',
    category: 'pastry',
    price: 11.00,
    tags: ['Vegan', 'Gluten-Friendly'],
    desc: 'Mission black figs, creamy whipped almond chèvre, cracked black pepper, and balsamic pomegranate drizzle.',
    flavor: 'Sweet, tangy & decadent crunch'
  },
  {
    id: 'm10',
    name: 'The Painter’s Palette Flight',
    category: 'signatures',
    price: 14.50,
    tags: ['Atelier Special', 'Must Try'],
    desc: 'A curated flight of three mini-brews: Single-origin espresso, nitrogen cold brew with cream, and cold-steeped jasmine tonic.',
    flavor: 'Complete sensorial tasting journey'
  },
  {
    id: 'm11',
    name: 'Cardamom Espresso Affogato',
    category: 'signatures',
    price: 7.25,
    tags: ['Dessert Brew'],
    desc: 'Scoop of small-batch roasted hazelnut gelato drowned in a freshly pulled double shot spiced with toasted cardamom.',
    flavor: 'Hot espresso contrasting chilled velvet cream'
  },
  {
    id: 'm12',
    name: 'Golden Turmeric Velvet Elixir',
    category: 'signatures',
    price: 6.25,
    tags: ['Wellness', 'Vegan'],
    desc: 'Wild organic turmeric root, fresh ginger juice, cracked tellicherry pepper, and steamed oat milk with honey essence.',
    flavor: 'Warming, restorative & golden glow'
  }
];

function initArtisanMenu() {
  const grid = document.getElementById('menu-items-grid');
  const searchInput = document.getElementById('menu-search-input');
  const clearSearchBtn = document.getElementById('menu-search-clear');
  const categoryTabs = document.querySelectorAll('.category-tabs .tab-btn');

  let currentCategory = 'all';
  let searchQuery = '';

  function renderMenu() {
    if (!grid) return;

    const filtered = MENU_ITEMS.filter(item => {
      const matchesCategory = currentCategory === 'all' || item.category === currentCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery) ||
                            item.desc.toLowerCase().includes(searchQuery) ||
                            item.flavor.toLowerCase().includes(searchQuery);
      return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="menu-empty-state">
          <i data-lucide="coffee"></i>
          <h3>No matching items found</h3>
          <p>Try searching for terms like "latte", "croissant", "matcha", or explore another category.</p>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    grid.innerHTML = filtered.map(item => {
      const tagsHtml = item.tags.map(t => {
        let tagClass = 'dietary-tag';
        if (t.toLowerCase().includes('popular') || t.toLowerCase().includes('try')) tagClass += ' tag-popular';
        else if (t.toLowerCase().includes('vegan')) tagClass += ' tag-vegan';
        else if (t.toLowerCase().includes('gluten')) tagClass += ' tag-gf';
        else tagClass += ' tag-signature';
        return `<span class="${tagClass}">${t}</span>`;
      }).join('');

      return `
        <article class="menu-item-card" data-id="${item.id}">
          <div>
            <div class="menu-item-top">
              <div class="item-title-group">
                <h4>${item.name}</h4>
                <div class="item-dietary-tags">${tagsHtml}</div>
              </div>
              <span class="item-price">$${item.price.toFixed(2)}</span>
            </div>
            <p class="item-desc">${item.desc}</p>
          </div>
          <div class="menu-item-action">
            <span class="flavor-profile"><em>${item.flavor}</em></span>
            <button class="add-to-bag-btn" data-id="${item.id}" aria-label="Add ${item.name} to order bag">
              <i data-lucide="plus"></i> Add to Order
            </button>
          </div>
        </article>
      `;
    }).join('');

    if (window.lucide) window.lucide.createIcons();

    // Attach Add to Bag listeners
    grid.querySelectorAll('.add-to-bag-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        const item = MENU_ITEMS.find(m => m.id === id);
        if (item) {
          addToCart(item);
        }
      });
    });
  }

  // Category Tab Clicks
  categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      categoryTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentCategory = tab.getAttribute('data-category');
      renderMenu();
    });
  });

  // Search Input Handler
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      if (clearSearchBtn) {
        if (searchQuery.length > 0) {
          clearSearchBtn.classList.add('visible');
        } else {
          clearSearchBtn.classList.remove('visible');
        }
      }
      renderMenu();
    });
  }

  // Clear Search
  if (clearSearchBtn && searchInput) {
    clearSearchBtn.addEventListener('click', () => {
      searchInput.value = '';
      searchQuery = '';
      clearSearchBtn.classList.remove('visible');
      renderMenu();
      searchInput.focus();
    });
  }

  // Initial render
  renderMenu();
}

/* ==========================================================================
   4. SHOPPING ORDER BAG / CART SYSTEM
   ========================================================================== */
let cart = JSON.parse(localStorage.getItem('sanctuary_cart') || '[]');

function saveCart() {
  localStorage.setItem('sanctuary_cart', JSON.stringify(cart));
  updateCartUI();
}

function addToCart(item) {
  const existing = cart.find(ci => ci.id === item.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: item.id,
      name: item.name,
      price: item.price,
      qty: 1
    });
  }
  saveCart();
  showToast(`Added "${item.name}" to your order bag!`, 'success');

  // Badge bump animation
  const badge = document.getElementById('cart-count');
  if (badge) {
    badge.classList.remove('bump');
    void badge.offsetWidth; // trigger reflow
    badge.classList.add('bump');
  }
}

function updateCartUI() {
  const cartBadge = document.getElementById('cart-count');
  const drawerCount = document.getElementById('drawer-item-count');
  const container = document.getElementById('cart-items-container');
  const subtotalEl = document.getElementById('cart-subtotal');
  const taxEl = document.getElementById('cart-tax');
  const totalEl = document.getElementById('cart-grand-total');

  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
  if (cartBadge) cartBadge.textContent = totalCount;
  if (drawerCount) drawerCount.textContent = `(${totalCount} ${totalCount === 1 ? 'item' : 'items'})`;

  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty-message">
        <i data-lucide="coffee"></i>
        <h4>Your Bag is Empty</h4>
        <p>Explore our artisan drinks &amp; freshly baked treats to start your order.</p>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = '$0.00';
    if (taxEl) taxEl.textContent = '$0.00';
    if (totalEl) totalEl.textContent = '$0.00';
    if (window.lucide) window.lucide.createIcons();
    return;
  }

  let subtotal = 0;
  container.innerHTML = cart.map(item => {
    const itemTotal = item.price * item.qty;
    subtotal += itemTotal;
    return `
      <div class="cart-item" data-id="${item.id}">
        <div class="cart-item-details">
          <h5>${item.name}</h5>
          <span class="item-subprice">$${itemTotal.toFixed(2)} ($${item.price.toFixed(2)} ea)</span>
        </div>
        <div class="cart-item-controls">
          <button class="qty-btn dec-btn" data-id="${item.id}" aria-label="Decrease quantity">&minus;</button>
          <span class="item-qty">${item.qty}</span>
          <button class="qty-btn inc-btn" data-id="${item.id}" aria-label="Increase quantity">&plus;</button>
        </div>
      </div>
    `;
  }).join('');

  const tax = subtotal * 0.08;
  const grandTotal = subtotal + tax;

  if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  if (taxEl) taxEl.textContent = `$${tax.toFixed(2)}`;
  if (totalEl) totalEl.textContent = `$${grandTotal.toFixed(2)}`;

  // Attach controls
  container.querySelectorAll('.inc-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-id');
      const found = cart.find(ci => ci.id === id);
      if (found) {
        found.qty += 1;
        saveCart();
      }
    });
  });

  container.querySelectorAll('.dec-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-id');
      const idx = cart.findIndex(ci => ci.id === id);
      if (idx !== -1) {
        if (cart[idx].qty > 1) {
          cart[idx].qty -= 1;
        } else {
          cart.splice(idx, 1);
        }
        saveCart();
      }
    });
  });

  if (window.lucide) window.lucide.createIcons();
}

function initCartDrawer() {
  const openBtn = document.getElementById('open-cart-btn');
  const closeBtn = document.getElementById('close-cart-btn');
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-overlay');
  const checkoutBtn = document.getElementById('checkout-btn');
  const clearBtn = document.getElementById('clear-cart-btn');

  const openDrawer = () => {
    if (drawer) drawer.classList.add('open');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    if (drawer) drawer.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (openBtn) openBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (cart.length > 0) {
        cart = [];
        saveCart();
        showToast('Your order bag has been cleared.', 'info');
      }
    });
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (cart.length === 0) {
        showToast('Your bag is currently empty!', 'info');
        return;
      }
      closeDrawer();
      showToast('Order received! Our barista will prepare your selection shortly.', 'success');
      cart = [];
      saveCart();
    });
  }

  // Initial cart load
  updateCartUI();
}

/* ==========================================================================
   5. ART GALLERY & LIGHTBOX
   ========================================================================== */
function initArtGallery() {
  const filterPills = document.querySelectorAll('.gallery-filters .filter-pill');
  const artCards = document.querySelectorAll('.art-card');
  const modal = document.getElementById('art-modal');
  const closeBtn = document.getElementById('close-art-modal-btn');
  const modalImg = document.getElementById('modal-art-img');
  const modalTitle = document.getElementById('modal-art-title');
  const modalArtist = document.getElementById('modal-art-artist');
  const modalPrice = document.getElementById('modal-art-price');
  const modalCategory = document.getElementById('modal-art-category');
  const inquireBtn = document.getElementById('inquire-art-btn');
  const shareBtn = document.getElementById('share-art-btn');
  const artistSubmitBtn = document.getElementById('artist-submit-btn');

  // Filter functionality
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const filter = pill.getAttribute('data-filter');

      artCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Modal open
  artCards.forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img');
      const title = card.querySelector('.art-title')?.textContent || '';
      const artist = card.querySelector('.art-artist')?.textContent || '';
      const price = card.querySelector('.art-price')?.textContent || '';
      const category = card.querySelector('.art-category')?.textContent || 'Original Artwork';

      if (modalImg) modalImg.src = img.src;
      if (modalTitle) modalTitle.textContent = title;
      if (modalArtist) modalArtist.textContent = artist;
      if (modalPrice) modalPrice.textContent = price;
      if (modalCategory) modalCategory.textContent = category;

      if (modal && typeof modal.showModal === 'function') {
        modal.showModal();
      }
    });
  });

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => modal.close());
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.close();
    });
  }

  if (inquireBtn) {
    inquireBtn.addEventListener('click', () => {
      const title = modalTitle?.textContent || 'artwork';
      showToast(`Inquiry initiated for "${title}". Our curator will reach out!`, 'success');
      modal.close();
    });
  }

  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      navigator.clipboard?.writeText(window.location.href);
      showToast('Artwork exhibition link copied to clipboard!', 'info');
    });
  }

  if (artistSubmitBtn) {
    artistSubmitBtn.addEventListener('click', () => {
      showToast('Portfolio portal open: email submissions to curator@sanctuarycafe.art', 'info');
    });
  }
}

/* ==========================================================================
   6. THE INTERACTIVE "HUG WALL" VIRTUAL BOARD
   ========================================================================== */
const DEFAULT_NOTES = [
  {
    id: 1,
    author: 'Clara & Matteo',
    message: 'Welcome home. May this space wrap around you like a warm cup on a misty morning.',
    color: 'amber',
    date: 'Staff'
  },
  {
    id: 2,
    author: 'Julian M.',
    message: 'To anyone having a heavy week: you are doing better than you realize. Take a deep breath.',
    color: 'terracotta',
    date: 'Yesterday'
  },
  {
    id: 3,
    author: 'Anonymous Artist',
    message: 'There are no mistakes on a canvas, only joyful accidents waiting for brushstrokes.',
    color: 'sage',
    date: '2 days ago'
  },
  {
    id: 4,
    author: 'Leila K.',
    message: 'Coffee first, poetry second, worry never. Sending so much love to whoever reads this!',
    color: 'creamy',
    date: '3 days ago'
  }
];

function initHugWall() {
  const form = document.getElementById('hug-note-form');
  const board = document.getElementById('hug-board-display');
  const charCount = document.getElementById('hug-char-count');
  const messageInput = document.getElementById('hug-message');

  // Load saved notes from localStorage or fallback
  let notes = JSON.parse(localStorage.getItem('sanctuary_hug_notes') || 'null');
  if (!notes || notes.length === 0) {
    notes = DEFAULT_NOTES;
  }

  function renderNotes() {
    if (!board) return;
    board.innerHTML = notes.map((note, idx) => {
      // Natural organic tilt variation between -3 and +3 deg
      const rotations = [-2.5, 1.8, -1.2, 2.7, -3.1, 1.5, -0.8];
      const rot = rotations[idx % rotations.length];

      return `
        <div class="sticky-note note-${note.color}" style="transform: rotate(${rot}deg);">
          <div class="sticky-pin"></div>
          <p class="note-text">“${escapeHtml(note.message)}”</p>
          <div class="note-footer">
            <span class="note-author">— ${escapeHtml(note.author)}</span>
            <span class="note-date">${note.date}</span>
          </div>
        </div>
      `;
    }).join('');
  }

  // Character counter
  if (messageInput && charCount) {
    messageInput.addEventListener('input', () => {
      const remaining = 160 - messageInput.value.length;
      charCount.textContent = `${remaining} characters remaining`;
    });
  }

  // Note submission
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const author = document.getElementById('hug-author').value.trim();
      const message = messageInput.value.trim();
      const colorOpt = form.querySelector('input[name="noteColor"]:checked');
      const color = colorOpt ? colorOpt.value : 'amber';

      if (!author || !message) return;

      const newNote = {
        id: Date.now(),
        author: author,
        message: message,
        color: color,
        date: 'Just now'
      };

      notes.unshift(newNote); // Put at front
      localStorage.setItem('sanctuary_hug_notes', JSON.stringify(notes));

      renderNotes();
      form.reset();
      if (charCount) charCount.textContent = '160 characters remaining';

      showToast('Your warm note has been pinned to the Hug Wall!', 'success');
    });
  }

  renderNotes();
}

/* ==========================================================================
   7. WORKSHOPS SELECTOR
   ========================================================================== */
function initWorkshops() {
  const sessionBtns = document.querySelectorAll('.select-session-btn');
  const resExpSelect = document.getElementById('res-experience');
  const resNotes = document.getElementById('res-notes');
  const reservationSection = document.getElementById('reservation');

  sessionBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const sessionTitle = e.currentTarget.getAttribute('data-title');
      if (resExpSelect) {
        resExpSelect.value = 'sip-paint';
      }
      if (resNotes) {
        resNotes.value = `Selected Session: ${sessionTitle}. (Complimentary drink requested).`;
      }
      if (reservationSection) {
        reservationSection.scrollIntoView({ behavior: 'smooth' });
      }
      showToast(`Selected "${sessionTitle}". Finalize your guest details below!`, 'info');
    });
  });
}

/* ==========================================================================
   8. RESERVATION SYSTEM
   ========================================================================== */
function initReservationSystem() {
  const form = document.getElementById('reservation-form');
  const dateInput = document.getElementById('res-date');
  const modal = document.getElementById('res-confirmation-modal');
  const closeBtn = document.getElementById('close-res-confirm-btn');

  // Set min date to today
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    dateInput.value = today;
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('res-name').value.trim();
      const email = document.getElementById('res-email').value.trim();
      const expSelect = document.getElementById('res-experience');
      const expText = expSelect.options[expSelect.selectedIndex].text;
      const guests = document.getElementById('res-guests').value;
      const date = dateInput.value;
      const timeSelect = document.getElementById('res-time');
      const timeText = timeSelect.options[timeSelect.selectedIndex].text;

      if (!name || !email || !date) {
        showToast('Please complete all required fields.', 'info');
        return;
      }

      // Populate confirmation ticket
      const randomRef = '#SNC-' + Math.floor(1000 + Math.random() * 9000);
      document.getElementById('ticket-ref').textContent = randomRef;
      document.getElementById('ticket-name').textContent = name;
      document.getElementById('ticket-exp').textContent = expText;
      document.getElementById('ticket-datetime').textContent = `${formatDate(date)} at ${timeText.split(' ')[0]}`;
      document.getElementById('ticket-guests').textContent = `${guests} ${guests === '1' ? 'Guest' : 'Guests'}`;

      if (modal && typeof modal.showModal === 'function') {
        modal.showModal();
      }

      form.reset();
      if (dateInput) {
        dateInput.value = new Date().toISOString().split('T')[0];
      }
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => modal.close());
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.close();
    });
  }
}

/* ==========================================================================
   9. NEWSLETTER SUBSCRIPTION
   ========================================================================== */
function initNewsletter() {
  const form = document.getElementById('newsletter-form');
  const input = document.getElementById('newsletter-email');

  if (form && input) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = input.value.trim();
      if (email) {
        showToast('Welcome to the Sanctuary Atelier Club! Check your inbox for $5 off.', 'success');
        form.reset();
      }
    });
  }
}

/* ==========================================================================
   HELPER UTILITIES
   ========================================================================== */
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  const iconName = type === 'success' ? 'check-circle' : 'info';
  toast.innerHTML = `
    <i data-lucide="${iconName}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  if (window.lucide) window.lucide.createIcons();

  setTimeout(() => {
    toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 400);
  }, 4200);
}

function formatDate(dateStr) {
  try {
    const parts = dateStr.split('-');
    const date = new Date(parts[0], parts[1] - 1, parts[2]);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch (err) {
    return dateStr;
  }
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
