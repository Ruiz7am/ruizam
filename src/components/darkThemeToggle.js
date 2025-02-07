
// component
class DarkThemeToggle extends HTMLElement {

  constructor(){
    super();
    this.attachShadow({mode: 'open'});
  }

  getTemplate(){
    const darkThemeToggleIcon = document.createElement('template');
    darkThemeToggleIcon.innerHTML = `
      <link rel="stylesheet" href="./styles/darkTheme.css">
      <span id="theme-toggle-icon" class="dark-theme-toggle-icon"></span>
    `;
    return darkThemeToggleIcon;
  }

  attachStyleLinkToHead(){
    const style = document.createElement('link');
    style.setAttribute('rel', 'stylesheet');
    style.setAttribute('href', './styles/darkTheme.css');
    document.head.appendChild(style);
  }

  render(){
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
    this.attachStyleLinkToHead();
  }

  connectedCallback(){
    this.render();
  }
}
customElements.define('dark-theme-toggle', DarkThemeToggle)

// Toggle action
// constantes
const themeBtn = document.querySelector('dark-theme-toggle');
const body = document.body
const mainSection = document.getElementById('main-section');
const heroBackground = document.getElementById('hero-background');
const sidebar = document.getElementById('sidebar');
const avatar = document.getElementById('avatar');
const themeToggleIcon = themeBtn.shadowRoot.getElementById('theme-toggle-icon');
const miniMessage = document.createElement('p');
miniMessage.innerHTML = `Dark Mode!`;
miniMessage.style.color = 'red';
miniMessage.style.position = 'absolute';
miniMessage.style.top = '137px';
miniMessage.style.fontFamily = 'var(--index-title-font)';
miniMessage.style.fontSize = '2.5rem';
miniMessage.style.transform = 'rotate(344deg)';

// sincronización del tema
syncTheme();

function syncTheme(){
  const sample = getActualTheme();
  const localStorageTheme = localStorage.getItem('theme');
  if (localStorageTheme == null || localStorageTheme == undefined) {
    sidebar.appendChild(miniMessage);
    return;
  } else {
    if(localStorageTheme != sample) {
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
  const sample = getActualTheme();
  console.log(sample)
  if(sample == 'light'){
    localStorage.setItem('theme', 'light')
  } else if (sample == 'dark'){
    localStorage.setItem('theme', 'dark');
  } else {
    console.log('Error, localStorage no se pudo actualizar')
    return;
  }
}

function validateDarkThemeDetails () {
  const actualTheme = getActualTheme();
  if (actualTheme == 'light') {
    avatar.setAttribute('src', './assets/avatar.png');
  } else if (actualTheme == 'dark') {
    avatar.setAttribute('src', './assets/avatar-dark.png')
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