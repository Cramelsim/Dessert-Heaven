// data.js
async function fetchData() {
    try {
        const response = await fetch('db.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Populate Menu Section
async function populateMenu() {
    const data = await fetchData();
    const menuContainer = document.querySelector('.menu .box-container');
    
    data.menu.forEach(item => {
        const box = document.createElement('div');
        box.className = 'box';
        box.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <div class="price">Ksh${item.price} <span>Ksh${item.oldPrice}</span></div>
            <a href="#" class="btn" data-id="${item.id}">add to cart</a>
        `;
        menuContainer.appendChild(box);
    });
  // Attach event listeners to add-to-cart buttons
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach(button => {
      button.addEventListener('click', (e) => {
          e.preventDefault();
          const productId = button.dataset.id;
          addToCart(productId, data.menu);
      });
  });
}

// Add item to cart
function addToCart(productId, menu) {
  const product = menu.find(item => item.id === productId);
  if (product) {
      const existingItem = cart.find(item => item.id === productId);
      if (existingItem) {
          existingItem.quantity += 1;
      } else {
          cart.push({ ...product, quantity: 1 });
      }
      console.log(cart);
      updateCartDisplay();
  }
}

// Update the cart display
function updateCartDisplay() {
  const cartContainer = document.querySelector('.cart-items-container');
  cartContainer.innerHTML = ''; // Clear existing cart items

  cart.forEach(item => {
      const cartItem = document.createElement('div');
      cartItem.className = 'cart-item';
      cartItem.innerHTML = `
          <span class="fas fa-times" data-id="${item.id}"></span>
          <img src="${item.image}" alt="${item.name}">
          <div class="content">
              <h3>${item.name}</h3>
              <div class="price">Ksh${item.price} x ${item.quantity}</div>
          </div>
      `;
      cartContainer.appendChild(cartItem);
  });

  // Add event listener for removing items
  const removeButtons = document.querySelectorAll('.cart-item .fa-times');
  removeButtons.forEach(button => {
      button.addEventListener('click', (e) => {
          const productId = e.target.dataset.id;
          removeFromCart(productId);
      });
  });
}

// Remove item from cart
function removeFromCart(productId) {
  const itemIndex = cart.findIndex(item => item.id === productId);
  if (itemIndex !== -1) {
      cart.splice(itemIndex, 1);
      updateCartDisplay();
  }
}

// Fetch and initialize the menu on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  populateMenu();
});



// Populate Products Section
async function populateProducts() {
    const data = await fetchData();
    const productsContainer = document.querySelector('.products .box-container');
    
    data.products.forEach(product => {
        const stars = '★'.repeat(Math.floor(product.rating)) + 
                     (product.rating % 1 ? '½' : '') + 
                     '☆'.repeat(5 - Math.ceil(product.rating));
                     
        const box = document.createElement('div');
        box.className = 'box';
        box.innerHTML = `
            <div class="icons">
                <a href="#" class="fas fa-shopping-cart"></a>
                <a href="#" class="fas fa-heart"></a>
                <a href="#" class="fas fa-eye"></a>
            </div>
            <div class="image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="content">
                <h3>${product.name}</h3>
                <div class="stars">
                    ${stars}
                </div>
              <div class="price">Ksh${product.price} <span>Ksh${product.oldPrice}</span></div>

            </div>
        `;
        productsContainer.appendChild(box);
    });
}

// Populate Reviews Section
async function populateReviews() {
    const data = await fetchData();
    const reviewContainer = document.querySelector('.review .box-container');
    
    data.reviews.forEach(review => {
        const stars = '★'.repeat(Math.floor(review.rating)) + 
                     (review.rating % 1 ? '½' : '') + 
                     '☆'.repeat(5 - Math.ceil(review.rating));
                     
        const box = document.createElement('div');
        box.className = 'box';
        box.innerHTML = `
            <img src="${review.avatar}" alt="${review.name}" class="user">
            <h3>${review.name}</h3>
            <div class="stars">${stars}</div>
            <p>${review.text}</p>
        `;
        reviewContainer.appendChild(box);
    });
}

// Populate Blogs Section
async function populateBlogs() {
    const data = await fetchData();
    const blogsContainer = document.querySelector('.blogs .box-container');
    
    data.blogs.forEach(blog => {
        const box = document.createElement('div');
        box.className = 'box';
        box.innerHTML = `
            <div class="image">
                <img src="${blog.image}" alt="${blog.title}">
            </div>
            <div class="content">
                <a href="#" class="title">${blog.title}</a>
                <span>by ${blog.author} / ${blog.date}</span>
                <p>${blog.excerpt}</p>
                <a href="#" class="btn">read more</a>
            </div>
        `;
        blogsContainer.appendChild(box);
    });
}

// Initialize all sections when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    populateMenu();
    populateProducts();
    populateReviews();
    populateBlogs();
});