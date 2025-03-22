// Function to render the cart
function renderCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartTableBody = document.querySelector("#cartTable tbody");
    const totalPriceElement = document.getElementById("totalPrice");
    const cartMessage = document.getElementById("cartMessage");

    cartTableBody.innerHTML = '';

    if (cart.length === 0) {
        cartMessage.textContent = "Your cart is empty.";
        totalPriceElement.textContent = "Total: ₹0.00";
    } else {
        cartMessage.textContent = '';

        let total = 0;

        cart.forEach((item, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.name}</td>
                <td>₹${item.price}</td>
                <td>${item.quantity}</td>
                <td>₹${(item.price * item.quantity).toFixed(2)}</td>
                <td><button class="remove-btn" onclick="removeItem(${index})">Remove</button></td>
            `;
            cartTableBody.appendChild(row);
            total += item.price * item.quantity;
        });

        totalPriceElement.textContent = "Total: ₹" + total.toFixed(2);
    }
}

// Function to remove an item from the cart
function removeItem(index) {
    const bubbleSound = document.getElementById('bubbleSound');
    bubbleSound.play();

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

// Function to handle checkout button click
document.getElementById("checkoutButton").addEventListener('click', function() {
    const cashOnDeliveryRadio = document.getElementById("cashOnDelivery");
    const cardPaymentRadio = document.getElementById("cardPayment");

    if (cashOnDeliveryRadio.checked || cardPaymentRadio.checked) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalPrice = document.getElementById("totalPrice").textContent;

        let cartDetails = `Total: ${totalPrice}\n\n`;
        cart.forEach(item => {
            cartDetails += `Product: ${item.name}, Price: ₹${item.price}, Quantity: ${item.quantity}, Total: ₹${(item.price * item.quantity).toFixed(2)}\n`;
        });

        const paymentMethod = cashOnDeliveryRadio.checked ? "Cash on Delivery" : "Credit/Debit Card";

        // Show spinner
        document.getElementById("spinner").style.display = "block";

        // Send cart details to Web3Forms
        sendCartToWeb3Forms(cartDetails, paymentMethod);
    } else {
        alert("Please select a payment method.");
    }
});

// Function to send cart data to Web3Forms
function sendCartToWeb3Forms(cartDetails, paymentMethod) {
    const formData = new FormData();
    formData.append("name", "Customer Order");
    formData.append("email", "customer-email@example.com");
    formData.append("message", `Order Details:\n\n${cartDetails}\nPayment Method: ${paymentMethod}`);
    formData.append("access_key", "404cd986-60ee-4bff-b071-d713e9beb8f1");

    fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // Wait for 5 seconds before redirecting to success.html
        setTimeout(() => {
            window.location.href = "success.html";
        }, 5000);
    })
    .catch(error => {
        alert("Error submitting your order.");
        console.log(error);
        // Hide spinner if there's an error
        document.getElementById("spinner").style.display = "none";
    });
}
// Initial render of cart items
renderCart();
