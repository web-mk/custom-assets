const isUpcoming = document.title.toLowerCase().includes('upcoming events');

if (isUpcoming) {
  document.body.classList.add('upcoming-events')
}

const addFooterLink = () => {
  const footerTitle = document.querySelector('span.footer-title');
  if (footerTitle) {
    footerTitle.outerHTML =
      `<a href="/" class="footer-title">` +
      footerTitle.innerHTML +
      `</a>`;
  }
};

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

// Loop Videos
document.addEventListener("DOMContentLoaded", function () {
  addFooterLink();
  const videos = document.querySelectorAll(".js-auto-video");

  videos.forEach(video => {
    video.muted = true;
    video.loop = true;
    video.setAttribute("playsinline", "");

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
      });
    }
  });
});


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
  variableWidth: false,
  touchThreshold: 20,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
          variableWidth: false,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 2,
          variableWidth: false,
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
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
});
