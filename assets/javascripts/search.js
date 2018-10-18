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
pokemonSearchResults.classList.add('search-results','flex-col');

//SEARCH CODE
let pokeSearch = (pokemon) => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`).then(response => {
        let data = response.data;
        let pokemonName = data.name;
        let pokemonNumber = data.id;
        let pokemonType = data.types[0].type.name;
        let pokeFrontPic = data.sprites.front_default;
        // let pokemonHp = parseInt(`${data.stats[5].base_stat}`);
        // let pokemonAtk = parseInt(`${data.stats[4].base_stat}`);
        // let pokemonDef = parseInt(`${data.stats[3].base_stat}`);
        // let pokemonAbilities = [];
        // let abilities = data.abilities;
        // abilities.forEach(ability => {
        //     pokemonAbilities.push(ability.ability.name);
        // });
        //TOP DIV - buttons: Back To Profile, Add To Pokedex
        let navDiv = document.createElement('div');
        navDiv.classList.add('nav-div', 'flex-row', 'jc-sb');

            let backButtonDiv = document.createElement('div');
            backButtonDiv.classList.add('back-button');
            backButtonDiv.innerHTML = '<i class="fas fa-arrow-circle-left"></i>';

            backButtonDiv.addEventListener('click', e => {
                e.preventDefault();
                mainContainer.innerHTML = '';
                let userLoginDiv = document.getElementById('user');
                userLoginDiv.innerHTML = '';
                derek.renderTrainer();
            })

            let addToPokedex = document.createElement('div');
            addToPokedex.classList.add('button-div', 'flex-row');
            addToPokedex.innerHTML = `Add To Pokedex`;

            addToPokedex.addEventListener('click', e => {
                e.preventDefault();
                let pokeNum = data.id;
                derek.add(pokeNum);
                alert(`${pokemon} ADDED TO POKEDEX!`);
            });

        //DIV CLASS - 'pokefacts'
        let pokeDiv = document.createElement('div');
        pokeDiv.classList.add('flex-col');
        
            //IMG CLASS - 'poke-pic'
            let pokeImage = document.createElement('img');
            pokeImage.classList.add('pokemon-img');
            pokeImage.src = data.sprites.front_default;

            //pokemon name
            let pokePtag = document.createElement('p');
            pokePtag.classList.add('poke-stats');
            pokePtag.innerHTML = '<span>' + `${data.name}` + '<br/>' + 'NO. ' + `${data.id}` + '<br/>' + 'TYPE ' + `${data.types[0].type.name}` + '</span>';
        
        
        //DIV CLASS - 'pokestats' (hp, attack, defense, abilities)
        let pokeStats = document.createElement('div');
        pokeStats.classList.add('poke-stats', 'flex-row');
    
            //hp
            let pokemonHp = document.createElement('p');
            pokemonHp.innerHTML = 'HP<br>' + parseInt(`${data.stats[5].base_stat}`);

            //attack
            let pokemonAtk = document.createElement('p');
            pokemonAtk.innerHTML = 'ATK<br>' + parseInt(`${data.stats[4].base_stat}`);

            //defense
            let pokemonDef = document.createElement('p');
            pokemonDef.innerHTML = 'DEF<br>' + parseInt(`${data.stats[3].base_stat}`);

            //abilities
            let abilities = data.abilities;
            let pokemonAbilities = [];
            abilities.forEach(ability => {
                pokemonAbilities.push(ability.ability.name);
            })

            let pokeAbility = document.createElement('div');
            pokeAbility.innerHTML = 'Abilities' + '<br>' + `${pokemonAbilities}`;
        
        navDiv.append(backButtonDiv, addToPokedex);
        pokeDiv.append(pokeImage, pokePtag);
        pokeStats.append(pokemonHp, pokemonAtk, pokemonDef);
        pokemonSearchResults.append(navDiv, pokeDiv, pokeStats, pokeAbility);
        mainContainer.append(pokemonSearchResults);

    }).catch(error => {
        console.log(error);
    });
};