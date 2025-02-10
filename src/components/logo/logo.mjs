const logoStylesheetPath = "src/styles/css/the-logo.css";
const imageSource = "./src/assets/png/avatar.png";

export class Logo extends HTMLElement {
  
  constructor(){
    super();
    this.attachShadow({mode: 'open'});
  }

  getTemplate(){
    const logo = document.createElement('template');
    logo.innerHTML = `
      <div id="avatar-container">
        <img id="avatar" src="${imageSource}" alt="avatar">
      </div>
      <div id="logotype">
        <h1><slot name="logo-title"></slot></h1>
        <h2><slot name="logo-subtitle"></slot></h2>
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