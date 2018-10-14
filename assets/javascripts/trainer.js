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
            let pokeBackPic = data.sprites.back_default;
            let pokemonHp = parseInt(`${data.stats[5].base_stat}`);
            let pokemonAtk = parseInt(`${data.stats[4].base_stat}`);
            let pokemonDef = parseInt(`${data.stats[3].base_stat}`);
            let pokemonAbilities = [];
            let abilities = data.abilities;
                abilities.forEach(ability => {
                    pokemonAbilities.push(ability.ability.name);
                });
            
            let newPokemon = new Pokemon(pokemonName, pokemonNumber, pokemonType, pokeFrontPic, pokeBackPic, pokemonHp, pokemonAtk, pokemonDef, pokemonAbilities);

            this.pokemonCaught.push(newPokemon);

        });
    }

    renderTrainer() {
        //NAVBAR
            //NAVBAR - LEFT
            pokemonSearch.appendChild(pokeSearchForm);

            //NAVBAR - RIGHT
            let userLogin = document.getElementById('user');

                //DIV CLASS - dropdown
                let userNameButton = document.createElement('div');
                userNameButton.classList.add('dropdown');

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

                userNameButton.append(userNameText, userNameDropdown);
                userLogin.appendChild(userNameButton);

            userNameButton.addEventListener('click', e =>{
                e.preventDefault();
                if (e.target === DDuserProfile){
                    mainContainer.innerHTML = '';
                    userNameButton.remove();
                    derek.renderTrainer();
                } else if (e.target === DDlogin){
                    mainContainer.innerHTML = '';
                    userNameButton.remove();
                    pokeSearchForm.remove();
                    mainContainer.appendChild(loginMenu); 
                } 
            })

        //SECTION CLASS - 'new-trainer'
        let trainerSection = document.createElement('section');
        trainerSection.classList.add('trainer-section', 'flex-col');

            //DIV CLASS - 'trainer-profile'
            let trainerProfile = document.createElement('div');
            trainerProfile.classList.add('trainer-profile');
            
                //p CLASS - 'content'
                let trainerName = document.createElement('p');
                let trainerStats = document.createElement('span');
                
                trainerName.innerText = 'Name ' + this.name;
                trainerStats.innerHTML = `# of Pokemon Caught<br>${this.pokemonCaught.length} / 802`;
        
            trainerProfile.append(trainerName, trainerStats);
            
            // DIV CLASS - 'trainer-pokemon'
            let pokemonSection = document.createElement('div');
            pokemonSection.classList.add('trainer-pokemon');
            for (let pokemon of this.pokemonCaught) {
               
                // SPAN CLASS - pokeball
                let pokeBall = document.createElement('span');
                pokeBall.classList.add('pokeball', 'flex-col', 'jc-center');

                    let pokePic = document.createElement('img');
                    let pokeTag = document.createElement('p');
                    
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