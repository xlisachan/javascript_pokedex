// Page elements
const mainContainer = document.getElementById('main-container');
const loginMenu = document.getElementById('login-menu');
const userInfo = document.getElementById('user-info');
const userAvatar = document.getElementById('user-avatar');
const userName = document.getElementById('user-name');
const userLogin = document.getElementById('user');
const trainerSection = document.getElementById('trainer-section');
const pokemonSection = document.getElementById('pokemon-section');
const navBar = document.getElementById('navigation-bar');
const screen = document.getElementById('screen');
const navSearch = document.getElementById('nav-search');
const pokeSearchForm = document.getElementById('poke-form');
const pokeSearchInput = document.getElementById('search-input');
const pokemonSearchResults = document.getElementById('search-results');
const userNameDiv = document.getElementById('dropdown');
const ddButton = document.getElementById('dropdown-btn');
const ddProfile = document.getElementById('dropdown-user');
const ddLogin = document.getElementById('dropdown-login');
const trainerName = document.getElementById('trainer-name');
const trainerCount = document.getElementById('trainer-count');

const backButtonDiv = document.createElement('div');
const addToPokedex = document.createElement('div');
const pokeDiv = document.createElement('div');
const pokeBasics = document.createElement('div');
const pokeImage = document.createElement('img');
const pokePtag = document.createElement('p');
const pokeStats = document.createElement('div'); 
const pokeHp = document.createElement('p');
const pokeAtk = document.createElement('p');
const pokeDef = document.createElement('p');
const pokeAbility = document.createElement('p');
const navDiv = document.createElement('div');

navDiv.classList.add('flex-row', 'jc-sb');
backButtonDiv.classList.add('back-button');
addToPokedex.classList.add('button-div', 'flex-row');
pokeDiv.classList.add('flex-col', 'opaque-div');
pokeBasics.classList.add('flex-row');
pokeImage.classList.add('pokemon-img');
pokePtag.classList.add('poke-stats');
pokeStats.classList.add('poke-stats', 'flex-row');
pokeAbility.classList.add('poke-abil');  

backButtonDiv.innerHTML = '<i class="fas fa-arrow-circle-left"></i>';
addToPokedex.innerHTML = `Add To Pokedex`;

//Event Listeners
userNameDiv.addEventListener('click', e =>{
    e.preventDefault();
    if (e.target === ddProfile){
        e.preventDefault();
        loginMenu.style.display = 'none';
        pokeSearchForm.style.display = 'inline-flex';
        userLogin.style.display = 'inline';
        trainerSection.style.display = 'inline';
        pokemonSection.innerHTML = '';
        pokemonSearchResults.style.display = 'none';
        lisa.renderTrainer();
    } else if (e.target === ddLogin){
        pokemonSearchResults.innerHTML = '';
        userLogin.style.display = 'none';
        pokeSearchForm.style.display = 'none';
        trainerSection.style.display = 'none';
        pokemonSearchResults.style.display = 'none';
        loginMenu.style.display = 'inline';
    } 
});

backButtonDiv.addEventListener('click', e => {
    e.preventDefault();
    loginMenu.style.display = 'none';
    pokeSearchForm.style.display = 'inline-flex';
    userLogin.style.display = 'inline';
    trainerSection.style.display = 'inline';
    pokemonSection.innerHTML = '';
    pokemonSearchResults.innerHTML = '';
    lisa.renderTrainer();
});

pokeSearchForm.addEventListener('submit', e => {
    e.preventDefault();
    pokemonSearchResults.innerHTML = '';
    loginMenu.style.display = 'none';
    trainerSection.style.display = 'none';
    userLogin.style.display = 'inline';
    getPokemon(pokeSearchInput.value).then(newPokemon => renderSearchResults(newPokemon));
    pokemonSearchResults.style.display = 'inline';
    pokeSearchInput.value = '';
});

let check = id => {
    let found = lisa.pokemonCaught.some(el => el.id === id);
    
    if (found){
        alert('You already have this pokemon!');
    } else {
        lisa.add(id);
        alert('Pokemon added to pokedex!');
    }
}