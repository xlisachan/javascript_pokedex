// Information to reach API
const url = 'https://pokeapi.co/api/v2/pokemon/';

// Async function
const getPokemon = async(pokemon) => {
    let searchValue;
    typeof pokemon === 'string' ? searchValue = pokemon.toLowerCase() : searchValue = pokemon;

    const pokeUrl = url + searchValue + '/';
    
    try{
        const response = await fetch(pokeUrl);
        const data = await response.json();

        const pokemonAbilities = [];
        const abilities = data.abilities;
        abilities.forEach(ability => {
            pokemonAbilities.push(ability.ability.name);
        });

        const newPokemon = {
            name: data.name,
            id: data.id,
            type: data.types[0].type.name,
            pic: data.sprites.front_default,
            hp: parseInt(`${data.stats[5].base_stat}`),
            atk: parseInt(`${data.stats[4].base_stat}`),
            def: parseInt(`${data.stats[3].base_stat}`),
            abilities: pokemonAbilities
        }
        return newPokemon;
        
    } catch(error){
        console.log(error);
        pokemonSearchResults.style.display = 'inline';
        pokemonSearchResults.innerHTML = '<center>404 error <br /> ' + pokemon + ' not found <br/><img style="height:30vh" src="./assets/images/detectivepikachu.png"/></center>';
    }
}
