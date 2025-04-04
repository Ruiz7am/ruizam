let cards = [
  {
    title: "Last Blog Entries' Carousel",
    tags: ["javascript", "html", "css", "sass", "web-components"],
    content: `<p>In this post, I write a last blog posts carousel, is responsive, autoplay and pause at hover or touch it</p><p>This carousel is not mine, i took the code from <a href="https://medium.com/web-dev-survey-from-kyoto/vanilla-js-carousel-that-is-accessible-swipeable-infinite-scrolling-and-autoplaying-5de5f281ef13">this other post</a>, (excellent code by the way), and adjust it to my necesities, without mention that I study the code while adopt it`,
  },
  {
    title: "First steps, this is my blog",
    tags: ["javascript", "html", "css", "sass", "web-components"],
    content: "<p>I recently start a Frontend developer Roadmap online, after a four months, finally I start my own personal site!</p><p>My stack: VanillaJS, HTML, CSS, Sass and Web Component Structure</p><p>My first component is a Dark-Light Toggle button. Check it out at the right superior corner of your desktop/tablet screen or left inferior corner of your mobile screen.</p>",
  },
]

    // Esta función obtiene las cards del array de configuración llamado cards y los ubica como elementos del shadow DOM del componente

function getCards(){
  const cardElements = [];
  let counter = 0;
  for (let i = 0; i < cards.length; i++){
    let title = cards[i].title;
    let tags = cards[i].tags;
    let content = cards[i].content;
    counter++;
    // Esta función obtiene los tags del array llamado tags.
    function getTags(){
      return tags.map(tag => `<span class="tag ${tag}"># ${tag}</span>`).join('');
    }
    
    let card = `
      <div class="carrousel-card" role="group" aria-label="${counter} de ${cards.length}" aria-roledescription="card">
        <h2 class="carrousel-card-title">${title}</h2>
        <div class="carrousel-card-tags-banner-wrapper">
          <div class="carrousel-card-tags">
            ${getTags()}
          </div>
        </div>
        <div class="carrousel-card-content">
          ${content}
        </div>
      </div>
    `
    cardElements.push(card);
  };

  let output;
  cardElements.forEach(element => {
    if(output === null || output === undefined){
      output = element;
    } else {
      output = output + element
    }
  });
  return output;
}

// Esta función crea los puntos de navegación dependiendo del numero de cards.
function getDots () {
  let dot;
  let output;
  let counter = 0;
  cards.forEach(element => {
    counter++;
    dot = `
      <button class="nav-dot" type="button" aria-disabled="false" aria-label="${counter} de ${cards.length}"></button>
    `
    if (output === null || output === undefined) {
      output = dot;
    } else {
      output = output + dot;
    }
  })
  return output;
}