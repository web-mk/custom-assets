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

// Remove Inline Styles for Color and Font-Family
document.querySelectorAll('[style*="font-family"], [style*="color"]').forEach(el => {
  el.style.removeProperty('font-family');
  if (el.style.color) el.style.removeProperty('color');
});