let pokemonRepository=function(){let t=[];const e="https://pokeapi.co/api/v2/pokemon/?limit=1050";return{getAll:function(){return t},addListItem:function(t){let e=document.querySelector(".pokemon-list"),n=document.createElement("li");n.classList.add("list-group-item","list-group-item-action");let o=document.createElement("button");o.innerText=t.name,o.classList.add("button","btn","btn-primary","btn-block"),o.setAttribute("type","button"),o.setAttribute("data-toggle","modal"),o.setAttribute("data-target","#pokeModal"),o.setAttribute("data-pokemonobject",JSON.stringify(t)),n.appendChild(o),e.appendChild(n),$("#pokeModal").on("show.bs.modal",function(t){var e=$(t.relatedTarget).data("pokemonobject"),n=$(this);(function(t){let e=t.detailsUrl;return fetch(e).then(function(t){return t.json()}).then(function(e){t.imageUrl=e.sprites.front_default,t.height=e.height,t.weight=e.weight}).catch(function(t){console.error(t)})})(e).then(function(){n.find("#pokename").text(e.name),e.height>49?n.find("#height").text(`height:  ${e.height} - Wow, that's a big pokemon! 🤩`):n.find("#height").text(`height:  ${e.height}`),e.weight>499?n.find("#weight").text(`weight:  ${e.weight} - Wow, that's a plump pokemon! 🤩`):n.find("#weight").text(`weight:  ${e.weight}`),n.find("#pokepic").attr("src",e.imageUrl),n.find("#pokepic").attr("alt",`picture of ${e.name}`)}).catch(function(t){console.error(t)})})},loadList:function(){return fetch(e).then(function(t){return t.json()}).then(function(e){e.results.forEach(function(e){!function(e){t.push(e)}({name:e.name,detailsUrl:e.url})})}).catch(function(t){console.error(t)})}}}();pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(t){pokemonRepository.addListItem(t)})});
