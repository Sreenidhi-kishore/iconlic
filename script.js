// ========================================
// ICONLIC CART SYSTEM
// ========================================


// ========================================
// LOAD CART FROM LOCAL STORAGE
// ========================================

let cart = JSON.parse(
    localStorage.getItem("iconlicCart")
) || [];


// ========================================
// SAVE CART
// ========================================

function saveCart() {

    localStorage.setItem(
        "iconlicCart",
        JSON.stringify(cart)
    );

}


// ========================================
// CALCULATE CART TOTAL
// ========================================

function getCartTotal() {

    let total = 0;

    cart.forEach(function(product) {

        total += product.price * product.quantity;

    });

    return total;

}


// ========================================
// ADD PRODUCT TO CART
// ========================================

function addToCart(productName, price) {

    const existingProduct = cart.find(function(product) {

        return product.name === productName;

    });


    if (existingProduct) {

        existingProduct.quantity += 1;

    } else {

        cart.push({

            name: productName,

            price: price,

            quantity: 1

        });

    }


    saveCart();


    alert(
        productName + " has been added to your cart!"
    );


    displayCart();

}


// ========================================
// CONNECT ADD TO CART BUTTONS
// ========================================

function setupAddToCartButtons() {

    const buttons = document.querySelectorAll(".add-to-cart");


    buttons.forEach(function(button) {

        button.addEventListener("click", function() {

            const productName =
                button.dataset.name;

            const price =
                Number(button.dataset.price);


            addToCart(
                productName,
                price
            );

        });

    });

}


// ========================================
// DISPLAY CART
// ========================================

function displayCart() {

    const cartItems =
        document.getElementById("cart-items");

    const cartTotal =
        document.getElementById("cart-total");


    if (!cartItems) {

        return;

    }


    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML =
            '<p class="empty-cart">Your cart is empty!</p>';

        if (cartTotal) {

            cartTotal.textContent =
                "Total: ₹0";

        }

        return;

    }


    let total = 0;


    cart.forEach(function(product, index) {

        const item =
            document.createElement("div");

        item.className = "cart-item";


        item.innerHTML = `

            <div class="cart-product-info">

                <h2>${product.name}</h2>

                <p class="cart-price">
                    ₹${product.price} each
                </p>

            </div>


            <div class="cart-controls">

                <button
                    class="quantity-button"
                    onclick="decreaseQuantity(${index})">
                    −
                </button>

                <span class="quantity-number">
                    ${product.quantity}
                </span>

                <button
                    class="quantity-button"
                    onclick="increaseQuantity(${index})">
                    +
                </button>

            </div>


            <div class="cart-product-total">

                <strong>
                    ₹${product.price * product.quantity}
                </strong>

            </div>


            <button
                class="remove-button"
                onclick="removeProduct(${index})">
                Remove
            </button>

        `;


        cartItems.appendChild(item);


        total +=
            product.price * product.quantity;

    });


    if (cartTotal) {

        cartTotal.textContent =
            "Total: ₹" + total;

    }

}


// ========================================
// INCREASE QUANTITY
// ========================================

function increaseQuantity(index) {

    if (!cart[index]) {

        return;

    }


    cart[index].quantity += 1;


    saveCart();

    displayCart();

}


// ========================================
// DECREASE QUANTITY
// ========================================

function decreaseQuantity(index) {

    if (!cart[index]) {

        return;

    }


    if (cart[index].quantity > 1) {

        cart[index].quantity -= 1;

    } else {

        cart.splice(index, 1);

    }


    saveCart();

    displayCart();

}


// ========================================
// REMOVE PRODUCT
// ========================================

function removeProduct(index) {

    if (!cart[index]) {

        return;

    }


    cart.splice(index, 1);


    saveCart();

    displayCart();

}


// ========================================
// CHECKOUT
// ========================================

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;

    }


    window.location.href =
        "checkout.html";

}


// ========================================
// DISPLAY CHECKOUT
// ========================================

function displayCheckout() {

    const checkoutItems =
        document.getElementById("checkout-items");

    const checkoutTotal =
        document.getElementById("checkout-total");


    if (!checkoutItems) {

        return;

    }


    checkoutItems.innerHTML = "";


    let total = 0;


    cart.forEach(function(product) {

        const item =
            document.createElement("p");


        const productTotal =
            product.price * product.quantity;


        item.textContent =
            product.name +
            " — ₹" +
            product.price +
            " × " +
            product.quantity +
            " = ₹" +
            productTotal;


        checkoutItems.appendChild(item);


        total += productTotal;

    });


    if (checkoutTotal) {

        checkoutTotal.textContent =
            "Total: ₹" + total;

    }

}


// ========================================
// CONTINUE TO PAYMENT
// ========================================

function continueToPayment() {

    const name =
        document.getElementById("customer-name")?.value.trim();

    const address =
        document.getElementById("customer-address")?.value.trim();

    const phone =
        document.getElementById("customer-phone")?.value.trim();


    if (
        !name ||
        !address ||
        !phone
    ) {

        alert(
            "Please fill in all delivery details."
        );

        return;

    }


    window.location.href =
        "payment.html";

}


// ========================================
// PAYMENT TOTAL
// ========================================

function displayPayment() {

    const paymentTotal =
        document.getElementById("payment-total");


    if (!paymentTotal) {

        return;

    }


    paymentTotal.textContent =
        "₹" + getCartTotal();

}


// ========================================
// GENERATE ORDER ID
// ========================================

function generateOrderID() {

    return (
        "ICN-" +
        Math.floor(
            100000 +
            Math.random() * 900000
        )
    );

}


// ========================================
// SIMULATE PAYMENT
// ========================================

function simulatePayment() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;

    }


    const order = {

        orderID:
            generateOrderID(),

        total:
            getCartTotal(),

        paymentStatus:
            "Successful"

    };


    localStorage.setItem(
        "iconlicOrder",
        JSON.stringify(order)
    );


    window.location.href =
        "confirmation.html";

}


// ========================================
// DISPLAY CONFIRMATION
// ========================================

function displayConfirmation() {

    const orderID =
        document.getElementById("order-id");

    const confirmationTotal =
        document.getElementById("confirmation-total");


    if (!orderID && !confirmationTotal) {

        return;

    }


    const savedOrder =
        JSON.parse(
            localStorage.getItem("iconlicOrder")
        );


    if (!savedOrder) {

        return;

    }


    if (orderID) {

        orderID.textContent =
            savedOrder.orderID;

    }


    if (confirmationTotal) {

        confirmationTotal.textContent =
            "₹" + savedOrder.total;

    }

}


// ========================================
// VIEW TRACKING
// ========================================

function viewTracking() {

    window.location.href =
        "tracking.html";

}


// ========================================
// DISPLAY TRACKING
// ========================================

function displayTracking() {

    const trackingOrderID =
        document.getElementById(
            "tracking-order-id"
        );

    const trackingTotal =
        document.getElementById(
            "tracking-total"
        );


    if (!trackingOrderID && !trackingTotal) {

        return;

    }


    const savedOrder =
        JSON.parse(
            localStorage.getItem("iconlicOrder")
        );


    if (!savedOrder) {

        return;

    }


    if (trackingOrderID) {

        trackingOrderID.textContent =
            savedOrder.orderID;

    }


    if (trackingTotal) {

        trackingTotal.textContent =
            "₹" + savedOrder.total;

    }

}


// ========================================
// START ICONLIC
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        setupAddToCartButtons();

        displayCart();

        displayCheckout();

        displayPayment();

        displayConfirmation();

        displayTracking();
if (checkoutTotal) {
    checkoutTotal.textContent = "₹" + total;
}
    }
);