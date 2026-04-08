// Menu hamburger JS
document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.querySelector(".cs-mobile-menu-open");
  if (!menuBtn) return;

  const icon = menuBtn.querySelector("i");
  if (icon) icon.remove();

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
      document.body.classList.toggle("menu-open", menuBtn.classList.contains("active"));
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
        <p class="hero-subtitle">A welcoming home for Jewish life, learning, and connection.</p>
        <a class="hero-cta" href="/about">Learn More About Us</a>
        <div class="hero-body">
          <p>
            Chabad of the Venetian & Sunset Islands is a vibrant Jewish center...
            <span class="hero-body-more"> Guided by Rabbi...</span>
          </p>
          <button class="hero-see-more-btn">... see more</button>
        </div>
      </div>

      <div class="hero-image-block">
        <img src="/media/images/1365/nuVu13654947.png" />
      </div>
    </div>
  `;

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
   EVENT CARD RESTRUCTURE (FIXED)
================================= */
function restructureEventCards() {
  const cards = document.querySelectorAll(".swiper-events .swiper-slide");

  cards.forEach((card) => {
    if (card.querySelector(".card_content")) return;

    const title = card.querySelector(".title");
    const desc = card.querySelector(".subtitle");
    const date = card.querySelector(".readMore");

    if (!title || !desc || !date) return;

    const contentWrapper = document.createElement("div");
    contentWrapper.className = "card_content";

    const dateEl = document.createElement("div");
    dateEl.className = "card_date";
    dateEl.textContent = date.textContent.trim();

    const titleEl = document.createElement("div");
    titleEl.className = "card_title";
    titleEl.innerHTML = title.innerHTML;

    const descEl = document.createElement("div");
    descEl.className = "card_desc";
    descEl.textContent = desc.textContent.trim();

    contentWrapper.appendChild(dateEl);
    contentWrapper.appendChild(titleEl);
    contentWrapper.appendChild(descEl);

    title.remove();
    desc.remove();
    date.remove();

    card.appendChild(contentWrapper);
  });
}

/* =================================
   EVENTS CAROUSEL (FIXED)
================================= */
function carouselEvent() {
  const widgetContent = document.querySelector(".widget_content.index_format");
  if (!widgetContent) return;

  const items = Array.from(widgetContent.querySelectorAll(".item"));
  widgetContent.querySelectorAll(".separator").forEach((sep) => sep.remove());

  const container = document.createElement("div");
  container.className = "carousel_container";

  const swiperRoot = document.createElement("div");
  swiperRoot.className = "swiper swiper-events";

  const header = document.createElement("div");
  header.className = "carousel_header";

  const heading = document.createElement("div");
  heading.className = "carousel_heading";
  heading.textContent = "Upcoming Events";

  function createControls() {
    const controls = document.createElement("div");
    controls.className = "controls_group";

    const pagination = document.createElement("div");
    pagination.className = "custom_pagination";

    const nextBtn = document.createElement("button");
    nextBtn.className = "swiper-next";
    nextBtn.innerHTML = `<svg width="22" height="22"><path d="M8 5L16 12L8 19" stroke="currentColor" stroke-width="2.5" fill="none"/></svg>`;

    controls.appendChild(pagination);
    controls.appendChild(nextBtn);

    return { controls, pagination, nextBtn };
  }

  const top = createControls();
  header.appendChild(heading);
  header.appendChild(top.controls);

  const wrapper = document.createElement("div");
  wrapper.className = "swiper-wrapper";

  items.forEach((item) => {
    item.classList.add("swiper-slide");
    wrapper.appendChild(item);
  });

  const bottom = createControls();
  bottom.controls.classList.add("controls_group--bottom");

  swiperRoot.appendChild(header);
  swiperRoot.appendChild(wrapper);
  swiperRoot.appendChild(bottom.controls);

  container.appendChild(swiperRoot);
  widgetContent.parentNode.replaceChild(container, widgetContent);

  const swiper = new Swiper(".swiper-events", {
    slidesPerView: 1.1,
    spaceBetween: 20,
    loop: true,
    loopedSlides: items.length,
    loopAdditionalSlides: items.length,

    navigation: {
      nextEl: [top.nextBtn, bottom.nextBtn],
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

    on: {
      init: function () {
        
        setTimeout(() => {
          restructureEventCards();
        }, 0);

        createPagination(this);
        updatePagination(this);
      },
      slideChange: function () {
        updatePagination(this);
      },
    },
  });

  function createPagination(swiperInstance) {
    [top.pagination, bottom.pagination].forEach((pagination) => {
      pagination.innerHTML = "";

      for (let i = 0; i < items.length; i++) {
        const dot = document.createElement("div");
        dot.className = "pagination_dot";

        const progress = document.createElement("div");
        progress.className = "pagination_progress";

        dot.appendChild(progress);

        dot.addEventListener("click", () => {
          swiperInstance.slideToLoop(i);
        });

        pagination.appendChild(dot);
      }
    });
  }

  function updatePagination(swiperInstance) {
    swiperRoot.querySelectorAll(".custom_pagination").forEach((pagination) => {
      pagination.querySelectorAll(".pagination_dot").forEach((dot, index) => {
        const progress = dot.querySelector(".pagination_progress");

        dot.classList.remove("active");
        progress.style.transition = "none";
        progress.style.width = "0%";
        progress.offsetWidth;

        if (index === swiperInstance.realIndex) {
          dot.classList.add("active");
          progress.style.transition = "width 3000ms linear";
          progress.style.width = "100%";
        }
      });
    });
  }
}

/* =================================
   INIT
================================= */
document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname !== "/") return;

  updateHeroSection();
  wrapSneakItems();
  carouselEvent();
});