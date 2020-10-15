// initialize an empty array
let pokemonList = [];

//populate the array with pokemons
pokemonList[0] = {
  name: 'Bulbasaur',
  height: 0.7,
  types: ['grass','poison']
};

pokemonList[1] = {
  name: 'Shroomish',
  height: 0.4,
  types: 'grass'
};

pokemonList[2] = {
  name: 'Archeops',
  height: 1.4,
  types: ['rock', 'flying']
};

//make for loop to get names and heights of each pokemon and print them
for (let i = 0; i < pokemonList.length; i++) {
  document.write(`${pokemonList[i].name} (height: ${pokemonList[i].height})`);
  //add special flare if pokemon is bigger than 1 meter
  if (pokemonList[i].height > 1) {
    document.write(' - Wow, that\'s a big pokemon! 🤩');
  }
  document.write('<br>');
}
