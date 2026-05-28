// ------------------------------------
// INSERTED THE HTML FOR SOCIAL ICONS
// ------------------------------------

var socialHTML =
  '<div class="cs-social-icons">' +
  '<a href="#" target="_blank"><img src="media/images/1372/fWLY13721708.png" alt="Instagram"></a>' +
  '<a href="#" target="_blank"><img src="media/images/1372/mdqb13721707.png" alt="Facebook"></a>' +
  "</div>";

document
  .querySelector(".site-nav-wrapper")
  .insertAdjacentHTML("afterend", socialHTML);


// --------------------------------------------------
// INSERTED "SEE MORE". BUTTON ALOGN WITH A WRAPPER
// --------------------------------------------------

var sneakHeader = document.querySelector(".sneak-peek-container .header-title");
if (sneakHeader) {
  var seeMoreBtn =
    '<a href="/programs" class="sneak-peek-see-more">See More</a>';
  var wrapper = document.createElement("div");
  wrapper.className = "sneak-peek-header";
  sneakHeader.parentNode.insertBefore(wrapper, sneakHeader);
  wrapper.appendChild(sneakHeader);
  wrapper.insertAdjacentHTML("beforeend", seeMoreBtn);
}

/* =================================
   HERO
================================= */

function updateHeroSection() {
  const sliderWrapper = document.querySelector('.promo_slider .wrapper');
  if (!sliderWrapper) return;

  const bigEl = document.querySelector('.cycle-caption big') || document.querySelector('.slider big');
  const spanEl = document.querySelector('.cycle-caption span') || document.querySelector('.slider span');

  const cmsTitle = bigEl?.innerText.trim() || 'Chabad of Burbank';
  if (bigEl) bigEl.remove();
  const cmsSubtitle = spanEl?.innerText.trim() || 'A home for Jewish life in Burbank.';

  const heroHTML = `
    <div class="hero-inner">
      <div class="hero-left">
        <h1 class="hero-title">${cmsTitle}</h1>
        <p class="hero-subtitle">${cmsSubtitle}</p>
      </div>
      <div class="hero-right">
        <a class="hero-btn hero-btn--outline" href="/about">About Us</a>
        <a class="hero-btn hero-btn--solid" href="/support">Support Us</a>
      </div>
    </div>
  `;

  sliderWrapper.insertAdjacentHTML('beforebegin', heroHTML);
}
updateHeroSection();

/* =================================
   SNEAK PEEK GRID WRAP
================================= */
function wrapSneakItems() {
  const container = document.querySelector(".sneak-peek-container");
  if (!container) return;

  const items = Array.from(container.querySelectorAll(".sneak-peek-item"));

  if (!items.length) return;

  const grid = document.createElement("div");
  grid.className = "flexbox-grid";

  container.insertBefore(grid, items[0]);
  items.forEach((item) => grid.appendChild(item));

  container.querySelectorAll(".clear").forEach((el) => el.remove());
}

wrapSneakItems();


// ------------------------------------
// restructureSneakCards
// ------------------------------------

function restructureSneakCards() {
  const items = document.querySelectorAll(".sneak-peek-item");
  if (!items.length) return;

  items.forEach((item) => {
    const titleEl = item.querySelector("h6.title_only a");
    const thumbEl = item.querySelector("a.thumbnail img");

    // Skip empty cards
    if (!titleEl || !titleEl.innerText.trim()) {
      item.remove();
      return;
    }

    const title = titleEl.innerText.trim();
    const href = titleEl.getAttribute("href") || "#";
    const bgImage = thumbEl ? thumbEl.style.backgroundImage : "";
    const imgUrl = bgImage.replace(/url\(["']?/, "").replace(/["']?\)/, "");

    item.innerHTML = `
      <a href="${href}" class="sneak-card">
      <img class="sneak-card__img" src="${imgUrl}" alt="${title}">
      <h3 class="sneak-card__title">${title}</h3>
      </a>
    `;
  });
}

restructureSneakCards();


// ------------------------------------
// EVENTS CAROUSEL CARDS
// ------------------------------------

function carouselEvents() {
  const widgetContent = document.querySelector('.widget-4.banner .widget_content.index_format');
  if (!widgetContent) return;

  const items = Array.from(widgetContent.querySelectorAll('.item'));
  if (!items.length) return;

  widgetContent.querySelectorAll('.separator').forEach((sep) => sep.remove());

  const headerRow = document.createElement('div');
  headerRow.className = 'events-carousel__header';

  const heading = document.createElement('h2');
  heading.className = 'events-carousel__heading';
  heading.textContent = 'Upcoming Programs';

  const controlsGroup = document.createElement('div');
  controlsGroup.className = 'events-carousel__controls';

  const prevBtn = document.createElement('button');
  prevBtn.className = 'events-prev';
  prevBtn.innerHTML = `<svg width="11" height="19" viewBox="0 0 11 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.05912 18.1198L-0.000815788 9.0599L9.05912 -5.76898e-08L10.3789 1.31979L2.63884 9.0599L10.3789 16.8L9.05912 18.1198Z" fill=""/></svg>`;

  const nextBtn = document.createElement('button');
  nextBtn.className = 'events-next';
  nextBtn.innerHTML = `<svg width="11" height="19" viewBox="0 0 11 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.31979 0.00133105L10.3797 9.0612L1.31979 18.1211L-5.76898e-08 16.8013L7.74007 9.0612L-7.34353e-07 1.32107L1.31979 0.00133105Z" fill=""/></svg>`;

  controlsGroup.appendChild(prevBtn);
  controlsGroup.appendChild(nextBtn);
  headerRow.appendChild(heading);
  headerRow.appendChild(controlsGroup);

  const swiperRoot = document.createElement('div');
  swiperRoot.className = 'swiper swiper-events';

  const swiperWrapper = document.createElement('div');
  swiperWrapper.className = 'swiper-wrapper';

  items.forEach((item) => {
    const imgSrc = item.querySelector('.icon img')?.getAttribute('src') || '';
    const titleEl = item.querySelector('.title a');
    const title = titleEl?.innerText.trim() || '';
    const href = titleEl?.getAttribute('href') || '#';
    const date = item.querySelector('.readMore')?.innerText.trim() || '';
    const desc = item.querySelector('.subtitle')?.innerText.trim() || '';

    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    slide.innerHTML = `
      <a href="${href}" class="event-card">
        <div class="event-card__img">
          <img src="${imgSrc}" alt="${title}">
        </div>
        <div class="event-card__body">
          <span class="event-card__date">${date}</span>
          <h3 class="event-card__title">${title}</h3>
          <p class="event-card__desc">${desc}</p>
        </div>
      </a>
    `;

    swiperWrapper.appendChild(slide);
  });

  swiperRoot.appendChild(swiperWrapper);

  const container = document.createElement('div');
  container.className = 'events-carousel';
  container.appendChild(headerRow);
  container.appendChild(swiperRoot);

  widgetContent.parentNode.replaceChild(container, widgetContent);


  new Swiper('.swiper-events', {
    slidesPerView: 1.1,
    spaceBetween: 24,
    grabCursor: true,
    navigation: {
      nextEl: nextBtn,
      prevEl: prevBtn,
    },
    breakpoints: {
      768: { slidesPerView: 2, spaceBetween: 10 },
      1024: { slidesPerView: 3, spaceBetween: 10 },
      1024: { slidesPerView: 3, spaceBetween: 13 },
    },
  });
}

carouselEvents();


// Remove Inline Styles for Color and Font-Family
document.querySelectorAll('[style*="font-family"], [style*="color"]').forEach(el => {
  el.style.removeProperty('font-family');
  if (el.style.color) el.style.removeProperty('color');
});