export class Logo extends HTMLElement {
  constructor(){
    super();
    this.attachShadow({mode: 'open'});
  }

  static get observedAttribute () {
    return['imagesource', 'title', 'subtitle', 'logostylesheetpath']
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue){
      this.render();
    }
  }

  getTemplate(){
    const imageSource = this.getAttribute('imagesource');
    const subtitle = this.getAttribute('subtitle');
    const title = this.getAttribute('title');
    const logoStylesheetPath = this.getAttribute('logostylesheetpath');

    const logo = document.createElement('template');
    logo.innerHTML = `
      <div id="avatar-container">
        <img id="avatar" src="${imageSource}" alt="avatar">
      </div>
      <div id="logotype">
        <h1>${title}</h1>
        <h2>${subtitle}</h2>
      </div>
      <link rel="stylesheet" href="${logoStylesheetPath}">
    `
    return logo;
  }
  
  render(){
    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
  }

  connectedCallback(){
    this.render();
  }

}