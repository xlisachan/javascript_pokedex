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
    addToPokedex.id = "add-button";   
    pokeDiv.classList.add('flex-col', 'opaque-div', 'poke-results');
    pokeBasics.classList.add('flex-row');
    pokeImage.classList.add('pokemon-img');
    pokePtag.classList.add('poke-stats');
    pokeStats.classList.add('poke-stats', 'flex-row');
    pokeAbility.classList.add('poke-abil');
    pokeAbility.setAttribute('style', 'font-size: 0.9em');
    outerDiv.classList.add('flex-row', 'jc-sb');
    outerDiv.setAttribute('style', 'width: 100%');
    nextMon.classList.add('arrow-div');
    prevMon.classList.add('arrow-div');

    backButtonDiv.innerHTML = '<i class="fas fa-home"></i>';
    pokeImage.src = newPokemon.pic;
    pokeImage.alt = newPokemon.name;
    pokePtag.innerHTML = '<span>' + newPokemon.name + '<br/> NO. ' + newPokemon.id + '<br/> TYPE ' + newPokemon.type + '</span>';
    pokeHp.innerHTML = 'HP<br/>' + newPokemon.hp;
    pokeAtk.innerHTML = 'ATK<br/>' + newPokemon.atk;            
    pokeDef.innerHTML = 'DEF<br/>' + newPokemon.def; 
    pokeAbility.innerHTML = 'Abilities <br/>' + newPokemon.abilities;
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
    if (found) {
        addToPokedex.classList.add('addedbutton', 'flex-row');
        addToPokedex.innerHTML = 'Caught';
    } else {
        addToPokedex.classList.add('button-div', 'flex-row');
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

// Alert modal
const msg = document.getElementById('alert-message');
const modal = document.getElementById('alert-modal');
const alertButton = document.getElementById('alert-button');

alertButton.addEventListener('click', e => {
    modal.style.display="none";
})

// Helper Function
const check = pokeNumber => {
    const found = lisa.pokemonCaught.some(el => el.id === pokeNumber);
    
    if (found){
        msg.innerHTML = 'You already have this pokemon!';
        modal.style.display = 'inline';
    } else {
        lisa.add(pokeNumber);
        msg.innerHTML = 'Pokemon added to pokedex!';
        modal.style.display = 'inline';
        document.getElementById('add-button').classList.add('addedbutton', 'flex-row');
        document.getElementById('add-button').innerHTML = 'Caught';
    }
}