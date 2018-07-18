pokeSearchForm.remove();
// userLogin.appendChild(userNameButton);
// trainerSignup.remove();
// loganContainer.remove();

// SECTION ID - 'login-menu'
let pokedex = document.getElementsByClassName('active')[0];
let loginMenu = document.createElement('section');
loginMenu.id = 'login-menu';

    // DIV CLASS - 'user-profile'
    let loganLogin = document.createElement('div');
    loganLogin.classList.add('user-profile');

        // IMG CLASS = 'user-pic'
        let loganPic = document.createElement('img');
        loganPic.src = 'images/snorlax-profile.png';
        loganPic.classList.add('user-pic');

        // SPAN
        let loganText = document.createElement('span');
        loganText.innerText = 'LOGAN';

loginMenu.appendChild(loganLogin);
loganLogin.append(loganPic, loganText);
pokedex.appendChild(loginMenu);

loganLogin.addEventListener('click', e => {
    e.preventDefault();
    loginMenu.remove();
    logan.renderTrainer();
})

// DIV CLASS - 'user-profile'
let newUserLogin = document.createElement('div');
newUserLogin.classList.add('user-profile');

    // IMG CLASS - 'user-pic'
    let newUserPic = document.createElement('img');
    newUserPic.src = 'images/add.png';
    newUserPic.classList.add('user-pic');

    // SPAN
    let newUserText = document.createElement('span');
    newUserText.innerText = 'NEW TRAINER';

loginMenu.appendChild(newUserLogin);
newUserLogin.append(newUserPic, newUserText);

newUserLogin.addEventListener('click', e => {
    e.preventDefault();
    loginMenu.remove();
    pokedex.appendChild(trainerSignup);
})