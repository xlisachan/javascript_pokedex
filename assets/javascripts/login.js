let mainContainer = document.getElementById('main-container');
let loginMenu = document.createElement('div');
let userInfo = document.createElement('div');
let userPic = document.createElement('img');
let userName = document.createElement('span');

pokeSearchForm.remove();

loginMenu.classList.add('flex-row')
userInfo.classList.add('container', 'flex-col');
userPic.src = './assets/images/snorlax-profile.png';
userPic.classList.add('user-pic');
userName.innerText = 'DEREK';

userInfo.append(userPic, userName);
loginMenu.appendChild(userInfo);
mainContainer.appendChild(loginMenu);

userInfo.addEventListener('click', e => {
    e.preventDefault();
    loginMenu.remove();
    derek.renderTrainer();
})