import BSN from './node_modules/bootstrap.native/dist/bootstrap-native.esm.min.js';
// import BSN from './node_modules/bootstrap.native/dist/components/modal-native.esm.js';

// element assignment
const mealsEl = document.getElementById('meals');
const alertEl = document.getElementById('alert');

const searchKey = document.getElementById('searchKey');
const searchBtn = document.getElementById('searchBtn');

// init new modal
const myModalInstance = new BSN.Modal('#myModal');
// const modalLink = document.getElementById("anchorID");

mealsEl.addEventListener('click', (e) => {
  // e.preventDefault
  // e.stopPropagation

  const mealInfo = e.path.find((item) => {
    if (item.classList) {
      return item.classList.contains('meal-info');
    } else {
      return false;
    }
  });

  if (mealInfo) {
    const mealID = mealInfo.getAttribute('data-mealID');
    // console.log(mealID);
    getMealById(mealID);
  }
});

searchBtn.addEventListener('click', async () => {
  mealsEl.innerHTML = '';
  alertEl.innerHTML = '';
  const search = searchKey.value;
  if (search === '') {
    // console.log("keyword is empty");
    showAlert('Please enter a search term.');
  } else {
    const meals = await getMealsBySearch(search.trim());
    if (meals === null) {
      // console.log("null");
      const searchText = `<span class="text-dark">"${search.trim()}"</span>`;
      showAlert(
        searchText + ' ' + 'recipe not found, please try again.',
      );
    } else {
      meals.forEach((meal) => {
        addMeal(meal);
        // console.log(meal.strMeal);
      });
    }
  }

  searchKey.value = '';
});

async function getMealsBySearch(term) {
  alertEl.innerHTML = '';
  const resp = await fetch(
    'https://www.themealdb.com/api/json/v1/1/search.php?s=' + term,
  );

  const respData = await resp.json();
  const meals = respData.meals;

  return meals;
}

function showAlert(keyText) {
  const alert = document.createElement('div');
  alert.classList.add('bg-light', 'p-3', 'my-3', 'rounded', 'shadow');
  alert.innerHTML = `<span class="text-primary">${keyText}</span>`;
  alertEl.appendChild(alert);

  // setTimeout(function () {
  //   removeAlert();
  // }, 5000)
}

function addMeal(mealData) {
  // console.log(mealData);

  const meal = document.createElement('div');
  meal.classList.add('col-lg-4', 'meal-info');
  meal.setAttribute('data-mealId', mealData.idMeal);
  const briefInstruction =
    mealData.strInstructions.slice(0, 50) + '...';

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

// function removeAlert () {
//   while (alertEl.firstChild) {
//     alertEl.removeChild(alertEl.firstChild)
//     alertEl.removeChild(alertEl.childNodes[0])
//   }
// }

// function showModal () {
//   myModalInstance.show()
// }

// Fetch meal by ID
function getMealById(mealID) {
  fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`,
  )
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];
      addMealToModal(meal);
    });
}

function addMealToModal(meal) {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`,
      );
    } else {
      break;
    }
  }

  const modalContent = `
  <div class="modal-header">
  <h2 class="modal-title">${meal.strMeal}</h2>
  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>
<div class="modal-body">
  <img src="${meal.strMealThumb}" alt="${
    meal.strMeal
  }" class="w-100 card-img-top"/>
  <div class="single-meal-info">
  <p class="mb-0 text-small text-muted"><b>Tag</b> : ${
    meal.strCategory ? `<span>${meal.strCategory}</span>` : ''
  }, 
        ${meal.strArea ? `<span>${meal.strArea}</span>` : ''}
      </div>
  <h4>Instruction</h4>
      <p>${meal.strInstructions}</p>
      <h4>Ingredients</h4>
    <ul>
      ${ingredients.map((ing) => `<li>${ing}</li>`).join('')}
    </ul>
</div>
<div class="modal-footer">
<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
</div>
`;
  myModalInstance.setContent(modalContent);
  myModalInstance.show();
}
