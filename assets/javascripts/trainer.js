class Trainer{
    constructor(name, avatar){
        this.name = name;
        this.avatar = avatar;
        this.pokemonCaught = [];
    }

    all(){
        //no parameters
        //returns an array of Pokemon objects
        return this.pokemonCaught;
    }

    get(name){
        //accepts one parameter - name
        //returns a Pokemon object housing info for the pokemon found
        this.pokemonCaught.filter(el => {
            return el.name == name ? el : 'Pokemon not found';
        });
    }
    
    add(pokemonObject){
        const pokeUrl = url + pokemonObject + '/';
        axios.get(pokeUrl).then(response => { 
            const data = response.data;
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

            this.pokemonCaught.push(newPokemon);
        });
    }

    renderTrainer() {
        const ddButton = document.getElementById('dropdown-btn'),
              trainerName = document.getElementById('trainer-name'),
              trainerCount = document.getElementById('trainer-count');

        ddButton.innerText = this.name;
        trainerName.innerText = this.name;
        trainerCount.innerHTML = this.pokemonCaught.length;
            
        for (let pokemon of this.pokemonCaught) {
            const pokeBall = document.createElement('span'),
                  pokePic = document.createElement('img'),
                  pokeTag = document.createElement('p');
            
            pokeBall.classList.add('pokeball', 'flex-col', 'jc-center');
            pokePic.src = pokemon.pic;
            pokeTag.innerText = pokemon.name;

            pokeBall.append(pokePic, pokeTag);
            pokemonSection.append(pokeBall);

            pokeBall.addEventListener('click', e => {
                e.preventDefault();
                pokemonSearchResults.innerHTML = '';
                trainerSection.style.display = 'none';
                getPokemon(pokemon.name).then(newPokemon => renderSearchResults(newPokemon));
            });
        }
    }
}