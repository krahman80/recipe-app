import BSN from './node_modules/bootstrap.native/dist/bootstrap-native.esm.min.js';
// import BSN from './node_modules/bootstrap.native/dist/components/modal-native.esm.js';

//element assignment
const mealsEl = document.getElementById("meals");
const alertEl = document.getElementById("alert");

const searchKey = document.getElementById("searchKey");
const searchBtn = document.getElementById("searchBtn");

//init new modal
const myModalInstance = new BSN.Modal("#myModal");
// const modalLink = document.getElementById("anchorID");

mealsEl.addEventListener("click", e => {
  e.preventDefault;
  e.stopPropagation;
  showModal();
});

searchBtn.addEventListener("click", async () => {

  mealsEl.innerHTML = "";
  alertEl.innerHTML = "";
  const search = searchKey.value;
  if (search == "") {
    //console.log("keyword is empty");
    showAlert("Please enter a search term.");

  } else {
    const meals = await getMealsBySearch(search.trim());
    if (meals === null) {
      //console.log("null");
      const searchText = `<span class="text-dark">"${search.trim()}"</span>`;
      showAlert(searchText + " " + "recipe not found, please try again.");
    } else {
      meals.forEach((meal) => {
        addMeal(meal);
        //console.log(meal.strMeal);
      });
    }
  }

  searchKey.value = "";

});


async function getMealsBySearch(term) {
  alertEl.innerHTML = "";
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + term
  );

  const respData = await resp.json();
  const meals = respData.meals;

  return meals;
}

function showAlert(keyText) {

  const alert = document.createElement("div");
  alert.classList.add("bg-light", "p-3", "my-3", "rounded", "shadow");
  alert.innerHTML = `<span class="text-primary">${keyText}</span>`;
  alertEl.appendChild(alert);

  // setTimeout(function () {
  //   removeAlert();
  // }, 5000)

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
            <h2 class="h5 font-weight-bold mb-1" data-mealID="${mealData.idMeal}">${mealData.strMeal}</h2>
            <p class="mb-0 text-small text-muted"><b>Tag</b> : ${mealData.strCategory}, ${mealData.strArea}.</p>
            <p class="mb-0 text-small text-muted"><b>Instructions</b> : ${briefInstruction}</p>
        </figcaption>
    </figure>
  `;

  mealsEl.appendChild(meal);

}

// function removeAlert() {
//   while (alertEl.firstChild) {
//     alertEl.removeChild(alertEl.firstChild);
//     //alertEl.removeChild(alertEl.childNodes[0]);
//   }
// }


function showModal() {
  myModalInstance.show();
  //console.log("test");
}

