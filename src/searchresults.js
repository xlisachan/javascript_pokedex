const addToPokedex = document.getElementById('add-button'),
    navNext = document.getElementById('nav-next'),
    navPrev = document.getElementById('nav-prev'),
    currMon = document.getElementById('curr-no'),
    nextMon = document.getElementById('next-no'),
    prevMon = document.getElementById('prev-no');

// Render Function
const renderSearchResults = newPokemon => {
    const pokeImage = document.getElementById('results-img'),
        pokeName = document.getElementById('results-name'),
        pokeType = document.getElementById('results-type'),
        hpStat = document.getElementById('stats-hp'),
        hpCalc = document.getElementById('calc-hp'),
        atkStat = document.getElementById('stats-atk'),
        atkCalc = document.getElementById('calc-atk'),
        defStat = document.getElementById('stats-def'),
        defCalc = document.getElementById('calc-def'),
        pokeAbility = document.getElementById('stats-abil');
    
    // navigation - previous, current, next pokemon
    let currentNav = newPokemon.id;
    let prevNav = 0;
    let nextNav = 0;

    if (currentNav < 2) {
        nextNav = currentNav + 1;
        prevNav = 802;
    } else if (currentNav > 801) {
        prevNav = currentNav - 1;
        nextNav = 1;
    } else {
        prevNav = newPokemon.id - 1;
        nextNav = newPokemon.id + 1;
    }
    prevMon.innerText = prevNav;
    currMon.innerText = newPokemon.id;
    nextMon.innerText = nextNav;

    // pokemon basics - image, name, type
    pokeImage.src = newPokemon.pic;
    pokeImage.alt = newPokemon.name;

    pokeName.innerText = newPokemon.name;
    pokeType.innerText = newPokemon.type;
    pokeType.style.backgroundColor = getBgColor(newPokemon.type);

    // pokemon stats - hp, atk, def
    hpStat.innerText = newPokemon.hp;
    hpCalc.style.width = getStatus('hp', newPokemon.hp);

    atkStat.innerText = newPokemon.atk;
    atkCalc.style.width = getStatus('atk', newPokemon.atk);
    
    defStat.innerText = newPokemon.def;
    defCalc.style.width = getStatus('def', newPokemon.def);

    // pokemon abilities
    pokeAbility.innerText = newPokemon.abilities;

    const found = lisa.pokemonCaught.some(el => el.id === newPokemon.id);
    if (found) {
        addToPokedex.classList.remove('add-button');
        addToPokedex.classList.add('caught-button');
        addToPokedex.innerHTML = 'Caught';
    } else {
        addToPokedex.classList.remove('caught-button');
        addToPokedex.classList.add('add-button');
        addToPokedex.innerHTML = 'Add to Pokedex';
    }
}

// Event Listeners
navPrev.addEventListener('click', e => {
    e.preventDefault();
    getPokemon(parseInt(prevMon.innerText))
        .then(pokemon => renderSearchResults(pokemon));
});

navNext.addEventListener('click', e => {
    e.preventDefault();
    getPokemon(parseInt(nextMon.innerText))
        .then(pokemon => renderSearchResults(pokemon));
});

addToPokedex.addEventListener('click', e => {
    e.preventDefault();
    check(parseInt(currMon.innerText));
});

// Alert modal
const msg = document.getElementById('alert-message');
const modal = document.getElementById('alert-modal');
const alertButton = document.getElementById('alert-button');

alertButton.addEventListener('click', e => {
    modal.style.display = "none";
});

// Helper Functions
const check = pokeNumber => {
    const found = lisa.pokemonCaught.some(el => el.id === pokeNumber);

    if (found){
        msg.innerHTML = 'You already have this pokemon!';
        modal.style.display = 'inline-block';
    } else {
        lisa.add(pokeNumber);
        msg.innerHTML = 'Pokemon added to pokedex!';
        modal.style.display = 'inline-block';
        addToPokedex.classList.remove('add-button');
        addToPokedex.classList.add('caught-button');
        addToPokedex.innerHTML = 'Caught';
    }
}

const getBgColor = type => {
    switch (type) {
        case 'bug':
            return 'darkseagreen';
        case 'dark':
            return 'darkgray';
        case 'dragon':
            return 'darkslategray';
        case 'electric':
            return 'goldenrod';
        case 'fairy':
            return 'pink';
        case 'fighting':
            return 'darkorange';
        case 'fire':
            return 'red';
        case 'flying':
            return 'cadetblue';
        case 'ghost':
            return 'violet';
        case 'grass':
            return 'green';
        case 'ground':
            return 'sienna';
        case 'ice':
            return 'aqua';
        case 'normal':
            return 'gray';
        case 'psychic':
            return 'fuchsia';
        case 'poison':
            return 'rebeccapurple';
        case 'rock':
            return 'brown';
        case 'steel':
            return 'darkslateblue';
        case 'water':
            return 'blue';
        default:
            return 'none';
    }
}

const getStatus = (stats, statData) => {
    let width;

    if (stats === 'hp' || stats === 'atk') {
        width = statData / 255 * 100;
    } else {
        width = statData / 548 * 100;
    }

    return `${width}%`;
}
