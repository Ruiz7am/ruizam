const navbarStylesheetPath = "src/styles/css/navbar.css";

export class Navbar extends HTMLElement {
  constructor(){
    super();
    this.attachShadow({mode: 'open'});
  }
  getTemplate(){
    const navbar = document.createElement('template');
    navbar.innerHTML = `
      <link rel="stylesheet" href="${navbarStylesheetPath}">
      <ul id="navbar" class="navbar">
          <li class="navbar-link"><a href="#">Blog</a></li>
          <li class="navbar-link"><a href="https://github.com/Ruiz7am">Github</a></li>
          <li class="navbar-link"><a href="https://x.com/ruiz7am">Twitter</a></li>
          <li class="navbar-link"><a href="https://www.instagram.com/ruiz7am/">Instagram</a></li>
          <li class="navbar-link"><a href="https://www.facebook.com/profile.php?id=61552171175028">Facebook</a></li>
        </ul>
    `
    return navbar;
  }
  render(){
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
  }
  connectedCallback(){
    this.render();
  }
}