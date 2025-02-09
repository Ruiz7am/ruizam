const logoStylesheetPath = "src/styles/css/the-logo.css";

export class Logo extends HTMLElement {
  
  constructor(){
    super();
    this.attachShadow({mode: 'open'});
  }

  getTemplate(){
    const logo = document.createElement('template');
    logo.innerHTML = `
      <div id="avatar-container">
        <img id="avatar" src="./src/assets/png/avatar.png" alt="avatar">
      </div>
      <div id="logotype">
        <h1>Hi! I'm Armando...</h1>
        <h2>...and this is my personal site.</h2>
      </div>
      <link rel="stylesheet" href="${logoStylesheetPath}">
    `
    return logo;
  }
  
  render(){
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
  }

  connectedCallback(){
    this.render();
  }

}