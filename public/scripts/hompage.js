function updateCartItemCount() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const cartItemCountElement = document.querySelector(".cart-item-count");
    cartItemCountElement.innerText = totalItemCount;
    
}
 document.addEventListener('DOMContentLoaded',()=>{
    updateCartItemCount()
})
    const button = document.getElementById("see-more-btn");
const content = document.getElementById("additional-products");

 
 

button.addEventListener('click', () => {
    if (content.style.display === 'none' || content.style.display === '') {
        content.style.display = "block";
    } else {
        content.style.display = 'none';
    }
});


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


let offerClose = '10 Aprile 2025 12:00 AM';
let offerTitle = document.querySelector('.offerClose');
offerTitle.textContent = offerClose;


let timerDays = document.querySelectorAll('.timer')[0];
let timerHours = document.querySelectorAll('.timer')[1];
let timerMinutes = document.querySelectorAll('.timer')[2];
let timerSec = document.querySelectorAll('.timer')[3];

function timeDown() {
    let closeDate = new Date(offerClose);
    let todayDate = new Date();

    let timeLeft = (closeDate - todayDate) / 1000; 
    if (timeLeft <= 0) {
        timerDays.textContent = '00';
        timerHours.textContent = '00';
        timerMinutes.textContent = '00';
        timerMinutes.textContent = '00';
        return; 
    }

  
    let getDay = Math.floor(timeLeft / 3600 / 24);
    let getHour = Math.floor((timeLeft / 3600) % 24);
    let getMinutes = Math.floor((timeLeft / 60) % 60);
    let getSec = Math.floor((timeLeft ) % 60);

  
    timerDays.textContent = getDay < 10 ? `0${getDay}` : getDay;
    timerHours.textContent = getHour < 10 ? `0${getHour}` : getHour;
    timerMinutes.textContent = getMinutes < 10 ? `0${getMinutes}` : getMinutes;
    timerSec.textContent = getSec < 10 ? `0${getSec}` : getSec;
}

setInterval(timeDown, 1000);






const buyButtons = document.querySelectorAll(".buy");

buyButtons.forEach((buyButton) => {
    buyButton.addEventListener('click', (e) => {
      
        console.log('Buy button clicked', e.target.id);
        const productElement = e.target.closest('.product-section, .our-product-imges-section');
        console.log("Product Element:", productElement);

        const productName = productElement.querySelector(`.title-${e.target.id}`).innerText;
        const productPrice = productElement.querySelector(`.price-${e.target.id}`).innerText;
        const productImage = productElement.querySelector(`.img-${e.target.id}`).getAttribute('src')
        
      

        localStorage.setItem('productName', productName);
        localStorage.setItem('productPrice', productPrice);
        localStorage.setItem('productImage', productImage);
      

        window.location.href = 'product.html';
    });
});
