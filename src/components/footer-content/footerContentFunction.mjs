const footerContent = document.querySelector('footer-content');
const logos = footerContent.shadowRoot.querySelectorAll('.badge');
const infoBalloonContainer = footerContent.shadowRoot.querySelector('.info-balloon-container')
const infoBalloon = footerContent.shadowRoot.querySelector('.info-balloon')
const infoBalloonImage = footerContent.shadowRoot.querySelector('.info-balloon__image')
const infoBalloonTitle = footerContent.shadowRoot.querySelector('.info-balloon__title')
const infoBalloonParagraph = footerContent.shadowRoot.querySelector('.info-balloon__paragraph')
console.log({ footerContent, logos, infoBalloonContainer })

logos.forEach(logo => {
  logo.addEventListener('mouseenter', (event) => {
    const target = event.target.id;
    const targetListener = event.target;
    if (target === null || target === undefined) {
      console.error('No logo element')
    } else {
      switch (target) {
        case 'html-logo':
          targetListener.addEventListener('click', (event) => {
            window.open('https://developer.mozilla.org/en-US/docs/Glossary/HTML5', '_blank')
          })
          infoBalloonImage.setAttribute('src', './src/assets/vectors/HTML5_Badge.svg');
          infoBalloonImage.style.width = '57%';
          infoBalloonTitle.innerHTML = "HTML5"
          infoBalloonParagraph.innerHTML = "HTML5 refers to a set of modern web technologies. This includes the HTML Living Standard, along with JavaScript APIs to enhance storage, multimedia, and hardware access."
          infoBalloonContainer.classList.add('active');
          logo.addEventListener('mouseleave', (event) => {
            const target = event.target.id;
            if (target === null || target === undefined) {
              console.error('No logo element')
            }
            
            infoBalloonContainer.classList.remove('active');
          })
          break;
        case 'css-logo':
          targetListener.addEventListener('click', (event) => {
            window.open('https://developer.mozilla.org/en-US/docs/Web/CSS', '_blank')
          })
          infoBalloonImage.setAttribute('src', './src/assets/vectors/css-3.svg');
          infoBalloonImage.style.width = '52%'
          infoBalloonTitle.innerHTML = "CSS3"
          infoBalloonParagraph.innerHTML = "CSS3 is a stylesheet language used to describe the presentation of a document written in HTML or XML (including XML dialects such as SVG, MathML or XHTML)."
          infoBalloonContainer.classList.add('active');
          logo.addEventListener('mouseleave', (event) => {
            const target = event.target.id;
            if (target === null || target === undefined) {
              console.error('No logo element')
            }
            infoBalloonContainer.classList.remove('active');
          })
          break;
        case 'sass-logo':
          targetListener.addEventListener('click', (event) => {
            window.open('https://sass-lang.com/documentation/', '_blank')
          })
          infoBalloonImage.setAttribute('src', './src/assets/vectors/Sass_Logo_Color.svg');
          infoBalloonImage.style.width = '57%'
          infoBalloonTitle.innerHTML = "Sass"
          infoBalloonParagraph.innerHTML = "Sass is a stylesheet language that’s compiled to CSS. It allows you to use variables, nested rules, mixins, functions, and more, all with a fully CSS-compatible syntax."
          infoBalloonContainer.classList.add('active');
          logo.addEventListener('mouseleave', (event) => {
            const target = event.target.id;
            if (target === null || target === undefined) {
              console.error('No logo element')
            }
            infoBalloonContainer.classList.remove('active');
          })
          break;
        case 'javascript-logo':
          targetListener.addEventListener('click', (event) => {
            window.open('https://developer.mozilla.org/en-US/docs/Web/JavaScript', '_blank')
          })
          infoBalloonImage.setAttribute('src', './src/assets/png/JavaScript-logo.png');
          infoBalloonImage.style.width = '52%'
          infoBalloonTitle.innerHTML = "JavaScript"
          infoBalloonParagraph.innerHTML = "JavaScript (JS) is a lightweight interpreted (or just-in-time compiled) programming language with first-class functions. While it is most well-known as the scripting language for Web pages."
          infoBalloonContainer.classList.add('active');
          logo.addEventListener('mouseleave', (event) => {
            const target = event.target.id;
            if (target === null || target === undefined) {
              console.error('No logo element')
            }
            infoBalloonContainer.classList.remove('active');
          })
          break;
        case 'webcomp-logo':
          targetListener.addEventListener('click', (event) => {
            window.open('https://www.webcomponents.org/introduction', '_blank')
          })
          infoBalloonImage.setAttribute('src', './src/assets/vectors/webcomp.svg');
          infoBalloonImage.style.width = '57%'
          infoBalloonTitle.innerHTML = "Web Components"
          infoBalloonParagraph.innerHTML = "Web components are a set of web platform APIs that allow you to create new custom, reusable, encapsulated HTML tags to use in web pages and web apps."
          infoBalloonContainer.classList.add('active');
          logo.addEventListener('mouseleave', (event) => {
            const target = event.target.id;
            if (target === null || target === undefined) {
              console.error('No logo element')
            }
            infoBalloonContainer.classList.remove('active');
          })
          break;
      }
    }
  })
})