// Initialize cart array and store data globally
let cart = [];
let globalData = null;

// Fetch data from JSON file
async function fetchData() {
    try {
        const response = await fetch('db.json');
        const data = await response.json();
        globalData = data; // Store data globally
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Search functionality
function initializeSearch() {
    const searchBox = document.querySelector('#search-box');
    const menuContainer = document.querySelector('.menu .box-container');
    const productsContainer = document.querySelector('.products .box-container');

    searchBox.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        // Search in menu items
        const menuItems = menuContainer.querySelectorAll('.box');
        menuItems.forEach(item => {
            const name = item.querySelector('h3').textContent.toLowerCase();
            if (name.includes(searchTerm)) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });

        // Search in products
        const productItems = productsContainer.querySelectorAll('.box');
        productItems.forEach(item => {
            const name = item.querySelector('h3').textContent.toLowerCase();
            if (name.includes(searchTerm)) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    });
}

// Populate Menu Section
async function populateMenu() {
    const data = await fetchData();
    const menuContainer = document.querySelector('.menu .box-container');
    
    // Store existing static menu items
    const existingMenu = menuContainer.innerHTML;
    
    // Add dynamic menu items from db.json
    data.menu.forEach(item => {
        const box = document.createElement('div');
        box.className = 'box';
        box.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <div class="price">Ksh${item.price} <span>Ksh${item.oldPrice}</span></div>
            <a href="#" class="btn add-to-cart" data-id="${item.id}" data-type="menu">add to cart</a>
        `;
        menuContainer.appendChild(box);
    });
}

// Similarly update the products population function
async function populateProducts() {
    const data = await fetchData();
    const productsContainer = document.querySelector('.products .box-container');
    
    // Store existing static products
    const existingProducts = productsContainer.innerHTML;
    
    // Add dynamic products from db.json
    data.products.forEach(product => {
        const stars = '★'.repeat(Math.floor(product.rating)) + 
                     (product.rating % 1 ? '½' : '') + 
                     '☆'.repeat(5 - Math.ceil(product.rating));
                     
        const box = document.createElement('div');
        box.className = 'box';
        box.innerHTML = `
            <div class="icons">
                <a href="#" class="fas fa-shopping-cart add-to-cart" data-id="${product.id}" data-type="products"></a>
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
// Add to cart functionality
function initializeCartFunctionality() {
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            e.preventDefault();
            const id = parseInt(e.target.dataset.id);
            const type = e.target.dataset.type;
            const item = globalData[type].find(item => item.id === id);
            
            if (item) {
                addToCart(item);
            }
        }
    });
}

function addToCart(item) {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: 1
        });
    }
    
    updateCartDisplay();
    showNotification('Item added to cart!');
}

function updateCartDisplay() {
    const cartContainer = document.querySelector('.cart-items-container');
    cartContainer.innerHTML = ''; // Clear existing content
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <span class="fas fa-times remove-from-cart" data-id="${item.id}"></span>
            <img src="${item.image}" alt="${item.name}">
            <div class="content">
                <h3>${item.name}</h3>
                <div class="price">Ksh${item.price} x ${item.quantity}</div>
            </div>
        `;
        cartContainer.appendChild(cartItem);
    });

    if (cart.length > 0) {
        const checkoutBtn = document.createElement('a');
        checkoutBtn.href = '#';
        checkoutBtn.className = 'btn';
        checkoutBtn.textContent = 'checkout now';
        cartContainer.appendChild(checkoutBtn);
    }
}


// Populate Reviews Section
async function populateReviews() {
    const data = await fetchData();
    const reviewContainer = document.querySelector('.review .box-container');
    
    // Keep existing reviews
    const existingReviews = reviewContainer.innerHTML;
    
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

// Populate Blogs Section with proper content
async function populateBlogs() {
    const data = await fetchData();
    const blogsContainer = document.querySelector('.blogs .box-container');
    
    // Keep existing blogs
    const existingBlogs = blogsContainer.innerHTML;
    
    data.blogs.forEach(blog => {
        const truncatedContent = blog.content.substring(0, 100) + '...';
        
        const box = document.createElement('div');
        box.className = 'box';
        box.innerHTML = `
            <div class="image">
                <img src="${blog.image}" alt="${blog.title}">
            </div>
            <div class="content">
                <a href="#" class="title">${blog.title}</a>
                <span>by ${blog.author} / ${blog.date}</span>
                <p class="blog-content">${truncatedContent}</p>
                <a href="#" class="btn read-more" 
                   data-full-content="${blog.content}"
                   data-excerpt="${truncatedContent}">read more</a>
            </div>
        `;
        blogsContainer.appendChild(box);
    });

    // Add read more functionality
    initializeBlogReadMore();
}

// Improved read more functionality
function initializeBlogReadMore() {
    document.querySelectorAll('.read-more').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const content = button.previousElementSibling;
            const fullContent = button.getAttribute('data-full-content');
            const excerpt = button.getAttribute('data-excerpt');
            
            if (button.textContent === 'read more') {
                content.textContent = fullContent;
                button.textContent = 'read less';
            } else {
                content.textContent = excerpt;
                button.textContent = 'read more';
            }
        });
    });
}

// Enhanced search functionality with scroll
function initializeSearch() {
    const searchBox = document.querySelector('#search-box');
    
    searchBox.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        // Arrays to store matching elements
        const matchingElements = [];
        
        // Search in menu items
        document.querySelectorAll('.menu .box').forEach(item => {
            const name = item.querySelector('h3').textContent.toLowerCase();
            item.style.display = name.includes(searchTerm) ? '' : 'none';
            if (name.includes(searchTerm)) matchingElements.push(item);
        });

        // Search in products
        document.querySelectorAll('.products .box').forEach(item => {
            const name = item.querySelector('h3').textContent.toLowerCase();
            item.style.display = name.includes(searchTerm) ? '' : 'none';
            if (name.includes(searchTerm)) matchingElements.push(item);
        });

        // Scroll to first match if any
        if (matchingElements.length > 0 && searchTerm.length > 0) {
            matchingElements[0].scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    });
}

// Remove from cart functionality
function initializeRemoveFromCart() {
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-from-cart')) {
            const id = parseInt(e.target.dataset.id);
            removeFromCart(id);
        }
    });
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartDisplay();
    showNotification('Item removed from cart');
}


// Improved cart functionality with working remove button
function updateCartDisplay() {
    const cartContainer = document.querySelector('.cart-items-container');
    cartContainer.innerHTML = ''; // Clear existing content
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <span class="fas fa-times remove-from-cart" data-id="${item.id}"></span>
            <img src="${item.image}" alt="${item.name}">
            <div class="content">
                <h3>${item.name}</h3>
                <div class="price">Ksh${item.price} x ${item.quantity}</div>
            </div>
        `;
        cartContainer.appendChild(cartItem);

        // Add remove functionality
        const removeBtn = cartItem.querySelector('.remove-from-cart');
        removeBtn.addEventListener('click', () => {
            removeFromCart(item.id);
        });
    });

    if (cart.length > 0) {
        const checkoutBtn = document.createElement('a');
        checkoutBtn.href = '#';
        checkoutBtn.className = 'btn';
        checkoutBtn.textContent = 'checkout now';
        cartContainer.appendChild(checkoutBtn);
    }
}

// Contact form submission handling
function initializeContactForm() {
    const contactForm = document.querySelector('.contact form');
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Create status message element if it doesn't exist
        let statusMessage = document.querySelector('.status-message');
        if (!statusMessage) {
            statusMessage = document.createElement('div');
            statusMessage.className = 'status-message';
            contactForm.appendChild(statusMessage);
        }

        try {
            // Simulate form submission (replace with actual API call)
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Show success message
            statusMessage.textContent = 'Message sent successfully!';
            statusMessage.className = 'status-message success';
            statusMessage.style.display = 'block';
            
            // Clear form
            contactForm.reset();
            
            // Hide message after 3 seconds
            setTimeout(() => {
                statusMessage.style.display = 'none';
            }, 3000);
            
        } catch (error) {
            // Show error message
            statusMessage.textContent = 'Error sending message. Please try again.';
            statusMessage.className = 'status-message error';
            statusMessage.style.display = 'block';
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    await populateMenu();
    await populateProducts();
    await populateBlogs();
    initializeSearch();
    initializeCartFunctionality();
    initializeRemoveFromCart();
    
    // Initialize UI toggles
    const searchForm = document.querySelector('.search-form');
    const cartItemsContainer = document.querySelector('.cart-items-container');
    const navbar = document.querySelector('.navbar');

    document.querySelector('#search-btn').onclick = () => {
        searchForm.classList.toggle('active');
        cartItemsContainer.classList.remove('active');
        navbar.classList.remove('active');
    };

    document.querySelector('#cart-btn').onclick = () => {
        cartItemsContainer.classList.toggle('active');
        searchForm.classList.remove('active');
        navbar.classList.remove('active');
    };

    document.querySelector('#menu-btn').onclick = () => {
        navbar.classList.toggle('active');
        searchForm.classList.remove('active');
        cartItemsContainer.classList.remove('active');
    };
});

// Utility function for notifications
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 2000);
}