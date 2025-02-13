// Cards de contenido del carrusel
// Coloca el contenido de las cards en los objetos dentro del array cards
let cards = [
  {
    title: "First steps",
    tags: ["#javascript", "#html", "#css", "#sass", "#web components"],
    content: "<p>I recently start a Frontend developer Roadmap online, after a four months, finally I start my own personal site!</p><p>My stack: VanillaJS, HTML, CSS, Sass and Web Component Structure</p><p>My first component is a Dark-Light Toggle button. Check it out at the right superior corner of your desktop/tablet screen or left inferior corner of your mobile screen.</p>",
  },
  {
    title: "Other Card",
    tags: ["#backend", "#databases"],
    content: "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p><p>Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>",
  },
  {
    title: "Other Card 2",
    tags: ["#backend", "#databases", "#postgresql"],
    content: "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p><p>Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>"
  },
]

// El componente
export class IndexCarrousel extends HTMLElement {
  constructor(){
    super();
    this.attachShadow({mode: 'open'});
  }

  // Observador de cambio de atributos
  static get observedAttribute(){
    return ['indexcarrouselstylesheetpath', 'scriptSource'];
  }

  // Ciclo del componente de cambio de atributos
  attributeChangedCallback (name, oldValue, newValue) {
    if (oldValue !== newValue){
      this.render()
    }
  }

  getTemplate(){
    
    const indexCarrouselStylesheetPath = this.getAttribute('indexcarrouselstylesheetpath');
    
    const indexCarrousel = document.createElement('template');

    function getCards(){
      const cardElements = [];
      for (let i = 0; i < cards.length; i++){
        let title = cards[i].title;
        let tags = cards[i].tags;
        let content = cards[i].content;

        function getTags(){
          const tagElements = [];
          for(let i = 0; i < tags.length; i++){
            let tag = `<span class="tag">${tags[i]}</span>`
            tagElements.push(tag);
          }
          let output;
          tagElements.forEach(element => {
            if(output === null || output === undefined){
              output = element;
            } else {
              output = output + element;
            }
          });
          return output;
        }
        let card = `
          <div class="carrousel-card">
            <h2 class="carrousel-card-title">${title}</h2>
            <div class="carrousel-card-tags">
              ${getTags()}
            </div>
            ${content}
          </div>
        `
        cardElements.push(card);
      }
      let output;
      cardElements.forEach(element => {
        if(output === null || output === undefined){
          output = element;
        } else {
          output = output + element
        }
      });
      return output;
    }

    indexCarrousel.innerHTML = `
      <link rel="stylesheet" href="${indexCarrouselStylesheetPath}">
        <div id="carrousel">
          ${getCards()}
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