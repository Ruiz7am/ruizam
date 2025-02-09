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
          <li class="navbar-link"><a id="blog-link" href="#">Blog</a></li>
          <li class="navbar-link"><a id="github-link" href="https://github.com/Ruiz7am">Github</a></li>
          <li class="navbar-link"><a id="twitter-link" href="https://x.com/ruiz7am">Twitter</a></li>
          <li class="navbar-link"><a id="instagram-link" href="https://www.instagram.com/ruiz7am/">Instagram</a></li>
          <li class="navbar-link"><a id="facebook-link" href="https://www.facebook.com/profile.php?id=61552171175028">Facebook</a></li>
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

export function adjustNavbarToScreenSize() {
  
  const screenWidth = window.innerWidth
  const navBar = document.querySelector('nav-bar');
  const blogLink = navBar.shadowRoot.querySelector('#blog-link');
  const githubLink = navBar.shadowRoot.querySelector('#github-link');
  const twitterLink = navBar.shadowRoot.querySelector('#twitter-link');
  const instagramLink = navBar.shadowRoot.querySelector('#instagram-link');
  const facebookLink = navBar.shadowRoot.querySelector('#facebook-link');
  const navbarLink = navBar.shadowRoot.querySelector('.navbar-link');
  
  if (screenWidth < 1280) {
    blogLink.innerHTML = `<span id=blog-link-icon></span>`
    githubLink.innerHTML = `<span id=github-link-icon></span>`
    twitterLink.innerHTML = `<span id=twitter-link-icon></span>`
    instagramLink.innerHTML = `<span id=instagram-link-icon></span>`
    facebookLink.innerHTML = `<span id=facebook-link-icon></span>`
    /* navbarLink.style.width = '50px'
    navbarLink.style.height = '50px' */
  } else {
    blogLink.innerHTML = "Blog"
    githubLink.innerHTML = "Github"
    twitterLink.innerHTML = "Twitter"
    instagramLink.innerHTML = "Instagram"
    facebookLink.innerHTML = "Facebook"
  }
}