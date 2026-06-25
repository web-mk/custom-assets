// ------------------------------------
// INSERTED THE HTML FOR SOCIAL ICONS
// ------------------------------------

const existingSocialIcons = document.querySelector(".cs-f-social-icons");
const facebookLink = existingSocialIcons?.querySelector(".facebook_homepage")?.getAttribute("href");
const instagramLink = existingSocialIcons?.querySelector(".instagram_homepage")?.getAttribute("href");

var socialHTML =
  '<div class="cs-social-icons">' +
  `<a href="${instagramLink}" target="_blank"><img src="/media/images/1372/fWLY13721708.png" alt="Instagram"></a>` +
  `<a href="${facebookLink}" target="_blank"><img src="/media/images/1372/mdqb13721707.png" alt="Facebook"></a>` +
  "</div>";

document
  .querySelector(".site-nav-wrapper")
  .insertAdjacentHTML("afterend", socialHTML);


// --------------------------------------------------
// INSERTED "SEE MORE". BUTTON ALIGN WITH A WRAPPER
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

    // --- Footer row ---
    const footerRow = document.createElement('div');
    footerRow.className = 'events-carousel__footer';

    const controlsGroupBottom = document.createElement('div');
    controlsGroupBottom.className = 'events-carousel__controls';

    const prevBtnBottom = document.createElement('button');
    prevBtnBottom.className = 'events-prev';
    prevBtnBottom.innerHTML = `<svg width="11" height="19" viewBox="0 0 11 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.05912 18.1198L-0.000815788 9.0599L9.05912 -5.76898e-08L10.3789 1.31979L2.63884 9.0599L10.3789 16.8L9.05912 18.1198Z" fill=""/></svg>`;

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
        768: { slidesPerView: 2, spaceBetween: 10 },
        1024: { slidesPerView: 3, spaceBetween: 13 },
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
// CHAI CLUB SECTION
// ------------------------------------

function buildChaiClubSection() {
  const section = document.querySelector('.hp-row:nth-child(4)');
  if (!section) return;

  const title = section.querySelector('.widget_header h5')?.innerText.trim() || 'Join the Chai Club';
  const desc = section.querySelector('.widget_content .bottom_padding')?.innerText.trim() || '';
  const btnEl = section.querySelector('.widget_content .readMore');
  const btnText = btnEl?.innerText.trim() || 'Join the Chai Club';
  const btnHref = btnEl?.getAttribute('href') || '#';

  const wrapper = section.querySelector('.wrapper');
  wrapper.innerHTML = `
    <img class="chai-club__image" src="/media/images/1372/euIQ13729689.jpg" alt="Chai Club">
    <div class="chai-club__body">
      <div class="chai-club__left">
        <h2 class="chai-club__title">${title}</h2>
        <p class="chai-club__desc">${desc}</p>
        <a href="${btnHref}" class="chai-club__btn">${btnText}</a>
      </div>
      <div class="chai-club__right">
        <p class="chai-club__tagline"><em>Small gifts.<br>Big impact.</em></p>
      </div>
    </div>
  `;
}

buildChaiClubSection();



// ------------------------------------
// LETS MEET SECTION
// ------------------------------------

function buildLetsMeetSection() {
  const row = document.querySelector('.hp-table .hp-row:nth-child(5)');
  if (!row) return;

  const title = row.querySelector('.widget_header h5')?.innerText.trim() || "Let's Meet";
  const desc = row.querySelector('.widget_content .bottom_padding')?.innerText.trim() || '';
  const btnEl = row.querySelector('.widget_content .readMore');
  const btnText = btnEl?.innerText.trim() || 'Drop Us a Message';
  const btnHref = btnEl?.getAttribute('href') || '#';

  const wrapper = row.querySelector('.wrapper');
  wrapper.innerHTML = `
    <div class="lets-meet__image">
      <img src="/media/images/1372/mnrW13726981.jpg" alt="Let's Meet">
    </div>
    <div class="lets-meet__content">
      <h2 class="lets-meet__title">${title}</h2>
      <p class="lets-meet__desc">${desc}</p>
      <a href="${btnHref}" class="lets-meet__btn hero-btn hero-btn--solid">${btnText}</a>
    </div>
  `;
}

buildLetsMeetSection();



// ------------------------------------
// SHIFTED THE DESC BELOW HEADING
// ------------------------------------

function buildSubscribeSection() {
  const row = document.querySelector('.hp-row.hp_subscribe');
  if (!row) return;

  const small = row.querySelector('fieldset small');
  const heading = row.querySelector('.widget_header h5');

  if (small && heading) {
    heading.insertAdjacentElement('afterend', small);
  }
}

buildSubscribeSection();



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
