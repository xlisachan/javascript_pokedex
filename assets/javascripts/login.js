let loginMenu = document.getElementById('login-menu');
let userInfo = document.getElementById('user-info');
let userAvatar = document.getElementById('user-avatar');
let userName = document.getElementById('user-name');
let userLogin = document.getElementById('user');

userAvatar.src = lisa.avatar;
userName.innerText = lisa.name;

userInfo.addEventListener('click', e => {
    e.preventDefault();
    loginMenu.remove();
    pokeSearchForm.style.display = 'inline-flex';
    userLogin.style.display = 'inline';
    lisa.renderTrainer();
})

pokeSearchForm.style.display = 'none';