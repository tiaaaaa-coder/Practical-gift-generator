function generateGift(){

let category = document.getElementById("category").value;
let budget = document.getElementById("budget").value;

let gifts = {

tech: {
low: ["USB drive", "Phone stand", "Portable charger"],
medium: ["Bluetooth speaker", "Wireless mouse"]
},

study: {
low: ["Notebook", "Planner", "Pens set"],
medium: ["Desk lamp", "Whiteboard"]
},

lifestyle: {
low: ["Coffee mug", "Water bottle"],
medium: ["Yoga mat", "Aroma diffuser"]
}

};

let options = gifts[category][budget];
let randomGift = options[Math.floor(Math.random()*options.length)];

document.getElementById("result").innerText = randomGift;

}
