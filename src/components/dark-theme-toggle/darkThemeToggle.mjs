// Paths
// Component stylesheet
const darkThemeToggleStylesheetPath = "src/styles/css/dark-theme-toggle.css"

// component
export class DarkThemeToggle extends HTMLElement {

  constructor(){
    super();
    this.attachShadow({mode: 'open'});
  }

  getTemplate(){
    const darkThemeToggleIcon = document.createElement('template');
    darkThemeToggleIcon.innerHTML = `
      <link rel="stylesheet" href="${darkThemeToggleStylesheetPath}">
      <span id="theme-toggle-icon" class="dark-theme-toggle-icon"></span>
    `;
    return darkThemeToggleIcon;
  }

  render(){
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
  }

  connectedCallback(){
    this.render();
  }
}

// Toggle action
// constantes
const themeBtn = document.querySelector('dark-theme-toggle');
const body = document.body
const mainSection = document.getElementById('main-section');
const heroBackground = document.getElementById('hero-background');
const sidebar = document.getElementById('sidebar');
const avatar = document.getElementById('avatar');
// const themeToggleIcon = themeBtn.shadowRoot.getElementById('theme-toggle-icon');


// mini modal for show the dark theme toggle button.
const miniMessage = document.createElement('p');
miniMessage.innerHTML = `Dark Mode!`;
miniMessage.style.color = 'red';
miniMessage.style.position = 'absolute';
miniMessage.style.top = '137px';
miniMessage.style.fontFamily = 'var(--index-title-font)';
miniMessage.style.fontSize = '2.5rem';
miniMessage.style.transform = 'rotate(344deg)';

// sincronización del tema
function syncTheme(){
  const localStorageTheme = localStorage.getItem('theme');
  if (localStorageTheme == null || localStorageTheme == undefined) {
    sidebar.appendChild(miniMessage);
    return;
  } else {
    if(localStorageTheme != getActualTheme()) {
      toggle();
      validateDarkThemeDetails();
      updateLocalStorage();
      return;
    }else{
      return;
    }
  }
}

// Evento de click para el toggle
themeBtn.onclick = function (){
  toggle();
  validateDarkThemeDetails();
  updateLocalStorage();
}

function toggle () {
    body.classList.toggle('body--light');
    body.classList.toggle('body--dark');
    mainSection.classList.toggle('main--light');
    mainSection.classList.toggle('main--dark');
    heroBackground.classList.toggle('hero-background--light');
    heroBackground.classList.toggle('hero-background--dark');
    themeToggleIcon.classList.toggle('light-theme-toggle-icon');
    themeToggleIcon.classList.toggle('dark-theme-toggle-icon')
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
  if (actualTheme == 'light') {
    avatar.setAttribute('src', `${avatarPath}/avatar.png`);
  } else if (actualTheme == 'dark') {
    avatar.setAttribute('src', `${avatarPath}/avatar-dark.png`)
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

export { syncTheme, toggle, updateLocalStorage, validateDarkThemeDetails, getActualTheme }