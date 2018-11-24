const pokeButtonTop = document.getElementById('top-btn');
const pokeButtonBottom = document.getElementById('bottom-btn');
const pokeCaseTop = document.getElementById('top-case');
const pokeCaseBottom = document.getElementById('bottom-case');

pokeButtonTop.addEventListener('click', e => {
    e.preventDefault();
    if (pokeCaseTop.style.top === "24vh") {
        pokeCaseTop.style.top = "0vh";
        pokeCaseBottom.style.top = "0vh";
        pokeButtonTop.classList.remove('infinite');
        pokeButtonBottom.classList.remove('infinite');
        navBar.style.display = "inline-flex";
        screen.style.display = "inline";
    } else {
        pokeCaseTop.style.top = "24vh";
        pokeCaseBottom.style.top = "24vh";
        pokeButtonTop.classList.add('infinite');
        pokeButtonBottom.classList.add('infinite');
        navBar.style.display = "none";
        screen.style.display = "none";
    }
});

pokeButtonBottom.addEventListener('click', e => {
    e.preventDefault();
    if (pokeCaseTop.style.top === "24vh") {
        pokeCaseTop.style.top = "0vh";
        pokeCaseBottom.style.top = "0vh";
        pokeButtonTop.classList.remove('infinite');
        pokeButtonBottom.classList.remove('infinite');
        navBar.style.display = "inline-flex";
        screen.style.display = "inline";
        
    } else {
        pokeCaseTop.style.top = "24vh";
        pokeCaseBottom.style.top = "24vh";
        pokeButtonTop.classList.add('infinite');
        pokeButtonBottom.classList.add('infinite');
        navBar.style.display = "none";
        screen.style.display = "none";
    }
});

userAvatar.src = lisa.avatar;
userName.innerText = lisa.name;

userInfo.addEventListener('click', e => {
    e.preventDefault();
    loginMenu.style.display = 'none';
    pokeSearchForm.style.display = 'inline-flex';
    userLogin.style.display = 'inline';
    trainerSection.style.display = 'inline';
    pokemonSection.innerHTML = '';
    lisa.renderTrainer();
})