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

  function add(pokemon) {
    //Only add to array if format is followed
    if ((typeof pokemon === 'object') && (Object.keys(pokemon) === ['name', 'height', 'types'])) {
      pokemonList.push(pokemon);
    }
    return;
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
