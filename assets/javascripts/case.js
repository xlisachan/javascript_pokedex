// Page Elements
const pokeButtonTop = document.getElementById('top-btn'),
      pokeButtonBottom = document.getElementById('bottom-btn');
      
// Event Listeners
pokeButtonTop.addEventListener('click', e => {
    e.preventDefault();
    toggleCase();
});

pokeButtonBottom.addEventListener('click', e => {
    e.preventDefault();
    toggleCase();
});

// Helper Function
const toggleCase = () => {
    const pokeCaseTop = document.getElementById('top-case'),
          pokeCaseBottom = document.getElementById('bottom-case'),
          navBar = document.getElementById('navigation-bar'),
          screen = document.getElementById('screen');
          
    if (pokeCaseTop.style.top === "24vh") {
        pokeCaseTop.style.top = "0vh";
        pokeCaseBottom.style.top = "0vh";
        pokeButtonTop.classList.remove('infinite');
        pokeButtonBottom.classList.remove('infinite');
        navBar.style.display = "inline-flex";
        screen.style.display = "inline";
    } else {
        pokeCaseTop.style.top = "24vh";
        pokeCaseBottom.style.top = "24vh";
        pokeButtonTop.classList.add('infinite');
        pokeButtonBottom.classList.add('infinite');
        navBar.style.display = "none";
        screen.style.display = "none";
    }
}