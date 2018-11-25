// Render Function
const renderSearchResults = newPokemon => {
    const navDiv = document.createElement('div'),
          backButtonDiv = document.createElement('div'),
          addToPokedex = document.createElement('div'),
          pokeDiv = document.createElement('div'),
          pokeBasics = document.createElement('div'),
          pokeImage = document.createElement('img'),
          pokePtag = document.createElement('p'),
          pokeStats = document.createElement('div'), 
          pokeHp = document.createElement('p'),
          pokeAtk = document.createElement('p'),
          pokeDef = document.createElement('p'),
          pokeAbility = document.createElement('p'),
          outerDiv = document.createElement('div'),
          nextMon = document.createElement('div'),
          prevMon = document.createElement('div');

    navDiv.classList.add('flex-row', 'jc-sb');
    backButtonDiv.classList.add('back-button');
    addToPokedex.classList.add('button-div', 'flex-row'); 
    addToPokedex.id = "add-button";   
    pokeDiv.classList.add('flex-col');
    pokeDiv.setAttribute('style', 'width: 80%');
    pokeDiv.setAttribute('style', 'height: 33vh');
    pokeDiv.setAttribute('style', 'overflow: scroll');
    pokeBasics.classList.add('flex-row');
    pokeImage.classList.add('pokemon-img');
    pokePtag.classList.add('poke-stats');
    pokeStats.classList.add('poke-stats', 'flex-row');
    pokeAbility.classList.add('poke-abil');
    pokeAbility.setAttribute('style', 'font-size: 0.9em');
    outerDiv.classList.add('flex-row', 'opaque-div', 'jc-sb');
    outerDiv.setAttribute('style', 'width: 100%');

    backButtonDiv.innerHTML = '<i class="fas fa-arrow-circle-left"></i>';
    pokeImage.src = newPokemon.pic;
    pokePtag.innerHTML = '<span>' + newPokemon.name + '<br/> NO. ' + newPokemon.id + '<br/> TYPE ' + newPokemon.type + '</span>';
    pokeHp.innerHTML = 'HP<br/>' + newPokemon.hp;
    pokeAtk.innerHTML = 'ATK<br/>' + newPokemon.atk;            
    pokeDef.innerHTML = 'DEF<br/>' + newPokemon.def; 
    pokeAbility.innerHTML = 'Abilities <br/>' + newPokemon.pokemonAbilities;
    nextMon.innerHTML = '<i class="fas fa-chevron-right"></i>';
    prevMon.innerHTML = '<i class="fas fa-chevron-left"></i>';

    navDiv.append(backButtonDiv, addToPokedex);
    pokeBasics.append(pokeImage, pokePtag)
    pokeStats.append(pokeHp, pokeAtk, pokeDef);
    pokeDiv.append(pokeBasics, pokeStats, pokeAbility);
    outerDiv.append(prevMon, pokeDiv, nextMon);
    pokemonSearchResults.append(navDiv, outerDiv);
    pokemonSearchResults.style.display = 'inline';

    const found = lisa.pokemonCaught.some(el => el.id === newPokemon.id);
    if (found){
        addToPokedex.innerHTML = 'Caught';
    } else {
        addToPokedex.innerHTML = 'Add to Pokedex';
    }

    //Event Listeners
    addToPokedex.addEventListener('click', e => {
        e.preventDefault();
        check(newPokemon.id);
    });

    backButtonDiv.addEventListener('click', e => {
        e.preventDefault();
        login();
    });

    nextMon.addEventListener('click', e => {
        e.preventDefault();
        pokemonSearchResults.innerHTML = '';
        trainerSection.style.display = 'none';
        let afterMon = newPokemon.id + 1;
        if (afterMon === 803) afterMon = 1;
        getPokemon(afterMon).then(pokemon => renderSearchResults(pokemon));
    });

    prevMon.addEventListener('click', e => {
        e.preventDefault();
        pokemonSearchResults.innerHTML = '';
        trainerSection.style.display = 'none';
        let beforeMon = newPokemon.id - 1;
        if (beforeMon === 0) beforeMon = 802;
        getPokemon(beforeMon).then(pokemon => renderSearchResults(pokemon));
    });
}

// Helper Function
const check = pokeNumber => {
    const found = lisa.pokemonCaught.some(el => el.id === pokeNumber);
    
    if (found){
        alert('You already have this pokemon!');
    } else {
        lisa.add(pokeNumber);
        alert('Pokemon added to pokedex!');
        document.getElementById('add-button').innerHTML = 'Caught';
    }
}