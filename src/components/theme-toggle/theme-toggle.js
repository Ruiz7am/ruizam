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
      <button class="theme-icon-container" aria-label="Cambiar tema" title="Cambiar tema">
        <span class="icon face-icon">
          
        </span>
      </button>
    `;
    return template;
  }

  getStyles() {
    return `
      :host {
        position: absolute;
        top: 40px;
        right: 40.5px;
        display: inline-block;
        z-index: 2000;
      }

      .theme-icon-container {
        background: transparent;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 50%;
      }
      
      .lucide {
        width: 32px;
        height: 32px;
        transition: transform 0.3s ease;
        color: var(--font-color);
      }

      .icon.fade-out {
        opacity: 0;
      }

      :host(.has-hover) .theme-icon-container:hover .lucide {
        transform: scale(1.2) rotate(-90deg);

      }
      @media (max-width: 768px) {
        :host {
          top: 20px;
          right: 20px;
        }
      }
      @media (max-width: 480px) {
        :host {
          top: 17px;
          right: 17px;
        }
      }
    `;
  }

  checkHover() {
    if (window.matchMedia('(hover: hover)').matches) {
      this.classList.add('has-hover');
    }
  }

  updateIcon() {
    const isDark = document.documentElement.classList.contains('dark');
    const fallback = this.shadowRoot.querySelector('.icon');

    if (fallback) {
      fallback.classList.add('fade-out');
      
      setTimeout(() => {
        fallback.innerHTML = isDark
          ? '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun-icon lucide-sun"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>'
          : '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon-icon lucide-moon"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>'
        
          fallback.classList.remove('fade-out');
      }, 300);
    };
  };

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
    this.checkHover();
    requestAnimationFrame(() => {
      this.setInitialTheme()
    });
    this.shadowRoot.querySelector('button').addEventListener('click', () => this.toggleTheme());

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

if(!customElements.get('theme-toggle')) {
  customElements.define('theme-toggle', ThemeToggle);
}

export default ThemeToggle;