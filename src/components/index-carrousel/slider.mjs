// debugger;
// Constantes
const indexCarrousel = document.querySelector('index-carrousel')
const scrollDuration = Number(indexCarrousel.getAttribute('data-scroll-duration')) || 1500;
const pauseDuration = Number(indexCarrousel.getAttribute('data-pause-duration')) || 10000;
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
  console.group(`indexSlideCurrent function`);
  let currentSlide = Math.round(slideWrapper.scrollLeft / (slideWidth + spaceBtwSlides) - numberOfSlidesCloned);
  console.log(`
      El slide actual es: ${currentSlide}
    `)
  return currentSlide;
  console.groupEnd();
}

// Manejador de navdot click
function goto(index){
  console.group(`goto function`);

  let x = (slideWidth + spaceBtwSlides) * (index + numberOfSlidesCloned)
  console.log(`eje x es: ${x}`)
  // slideWrapper.scrollTo(x, 0);
  smoothScrollTo(slideWrapper, x, scrollDuration);
  console.groupEnd();
}

// Manejador de navdot click
console.group(`navdots loop`);
for (let i = 0; i < numberOfSlides; i++) {
  console.log(`El navdot es: `)
  console.log(navdots[i]);
  navdots[i].addEventListener("click", () => goto(i));
}
console.groupEnd();

//  Slide scroll animation
function smoothScrollTo(element, target, duration) {
  console.group(`smoothScrollTo function`);
  const start = element.scrollLeft;
  console.log(`start: ${start}`)
  const change = target - start;
  console.log(`change: ${change}`)
  const startTime = performance.now();
  console.log(`startTime: ${startTime}`)

  function animateScroll(currentTime) {
    console.group(`animateScroll function`);
    const elapsed = currentTime - startTime;
    console.log(`elapsed: ${elapsed}`)
    // Calcula el progreso (entre 0 y 1)
    const progress = Math.min(elapsed / duration, 1);
    console.log(`progress: ${progress}`)
    // Actualiza la posición del scroll en función del progreso
    element.scrollLeft = start + change * progress;
    console.log(`element.scrollLeft: ${element.scrollLeft}`)
    // Si no se ha completado la animación, continuar
    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
    console.groupEnd();
  }
  requestAnimationFrame(animateScroll);
  console.groupEnd();
}

// Marking nav dots
function markNavDot (index) {
  console.group(`markNavDot function`);
  navdots[index].classList.add('is-active');
  console.log(`navdots[index]: ${navdots[index]}`)
  navdots[index].setAttribute('aria-disabled', 'true')
  console.log(`navdots[index].aria-disabled: ${navdots[index].getAttribute('aria-disabled')}`)
}

function updateNavdot(){
  console.group(`updateNavdot function`);
  const c = indexSlideCurrent();
  console.log(`c: ${c}`)
  if (c < 0 || c >= numberOfSlides) return; // en estos casos, forward() y rewind() serán ejecutados pronto.
  console.log(`actualizando navdot a: ${c}`)
  markNavDot(c);
  console.log(`navdots[c]: ${navdots[c]}`)
  console.groupEnd();
}

console.group(`slideWrapper event listener`);
let scrollTimer;
console.log(`slideWrapper: `)
console.log(slideWrapper);
slideWrapper.addEventListener('scroll', () => {
  //reset
  navdots.forEach(navdot => {
    navdot.classList.remove('is-active');
    console.log(`navdot: ${navdot}`)
    navdot.setAttribute('aria-disabled', 'false');
    console.log(`navdot.aria-disabled: ${navdot.getAttribute('aria-disabled')}`)
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
console.groupEnd();

console.group(`Windows size event listener`);
console.log(`window: `)
console.log(window);
console.log(`window.innerWidth: ${window.innerWidth}`)
console.log(`window.innerHeight: ${window.innerHeight}`)
console.log(`window.outerWidth: ${window.outerWidth}`)
console.log(`window.outerHeight: ${window.outerHeight}`)
console.log(`window.devicePixelRatio: ${window.devicePixelRatio}`)
console.log(`window.visualViewport.width: ${window.visualViewport.width}`)
console.log(`window.visualViewport.height: ${window.visualViewport.height}`)
console.log(`window.visualViewport.scale: ${window.visualViewport.scale}`)
console.log(`window.visualViewport.offsetLeft: ${window.visualViewport.offsetLeft}`)
console.log(`window.visualViewport.offsetTop: ${window.visualViewport.offsetTop}`)
console.log(`window.visualViewport.pageLeft: ${window.visualViewport.pageLeft}`)
console.log(`window.visualViewport.pageTop: ${window.visualViewport.pageTop}`)
console.log(`window.visualViewport.pageScale: ${window.visualViewport.pageScale}`)
console.log(`window.visualViewport.isMobile: ${window.visualViewport.isMobile}`)
console.log(`window.visualViewport.isLandscape: ${window.visualViewport.isLandscape}`)
console.log(`window.visualViewport.isPortrait: ${window.visualViewport.isPortrait}`)
console.log(`window.visualViewport.isZoomed: ${window.visualViewport.isZoomed}`)
console.log(`window.visualViewport.isOverflown: ${window.visualViewport.isOverflown}`)
// Manejando el tamaño de la ventana
let resizeTimer;
window.addEventListener('resize', () => {
  slideWidth = slides[0].offsetWidth;
  console.log(`slideWidth: ${slideWidth}`)
  spaceBtwSlides = Number(window.getComputedStyle(slideWrapper).getPropertyValue('column-gap').slice(0, -2));
  console.log(`spaceBtwSlides: ${spaceBtwSlides}`)
  if(resizeTimer) clearTimeout(resizeTimer);
  stop();
  resizeTimer = setTimeout(() =>{
    play();
  }, 400);
});
console.groupEnd();

console.group('scroll infinito');
// Scroll infinito
const firstSlideClone = slides[0].cloneNode(true);
console.log(`firstSlideClone: ${firstSlideClone}`);
firstSlideClone.setAttribute('aria-hidden', 'true');
console.log(`firstSlideClone.aria-hidden: ${firstSlideClone.getAttribute('aria-hidden')}`)
slideWrapper.append(firstSlideClone);
console.log(`slideWrapper: ${slideWrapper}`);
console.log(`slideWrapper.children: ${slideWrapper.children}`)

const lastSlideClone = slides[numberOfSlides - 1].cloneNode(true);
console.log(`lastSlideClone: ${lastSlideClone}`);
lastSlideClone.setAttribute('aria-hidden', 'true');
console.log(`lastSlideClone.aria-hidden: ${lastSlideClone.getAttribute('aria-hidden')}`);
console.log(`lastSlideClone.classList: ${lastSlideClone.classList}`)
slideWrapper.prepend(lastSlideClone);
console.log(`slideWrapper: ${slideWrapper}`);
console.groupEnd();

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
const pause = 10000; // 10 segundos
let itv;
function play(){
  // retorno prematuro si el usuario prefiere reducir el movimiento
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }
  clearInterval(itv);
  slideWrapper.setAttribute('aria-live', 'off');
  itv = setInterval(next, pauseDuration);
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