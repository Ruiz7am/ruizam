// Cards de contenido del carrusel
// Instrucciones de uso:
// 1. Coloca el contenido de las cards en los objetos dentro del array cards
// 2. Exporta esta función al fichero principal de js del proyecto:
//
//      activeFirstCard()
//
//    Esta función le coloca la clase active a la primera card
// 3. Listo, solo coloca el componente (<index-carrousel>) dentro del fichero html 

let cards = [
  {
    title: "Last Blog Entries' Carousel",
    tags: ["javascript", "html", "css", "sass", "web-components"],
    content: `<p>In this post, I write a last blog posts carousel, is responsive, autoplay and pause at hover or touch it</p><p>This carousel is not mine, i took the code from <a href="https://medium.com/web-dev-survey-from-kyoto/vanilla-js-carousel-that-is-accessible-swipeable-infinite-scrolling-and-autoplaying-5de5f281ef13">this other post</a>, (excellent code by the way), and adjust it to my necesities, without mention that I study the code while adopt it`,
  },
  {
    title: "First steps, this is my blog",
    tags: ["javascript", "html", "css", "sass", "web-components"],
    content: "<p>I recently start a Frontend developer Roadmap online, after a four months, finally I start my own personal site!</p><p>My stack: VanillaJS, HTML, CSS, Sass and Web Component Structure</p><p>My first component is a Dark-Light Toggle button. Check it out at the right superior corner of your desktop/tablet screen or left inferior corner of your mobile screen.</p>",
  },
  {
    title: "Other card 3",
    tags: ["databeses", "postgresql" ],
    content: "<p>I recently start a Frontend developer Roadmap online, after a four months, finally I start my own personal site!</p><p>My stack: VanillaJS, HTML, CSS, Sass and Web Component Structure</p><p>My first component is a Dark-Light Toggle button. Check it out at the right superior corner of your desktop/tablet screen or left inferior corner of your mobile screen.</p>",
  },
  {
    title: "another card 4",
    tags: ["javascript", "html", "css", "sass", "web-components"],
    content: "<p>I recently start a Frontend developer Roadmap online, after a four months, finally I start my own personal site!</p><p>My stack: VanillaJS, HTML, CSS, Sass and Web Component Structure</p><p>My first component is a Dark-Light Toggle button. Check it out at the right superior corner of your desktop/tablet screen or left inferior corner of your mobile screen.</p>",
  },
  {
    title: "Another card 5",
    tags: ["javascript", "html", "css", "sass", "web-components"],
    content: "<p>I recently start a Frontend developer Roadmap online, after a four months, finally I start my own personal site!</p><p>My stack: VanillaJS, HTML, CSS, Sass and Web Component Structure</p><p>My first component is a Dark-Light Toggle button. Check it out at the right superior corner of your desktop/tablet screen or left inferior corner of your mobile screen.</p>",
  }
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
    
    // Ruta de la hoja de estilos del componente (se obtiene mediante atributo personalizado con vanila.js)
    const indexCarrouselStylesheetPath = this.getAttribute('indexcarrouselstylesheetpath');
    
    // Creamos un template dentro de una constante.
    const indexCarrousel = document.createElement('template');

    // Esta función obtiene las cards del array de configuración llamado cards y los ubica como elementos del shadow DOM del componente
    function getCards(){
      const cardElements = [];
      let counter = 0;
      for (let i = 0; i < cards.length; i++){
        let title = cards[i].title;
        let tags = cards[i].tags;
        let content = cards[i].content;
        counter++;
        // Esta función obtiene los tags del array llamado tags.
        function getTags(){
          const tagElements = [];
          for(let i = 0; i < tags.length; i++){
            let tag = `<span class="tag ${tags[i]}"># ${tags[i]}</span>`
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
          <div class="carrousel-card" role="group" aria-label="${counter} de ${cards.length}" aria-roledescription="card">
            <h2 class="carrousel-card-title">${title}</h2>
            <div class="carrousel-card-tags">
              ${getTags()}
            </div>
            <div class="carrousel-card-content">
              ${content}
            </div>
          </div>
        `
        cardElements.push(card);
      };

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

    // Esta función crea los puntos de navegación dependiendo del numero de cards.
    function getDots () {
      let dot;
      let output;
      let counter = 0;
      cards.forEach(element => {
        counter++;
        dot = `
          <button class="nav-dot" type="button" aria-disabled="false" aria-label="${counter} de ${cards.length}"></button>
        `
        if (output === null || output === undefined) {
          output = dot;
        } else {
          output = output + dot;
        }
      })
      return output;
    }

    // se crea el contenido del componente
    indexCarrousel.innerHTML = `
      <link rel="stylesheet" href="${indexCarrouselStylesheetPath}">
        <div class="carrousel" role="group" aria-lebel="Last blog entries" aria-roledescription="carrusel">
          <div class="carrousel-navdots home-page" aria-label="Choose slide to display" role="group">
            ${getDots()}
          </div>
          <div class="carrousel-cards" aria-atomic="false" aria-live="off">
            ${getCards()}
          </div>
        </div>
    `
    return indexCarrousel;
  }

  render(){
    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
    const script = document.createElement('script');
    script.src = './src/components/index-carrousel/slider.mjs';
    document.body.appendChild(script);
  }

  connectedCallback(){
    this.render();
  }
}