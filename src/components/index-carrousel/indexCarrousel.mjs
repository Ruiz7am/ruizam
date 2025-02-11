export class IndexCarrousel extends HTMLElement {
  constructor(){
    super();
    this.attachShadow({mode: 'open'});
  }

  static get observedAttribute(){
    return ['indexcarrouselstylesheetpath'];
  }

  attributeChangedCallback (name, oldValue, newValue) {
    if (oldValue !== newValue){
      this.render()
    }
  }

  getTemplate(){
    const indexCarrouselStylesheetPath = this.getAttribute('indexcarrouselstylesheetpath');

    const indexCarrousel = document.createElement('template');
    indexCarrousel.innerHTML = `
      <link rel="stylesheet" href="${indexCarrouselStylesheetPath}">
      <div id="index-carrousel-wrapper">
      <p class="index-carrousel-paragraph">I recently start a <strong>Frontend developer Roadmap</strong>  online, after a four months, finally I start my own personal site!</p>
      <p class="index-carrousel-paragraph">My stack: <strong>VanillaJS</strong>, <strong>HTML</strong>, <strong>CSS</strong>, <strong>Sass</strong> and <strong>Web Component Structure</strong></p>
      <p class="index-carrousel-paragraph">Pure, clean, and simple code. I like it. No frameworks... yet!</p>
      <p class="index-carrousel-paragraph">My first component is a <strong>Dark-Light Toggle button</strong>. Check it out at the <strong>right superior corner</strong> of your desktop/tablet screen or <strong>left inferior corner</strong> of your mobile screen.</p>
      </div>
    `
    return indexCarrousel;
  }

  render(){
    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
  }

  connectedCallback(){
    this.render()
  }
}