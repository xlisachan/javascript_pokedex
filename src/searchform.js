// Page elements
const pokeSearchForm = document.getElementById('poke-form'),
      pokeSearchInput = document.getElementById('search-input');

// Event Listener
pokeSearchForm.addEventListener('submit', e => {
    e.preventDefault();
    trainerSection.style.display = 'none';
    getPokemon(pokeSearchInput.value)
        .then(newPokemon => {
            noMatchPage.style.display = 'none';
            pokemonSearchResults.style.display = 'inline-block';
            renderSearchResults(newPokemon)
        })
        .catch(error => {
            pokemonSearchResults.style.display = 'none';
            noMatchPage.style.display = 'inline-block';
        });
    pokeSearchInput.value = '';
});
