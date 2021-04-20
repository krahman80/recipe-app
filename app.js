//element assignment
const mealsEl = document.getElementById("meals");
const alertEl = document.getElementById("alert");

const searchKey = document.getElementById("searchKey");
const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", async () => {

  mealsEl.innerHTML = "";

  const search = searchKey.value;
  const meals = await getMealsBySearch(search);

  if (meals === null) {
    //console.log("null");
    showAlert();
  } else {
    meals.forEach((meal) => {
      addMeal(meal);
      //console.log(meal.strMeal);
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

function showAlert() {

  const alert = document.createElement("div");
  alert.classList.add("bg-light");
  alert.classList.add("p-3");
  alert.classList.add("my-3");
  alert.classList.add("rounded");
  alert.classList.add("shadow");
  alert.innerHTML = `<button type="button" class="close" data-dismiss="alert">&times;</button><span class="text-primary">recipe not found !</span>`;
  alertEl.appendChild(alert);


  setTimeout(function () {
    removeAlert();
  }, 5000)

}

function addMeal(mealData) {
  //console.log(mealData);

  const meal = document.createElement("div");
  meal.classList.add("col-lg-4");
  const briefInstruction = mealData.strInstructions.slice(0, 50) + '...';

  meal.innerHTML = `
    <figure class="rounded p-3 bg-white shadow-sm">
        <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}" class="w-100 card-img-top">
        <figcaption class="py-4 card-img-bottom">
            <h2 class="h5 font-weight-bold mb-1">${mealData.strMeal}</h2>
            <p class="mb-0 text-small text-muted"><b>Tag</b> : ${mealData.strCategory}, ${mealData.strArea}.</p>
            <p class="mb-0 text-small text-muted"><b>Instructions</b> : ${briefInstruction}</p>
        </figcaption>
    </figure>
  `;

  mealsEl.appendChild(meal);

}

function removeAlert() {
  while (alertEl.firstChild) {
    alertEl.removeChild(alertEl.firstChild);
    //alertEl.removeChild(alertEl.childNodes[0]);
  }
}