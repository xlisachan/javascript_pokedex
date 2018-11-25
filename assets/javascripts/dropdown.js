// Page Elements
const userNameDiv = document.getElementById('dropdown');

// Event Listener
userNameDiv.addEventListener('click', e =>{
    e.preventDefault();

    const ddProfile = document.getElementById('dropdown-user'),
          ddLogin = document.getElementById('dropdown-login');

    if (e.target === ddProfile){
        e.preventDefault();
        login();
    } else if (e.target === ddLogin){
        pokemonSearchResults.innerHTML = '';
        pokeSearchForm.style.display = 'none';
        userLogin.style.display = 'none';
        trainerSection.style.display = 'none';
        pokemonSearchResults.style.display = 'none';
        loginMenu.style.display = 'inline';
    } 
});