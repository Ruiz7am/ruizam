class ThemeToggle extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleSystemChange = this.handleSystemChange.bind(this); // importante pa' limpiar después
  }

  static get observedAttributes() {
    return [];
  }

  attributeChangedCallback(name, oldValue, newValue) {}

  getTemplate() {
    const template = document.createElement('template');
    template.innerHTML = `
      <style>${this.getStyles()}</style>
      <button aria-label="Cambiar tema" title="Cambiar tema">
        <slot name="icon">
          <span class="icon">☀️</span>
        </slot>
      </button>
    `;
    return template;
  }

  getStyles() {
    return `
      :host {
        display: inline-block;
      }

      button {
        background: transparent;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 50%;
        transition: transform 0.3s ease, background 0.3s;
      }

      button:hover {
        transform: scale(1.2);
        background: rgba(255, 255, 255, 0.1);
      }

      ::slotted([slot="icon"]) {
        pointer-events: none;
        display: inline-block;
        transition: opacity 0.3s ease;
      }
    `;
  }

  updateIcon() {
    const isDark = document.documentElement.classList.contains('dark');
    const fallback = this.shadowRoot.querySelector('.icon');
    if (fallback) {
      fallback.textContent = isDark ? '🌙' : '☀️';
    }
  }

  toggleTheme() {
    const root = document.documentElement;
    const isDark = root.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    this.updateIcon();
  }

  setInitialTheme() {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = saved || (prefersDark ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', theme === 'dark');
    this.updateIcon();
  }

  handleSystemChange(e) {
    const saved = localStorage.getItem('theme');
    if (!saved) {
      document.documentElement.classList.toggle('dark', e.matches);
      this.updateIcon();
    }
  }

  render() {
    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
  }

  connectedCallback() {
    this.render();
    this.setInitialTheme();
    this.shadowRoot.querySelector('button')
      .addEventListener('click', () => this.toggleTheme());

    // 🎯 Listener de cambios del sistema
    this.schemeListener = window.matchMedia('(prefers-color-scheme: dark)');
    this.schemeListener.addEventListener('change', this.handleSystemChange);
  }

  disconnectedCallback() {
    this.shadowRoot.querySelector('button')
      ?.removeEventListener('click', this.toggleTheme);

    // 💥 Limpieza del listener global (buenas prácticas)
    this.schemeListener.removeEventListener('change', this.handleSystemChange);
  }
}

customElements.define('theme-toggle', ThemeToggle);
