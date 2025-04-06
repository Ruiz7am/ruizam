// Nombre: mi-componente.js

class MiComponente extends HTMLElement {
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
      <div class="elemento">
        <h2>¡Hola, mundo!</h2>
        <p>Este es un componente base para armar lo que quieras.</p>
      </div>
    `;
    return template;
  }

  getStyles() {
    return `
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      :host {
        display: block;
      }

      .elemento {
        /* Layout & Posicionamiento */
        position: relative;
        z-index: 1;

        /* Display & Flexbox */
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1rem;

        /* Box Model */
        width: 100%;
        max-width: 600px;
        height: auto;
        margin: 0 auto;
        padding: 2rem;

        /* Tipografía */
        color: #e0f7fa;
        font-family: 'Courier New', Courier, monospace;
        font-size: 1.8rem;
        text-align: center;

        /* Fondo */
        background-color: rgba(0, 0, 0, 0.6);
        background-image: url('https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=800&q=80');
        background-size: cover;
        background-position: center;

        /* Bordes & Sombras */
        border: 1px solid rgba(255,255,255,0.2);
        border-radius: 1rem;
        box-shadow: 0 0 10px rgba(0,0,0,0.5);

        /* Transiciones y Animaciones */
        transition: all 0.3s ease;
        transform: scale(1.05);

        /* Extras */
      }
    `;
  }

  render() {
    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
  }
}

customElements.define('mi-componente', MiComponente);
