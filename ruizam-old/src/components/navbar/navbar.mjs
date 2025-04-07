export class Navbar extends HTMLElement {
  constructor(){
    super();
    this.attachShadow({mode: 'open'});
  }

  static get observedAttribute(){
    return ['blogIconPath', 'facebookIconPath', 'githubIconPath', 'instagramIconPath', 'twitterIconPath']
  }

  attributeChangedCallback (name, oldValue, newValue) {
    if(oldValue !== newValue){
      this.render()
    }
  }

  getTemplate(){
    const blogIconPath = this.getAttribute('blogIconPath');
    const facebookIconPath = this.getAttribute('facebookIconPath');
    const githubIconPath = this.getAttribute('githubIconPath');
    const instagramIconPath = this.getAttribute('instagramIconPath');
    const twitterIconPath = this.getAttribute('twitterIconPath');

    const navbar = document.createElement('template');
    navbar.innerHTML = `
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
    <style>
      ${this.getStyles()}
    </style>
    `
    return navbar;
  }

  getStyles() {
    const styles = `
    :root {
      --navbar-icons-size: 35px;
    }
      :host {
      display: flex;
      align-items: center;
      justify-content: end;
      width: 100%;
      height: 100%;
    }
    * {
      margin: 0;
      padding: 0;
    }

    #navbar {
      display: flex;
      flex-direction: column;
      gap: 28px;
      padding-inline-end: 40px;
      font-family: var(--header-font);
      font-size: 2.8rem;
      font-weight: 200;
    }
    .navbar-link {
      list-style: none;
      text-align: right;
      width: 100%;
      height: 100%;
    }
    .navbar-link a {
      text-decoration: none;
      color: inherit;
    }
    .navbar-link a:hover .navbar-text-link {
      transform: scale(1.20) translateX(-10px);
      font-weight: 400;
    }
      .navbar-link a:hover .navbar-icon-link {
      transform: scale(1.34)
    }
    .navbar-text-link {
      display: block;
      transition-property: transform;
      transition-duration: 500ms;
      transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    .navbar-icon-link {
      display: none;
      transition-property: transform;
      transition-duration: 500ms;
      transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    // blog icon
    .navbar-icon-link-blog {
      background-image: url(${blogIconPath});
      background-size: contain;
    }
    .navbar-icon-link-blog-dark {
      background-image: url();
      background-size: contain;
    }

    // github icon
    .navbar-icon-link-github {
      background-image: url(${githubIconPath});
      background-size: contain;
    }
    .navbar-icon-link-github-dark {
      background-image: url();
      background-size: contain;
    }

    // twitter icon
    .navbar-icon-link-twitter {
      background-image: url(${twitterIconPath});
      background-size: contain;
    }
    .navbar-icon-link-twitter-dark {
      background-image: url();
      background-size: contain;
    }

    // instagram
    .navbar-icon-link-instagram {
      background-image: url(${instagramIconPath});
      background-size: contain;
    }
    .navbar-icon-link-instagram-dark {
      background-image: url();
      background-size: contain;
    }

    // facebook
    .navbar-icon-link-facebook {
      background-image: url(${facebookIconPath});
      background-size: contain;
    }

    .navbar-icon-link-facebook-dark {
      background-image: url();
      background-size: contain;
    }
    // Media queries (Breakpoints)
    @media (max-width: 1440px){
      
    }
    @media (max-width: 1280px){
      .navbar-text-link {
        display: none;
      }
      .navbar-icon-link {
        display: block;
        width: var(--navbar-icons-size);
        height: var(--navbar-icons-size);
      }
      .navbar-icon-link a {
        display: block;
        width: var(--navbar-icons-size);
        height: var(--navbar-icons-size);
      }
    }
    @media (max-width: 768px){
      #navbar {
        flex-direction: row;
      }
    }
    @media (max-height: 638px) {
      #navbar {
        gap: 15px;
      }
    }
    @media (max-width: 440px){
      #navbar {
        gap: 15px;
      }
    }
    `
  }

  render(){
    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
  }
  connectedCallback(){
    this.render();
  }
}