
const button = document.querySelector('#dad-button')
const drinkTitle = document.querySelector('#drink-title')
const ingredients = document.querySelector('#ingredients')
const drinkInstructions = document.querySelector('#instructions')
const drinkImage = document.querySelector(".drink-image")
const contentContainer = document.querySelector('.content-container');

const randomCocktail = 'https://www.thecocktaildb.com/api/json/v1/1/random.php'

//Cocktail API
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
const dadJokeButton = document.querySelector('#random-dad-joke-button');
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

//Button
button.addEventListener('click', displayRandomDrink);
button.addEventListener('click', fetchDadJoke);

//Changes CSS from display:none; to display:flex;
document.getElementById('dad-button').addEventListener('click', function() {
  const contentContainer = document.querySelector('.content-container');
  contentContainer.style.display = 'flex';
});

//Change button text on click
document.getElementById('dad-button').addEventListener('click', function() {
  button.textContent = "Try again";
});

  // Scroll to the content on click
document.getElementById('dad-button').addEventListener('click', function () {
  contentContainer.scrollIntoView({ behavior: 'smooth' });
});

// Measurement convert 
const conversionRates = {
  "ml": { "ml": 1, "fl-oz": 0.033814, "cups": 0.00422675, "tsp": 0.202884, "tbsp": 0.067628, "shots": 0.033814 },
  "fl-oz": { "ml": 29.5735, "fl-oz": 1, "cups": 0.125, "tsp": 6, "tbsp": 2, "shots": 1.5 },
  "cups": { "ml": 236.588, "fl-oz": 8, "cups": 1, "tsp": 48, "tbsp": 16, "shots": 12 },
  "tsp": { "ml": 4.92892, "fl-oz": 0.166667, "cups": 0.0208333, "tsp": 1, "tbsp": 0.333333, "shots": 0.166667 },
  "tbsp": { "ml": 14.7868, "fl-oz": 0.5, "cups": 0.0625, "tsp": 3, "tbsp": 1, "shots": 0.5 },
  "shots": { "ml": 44.3603, "fl-oz": 1.5, "cups": 0.125, "tsp": 9, "tbsp": 3, "shots": 1 }
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