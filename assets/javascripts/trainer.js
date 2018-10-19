class Trainer{
    constructor(name){
        this.name = name;
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
        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonObject}/`).then(response => {
            let data = response.data;
            let pokemonName = data.name;
            let pokemonNumber = data.id;
            let pokemonType = data.types[0].type.name;
            let pokeFrontPic = data.sprites.front_default;
            let pokemonHp = parseInt(`${data.stats[5].base_stat}`);
            let pokemonAtk = parseInt(`${data.stats[4].base_stat}`);
            let pokemonDef = parseInt(`${data.stats[3].base_stat}`);
            let pokemonAbilities = [];
            let abilities = data.abilities;
                abilities.forEach(ability => {
                    pokemonAbilities.push(ability.ability.name);
                });
            
            let newPokemon = new Pokemon(pokemonName, pokemonNumber, pokemonType, pokeFrontPic, pokemonHp, pokemonAtk, pokemonDef, pokemonAbilities);

            this.pokemonCaught.push(newPokemon);

        });
    }

    renderTrainer() {
        //NAVBAR
        pokemonSearch.appendChild(pokeSearchForm);

        let userLogin = document.getElementById('user');
        let userNameDiv = document.createElement('div');
        let userNameText = document.createElement('div');
        let userNameDropdown = document.createElement('div');
        let DDuserProfile = document.createElement('a');
        let DDlogin = document.createElement('a');

            //DIV CLASS - dropdown
            userNameDiv.classList.add('dropdown');
            userNameText.innerText = this.name;

            //DIV CLASS - dropdown-content
            userNameDropdown.classList.add('dropdown-content');
            DDuserProfile.innerText = 'Profile';
            DDlogin.innerText = 'Login';

        userNameDropdown.append(DDuserProfile, DDlogin);
        userNameDiv.append(userNameText, userNameDropdown);
        userLogin.appendChild(userNameDiv);

        userNameDiv.addEventListener('click', e =>{
            e.preventDefault();
            if (e.target === DDuserProfile){
                mainContainer.innerHTML = '';
                userNameDiv.remove();
                derek.renderTrainer();
            } else if (e.target === DDlogin){
                mainContainer.innerHTML = '';
                userNameDiv.remove();
                pokeSearchForm.remove();
                mainContainer.appendChild(loginMenu); 
            } 
        })

        //SECTION CLASS - 'new-trainer'
        let trainerSection = document.createElement('div');
        let trainerName = document.createElement('div');
        let trainerCount = document.createElement('div');
        let pokemonSection = document.createElement('div');
        trainerSection.classList.add('container');
        pokemonSection.classList.add('trainer-pokemon', 'jc-start');

            //DIV CLASS - 'trainer-profile'
            trainerName.innerText = 'Name ' + this.name;
            trainerCount.innerHTML = `# of Pokemon Caught<br>${this.pokemonCaught.length} / 802`;
            
            // DIV CLASS - 'trainer-pokemon'
            for (let pokemon of this.pokemonCaught) {
                let pokeBall = document.createElement('span');
                let pokePic = document.createElement('img');
                let pokeTag = document.createElement('p');
                
                pokeBall.classList.add('pokeball', 'flex-col', 'jc-center');
                pokePic.src = pokemon.frontPic;
                pokeTag.innerText = pokemon.name;

            pokeBall.append(pokePic, pokeTag);
            pokemonSection.append(pokeBall);

            pokeBall.addEventListener('click', e => {
                e.preventDefault();
                pokemonSearchResults.innerHTML = '';
                trainerSection.remove();
                pokeSearch(pokemon.name);
            })
        }
            
        trainerSection.append(trainerName, trainerCount, pokemonSection);
        mainContainer.append(trainerSection);
    }
}