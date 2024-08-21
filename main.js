import { particleshape } from './particleshape.js';

document.querySelector('#app').innerHTML = `
  <div id="Space">
    <div id="hero">
      <span class="name">My name is</span> <span class="name">Guranshvir Singh Gill</span>
      <span class="wrap"></span>
      <div class="typewrite" data-type='[ "Software Developer", "University Student", "AI Enthusiast", "Data Analyst" ]'> </div>
    </div>

    <div class="hero2">
    <span>
      <h2> My
      </h2>
      <h1>
        Technologies
      </h1>
    </span>
    
            
    <div class="slider" style="
          --width: 170px;
          --height: 120px;
          --quantity: 8;
      ">
        <div class="list">
          <div class="item" style="--position: 3"><div class="hero2slides"><img src="/images/React.png" alt=""></div></div>
          <div class="item" style="--position: 4"><div class="hero2slides"><img src="/images/ThreeJS.png" alt=""></div></div>
          <div class="item" style="--position: 5"><div class="hero2slides"><img src="/images/JS.png"></div></div>
          <div class="item" style="--position: 6"><div class="hero2slides"><img src="/images/Python.png" alt=""></div></div>
          <div class="item" style="--position: 7"><div class="hero2slides"><img src="/images/Bootstrap.png" alt=""></div></div>
          <div class="item" style="--position: 8"><div class="hero2slides"><img src="/images/Tailwind.png" alt=""></div></div>
          <div class="item" style="--position: 9"><div class="hero2slides"><img src="/images/Firebase.png" alt=""></div></div>
          <div class="item" style="--position: 10"><div class="hero2slides"><img src="/images/Python.png" alt=""></div></div>
        </div>
      </div>
    </div>

    <div id="hero3">
      <h1>Projects </h1>
      <div class="project" >
             

      <div id="default-carousel" class="relative w-full" data-carousel="slide">
      <!-- Carousel wrapper -->
      <div class="relative h-56 overflow-hidden rounded-lg md:h-96">
           <!-- Item 1 -->
          <div class="hidden duration-700 ease-in-out" data-carousel-item>
            <a href="https://chat2-test.web.app/login" > <img src="/ProjectImages/Chat-app.png" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..."></a>
          </div>
          <!-- Item 2 -->
          <div class="hidden duration-700 ease-in-out" data-carousel-item>
             <a href="https://furrosette.web.app/"> <img src="/ProjectImages/Threejs.png" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..."> </a> 
          </div>
          <!-- Item 3 -->
          <div class="hidden duration-700 ease-in-out" data-carousel-item>
             <a href="https://translation-application-8a8ed.web.app/"> <img src="/ProjectImages/Translate.png" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
          </div> </a>
          
      </div>
      <!-- Slider indicators -->
      <div class="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse ">
          <button type="button" class="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
          <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
          <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
         
      </div>
      <!-- Slider controls -->
      <button type="button" class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
          <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
              </svg>
              <span class="sr-only">Previous</span>
          </span>
      </button>
      <button type="button" class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
          <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
              </svg>
              <span class="sr-only">Next</span>
          </span>
      </button>
  </div>

      </div>
      </div>
      
  </div>
`;

particleshape(document.querySelector('#Space'));

var TxtType = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('typewrite');
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-type');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }

  // Injecting CSS for the typing animation
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap {word-wrap: break-word;font-size: 4vw; border-right: 0.08em solid #fff; } ";
  document.body.appendChild(css);
};
