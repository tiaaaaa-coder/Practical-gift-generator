
/**
 * Practical Gift Generator
 * SWE332 Software Architecture Project
 */

// CONFIGURATION (Maintainability)
const APP_CONFIG = {
  storageKey: 'giftFavorites',
  version: '1.0.0'
};

// DATABASE MODULE (Singleton Pattern)
// Single source of truth for gift data
const GiftDatabase = (function() {
  // Private data - encapsulated
  const database = {
    tech: {
      low: ['USB Flash Drive', 'Phone Stand', 'Cable Organizer', 'Screen Cleaner Kit'],
      medium: ['Wireless Mouse', 'Bluetooth Speaker', 'Portable Charger', 'LED Desk Light'],
      high: ['Smart Watch', 'Wireless Earbuds', 'Mechanical Keyboard', 'Tablet Stand']
    },
    study: {
      low: ['Notebook', 'Planner', 'Pen Set', 'Sticky Notes Kit'],
      medium: ['Desk Lamp', 'Whiteboard', 'Book Stand', 'Study Timer'],
      high: ['Noise Cancelling Headphones', 'Ergonomic Chair Cushion', 'Standing Desk Converter']
    },
    selfcare: {
      low: ['Coffee Mug', 'Water Bottle', 'Scented Candle', 'Key Organizer'],
      medium: ['Yoga Mat', 'Aroma Diffuser', 'Tea Set', 'Indoor Plant'],
      high: ['Fitness Tracker', 'Massage Gun', 'Smart Water Bottle', 'Spa Gift Card']
    },
    home: {
      low: ['Kitchen Timer', 'Measuring Cup Set', 'Mini Storage Boxes', 'Coasters Set'],
      medium: ['Electric Kettle', 'Desk Organizer', 'Bedside Lamp', 'Throw Blanket'],
      high: ['Air Fryer', 'Robot Vacuum', 'Smart Light System', 'Espresso Machine']
    },
    fashion: {
      low: ['Scarf', 'Cap', 'Bracelet', 'Socks Set'],
      medium: ['Leather Wallet', 'Handbag', 'Sunglasses', 'Belt'],
      high: ['Designer Watch', 'Luxury Perfume', 'Premium Sunglasses', 'Leather Bag']
    }
  };

  // Public API
  return {
    getGifts: (category, budget) => database[category]?.[budget] || null,
    getAllCategories: () => Object.keys(database),
    validateCategory: (cat) => database.hasOwnProperty(cat),
    validateBudget: (cat, bud) => database[cat]?.hasOwnProperty(bud) || false
  };
})();

// FAVORITES MANAGER (Data Persistence)

const FavoritesManager = {
  getAll() {
    try {
      return JSON.parse(localStorage.getItem(APP_CONFIG.storageKey)) || [];
    } catch (e) {
      console.error('Storage error:', e);
      return [];
    }
  },

  save(giftData) {
    const favorites = this.getAll();
    
    // Duplicate check
    if (favorites.some(f => f.gift === giftData.gift)) {
      return { success: false, message: 'Already saved' };
    }
    
    favorites.push({
      ...giftData,
      id: Date.now(),
      savedAt: new Date().toLocaleDateString()
    });
    
    localStorage.setItem(APP_CONFIG.storageKey, JSON.stringify(favorites));
    return { success: true, message: 'Saved!' };
  },

  remove(id) {
    const filtered = this.getAll().filter(f => f.id !== id);
    localStorage.setItem(APP_CONFIG.storageKey, JSON.stringify(filtered));
  },

  clear() {
    localStorage.removeItem(APP_CONFIG.storageKey);
  }
};


// UI FACTORY (Factory Pattern)
// Creates DOM elements consistently
const UIFactory = {
  createElement(tag, className, text) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text) el.textContent = text;
    return el;
  },

  createGiftCard(gift, occasion) {
    const messages = {
      birthday: '🎂 Perfect birthday gift: ',
      graduation: '🎓 Great graduation gift: ',
      holiday: '🎄 Holiday gift idea: ',
      general: '🎁 Recommended gift: '
    };

    const container = this.createElement('div', 'gift-result-container');
    const badge = this.createElement('span', 'occasion-badge', messages[occasion] || messages.general);
    const name = this.createElement('strong', 'gift-name', gift);
    
    container.appendChild(badge);
    container.appendChild(name);
    return container;
  },

  createFavoriteCard(favorite, onRemove) {
    const card = this.createElement('div', 'favorite-card');
    card.innerHTML = `
      <div class="fav-info">
        <strong>${favorite.gift}</strong>
        <small>${favorite.category} • ${favorite.budget} • ${favorite.savedAt}</small>
      </div>
    `;
    
    const removeBtn = this.createElement('button', 'btn-remove', '🗑️');
    removeBtn.onclick = () => onRemove(favorite.id);
    card.appendChild(removeBtn);
    
    return card;
  }
};

// Store current selection for favorites
let currentSelection = null;

function generateGift(event) {  
  event.preventDefault();
  
  const category = document.getElementById('category').value;
  const budget = document.getElementById('budget').value;
  const occasion = document.getElementById('occasion').value;
  const result = document.getElementById('giftResult');

  result.innerHTML = '';
  
  // Validation with specific errors
  if (!category || !budget || !occasion) {
    result.innerHTML = '<p class="error">⚠️ Please complete all fields</p>';
    return;
  }

  // Use Database Module
  const gifts = GiftDatabase.getGifts(category, budget);
  
  if (!gifts) {
    result.innerHTML = '<p class="error">❌ No gifts found for this selection</p>';
    return;
  }

  const randomGift = gifts[Math.floor(Math.random() * gifts.length)];
  
  // Save for favorites feature
  currentSelection = { gift: randomGift, category, budget, occasion };

  // Use Factory to create display
  const giftCard = UIFactory.createGiftCard(randomGift, occasion);
  result.appendChild(giftCard);

  // Add action buttons
  addActionButtons(result, randomGift);
}

// ACTION BUTTONS (Enhanced Regenerate + Favorites)
function addActionButtons(container, gift) {
  const wrapper = UIFactory.createElement('div', 'action-buttons');
  
  // Save button (FEATURE)
  const favBtn = UIFactory.createElement('button', 'btn-favorite', '❤️ Save');
  favBtn.onclick = () => {
    if (!currentSelection) return;
    const result = FavoritesManager.save(currentSelection);
    favBtn.textContent = result.success ? '✓ Saved!' : '⚠️ Exists';
    setTimeout(() => favBtn.textContent = '❤️ Save', 1500);
  };
  
  // Regenerate button
  const regenBtn = UIFactory.createElement('button', 'btn-regenerate', '🔄 New Gift');
  regenBtn.onclick = () => generateGift({ preventDefault: () => {} });
  
  wrapper.appendChild(favBtn);
  wrapper.appendChild(document.createElement('br'));
  wrapper.appendChild(regenBtn);
  container.appendChild(wrapper);
}

// VIEW FAVORITES (Global function for HTML)
function showFavorites() {
  const result = document.getElementById('giftResult');
  const favorites = FavoritesManager.getAll();
  
  result.innerHTML = '<h3>❤️ Your Favorites</h3>';
  
  if (favorites.length === 0) {
    result.innerHTML += '<p>No favorites saved yet</p>';
    return;
  }

  favorites.forEach(fav => {
    const card = UIFactory.createFavoriteCard(fav, (id) => {
      FavoritesManager.remove(id);
      showFavorites(); // Refresh
    });
    result.appendChild(card);
  });

  // Clear all button
  const clearBtn = UIFactory.createElement('button', 'btn-clear', 'Clear All');
  clearBtn.onclick = () => {
    if (confirm('Remove all?')) {
      FavoritesManager.clear();
      showFavorites();
    }
  };
  result.appendChild(clearBtn);
}

// INITIALIZATION (Observer Pattern)
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('giftForm');
  if (form) {
    form.addEventListener('submit', generateGift);
    console.log('Gift Generator v' + APP_CONFIG.version + ' loaded');
  }
});
