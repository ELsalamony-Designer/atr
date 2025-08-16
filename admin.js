import { db } from './firebase.js';
import { ref, push, set, remove, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const loginSection = document.getElementById('loginSection');
const dashboard = document.getElementById('dashboard');
const loginSubmit = document.getElementById('loginSubmit');
const loginError = document.getElementById('loginError');

loginSubmit.addEventListener('click', () => {
  const id = document.getElementById('employeeId').value;
  const pass = document.getElementById('employeePass').value;
  if (id === '2654' && pass === '9090') {
    loginSection.style.display = 'none';
    dashboard.style.display = 'block';
  } else {
    loginError.innerText = 'Invalid ID or Password';
  }
});

const productForm = document.getElementById('productForm');
const productList = document.getElementById('productList');
const productsRef = ref(db, 'products');

productForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const product = {
    name: document.getElementById('pName').value,
    image: document.getElementById('pImage').value,
    price: document.getElementById('pPrice').value,
    discount: document.getElementById('pDiscount').value || null,
    category: document.getElementById('pCategory').value
  };
  const newProductRef = push(productsRef);
  set(newProductRef, product);
  productForm.reset();
});

onValue(productsRef, (snapshot) => {
  productList.innerHTML = '';
  snapshot.forEach(child => {
    const p = child.val();
    const li = document.createElement('li');
    li.innerHTML = `${p.name} - $${p.price} (${p.category}) 
                    <button onclick="deleteProduct('${child.key}')">Delete</button>`;
    productList.appendChild(li);
  });
});

window.deleteProduct = function(id) {
  remove(ref(db, 'products/' + id));
}
