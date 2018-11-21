// Information to reach API
const url = 'https://pokeapi.co/api/v2/pokemon/';

// Page elements
const mainContainer = document.getElementById('main-container');
const pokemonSearch = document.getElementById('poke-search');
const pokeSearchForm = document.createElement('form');
const pokeSearchInput = document.createElement('input');
const pokeSearchSubmit = document.createElement('button');
const pokemonSearchResults = document.createElement('div');

pokeSearchForm.setAttribute('autocomplete', 'off');
pokeSearchInput.id = 'search';
pokeSearchInput.placeholder = 'Enter Pokemon';
pokeSearchSubmit.type= 'submit';
pokeSearchSubmit.value= 'submit';
pokeSearchSubmit.classList.add('search-submit');
pokeSearchSubmit.innerHTML = '<i class="fas fa-search"></i>';

pokeSearchForm.append(pokeSearchInput, pokeSearchSubmit);
pokemonSearch.append(pokeSearchForm);

pokeSearchForm.addEventListener('submit', e => {
    e.preventDefault();
    pokemonSearchResults.innerHTML = '';
    mainContainer.innerHTML = '';
    getPokemon(pokeSearchInput.value);
    pokeSearchInput.value = '';
});

pokemonSearchResults.classList.add('container');

// AJAX functions
const getPokemon = async(pokemon) => {
    const pokeUrl = url + pokemon + '/';
    
    try{
        const response = await fetch(pokeUrl);
        if (response.ok) {
            const data = await response.json();
            const pokemonName = data.name;
            const pokemonNumber = data.id;
            const pokemonType = data.types[0].type.name;
            const pokemonPic = data.sprites.front_default;
            const pokemonHp = parseInt(`${data.stats[5].base_stat}`);
            const pokemonAtk = parseInt(`${data.stats[4].base_stat}`);
            const pokemonDef = parseInt(`${data.stats[3].base_stat}`);
            const pokemonAbilities = [];
            const abilities = data.abilities;
            abilities.forEach(ability => {
                pokemonAbilities.push(ability.ability.name);
            });

            // const newPokemon = new Pokemon(pokemonName, pokemonNumber, pokemonType, pokemonPic, pokemonHp, pokemonAtk, pokemonDef, pokemonAbilities);
            
            // MAKE THIS A RENDER FUNCTION
            //TOP DIV - Button: (1)Back to Profile, (2)Add to Pokedex
            const navDiv = document.createElement('div');
            const backButtonDiv = document.createElement('div');
            const addToPokedex = document.createElement('div');

            navDiv.classList.add('flex-row', 'jc-sb');
            backButtonDiv.classList.add('back-button');
            backButtonDiv.innerHTML = '<i class="fas fa-arrow-circle-left"></i>';
            addToPokedex.classList.add('button-div', 'flex-row');
            addToPokedex.innerHTML = `Add To Pokedex`;

            backButtonDiv.addEventListener('click', e => {
                e.preventDefault();
                mainContainer.innerHTML = '';
                let userLoginDiv = document.getElementById('user');
                userLoginDiv.innerHTML = '';
                lisa.renderTrainer();
            })

            addToPokedex.addEventListener('click', e => {
                e.preventDefault();
                check(pokemonNumber);
            });

            //BOTTOM DIV - Pokemon
            let pokeDiv = document.createElement('div');
            let pokeImage = document.createElement('img');
            let pokePtag = document.createElement('p');
            let pokeStats = document.createElement('div'); 
            let pokeHp = document.createElement('p');
            let pokeAtk = document.createElement('p');
            let pokeDef = document.createElement('p');
            let pokeAbility = document.createElement('div');

            pokeDiv.classList.add('flex-col');
            pokeImage.classList.add('pokemon-img');
            pokePtag.classList.add('poke-stats');
            pokeStats.classList.add('poke-stats', 'flex-row');
            pokeAbility.classList.add('poke-abil');  

            pokeImage.src = pokemonPic;
            pokePtag.innerHTML = '<span>' + pokemonName + '<br/>' + 'NO. ' + pokemonNumber + '<br/>' + 'TYPE ' + pokemonType + '</span>';
            pokeHp.innerHTML = 'HP<br>' + pokemonHp;
            pokeAtk.innerHTML = 'ATK<br>' + pokemonAtk;            
            pokeDef.innerHTML = 'DEF<br>' + pokemonDef; 
            pokeAbility.innerHTML = 'Abilities' + '<br>' + pokemonAbilities;

            navDiv.append(backButtonDiv, addToPokedex);
            pokeStats.append(pokeHp, pokeAtk, pokeDef);
            pokeDiv.append(pokeImage, pokePtag, pokeStats, pokeAbility);
            pokemonSearchResults.append(navDiv, pokeDiv);
            mainContainer.append(pokemonSearchResults);
        }

    } catch(error){
        console.log(error);
    }
}


let check = pokemonNumber => {
    let found = lisa.pokemonCaught.some(function (el) {
      return el.id === pokemonNumber;
    });
    if (found){
        alert('You already have this pokemon!');
    }
    else {
        lisa.add(pokemonNumber);
        alert('Pokemon added to pokedex!');
    }
}
