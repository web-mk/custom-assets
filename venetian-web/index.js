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
  const cards = document.querySelectorAll(".swiper-events .item");

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

/* =================================
   CAROUSEL
================================= */


/* =================================
   HOMEPAGE INIT
================================= */
const setupHomepage = () => {
  if (window.location.pathname !== "/") return;

  updateHeroSection();
  wrapSneakItems();
  restructureEventCards(); 
};

document.addEventListener("DOMContentLoaded", setupHomepage);
