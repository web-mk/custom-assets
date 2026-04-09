// Menu hamburger JS
document.addEventListener("DOMContentLoaded", function () {
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
});

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
   HERO SECTION
================================= */
function updateHeroSection() {
  const slider = document.querySelector(".slider");
  if (!slider) return;

  slider.innerHTML = `
    <div class="hero-inner">

      <div class="hero-content-left">
        <h1 class="hero-heading">
          <span class="hero-title-teal">Chabad Of</span> The Venetian &amp; Sunset Islands
        </h1>
        <p class="hero-subtitle">A welcoming home for Jewish life, learning, and connection on the Venetian &amp; Sunset Islands.</p>
        <a class="hero-cta" href="/about">Learn More About Us</a>
        <div class="hero-body">
          <p>
            Chabad of the Venetian & Sunset Islands is a vibrant Jewish center offering meaningful experiences for individuals and families of all ages. From prayer and education to holidays, programs, and community gatherings, Chabad provides a warm, inclusive space where Jewish life is lived with purpose and joy
            <span class="hero-body-more"> Guided by Rabbi Shmuel and Tzippy Mann, together with Rabbi Menachem and Mushka Rapoport, Chabad blends timeless Jewish values with a modern, approachable spirit. Every Jew is welcomed with respect — regardless of background, affiliation, or level of observance — creating a place where tradition feels relevant, alive, and deeply personal.</span>
          </p>
          <button class="hero-see-more-btn">... see more</button>
        </div>
      </div>

      <div class="hero-image-block">
        <img
          class="hero-building-img"
          src="/media/images/1365/nuVu13654947.png"
          alt="Chabad of The Venetian & Sunset Islands"
        />
      </div>

    </div>
  `;

  // See more toggle
  const btn = slider.querySelector(".hero-see-more-btn");
  const more = slider.querySelector(".hero-body-more");

  if (btn && more) {
    more.style.display = "none";
    btn.addEventListener("click", () => {
      more.style.display = "inline";
      btn.style.display = "none";
    });
  }
}

/* =================================
   CARD RESTRUCTURE
================================= */
function restructureEventCards() {
  const cards = document.querySelectorAll(".widget_content.index_format .item");

  cards.forEach((card) => {
    // skip if already restructured
    if (card.querySelector(".card_content")) return;

    const title = card.querySelector(".title");
    const desc = card.querySelector(".subtitle");
    const date = card.querySelector(".readMore");

    // bail only if ALL fields missing — card has nothing to show
    if (!title && !desc && !date) return;

    const contentWrapper = document.createElement("div");
    contentWrapper.className = "card_content";

    if (date) {
      const dateEl = document.createElement("div");
      dateEl.className = "card_date";
      dateEl.textContent = date.textContent.trim();
      contentWrapper.appendChild(dateEl);
      date.remove();
    }

    if (title) {
      const titleEl = document.createElement("div");
      titleEl.className = "card_title";
      titleEl.innerHTML = title.innerHTML;
      contentWrapper.appendChild(titleEl);
      title.remove();
    }

    if (desc) {
      const descText = desc.textContent.trim();
      if (descText) {
        const descEl = document.createElement("div");
        descEl.className = "card_desc";
        descEl.textContent = descText;
        contentWrapper.appendChild(descEl);
      }
      desc.remove();
    }

    card.appendChild(contentWrapper);
  });
}

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
  heading.innerHTML = `Upcoming Events`;

  const controlsGroup = document.createElement("div");
  controlsGroup.className = "controls_group";

  /* ✅ Pagination (NEW) */
  const pagination = document.createElement("div");
  pagination.className = "swiper-pagination";

  /* ✅ Next Button (NEW) */
  const nextBtn = document.createElement("button");
  nextBtn.className = "swiper-button-next";
  nextBtn.innerHTML = `
    <svg width="22" height="22" viewBox="0 0 24 24">
      <path d="M8 5L16 12L8 19"
            stroke="currentColor"
            stroke-width="2.5"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"/>
    </svg>
  `;

  controlsGroup.appendChild(pagination);
  controlsGroup.appendChild(nextBtn);

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

  const bottomNextBtn = bottomControls.querySelector(".swiper-button-next");

  carouselContainer.appendChild(swiperRoot);
  widgetContent.parentNode.replaceChild(carouselContainer, widgetContent);

  /* ======================
        INIT SWIPER
  ====================== */

  new Swiper(".swiper-events", {
    slidesPerView: 1.1,
    spaceBetween: 20,
    grabCursor: false,
    loop: true,

    navigation: {
      nextEl: [nextBtn, bottomNextBtn],
    },

    pagination: {
      el: swiperRoot.querySelectorAll(".swiper-pagination"),
      clickable: true,
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


/* =================================
   HOMEPAGE INIT
================================= */
const setupHomepage = () => {
  if (window.location.pathname !== "/") return;

  updateHeroSection();
  wrapSneakItems();
  restructureEventCards(); 
  carouselEvent()
};

document.addEventListener("DOMContentLoaded", setupHomepage);
