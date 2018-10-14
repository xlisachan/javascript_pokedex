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
            //TOP DIV - buttons: Back To Profile, Add To Pokedex
            let topDiv = document.createElement('div');
            topDiv.classList.add('top-div');

                let backButtonDiv = document.createElement('div');
                backButtonDiv.classList.add('button-div');
                backButtonDiv.innerHTML = '<i class="fas fa-arrow-left"></i>';

                backButtonDiv.addEventListener('click', e => {
                    e.preventDefault();
                    mainContainer.innerHTML = '';
                    let userLoginDiv = document.getElementById('user');
                    userLoginDiv.innerHTML = '';
                    derek.renderTrainer();
                })

                let addToPokedex = document.createElement('div');
                addToPokedex.classList.add('add-pokemon');
                addToPokedex.innerHTML = `<i class="fas fa-plus-circle"></i>&nbsp;Add Pokemon`;

                addToPokedex.addEventListener('click', e => {
                    e.preventDefault();
                    let pokeNum = data.id;
                    derek.add(pokeNum);
                    alert(`${pokemon} ADDED TO POKEDEX!`);
                });
        
            topDiv.append(backButtonDiv, addToPokedex);

            //DIV CLASS - 'pokefacts'
            let pokeFacts = document.createElement('div');
            pokeFacts.classList.add('flex-col');
            
                //IMG CLASS - 'poke-pic'
                let pokeFrontPic = document.createElement('img');
                pokeFrontPic.classList.add('pokemon-pic');
                pokeFrontPic.src = data.sprites.front_default;

                //pokemon name
                let pokePtag = document.createElement('p');
                pokePtag.classList.add('poke-stats');
                pokePtag.innerHTML = '<span>' + `${data.name}` + '<br/>' + 'NO. ' + `${data.id}` + '<br/>' + 'TYPE ' + `${data.types[0].type.name}` + '</span>';
            
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
        mainContainer.append(pokemonSearchResults);

    }).catch(error => {
        console.log(error);
    });
};