
const dadButton = document.querySelector('#dad-button')
const soberButton = document.querySelector('#sober-button')
const drinkTitle = document.querySelector('#drink-title')
const ingredients = document.querySelector('#ingredients')
const drinkInstructions = document.querySelector('#instructions')
const drinkImage = document.querySelector(".drink-image")
const contentContainer = document.querySelector('.content-container');
const converterContainer = document.querySelector('.converter-container');

const randomCocktail = 'https://www.thecocktaildb.com/api/json/v1/1/random.php'
const nonAlcoholicCocktail = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic'

//Cocktail API

//Displays non-alcoholic cocktail
function displayNonAlcoholicDrink () {
  fetch(nonAlcoholicCocktail)
    .then(response => {
      return response.json()
    })
    .then(data => {
      const drink = data.drinks;

//Randomizes the index
const randomIndex = Math.floor(Math.random() * drink.length);
const randomDrink = drink[randomIndex];
const randomDrinkId = randomDrink['idDrink']

//Endpoint where cocktails are listed by ID, with random non-alcoholic cocktail id inserter in the url.
const cocktailById = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${randomDrinkId}`;

fetch(cocktailById)
.then(response => {
  return response.json()
})
.then(data => {
  const drink = data.drinks[0]

drinkTitle.textContent = drink.strDrink
      drinkInstructions.textContent = drink.strInstructions

      ingredients.innerHTML = ''

      for (let i = 1; i <= 15; i++) {
        const ingredient = drink[`strIngredient${i}`]
        const measure = drink[`strMeasure${i}`]

        if (ingredient) {
          const listItem = document.createElement('li')
          listItem.textContent = measure
            ? `${measure} ${ingredient}`
            : ingredient
          ingredients.appendChild(listItem)
        }
      }

      //Resizes img to a fixed size
      function resizeImage() {
        drinkImage.style.width = "250px"; 
        drinkImage.style.height = "250px"; 
        drinkImage.style.objectFit = "cover"; 
      }

      drinkImage.src = drink.strDrinkThumb;
      resizeImage();

    })
    })
  }

function displayRandomDrink () {
  fetch(randomCocktail)
    .then(response => {
      return response.json()
    })
    .then(data => {
      const drink = data.drinks[0]

      drinkTitle.textContent = drink.strDrink
      drinkInstructions.textContent = drink.strInstructions

      ingredients.innerHTML = ''

      for (let i = 1; i <= 15; i++) {
        const ingredient = drink[`strIngredient${i}`]
        const measure = drink[`strMeasure${i}`]

        if (ingredient) {
          const listItem = document.createElement('li')
          listItem.textContent = measure
            ? `${measure} ${ingredient}`
            : ingredient
          ingredients.appendChild(listItem)
        }
      }

      //Resizes img to a fixed size
      function resizeImage() {
        drinkImage.style.width = "250px"; 
        drinkImage.style.height = "250px"; 
        drinkImage.style.objectFit = "cover"; 
      }

      drinkImage.src = drink.strDrinkThumb;
      resizeImage();


    })

}

//Dad joke API
const dadJokeApi = 'https://icanhazdadjoke.com/';
const dadJokeDisplay = document.querySelector('#dad-joke');

function fetchDadJoke() {
  fetch(dadJokeApi, {
    headers: {
      'Accept': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => {
      dadJokeDisplay.textContent = data.joke;
    })
}

//Buttons
dadButton.addEventListener('click', displayRandomDrink);
dadButton.addEventListener('click', fetchDadJoke);
soberButton.addEventListener('click', displayNonAlcoholicDrink);

//Changes CSS from display:none; to display:flex;
document.getElementById('dad-button').addEventListener('click', function() {
  const contentContainer = document.querySelector('.content-container');
  contentContainer.style.display = 'flex';
  converterContainer.style.display = 'flex';
});

//Change button text on click
document.getElementById('dad-button').addEventListener('click', function() {
  dadButton.textContent = "Dad still not taking you seriously? Try again!";
});

  // Scroll to the content on click
document.getElementById('dad-button').addEventListener('click', function () {
  contentContainer.scrollIntoView({ behavior: 'smooth' });
});

// Measurement converter 
const conversionRates = {
    "cl": { "cl": 1, "oz": 0.33814, "cups": 0.0422675, "tsp": 2.02884, "tbsp": 0.67628, "shots": 0.33814 },
    "oz": { "cl": 2.95735, "oz": 1, "cups": 0.125, "tsp": 6, "tbsp": 2, "shots": 1.5 },
    "cups": { "cl": 23.6588, "oz": 8, "cups": 1, "tsp": 48, "tbsp": 16, "shots": 12 },
    "tsp": { "cl": 0.492892, "oz": 0.166667, "cups": 0.0208333, "tsp": 1, "tbsp": 0.333333, "shots": 0.166667 },
    "tbsp": { "cl": 1.47868, "oz": 0.5, "cups": 0.0625, "tsp": 3, "tbsp": 1, "shots": 0.5 },
    "shots": { "cl": 4.43603, "oz": 1.5, "cups": 0.125, "tsp": 9, "tbsp": 3, "shots": 1 }
};

function convert() {
  const quantity = parseFloat(document.getElementById("quantity").value);
  const fromUnit = document.getElementById("from-unit").value;
  const toUnit = document.getElementById("to-unit").value;

  if (isNaN(quantity)) {
      document.getElementById("result").innerText = "";
      return;
  }

  const conversionRate = conversionRates[fromUnit][toUnit];
  const result = quantity * conversionRate;

  document.getElementById("result").innerText = `${quantity} ${fromUnit} is equal to ${result.toFixed(2)} ${toUnit}`;

}