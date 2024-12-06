
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