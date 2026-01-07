// Button Hover Animate
const buttons = document.querySelectorAll(".btn");

buttons.forEach((btn) => {
  const bg = btn.querySelector(".btn-bg");

  btn.addEventListener("mouseenter", (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    bg.style.left = `${x}px`;
    bg.style.top = `${y}px`;
    bg.style.transform = "translate(-50%, -50%) scale(28)";
  });

  btn.addEventListener("mouseleave", (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    bg.style.left = `${x}px`;
    bg.style.top = `${y}px`;
    bg.style.transform = "translate(-50%, -50%) scale(0)";
  });
});

// Slider Setting
$('.photos-slider').slick({
  centerMode: true,
  centerPadding: '0px',
  slidesToShow: 5,
  slidesToScroll: 1,
  touchThreshold: 50,
  edgeFriction: 1,
  autoplay: true,
  autoplaySpeed: 1000,
  arrows: false,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        arrows: false,
        centerMode: true,
        slidesToShow: 3
      }
    },
    {
      breakpoint: 480,
      settings: {
        arrows: false,
        centerMode: true,
        slidesToShow: 1
      }
    }
  ]
});

// menu Toggle JS
document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.querySelector(".gi-wrapper");
  if (!wrapper) return;

  const toggleBtn = wrapper.querySelector(".menu-toggle-btn");
  const headerNav = wrapper.querySelector(".header-nav");

  if (!toggleBtn || !headerNav) return;

  toggleBtn.addEventListener("click", () => {
    toggleBtn.classList.toggle("opened");
    headerNav.classList.toggle("opened");

    const isOpen = toggleBtn.classList.contains("opened");
    toggleBtn.setAttribute("aria-expanded", isOpen);
  });
});


