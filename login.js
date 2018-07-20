pokeSearchForm.remove();

let pokedex = document.getElementsByClassName('active')[0];

//LOGIN MENU
    //SECTION ID - 'login-menu'
    let loginMenu = document.createElement('section');
    loginMenu.id = 'login-menu';

        // DIV CLASS - 'user-profile'
        let loganLogin = document.createElement('div');
        loganLogin.classList.add('user-profile');

            // IMG CLASS = 'user-pic'
            let loganPic = document.createElement('img');
            loganPic.src = 'psyduck.png';
            loganPic.classList.add('user-pic');

            // SPAN - username
            let loganText = document.createElement('span');
            loganText.innerText = 'LOGAN';

        loganLogin.append(loganPic, loganText);
    
    loginMenu.appendChild(loganLogin);
    pokedex.appendChild(loginMenu);

    loganLogin.addEventListener('click', e => {
        e.preventDefault();
        loginMenu.remove();
        logan.renderTrainer();
    })