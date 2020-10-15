let pokemonList = [];

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

for (let i = 0; i < pokemonList.length; i++) {
  document.write(`${pokemonList[i].name} (height: ${pokemonList[i].height})<br>`);
}
