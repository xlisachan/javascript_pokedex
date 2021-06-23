// Render Function
const renderSearchResults = newPokemon => {
    const navDiv = document.createElement('div'),
        addToPokedex = document.createElement('div'),
        pokeDiv = document.createElement('div'),
        pokeBasics = document.createElement('div'),
        pokeNum = document.createElement('div'),
        pokeImage = document.createElement('img'),
        pokeText = document.createElement('div'),
        pokeName = document.createElement('div'),
        pokeType = document.createElement('div'),
        pokeStats = document.createElement('div'),
        hpInfo = document.createElement('div'),
        pokeHp = document.createElement('div'),
        pokeAtk = document.createElement('div'),
        pokeDef = document.createElement('div'),
        hpStat = document.createElement('div'),
        hpCalc = document.createElement('div'),
        hpBar = document.createElement('div'),
        atkInfo = document.createElement('div'),
        atkStat = document.createElement('div'),
        atkCalc = document.createElement('div'),
        atkBar = document.createElement('div'),
        defInfo = document.createElement('div'),
        defStat = document.createElement('div'),
        defCalc = document.createElement('div'),
        defBar = document.createElement('div'),
        pokeAbility = document.createElement('div'),
        nextMon = document.createElement('div'),
        prevMon = document.createElement('div');

    // navigation - previous, current, next pokemon
    navDiv.classList.add('nav-div');
    prevMon.classList.add('arrow-div');
    nextMon.classList.add('arrow-div');
    pokeNum.setAttribute('style', 'color: black');

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

    prevMon.innerHTML = `<i class="fas fa-chevron-left"></i> ${prevNav}`;
    pokeNum.innerHTML = `<span style="font-size: .9em">NO.</span> ${newPokemon.id}`;
    nextMon.innerHTML = `${nextNav} <i class="fas fa-chevron-right"></i>`;

    navDiv.append(prevMon, pokeNum, nextMon);

    // pokemon basics - image, name, type
    pokeBasics.style.marginLeft = '3%';
    pokeBasics.classList.add('flex-row');
    pokeImage.classList.add('pokemon-img');
    pokeImage.src = newPokemon.pic;
    pokeImage.alt = newPokemon.name;

    pokeName.innerText = newPokemon.name;
    pokeType.innerText = newPokemon.type;
    pokeType.classList.add('poke-type');
    pokeType.style.backgroundColor = getBgColor(newPokemon.type);
    pokeText.append(pokeName, pokeType);
    pokeBasics.append(pokeImage, pokeText);

    // pokemon stats - hp, atk, def
    hpStat.innerText = newPokemon.hp;
    hpStat.classList.add('stats-num');
    hpCalc.classList.add('stats-calc');
    hpCalc.style.width = getStatus('hp', newPokemon.hp);
    hpBar.classList.add('stats-bar');
    hpBar.append(hpCalc);
    hpInfo.classList.add('flex-row', 'jc-sb', 'stats-info');
    hpInfo.append(hpStat, hpBar);
    pokeHp.classList.add('flex-row', 'jc-sb');
    pokeHp.append('HP', hpInfo);

    atkStat.innerText = newPokemon.atk;
    atkStat.classList.add('stats-num');
    atkCalc.classList.add('stats-calc');
    atkCalc.style.width = getStatus('atk', newPokemon.atk);
    atkBar.classList.add('stats-bar');
    atkBar.append(atkCalc);
    atkInfo.classList.add('flex-row', 'jc-sb', 'stats-info');
    atkInfo.append(atkStat, atkBar);
    pokeAtk.classList.add('flex-row', 'jc-sb');
    pokeAtk.append('ATK', atkInfo);
    
    defStat.innerText = newPokemon.def;
    defStat.classList.add('stats-num');
    defCalc.classList.add('stats-calc');
    defCalc.style.width = getStatus('def', newPokemon.def);
    defBar.classList.add('stats-bar');
    defBar.append(defCalc);
    defInfo.classList.add('flex-row', 'jc-sb', 'stats-info');
    defInfo.append(defStat, defBar);
    pokeDef.classList.add('flex-row', 'jc-sb');
    pokeDef.append('def', defInfo);

    pokeAbility.classList.add('poke-abil');
    pokeAbility.innerHTML = 'Abilities <br/>' + newPokemon.abilities;

    
    pokeStats.classList.add('poke-stats');
    pokeStats.append(pokeHp, pokeAtk, pokeDef, pokeAbility);

    // pokemon section
    addToPokedex.id = "add-button";   
    pokemonSearchResults.classList.add('opaque-div');
    pokemonSearchResults.append(navDiv, pokeBasics, addToPokedex, pokeStats);
    pokemonSearchResults.style.display = 'inline';

    const found = lisa.pokemonCaught.some(el => el.id === newPokemon.id);
    if (found) {
        addToPokedex.classList.add('caught-button');
        addToPokedex.innerHTML = 'Caught';
    } else {
        addToPokedex.classList.add('add-button');
        addToPokedex.innerHTML = 'Add to Pokedex';
    }

    // Event Listeners
    addToPokedex.addEventListener('click', e => {
        e.preventDefault();
        check(newPokemon.id);
    });

    nextMon.addEventListener('click', e => {
        e.preventDefault();
        pokemonSearchResults.innerHTML = '';
        trainerSection.style.display = 'none';
        let afterMon = newPokemon.id + 1;
        if (afterMon === 803) afterMon = 1;
        getPokemon(afterMon).then(pokemon => renderSearchResults(pokemon));
    });

    prevMon.addEventListener('click', e => {
        e.preventDefault();
        pokemonSearchResults.innerHTML = '';
        trainerSection.style.display = 'none';
        let beforeMon = newPokemon.id - 1;
        if (beforeMon === 0) beforeMon = 802;
        getPokemon(beforeMon).then(pokemon => renderSearchResults(pokemon));
    });
}

// Alert modal
const msg = document.getElementById('alert-message');
const modal = document.getElementById('alert-modal');
const alertButton = document.getElementById('alert-button');

alertButton.addEventListener('click', e => {
    modal.style.display="none";
})

// Helper Functions
const check = pokeNumber => {
    const found = lisa.pokemonCaught.some(el => el.id === pokeNumber);
    
    if (found){
        msg.innerHTML = 'You already have this pokemon!';
        modal.style.display = 'inline';
    } else {
        lisa.add(pokeNumber);
        msg.innerHTML = 'Pokemon added to pokedex!';
        modal.style.display = 'inline';
        document.getElementById('add-button').classList.add('caught-button');
        document.getElementById('add-button').innerHTML = 'Caught';
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