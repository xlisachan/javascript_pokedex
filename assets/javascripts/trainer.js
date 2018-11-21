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
            if (element.name == name){
                console.log(element);
                return element;
            } else {
                console.log(`Pokemon not found`);
                return `Pokemon not found`;
            }
        });
    }
    
    add(pokemonObject){
        const pokeUrl = url + pokemonObject + '/';
        axios.get(pokeUrl).then(response => { 
            let data = response.data;
            let pokemonName = data.name;
            let pokemonNumber = data.id;
            let pokemonType = data.types[0].type.name;
            let pokemonPic = data.sprites.front_default;
            let pokemonHp = parseInt(`${data.stats[5].base_stat}`);
            let pokemonAtk = parseInt(`${data.stats[4].base_stat}`);
            let pokemonDef = parseInt(`${data.stats[3].base_stat}`);
            let pokemonAbilities = [];
            let abilities = data.abilities;
                abilities.forEach(ability => {
                    pokemonAbilities.push(ability.ability.name);
                });
            
            let newPokemon = new Pokemon(pokemonName, pokemonNumber, pokemonType, pokemonPic, pokemonHp, pokemonAtk, pokemonDef, pokemonAbilities);

            this.pokemonCaught.push(newPokemon);
        });
    }

    renderTrainer() {
        let userNameDiv = document.getElementById('dropdown');
        let ddButton = document.getElementById('dropdown-btn');
        let ddProfile = document.getElementById('dropdown-user');
        let ddLogin = document.getElementById('dropdown-login');
        let trainerSection = document.createElement('div');
        let trainerName = document.createElement('div');
        let trainerCount = document.createElement('div');
        let pokemonSection = document.createElement('div');
        
        ddButton.innerText = this.name;

        userNameDiv.addEventListener('click', e =>{
            e.preventDefault();
            if (e.target === ddProfile){
                mainContainer.innerHTML = '';
                userLogin.style.display = 'inline';
                lisa.renderTrainer();
            } else if (e.target === ddLogin){
                mainContainer.innerHTML = '';
                userLogin.style.display = 'none';
                pokeSearchForm.style.display = 'none';
                mainContainer.append(loginMenu); 
            } 
        })

        trainerSection.classList.add('container');
        pokemonSection.classList.add('trainer-pokemon', 'jc-start'); 
        trainerName.innerText = 'Name ' + this.name;
        trainerCount.innerHTML = `# of Pokemon Caught<br>${this.pokemonCaught.length} / 802`;
            
        // DIV CLASS - 'trainer-pokemon'
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
                pokemonSearchResults.innerHTML = '';
                trainerSection.remove();
                getPokemon(pokemon.name);
            })
        }
            
        trainerSection.append(trainerName, trainerCount, pokemonSection);
        mainContainer.append(trainerSection);
    }
}