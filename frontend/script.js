function generateGift() {

let category = document.getElementById("category").value;
let budget = document.getElementById("budget").value;
let occasion = document.getElementById("occasion").value;
let result = document.getElementById("giftResult");


/* Gift Database */

let gifts = {

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

lifestyle: {

low: ["Coffee Mug", "Water Bottle", "Scented Candle", "Key Organizer"],

medium: ["Yoga Mat", "Aroma Diffuser", "Tea Set", "Indoor Plant"],

high: ["Fitness Tracker", "Massage Gun", "Smart Water Bottle"]

},

home: {

low: ["Kitchen Timer", "Measuring Cup Set", "Mini Storage Boxes"],

medium: ["Electric Kettle", "Desk Organizer", "Bedside Lamp"],

high: ["Air Fryer", "Robot Vacuum", "Smart Light System"]

},

fashion: {

low: ["Scarf", "Cap", "Bracelet"],

medium: ["Leather Wallet", "Handbag", "Sunglasses"],

high: ["Designer Watch", "Luxury Perfume"]

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


/* Get options */

let options = gifts[category][budget];


/* Random recommendation */

let randomGift = options[Math.floor(Math.random() * options.length)];


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


/* Display result */

result.innerHTML = message + "<strong>" + randomGift + "</strong>";

}
