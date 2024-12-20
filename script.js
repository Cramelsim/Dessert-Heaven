
        let navbar = document.querySelector('.navbar');
        let searchForm = document.querySelector('.search-form');
        let cartItems = document.querySelector('.cart-items-container');
        let menuBtn = document.querySelector('#menu-btn');
        let searchBtn = document.querySelector('#search-btn');
        let cartBtn = document.querySelector('#cart-btn');

        // Menu button click event
        menuBtn.onclick = () => {
            navbar.classList.toggle('active');
            searchForm.classList.remove('active');
            cartItems.classList.remove('active');
        }

        // Search button click event
        searchBtn.onclick = () => {
            searchForm.classList.toggle('active');
            navbar.classList.remove('active');
            cartItems.classList.remove('active');
        }

        // Cart button click event
        cartBtn.onclick = () => {
            cartItems.classList.toggle('active');
            navbar.classList.remove('active');
            searchForm.classList.remove('active');
        }

        // Remove all active classes on window scroll
        window.onscroll = () => {
            navbar.classList.remove('active');
            searchForm.classList.remove('active');
            cartItems.classList.remove('active');
        }

        // Add smooth scrolling to all links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    