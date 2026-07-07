
/* =================================
   HERO
================================= */

function initHeroSection() {
  const sliderWrapper = document.querySelector('.promo_slider .wrapper');
  if (!sliderWrapper) return;

  const titleEl = document.querySelector('.cycle-caption big') || document.querySelector('.slider big');
  const descEl = document.querySelector('.cycle-caption span') || document.querySelector('.slider span');

  const cmsTitle = titleEl?.innerText.trim() || 'Chabad of Battery Park City';
  const cmsDescription = descEl?.innerText.trim() ||
    'Chabad of Battery Park City is a vibrant Jewish center offering meaningful experiences for individuals and families of all ages.';

  titleEl?.remove();
  descEl?.remove();

  const hero = document.createElement('div');
  hero.className = 'hero-inner';

  hero.innerHTML = `
    <div class="hero-left">
      <h1 class="hero-title">${cmsTitle}</h1>
      <p class="hero-tagline">
        For every Jew. <strong>with love</strong>
        <svg width="48" height="46" viewBox="0 0 48 46" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.2109 0C21.0069 0.0554398 23.4169 0.734495 25.3975 2.79971C27.0497 4.52255 27.3828 5.85236 28.1252 7.99142C27.0506 8.61949 26.4603 9.13783 25.5555 9.97999C25.132 5.62541 22.7575 1.1286 18.2109 0Z" fill="#164E75"/>
            <path d="M36.883 6.9033C39.8459 6.8604 42.5077 8.26784 44.5723 10.2893C50.6894 16.3013 47.635 24.4849 42.3906 29.8861C36.0813 36.3838 28.3202 39.3979 20.0054 42.4833C19.5632 42.6473 19.0957 42.8133 18.733 42.4471C18.6614 42.3733 18.5915 42.2977 18.5234 42.2206C18.8224 42.0307 20.4317 41.4506 20.8446 41.2921C22.0787 40.8211 23.3032 40.325 24.5172 39.8041C31.3829 36.8887 37.9232 32.9473 42.2619 26.6937C46.514 20.5643 46.269 12.5934 39.563 8.40545C38.6927 7.8617 37.7186 7.45044 36.883 6.9033Z" fill="#164E75"/>
            <path d="M14.4328 0.333018C16.5122 0.315528 18.3243 0.522437 20.1524 1.60261C23.4221 3.5345 24.9133 7.43649 24.9409 11.1151C24.942 11.3116 24.9397 11.508 24.9339 11.7044C25.9152 10.5864 26.9055 9.43769 28.2405 8.72266C29.1058 7.95071 31.5911 7.35663 32.7706 7.23387C33.9593 6.84868 36.9279 7.68432 38.0596 8.30232C40.5589 9.59773 43.1555 12.137 43.9466 14.9096C46.6447 24.3638 37.0277 32.6535 29.576 36.684C26.2394 38.4889 21.4447 40.5036 17.8236 41.7194L16.0326 42.3887C9.20558 36.4303 0.733186 28.2285 0.0394842 18.5803C-0.281301 13.6687 1.36247 8.83098 4.60884 5.13178C7.34372 1.98384 10.3374 0.613517 14.4328 0.333018Z" fill="#164E75"/>
        </svg>          
      </p>
    </div>
    <div class="hero-right">
      <p class="hero-desc">${cmsDescription}</p>
      <div class="hero-actions">
        <a class="hero-btn hero-btn--outline" href="/about">About Us</a>
        <a class="hero-btn hero-btn--solid" href="/support">Support Us</a>
      </div>
    </div>
  `;

  sliderWrapper.insertAdjacentElement('beforebegin', hero);
}

document.addEventListener('DOMContentLoaded', initHeroSection);

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

async function carouselEvents() {

  // --- Fetch events from /upcoming page ---
  async function fetchUpcomingEvents() {
    const cacheKey = 'chabad_upcoming_events';
    const cacheTime = 'chabad_upcoming_events_time';
    const TTL = 5 * 60 * 1000;

    const cachedData = sessionStorage.getItem(cacheKey);
    const cachedTime = sessionStorage.getItem(cacheTime);

    if (cachedData && cachedTime && (Date.now() - parseInt(cachedTime)) < TTL) {
      return JSON.parse(cachedData);
    }

    const res = await fetch('/templates/articlecco_cdo/aid/2840537/jewish/Upcoming.htm');
    const html = await res.text();
    const doc = new DOMParser().parseFromString(html, 'text/html');

    const items = Array.from(doc.querySelectorAll('.article_index_container .item'));

    const events = items.map(item => ({
      imgSrc: item.querySelector('.synopsis_icon img')?.getAttribute('src') || '',
      title:  item.querySelector('.title a')?.innerText?.trim() || item.querySelector('.title a')?.textContent?.trim() || '',
      href:   item.querySelector('.title a')?.getAttribute('href') || '#',
      date:   item.querySelector('.subtitle')?.textContent?.trim() || '',
      desc:   item.querySelector('.synopsis')?.textContent?.trim() || '',
    }));

    sessionStorage.setItem(cacheKey, JSON.stringify(events));
    sessionStorage.setItem(cacheTime, Date.now().toString());

    return events;
  }

  // --- Build the carousel with events array ---
  function buildCarousel(items) {
    const widgetContent = document.querySelector('.widget-4.banner .widget_content.index_format');
    if (!widgetContent) return;

    if (!items.length) return;

    // --- Header row ---
    const headerRow = document.createElement('div');
    headerRow.className = 'events-carousel__header';

    const heading = document.createElement('h2');
    heading.className = 'events-carousel__heading';
    heading.textContent = 'Upcoming Events ';

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
    

    // --- Footer row ---
    const footerRow = document.createElement('div');
    footerRow.className = 'events-carousel__footer';

    const controlsGroupBottom = document.createElement('div');
    controlsGroupBottom.className = 'events-carousel__controls';

    const prevBtnBottom = document.createElement('button');
    prevBtnBottom.className = 'events-prev';
    prevBtnBottom.innerHTML = `<svg width="11" height="19" viewBox="0 0 11 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.31979 0.00133105L10.3797 9.0612L1.31979 18.1211L-5.76898e-08 16.8013L7.74007 9.0612L-7.34353e-07 1.32107L1.31979 0.00133105Z" fill=""/></svg>`;

    const nextBtnBottom = document.createElement('button');
    nextBtnBottom.className = 'events-next';
    nextBtnBottom.innerHTML = `<svg width="11" height="19" viewBox="0 0 11 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.31979 0.00133105L10.3797 9.0612L1.31979 18.1211L-5.76898e-08 16.8013L7.74007 9.0612L-7.34353e-07 1.32107L1.31979 0.00133105Z" fill=""/></svg>`;

    controlsGroupBottom.appendChild(prevBtnBottom);
    controlsGroupBottom.appendChild(nextBtnBottom);
    footerRow.appendChild(controlsGroupBottom);

    // --- Swiper ---
    const swiperRoot = document.createElement('div');
    swiperRoot.className = 'swiper swiper-events';

    const swiperWrapper = document.createElement('div');
    swiperWrapper.className = 'swiper-wrapper';

    items.forEach(({ imgSrc, title, href, date, desc }) => {
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

    // --- Assemble ---
    const container = document.createElement('div');
    container.className = 'events-carousel';
    container.appendChild(headerRow);
    container.appendChild(swiperRoot);
    container.appendChild(footerRow);

    widgetContent.querySelectorAll('.separator').forEach(sep => sep.remove());
    widgetContent.parentNode.replaceChild(container, widgetContent);

    new Swiper('.swiper-events', {
      slidesPerView: 1.1,
      spaceBetween: 10,
      grabCursor: true,
      navigation: {
        nextEl: [nextBtn, nextBtnBottom],
        prevEl: [prevBtn, prevBtnBottom],
      },
      breakpoints: {
        768: { slidesPerView: 2.2, spaceBetween: 10 },
        1024: { slidesPerView: 3.6, spaceBetween: 13 },
      },
    });
  }

  // --- Fallback: read from existing CMS banners on the page ---
  function buildFromBanners() {
    const widgetContent = document.querySelector('.widget-4.banner .widget_content.index_format');
    if (!widgetContent) return;

    const items = Array.from(widgetContent.querySelectorAll('.item'));
    if (!items.length) return;

    const events = items.map(item => ({
      imgSrc: item.querySelector('.icon img')?.getAttribute('src') || '',
      title:  item.querySelector('.title a')?.innerText.trim() || '',
      href:   item.querySelector('.title a')?.getAttribute('href') || '#',
      date:   item.querySelector('.readMore')?.innerText.trim() || '',
      desc:   item.querySelector('.subtitle')?.innerText.trim() || '',
    }));

    buildCarousel(events);
  }

  // --- Run ---
  try {
    const events = await fetchUpcomingEvents();
    if (events.length) {
      buildCarousel(events);
    } else {
      buildFromBanners(); // fallback if /upcoming page has no events
    }
  } catch (err) {
    console.warn('Could not fetch /upcoming events, falling back to banners.', err);
    buildFromBanners();
  }
}

carouselEvents();


// ------------------------------------
// MOBILE MENU LOGIC
// ------------------------------------

function initMobileMenu() {
  const menuBtn = document.querySelector('.cs-mobile-menu-open');
  if (!menuBtn) return;

  const icon = menuBtn.querySelector('i');
  if (icon) icon.remove();

  if (!menuBtn.querySelector('.bar')) {
    for (let i = 0; i < 2; i++) {
      const bar = document.createElement('span');
      bar.className = 'bar';
      menuBtn.appendChild(bar);
    }
  }

  const navWrapper = document.querySelector('.site-nav-wrapper');

  // Create overlay
  const overlay = document.createElement('div');
  overlay.className = 'mobile-nav-overlay';
  document.body.appendChild(overlay);

  menuBtn.addEventListener('click', function () {
    menuBtn.classList.toggle('active');
    navWrapper.classList.toggle('is-open');
    document.body.classList.toggle('menu-opened');
    overlay.classList.toggle('is-active');
  });
}

initMobileMenu();



function restructureLegacySection() {
  const wrapper = document.querySelector('.hp-row:nth-child(5) .wrapper');
  if (!wrapper) return;

  const header = wrapper.querySelector('.widget_header');
  const content = wrapper.querySelector('.widget_content.message_format');
  const readMore = content?.querySelector('.readMore');
  if (!header || !content || !readMore) return;

  const textWrap = document.createElement('div');
  textWrap.className = 'legacy-text';
  textWrap.appendChild(header);
  textWrap.appendChild(content);

  wrapper.appendChild(textWrap);
  wrapper.appendChild(readMore);
}

document.addEventListener('DOMContentLoaded', restructureLegacySection);



/**
 * Merges two separate .hp-row widgets ("Join the Chai Club" and "Let's Meet")
 * into a single two-column section.
 * Left card: adds a static badge ("Small gifts. Big impact.") next to the heading.
 * Right card: wraps text in a panel and adds an image container up front
 * (background image needs to be set separately, see CSS placeholder).
 */
function combineChaiAndMeetSection() {
  const allHpRows = document.querySelectorAll('.hp-row');
  const chaiRow = allHpRows[5]; // 6th .hp-row (0-indexed)
  const meetRow = allHpRows[6]; // 7th .hp-row (0-indexed)

  if (!chaiRow || !meetRow) return;

  // Debug check, remove once confirmed working:
  console.log('chaiRow heading:', chaiRow.querySelector('.widget_header h5')?.textContent.trim());
  console.log('meetRow heading:', meetRow.querySelector('.widget_header h5')?.textContent.trim());

  const chaiWrapper = chaiRow.querySelector('.wrapper');
  const meetWrapper = meetRow.querySelector('.wrapper');
  if (!chaiWrapper || !meetWrapper) return;

  chaiWrapper.classList.add('chai-card');
  meetWrapper.classList.add('meet-card');

  // --- Left card: group heading + badge into one row ---
  const chaiHeader = chaiWrapper.querySelector('.widget_header');
  const topRow = document.createElement('div');
  topRow.className = 'chai-top-row';

  const badge = document.createElement('div');
  badge.className = 'chai-badge';
  badge.innerHTML = 'Small gifts.<br>Big impact.';

  chaiHeader.insertAdjacentElement('beforebegin', topRow);
  topRow.appendChild(chaiHeader);
  topRow.appendChild(badge);

  // --- Right card: add image block + wrap text content in a panel ---
  const meetHeader = meetWrapper.querySelector('.widget_header');
  const meetContent = meetWrapper.querySelector('.widget_content.message_format');

  const meetImage = document.createElement('div');
  meetImage.className = 'meet-image';
  // Hardcoded, not CMS-editable, replace URL with the actual asset before shipping
  meetImage.style.backgroundImage = 'url("https://w2.chabad.org/media/images/1376/juJJ13765114.jpg")';

  const meetText = document.createElement('div');
  meetText.className = 'meet-text';
  meetText.appendChild(meetHeader);
  meetText.appendChild(meetContent);

  meetWrapper.appendChild(meetImage);
  meetWrapper.appendChild(meetText);
  meetWrapper.insertBefore(meetImage, meetText);

  // --- Combine both cards into one section ---
  const section = document.createElement('div');
  section.className = 'chai-meet-section';
  section.appendChild(chaiWrapper);
  section.appendChild(meetWrapper);

  chaiRow.replaceWith(section);
  meetRow.remove();
}

document.addEventListener('DOMContentLoaded', combineChaiAndMeetSection);


// Remove Inline Styles for Color and Font-Family
document.querySelectorAll('[style*="font-family"], [style*="color"]').forEach(el => {
  el.style.removeProperty('font-family');
  if (el.style.color) el.style.removeProperty('color');
});

// Remove Empty Div inside Inner pages heros
document.querySelectorAll('header.article-header div').forEach(div => {
  if (div.innerHTML.trim() === '') {
    div.style.display = 'none';
  }
});

const addCredit = () => {
  const credit = document.createElement('p');
  credit.id = 'd-and-d';
  credit.innerHTML = 'Design+Development: <a href="mailto:mk@webmk.co">WebMK</a>';
  document.querySelector('.footer_container').appendChild(credit);
}

addCredit();

/* ------------- FILE LAST UPDATED JULY 8, 2026 ------------- */