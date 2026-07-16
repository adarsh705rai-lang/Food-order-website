//-- FoodWorld Menu page--------------------------//
 
const foodContainer = document.getElementById("foodContainer");
const searchBtn = document.getElementById("searchBtn");
const searchBox = document.getElementById("searchBox");
const category = document.getElementById("category");

//---Load meals when page opens------------------------------------------------------
function updateCartCount(){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let total = 0;

    cart.forEach(item=>{
        total += item.quantity;
    });

    document.getElementById("cartCount").innerText = total;

}
window.onload = () => {
    loadMeals();
    updateCartCount();
};

// -------------------Fetch from API--------------------------------------------------

async function loadMeals(search = "") {

    let url = "";

    if (search === "") {

        url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

    } else {

        url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;

    }

    const apiResponse = await fetch(url);
    const apiData = await apiResponse.json();

    const indianFoods = await loadIndianFoods();

    let apiMeals = [];

    if (apiData.meals) {

        apiMeals = apiData.meals.map(meal => ({

            idMeal: meal.idMeal,
            strMeal: meal.strMeal,
            strMealThumb: meal.strMealThumb,
            strCategory: meal.strCategory

        }));

    }

   const filteredIndianFoods = indianFoods.filter(food =>

    search === "" ||

    food.name.toLowerCase().includes(search.toLowerCase())

);

const indianMeals = filteredIndianFoods.map(food => ({

    idMeal: food.id,
    strMeal: food.name,
    strMealThumb: food.image,
    strCategory: food.category,
    price: food.price,
    rating: food.rating

}));

    const allMeals = [...indianMeals, ...apiMeals];

    displayMeals(allMeals);

}
// Load Indian food from JSON
async function loadIndianFoods() {

    const response = await fetch("data/foods.json");

    return await response.json();

}

//----------------------Display meals------------------------------------------------------

function displayMeals(meals) {

    foodContainer.innerHTML = "";

    if (!meals) {
        foodContainer.innerHTML = "<h2> No Food Found </h2>";
        return;
    }

    meals.forEach(meal => {

        let price = meal.price || Math.floor(Math.random() * 300) + 100;

        foodContainer.innerHTML += `
            <div class="food-card">

                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">

                <div class="food-details">

                    <h3>${meal.strMeal}</h3>

                    <p><strong>Category:</strong> ${meal.strCategory}</p>

                    <p class="price">₹${price}</p>
                    
                    <p>⭐ ${meal.rating || "4.5"}</p>

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

    const selectedCategory = category.value;

    // Show all foods
    if (selectedCategory === "All") {
        loadMeals();
        return;
    }

    // Load local JSON file
    const jsonResponse = await fetch("foods.json");
    const jsonData = await jsonResponse.json();

    // Filter foods from JSON
    const filteredFoods = jsonData.filter(food => food.category === selectedCategory);

    // If foods found in JSON, display them
    if (filteredFoods.length > 0) {

        foodContainer.innerHTML = "";

        filteredFoods.forEach(food => {

            foodContainer.innerHTML += `
                <div class="food-card">

                    <img src="${food.image}" alt="${food.name}">

                    <div class="food-details">

                        <h3>${food.name}</h3>

                        <p><strong>Category:</strong> ${food.category}</p>

                        <p class="price">₹${food.price}</p>

                    </div>

                    <button
                        class="add-btn"
                        onclick="addToCart(
                            '${food.id}',
                            '${food.name}',
                            '${food.image}',
                            ${food.price}
                        )">

                        Add to Cart

                    </button>

                </div>
            `;

        });

        return;
    }

    // Otherwise search from API
    const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`
    );

    const data = await response.json();

    foodContainer.innerHTML = "";

    if (!data.meals) {
        foodContainer.innerHTML = "<h2>No Food Found</h2>";
        return;
    }

    data.meals.forEach(meal => {

        let price = Math.floor(Math.random() * 300) + 100;

        foodContainer.innerHTML += `
            <div class="food-card">

                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">

                <div class="food-details">

                    <h3>${meal.strMeal}</h3>

                    <p><strong>Category:</strong> ${selectedCategory}</p>

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
     updateCartCount();
    alert(`${name} added to cart successfully!`);

}