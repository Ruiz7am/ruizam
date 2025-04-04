export class Navbar extends HTMLElement {
  constructor(){
    super();
    this.attachShadow({mode: 'open'});
  }

  static get observedAttributes(){
    return ['blog-icon-path', 'facebook-icon-path', 'github-icon-path', 'instagram-icon-path', 'twitter-icon-path'];
  }

  attributeChangedCallback (name, oldValue, newValue) {
    if(oldValue !== newValue){
      this.render()
    }
  }

  getTemplate(){

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
    const blogIconPath = this.getAttribute('blog-icon-path');
    const facebookIconPath = this.getAttribute('facebook-icon-path');
    const githubIconPath = this.getAttribute('github-icon-path');
    const instagramIconPath = this.getAttribute('instagram-icon-path');
    const twitterIconPath = this.getAttribute('twitter-icon-path');
    const styles = `
      
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    :host {
      display: flex;
      width: 100%;
      height: 100%;
    }

    #navbar {
      display: flex;
      flex-direction: column;
      gap: 28px;
      padding-inline-end: 40px;
      font-family: 'Poppins', sans-serif;
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
      display: block;
      border: 1px solid black;
      transition-property: transform;
      transition-duration: 500ms;
      transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    // blog icon
    .navbar-icon-link-blog {
      background-image: url(https://www.svgrepo.com/show/535115/alien.svg);
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
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
    
    `
    return styles;
  }

  render(){
    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
  }
  connectedCallback(){
    this.render();
  }
}