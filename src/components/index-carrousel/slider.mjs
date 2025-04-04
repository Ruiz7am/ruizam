/**
 * Módulo de slider – Reproducción en cadena sin solapamientos con navdots
 */

// Seleccionamos el componente y extraemos parámetros desde atributos
const indexCarrousel = document.querySelector('index-carrousel');
const scrollDuration = Number(indexCarrousel.getAttribute('data-scroll-duration')) || 5000;  // Duración de la animación
const pauseDuration  = Number(indexCarrousel.getAttribute('data-pause-duration'))  || 7000;  // Tiempo de pausa entre slides

// Elementos internos del shadow DOM
const carrouselContainer = indexCarrousel.shadowRoot.querySelector('.carrousel');
const slideWrapper       = indexCarrousel.shadowRoot.querySelector('.carrousel-cards');

function initSlider() {
  const slot = indexCarrousel.shadowRooot.querySelector('slot');
  const slides = slot.assignedElements().filter(el => el.classList.contains('carrousel-card'));
  if(slides.length === 0) {
    console.warn("No se encontraron slides dentro del slot")
    return;
  }
}

const navdots            = indexCarrousel.shadowRoot.querySelectorAll('.carrousel-navdots button');

// Parámetros del carrusel
const numberOfSlides       = slides.length;         // Número de slides reales
const numberOfSlidesCloned = 1;                     // Clonamos uno al inicio y otro al final
let slideWidth = slides[0].offsetWidth;             // Ancho de cada slide
let spaceBtwSlides = Number(window.getComputedStyle(slideWrapper)
  .getPropertyValue('column-gap').slice(0, -2));

// Función para determinar el slide actual (ajustando por el clon inicial)
function indexSlideCurrent() {
  return Math.round(slideWrapper.scrollLeft / (slideWidth + spaceBtwSlides)) - numberOfSlidesCloned;
}

// Función de animación suave con callback al finalizar
function smoothScrollTo(element, target, duration, callback) {
  const start = element.scrollLeft;
  const change = target - start;
  const startTime = performance.now();

  function animateScroll(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    element.scrollLeft = start + change * progress;
    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    } else {
      if (callback) callback();
    }
  }
  requestAnimationFrame(animateScroll);
}

// Función para ir a un slide determinado
function goto(index, callback) {
  const x = (slideWidth + spaceBtwSlides) * (index + numberOfSlidesCloned);
  smoothScrollTo(slideWrapper, x, scrollDuration, callback);
}

// --- Configuración para scroll infinito: agregar clones ---
const firstSlideClone = slides[0].cloneNode(true);
firstSlideClone.setAttribute('aria-hidden', 'true');
slideWrapper.append(firstSlideClone);

const lastSlideClone = slides[numberOfSlides - 1].cloneNode(true);
lastSlideClone.setAttribute('aria-hidden', 'true');
slideWrapper.prepend(lastSlideClone);

// Funciones para reposicionar instantáneamente (salto sin animación)
function rewind(callback) {
  slideWrapper.classList.remove('smooth-scroll');
  slideWrapper.scrollTo((slideWidth + spaceBtwSlides) * numberOfSlidesCloned, 0);
  slideWrapper.classList.add('smooth-scroll');
  if (callback) callback();
}

function forward(callback) {
  slideWrapper.classList.remove('smooth-scroll');
  slideWrapper.scrollTo((slideWidth + spaceBtwSlides) * (numberOfSlides - 1 + numberOfSlidesCloned), 0);
  slideWrapper.classList.add('smooth-scroll');
  if (callback) callback();
}

// --- Funcionalidad de los navdots ---

// Actualiza visualmente los navdots según el slide activo
function updateNavDots() {
  navdots.forEach(dot => dot.classList.remove('is-active'));
  const current = indexSlideCurrent();
  if (current >= 0 && current < numberOfSlides) {
    navdots[current].classList.add('is-active');
  }
}

// Configurar el evento click para cada navdot
navdots.forEach((dot, idx) => {
  dot.addEventListener('click', () => {
    stop(); // Detenemos el autoslide (opcional) al hacer click
    goto(idx, () => {
      updateNavDots();
    });
  });
});

// --- Reproducción automática en cadena (autoslide) ---

// Variables para controlar la reproducción
let isPlaying = false;
let chainTimeout = null;

// Función que avanza al siguiente slide y, una vez terminada la animación,
// programa la siguiente transición tras pauseDuration
function next() {
  if (!isPlaying) return;
  
  const currentIndex = indexSlideCurrent();
  const targetIndex = currentIndex + 1;
  
  goto(targetIndex, () => {
    // Si hemos alcanzado el clon final, reposicionamos al primer slide real
    if (indexSlideCurrent() >= numberOfSlides) {
      rewind(() => {});
    }
    updateNavDots();
    chainTimeout = setTimeout(() => {
      next();
    }, pauseDuration);
  });
}

// Inicia la cadena de reproducción
function play() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (isPlaying) return;
  isPlaying = true;
  next();
}

// Detiene la cadena de reproducción
function stop() {
  isPlaying = false;
  if (chainTimeout) {
    clearTimeout(chainTimeout);
  }
}

// Exportamos las funciones para control externo
export { initSlider, play, stop };
