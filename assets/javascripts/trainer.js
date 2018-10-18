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

            //DIV CLASS - dropdown
            let userNameDiv = document.createElement('div');
            userNameDiv.classList.add('dropdown');

            let userNameText = document.createElement('div');
            userNameText.innerText = this.name;

            //DIV CLASS - dropdown-content
            let userNameDropdown = document.createElement('div');
            userNameDropdown.classList.add('dropdown-content');

            let DDuserProfile = document.createElement('a');
            let DDlogin = document.createElement('a');
            
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
        trainerSection.classList.add('trainer-section', 'flex-col');

            //DIV CLASS - 'trainer-profile'
            let trainerProfile = document.createElement('div');
            let trainerName = document.createElement('p');
            let trainerStats = document.createElement('span');

            trainerProfile.classList.add('trainer-profile', 'jc-center');
            trainerName.innerText = 'Name ' + this.name;
            trainerStats.innerHTML = `# of Pokemon Caught<br>${this.pokemonCaught.length} / 802`;
        
            trainerProfile.append(trainerName, trainerStats);
            
            // DIV CLASS - 'trainer-pokemon'
            let pokemonSection = document.createElement('div');
            pokemonSection.classList.add('trainer-pokemon', 'jc-start');
           
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
            
        trainerSection.append(trainerProfile, pokemonSection);
        mainContainer.append(trainerSection);
    }
}