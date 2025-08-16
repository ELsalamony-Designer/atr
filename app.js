import { db } from './firebase.js';
import { ref, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const productsRef = ref(db, 'products');
const productsContainer = document.getElementById('products');
const searchBox = document.getElementById('searchBox');
const categoryFilter = document.getElementById('categoryFilter');

let products = [];
let cart = [];

onValue(productsRef, (snapshot) => {
  products = [];
  snapshot.forEach(child => {
    products.push({ id: child.key, ...child.val() });
  });
  renderProducts(products);
});

function renderProducts(data) {
  productsContainer.innerHTML = '';
  let categories = new Set(['all']);
  data.forEach(p => {
    categories.add(p.category);
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `<img src="${p.image}" alt="${p.name}" style="width:100%">
                     <h4>${p.name}</h4>
                     <p>Price: $${p.price}</p>
                     ${p.discount ? `<p>Discount: ${p.discount}%</p>`:''}
                     <button onclick="addToCart('${p.id}')">Add to Cart</button>`;
    productsContainer.appendChild(div);
  });
  categoryFilter.innerHTML = '';
  categories.forEach(cat => {
    categoryFilter.innerHTML += `<option value="${cat}">${cat}</option>`;
  });
}

window.addToCart = function(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  document.getElementById('cartCount').innerText = cart.length;
  alert(product.name + " added to cart!");
}

searchBox.addEventListener('input', () => {
  const val = searchBox.value.toLowerCase();
  renderProducts(products.filter(p => p.name.toLowerCase().includes(val)));
});

categoryFilter.addEventListener('change', () => {
  const val = categoryFilter.value;
  if (val === 'all') renderProducts(products);
  else renderProducts(products.filter(p => p.category === val));
});
