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
        <div class="info-balloon-container">
          <div class="info-balloon">
            <img class="info-balloon__image"/>
            <h3 class="info-balloon__title"></h3>
            <p class="info-balloon__paragraph"></p>
          </div>
        </div>
        <div id="footer-content-container-1" class="footer-content-container">Make with</div>
        <div id="footer-content-container-2" class="footer-content-container">
          <figure>
          <img id="html-logo" class="badge" src="./src/assets/vectors/HTML5_Badge.svg" alt="html-logo">
          </figure>
          <figure>
            <img id="css-logo" class="badge" src="./src/assets/vectors/css-3.svg" alt="css-logo">
          </figure>
          <figure>
            <img id="sass-logo" class="badge" src="./src/assets/vectors/Sass_Logo_Color.svg" alt="sass-logo">
          </figure>
          <figure>
            <img id="javascript-logo" class="badge" src="./src/assets/png/JavaScript-logo.png" alt="JavaScript-logo">
          </figure>
          <figure>
            <img id="webcomp-logo" class="badge" src="./src/assets/vectors/webcomp.svg" alt="webcomp-logo">
          </figure>
        </div>
        <div class="footer-sign">
          <p>© 2025 All rights reserved</p>
          <p>Developed by <strong>@ruiz7am</strong></p>
        </div>
      </div>
    `
    return footerContent;
  }
  render(){
    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
    const script = document.createElement('script')
    script.src = "./src/components/footer-content/footerContentFunction.mjs"
    document.body.appendChild(script)
  }
  connectedCallback(){
    this.render()
  }
}