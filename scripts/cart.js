document.addEventListener('DOMContentLoaded', () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartTableBody = document.querySelector(".cart-table tbody");
    const subtotalElement = document.querySelector(".cart-subtotal");
    const shippingElement = document.querySelector(".shipping-value");
    const totalElement = document.querySelector(".total-value");
    const checkoutButton = document.querySelector(".checkout-button");
    const returnTohomepage=document.querySelector('.return-btn')

    const storedSubtotal = localStorage.getItem('subtotal');
    const storedTotal = localStorage.getItem('total');
    
returnTohomepage.addEventListener('click',()=>{
    window.location.href="index.html"
})

    if (storedSubtotal) subtotalElement.innerText = `₹${storedSubtotal}`;
    if (storedTotal) totalElement.innerText = `₹${storedTotal}`;

    if (cartItems.length > 0) {
        cartTableBody.innerHTML = "";
        cartItems.forEach((item, index) => {
            cartTableBody.appendChild(createCartRow(item, index));
        });

        updateSubtotal(cartItems, subtotalElement);
        updateCartTotal(cartItems, shippingElement, totalElement);
    } else {
        cartTableBody.innerHTML = "<tr><td colspan='5'>Your cart is empty.</td></tr>";
        subtotalElement.innerText = "₹0";
        totalElement.innerText = "₹0";
    }

    checkoutButton.addEventListener('click', () => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        window.location.href = "checkoutpage.html";
    });

    updateCartItemCount();
});

function createCartRow(item, index) {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td class="product">
            <img src="${item.image}" alt="${item.name}" class="female-cart-img">
            <div class="product-details">
                <strong class="title-text">${item.name}</strong> <br>
                <strong>Size:</strong> ${item.size} <br>
            </div>
        </td>
        <td class="cart-price">₹${item.price}</td>
        <td>
            <div class="quantity-control">
                <button class="minus-btn" data-index="${index}">-</button>
                <strong class="count">${item.quantity}</strong>
                <button class="plus-btn" data-index="${index}">+</button>
            </div>
        </td>
        <td class="item-total">₹${item.price * item.quantity}</td>
        <td><button class="remove-btn" data-index="${index}">✖</button></td>
    `;

    const minusButton = row.querySelector(".minus-btn");
    const plusButton = row.querySelector(".plus-btn");
    minusButton.addEventListener("click", () => updateQuantity(index, -1));
    plusButton.addEventListener("click", () => updateQuantity(index, 1));

    const removeButton = row.querySelector(".remove-btn");
    removeButton.addEventListener("click", () => removeItem(index));

    return row;
}



function updateQuantity(index, delta) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    if (cartItems[index]) {
        cartItems[index].quantity = Math.max(1, cartItems[index].quantity + delta);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        renderCart();
    }
}

function removeItem(index) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems = cartItems.filter((_, i) => i !== index);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    renderCart();
}

function updateSubtotal(cartItems, subtotalElement) {
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    subtotalElement.innerText = `₹${subtotal.toFixed(2)}`;
    localStorage.setItem('subtotal', subtotal.toFixed(2));
}

function updateCartTotal(cartItems, shippingElement, totalElement) {
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shippingCost = 0;  

    const total = subtotal + shippingCost;

    shippingElement.innerText = "Free";  
    totalElement.innerText = `₹${total.toFixed(2)}`;
    localStorage.setItem('total', total.toFixed(2));
}

function updateCartItemCount() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const cartItemCountElement = document.querySelector(".cart-item-count");
    cartItemCountElement.innerText = totalItemCount;
}

function renderCart() {
    const cartTableBody = document.querySelector(".cart-table tbody");
    const subtotalElement = document.querySelector(".cart-subtotal");
    const shippingElement = document.querySelector(".shipping-value");
    const totalElement = document.querySelector(".total-value");
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    if (cartItems.length > 0) {
        cartTableBody.innerHTML = "";
        cartItems.forEach((item, index) => {
            cartTableBody.appendChild(createCartRow(item, index));
        });
        updateSubtotal(cartItems, subtotalElement);
        updateCartTotal(cartItems, shippingElement, totalElement);
    } else {
        cartTableBody.innerHTML = "<tr><td colspan='5'>Your cart is empty.</td></tr>";
        subtotalElement.innerText = "₹0";
        totalElement.innerText = "₹0";
    }

    
    updateCartItemCount();
}
