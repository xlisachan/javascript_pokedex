// Information to reach API
const url = 'https://pokeapi.co/api/v2/pokemon/';

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

            const newPokemon = new Pokemon(pokemonName, pokemonNumber, pokemonType, pokemonPic, pokemonHp, pokemonAtk, pokemonDef, pokemonAbilities);
            return newPokemon;
        } 
    } catch(error){
        console.log(error);
        pokemonSearchResults.innerHTML = '<center>404 error <br /> ' + pokemon + ' not found <br/><img style="height:30vh" src="./assets/images/detectivepikachu.png"/></center>';
    }
}

const renderSearchResults = newPokemon => {
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

    addToPokedex.addEventListener('click', e => {
        e.preventDefault();
        check(newPokemon.id);
    });
}