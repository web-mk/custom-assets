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



$('.photos-slider').slick({
  dots: false,
  infinite: true,
  arrows: false,
  touchThreshold: 50,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 5,
  autoplay: true,
  autoplaySpeed: 5000,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
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


