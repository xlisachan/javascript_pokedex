// Page Elements
const pokeCaseTop = document.getElementById('top-case'),
      pokeCaseBottom = document.getElementById('bottom-case');
      
// Event Listeners
pokeCaseTop.addEventListener('click', e => {
    e.preventDefault();
    toggleCase();
});

pokeCaseBottom.addEventListener('click', e => {
    e.preventDefault();
    toggleCase();
});

// Helper Function
const toggleCase = () => {
    const pokeButtonTop = document.getElementById('top-btn'),
          pokeButtonBottom = document.getElementById('bottom-btn'),
          navBar = document.getElementById('navigation-bar'),
          screen = document.getElementById('screen');
          
    if (pokeCaseTop.style.top === "24vh") {
        pokeCaseTop.style.top = "0vh";
        pokeCaseBottom.style.top = "0vh";
        pokeButtonTop.classList.remove('infinite');
        pokeButtonBottom.classList.remove('infinite');
        navBar.style.display = "inline-flex";
        screen.style.display = "inline-block";
    } else {
        pokeCaseTop.style.top = "24vh";
        pokeCaseBottom.style.top = "24vh";
        pokeButtonTop.classList.add('infinite');
        pokeButtonBottom.classList.add('infinite');
        navBar.style.display = "none";
        screen.style.display = "none";
    }
}
