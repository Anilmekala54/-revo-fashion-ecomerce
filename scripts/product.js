const productName = localStorage.getItem('productName');
const productPrice = localStorage.getItem('productPrice');
const productImage = localStorage.getItem('productImage');
const productSize = localStorage.getItem('productSize'); 

document.querySelector('.title-text').innerText = productName;
document.querySelector('.product-price').innerText = productPrice;
document.querySelector('.main-image').setAttribute('src', productImage);
// Add this code to your product.js file

document.addEventListener('DOMContentLoaded', function() {
    // Get the toggle button and navigation menu
    const toggleMenuBtn = document.querySelector('.toggle-menu-btn');
    const homeBtn = document.querySelector('.home-btn');
    
    // Toggle menu visibility when the button is clicked
    toggleMenuBtn.addEventListener('click', function() {
        homeBtn.classList.toggle('active');
    });
    
    // Close menu when clicking outside of it
    document.addEventListener('click', function(event) {
        if (!homeBtn.contains(event.target) && !toggleMenuBtn.contains(event.target)) {
            homeBtn.classList.remove('active');
        }
    });
    
    // Close menu when window is resized to desktop width
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            homeBtn.classList.remove('active');
        }
    });
});
function updateCartItemCount() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const cartItemCountElement = document.querySelector(".cart-item-count");
    cartItemCountElement.innerText = totalItemCount;
}
 document.addEventListener('DOMContentLoaded',()=>{
    updateCartItemCount()
})

const sizeDropdown = document.querySelector('.choose-size');
if (sizeDropdown) {
    sizeDropdown.value = productSize || 'S';
}

const addCartButton = document.querySelector('.add-cart');
addCartButton.addEventListener("click", () => {
    const productName = document.querySelector(".title-text").innerText;
    const productPrice = document.querySelector(".product-price").innerText;
    const productImage = document.querySelector(".main-image").getAttribute("src");
    const selectedSize = document.querySelector('.choose-size').value;

   
    const cartItem = {
        name: productName,
        price: productPrice,
        image: productImage,
        size: selectedSize, 
        quantity: 1,
    };

   
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    
    const existingProductIndex = cartItems.findIndex(item => item.name === productName && item.size === selectedSize);

    if (existingProductIndex !== -1) {
       
        alert('This product is already in the cart!');
    } else {
        
        cartItems.push(cartItem);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        alert('Product added to cart!');
    }

    console.log('Cart Items:', cartItems);
    window.location.href = 'cart.html';
});
