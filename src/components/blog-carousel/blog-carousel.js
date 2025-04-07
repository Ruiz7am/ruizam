// Nombre: blog-carousel.js

class BlogCarousel extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    // Variables internas o bindings van aquí
  }

  static get observedAttributes() {
    return ['data-prop']; // si necesitas escuchar atributos
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal !== newVal) this.render();
  }

  connectedCallback() {
    this.render();
    // Listeners, inits, etc.
  }

  disconnectedCallback() {
    // Limpieza de listeners, intervals, observers, etc.
  }

  getTemplate() {
    const template = document.createElement('template');
    template.innerHTML = `
      <style>
        ${this.getStyles()}
      </style>
      <div class="blog-card">
        <img src="https://picsum.photos/480/360?grayscale" alt="Imagen del post" />
        <div class="blog-card__content">
          <h2 class="blog-card__title">Título del Post</h2>
          <p class="blog-card__excerpt">Este es un pequeño resumen del contenido del post para atrapar tu atención.</p>
          <span class="blog-card__cta">Leer más</span>
        </div>
      </div>
    `;
    return template;
  }

  handleKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target === this.shadowRoot.querySelector('.blog-card')) {
      this.shadowRoot.querySelector('.blog-card__cta')?.click();
    }
  };

  addA11yFeatures() {
    const card = this.shadowRoot.querySelector('.blog-card');
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.addEventListener('keydown', this.handleKeyDown);
  }

  getStyles() {
    return `
      :host {

      }
      .blog-card {
      width: 680px;
      aspect-ratio: 19/12;
      border-radius: 15px;
      position: relative;
      overflow: hidden;
      background: #000;
      color: white;
      font-family: var(--font-body);
      cursor: pointer;
      border: 1px solid rgba(0,0,0,0.3);
      box-shadow: var(--neumorphic-shadow);
      margin-block-start: 20vh;
    }

    .blog-card::before {
        content: "";
        position: absolute;
        inset: 0;
        background-color: rgba(0, 0, 0, 0.5);
        opacity: 0;
        transition: opacity 0.5s ease-in-out;
        z-index: 1;
      }

    .blog-card:hover::before {
      opacity: 1;
    }

    .blog-card::after {
      content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 40%;
        background: linear-gradient(to bottom, rgba(0, 0, 0, 0.7), transparent);
        z-index: 2;
        pointer-events: none;
        transition: opacity 0.5s ease-in-out;
    }

    .blog-card img {
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: cover;
      top: 0;
      left: 0;
    }

    .blog-card__content {
      position: relative;
      z-index: 2;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      padding: 4rem;
      transition: all 0.3s ease;
      z-index: 3;
    }

    .blog-card__title {
      font-size: 4rem;
      font-weight: bold;
      margin: 0;
      transition: transform 0.3s ease;
    }

    .blog-card:hover .blog-card__title {
      transform: translateY(10px);
    }

    .blog-card__excerpt,
      .blog-card__cta {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.4s ease-out 0.15s;
      }

    .blog-card:hover .blog-card__excerpt,
    .blog-card:hover .blog-card__cta {
      opacity: 1;
      transform: translateY(0);
    }

    .blog-card__excerpt {
      font-size: 2.15rem;
      margin-top: 1rem;
    }

    .blog-card__cta {
      font-size: 1.8rem;
      text-decoration: underline;
      margin-top: 0.5rem;
      color: #ddd;
      align-self: flex-start;
    }

    @media (max-width: 1280px) {
      .blog-card {
        width: 640px;
      }
    }
    @media (max-width: 1024px) {
      .blog-card {
        width: 500px;
        aspect-ratio: 4/3;
      }
    }
    @media (max-width: 768px) {
      .blog-card {
        width: 480px;
      }
    }

    @media (orientation: landscape) and (max-height: 600px) {
      .blog-card {
        margin-block-start: 60vh;
        margin-block-end: 20vh;
        }
    }

    @media (max-width: 600px) {
        .blog-card {
          
        }
      }
    @media (max-width: 480px) {
        .blog-card {
          width: 100%;
          border-radius: 0;
        }
        .blog-card__title {
          font-size: 2.8rem;
        }
      }
    
    @media (max-width: 430px) {
        .blog-card {
          margin-block-start: 9.3vh;
        }
        .blog-card__title {
          font-size: 2.2rem;
        }
        .blog-card__excerpt {
          font-size: 1.8rem;
        }
        .blog-card__cta {
          font-size: 1.5rem;
        }
      }
    `;
  }

  render() {
    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
  }
}

// customElements.define('blog-carousel', BlogCarousel);

if (!customElements.get('blog-carousel')) {
  customElements.define('blog-carousel', BlogCarousel);
}