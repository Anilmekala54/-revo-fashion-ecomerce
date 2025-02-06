function updateCartItemCount() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const cartItemCountElement = document.querySelector(".cart-item-count");
    cartItemCountElement.innerText = totalItemCount;
}
document.addEventListener('DOMContentLoaded', () => {
    updateCartItemCount()
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
   
    const orderSummaryContainer = document.querySelector("#orderSummaryContainer");
    const subtotalElement = document.querySelector(".cart-subtotal");
    const totalValueElement = document.querySelector(".total-value");

    let subtotal = 0;
    let totalCost = 0;

   
    orderSummaryContainer.innerHTML = '';

    
    cartItems.forEach(item => {
        const row = document.createElement('div');
        row.classList.add('order-summery-container');
        
        row.innerHTML = `
            <div class="d-flex">
                <div class="order-summery-img-section">
                    <img src="${item.image}" alt="${item.name}" class="female-cart-img" style="width: 100px; height: auto;">
                </div>
                <div class="order-summery-details">
                    <p class="title-text">${item.name}</p>  
                    <p class="choose-size1">Size: ${item.size}</p>
                    <div class="total-cost">
                        <p>₹${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <button class="remove-item" data-id="${item.productId}">Remove</button>
                </div>
            </div>
        `;
        orderSummaryContainer.appendChild(row);
        
       
        subtotal += item.price * item.quantity;
    });

   
    if (subtotalElement) {
        subtotalElement.innerText = `₹${subtotal.toFixed(2)}`;
    }

   
    const shippingCost = 0; 
    totalCost = subtotal + shippingCost;

    if (totalValueElement) {
        totalValueElement.innerText = `₹${totalCost.toFixed(2)}`;
    }

   
    const quantityInputs = document.querySelectorAll('.quantity-input');
    quantityInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            const itemId = e.target.getAttribute('data-id');
            const newQuantity = parseInt(e.target.value, 10);
            updateCartQuantity(itemId, newQuantity);
        });
    });

    
    orderSummaryContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-item')) {
            const itemId = e.target.getAttribute('data-id');
            removeCartItem(itemId);
        }
    });
});


function updateCartQuantity(id, newQuantity) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
   
    const updatedCartItems = cartItems.map(item => 
        item.productId === id ? { ...item, quantity: newQuantity } : item
    );

   
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

    
    updateCartItemCount();
    location.reload(); 
}


function removeCartItem(id) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    
    cartItems = cartItems.filter(item => item.productId !== id);

    
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

   
    updateCartItemCount();
    location.reload(); 
}


function updateCartItemCount() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartItemCountElement = document.querySelector(".cart-item-count");
    cartItemCountElement.innerText = cartItems.reduce((acc, item) => acc + item.quantity, 0);
}
