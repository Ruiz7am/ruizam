export class FooterContent extends HTMLElement {
  constructor(){
    super();
    this.attachShadow({mode: 'open'});
  }

  static get observedAttribute () {
    return ['footercontentstylesheetpath'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  getTemplate(){
    const footerContentStylesheetPath = this.getAttribute('footercontentstylesheetpath');

    const footerContent = document.createElement('template');
    footerContent.innerHTML = `
    <link rel="stylesheet" href="${footerContentStylesheetPath}" />
      <div id="footer-content-wrapper">
        <div id="footer-content-container-1" class="footer-content-container">Make with</div>
        <div id="footer-content-container-2" class="footer-content-container">
          <figure>
            <img src="./src/assets/vectors/HTML5_Badge.svg" alt="html-logo">
          </figure>
          <figure>
            <img src="./src/assets/vectors/css-3.svg" alt="css-logo">
          </figure>
          <figure>
            <img src="./src/assets/vectors/Sass_Logo_Color.svg" alt="css-logo">
          </figure>
          <figure>
            <img src="./src/assets/png/JavaScript-logo.png" alt="JavaScript-logo">
          </figure>
          <figure>
            <img src="./src/assets/vectors/webcomp.svg" alt="JavaScript-logo">
          </figure>
        </div>
      </div>
    `
    return footerContent;
  }
  render(){
    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
  }
  connectedCallback(){
    this.render()
  }
}