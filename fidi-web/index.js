/* =================================
   HERO + CYCLE CAPTION UPDATE (FOR .slider)
================================= */
function updateHeroWithCycle() {
  const slider = document.querySelector(".slider");
  if (!slider) return;

  const caption = slider.querySelector(".cycle-caption");
  if (!caption) return;

  const applyHeroUpdates = () => {
    const span = caption.querySelector("p span");
    if (!span) return;

    const big = span.querySelector("big");
    if (!big) return;

    if (big.dataset.updated === "true") return;

    big.innerHTML = `
      Judaism With 
      <img 
        class="styled-text"
        src="https://webmk.centers.chabad.org/media/images/1357/BZwx13573770.png"
        alt="Warmth"
      />
      in the 
      <span class="highlighted-text">Heart of FiDi</span>
    `;

    big.dataset.updated = "true";

    const textNode = Array.from(span.childNodes).find(
      node => node.nodeType === 3 && node.textContent.trim()
    );

    if (textNode && !span.querySelector(".cycle-caption-desc")) {
      const desc = document.createElement("div");
      desc.className = "cycle-caption-desc";
      desc.textContent = textNode.textContent.trim();
      span.appendChild(desc);
      textNode.remove();
    }
  };

  applyHeroUpdates();

  const observer = new MutationObserver(() => {
    applyHeroUpdates();
  });

  observer.observe(caption, {
    childList: true,
    subtree: true,
  });
}

/* =================================
   WAIT UNTIL SLIDER EXISTS
================================= */

function waitForHero() {
  const interval = setInterval(() => {
    const slider = document.querySelector(".slider .cycle-caption");
    if (slider) {
      clearInterval(interval);
      updateHeroWithCycle();
    }
  }, 200);
}


/* =================================
   ABOUT SECTION RESTRUCTURE
================================= */
function addSection() {
  const wrapperTwo = document.querySelector(".hp-row:nth-child(2) .wrapper");
  if (!wrapperTwo) return;

  const widgetHeader = wrapperTwo.querySelector(".widget_header");
  const widgetContent = wrapperTwo.querySelector(
    ".widget_content.message_format",
  );

  if (!widgetHeader || !widgetContent) return;

  const futureImage = document.createElement("div");
  futureImage.className = "about_image";

  const futureImageContainer = document.createElement("div");
  futureImageContainer.className = "about_image_container";
  futureImage.appendChild(futureImageContainer);

  const futureItems = document.createElement("div");
  futureItems.className = "about_items";

  const sectionHeadline = document.createElement("div");
  sectionHeadline.className = "section_headline";
  sectionHeadline.textContent = "About us";

  wrapperTwo.insertBefore(futureImage, widgetHeader);
  wrapperTwo.insertBefore(futureItems, widgetHeader);

  futureItems.appendChild(sectionHeadline);
  futureItems.appendChild(widgetHeader);
  futureItems.appendChild(widgetContent);
}

/* =================================
   CHAI SECTION UPDATE
================================= */
function updateChaiSection() {
  const wrapper = document.querySelector(".hp-row:nth-child(3) .wrapper");
  if (!wrapper) return;

  const widgetHeader = wrapper.querySelector(".widget_header");
  const widgetContent = wrapper.querySelector(".widget_content.message_format");
  const h5 = wrapper.querySelector("h5");

  if (!widgetHeader || !widgetContent || !h5) return;

  const chaiImage = document.createElement("div");
  chaiImage.className = "chai_image";

  const chaiImageContainer = document.createElement("div");
  chaiImageContainer.className = "chai_image_container";
  chaiImage.appendChild(chaiImageContainer);

  const headingItems = document.createElement("div");
  headingItems.className = "chai_club_heading_items";

  const chaiTitle = document.createElement("div");
  chaiTitle.className = "chai_club_title";
  chaiTitle.textContent = h5.textContent;

  const chaiSubtitle = document.createElement("div");
  chaiSubtitle.className = "chai_club_subtitle";
  chaiSubtitle.textContent =
    "Your ongoing support sustains programs and services all year long, making a lasting difference.";

  headingItems.appendChild(chaiTitle);
  headingItems.appendChild(chaiSubtitle);

  const chaiHeader = document.createElement("div");
  chaiHeader.className = "chai_header";

  wrapper.insertBefore(chaiImage, widgetHeader);
  wrapper.insertBefore(headingItems, widgetHeader);
  wrapper.insertBefore(chaiHeader, widgetHeader);

  chaiHeader.appendChild(widgetHeader);
  chaiHeader.appendChild(widgetContent);
}

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

  /* Header */
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

  /* Slides */
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
  carouselContainer.appendChild(swiperRoot);

  widgetContent.parentNode.replaceChild(carouselContainer, widgetContent);

  new Swiper(".swiper-events", {
    slidesPerView: 3,
    spaceBetween: 30,
    grabCursor: false,
    navigation: {
      nextEl: nextBtn,
      prevEl: prevBtn,
    },
    breakpoints: {
      1399: { slidesPerView: 3 },
      575: { slidesPerView: 2 },
      480: { slidesPerView: 1.1 },
    },
  });
}

/* =================================
   Program Logos
================================= */
function addProgramLogos() {
  const logoMap = {
    "Hebrew School":
      "https://webmk.centers.chabad.org/media/images/1357/pxRZ13572238.png",
    "Gan Accademia":
      "https://webmk.centers.chabad.org/media/images/1357/BGYP13572237.png",
    "Young Professionals":
      "https://webmk.centers.chabad.org/media/images/1357/ptvM13572241.png",
    "Shabbat & Holidays":
      "https://webmk.centers.chabad.org/media/images/1357/JUop13572239.png",
    "Women’s Circle":
      "https://webmk.centers.chabad.org/media/images/1357/JiQn13572240.png",
    "Adult Education":
      "https://webmk.centers.chabad.org/media/images/1357/awQn13572236.png",
  };

  const cards = document.querySelectorAll(".sneak-peek-item");
  if (!cards.length) return;

  cards.forEach((card) => {
    const titleEl = card.querySelector("h6 a");
    if (!titleEl) return;

    const title = titleEl.textContent.trim();
    const logoSrc = logoMap[title];
    if (!logoSrc) return;

    const logoBox = document.createElement("div");
    logoBox.className = "program-logo";
    logoBox.innerHTML = `<img src="${logoSrc}" alt="${title} logo">`;

    const wrapper = card.querySelector(".wrapper");
    if (!wrapper) return;

    wrapper.appendChild(logoBox);
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

  const headerRow = document.createElement("div");
  headerRow.className = "latest_photos_header";

  const headingWrap = document.createElement("div");
  headingWrap.className = "latest_photos_heading";
  headingWrap.appendChild(widgetHeaderContainer);

  const controlsWrap = document.createElement("div");
  controlsWrap.className = "latest_photos_controls";

  /* --- SVG Prev Button --- */
  const prevBtn = document.createElement("button");
  prevBtn.className = "latest-prev";
  prevBtn.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 16 16">
      <path d="M16 9H3.83L8 13.18V16L0 8L8 0V2.82L3.83 7H16V9Z"
            fill="currentColor"/>
    </svg>
  `;

  /* --- SVG Next Button --- */
  const nextBtn = document.createElement("button");
  nextBtn.className = "latest-next";
  nextBtn.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 16 16"
         style="transform: rotate(180deg);">
      <path d="M16 9H3.83L8 13.18V16L0 8L8 0V2.82L3.83 7H16V9Z"
            fill="currentColor"/>
    </svg>
  `;

  /* --- Slide Text --- */
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
     3️⃣ Build Swiper Structure
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

  new Swiper(".swiper-latest-photos", {
    slidesPerView: 2.5,
    spaceBetween: 20,
    grabCursor: true,
    loop: true,
    speed: 600,
    navigation: {
      nextEl: nextBtn,
      prevEl: prevBtn,
    },
    breakpoints: {
      1400: { slidesPerView: 2.5 },
      1024: { slidesPerView: 2.5 },
      768: { slidesPerView: 2 },
      480: { slidesPerView: 1.5 },
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
     1️⃣ Extract Existing Data
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

document.addEventListener("DOMContentLoaded", updateAboutHeading);


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

document.addEventListener("DOMContentLoaded", setupHomepage);
