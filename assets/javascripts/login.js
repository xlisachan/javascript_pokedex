const pokeButtonTop = document.getElementById('top-btn');
const pokeButtonBottom = document.getElementById('bottom-btn');

pokeButtonTop.addEventListener('click', e => {
    e.preventDefault();
    document.getElementById('top-case').style.top = "0vh";
    document.getElementById('bottom-case').style.top = "0vh";
    navBar.style.display = "inline-flex";
    screen.style.display = "inline";
});

pokeButtonBottom.addEventListener('click', e => {
    e.preventDefault();
    document.getElementById('top-case').style.top = "0vh";
    document.getElementById('bottom-case').style.top = "0vh";
    navBar.style.display = "inline-flex";
    screen.style.display = "inline";
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