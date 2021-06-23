// Page Elements
const userInfo = document.getElementById('user-info'),
      userAvatar = document.getElementById('user-avatar'),
      userName = document.getElementById('user-name'),
      loginMenu = document.getElementById('login-menu'),
      userLogin = document.getElementById('user'),
      trainerSection = document.getElementById('trainer-section'),
      pokemonSection = document.getElementById('pokemon-section'),
      pokemonSearchResults = document.getElementById('search-results'),
      noMatchPage = document.getElementById('no-match');

userAvatar.src = lisa.avatar;
userName.innerText = lisa.name;

// Event Listener
userInfo.addEventListener('click', e => {
    e.preventDefault();
    login();
})

// Helper Function
const login = () => {
    loginMenu.style.display = 'none';
    pokeSearchForm.style.display = 'inline-flex';
    userLogin.style.display = 'inline-block';
    trainerSection.style.display = 'inline-block';
    pokemonSection.innerHTML = '';
    pokemonSearchResults.style.display = 'none';
    noMatchPage.style.display = 'none';
    lisa.renderTrainer();
}
