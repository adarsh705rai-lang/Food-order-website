//-- FoodWorld Menu page--------------------------//
 
const foodContainer = document.getElementById("foodContainer");
const searchBtn = document.getElementById("searchBtn");
const searchBox = document.getElementById("searchBox");
const category = document.getElementById("category");

//---Load meals when page opens------------------------------------------------------
window.onload = () => {
    loadMeals();
};

// -------------------Fetch from API--------------------------------------------------

async function loadMeals(search = "") {

    let url = "";

    if (search === "") {
        url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
    } else {
        url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    displayMeals(data.meals);
}

//----------------------Display meals------------------------------------------------------

function displayMeals(meals) {

    foodContainer.innerHTML = "";

    if (!meals) {
        foodContainer.innerHTML = "<h2> No Food Found </h2>";
        return;
    }

    meals.forEach(meal => {

        let price = Math.floor(Math.random() * 300) + 100;

        foodContainer.innerHTML += `
            <div class="food-card">

                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">

                <div class="food-details">

                    <h3>${meal.strMeal}</h3>

                    <p><strong>Category:</strong> ${meal.strCategory}</p>

                    <p class="price">₹${price}</p>

                </div>

                <button
                    class="add-btn"
                    onclick="addToCart(
                        '${meal.idMeal}',
                        '${meal.strMeal}',
                        '${meal.strMealThumb}',
                        ${price}
                    )">

                    Add to Cart

                </button>

            </div>
        `;
    });

}

//---------------------Search button---------------------------------------------------------

searchBtn.addEventListener("click", () => {

    const search = searchBox.value.trim();

    loadMeals(search);

});

//------------------------------ Category Filter------------------------------------------------

category.addEventListener("change", async () => {

    if (category.value === "All") {

        loadMeals();

        return;
    }

    const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category.value}`
    );

    const data = await response.json();

    foodContainer.innerHTML = "";

    data.meals.forEach(meal => {

        let price = Math.floor(Math.random() * 300) + 100;

        foodContainer.innerHTML += `
            <div class="food-card">

                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">

                <div class="food-details">

                    <h3>${meal.strMeal}</h3>

                    <p><strong>Category:</strong> ${category.value}</p>

                    <p class="price">₹${price}</p>

                </div>

                <button
                    class="add-btn"
                    onclick="addToCart(
                        '${meal.idMeal}',
                        '${meal.strMeal}',
                        '${meal.strMealThumb}',
                        ${price}
                    )">

                    Add to Cart

                </button>

            </div>
        `;

    });

});

//------------------------------------- Add to Cart--------------------------------------------------------

function addToCart(id, name, image, price) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const item = {
        id,
        name,
        image,
        price,
        quantity: 1
    };

    const existing = cart.find(food => food.id === id);

    if (existing) {

        existing.quantity++;

    } else {

        cart.push(item);

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(`${name} added to cart successfully!`);

}