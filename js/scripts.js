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
    button.setAttribute('data-pokemonobject', JSON.stringify(pokemon));
    listItem.appendChild(button);
    pokeList.appendChild(listItem);
    //log pokemon info in modal when button is clicked
    $('#pokeModal').on('show.bs.modal', function(event) {
      var button = $(event.relatedTarget);
      var pokemon = button.data('pokemonobject');
      var modal = $(this);
      loadDetails(pokemon).then(function() {

        modal.find('#pokename').text(pokemon.name);

        if (pokemon.height > 49) {
          modal.find('#height').text(`height:  ${pokemon.height} - Wow, that's a big pokemon! 🤩`);
        }
        else {
          modal.find('#height').text(`height:  ${pokemon.height}`);
        }

        if (pokemon.weight > 499) {
          modal.find('#weight').text(`weight:  ${pokemon.weight} - Wow, that's a plump pokemon! 🤩`);
        }
        else {
          modal.find('#weight').text(`weight:  ${pokemon.weight}`);
        }

        modal.find('#pokepic').attr('src', pokemon.imageUrl);
        modal.find('#pokepic').attr('alt', `picture of ${pokemon.name}`);

      }).catch(function(e) {
        /* eslint-disable no-console */
        console.error(e);
        /* eslint-enable no-console */
      });
    })

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
    }).catch(function(e) {
      /* eslint-disable no-console */
      console.error(e);
      /* eslint-enable no-console */
    });
  }

  //Return object with all functions
  return {
    getAll, addListItem, loadList
  };
})();

//Create massive block of pokemon buttons
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
