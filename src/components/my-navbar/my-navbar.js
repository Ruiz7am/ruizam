// /components/my-navbar.js

class MyNavbar extends HTMLElement {
  // Constructor
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.activeIndex = 0;
    this.svgIcons = {
      'Home': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-svg"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>`,
      'Book-open': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-svg"><path d="M4 11a9 9 0 0 1 9 9"/><path d="M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1"/></svg>`,
      'Portfolio': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-svg"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
      'Github': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-svg"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>`,
      'Facebook': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-svg"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>`,
      'Twitter': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-svg"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>`
    };
    this.links = {
      'Home': this.getAttribute('home-link') || '#',
      'Book-open': this.getAttribute('blog-link') || '#',
      'Portfolio': this.getAttribute('portfolio-link') || '#',
      'Github': this.getAttribute('github-link') || '#',
      'Facebook': this.getAttribute('facebook-link') || '#',
      'Twitter': this.getAttribute('twitter-link') || '#',
    };
    this.icons = [
      { name: 'Home', label: 'Inicio' },
      { name: 'Book-open', label: 'Blog' },
      { name: 'Portfolio', label: 'Portafolio' },
      { name: 'Github', label: 'Github' },
      { name: 'Facebook', label: 'Facebook' },
      { name: 'Twitter', label: 'Twitter'},
    ];
  }

  // Observador de atributos
  static get observedAttributes() {
    return [
      'active-index',
      'home-link',
      'blog-link',
      'portfolio-link',
      'github-link',
      'facebook-link',
      'twitter-link'
    ];
  }

  // Callback de atributos
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.activeIndex = parseInt(newValue, 10);
      this.render();
    }
  }

  // Obtener template
  getTemplate() {

    const template = document.createElement('template');
    template.innerHTML = `
      <style>${this.getStyles()}</style>
      <nav role="navigation" aria-label="Navegación inferior">
        ${this.icons
          .map(
            (icon, index) => {
              const isSPA = icon.name === 'Home' || icon.name === "Book-open";
              const hrefAttr = isSPA ? '' : `href="${this.links[icon.name]}" target="_blank"`;
              return `
          <button 
            class="nav-item ${index === this.activeIndex ? 'active' : ''} ${icon.name}" 
            aria-label="${icon.label}" 
            data-index="${index}" 
            tabindex="0">
              <div class="icon-container">
                <a ${hrefAttr} aria-label="${icon.label}" target="_blank">
                  ${this.svgIcons[icon.name]}
                </a>
              </div>
              <span class="icon-label">${icon.label}</span>
          </button>
        `}
          )
          .join('')
        }
      </nav>
    `;
    return template;
  }

  // Estilos
  getStyles() {
    return `
      :host {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        padding: 0.75rem 0;
        z-index: 1000;
      }

      a {
        text-decoration: none;
        color: currentColor;
      }

      nav {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 65vh;
        max-width: 500px;
        justify-content: space-around;
      }

      .nav-item {
        background: none;
        border: none;
        padding: 0.5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: var(--font-color);
        cursor: pointer;
      }

      :host(.has-hover) .nav-item:hover .icon-svg {
        transform: scale(1.15);
        stroke: var(--emphasis-color);
      }

      :host(.has-hover) .nav-item:hover .icon-label {
        transform: scale(1.15);
        color: var(--emphasis-color);
      }

      .icon-svg {
        width: 35px;
        height: 35px;
        stroke-width: 1.2px;
        transition: transform 0.3s ease;
        transform-origin: center center;
      }

      .icon-label {
        font-family: var(--font-body);
        font-size: 1.3rem;  
        transition: transform 0.3s ease;
        transform-origin: center center;
      }
      
      @media (max-width: 768px) {
        :host {
          width: 100%;
          height: fit-content;
        }
        nav {
          flex-direction: row;
          height: fit-content;
          padding-block-end: 12px;
        }
        .icon-svg {
          width: 40px;
          height: 40px;
        }
        .nav-item span {
          font-size: 1.2rem;
        }
      }

      @media (max-width: 600px) {
        .icon-svg {
          width: 32px;
          height: 32px;
        }
        .nav-item span {
          font-size: 1rem;
        }
      }
      @media (max-width: 480px) {
        .icon-svg {
          width: 30px;
          height: 30px;
        }
      }
      @media (max-width: 430px) {
        .icon-svg {
          width: 27px;
          height: 27px;
        }
      }
    `;
  }

  // Métodos y funciones
  handleNavClick(index) {
    this.setAttribute('active-index', index);
    this.dispatchEvent(
      new CustomEvent('nav-change', {
        detail: { index },
        bubbles: true,
        composed: true
      })
    );
  }

  checkHover() {
    if (window.matchMedia('(hover: hover)').matches) {
      this.classList.add('has-hover');
    }
  }

  // Renderizar el componente y conectar/desconectar el callback
  render() {
    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));

    this.shadowRoot.querySelectorAll('.nav-item').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const index = parseInt(e.currentTarget.dataset.index, 10);
        this.handleNavClick(index);
      });
    });
  }

  // Conexión
  connectedCallback() {
    this.render();
    this.checkHover();
  }

  // Desconexión
  disconnectedCallback() {
    // Aquí desconectarías listeners si fueran externos o globales
  }
}

if (!customElements.get('my-navbar')) {
  customElements.define('my-navbar', MyNavbar);
}

export default MyNavbar;
// customElements.define('my-navbar', MyNavbar);
