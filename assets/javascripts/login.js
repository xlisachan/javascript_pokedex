pokeSearchForm.remove();

let mainContainer = document.getElementById('main-container');

//SECTION ID - 'login-menu'
let loginMenu = document.createElement('section');
loginMenu.classList.add('flex-row')

    let userInfo = document.createElement('div');
    userInfo.classList.add('flex-col');

        // IMG CLASS = 'user-pic'
        let userPic = document.createElement('img');
        userPic.src = './assets/images/snorlax-profile.png';
        userPic.classList.add('user-pic');

        // SPAN - username
        let userName = document.createElement('span');
        userName.innerText = 'DEREK';

    userInfo.append(userPic, userName);

loginMenu.appendChild(userInfo);
mainContainer.appendChild(loginMenu);

userInfo.addEventListener('click', e => {
    e.preventDefault();
    loginMenu.remove();
    derek.renderTrainer();
})