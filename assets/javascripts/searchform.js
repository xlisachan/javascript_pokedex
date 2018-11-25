// Page elements
const pokeSearchForm = document.getElementById('poke-form'),
      pokeSearchInput = document.getElementById('search-input');

// Event Listener
pokeSearchForm.addEventListener('submit', e => {
    e.preventDefault();
    pokemonSearchResults.innerHTML = '';
    trainerSection.style.display = 'none';
    getPokemon(pokeSearchInput.value).then(newPokemon => renderSearchResults(newPokemon));
    pokeSearchInput.value = '';
    getPokemonNames();
});