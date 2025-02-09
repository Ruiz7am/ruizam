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
    const script = document.createElement('script');
    script.setAttribute('src', './src/components/dark-theme-toggle/darkThemeToggle.js');
    document.body.appendChild(script);
    return darkThemeToggleIcon;
  }

  render(){
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
    
  }

  connectedCallback(){
    this.render();
  }
}