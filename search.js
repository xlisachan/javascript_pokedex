let pokemonSearchResults = document.createElement('div');
pokemonSearchResults.classList.add('poke-results');
//SEARCH ID - 'poke-search' // FORM - POKESEARCH
let pokemonSearch = document.getElementById('poke-search');

const pokeSearchForm = document.createElement('form');
pokeSearchForm.id = 'poke-search';
pokeSearchForm.setAttribute('autocomplete', 'off');

    const pokeSearchInputBox = document.createElement('div');
    const pokeSearchInput = document.createElement('input');
    pokeSearchInput.id = 'search';
    pokeSearchInput.type = 'search';
    pokeSearchInput.name = 'search';
    pokeSearchInput.placeholder = 'Enter Pokemon';
    pokeSearchInputBox.appendChild(pokeSearchInput);

    const pokeSearchButton = document.createElement('div');
    const pokeSearchSubmit = document.createElement('img');
    pokeSearchSubmit.setAttribute('width', '30px');
    pokeSearchSubmit.setAttribute('height', 'auto');
    pokeSearchSubmit.src = 'searchbutton.png';
    pokeSearchButton.appendChild(pokeSearchSubmit);

pokeSearchForm.append(pokeSearchInputBox, pokeSearchButton);
pokemonSearch.appendChild(pokeSearchForm);

pokeSearchForm.addEventListener('submit', e => {
    e.preventDefault();
    pokemonSearchResults.innerHTML = '';
    pokedex.innerHTML = '';
    let pokemon = document.getElementById('search');
    pokeSearch(pokemon.value);
    pokemon.value = '';
});

let pokeSearch = (pokemon) => {
    axios.get('https://pokeapi.co/api/v2/pokemon/' + pokemon).then(response => {
        let data = response.data;

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
                pokePtag.innerHTML = '<p>' + `${data.name}` + '<br/>' + 'NO. ' + `${data.id}` + '<br/>' + `${data.types[0].type.name}` + '</p>';
            
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
        
        pokemonSearchResults.append(pokeFacts, pokeStats, pokeAbility);
        pokedex.append(pokemonSearchResults);

    }).catch(error => {
        console.log(error);
    });
};

