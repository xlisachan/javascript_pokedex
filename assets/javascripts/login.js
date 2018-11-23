let loginMenu = document.getElementById('login-menu');
let userInfo = document.getElementById('user-info');
let userAvatar = document.getElementById('user-avatar');
let userName = document.getElementById('user-name');
let userLogin = document.getElementById('user');
let trainerSection = document.getElementById('trainer-section');
let pokemonSection = document.getElementById('pokemon-section');

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

pokeSearchForm.style.display = 'none';