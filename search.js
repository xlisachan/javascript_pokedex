//SEARCH - DIV CLASS POKE-RESULTS
let pokemonSearchResults = document.createElement('div');
pokemonSearchResults.classList.add('poke-results');

//SEARCH ID - 'poke-search'
let pokemonSearch = document.getElementById('poke-search');

// SEARCH FORM
const pokeSearchForm = document.createElement('form');
pokeSearchForm.setAttribute('autocomplete', 'off');

    // SEARCH INPUT BAR
    const pokeSearchInputBox = document.createElement('div');
    const pokeSearchInput = document.createElement('input');
    pokeSearchInput.id = 'search';
    pokeSearchInput.type = 'search';
    pokeSearchInput.name = 'search';
    pokeSearchInput.placeholder = 'Enter Pokemon';
    pokeSearchInputBox.appendChild(pokeSearchInput);

    // SEARCH BUTTON
    const pokeSearchSubmit = document.createElement('input');
    pokeSearchSubmit.type = "image";
    pokeSearchSubmit.src = 'searchbutton.png';
    pokeSearchSubmit.setAttribute('width', '30px');
    pokeSearchSubmit.setAttribute('height', '30px');

//APPEND SEARCH TO PAGE
pokeSearchForm.append(pokeSearchInputBox, pokeSearchSubmit);
pokemonSearch.appendChild(pokeSearchForm);

//SEARCH FORM
pokeSearchForm.addEventListener('submit', e => {
    e.preventDefault();
    pokemonSearchResults.innerHTML = '';
    pokedex.innerHTML = '';
    let pokemon = document.getElementById('search');
    pokeSearch(pokemon.value);
    pokemon.value = '';
});

//SEARCH CODE
let pokeSearch = (pokemon) => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`).then(response => {
        let data = response.data;
            let topDiv = document.createElement('div');
            topDiv.classList.add('top-div');

                let backButtonDiv = document.createElement('div');
                let backButton = document.createElement('img');
                backButton.classList.add('back-button');
                backButton.src = "backbutton.png";
                backButtonDiv.append(backButton);

                backButtonDiv.addEventListener('click', e => {
                    e.preventDefault();
                    pokedex.innerHTML = '';
                    let userLoginDiv = document.getElementById('user');
                    userLoginDiv.innerHTML = '';
                    derek.renderTrainer();
                })

                let addDiv = document.createElement('div');
                addDiv.classList.add('add-pokemon');

                    let addPokemonButton = document.createElement('img');
                    addPokemonButton.classList.add('add-button');
                    addPokemonButton.src = "add.png";

                    let addPokeText = document.createElement('span');
                    addPokeText.innerText = "Add Pokemon";

                addDiv.append(addPokemonButton, addPokeText);

                addDiv.addEventListener('click', e => {
                    e.preventDefault();
                    let pokeNum = data.id;
                    derek.add(pokeNum);
                    alert(`${pokemon} ADDED TO POKEDEX!`);
                });
        
        topDiv.append(backButtonDiv, addDiv);

            //DIV CLASS - 'pokefacts'
            let pokeFacts = document.createElement('div');
            pokeFacts.classList.add('poke-facts');
            
                //IMG CLASS - 'poke-pic'
                let pokeFrontPic = document.createElement('img');
                pokeFrontPic.classList.add('pokemon-pic');
                pokeFrontPic.src = data.sprites.front_default;

                //pokemon name
                let pokePtag = document.createElement('p');
                pokePtag.classList.add('poke-stats');
                pokePtag.innerHTML = '<span>' + `${data.name}` + '<br/>' + 'NO. ' + `${data.id}` + '<br/>' + `${data.types[0].type.name}` + '</span>';
            
            pokeFacts.append(pokeFrontPic, pokePtag);

            //DIV CLASS - 'pokestats' (hp, attack, defense, abilities)
            let pokeStats = document.createElement('div');
            pokeStats.classList.add('pokestats');
        
                //hp
                let pokemonHp = document.createElement('p');
                pokemonHp.innerHTML = 'HP' + '<br>' + parseInt(`${data.stats[5].base_stat}`);

                //attack
                let pokemonAtk = document.createElement('p');
                pokemonAtk.innerHTML = 'ATK' + `<br>` + parseInt(`${data.stats[4].base_stat}`);

                //defense
                let pokemonDef = document.createElement('p');
                pokemonDef.innerHTML = 'DEF' + `<br>` + parseInt(`${data.stats[3].base_stat}`);

            pokeStats.append(pokemonHp, pokemonAtk, pokemonDef);

            //abilities
            let abilities = data.abilities;
            let pokemonAbilities = [];
            abilities.forEach(ability => {
                pokemonAbilities.push(ability.ability.name);
            })

            let pokeAbility = document.createElement('div');
            pokeAbility.classList.add('pokeAbils')
            pokeAbility.innerHTML = 'Abilities' + '<br>' + `${pokemonAbilities}`;
        
        pokemonSearchResults.append(topDiv, pokeFacts, pokeStats, pokeAbility);
        pokedex.append(pokemonSearchResults);

    }).catch(error => {
        console.log(error);
    });
};

