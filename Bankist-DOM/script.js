'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault(); // stops links from sending you to the top of the page
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function(e){
  // returns the coords in relation to the window
  const s1coords = section1.getBoundingClientRect();
  console.log('s1 coords', s1coords);

  console.log(e.target.getBoundingClientRect());

  // how much the page has been scrolled
  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

  // dimensions of the viewport
  console.log(
    'height/width viewport',
    document.documentElement.clientHeight, document.documentElement.clientWidth
  );

  // we need all these to scroll to the first section
  section1.scrollIntoView({behavior: 'smooth'});
});

document.querySelector('.nav__links').addEventListener('click', function(e) {
  e.preventDefault(); // always
  // console.log(e.target); //  can extract section from this

  // Matching stategy
  if (e.target.classList.contains('nav__link')){
    document.querySelector(e.target.getAttribute('href')).scrollIntoView({ behavior : 'smooth' });
  }
});

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function(e){
  // search for closest parent tab
  const clicked = e.target.closest('.operations__tab');
  // console.log(clicked);
  // Guard Clause, if click outside a button
  if (!clicked) return;

  // remove active state from all tabs
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  // remove active content
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // add active state to currently active tab
  clicked.classList.add('operations__tab--active');
  // add active state to content
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
});

// MENU FADE ANIMATION
const nav = document.querySelector('.nav'); // remember to add all of these selections to the top of the file

const handleHover = function(e){
  // not using .closest as there are no child elements i could accidently click here
  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    // console.log(link.closest('.nav'));

    siblings.forEach(el => {
      if(el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
}

// passing an argurment into a handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

const obsCallback = function(entries, observer) {
  // will get called each time the observed element is intersecting the root element at the threshold defined
  entries.forEach(entry => console.log(entry));
};

const obsOptions = {
  root: null,
  threshold: [0, 0.2],
};

const observer = new IntersectionObserver(obsCallback, obsOptions);

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
console.log(navHeight);

const stickyNav = function(entries){
  const [entry] = entries;
  // the same as writine = entries[0]
  // console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

// rootmargin specifies how many pixels will be applied outside of our target element
// means nav will become sticky 90px before threshold is reached, i think
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// we will remove the class section--hidden from the sections as we scroll down the page

const allSections = document.querySelectorAll('.section');

const revealSection = function(entries, observer){
  const [entry] = entries;
  // console.log(entry);

  if(!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
}

// root: null means the root is the viewport
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function(section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// /// // ////// // ////// // ////// // ////// // ///
// // Lazy Loading Images
// /// // ////// // ////// // ////// // ////// // ///

// we select all img cases where there is a data-src property
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function(entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;

  // replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function(){
    entry.target.classList.remove('lazy-img');
  });
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  // rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

// store the everything in its own function, so that we dn't pollute the global namespace
const slider = function(){
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let currentSlide = 0;
  const maxSlide = slides.length;

  const createDots = function() {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`);
    });
  };

  const activateDot = function(slide) {
    document.querySelectorAll('.dots__dot').forEach(dot => {
      dot.classList.remove('dots__dot--active');
    });

    // can use the [] to search for a certain attribute
    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
  };

  const goToSlide = function(slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${(i - slide) * 100}%)`)
    );
  };

  const init = function(){
    createDots();
    activateDot(0);
    goToSlide(0);
  };
  init();

  // Next slide
  const nextSlide = function(){
    if (currentSlide === maxSlide - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    activateDot(currentSlide);
    goToSlide(currentSlide);
  };

  const prevSlide = function() {
    if(currentSlide === 0){
      currentSlide = maxSlide - 1;
    } else {
      currentSlide--;
    }

    activateDot(currentSlide);
    goToSlide(currentSlide);
  };

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function(e) {
    // console.log(e);

    e.key === 'ArrowRight' && nextSlide();
    e.key === 'ArrowLeft' && prevSlide();
  });

  dotContainer.addEventListener('click', function(e){
    if (e.target.classList.contains('dots__dot')){
      const {slide} = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);

    }
  })
};
slider();
// we can even have our slider accept options as a parameter, eg in the form of an object

document.addEventListener('DOMContentLoaded', function(e) {
  // it takes time to load the DOM as seen in the network tab
  console.log('HTML parsed and DOM tree built!', e);
  // we only want to execute code after the DOM is ready
  // so we add the script tag to the HTML at the end of the html document
});

// Can also check for when the page is fully loaded
window.addEventListener('load', function(e) {
  console.log('Page fully loaded', e);
});