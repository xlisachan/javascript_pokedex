pokeSearchForm.remove();

let pokedex = document.getElementsByClassName('active')[0];

//LOGIN MENU
    //SECTION ID - 'login-menu'
    let loginMenu = document.createElement('section');
    loginMenu.id = 'login-menu';

        // DIV CLASS - 'user-profile'
        let userLogin = document.createElement('div');
        userLogin.classList.add('user-profile');

            // IMG CLASS = 'user-pic'
            let userPic = document.createElement('img');
            userPic.src = 'snorlax-profile.png';
            userPic.classList.add('user-pic');

            // SPAN - username
            let userText = document.createElement('span');
            userText.innerText = 'DEREK';

        userLogin.append(userPic, userText);
    
    loginMenu.appendChild(userLogin);
    pokedex.appendChild(loginMenu);

    userLogin.addEventListener('click', e => {
        e.preventDefault();
        loginMenu.remove();
        derek.renderTrainer();
    })