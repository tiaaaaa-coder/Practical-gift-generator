
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
  const database = {
    tech: {
      low: [
        'USB Flash Drive', 'Phone Stand', 'Cable Organizer', 'Screen Cleaner Kit',
        'Laptop Sleeve', 'Webcam Cover', 'Cable Ties Set', 'Phone Ring Holder',
        'Screen Protector', 'Earphone Case', 'Mini Flashlight', 'Bluetooth Tracker'
      ],
      medium: [
        'Wireless Mouse', 'Bluetooth Speaker', 'Portable Charger', 'LED Desk Light',
        'Mechanical Keyboard Keycaps', 'USB-C Hub', 'Wireless Charging Pad',
        'Noise Cancelling Earbuds', 'Smart Home Plug', 'Digital Photo Frame',
        'Fitness Tracker Band', 'Tablet Stylus', 'Portable SSD 256GB'
      ],
      high: [
        'Smart Watch', 'Wireless Earbuds Pro', 'Mechanical Keyboard', 'Tablet Stand',
        'Noise Cancelling Headphones', 'Smart Display', 'Robot Vacuum',
        'Gaming Mouse', '4K Webcam', 'Smart Doorbell', 'Drone',
        'VR Headset', 'Smart Thermostat', 'Electric Standing Desk'
      ]
    },
    study: {
      low: [
        'Notebook', 'Planner', 'Pen Set', 'Sticky Notes Kit',
        'Highlighters Pack', 'Index Cards', 'Binder Clips Set', 'Ruler Set',
        'Pencil Case', 'Erasers Pack', 'Bookmark Set', 'Paper Clips'
      ],
      medium: [
        'Desk Lamp', 'Whiteboard', 'Book Stand', 'Study Timer',
        'Laptop Stand', 'Document Organizer', 'Noise Cancelling Earplugs',
        'Adjustable Book Light', 'Desk Organizer Set', 'Scientific Calculator',
        'Label Maker', 'Portable Scanner', 'Digital Notebook'
      ],
      high: [
        'Noise Cancelling Headphones', 'Ergonomic Chair Cushion', 'Standing Desk Converter',
        'Digital Drawing Tablet', 'Smart Pen', 'E-Reader',
        'Portable Monitor', 'Document Camera', 'Smart Notebook',
        'Ergonomic Keyboard', 'Blue Light Glasses Premium', 'Air Purifier'
      ]
    },
    selfcare: {
      low: [
        'Coffee Mug', 'Water Bottle', 'Scented Candle', 'Key Organizer',
        'Lip Balm Set', 'Hand Cream', 'Sleep Mask', 'Bath Bombs',
        'Face Mask Set', 'Essential Oil Roller', 'Journal', 'Stress Ball'
      ],
      medium: [
        'Yoga Mat', 'Aroma Diffuser', 'Tea Set', 'Indoor Plant',
        'Weighted Blanket', 'Foam Roller', 'Meditation Cushion',
        'Skincare Set', 'Massage Pillow', 'Foot Spa', 'Hair Care Kit',
        'Bathrobe', 'Sleep Sound Machine'
      ],
      high: [
        'Fitness Tracker', 'Massage Gun', 'Smart Water Bottle', 'Spa Gift Card',
        'Smart Scale', 'Air Purifier', 'Sun Lamp',
        'Smart Sleep Tracker', 'Premium Skincare Device', 'Infrared Sauna Blanket',
        'Electric Toothbrush Premium', 'Hair Styling Tool Set'
      ]
    },
    home: {
      low: [
        'Kitchen Timer', 'Measuring Cup Set', 'Mini Storage Boxes', 'Coasters Set',
        'Dish Soap Dispenser', 'Sponge Holder', 'Reusable Food Wraps', 'Herb Scissors',
        'Jar Opener', 'Sink Strainer', 'Cabinet Hooks', 'Drawer Organizers'
      ],
      medium: [
        'Electric Kettle', 'Desk Organizer', 'Bedside Lamp', 'Throw Blanket',
        'Coffee Maker', 'Toaster Oven', 'Blender', 'Rice Cooker',
        'Robot Vacuum Mop', 'Smart Light Bulbs Set', 'Essential Oil Diffuser',
        'Cookware Set', 'Bedding Set', 'Towel Set'
      ],
      high: [
        'Air Fryer', 'Robot Vacuum', 'Smart Light System', 'Espresso Machine',
        'Smart Refrigerator', 'Instant Pot Duo', 'Stand Mixer',
        'Smart Thermostat', 'Security Camera System', 'Smart Lock',
        'Air Purifier Pro', 'Indoor Garden System', 'Smart Mirror'
      ]
    },
    fashion: {
      low: [
        'Scarf', 'Cap', 'Bracelet', 'Socks Set',
        'Hair Accessories Set', 'Tote Bag', 'Sunglasses Case', 'Keychain',
        'Pocket Square', 'Tie Clip', 'Fashion Mask', 'Phone Lanyard'
      ],
      medium: [
        'Leather Wallet', 'Handbag', 'Sunglasses', 'Belt',
        'Watch', 'Jewelry Set', 'Leather Gloves', 'Crossbody Bag',
        'Silk Scarf', 'Beanie Set', 'Card Holder', 'Travel Organizer'
      ],
      high: [
        'Designer Watch', 'Luxury Perfume', 'Premium Sunglasses', 'Leather Bag',
        'Designer Scarf', 'Gold Jewelry', 'Smart Ring',
        'Luxury Wallet', 'Cashmere Sweater', 'Designer Belt',
        'Premium Leather Jacket', 'Smart Glasses'
      ]
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

};

const icon = categoryIcons[currentSelection.category] || '🎁';
const name = this.createElement('strong', 'gift-name', `${icon} ${gift}`);
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
