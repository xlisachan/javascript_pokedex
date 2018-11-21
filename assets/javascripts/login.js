let loginMenu = document.getElementById('login-menu');
let userInfo = document.getElementById('user-info');
let userAvatar = document.getElementById('user-avatar');
let userName = document.getElementById('user-name');

pokeSearchForm.remove();

userAvatar.src = lisa.avatar;
userName.innerText = lisa.name;

userInfo.addEventListener('click', e => {
    e.preventDefault();
    loginMenu.remove();
    lisa.renderTrainer();
})