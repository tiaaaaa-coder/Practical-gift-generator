// ==========================
// Gift Database
// ==========================
const gifts = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 120,
    occasion: ["Birthday", "Graduation"],
    for: ["Male", "Female"],
  },
  {
    id: 2,
    name: "Coffee Mug",
    category: "Home",
    price: 20,
    occasion: ["Birthday"],
    for: ["All"],
  },
  {
    id: 3,
    name: "Smart Watch",
    category: "Electronics",
    price: 250,
    occasion: ["Fitness"],
    for: ["Male", "Female"],
  }
];

// ==========================
// Filter Function
// ==========================
function findGifts(maxPrice, occasion, person) {
  return gifts.filter(gift =>
    gift.price <= maxPrice &&
    gift.occasion.includes(occasion) &&
    (gift.for.includes(person) || gift.for.includes("All"))
  );
}

// Make function available globally
window.findGifts = findGifts;
