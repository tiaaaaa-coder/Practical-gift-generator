function generateGift(event) {  
  event.preventDefault();        
const category = document.getElementById("category").value;
const budget = document.getElementById("budget").value;
const occasion = document.getElementById("occasion").value;
const result = document.getElementById("giftResult");
}
/* Gift Database */

const gifts = {

tech: {

low: ["USB Flash Drive", "Phone Stand", "Cable Organizer", "Screen Cleaner Kit"],
medium: ["Wireless Mouse", "Bluetooth Speaker", "Portable Charger", "LED Desk Light"],
high: ["Smart Watch", "Wireless Earbuds", "Mechanical Keyboard", "Tablet Stand"]

},

study: {

  low: ["Notebook", "Planner", "Pen Set", "Sticky Notes Kit"],
  medium: ["Desk Lamp", "Whiteboard", "Book Stand", "Study Timer"],
  high: ["Noise Cancelling Headphones", "Ergonomic Chair Cushion", "Standing Desk Converter"]

},

 selfcare: {
      low: ["Coffee Mug", "Water Bottle", "Scented Candle", "Key Organizer"],
      medium: ["Yoga Mat", "Aroma Diffuser", "Tea Set", "Indoor Plant"],
      high: ["Fitness Tracker", "Massage Gun", "Smart Water Bottle", "Spa Gift Card"]
    },
 home: {
      low: ["Kitchen Timer", "Measuring Cup Set", "Mini Storage Boxes", "Coasters Set"],
      medium: ["Electric Kettle", "Desk Organizer", "Bedside Lamp", "Throw Blanket"],
      high: ["Air Fryer", "Robot Vacuum", "Smart Light System", "Espresso Machine"]
    },
 fashion: {
      low: ["Scarf", "Cap", "Bracelet", "Socks Set"],
      medium: ["Leather Wallet", "Handbag", "Sunglasses", "Belt"],
      high: ["Designer Watch", "Luxury Perfume", "Premium Sunglasses", "Leather Bag"]
    }
  };


/* Check if category exists */

if(!gifts[category]){

result.innerText = "Category not found.";
return;

}


/* Check if budget exists */

if(!gifts[category][budget]){

result.innerText = "No gifts available for this budget.";
return;

}
 const options = gifts[category][budget];
  const randomIndex = Math.floor(Math.random() * options.length);
  const randomGift = options[randomIndex];

/* Occasion message */

let message = "";

if(occasion === "birthday"){
message = "🎂 Perfect birthday gift: ";
}
else if(occasion === "graduation"){
message = "🎓 Great graduation gift: ";
}
else if(occasion === "holiday"){
message = "🎄 Holiday gift idea: ";
}
else{
message = "🎁 Recommended gift: ";
}

  // Create container
  const container = document.createElement('div');
  container.className = 'gift-result-container';
  
  // Create message element
  const messageSpan = document.createElement('span');
  messageSpan.textContent = message;
  
  // Create gift element (bold)
  const giftStrong = document.createElement('strong');
  giftStrong.textContent = randomGift;
  
  // Assemble
  container.appendChild(messageSpan);
  container.appendChild(giftStrong);
  result.appendChild(container);
  
  // "Generate Another" button
  addRegenerateButton(result, category, budget, occasion);
}

// ============================================
// "Try Again" functionality
// ============================================
function addRegenerateButton(container, category, budget, occasion) {
  const btn = document.createElement('button');
  btn.textContent = '🔄 Generate Another';
  btn.className = 'regenerate-btn';
  btn.style.marginTop = '10px';
  btn.onclick = function() {
    // Create fake event object
    const fakeEvent = { preventDefault: () => {} };
    generateGift(fakeEvent);
  };
  container.appendChild(document.createElement('br'));
  container.appendChild(btn);
}

// ============================================
// EVENT LISTENER SETUP 
// ============================================
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('giftForm');
  
  if (form) {
    form.addEventListener('submit', generateGift);
  } else {
    console.error("Gift form not found!");
  }
});

