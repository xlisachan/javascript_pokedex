//NAV BAR - SEARCH
let pokemonSearch = document.getElementById('poke-search');

    //FORM
    const pokeSearchForm = document.createElement('form');
    pokeSearchForm.setAttribute('autocomplete', 'off');
    const pokeSearchInput = document.createElement('input');
    pokeSearchInput.id = 'search';
    pokeSearchInput.placeholder = 'Enter Pokemon';

    //BUTTON
    const pokeSearchSubmit = document.createElement('button');
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
    let pokemon = document.getElementById('search');
    pokeSearch(pokemon.value);
    pokemon.value = '';
});

//SEARCH DIV
let pokemonSearchResults = document.createElement('div');
pokemonSearchResults.classList.add('container');

//SEARCH CODE
let pokeSearch = (pokemon) => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`).then(response => {
        let data = response.data;
        let pokemonName = data.name;
        let pokemonNumber = data.id;
        let pokemonType = data.types[0].type.name;
        let pokeFrontPic = data.sprites.front_default;
        let pokemonHp = parseInt(`${data.stats[5].base_stat}`);
        let pokemonAtk = parseInt(`${data.stats[4].base_stat}`);
        let pokemonDef = parseInt(`${data.stats[3].base_stat}`);
        let pokemonAbilities = [];
        let abilities = data.abilities;
        abilities.forEach(ability => {
            pokemonAbilities.push(ability.ability.name);
        });

        //TOP DIV - Button: (1)Back to Profile, (2)Add to Pokedex
        let navDiv = document.createElement('div');
        let backButtonDiv = document.createElement('div');
        let addToPokedex = document.createElement('div');

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
            derek.renderTrainer();
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
        
        pokeImage.src = pokeFrontPic;
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

    }).catch(error => {
        console.log(error);
    });
};

let check = pokemonNumber => {
    let found = derek.pokemonCaught.some(function (el) {
      return el.id === pokemonNumber;
    });
    if (found){
        alert('You already have this pokemon!');
    }
    else {
        derek.add(pokemonNumber);
        alert('Pokemon added to pokedex!');
    }
}
