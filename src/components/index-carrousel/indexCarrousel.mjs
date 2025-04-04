// Cards de contenido del carrusel
// Instrucciones de uso:
// 1. Coloca el contenido de las cards en los objetos dentro del array cards
// 2. Exporta esta función al fichero principal de js del proyecto:
//
//      activeFirstCard()
//
//    Esta función le coloca la clase active a la primera card
// 3. Listo, solo coloca el componente (<index-carrousel>) dentro del fichero html 



// El componente
export class IndexCarrousel extends HTMLElement {
  // Propiedad estática para almacenar la promesa del módulo slider.
  static sliderModulePromise = null;
  // Constructor
  constructor(){
    super();
    this.attachShadow({mode: 'open'});
  };
  // Observador de cambio de atributos
  static get observedAttributes(){
    return ["data-scroll-duration", "data-pause-duration"];
  };
  // Ciclo del componente de cambio de atributos
  attributeChangedCallback (name, oldValue, newValue) {
    if (oldValue !== newValue){
      this.render()
    }
  };
  // Esta función obtiene el template del componente y lo añade al shadow DOM del componente
  getTemplate(){
    // Atributos del componente
    const dataScrollDuration = this.getAttribute('data-scroll-duration') || 5000;
    const dataPauseDuration = this.getAttribute('data-pause-duration') || 7000;
    // Creamos un template dentro de una constante.
    const indexCarrousel = document.createElement('template');

    

    

    // se crea el contenido del componente
    indexCarrousel.innerHTML = `
        <div class="carrousel" role="group" aria-lebel="Last blog entries" aria-roledescription="carrusel">
          <div class="carrousel-navdots home-page" aria-label="Choose slide to display" role="group">
            
          </div>
          <button id="playPauseButton" class="play-pause-button" aria-label="Pause autoplay">
          <!-- Pause icon (default visible) -->
          <svg class="icon icon-pause" viewBox="0 0 24 24" aria-hidden="true">
            <rect x="6" y="4" width="4" height="16"></rect>
            <rect x="14" y="4" width="4" height="16"></rect>
          </svg>
          <!-- Play icon (hidden by default) -->
          <svg class="icon icon-play" viewBox="0 0 24 24" aria-hidden="true">
            <polygon points="5,3 19,12 5,21"></polygon>
          </svg>
        </button>
          <div class="carrousel-cards" aria-atomic="false" aria-live="off">
            <slot></slot>
          </div>
        </div>
        <style>
        ${this.getStyles()}
        </style>
    `
    return indexCarrousel;
  };
  // Esta función obtiene la hoja de estilos del componente y la añade al shadow DOM del componente
  getStyles (){
    const styles = `
      @import url('https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,wght@0,200..900;1,200..900&display=swap');
      :host {
        width: 100%;
        height: fit-content;
      }

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Source Sans 3', sans-serif;
        font-optical-sizing: auto;
        font-weight: 400;
        font-style: normal;
      }

      .carrousel {
        width: 75%;
        max-width: 775px;
        margin: 0 auto;
        width: 100%;
        overflow: hidden;
      }

      .carrousel-cards,
      .carrousel-card {
        width: 100%;
      }

      .carrousel-cards {
        column-gap: 20px;
        display: flex;
        overflow: auto;
        scroll-snap-type: x mandatory;
      }

      .carrousel-card {
        flex: 0 0 auto;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 13px;
        width: 100%;
        max-height: 461px;
        padding: 0 10px;
        scroll-snap-align: center;
        overflow-y: hidden;
        overflow-x: hidden;
      }

      .carrousel-cards.smooth-scroll {
        scroll-behavior: smooth;
      }

      .carrousel-cards {
        width: 100%;
        max-height: 461px;
        min-height: 275px;
        scrollbar-width: none;
      }

      .carrousel-cards::-webkit-scrollbar {
        display: none;
      }

      .carrousel {
        padding-block-start: 0;
        padding-block-end: 60px;
        position: relative;
      }

      .carrousel-navdots {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        column-gap: 16px;
        padding-block-end: 30px;
      }

      .carrousel-navdots button {
        -moz-appearance: none;
        -webkit-appearance: none;
        appearance: none;
        border: 0;
        cursor: pointer;

        background-color: #9a9a9a;
        border-radius: 50%;
        height: 10px;
        padding: 0;
        width: 10px;
      }

      .carrousel-navdots button.is-active {
        background-color:rgb(98, 98, 110);
      }

      .carrousel-navdots button:focus-visible {
        outline: 2px solid black;
        outline-offset: 2px;
      }

      .carrousel-card-title {
        font-size: 3rem;
      }
      .carrousel-card-tags-banner-wrapper {
        overflow: hidden;
        width: 100%;
      }
        
      .carrousel-card-tags {
        display: inline-block;
        white-space: nowrap;
        animation: scrollTags 20s linear infinite;
      }

      @keyframes scrollTags {
        0% {
          transform: translateX(100%);
        }
        100% {
          transform: translateX(-100%);
        }
      }

      .tag {
        width: fit-content;
        height: fit-content;
        border-radius: 6px;
        font-size: 1.3rem;
        font-weight: 600;
        text-wrap: nowrap;
        box-shadow: rgba(50, 50, 105, 0.35) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;
      }

      .tag:hover {
        cursor: pointer;
        transform: scale(1.15);
      }

      .tag.html {
        color: rgb(255, 255, 226);
        background: rgb(227,76,38);
        background: linear-gradient(117deg, rgba(227,76,38,1) 0%, rgba(240,101,41,1) 48%, rgba(255,181,97,1) 100%);
      }

      .tag.javascript {
        color: #323330;
        background: rgb(240,219,79);
        background: linear-gradient(117deg, rgba(240,219,79,1) 0%, rgba(232,217,119,1) 48%, rgba(233,228,196,1) 100%);
      }
      .tag.css {
        color: #f9ffc8;
        background: rgb(38,77,228);
        background: linear-gradient(117deg, rgba(38,77,228,1) 0%, rgba(41,101,241,1) 48%, rgba(167,193,255,1) 100%);
      }
      .tag.sass {
        color: rgb(73, 73, 73);
        background: rgb(204,102,153);
        background: linear-gradient(117deg, rgba(204,102,153,1) 0%, rgba(233,167,200,1) 48%, rgba(242,199,221,1) 100%);
      }
      .tag.web-components {
        color: rgb(105, 62, 30);
        background: rgb(1,1,1);
        background: linear-gradient(117deg, rgba(180,212,78,1) 40%, rgba(41,171,226,1) 100%);
      }


      .carrousel-card-content {
        font-size: 2.4rem;
      }
      .carrousel-card-content a {
          text-decoration: none;
          color: inherit;
          font-weight: 700;
        }

      .play-pause-button {
        position: absolute;
        top: 10px;
        right: 10px;
        transform: none;
        background-color:rgb(43, 49, 31);
        border: none;
        border-radius: 50%;
        color: #fff;
        cursor: pointer;
        width: 25px;
        height: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.3s ease;
      }

      .play-pause-button:hover {
        background-color:rgb(198, 198, 198);
      }

      .play-pause-button .icon {
        width: 12px;
        height: 12px;
        fill: currentColor;
      }

      .icon-play {
        display: none;
      }

      .play-pause-button.paused .icon-play {
        display: block;
      }
      .play-pause-button.paused .icon-pause {
        display: none;
      }

      @media (max-height: 640px){
        .carrousel {
          min-height: 250px;
        }
      }

      @media (max-width: 768px){
        .carrousel-cards {
          margin-block-end: 50px;
        }
      }

      @media (max-width: 520px) {
        
        .carrousel-card-title {
          font-size: 2rem;
        }
        .carrousel-card-content {
          font-size: 1.7rem;
        }
      }

      @media (max-width: 430px){
        .carrousel {
          padding: 0 20%;
        }
        .carrousel-card-tags {
        gap: 2%;
        }
        .carrousel-card-title {
          font-size: 1.8rem;
          font-weight: 700;
        }
        .carrousel-card-content {
          font-size: 1.5rem;
        }
        .tag {
          padding: 5px 10px;
          font-size: 1.4rem;
          letter-spacing: 1.3px;
          border-radius: 5px;
        }
      }
    `
    return styles;
  };
  
  playPauseButton() {
      const playPauseButton = this.shadowRoot.getElementById('playPauseButton');
    
      playPauseButton.addEventListener('click', () => {
        if (playPauseButton.classList.contains('paused')) {
          playPauseButton.classList.remove('paused');
          playPauseButton.setAttribute('aria-label', 'Pause autoplay');
          if (this.sliderModule && typeof this.sliderModule.play === 'function') {
            this.sliderModule.play();
          }
        } else {
          playPauseButton.classList.add('paused');
          playPauseButton.setAttribute('aria-label', 'Play autoplay');
          if (this.sliderModule && typeof this.sliderModule.stop === 'function') {
            this.sliderModule.stop();
          }
        }
      });
    
  }

  autoSlide() {
    if (!IndexCarrousel.sliderModulePromise) {
      IndexCarrousel.sliderModulePromise = import('./slider.mjs');
    }
    IndexCarrousel.sliderModulePromise
      .then(module => {
        this.sliderModule = module;
        if(module.initSlider){
          module.initSlider(this.shadowRoot);
        }
        module.play();

        const carrouselContainer = this.shadowRoot.querySelector('.carrousel');
        carrouselContainer.addEventListener('pointerenter', () => {
          module.stop();
        });
        carrouselContainer.addEventListener('pointerleave', () => {
          module.play();
        });
      })
      .catch(err => console.error("Error al cargar el módulo slider:", err));
  }

  render(){
    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
  }
  
  connectedCallback(){
    this.render();
    this.playPauseButton();
    this.autoSlide();
  }
}