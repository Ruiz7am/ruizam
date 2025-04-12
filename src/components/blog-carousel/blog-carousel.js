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

  getTemplate() {
    const template = document.createElement('template');
    template.innerHTML = `
      <style>
        ${this.getStyles()}
      </style>
      <div class="carousel-wrapper">
        <div class="carousel-track">
          ${this.getSlides(5)}
        </div>
      </div>
    `;
    return template;
  }

  getSlides(count) {
    const slide = `
      <div class="blog-card">
        <img src="https://picsum.photos/480/360?grayscale" alt="Imagen del post" />
        <div class="blog-card__content">
          <h2 class="blog-card__title">Título del Post</h2>
          <p class="blog-card__excerpt">Este es un pequeño resumen del contenido del post para atrapar tu atención.</p>
          <span class="blog-card__cta">Leer más</span>
        </div>
      </div>
    `;
    return new Array(count).fill(slide).join('');
  }

  getStyles() {
    return `
      .carousel-wrapper {
        overflow: hidden;
        position: relative;
        height: auto;
        /* border: 2px dashed red; */
        margin-block-start: 20vh;
        border-radius: 15px;
        box-shadow: var(--carousel-card-shadow);
      }

      .carousel-track {
        border-radius: 15px;
        display: flex;
        transition: transform 0.5s ease;
        will-change: transform;
        width: 100%;
      }

      .blog-card {
      aspect-ratio: 19/12;
      border-radius: 15px;
      position: relative;
      overflow: hidden;
      width: 100%;
      background: #000;
      color: var(--lighter);
      font-family: var(--font-body);
      cursor: pointer;
    }

    .carousel-track .blog-card {
      flex: 0 0 auto;
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
      transition: transform 1.2s cubic-bezier(0.22, 1, 0.36, 1);
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

    .blog-card:hover img {
      transform: scale(1.1);
    }

    .blog-card__excerpt {
      font-size: 2.15rem;
      margin-top: 1rem;
    }

    .blog-card__cta {
      font-size: 1.8rem;
      text-decoration: underline;
      margin-top: 0.5rem;
      align-self: flex-start;
    }

    @media (max-width: 1920px) {
      .carousel-wrapper {
        width: 670px;
      }
    }

    @media (max-width: 1440px) {
      .carousel-wrapper {
        width: 600px;
      }
    }

    @media (max-width: 1366px) {
      .carousel-wrapper {
        width: 560px;
      }
    }

    @media (max-width: 1280px) {
      .carousel-wrapper {
        width: 540px;
      }
    }
    @media (max-width: 1024px) {
      .carousel-wrapper {
        width: 500px;
        aspect-ratio: 4/3;
      }
    }

    @media (max-width: 900px) {
      .carousel-wrapper {
        width: 480px;
      }
    }

    @media (max-width: 768px) {
      .carousel-wrapper {
        width: 480px;
      }
    }

    @media (orientation: landscape) and (max-height: 600px) {
      .carousel-wrapper {
        margin-block-start: 60vh;
        margin-block-end: 20vh;
        }
    }

    @media (max-width: 600px) {
        .carousel-wrapper {
          width: 100%;
          border-radius: 0;
        }
      }
    @media (max-width: 480px) {
        .blog-card__title {
          font-size: 2.8rem;
        }
      }
    
    @media (max-width: 430px) {
        .carousel-wrapper {
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

  startAutoSlide = () => {
    clearInterval(this.slideInterval);
    this.direction = 1; // 1 = hacia adelante, -1 = hacia atrás
    // this.slideInterval = setInterval(() => this.nextSlide(), 3000);
    // this.slideInterval = setInterval(() => this.loopSlide(), 3000);
    this.slideInterval = setInterval(() => this.bounceSlide(), 5000);
  };
  
  pauseAutoSlide = () => {
    clearInterval(this.slideInterval);
  }

  /* nextSlide() {
    const track = this.shadowRoot.querySelector('.carousel-track');
    if(!track) return;
    
    this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
    const offset = this.currentIndex * this.slideWidth;
    track.style.transform = `translateX(-${offset}px)`;
  } */

  /* loopSlide() {
    const track = this.shadowRoot.querySelector('.carousel-track');
    if(!track) return;

    this.currentIndex++;

    if(this.currentIndex >= this.totalSlides) {
      this.currentIndex = 0;

      track.style.transition = 'none';
      track.style.transform = 'translateX(0px)';

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          track.style.transition = 'transform 0.5s ease'
        });
      });
    } else {
      const offset = this.currentIndex * this.slideWidth;
      track.style.transform = `translateX(-${offset}px)`;
    }
  } */

  bounceSlide() {
    const track = this.shadowRoot.querySelector('.carousel-track');
    if(!track) return;

    this.currentIndex += this.direction;

    if(this.currentIndex >= this.totalSlides - 1 || this.currentIndex <= 0) {
      this.direction *= -1; //cambia la direcccion.
    }

    const offset = this.currentIndex * this.slideWidth;
    track.style.transform = `translateX(-${offset}px)`;
  }

  connectedCallback() {
    this.render();
    this.startAutoSlide();

    const carousel = this.shadowRoot.querySelector('.carousel-track');
    carousel.addEventListener('mouseenter', this.pauseAutoSlide);
    carousel.addEventListener('mouseleave', this.startAutoSlide);
    carousel.addEventListener('touchstart', this.pauseAutoSlide, {passive: true});
    carousel.addEventListener('touchend', this.startAutoSlide);
    this.currentIndex = 0;
    this.totalSlides = 5;
    this.slideWidth = this.shadowRoot.querySelector('.blog-card')?.offsetWidth || 600;
  }

  disconnectedCallback() {
    // Limpieza de listeners, intervals, observers, etc.
    const card = this.shadowRoot.querySelector('.blog-card');
    if (card) {
      card.removeEventListener('keydown', this.handleKeyDown);
    }

    clearInterval(this.slideInterval);
  }

  render() {
    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
  }
}

if (!customElements.get('blog-carousel')) {
  customElements.define('blog-carousel', BlogCarousel);
}

export default BlogCarousel;