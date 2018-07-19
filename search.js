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
        pokemonAlbum.classList.add('pokemon-pics');

            //IMG CLASS - 'poke-pic'
                //front
                let pokeFrontPic = document.createElement('img');
                pokeFrontPic.classList.add('pokemon-pic');
                pokeFrontPic.src = data.sprites.front_default;

                //back
                let pokeBackPic = document.createElement('img');
                pokeBackPic.classList.add('pokemon-pic');
                pokeBackPic.src = data.sprites.back_default;
        
        pokemonAlbum.append(pokeFrontPic, pokeBackPic);

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

        pokeFacts.append(pokeName, pokeNumber, pokeType);

        //DIV CLASS - 'pokestats' (hp, attack, defense, abilities)
        let pokeStats = document.createElement('div');
        pokeStats.classList.add('pokestats');

            //hp
            let pokemonHp = document.createElement('p');
            pokemonHp.innerHTML = 'HP' + `<br>` + parseInt(`${data.stats[5].base_stat}`);

            //attack
            let pokemonAtk = document.createElement('p');
            pokemonAtk.innerHTML = 'ATK' + `<br>` + parseInt(`${data.stats[4].base_stat}`);

            //defense
            let pokemonDef = document.createElement('p');
            pokemonDef.innerHTML = 'DEF' + `<br>` + parseInt(`${data.stats[3].base_stat}`);

        //abilities
        let abilities = data.abilities;
        let pokemonAbilities = [];
        abilities.forEach(ability => {
            pokemonAbilities.push(ability.ability.name);
        })
        let pokeAbility = document.createElement('div');
        pokeAbility.classList.add('pokeAbils')
        pokeAbility.innerHTML = 'Abilities' + '<br>' + `${pokemonAbilities}`;

        pokeStats.append(pokemonHp, pokemonAtk, pokemonDef);
        
        pokemonSearchResults.append(pokemonAlbum, pokeFacts, pokeStats, pokeAbility);
        pokedex.append(pokemonSearchResults);
    }).catch(error => {
        console.log(error);
    });
};

