/* ========= HOMEPAGE  ========= */
function toggleHeart(heart){
  const img = heart.querySelector('img');
  if(heart.classList.contains('active')){
    heart.classList.remove('active');
    img.src = 'Assets/Vector 15.svg';
  }else{
    heart.classList.add('active');
    img.src = 'Assets/heart-filled.svg';
  }   
}


/* ========= PRODUCT LIST  ========= */
function initPage() {
  const cart = getCart();
  Object.keys(cart).forEach(id => {
    const btn = document.querySelector(`button[onclick="addToCart(this, '${id}')"]`);
    const box = document.getElementById('qty-' + id);
    const span = document.getElementById(id);
    if (btn && box && span) {
      btn.style.display = 'none';
      box.style.display = 'flex';
      span.textContent = cart[id];
    }
  });
  updateCartBadge();
}

/* quantity feedback  */
function addToCart(btn, id) {
  btn.style.display = 'none';
  const box = document.getElementById('qty-' + id);
  box.style.display = 'flex';
  document.getElementById(id).textContent = 1;
  const cart = getCart();
  cart[id] =1
  saveCart(cart);
  updateCartBadge();
}

function increase(id) {
  const el = document.getElementById(id);
  const newQty = parseInt(el.textContent) + 1;
  el.textContent = newQty;

  const cart = getCart();
  cart[id] = newQty;
  saveCart(cart);
}

function decrease(id) {
  const el = document.getElementById(id);
  const current = parseInt(el.textContent);

  if (current <= 1) {
    const box = document.getElementById('qty-' + id);
    box.style.display = 'none';
    box.previousElementSibling.style.display = '';

    const cart = getCart();
    delete cart[id];
    saveCart(cart);  
    updateCartBadge();
  } else {
    el.textContent = current - 1;
    const cart = getCart();
    cart[id] = current-1;
    saveCart(cart);
  }
}

function updateCartBadge() {
  const badge = document.getElementById('cart-badge');
  const cart = getCart();
  const count = Object.keys(cart).length;
  if (count > 0) {
    badge.textContent = count;
    badge.style.display = 'flex';
  } else {
    badge.style.display = 'none';
  }
}

document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('cart-items-container')) {
    renderCart();
  } else {
    initPage();
  }
});


/* ========= CART  ========= */
function renderCart() {
  const cart = getCart();
  const container = document.getElementById('cart-items-container');
  const emptyMsg = document.getElementById('empty-cart');
  const ids = Object.keys(cart);

  container.innerHTML = '';

  if (ids.length === 0) {
    emptyMsg.style.display = 'block';
    document.querySelector('.summary').style.display = 'none';
    document.querySelector('.total-row').style.display = 'none';
    document.querySelector('.place-order').style.display = 'none';
  } else {
    emptyMsg.style.display = 'none';
    document.querySelector('.summary').style.display = '';
    document.querySelector('.total-row').style.display = '';
    document.querySelector('.place-order').style.display = '';

    ids.forEach(id => {
      const product = PRODUCTS[id];
      if (!product) return;
      const qty = cart[id];
      const itemTotal = (product.price * qty).toFixed(2);

      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `
        <img src="${product.img}" alt="${product.name}">
        <div class="item-info">
          <h2>${product.name}</h2>
          <div class="quantity-box">
            <button onclick="cartDecrease('${id}')">-</button>
            <span id="qty-${id}">${qty}</span>
            <button onclick="cartIncrease('${id}')">+</button>
          </div>
          <p>$${itemTotal}</p>
        </div>
        <button class="select-btn" onclick="toggleSelect(this)"></button>
      `;
      container.appendChild(div);
    });
  }

  updateSummary();
  updateItemCount();
}

/* product quantity */
 function cartIncrease(id){
  const cart = getCart();
  cart[id] = (cart[id] || 1) + 1;
  saveCart(cart);
  renderCart();
}

function cartDecrease(id){
  const cart = getCart();
  if (cart[id] <= 1) {
    delete cart[id];
  } else {
    cart[id]--;
  }
  saveCart(cart);
  renderCart();
}

function updateSummary() {
  const cart = getCart();
  let subtotal = 0;
  Object.keys(cart).forEach(id => {
    if (PRODUCTS[id]) subtotal += PRODUCTS[id].price * cart[id];
  });
  const gst = subtotal * 0.1;
  const total = subtotal + gst;

  document.getElementById('subtotal').textContent = '$' + subtotal.toFixed(2);
  document.getElementById('gst').textContent = '$' + gst.toFixed(2);
  document.getElementById('total').textContent = '$' + total.toFixed(2);
}

function updateItemCount() {
  const cart = getCart();
  const totalQty = Object.values(cart).reduce((a, b) => a + b, 0);
  document.getElementById('item-count').textContent = `Total ${totalQty} Item${totalQty !== 1 ? 's' : ''}`;
}

/* Select button */
function toggleSelect(button){
  button.classList.toggle('active');
}

/* ========= Payment ========= */
/* payment detai popup card */
function openPopup(){
  document.getElementById('popup').style.display='flex';
}

/* payment comfirmation popup card */
function openSuccess() {
  document.getElementById('popup').classList.remove('active');
  document.getElementById('popup-success').classList.add('active');
}