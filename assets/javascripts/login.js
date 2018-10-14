pokeSearchForm.remove();

let mainContainer = document.getElementById('main-container');

//LOGIN MENU
//SECTION ID - 'login-menu'
let loginMenu = document.createElement('section');
loginMenu.id = 'login-menu';
loginMenu.classList.add('flex-col')

    // DIV CLASS - 'user-profile'
    let userLogin = document.createElement('div');
    userLogin.classList.add('flex-col');

        // IMG CLASS = 'user-pic'
        let userPic = document.createElement('img');
        userPic.src = './assets/images/snorlax-profile.png';
        userPic.classList.add('user-pic');

        // SPAN - username
        let userText = document.createElement('span');
        userText.innerText = 'DEREK';

    userLogin.append(userPic, userText);

loginMenu.appendChild(userLogin);
mainContainer.appendChild(loginMenu);

userLogin.addEventListener('click', e => {
    e.preventDefault();
    loginMenu.remove();
    derek.renderTrainer();
})