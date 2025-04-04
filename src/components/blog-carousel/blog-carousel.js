// /components/blog-carousel.js

class BlogCarousel extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.currentIndex = 0;
    this.interval = null;
    this.posts = [];
    this.autoPlayDelay = 4000; // 4s
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          position: relative;
          top: 10%;
          overflow: hidden;
    box-shadow: 1px 1px 4px 2px rgba(0,0,0,0.35);
        }
        .carousel-container {
          position: relative;
          width: 100%;
        }
        .carousel-track {
          display: flex;
          transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
          will-change: transform;
        }
        .carousel-slide {
          min-width: 100%;
          background-size: cover;
          background-position: center;
          color: white;
          display: flex;
          align-items: flex-end;
          padding: 2rem;
          box-sizing: border-box;
          aspect-ratio: 4 / 3;
          position: relative;
          opacity: 0;
          transform: translateX(20px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .carousel-slide.active {
          opacity: 1;
          transform: translateX(0);
        }
        .card-content {
          background: linear-gradient(to top, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0.3) 100%);
          padding: 1rem;
          border-radius: 8px;
        }
        .cta {
          margin-top: 0.5rem;
          display: inline-block;
          background: #ff4081;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          text-decoration: none;
        }
        .carousel-nav {
          position: absolute;
          top: 50%;
          width: 100%;
          display: flex;
          justify-content: space-between;
          transform: translateY(-50%);
        }
        .carousel-nav button {
          background: rgba(0, 0, 0, 0.5);
          color: white;
          border: none;
          padding: 0.5rem;
          font-size: 1.5rem;
          cursor: pointer;
        }
        .carousel-dots {
          position: absolute;
          bottom: 1rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 0.5rem;
        }
        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #fff;
          opacity: 0.5;
          border: none;
          cursor: pointer;
        }
        .dot.active {
          opacity: 1;
          background: #ff4081;
        }
          .slide-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          aspect-ratio: 4 / 3;
          z-index: -1;
        }
        @keyframes shimmer {
          0% {
            background-position: -100% 0;
          }
          100% {
            background-position: 100% 0;
          }
        }

        .shimmer-slide {
          position: relative;
          overflow: hidden;
        }

        .shimmer-image {
          height: 300px;
          width: 100%;
          border-radius: 12px 12px 0 0;
          background: linear-gradient(90deg, #333 25%, #444 50%, #333 75%);
          background-size: 200% 100%;
          animation: shimmer 1.2s infinite;
        }

        .shimmer-content {
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .shimmer-line {
          height: 12px;
          background: linear-gradient(90deg, #444 25%, #555 50%, #444 75%);
          background-size: 200% 100%;
          animation: shimmer 1.2s infinite;
          border-radius: 4px;
        }

        .shimmer-line.short {
          width: 60%;
        }

        .shimmer-line.cta {
          width: 40%;
          height: 20px;
          margin-top: 0.5rem;
        }
        @media (hover: hover) {
          .cta:hover {
            background: #e91e63;
            transform: scale(1.05);
            transition: transform 0.2s ease, background 0.2s ease;
          }
        @media (min-width: 768px) {
          :host {
            width: 100%;
            max-width: 100%;
            padding: 1rem;
            border-radius: none;
          }

          .carousel-slide {
            aspect-ratio: 16 / 9;
          }

          .card-content {
            padding: 2rem;
          }

          .cta {
            font-size: 1rem;
            padding: 0.75rem 1.5rem;
          }
          .slide-image {
            border-radius: none;
          }
        }

        }
      </style>
      <div class="carousel-container" role="region" aria-label="Carrusel de posts destacados">
        <div class="carousel-track"></div>
        <div class="carousel-nav">
          <button class="prev" aria-label="Post anterior" tabindex="0">⟨</button>
          <button class="next" aria-label="Post siguiente" tabindex="0">⟩</button>
        </div>
        <div class="carousel-dots"></div>
      </div>
    `;

    this.track = this.shadowRoot.querySelector('.carousel-track');
    this.renderShimmer();
    this.fetchPosts();

    this.dotsContainer = this.shadowRoot.querySelector('.carousel-dots');

    this.shadowRoot.querySelector('.prev').addEventListener('click', () => this.prev());
    this.shadowRoot.querySelector('.next').addEventListener('click', () => this.next());

    this.fetchPosts();

    this.shadowRoot.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowLeft':
          this.prev();
          break;
        case 'ArrowRight':
          this.next();
          break;
        case 'Enter':
        case ' ':
          if (document.activeElement.classList.contains('dot')) {
            const index = [...this.dotsContainer.children].indexOf(document.activeElement);
            if (index >= 0) this.goTo(index);
          }
          break;
      }
    });
    
  }

  async fetchPosts() {
    // Simula 5 posts (cambia esto por fetch real del CMS luego)
    this.posts = Array.from({ length: 5 }, (_, i) => ({
      title: `Post ${i + 1}`,
      excerpt: 'Este es un resumen chingón del post para que te piques.',
      image: `https://picsum.photos/800/400?random=${i + 1}`,
      link: '#'
    }));

    this.renderSlides();
    this.startAutoPlay();
    this.setupSwipe();
  }

  renderSlides() {
    this.track.innerHTML = '';
    this.dotsContainer.innerHTML = '';

    this.posts.forEach((post, index) => {
      const slide = document.createElement('div');
      slide.className = 'carousel-slide';
      slide.innerHTML = `
      <img src="${post.image}" alt="${post.title}" loading="lazy" class="slide-image" />
      <div class="card-content">
        <h2>${post.title}</h2>
        <p>${post.excerpt}</p>
        <a href="${post.link}" class="cta">Leer más</a>
      </div>
`;

      ;
      slide.addEventListener('mouseenter', () => this.pauseAutoPlay());
      slide.addEventListener('mouseleave', () => this.startAutoPlay());

      this.track.appendChild(slide);

      const dot = document.createElement('button');
      dot.className = 'dot';
      dot.setAttribute('aria-label', `Ir al post ${index + 1}`);
      dot.setAttribute('tabindex', '0');

      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => this.goTo(index));
      this.dotsContainer.appendChild(dot);
    });

    this.updateSlide();
  }

  updateSlide() {
    const slides = this.track.children;
    const total = slides.length;
    const offset = this.currentIndex % total;
    this.track.style.transform = `translateX(-${offset * 100}%)`;

    this.dotsContainer.querySelectorAll('.dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === offset);
    });

    Array.from(slides).forEach((slide, i) => {
    slide.classList.toggle('active', i === offset);
  });
  }

  next() {
    this.currentIndex++;
    this.updateSlide();
  }

  prev() {
    this.currentIndex--;
    if (this.currentIndex < 0) this.currentIndex = this.posts.length - 1;
    this.updateSlide();
  }

  goTo(index) {
    this.currentIndex = index;
    this.updateSlide();
  }

  startAutoPlay() {
    this.pauseAutoPlay();
    this.interval = setInterval(() => this.next(), this.autoPlayDelay);
  }

  pauseAutoPlay() {
    clearInterval(this.interval);
  }

  setupSwipe() {
    let startX = 0;
    let dist = 0;

    this.track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });

    this.track.addEventListener('touchmove', (e) => {
      dist = e.touches[0].clientX - startX;
    });

    this.track.addEventListener('touchend', () => {
      if (dist > 50) this.prev();
      else if (dist < -50) this.next();
      dist = 0;
    });
  }

  renderShimmer() {
    this.track.innerHTML = '';
    for (let i = 0; i < 2; i++) {
      const shimmer = document.createElement('div');
      shimmer.className = 'carousel-slide shimmer-slide';
      shimmer.innerHTML = `
        <div class="shimmer-image"></div>
        <div class="card-content shimmer-content">
          <div class="shimmer-line short"></div>
          <div class="shimmer-line"></div>
          <div class="shimmer-line cta"></div>
        </div>
      `;
      this.track.appendChild(shimmer);
    }
  }
  
  disconnectedCallback() {
    this.pauseAutoPlay(); // Limpia el intervalo si el componente se desmonta
  }
  
}

customElements.define('blog-carousel', BlogCarousel);
