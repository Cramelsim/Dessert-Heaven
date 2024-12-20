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
            <img src="Ksh{item.image}" alt="Ksh{item.name}">
            <h3>${item.name}</h3>
            <div class="price">$Ksh{item.price} <span>$Ksh{item.oldPrice}</span></div>
            <a href="#" class="btn" data-id="${item.id}">add to cart</a>
        `;
        menuContainer.appendChild(box);
    });
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productId = button.dataset.id;
            console.log(`Product ${productId} added to cart`);
            // Here, you can add the functionality to actually add the item to the cart.
        });
    });
}

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
                <div class="price">$${product.price} <span>$${product.oldPrice}</span></div>
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