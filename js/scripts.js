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
  //Return object with both new functions
  return {
    getAll: getAll,
    add: add
  };
})();

//make forEach loop to get names and heights of each pokemon and print them
pokemonRepository.getAll().forEach(function(pokemon) {
  document.write(`${pokemon.name} (height: ${pokemon.height})`);
  //add special flare if pokemon is bigger than 1 meter
  if (pokemon.height > 1) {
    document.write(' - Wow, that\'s a big pokemon! 🤩');
  }
  document.write('<br>');
});
