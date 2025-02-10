// Paths
const avatarPath = "./src/assets/png"
// constantes
const themeBtn = document.querySelector('dark-theme-toggle');
const body = document.body
const mainSection = document.getElementById('main-container');
const sectionHeroContainer = document.getElementById('section-hero-container');
const sidebar = document.getElementById('sidebar');
const miniMessage = document.createElement('p');
const themeToggleIcon = themeBtn.shadowRoot.querySelector('#theme-toggle-icon');
const theLogo = document.querySelector('the-logo')
const avatar = theLogo.shadowRoot.getElementById('avatar');

// constants for navbar icon/text links
const navBar = document.querySelector('nav-bar')

syncTheme()

themeToggleIcon.addEventListener('click', () => {
  toggleFunc()
  validateDarkThemeDetails()
  updateLocalStorage()
})


function setMiniMessage () {
  miniMessage.innerHTML = `Dark Mode!`;
  miniMessage.style.color = 'red';
  miniMessage.style.position = 'absolute';
  miniMessage.style.top = '137px';
  miniMessage.style.fontFamily = 'var(--index-title-font)';
  miniMessage.style.fontSize = '2.5rem';
  miniMessage.style.transform = 'rotate(344deg)';
}

function syncTheme(){
  const localStorageTheme = localStorage.getItem('theme');
  if (localStorageTheme == null || localStorageTheme == undefined) {
    sidebar.appendChild(miniMessage);
    return;
  } else {
    if(localStorageTheme != getActualTheme()) {
      toggleFunc();
      validateDarkThemeDetails();
      updateLocalStorage();
      return;
    }else{
      return;
    }
  }
}

function toggleFunc () {
    body.classList.toggle('body--light');
    body.classList.toggle('body--dark');
    mainSection.classList.toggle('main--light');
    mainSection.classList.toggle('main--dark');
    sectionHeroContainer.classList.toggle('section-hero-container--light');
    sectionHeroContainer.classList.toggle('section-hero-container--dark');
    themeToggleIcon.classList.toggle('light-theme-toggle-icon');
    themeToggleIcon.classList.toggle('dark-theme-toggle-icon');
}

function updateLocalStorage(){
  if(getActualTheme() == 'light'){
    localStorage.setItem('theme', 'light')
  } else if (getActualTheme() == 'dark'){
    localStorage.setItem('theme', 'dark');
  } else {
    console.log('Error, localStorage no se pudo actualizar')
    return;
  }
}

function validateDarkThemeDetails () {
  const actualTheme = getActualTheme();

  // get actual theme
  if (actualTheme == 'light') {
    avatar.setAttribute('src', `${avatarPath}/avatar.png`);
  } else if (actualTheme == 'dark') {
    avatar.setAttribute('src', `${avatarPath}/avatar-dark.png`); 
  } else {
    console.warn("error");
  }

  
} 

function getActualTheme(){
  let actualTheme = body.className;
  if (actualTheme == "body--light"){
    return 'light';
  } else if (actualTheme == "body--dark"){
    return 'dark';
  } else {
    console.log('no hay tema')
    return;
  }
}