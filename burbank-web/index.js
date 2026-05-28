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


  // Menu hamburger JS
const menuHamburger = () => {
  const menuBtn = document.querySelector(".cs-mobile-menu-open");
  if (!menuBtn) return;

  const icon = menuBtn.querySelector("i");
  if (icon) icon.remove();

  // Inject bars only once
  if (!menuBtn.querySelector(".bar")) {
    for (let i = 0; i < 3; i++) {
      const bar = document.createElement("span");
      bar.className = "bar";
      menuBtn.appendChild(bar);
    }
  }

  menuBtn.addEventListener("click", function () {
    menuBtn.classList.toggle("active");

    setTimeout(() => {
      if (menuBtn.classList.contains("active")) {
        document.body.classList.add("menu-open");
      } else {
        document.body.classList.remove("menu-open");
      }
    }, 0);
  });
};


const addCredit = () => {
  const credit = document.createElement('span');
  credit.id = 'd-and-d';
  credit.style.display = 'block';
  credit.innerHTML = 'Design+Development: <a href="mailto:mk@webmk.co">WebMK</a>';
  document.querySelector('.footer_powered').appendChild(credit);
}

/* =================================
   HERO
================================= */

function updateHeroSection() {
  const slider = document.querySelector('.slider');
  if (!slider) return;

  const cmsTitle = document.querySelector('.slider h1')?.innerText || 'Chabad of Burbank';
  const cmsSubtitle = document.querySelector('.slider p')?.innerText || 'A home for Jewish life in Burbank.';

  slider.innerHTML = `
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

/* =================================
   SWIPER EVENTS CAROUSEL
================================= */
function carouselEvent() {
  const widgetContent = document.querySelector(".widget_content.index_format");
  if (!widgetContent) return;

  const items = Array.from(widgetContent.querySelectorAll(".item"));
  widgetContent.querySelectorAll(".separator").forEach((sep) => sep.remove());

  const carouselContainer = document.createElement("div");
  carouselContainer.className = "carousel_container";

  const swiperRoot = document.createElement("div");
  swiperRoot.className = "swiper swiper-events";

  /* ======================
        HEADER
  ====================== */

  const headerRow = document.createElement("div");
  headerRow.className = "carousel_header";

  const heading = document.createElement("div");
  heading.className = "carousel_heading";
  heading.innerHTML = `
    Register for 
    <span class="bold highlighted">Upcoming</span> 
    <span class="bold">Programs</span>
  `;

  const controlsGroup = document.createElement("div");
  controlsGroup.className = "controls_group";

  const prevBtn = document.createElement("button");
  prevBtn.className = "swiper-prev";
  prevBtn.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 16 16">
      <path d="M16 9H3.83L8 13.18V16L0 8L8 0V2.82L3.83 7H16V9Z" fill="currentColor"/>
    </svg>
  `;

  const nextBtn = document.createElement("button");
  nextBtn.className = "swiper-next";
  nextBtn.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 16 16" style="transform: rotate(180deg);">
      <path d="M16 9H3.83L8 13.18V16L0 8L8 0V2.82L3.83 7H16V9Z" fill="currentColor"/>
    </svg>
  `;

  const slideText = document.createElement("span");
  slideText.className = "slide_text";
  slideText.textContent = "Slide Next";

  controlsGroup.appendChild(prevBtn);
  controlsGroup.appendChild(nextBtn);
  controlsGroup.appendChild(slideText);

  headerRow.appendChild(heading);
  headerRow.appendChild(controlsGroup);

  /* ======================
        SLIDES
  ====================== */

  const swiperWrapper = document.createElement("div");
  swiperWrapper.className = "swiper-wrapper";

  items.forEach((item) => {
    item.classList.add("swiper-slide");
    item.style.position = "relative";

    const arrowBox = document.createElement("div");
    arrowBox.className = "card_arrow";
    arrowBox.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 16 16">
        <path d="M4 12L12 4M12 4H6M12 4V10"
              stroke="currentColor"
              stroke-width="2"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"/>
      </svg>
    `;

    item.appendChild(arrowBox);
    swiperWrapper.appendChild(item);
  });

  swiperRoot.appendChild(headerRow);
  swiperRoot.appendChild(swiperWrapper);

  /* ======================
     DUPLICATE CONTROLS BELOW
  ====================== */

  const bottomControls = controlsGroup.cloneNode(true);
  bottomControls.classList.add("controls_group--bottom");

  swiperRoot.appendChild(bottomControls);

  const bottomPrevBtn = bottomControls.querySelector(".swiper-prev");
  const bottomNextBtn = bottomControls.querySelector(".swiper-next");

  carouselContainer.appendChild(swiperRoot);
  widgetContent.parentNode.replaceChild(carouselContainer, widgetContent);

  /* ======================
        INIT SWIPER
  ====================== */

  new Swiper(".swiper-events", {
    slidesPerView: 1.1,
    spaceBetween: 20,
    grabCursor: false,
    navigation: {
      nextEl: [nextBtn, bottomNextBtn],
      prevEl: [prevBtn, bottomPrevBtn],
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    breakpoints: {
      1399: { slidesPerView: 3 },
      575: { slidesPerView: 2 },
      480: { slidesPerView: 1.1, spaceBetween: 30 },
    },
  });
}

// Donate Section
function updateDonateSection() {
  const wrapper = document.querySelector(".hp-row:nth-child(6) .wrapper");
  if (!wrapper) return;

  const widgetHeader = wrapper.querySelector(".widget_header");
  const widgetContent = wrapper.querySelector(".widget_content.message_format");

  if (!widgetHeader || !widgetContent) return;

  const heading = widgetHeader.querySelector("h5");
  if (heading) {
    heading.innerHTML = `
      <span>SUPPORT</span>
      JEWISH LIFE IN FIDI
    `;
  }

  /* ----------------------------
     Create donate_header wrapper
  ----------------------------- */

  const donateHeader = document.createElement("div");
  donateHeader.classList.add("donate_header");

  wrapper.insertBefore(donateHeader, widgetHeader);

  donateHeader.appendChild(widgetHeader);
  donateHeader.appendChild(widgetContent);

  /* ----------------------------
     Create donate_items div
  ----------------------------- */

  const donateItems = document.createElement("div");
  donateItems.classList.add("donate_items");

  const headline = document.createElement("h5");
  headline.textContent = "DONATE";

  const donateImage = document.createElement("div");
  donateImage.classList.add("donate_image");

  donateItems.appendChild(headline);
  donateItems.appendChild(donateImage);

  donateHeader.after(donateItems);
}

/* =================================
   Fidi Community title
================================= */
function updateChaiTitleText() {
  const chaiTitle = document.querySelector(".chai_club_title");
  if (!chaiTitle) return;

  chaiTitle.innerHTML = `
    LET'S <span class="highlight">STAY CONNECTED</span>
  `;
}

/* =================================
   Hero Desc Custom Class added
================================= */
function cycleDescClass() {
  const caption = document.querySelector(".cycle-caption span");
  if (!caption) return;

  const big = caption.querySelector("big");
  if (!big) return;

  // Get everything after <big>
  const nodes = Array.from(caption.childNodes);
  const textNode = nodes.find(
    (n) => n.nodeType === 3 && n.textContent.trim() !== "",
  );

  if (textNode) {
    const subtitle = document.createElement("div");
    subtitle.className = "cycle-caption-desc";
    subtitle.textContent = textNode.textContent.trim();

    caption.appendChild(subtitle);
    textNode.remove();
  }
}

/* =================================
   LATEST PHOTOS SWIPER (FULL VERSION)
================================= */
function initLatestPhotosSwiper() {
  const widget = document.querySelector(".latest_photos .wrapper");
  if (!widget) return;

  const widgetHeaderContainer = widget.querySelector(".widget_header");
  const widgetHeader = widgetHeaderContainer?.querySelector("h5");
  const widgetContent = widget.querySelector(".widget_content");
  const ul = widgetContent?.querySelector("ul");

  if (!widgetHeaderContainer || !widgetHeader || !widgetContent || !ul) return;

  // Prevent double initialization
  if (widget.querySelector(".swiper-latest-photos")) return;

  widgetHeader.innerHTML = `
    LATEST <span class="bold">PHOTOS</span>
  `;

  /* ----------------------------
      HEADER + TOP CONTROLS
  ----------------------------- */

  const headerRow = document.createElement("div");
  headerRow.className = "latest_photos_header";

  const headingWrap = document.createElement("div");
  headingWrap.className = "latest_photos_heading";
  headingWrap.appendChild(widgetHeaderContainer);

  const controlsWrap = document.createElement("div");
  controlsWrap.className = "latest_photos_controls";

  // Prev Button
  const prevBtn = document.createElement("button");
  prevBtn.className = "latest-prev";
  prevBtn.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 16 16">
      <path d="M16 9H3.83L8 13.18V16L0 8L8 0V2.82L3.83 7H16V9Z"
            fill="currentColor"/>
    </svg>
  `;

  // Next Button
  const nextBtn = document.createElement("button");
  nextBtn.className = "latest-next";
  nextBtn.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 16 16"
         style="transform: rotate(180deg);">
      <path d="M16 9H3.83L8 13.18V16L0 8L8 0V2.82L3.83 7H16V9Z"
            fill="currentColor"/>
    </svg>
  `;

  // Slide Text
  const slideText = document.createElement("span");
  slideText.className = "slide_text";
  slideText.textContent = "VIEW MORE PHOTOS";

  controlsWrap.appendChild(prevBtn);
  controlsWrap.appendChild(nextBtn);
  controlsWrap.appendChild(slideText);

  headerRow.appendChild(headingWrap);
  headerRow.appendChild(controlsWrap);

  widget.insertBefore(headerRow, widgetContent);

  /* ----------------------------
      BUILD SWIPER STRUCTURE
  ----------------------------- */

  const swiperRoot = document.createElement("div");
  swiperRoot.className = "swiper swiper-latest-photos";

  const swiperWrapper = document.createElement("div");
  swiperWrapper.className = "swiper-wrapper";

  const items = Array.from(ul.querySelectorAll("li"));

  items.forEach((li) => {
    li.classList.add("swiper-slide");
    swiperWrapper.appendChild(li);
  });

  swiperRoot.appendChild(swiperWrapper);

  // Replace UL with Swiper container
  ul.parentNode.replaceChild(swiperRoot, ul);

  /* ----------------------------
      BOTTOM CONTROLS (CLONE)
  ----------------------------- */

  const bottomControlsWrap = controlsWrap.cloneNode(true);
  bottomControlsWrap.classList.add("latest_photos_controls--bottom");

  widget.appendChild(bottomControlsWrap);

  const bottomPrevBtn = bottomControlsWrap.querySelector(".latest-prev");
  const bottomNextBtn = bottomControlsWrap.querySelector(".latest-next");

  /* ----------------------------
      INIT SWIPER
  ----------------------------- */

  new Swiper(".swiper-latest-photos", {
    slidesPerView: 1.1,
    spaceBetween: 20,
    grabCursor: true,
    loop: true,
    speed: 600,
    navigation: {
      nextEl: [nextBtn, bottomNextBtn],
      prevEl: [prevBtn, bottomPrevBtn],
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    breakpoints: {
      1800: { slidesPerView: 3.5 },
      1400: { slidesPerView: 2.5 },
      1024: { slidesPerView: 2.5 },
      575: { slidesPerView: 2 },
      480: { slidesPerView: 1.1 },
    },
  });
}
/* =================================
   FOOTER REDESIGN (UPDATED + FIXED)
================================= */
function updateFooterDesign() {
  const footer = document.querySelector("#footer .wrapper.body_container");
  if (!footer) return;

  if (footer.querySelector(".custom_footer_layout")) return;

  const footerInner = footer.querySelector(".footer_inner_container");
  if (!footerInner) return;

  /* ----------------------------
     Extract Existing Data
  ----------------------------- */

  const street =
    footerInner.querySelector(".footer-street")?.textContent.trim() || "";

  const cityState =
    footerInner.querySelector(".footer-city-state")?.textContent.trim() || "";

  const phone =
    footerInner
      .querySelector(".footer3 span:last-of-type")
      ?.textContent.trim() || "";

  const poweredHTML =
    footerInner.innerHTML.match(/Powered by[\s\S]*/)?.[0] || "";

  const socialLinks = Array.from(
    footer.querySelectorAll(".cs-f-social-icons a"),
  );

  footer.innerHTML = "";

  const layout = document.createElement("div");
  layout.className = "custom_footer_layout";

  /* ===== LEFT SIDE ===== */

  const left = document.createElement("div");
  left.className = "footer_left";

  const followTitle = document.createElement("h3");
  followTitle.innerHTML = `<span>FOLLOW</span> US`;

  const followDesc = document.createElement("p");
  followDesc.textContent =
    "Updates, community moments, and highlights from Chabad FiDi.";

  const socialWrap = document.createElement("div");
  socialWrap.className = "footer_social";

  socialLinks.forEach((link) => {
    socialWrap.appendChild(link.cloneNode(true));
  });

  left.appendChild(followTitle);
  left.appendChild(followDesc);
  left.appendChild(socialWrap);

  /* ===== RIGHT SIDE ===== */

  const right = document.createElement("div");
  right.className = "footer_right";

  const mainTitle = document.createElement("h2");
  mainTitle.innerHTML = `
    THE <span>CHABAD<br>
    JEWISH CENTER OF <span class="highlighted">FIDI</span></span>
  `;

  const address = document.createElement("p");
  address.textContent = `${street}, ${cityState} | ${phone}`;

  const powered = document.createElement("div");
  powered.className = "footer_powered";
  powered.innerHTML = poweredHTML;

  right.appendChild(mainTitle);
  right.appendChild(address);
  right.appendChild(powered);

  /* ----------------------------
     Append Everything
  ----------------------------- */

  layout.appendChild(left);
  layout.appendChild(right);

  footer.appendChild(layout);
}

updateFooterDesign();

/* =================================
   ABOUT SECTION HEADING UPDATE
================================= */
function updateAboutHeading() {
  const heading = document.querySelector(".widget-4.message .widget_header h5");

  if (!heading) return;

  // Prevent double update
  if (heading.dataset.updated === "true") return;

  heading.innerHTML = `
    THE <span>CHABAD<br>
    JEWISH CENTER OF 
    <span class="highlighted">FIDI</span>
    </span>
  `;

  heading.dataset.updated = "true";
}


/* =================================
   HOMEPAGE INITIALIZER
================================= */
const setupHomepage = () => {
  // Run ONLY on homepage
  if (window.location.pathname !== "/") return;

  waitForHero();
  updateHeroWithCycle();
  addSection();
  updateChaiSection();
  updateChaiTitleText();
  wrapSneakItems();
  addProgramLogos();
  updateDonateSection();
  carouselEvent();
  initLatestPhotosSwiper();
};

/* =================================
   Master Content Wrapper Inner
================================= */

const masterContentWrapperInner = () => {
  const wrapper = document.querySelector(".master-content-wrapper");
  if (!wrapper) return;

  if (wrapper.classList.contains("custom-section")) return;

  const header = wrapper.querySelector(".article-header");
  if (!header) return;

  const bgImage = wrapper.style.backgroundImage;
  if (!bgImage) return;

  wrapper.style.backgroundImage = "none";

  const textDiv = document.createElement("div");
  textDiv.className = "section-text";
  textDiv.appendChild(header);

  const imageDiv = document.createElement("div");
  imageDiv.className = "section-image";
  imageDiv.style.backgroundImage = bgImage;

  wrapper.innerHTML = "";

  wrapper.appendChild(textDiv);
  wrapper.appendChild(imageDiv);

  wrapper.classList.add("custom-section");
};

function init() {
  menuHamburger();
  addCredit();
  updateAboutHeading();
  setupHomepage();
  masterContentWrapperInner();
}
if (document.readyState !== 'loading'){
  init();
} else {
  document.addEventListener('DOMContentLoaded', init);
}


// Remove Inline Styles for Color and Font-Family
document.querySelectorAll('[style*="font-family"], [style*="color"]').forEach(el => {
  el.style.removeProperty('font-family');
  if (el.style.color) el.style.removeProperty('color');
});