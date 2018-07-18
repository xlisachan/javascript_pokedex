let trainerList = [];
let trainers = 0;

class Trainer{
    constructor(name){
        this.name = name;
        // this.hometown = hometown;
        // this.id = id;
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
        axios.get(`https://pokeapi-nycda.firebaseio.com/pokemon/${pokemonObject}.json`).then(response => {
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

            // this.pokemonCaught[pokemonName] = newPokemon;
            this.pokemonCaught.push(newPokemon);

            //evolution
            // console.log(data);
        });
    }

    renderTrainer() {
        //LOGIN MENU

        //NAVBAR - LEFT
        // pokemonSearch.appendChild(pokeSearchForm);

        //NAVBAR -RIGHT
        let userLogin = document.getElementById('user');
        let userNameButton = document.createElement('div');
        userNameButton.classList.add('dropdown');

        let userNameText = document.createElement('div');
        userNameText.innerText = this.name;

        let userNameDropdown = document.createElement('div');
        userNameDropdown.classList.add('dropdown-content');

            let DDuserProfile = document.createElement('a');
            DDuserProfile.innerText = 'Profile';

            let DDlogin = document.createElement('a');
            DDlogin.innerText = 'Login';

            let DDsearch = document.createElement('a');
            DDsearch.innerText = 'Search';

        userNameDropdown.append(DDuserProfile, DDlogin, DDsearch);

        userNameButton.append(userNameText, userNameDropdown);
        userLogin.appendChild(userNameButton);

        userNameButton.addEventListener('click', e =>{
            e.preventDefault();
            if (e.target == DDuserProfile){
                pokedex.innerHTML = '';
                logan.renderTrainer();
                userNameButton.remove();
            } else if (e.target === DDlogin){
                newTrainerContainer.remove();
                pokedex.appendChild(loginMenu);
                userNameButton.remove();
            } 
            // else if (e.target == DDsearch){
            //     pokedex.appendChild()
            // }
        })

        //SECTION CLASS - 'new-trainer'
        let newTrainerContainer = document.createElement('section');
        newTrainerContainer.classList.add('new-trainer');
    
            let newTrainerFacts = document.createElement('div');
            newTrainerFacts.classList.add('trainer-facts');
            
            //p CLASS - 'content' (name)
            let trainerName = document.createElement('p');
            trainerName.classList.add('content')
            trainerName.innerText = 'Name ' + this.name;
            // trainerSignup.id = this.id;
    
            //h2 CLASS - 'content' (hometown)
            // let trainerHometown = document.createElement('h2');
            // trainerHometown.classList.add('content')
            // trainerHometown.innerText = 'Hometown ';
    
            // p CLASS - content (pokecaught)
            let trainerStats = document.createElement('p');
            trainerStats.innerHTML = `<span># of Pokemon Caught<br/>${this.pokemonCaught.length} / 802</span>`;
    
            // // DIV CLASS - 'trainer-pokemon'
            let pokemonSection = document.createElement('div');
            pokemonSection.classList.add('trainer-pokemon');
            for (let pokemon of this.pokemonCaught) {
               
                let pokeBall = document.createElement('span');
                pokeBall.classList.add('pokeball');
                let pokePic = document.createElement('img');
                pokePic.src = pokemon.frontPic;
                pokeBall.append(pokePic);
                pokemonSection.append(pokeBall);
            }
            
            //     //Create remove button
            //     let pokeBall = document.createElement('div');
            //     pokeBall.classList.add('pokeball');
    
            //     let pokeMonster = document.createElement('img');
            //     pokeMonster.src = pokemon.pokeFrontPic;
    
            //     let removeButton = document.createElement('button')
            //     removeButton.innerText = "Remove"
            //     removeButton.classList.add('remove-poke');
    
            //     //for time management we are only going to append the name
            //     let pokeWrapper = document.createElement('span')
            //     pokeWrapper.innerText = pokemon.name
    
            //     pokeBall.append(pokeWrapper, pokeMonster, removeButton);
            //     pokemonSection.append(pokeBall);
    
        newTrainerFacts.append(trainerName, trainerStats);
        newTrainerContainer.append(newTrainerFacts, pokemonSection);
        pokedex.append(newTrainerContainer);
        trainers++;
    }
}

//SECTION CLASS - 'trainer-signup'
let trainerSignup = document.createElement('section');
trainerSignup.classList.add('trainer-signup');

    //name
    let nameSpan = document.createElement('span');
    let name = document.createElement('h1')
    name.innerText = 'Name ';
    let nameInput = document.createElement('input');
    nameInput.classList.add('trainer-name');
    nameSpan.append(name, nameInput);

    // hometown
    // let hometownSpan = document.createElement('span');
    // let hometown = document.createElement('h2')
    // hometown.innerText = 'Hometown ';
    // let hometownInput = document.createElement('input');
    // hometownInput.classList.add('trainer-hometown');
    // hometownSpan.append(hometown, hometownInput);

    //add button
    let addTrainerButton = document.createElement('button');
    addTrainerButton.innerText = 'ADD';

//append
trainerSignup.append(nameSpan, addTrainerButton);
document.body.append(trainerSignup);

addTrainerButton.addEventListener('click', e => {
    e.preventDefault();
    let trainerName = document.getElementsByClassName('trainer-name')[0].value;
    // let trainerHometown = document.getElementsByClassName('trainer-hometown')[0].value;

    let newTrainer = new Trainer(trainerName);

    trainerList.push(newTrainer);
    newTrainer.renderTrainer();
    trainerSignup.remove();
});