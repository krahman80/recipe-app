//element assignment
const mealsEl = document.getElementById("meals");


const searchKey = document.getElementById("searchKey");
const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", async () => {

  mealsEl.innerHTML = "";

  const search = searchKey.value;
  const meals = await getMealsBySearch(search);

  if (meals) {
    meals.forEach((meal) => {
      addMeal(meal);
    });
  }
});

async function getMealsBySearch(term) {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + term
  );

  const respData = await resp.json();
  const meals = respData.meals;

  return meals;
}

function addMeal(mealData, random = false) {
  console.log(mealData);

  const meal = document.createElement("div");
  meal.classList.add("meal");

  meal.innerHTML = `
      <div class="meal-header">
          ${random
      ? `
          <span class="random"> Random Recipe </span>`
      : ""
    }
          <img
              src="${mealData.strMealThumb}"
              alt="${mealData.strMeal}"
          />
      </div>
      <div class="meal-body">
          <h4>${mealData.strMeal}</h4>
          <button class="fav-btn">
              <i class="fas fa-heart"></i>
          </button>
      </div>
  `;

  mealsEl.appendChild(meal);
}
