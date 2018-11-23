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
        this.pokemonCaught.filter(element => {
            return element.name == name ? element : 'Pokemon not found';
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
        let userNameDiv = document.getElementById('dropdown');
        let ddButton = document.getElementById('dropdown-btn');
        let ddProfile = document.getElementById('dropdown-user');
        let ddLogin = document.getElementById('dropdown-login');
        let trainerName = document.getElementById('trainer-name');
        let trainerCount = document.getElementById('trainer-count');
        
        ddButton.innerText = this.name;
        trainerName.innerText = this.name;
        trainerCount.innerHTML = this.pokemonCaught.length;

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
        })
            
        for (let pokemon of this.pokemonCaught) {
            let pokeBall = document.createElement('span');
            let pokePic = document.createElement('img');
            let pokeTag = document.createElement('p');
            
            pokeBall.classList.add('pokeball', 'flex-col', 'jc-center');
            pokePic.src = pokemon.pic;
            pokeTag.innerText = pokemon.name;

            pokeBall.append(pokePic, pokeTag);
            pokemonSection.append(pokeBall);

            pokeBall.addEventListener('click', e => {
                e.preventDefault();
                trainerSection.style.display = 'none';
                getPokemon(pokemon.name);
                pokemonSearchResults.style.display = 'inline';
            })
        }
    }
}