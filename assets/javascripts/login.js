let loginMenu = document.getElementById('login-menu');
let userInfo = document.getElementById('user-info');
let userAvatar = document.getElementById('user-avatar');
let userName = document.getElementById('user-name');

pokeSearchForm.remove();

userName.innerText = lisa.name;
userAvatar.src = lisa.avatar;

userInfo.addEventListener('click', e => {
    e.preventDefault();
    loginMenu.remove();
    lisa.renderTrainer();
})