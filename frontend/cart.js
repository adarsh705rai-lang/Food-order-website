// Get cart data from Local Storage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.getElementById("cartItems");
const totalItems = document.getElementById("totalItems");
const totalPrice = document.getElementById("totalPrice");
const gst = document.getElementById("gst");
const grandTotal = document.getElementById("grandTotal");

//-------------- Display Cart ---------------------------------------------------------------

function displayCart() {

    cartItems.innerHTML = "";

    if (cart.length == 0) {
        cartItems.innerHTML = "<h2>Your Cart is Empty</h2>";

        totalItems.innerHTML = 0;
        totalPrice.innerHTML = 0;
        gst.innerHTML = 0;
        grandTotal.innerHTML = 0;
        return;
    }

    let total = 0;
    let items = 0;

    cart.forEach((food, index) => {

        let subtotal = food.price * food.quantity;

        total += subtotal;
        items += food.quantity;

        cartItems.innerHTML += `

        <div class="cart-item">

            <img src="${food.image}" width="120">

            <div class="item-details">

                <h3>${food.name}</h3>

                <p>Price : ₹${food.price}</p>

                <div class="quantity">

                    <button onclick="decreaseQty(${index})">-</button>

                    <span>${food.quantity}</span>

                    <button onclick="increaseQty(${index})">+</button>

                </div>

                <p>Subtotal : ₹${subtotal}</p>

            </div>

            <button class="remove-btn"
            onclick="removeItem(${index})">

            Remove

            </button>

        </div>

        `;

    });

    let gstAmount = Math.round(total * 0.05);
    let delivery = 40;
    let grand = total + gstAmount + delivery;

    totalItems.innerHTML = items;
    totalPrice.innerHTML = total;
    gst.innerHTML = gstAmount;
    grandTotal.innerHTML = grand;
}

//-------------------------------- Increase Quantity ----------------------------------------------------

function increaseQty(index) {

    cart[index].quantity++;

    saveCart();

}

//--------------------------------- Decrease Quantity -----------------------------------------------------

function decreaseQty(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index,1);

    }

    saveCart();

}

//---------------------------------- Remove Item ---------------------------------------------
function removeItem(index){

    cart.splice(index,1);

    saveCart();

}

//---------------------------------- Save Cart -------------------------------------------------
function saveCart(){

    localStorage.setItem("cart",JSON.stringify(cart));

    displayCart();

}

//---------------------------------- Place Order ------------------------------------------------

document.getElementById("placeOrder").addEventListener("click",function(){

    let name=document.getElementById("name").value.trim();

    let phone=document.getElementById("phone").value.trim();

    let address=document.getElementById("address").value.trim();

    if(name==="" || phone==="" || address===""){

        alert("Please fill all customer details.");

        return;

    }

    if(cart.length===0){

        alert("Your cart is empty.");

        return;

    }

    alert("🎉 Order Placed Successfully!");

    localStorage.removeItem("cart");

    window.location.href="index.html";

});

displayCart();