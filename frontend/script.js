function generateGift() {

const gifts = [
"Portable charger",
"Coffee mug",
"Notebook",
"Bluetooth speaker",
"Desk lamp"
];

let randomGift = gifts[Math.floor(Math.random() * gifts.length)];

document.getElementById("result").innerText = randomGift;

}
