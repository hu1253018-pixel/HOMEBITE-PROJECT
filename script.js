/* ================= FOOD DATA ================= */

const foods = {

    1: {
        name: "Dal Tadka",
        price: 120
    },

    2: {
        name: "Paneer Butter Masala",
        price: 180
    },

    3: {
        name: "Shahi Paneer",
        price: 190
    },

    4: {
        name: "Veg Biryani",
        price: 160
    },

    5: {
        name: "Rajma Chawal",
        price: 130
    },

    6: {
        name: "Chole Bhature",
        price: 150
    },

    7: {
        name: "Aloo Paratha",
        price: 80
    },

    8: {
        name: "Masala Dosa",
        price: 100
    },

    9: {
        name: "Homemade Samosa",
        price: 40
    },

    10: {
        name: "Paneer Tikka",
        price: 160
    },

    11: {
        name: "Gulab Jamun",
        price: 70
    },

    12: {
        name: "Kheer",
        price: 90
    },

    13: {
        name: "Veg Hakka Noodles",
        price: 140
    },

    14: {
        name: "Veg Fried Rice",
        price: 130
    },

    15: {
        name: "Homemade Pizza",
        price: 220
    },

    16: {
        name: "White Sauce Pasta",
        price: 180
    }

};


/* ================= CART ================= */

let cart = JSON.parse(localStorage.getItem("homeBiteCart")) || [];


/* ================= ADD TO CART ================= */

function addToCart(id) {

    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            id: id,
            quantity: 1
        });

    }

    saveCart();

    updateCart();

    alert(
        foods[id].name +
        " added to your cart! 🛒"
    );
}


/* ================= SAVE CART ================= */

function saveCart() {

    localStorage.setItem(
        "homeBiteCart",
        JSON.stringify(cart)
    );

}


/* ================= UPDATE CART ================= */

function updateCart() {

    let totalQuantity = 0;

    cart.forEach(item => {

        totalQuantity += item.quantity;

    });

    document.getElementById("cart-count").innerText =
        totalQuantity;

    displayCart();

}


/* ================= DISPLAY CART ================= */

function displayCart() {

    const cartItems =
        document.getElementById("cartItems");

    const cartTotal =
        document.getElementById("cartTotal");

    cartItems.innerHTML = "";

    let total = 0;


    if (cart.length === 0) {

        cartItems.innerHTML =
            "<p>Your cart is empty 😿</p>";

        cartTotal.innerText = "0";

        return;
    }


    cart.forEach(item => {

        const food = foods[item.id];

        const itemTotal =
            food.price * item.quantity;

        total += itemTotal;


        const div =
            document.createElement("div");

        div.className = "cart-item";

        div.innerHTML = `

            <div>

                <strong>
                    ${food.name}
                </strong>

                <br>

                ₹${food.price}
                ×
                ${item.quantity}

            </div>


            <div class="cart-controls">

                <button onclick="changeQuantity(${item.id}, -1)">
                    −
                </button>

                <span>
                    ${item.quantity}
                </span>

                <button onclick="changeQuantity(${item.id}, 1)">
                    +
                </button>

                <button onclick="removeItem(${item.id})">
                    ❌
                </button>

            </div>

        `;

        cartItems.appendChild(div);

    });


    cartTotal.innerText = total;

}


/* ================= CHANGE QUANTITY ================= */

function changeQuantity(id, amount) {

    const item =
        cart.find(item => item.id === id);

    if (!item) return;

    item.quantity += amount;


    if (item.quantity <= 0) {

        cart =
            cart.filter(item => item.id !== id);

    }


    saveCart();

    updateCart();

}


/* ================= REMOVE ITEM ================= */

function removeItem(id) {

    cart =
        cart.filter(item => item.id !== id);

    saveCart();

    updateCart();

}


/* ================= OPEN CART ================= */

function openCart() {

    document.getElementById("cartModal")
        .style.display = "flex";

    displayCart();

}


/* ================= CLOSE CART ================= */

function closeCart() {

    document.getElementById("cartModal")
        .style.display = "none";

}


/* ================= SEARCH FOOD ================= */

function searchFood() {

    const search =
        document.getElementById("searchInput")
        .value
        .toLowerCase();

    const cards =
        document.querySelectorAll(".food-card");


    cards.forEach(card => {

        const text =
            card.innerText.toLowerCase();

        if (text.includes(search)) {

            card.style.display = "";

        } else {

            card.style.display = "none";

        }

    });

}


/* ================= FILTER FOOD ================= */

function filterFood() {

    const category =
        document.getElementById("categoryFilter")
        .value;

    const cards =
        document.querySelectorAll(".food-card");


    cards.forEach(card => {

        if (
            category === "all" ||
            card.dataset.category === category
        ) {

            card.style.display = "";

        } else {

            card.style.display = "none";

        }

    });

}


/* ================= CHECKOUT ================= */

function openCheckout() {

    if (cart.length === 0) {

        alert(
            "Your cart is empty! 😿"
        );

        return;
    }

    document.getElementById("checkoutModal")
        .style.display = "flex";

}


function closeCheckout() {

    document.getElementById("checkoutModal")
        .style.display = "none";

}


/* ================= PLACE ORDER ================= */

function placeOrder() {

    const name =
        document.getElementById("customerName")
        .value;

    const phone =
        document.getElementById("customerPhone")
        .value;

    const address =
        document.getElementById("customerAddress")
        .value;


    if (
        name === "" ||
        phone === "" ||
        address === ""
    ) {

        alert(
            "Please fill all details! ⚠️"
        );

        return;
    }


    alert(
        "🎉 Thank you for your order, " +
        name +
        "!\n\n" +
        "Your homemade food is being prepared. ❤️"
    );


    cart = [];

    saveCart();

    updateCart();

    closeCheckout();

    closeCart();

}


/* ================= REVIEW ================= */

function addReview() {

    const name =
        document.getElementById("reviewName")
        .value;

    const text =
        document.getElementById("reviewText")
        .value;


    if (
        name === "" ||
        text === ""
    ) {

        alert(
            "Please enter your name and review."
        );

        return;
    }


    const reviewList =
        document.getElementById("reviewList");


    const review =
        document.createElement("div");

    review.className = "review-card";


    review.innerHTML = `

        <div class="stars">
            ⭐⭐⭐⭐⭐
        </div>

        <h3>
            ${name}
        </h3>

        <p>
            "${text}"
        </p>

    `;


    reviewList.appendChild(review);


    document.getElementById("reviewName")
        .value = "";

    document.getElementById("reviewText")
        .value = "";


    alert(
        "Thank you for your review! ❤️"
    );

}


/* ================= COOK FORM ================= */

function openCookForm() {

    document.getElementById("cookModal")
        .style.display = "flex";

}


function closeCookForm() {

    document.getElementById("cookModal")
        .style.display = "none";

}


function submitCookForm() {

    const name =
        document.getElementById("cookName")
        .value;

    const speciality =
        document.getElementById("cookSpeciality")
        .value;

    const description =
        document.getElementById("cookDescription")
        .value;


    if (
        name === "" ||
        speciality === "" ||
        description === ""
    ) {

        alert(
            "Please fill all details! ⚠️"
        );

        return;
    }


    alert(
        "🎉 Thank you " +
        name +
        "!\n\n" +
        "Your Home Cook application has been submitted."
    );


    closeCookForm();

}


/* ================= CLOSE MODAL BY CLICKING OUTSIDE ================= */

window.onclick = function(event) {

    const cartModal =
        document.getElementById("cartModal");

    const checkoutModal =
        document.getElementById("checkoutModal");

    const cookModal =
        document.getElementById("cookModal");


    if (event.target === cartModal) {

        closeCart();

    }


    if (event.target === checkoutModal) {

        closeCheckout();

    }


    if (event.target === cookModal) {

        closeCookForm();

    }

};


/* ================= INITIALIZE ================= */

updateCart();