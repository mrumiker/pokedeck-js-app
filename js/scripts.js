let pokemonRepository = (function() {
  // initialize an empty array
  let pokemonList = [];
  // identify target URL where pokemons live and assign to variable
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=1050';

  //Declare functions
  function getAll() {
    return pokemonList;
  }

  //Create function to add entry to pokemonList
  function addpoke(pokemon) {
    pokemonList.push(pokemon);
    return 0;
  }
  //Create function to make buttons with name of each pokemon
  function addListItem(pokemon) {
    let pokeList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    listItem.classList.add('list-group-item', 'list-group-item-action');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button', 'btn', 'btn-primary', 'btn-block');
    button.setAttribute('type', 'button');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#pokeModal');
    listItem.appendChild(button);
    pokeList.appendChild(listItem);
    //log pokemon info in modal when button is clicked
    button.addEventListener('click', function() {
      //clear modal before loading new data
      $('.modal').removeData('bs.modal');
      //get pokemon stats and send to modal
      showDetails(pokemon);
    });
  }
  //create function to show details of pokemon in modal
  function showDetails(pokemon) {
    //Set variables in modal
    let titleElement = document.querySelector('#pokename');
    let heightElement = document.querySelector('#height');
    let weightElement = document.querySelector('#weight');
    let imageElement = document.querySelector('#pokepic');
    //Create loading screen for slow connections
    titleElement.innerText = 'Loading...';
    heightElement.innerText = '...';
    weightElement.innerText = '...';
    imageElement.src = '#';

    loadDetails(pokemon).then(function() {

      titleElement.innerText = pokemon.name;

      if (pokemon.height > 49) {
        heightElement.innerText = (`height:  ${pokemon.height} - Wow, that's a big pokemon! 🤩`);
      }
      else {
        heightElement.innerText = (`height:  ${pokemon.height}`);
      }

      if (pokemon.weight > 499) {
        weightElement.innerText = (`weight:  ${pokemon.weight} - Wow, that's a plump pokemon! 🤩`);
      }
      else {
        weightElement.innerText = (`weight:  ${pokemon.weight}`);
      }
      
      imageElement.src = pokemon.imageUrl;
      imageElement.setAttribute('alt', `picture of ${pokemon.name}`);

    }).catch(function(e) {
      /* eslint-disable no-console */
      console.error(e);
      /* eslint-enable no-console */
    });
  }

  //create function to get pokemons from external api
  function loadList() {
    return fetch(apiUrl).then(function(response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function(item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        addpoke(pokemon);
      });
    }).catch(function(e) {
      /* eslint-disable no-console */
      console.error(e);
      /* eslint-enable no-console */
    });
  }

  //create function to load details from URL
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function(response) {
      return response.json();
    }).then(function(details) {
      //add details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.weight = details.weight;
      item.types = details.types;
    }).catch(function(e) {
      /* eslint-disable no-console */
      console.error(e);
      /* eslint-enable no-console */
    });
  }

  //Return object with all functions
  return {
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
  };
})();

//Create massive block of pokemon buttons
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
