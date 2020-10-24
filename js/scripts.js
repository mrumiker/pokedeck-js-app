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
  function add(pokemon) {
    pokemonList.push(pokemon);
    return 0;
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
      showDetails(pokemon);
    });
  }
  //create function to show details of pokemon in console
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function(pokemon) {
      let modalContainer = document.querySelector('#modal-container');
      //clear anything remaining in modalContainer
      modalContainer.innerHTML = '';
      //Create modal
      let modal = document.createElement('div');
      modal.classList.add('modal');
      //Create close button
      let closeButtonElement = document.createElement('button');
      closeButtonElement.classList.add('modal-close');
      closeButtonElement.innerText = 'Close';
      //closeButtonElement.addEventListener('click', hideModal);
      //Create Title
      let titleElement = document.createElement('h2');
      titleElement.innerText = 'pokemon.name';
      //Create Content element
      let contentElement = document.createElement('p');
      contentElement.innerText = 'height: pokemon.height';
      //Hang the elements onto the modal
      modal.appendChild(closeButtonElement);
      modal.appendChild(titleElement);
      modal.appendChild(contentElement);
      //Hang the modal on the container
      modalContainer.appendChild(modal);
      //Make the modal appear
      modalContainer.classList.add('is-visible');

    }).catch(function(e) {
      console.error(e);
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
        add(pokemon);
      });
    }).catch(function(e) {
      console.error(e);
    })
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
      console.error(e);
    });
  }

  //Create function to search for Pokemon entry by name
  function namesearch(myName) {
    let myArray = pokemonRepository.getAll().filter(pokemon => pokemon.name === myName);
    if (myArray.length === 0) {
      return 'Not Found';
    }
    return myArray;
  }
  //Return object with all functions
  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
    namesearch: namesearch
  };
})();



pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

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
