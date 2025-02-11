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
  <li class="navbar-link">
    <a id="blog-link" href="#">
      <span class="navbar-text-link">Blog</span>
      <span id="navbar-icon-blog" class="navbar-icon-link navbar-icon-link-blog"></span>
    </a>
  </li>
  <li class="navbar-link">
    <a id="github-link" href="https://github.com/Ruiz7am">
      <span class="navbar-text-link">Github</span>
      <span id="navbar-icon-github" class="navbar-icon-link navbar-icon-link-github"></span>
    </a>
  </li>
  <li class="navbar-link">
    <a id="twitter-link" href="https://x.com/ruiz7am">
      <span class="navbar-text-link">Twitter</span>
      <span id="navbar-icon-twitter" class="navbar-icon-link navbar-icon-link-twitter"></span>
    </a>
  </li>
  <li class="navbar-link">
    <a id="instagram-link" href="https://www.instagram.com/ruiz7am/">
      <span class="navbar-text-link">Instagram</span>
      <span id="navbar-icon-instagram" class="navbar-icon-link navbar-icon-link-instagram"></span>
    </a>
  </li>
  <li class="navbar-link">
    <a id="facebook-link" href="https://www.facebook.com/profile.php?id=61552171175028">
      <span class="navbar-text-link">Facebook</span>
      <span id="navbar-icon-facebook" class="navbar-icon-link navbar-icon-link-facebook"></span>
    </a>
  </li>
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