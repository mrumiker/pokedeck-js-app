let pokemonRepository = (function() {
  // initialize an empty array
  let pokemonList = [];

  //populate the array with pokemons
  pokemonList.push(
    {
      name: 'Bulbasaur',
      height: 0.7,
      types: ['grass','poison']
    },

    {
      name: 'Shroomish',
      height: 0.4,
      types: 'grass'
    },

    {
      name: 'Archeops',
      height: 1.4,
      types: ['rock', 'flying']
    }
  );
  //Declare functions
  function getAll() {
    return pokemonList;
  }

  //Assign array of keys from pokemonList to a variable
  let arrayOfKeys = Object.keys(pokemonList[0]);

  //Create function to add entry to pokemonList
  function add(pokemon) {
    //Only add object to array if format is followed
    if ((typeof pokemon === 'object') &&
    (Object.keys(pokemon).length === arrayOfKeys.length) &&
    (function (entry, myKeys) {
      for (i = 0; i < myKeys.length; i++) {
        if (Object.keys(entry)[i] !== myKeys[i]) {
          return false;
        }
      }
      return true;
    })(pokemon, arrayOfKeys))
    {
      pokemonList.push(pokemon);
      return 0;
    }
    return 1;
  }
  //Create function to make buttons with name of each pokemon
  function addListItem(pokemon) {
    let pokeList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button');
    listItem.appendChild(button);
    pokeList.appendChild(listItem);
    //log pokemon info in console when button is clicked
    button.addEventListener('click', function(event) {
      showDetails(pokemon.name);
    })
  }

  function showDetails(pokemon) {
    console.log(pokemon);
  }
  //Return object with all new functions
  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    showDetails: showDetails
  };
})();

//Create function to search for Pokemon entry by name
function namesearch(myName) {
  let myArray = pokemonRepository.getAll().filter(pokemon => pokemon.name === myName);
  if (myArray.length === 0) {
    return 'Not Found';
  }
  return myArray;
}

//make forEach loop to get names and heights of each pokemon and print them

let pokeList = document.querySelector('.pokemon-list');

pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
});

//pokemonRepository.getAll().forEach(function(pokemon) {
//  document.write(`${pokemon.name} (height: ${pokemon.height})`);
  //add special flare if pokemon is bigger than 1 meter
//  if (pokemon.height > 1) {
//    document.write(' - Wow, that\'s a big pokemon! 🤩');
//  }
//  document.write('<br>');
// });
