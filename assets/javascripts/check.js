let check = pokemonNumber => {
    let found = lisa.pokemonCaught.some(el => el.id === pokemonNumber);

    if (found){
        alert('You already have this pokemon!');
    } else {
        lisa.add(pokemonNumber);
        alert('Pokemon added to pokedex!');
    }
}