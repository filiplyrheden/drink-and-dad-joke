
const button = document.querySelector('#random-drink-button')
const drinkTitle = document.querySelector('#drink-title')
const ingredients = document.querySelector('#ingredients')
const drinkInstructions = document.querySelector('#instructions')
const drinkImage = document.querySelector(".drink-image")

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

      drinkImage.src = drink.strDrinkThumb;


    })

}

button.addEventListener('click', displayRandomDrink)


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
    .catch(error => {
      console.error('Error fetching dad joke:', error);
      dadJokeDisplay.textContent = 'Oops! Failed to fetch a joke.';
    });
}

dadJokeButton.addEventListener('click', fetchDadJoke);