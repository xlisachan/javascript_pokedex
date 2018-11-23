// Information to reach API
const url = 'https://pokeapi.co/api/v2/pokemon/';

// Page elements
const mainContainer = document.getElementById('main-container');
const navSearch = document.getElementById('nav-search');
const pokeSearchForm = document.getElementById('poke-form');
const pokeSearchInput = document.getElementById('search-input');
const pokemonSearchResults = document.getElementById('search-results');

const pokeDiv = document.createElement('div');
const pokeImage = document.createElement('img');
const pokePtag = document.createElement('p');
const pokeStats = document.createElement('div'); 
const pokeHp = document.createElement('p');
const pokeAtk = document.createElement('p');
const pokeDef = document.createElement('p');
const pokeAbility = document.createElement('p');

pokeSearchForm.addEventListener('submit', e => {
    e.preventDefault();
    pokemonSearchResults.innerHTML = '';
    loginMenu.style.display = 'none';
    trainerSection.style.display = 'none';
    userLogin.style.display = 'inline';
    getPokemon(pokeSearchInput.value);
    pokemonSearchResults.style.display = 'inline';
    pokeSearchInput.value = '';
});

// AJAX functions
const getPokemon = async(pokemon) => {
    const pokeUrl = url + pokemon + '/';
    
    try{
        const response = await fetch(pokeUrl);
        if (response.ok) {
            const data = await response.json();
            const pokemonName = data.name;
            const pokemonNumber = data.id;
            const pokemonType = data.types[0].type.name;
            const pokemonPic = data.sprites.front_default;
            const pokemonHp = parseInt(`${data.stats[5].base_stat}`);
            const pokemonAtk = parseInt(`${data.stats[4].base_stat}`);
            const pokemonDef = parseInt(`${data.stats[3].base_stat}`);
            const pokemonAbilities = [];
            const abilities = data.abilities;
            abilities.forEach(ability => {
                pokemonAbilities.push(ability.ability.name);
            });

            // const newPokemon = new Pokemon(pokemonName, pokemonNumber, pokemonType, pokemonPic, pokemonHp, pokemonAtk, pokemonDef, pokemonAbilities);
            const navDiv = document.createElement('div');
            const backButtonDiv = document.createElement('div');
            const addToPokedex = document.createElement('div');

            navDiv.classList.add('flex-row', 'jc-sb');
            backButtonDiv.classList.add('back-button');
            backButtonDiv.innerHTML = '<i class="fas fa-arrow-circle-left"></i>';
            addToPokedex.classList.add('button-div', 'flex-row');
            addToPokedex.innerHTML = `Add To Pokedex`;
            
            pokeDiv.classList.add('flex-col');
            pokeImage.classList.add('pokemon-img');
            pokePtag.classList.add('poke-stats');
            pokeStats.classList.add('poke-stats', 'flex-row');
            pokeAbility.classList.add('poke-abil');  

            pokeImage.src = pokemonPic;
            pokePtag.innerHTML = '<span>' + pokemonName + '<br/> NO. ' + pokemonNumber + '<br/> TYPE ' + pokemonType + '</span>';
            pokeHp.innerHTML = 'HP <br/>' + pokemonHp;
            pokeAtk.innerHTML = 'ATK <br/>' + pokemonAtk;            
            pokeDef.innerHTML = 'DEF <br/>' + pokemonDef; 
            pokeAbility.innerHTML = 'Abilities <br/>' + pokemonAbilities;

            navDiv.append(backButtonDiv, addToPokedex);
            pokeStats.append(pokeHp, pokeAtk, pokeDef);
            pokeDiv.append(pokeImage, pokePtag, pokeStats, pokeAbility);
            pokemonSearchResults.append(navDiv, pokeDiv);

            backButtonDiv.addEventListener('click', e => {
                e.preventDefault();
                loginMenu.style.display = 'none';
                pokeSearchForm.style.display = 'inline-flex';
                userLogin.style.display = 'inline';
                trainerSection.style.display = 'inline';
                pokemonSection.innerHTML = '';
                pokemonSearchResults.innerHTML = '';
                lisa.renderTrainer();
            })

            addToPokedex.addEventListener('click', e => {
                e.preventDefault();
                check(pokemonNumber);
            });
        }
    } catch(error){
        console.log(error);
    }
}