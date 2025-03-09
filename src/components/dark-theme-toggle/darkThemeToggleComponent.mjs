// component
export class DarkThemeToggle extends HTMLElement {

  constructor(){
    super();
    this.attachShadow({mode: 'open'});
  }

  static get observedAttribute () {
    return ['darkthemestylesheetpath', 'scriptpath']
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  getTemplate(){
    const darkThemeToggleStylesheetPath = this.getAttribute('darkthemetogglestylesheetpath')
    const scriptPath = this.getAttribute('scriptpath')

    const darkThemeToggleIcon = document.createElement('template');
    darkThemeToggleIcon.innerHTML = `
      <link rel="stylesheet" href="${darkThemeToggleStylesheetPath}">
      <div class="theme-toggle-icon-container">
        <span id="theme-toggle-icon" class="dark-theme-toggle-icon"></span>
      </div>
    `;
    const script = document.createElement('script');
    script.setAttribute('src', `${scriptPath}`);
    document.body.appendChild(script);
    return darkThemeToggleIcon;
  }

  render(){
    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
    
  }

  connectedCallback(){
    this.render();
  }
}