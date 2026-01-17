// Hero Vide Optimization
const heroVideo = document.querySelector(".hero-video");

if (heroVideo) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          heroVideo.play().catch(() => {});
        } else {
          heroVideo.pause();
        }
      });
    },
    { threshold: 0.1 }
  );

  observer.observe(heroVideo);

  heroVideo.addEventListener("error", () => {
    heroVideo.style.display = "none";
  });
}

// Partners Slider
$(".partners-slider").slick({
  dots: false,
  infinite: true,
  arrows: false,
  swipe: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  variableWidth: true,
  touchThreshold: 20,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
});

// Partners Slider
$(".gallery-slider").slick({
  dots: false,
  infinite: true,
  arrows: false,
  swipe: true,
  slidesToShow: 6,
  slidesToScroll: 2,
  autoplay: true,
  autoplaySpeed: 2000,
  touchThreshold: 20,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
});
