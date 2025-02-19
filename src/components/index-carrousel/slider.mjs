// debugger;
// Constantes
const indexCarrousel = document.querySelector('index-carrousel')
const carrouselContainer = indexCarrousel.shadowRoot.querySelector('.carrousel');
const slideWrapper = indexCarrousel.shadowRoot.querySelector('.carrousel-cards')
const slides = indexCarrousel.shadowRoot.querySelectorAll('.carrousel-card');
const navdotWrapper = indexCarrousel.shadowRoot.querySelector('.carrousel-navdots');
const navdots = indexCarrousel.shadowRoot.querySelectorAll('.carrousel-navdots button');
/* console.log(`
  Se declararon las constantes:
  indexCarrousel: ${indexCarrousel}
  carrouselContainer: ${carrouselContainer}
  slideWrapper: ${slideWrapper}
  slides: ${slides}
  navdotWrapper: ${navdotWrapper}
  navdots: ${navdots}
`) */
// Parametros
const numberOfSlides = slides.length;
const numberOfSlidesCloned = 1;
let slideWidth = slides[0].offsetWidth;
let spaceBtwSlides = Number(window.getComputedStyle(slideWrapper).getPropertyValue('column-gap').slice(0, -2)); // agregando px al final
/* console.log(`
    Se declararon las variables con los parametros:
    numberOfSlides: ${numberOfSlides}
    numberOfSlidesCloned: ${numberOfSlidesCloned}
    slideWidth: ${slideWidth}
    spaceBtwSlides: ${spaceBtwSlides}
  `) */
function indexSlideCurrent() {
  let currentSlide = Math.round(slideWrapper.scrollLeft / (slideWidth + spaceBtwSlides) - numberOfSlidesCloned);
  /* console.log(`
      El slide actual es: ${currentSlide}
    `) */
  return currentSlide
}

// Manejador de navdot click
function goto(index){
  let x = (slideWidth + spaceBtwSlides) * (index + numberOfSlidesCloned)
  // console.log(`eje x es: ${x}`)
  slideWrapper.scrollTo(x, 0);
}
for (let i = 0; i < numberOfSlides; i++) {
  /* console.log(`
      El navdot es: ${navdots[i]}
    `) */
  navdots[i].addEventListener("click", () => goto(i));
}

// Marking nav dots
function markNavDot (index) {
  navdots[index].classList.add('is-active');
  navdots[index].setAttribute('aria-disabled', 'true')
}

function updateNavdot(){
  const c = indexSlideCurrent();
  if (c < 0 || c >= numberOfSlides) return; // en estos casos, forward() y rewind() serán ejecutados pronto.
  // console.log(`actualizando navdot a: ${c}`)
  markNavDot(c);
}

let scrollTimer;
slideWrapper.addEventListener('scroll', () => {
  //reset
  navdots.forEach(navdot => {
    navdot.classList.remove('is-active');
    navdot.setAttribute('aria-disabled', 'false');
  });
  // handle infinite scrolling
  if (scrollTimer) clearTimeout(scrollTimer); // para cancelar si el scroll continua
  scrollTimer = setTimeout(() => {
    if (slideWrapper.scrollLeft < (slideWidth + spaceBtwSlides) * (numberOfSlidesCloned - 1/2)){
      forward();
    }
    if (slideWrapper.scrollLeft > (slideWidth + spaceBtwSlides) * ((numberOfSlides - 1 + numberOfSlidesCloned) + 1/2)){
      rewind();
    }
  }, 100);

  // marcando el navdot
  updateNavdot();
});

// Manejando el tamaño de la ventana
let resizeTimer;
window.addEventListener('resize', () => {
  slideWidth = slides[0].offsetWidth;
  spaceBtwSlides = Number(window.getComputedStyle(slideWrapper).getPropertyValue('grid-column-gap').slice(0, -2));
  if(resizeTimer) clearTimeout(resizeTimer);
  stop();
  resizeTimer = setTimeout(() =>{
    play();
  }, 400);
});

// Scroll infinito
const firstSlideClone = slides[0].cloneNode(true);
firstSlideClone.setAttribute('aria-hidden', 'true');
slideWrapper.append(firstSlideClone);

const lastSlideClone = slides[numberOfSlides - 1].cloneNode(true);
lastSlideClone.setAttribute('aria-hidden', 'true');
slideWrapper.prepend(lastSlideClone);

function rewind(){
    slideWrapper.classList.remove('smooth-scroll');
    setTimeout(() => {
      slideWrapper.scrollTo((slideWidth + spaceBtwSlides) * numberOfSlidesCloned, 0);
      slideWrapper.classList.add('smooth-scroll');
    }, 100);
}

function forward(){
  slideWrapper.classList.remove('smooth-scroll');
  setTimeout(() => {
    slideWrapper.scrollTo((slideWidth + spaceBtwSlides) * (numberOfSlides - 1 + numberOfSlidesCloned), 0);
    slideWrapper.classList.add('smooth-scroll');
  }, 100);
};

// Autoplay
function next(){
  goto(indexSlideCurrent() + 1);
}
const pause = 2500;
let itv;
function play(){
  // retorno prematuro si el usuario prefiere reducir el movimiento
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }
  clearInterval(itv);
  slideWrapper.setAttribute('aria-live', 'off');
  itv = setInterval(next, pause);
}
function stop(){
  clearInterval(itv);
  slideWrapper.setAttribute('aria-live', 'polite');
}
const observer = new IntersectionObserver(callback, {threshold: 0.99});
observer.observe(carrouselContainer);
function callback(entries, observer) {
  entries.forEach((entry) => {
    console.log(`entry.intersectionRatio: ${entry.intersectionRatio}`);
    if (entry.isIntersecting) {
      console.log(`entry.isIntersecting is true.`)
      play();
    } else {
      console.log(`entry.isIntersecting is false.`)
      stop();
    }
  })
}

// Para el raton
carrouselContainer.addEventListener("pointerenter", () => stop());
carrouselContainer.addEventListener("pointerleave", () => play());
// Para el teclado
carrouselContainer.addEventListener("focus", () => stop(), true);
carrouselContainer.addEventListener("blur", () => {
  if(carrouselContainer.matches(":hover")) return;
  play();
}, true);
// para dispositivos touch
carrouselContainer.addEventListener("touchstart", () => stop());
// Inicialización
goto(0)
markNavDot(0);
slideWrapper.classList.add('smooth-scroll');