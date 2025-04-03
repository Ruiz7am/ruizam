export class DevCard extends HTMLElement {
  // Constructor
  constructor(){
    super();
    this.attachShadow({mode: 'open'});
  };
  // Lifecycle methods
  // Observer for attribute changes
  static get observedAttribute () {
    return['imagesource', 'title', 'paragraph']
  } ;
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue){
      this.render();
    }
  };
  // Getting template and styles
  getTemplate(){
    const imageSource = this.getAttribute('imagesource');
    const paragraph = this.getAttribute('paragraph');
    const title = this.getAttribute('title');
    const logo = document.createElement('template');
    logo.innerHTML = `
      <div id="dev-modal" class="dev-modal">
        <div class="dev-modal-content">
          <span class="close-modal">&times;</span>
          <div class="dev-card">
          <div class="image-container">
            <img src="${imageSource}" alt="Developer Avatar" />
          </div>
            <h1></h1>
            <h2>${title}</h2>
            <p>${paragraph}</p>
            <div class="social-links">
              <a href="https://github.com/Ruiz7am" target="_blank">GitHub</a>
              <a href="https://www.facebook.com/profile.php?id=61552171175028" target="_blank">Facebook</a>
              <a href="mailto:artmx@proton.me">Email</a>
            </div>
          </div>
        </div>
      </div>
      <style>
        ${this.getStyles()}
      </style>
    `
    return logo;
  };
  getStyles(){
    return `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
      .dev-modal {
    display: none;
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.7);
    backdrop-filter: blur(5px);
  }

  .dev-modal-content {
    position: relative;
    background-color: #fefefe;
    margin: 15% auto;
    padding-block: 60px;
    padding-inline: 50px;
    border-radius: 15px;
    max-width: 360px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    animation: modalFadeIn 0.4s ease;
  }

  @keyframes modalFadeIn {
    from {opacity: 0; transform: translateY(-30px);}
    to {opacity: 1; transform: translateY(0);}
  }

  .close-modal {
    position: absolute;
    top: 0;
    right: 0;
    margin-block: 15px;
    margin-inline: 25px;
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
  }

  .dev-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    height: fit-content;
  }
  .image-container {
    width: 120px;
    height: 120px;
  }
  .image-container img {
    width: 100%;
    object-fit: cover;
    transition: transform 650ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  
  .dev-card h2 {
    margin-top: 15px;
    font-size: 2.4rem;
    color: #193854;
  }

  .dev-card p {
    margin-top: 5px;
    font-size: 1.6rem;
    color: #666;
  }

  .social-links {
    margin-top: 20px;
    display: flex;
    gap: 15px;
  }

  .social-links a {
    padding: 8px 15px;
    background-color: #193854;
    color: white;
    border-radius: 5px;
    text-decoration: none;
    font-size: 1.4rem;
    transition: all 0.3s ease;
  }
  .rotate-card {
    transform: scale(1.15) rotate(360deg);
  }
  
  @media (hover: hover) {
    .image-container:hover img {
      transform: scale(1.15) rotate(360deg);
    }
    .close-modal:hover {
      color: black;
    }
    .social-links a:hover {
      background-color: #5e98cb;
      transform: translateY(-2px);
    }
  }
    `
  };
  // Scripts area
  avatarAnimation(){
    const devCard = document.querySelector('dev-card');
    const devCardImg = devCard.shadowRoot.querySelector('.image-container img');
    devCardImg.addEventListener('click', rotateAvatar);
    function rotateAvatar(){
      devCardImg.classList.toggle('rotate-card');
      /* setTimeout(()=> {
        devCardImg.classList.remove('rotate-card');
      },500) */
    }
  };
  // All will be render must be here
  render(){
    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
  };
  // Lifecycle method to run when the element is added to the DOM
  connectedCallback(){
    this.render();
    this.avatarAnimation();
  };
}