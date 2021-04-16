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

function addMeal(mealData) {
  //console.log(mealData);

  const meal = document.createElement("li");
  meal.classList.add("list-group-item");
  meal.classList.add("p-2");
  meal.classList.add("my-1");

  meal.innerHTML = `
  <div class="media align-items-lg-center flex-column flex-lg-row py-1">
  <div class="media-body order-2 order-lg-1">
    <h5 class="mt-0 font-weight-bold mb-2">${mealData.strMeal}</h5>
    <p><b>Instruction :</b></p>
                            <p class="font-italic text-muted mb-0 small">${mealData.strInstructions}</p>
                            <div class="d-flex align-items-center justify-content-between mt-1">
                            <h6 class="my-2">url <a href="${mealData.strYoutube}">link</a></h6>
                            <ul class="list-inline small">
                              <li class="list-inline-item m-0"><i class="fa fa-star text-success"></i></li>
                              <li class="list-inline-item m-0"><i class="fa fa-star text-success"></i></li>
                              <li class="list-inline-item m-0"><i class="fa fa-star text-success"></i></li>
                              <li class="list-inline-item m-0"><i class="fa fa-star text-success"></i></li>
                              <li class="list-inline-item m-0"><i class="fa fa-star-o text-gray"></i></li>
                            </ul>
                          </div>
                            </div><img src="${mealData.strMealThumb}" alt="${mealData.strMeal}" width="200" class="ml-lg-5 order-1 order-lg-2">
                        </div>                            
  `;

  mealsEl.appendChild(meal);
}
