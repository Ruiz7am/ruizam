// /components/my-navbar.js

class MyNavbar extends HTMLElement {
  // Constructor
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.activeIndex = 0;
  }

  // Observador de atributos
  static get observedAttributes() {
    return ['active-index'];
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
    const icons = [
      { name: 'Book-open', label: 'Blog' },
      { name: 'Portfolio', label: 'Portfolio' },
      { name: 'Facebook', label: 'Face' },
      { name: 'Instagram', label: 'Insta' },
      { name: 'Twitter', label: 'Twitter' },
    ];

    const template = document.createElement('template');
    template.innerHTML = `
      <style>${this.getStyles()}</style>
      <nav role="navigation" aria-label="Navegación inferior">
        ${icons
          .map(
            (icon, index) => `
          <button 
            class="nav-item ${index === this.activeIndex ? 'active' : ''}" 
            aria-label="${icon.label}" 
            data-index="${index}" 
            tabindex="0">
              <img src="/public/navbar-icons/${icon.name}.svg" alt="" aria-hidden="true" />
              <span>${icon.label}</span>
          </button>
        `
          )
          .join('')}
      </nav>
    `;
    return template;
  }

  // Estilos
  getStyles() {
    return `
      :host {-
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 0.75rem 0;
        z-index: 1000;
      }

      nav {
        display: flex;
        width: 100%;
        max-width: 500px;
        justify-content: space-around;
        margin-block-end: 10px;
      }

      .nav-item {
        background: none;
        border: none;
        padding: 0.5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #aaa;
        cursor: pointer;
        transition: color 0.3s ease;
      }

      .nav-item:focus-visible {
        outline: 2px solid var(--blue-munsell);
        outline-offset: 2px;
      }

      .nav-item.active,
      .nav-item:hover {
        color: var(--ucla-blue);
      }

      .nav-item img {
        width: 24px;
        height: 24px;
        fill: currentColor;
      }

      .nav-item span {
        font-size: 0.75rem;
        margin-top: 0.25rem;
      }

      @media(min-width: 768px) {
        :host {
          display: none;
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
  }

  // Desconexión
  disconnectedCallback() {
    // Aquí desconectarías listeners si fueran externos o globales
  }
}

customElements.define('my-navbar', MyNavbar);
