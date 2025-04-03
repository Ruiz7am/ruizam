// Import custom Elements classes
import { Logo } from './components/logo/logo.mjs';
import { IndexCarrousel } from './components/index-carrousel/indexCarrousel.mjs';
import { DarkThemeToggle } from './components/dark-theme-toggle/darkThemeToggleComponent.mjs';
import { Navbar } from './components/navbar/navbar.mjs';
import { FooterContent } from './components/footer-content/footerContent.mjs';

// Define custom elements
customElements.define('the-logo', Logo);
customElements.define('index-carrousel', IndexCarrousel);
customElements.define('dark-theme-toggle', DarkThemeToggle);
customElements.define('nav-bar', Navbar);
customElements.define('footer-content', FooterContent);

const navBar = document.querySelector('nav-bar');
const blogLink = navBar.shadowRoot.getElementById('blog-link');
blogLink.addEventListener('click', (event) => {
  
})