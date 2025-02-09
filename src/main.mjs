// Import custom Elements classes
import { Logo } from './components/logo/logo.mjs';
import { IndexCarrousel } from './components/index-carrousel/indexCarrousel.mjs';
import { DarkThemeToggle } from './components/dark-theme-toggle/darkThemeToggle.mjs';
import { Navbar } from './components/navbar/navbar.mjs';

// Define custom elements
customElements.define('the-logo', Logo);
customElements.define('index-carrousel', IndexCarrousel);
customElements.define('dark-theme-toggle', DarkThemeToggle);
customElements.define('nav-bar', Navbar);