let pokemonSearchResults = document.createElement('div');
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
    pokeSearchSubmit.setAttribute('width', '20px');
    pokeSearchSubmit.setAttribute('height', 'auto');
    pokeSearchSubmit.src = 'searchbutton.png';
    pokeSearchButton.appendChild(pokeSearchSubmit);

pokeSearchForm.append(pokeSearchInputBox, pokeSearchButton);
pokemonSearch.appendChild(pokeSearchForm);

pokeSearchForm.addEventListener('submit', e => {
    e.preventDefault();
    pokemonSearchResults.innerHTML = '';
    let pokemon = document.getElementById('search');
    pokeSearch(pokemon.value);
    pokemon.value = '';
});

let pokeSearch = (pokemon) => {
    axios.get('https://pokeapi.co/api/v2/pokemon/' + pokemon).then(response => {
        let data = response.data;

        //DIV CLASS - 'pokemon-pics'
        let pokemonAlbum = document.createElement('div');

        //IMG CLASS - 'poke-pic'
        let pokeFrontPic = document.createElement('img');
        pokeFrontPic.classList.add('pokemon-pic');
        pokeFrontPic.src = data.sprites.front_default;

        //DIV CLASS - 'pokefacts'
        let pokeFacts = document.createElement('div');
        pokeFacts.classList.add('flex-col');

            //pokemon name
            let pokeName = document.createElement('p');
            pokeName.classList.add('poke-stats');
            pokeName.innerText = data.name;

            //pokemon number
            // console.log(data.id);
            let pokeNumber = document.createElement('p');
            pokeNumber.classList.add('poke-stats');
            pokeNumber.innerText = `NO. ${data.id}`;

            //pokemon type
            // console.log(data.types[0].type.name);
            let pokeTypeDiv = document.createElement('div');
            pokeTypeDiv.classList.add('flex-row');
            let pokeType = document.createElement('p');
            pokeType.classList.add('poke-stats');
            pokeType.innerText = data.types[0].type.name;

        pokeFacts.append(pokeFrontPic, pokeName, pokeNumber, pokeType);

        //DIV CLASS - 'pokestats' (hp, attack, defense, abilities)
        let pokeStats = document.createElement('div');
        pokeStats.classList.add('flex-row');

            //hp
            let pokemonHp = document.createElement('p');
            pokemonHp.innerText = `${data.stats[5].stat.name} ` + parseInt(`${data.stats[5].base_stat}`);

            //attack
            let pokemonAtk = document.createElement('p');
            pokemonAtk.innerText = `${data.stats[4].stat.name} ` + parseInt(`${data.stats[4].base_stat}`);

            //defense
            let pokemonDef = document.createElement('p');
            pokemonDef.innerText = `${data.stats[3].stat.name} ` + parseInt(`${data.stats[3].base_stat}`)

            //abilities
            let abilities = data.abilities;
            let pokemonAbilities = [];
            abilities.forEach(ability => {
                pokemonAbilities.push(ability.ability.name);
            })
            let pokeAbility = document.createElement('span');
            pokeAbility.innerText = `Ability ${pokemonAbilities}`;

            pokeStats.append(pokemonHp, pokemonAtk, pokemonDef, pokeAbility);
        
        pokemonSearchResults.append(pokeFrontPic, pokeFacts, pokeStats);
        pokedex.append(pokemonSearchResults);
    }).catch(error => {
        console.log(error);
    });
};

