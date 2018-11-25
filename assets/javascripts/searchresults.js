// Page Elements
const backButtonDiv = document.createElement('div'),
      addToPokedex = document.createElement('div');
      
backButtonDiv.classList.add('back-button');
addToPokedex.classList.add('button-div', 'flex-row');

backButtonDiv.innerHTML = '<i class="fas fa-arrow-circle-left"></i>';
addToPokedex.innerHTML = 'Add To Pokedex';

//Event Listeners
addToPokedex.addEventListener('click', e => {
    e.preventDefault();
    check(newPokemon.id);
});

backButtonDiv.addEventListener('click', e => {
    e.preventDefault();
    login();
});

// Helper Function
const check = id => {
    const found = lisa.pokemonCaught.filter(el => el.id === id);
    
    if (found){
        alert('You already have this pokemon!');
    } else {
        lisa.add(id);
        alert('Pokemon added to pokedex!');
    }
}

// Render Function
const renderSearchResults = newPokemon => {
    const navDiv = document.createElement('div'),
          pokeDiv = document.createElement('div'),
          pokeBasics = document.createElement('div'),
          pokeImage = document.createElement('img'),
          pokePtag = document.createElement('p'),
          pokeStats = document.createElement('div'), 
          pokeHp = document.createElement('p'),
          pokeAtk = document.createElement('p'),
          pokeDef = document.createElement('p'),
          pokeAbility = document.createElement('p');
    
    navDiv.classList.add('flex-row', 'jc-sb');
    pokeDiv.classList.add('flex-col', 'opaque-div');
    pokeBasics.classList.add('flex-row');
    pokeImage.classList.add('pokemon-img');
    pokePtag.classList.add('poke-stats');
    pokeStats.classList.add('poke-stats', 'flex-row');
    pokeAbility.classList.add('poke-abil');  

    pokeImage.src = newPokemon.pic;
    pokePtag.innerHTML = '<span>' + newPokemon.name + '<br/> NO. ' + newPokemon.id + '<br/> TYPE ' + newPokemon.type + '</span>';
    pokeHp.innerHTML = 'HP <br/>' + newPokemon.hp;
    pokeAtk.innerHTML = 'ATK <br/>' + newPokemon.atk;            
    pokeDef.innerHTML = 'DEF <br/>' + newPokemon.def; 
    pokeAbility.innerHTML = 'Abilities <br/>' + newPokemon.pokemonAbilities;

    navDiv.append(backButtonDiv, addToPokedex);
    pokeBasics.append(pokeImage, pokePtag)
    pokeStats.append(pokeHp, pokeAtk, pokeDef);
    pokeDiv.append(pokeBasics, pokeStats, pokeAbility);
    pokemonSearchResults.append(navDiv, pokeDiv);
    pokemonSearchResults.style.display = 'inline';
}