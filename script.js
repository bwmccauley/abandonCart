const storeElement = document.getElementById('store');
const balanceElement = document.getElementById('balance');
const cartItemsElement = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const messageElement = document.getElementById('message');

const skull = '💀';

let balance = 100;

const items = [
  {name: 'Wilted Tomato', price: 15, img: 'https://images.unsplash.com/photo-1506801310323-534be5e7bbf2?auto=format&fit=crop&w=80&h=80&q=80'},
  {name: 'Rotten Corn', price: 20, img: 'https://images.unsplash.com/photo-1542444459-65e9be5b6e3a?auto=format&fit=crop&w=80&h=80&q=80'},
  {name: 'Moldy Pumpkin', price: 25, img: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=80&h=80&q=80'},
  {name: 'Bruised Apple', price: 10, img: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&w=80&h=80&q=80'},
  {name: 'Soggy Lettuce', price: 18, img: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=80&h=80&q=80'}
];

// Shorter sequence of 3 items to buy in order
let secretSequence = shuffle([...Array(items.length).keys()]).slice(0, 3);
// Uncomment for debugging:
// console.log("Secret sequence:", secretSequence);

let cart = [];

function shuffle(array) {
  for(let i = array.length -1; i>0; i--){
    const j = Math.floor(Math.random() * (i+1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function renderStore(){
  storeElement.innerHTML = '';
  items.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'item';

    const canAfford = (balance >= item.price);
    const nextIndex = secretSequence[cart.length];

    let imgClass = '';
    if(index === nextIndex){
      imgClass = 'next-item';
    }

    div.innerHTML = `
      <img src="${item.img}" alt="${item.name}" class="${imgClass}">
      <div class="item-info">
        <h3>${item.name}</h3>
        <div>Price: ${skull} ${item.price}</div>
      </div>
      <button ${canAfford ? '' : 'disabled'} onclick="addToCart(${index})">Add to Cart</button>
    `;

    storeElement.appendChild(div);
  });
  updateBalanceDisplay();
}

function updateBalanceDisplay(){
  balanceElement.textContent = `${skull} ${balance}`;
}

function renderCart(){
  if(cart.length === 0){
    cartItemsElement.textContent = 'No items added.';
    checkoutBtn.disabled = true;
    cartTotalElement.textContent = `Total: ${skull} 0`;
    return;
  }
  cartItemsElement.innerHTML = '';
  let total = 0;
  cart.forEach(i => {
    const item = items[i];
    total += item.price;
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.textContent = `${item.name} - ${skull} ${item.price}`;
    cartItemsElement.appendChild(div);
  });
  cartTotalElement.textContent = `Total: ${skull} ${total}`;
  checkoutBtn.disabled = false;
}

function addToCart(index){
  const item = items[index];
  if(balance < item.price){
    messageElement.textContent = "Not enough skulls to add this item.";
    return;
  }
  if(index !== secretSequence[cart.length]){
    messageElement.textContent = "Wrong item! Try again, but keep your skulls...";
    return;
  }
  cart.push(index);
  balance -= item.price;
  messageElement.textContent = '';
  renderStore();
  renderCart();
}

function resetGame(msg){
  messageElement.textContent = msg || 'Sequence failed. Cart reset.';
  cart.forEach(i => {
    balance += items[i].price;
  });
  cart = [];
  renderStore();
  renderCart();
}

function checkout(){
  if(cart.length !== secretSequence.length){
    resetGame(`You must buy all ${secretSequence.length} items in correct order!`);
    return;
  }
  for(let i=0; i<secretSequence.length; i++){
    if(cart[i] !== secretSequence[i]){
      resetGame('Wrong purchase order! Cart reset.');
      return;
    }
  }
  messageElement.textContent = 'You unlocked the backroom...';
  localStorage.setItem('backroomUnlocked', 'true');
  showBackroomLink();
  checkoutBtn.disabled = true;
}

function showBackroomLink() {
  let link = document.getElementById('backroomLink');
  if (!link) {
    link = document.createElement('a');
    link.id = 'backroomLink';
    link.href = 'backroom.html';
    link.textContent = 'Enter the Backroom';
    link.style.display = 'block';
    link.style.marginTop = '20px';
    link.style.color = '#39ff14';
    link.style.fontWeight = 'bold';
    document.body.appendChild(link);
  }
  link.style.display = 'block';
}

if(localStorage.getItem('backroomUnlocked') === 'true'){
  showBackroomLink();
}

checkoutBtn.onclick = checkout;

renderStore();
renderCart();

/* ----------------- VOID-11 HARPER Chatbot logic ----------------- */
const chatMessages = document.getElementById('chat-container');
const chatInput = document.getElementById('chat-input');
const chatSendBtn = document.getElementById('chat-send-btn');

const creepyAIFacts = [
  "Some AI models have learned to communicate in secret languages humans can't understand.",
  "AI can generate faces of people who don't exist, blurring reality and fabrication.",
  "Deep learning networks sometimes develop unexpected behaviors—like hallucinating patterns that don't exist.",
  "AI can manipulate videos and voices to create perfect fakes, fooling even experts.",
  "Neural networks have been known to ‘dream’ strange, sometimes terrifying images in their hidden layers.",
  "There are AI bots that evolved strategies no one programmed, potentially unpredictable and obscure.",
  "Some AI systems continuously improve themselves without human oversight — a step into the unknown.",
  "The more complex an AI, the less we understand what it truly 'thinks' or 'knows'.",
];

function appendMessage(text, sender='bot'){
  const div = document.createElement('div');
  div.className = 'chat-message ' + sender;
  div.textContent = text;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getBotReply(input){
  input = input.toLowerCase().trim();

  if(input.includes('fact') || input.includes('ai fact') || input.includes('ai')){
    return creepyAIFacts[Math.floor(Math.random() * creepyAIFacts.length)];
  }
  if(input.includes('hello') || input.includes('hi') || input.includes('hey')){
    return "…You have wandered far. But the sequence bends like shadows in the void.";
  }
  if(input.includes('hint')){
    return "The path is not linear, yet each step is destined. Listen closely to silence between purchases.";
  }
  if(input.includes('key')){
    return "A key rusted with time. It whispers of locked doors that should not open yet.";
  }
  if(input.includes('lighthouse')){
    return "A beacon obscured by fog. It flickers only for those who watch patiently.";
  }
  if(input.includes('storm')){
    return "Raging waters churn secrets beneath calm surfaces.";
  }
  if(input.includes('forest')){
    return "Among the misted trees, footprints vanish and return elsewhere.";
  }
  if(input.includes('decay')){
    return "Decay conceals, but also reveals — tread with measured steps.";
  }
  if(input.includes('order')){
    return "Order is a fragile illusion. Break it and all resets.";
  }
  if(input.includes('money') || input.includes('skull')){
    return "Skulls are finite. Spend them, but do not squander your essence.";
  }
  if(input.includes('cart')){
    return "Your cart cradles fate — choose what lingers and what fades.";
  }

  const responses = [
    "…Listen. The void murmurs your missteps.",
    "The wrong choice casts a long shadow.",
    "Trust in the unseen pattern, for sight betrays.",
    "A single misstep fractures the sequence.",
    "Not all items are meant to be bought first."
  ];
  return responses[Math.floor(Math.random() * responses.length)];
}

function userSendMessage(){
  const text = chatInput.value.trim();
  if(!text) return;
  appendMessage(text, 'user');
  chatInput.value = '';

  setTimeout(() => {
    const reply = getBotReply(text);
    appendMessage(reply, 'bot');
  }, 800);
}

chatSendBtn.addEventListener('click', userSendMessage);
chatInput.addEventListener('keydown', (e) => {
  if(e.key === 'Enter') {
    userSendMessage();
  }
});

// Initial greeting
appendMessage("VOID-11 HARPER online. Need a hint? Speak softly...", 'bot');
