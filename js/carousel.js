/*carousel javascript*/


const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
const centerElement = slides[Math.floor(slides.length/2)];
const nextButton = document.querySelector('.carousel__button--right');
const prevButton = document.querySelector('.carousel__button--left');
const txt_header = document.querySelector('.carousel__description__header');
const txt_descript = document.querySelector('.carousel__description__text');
centerElement.classList.add('current-slide');
let currSlide =  document.querySelector('.current-slide'); /*current slide in focus*/
let slideWidth = slides[0].getBoundingClientRect().width;
let trackCenter = track.getBoundingClientRect().width/2;
let shifter = 0;




/*----------------------------------\
|                                   |
|       CAROUSEL FUNCTIONS          |
|                                   |
\----------------------------------*/


//arrange slides next to each other
const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + 'px';

};


//center track in container
const centerTrack = (centerImage, offset) => {
  shifter = offset;
  track.style.transform = 'translateX(' + shifter + 'px)';
};


//update the current slide
const updateCurrentSlide = (currentSlide, targetSlide) => {
  currentSlide.classList.remove('current-slide');
  targetSlide.classList.add('current-slide');
  currSlide = document.querySelector('.current-slide');
};


//move the slide track
const moveTrack = (track, slideShift) => {
  track.style.transform = 'translateX(' + shifter + 'px)';
};


//check when the end of image track has been reached
//hide the toggle buttons when it has been.
const checkNull = (targetSlide) => {
  if(targetSlide.nextElementSibling===null){
    shifter += 0;
    nextButton.disabled = true;
    nextButton.classList.add('is-hidden');
  }else if(targetSlide.previousElementSibling===null){
    shifter -= 0;
    prevButton.disabled = true;
    prevButton.classList.add('is-hidden');
  }else {
    prevButton.disabled = false;
    prevButton.classList.remove('is-hidden');
    nextButton.disabled = false;
    nextButton.classList.remove('is-hidden');
  }
};

//update the name and description below the center image
const updateText = (targetSlide) => {
  txt_header.innerHTML = targetSlide.querySelector('.image_title').innerHTML;
  txt_descript.innerHTML = targetSlide.querySelector('.image_description').innerHTML;
};

//find the center of the image track
function updatedTrackCenter (){
  trackCenter = track.getBoundingClientRect().width/2;
}

//determine if the screen is large screen media query
function largeScreen() {
  return (window.screen.width > 768);
}



/*-------------------------------\
|                                |
|    Carousel Initial Set-Up     |
|                                |
\-------------------------------*/


//inital set up for image track with slides side by side
//set track focus on centeral image
const initialize = (slides) => {
  slides.forEach(setSlidePosition);

  let centerImage = parseFloat(centerElement.style.left);
  let offset = trackCenter-(centerImage+(slideWidth/2));

  centerTrack(centerImage, offset);
  updateText(centerElement);
};


//check desktop media query size and initialize slides
if(largeScreen()){
  initialize(slides);
}






/*-----------------------------------\
|                                    |
|     Carousel Responsive Design     |
|                                    |
\-----------------------------------*/

//re-initialize the image track when window size changes
//adjust to current slide in focus
const reInitialize = (slides) => {
  slideWidth = slides[0].getBoundingClientRect().width;
  slides.forEach(setSlidePosition);
  centerImage = parseFloat(centerElement.style.left);

  offset = trackCenter-((parseFloat(currSlide.style.left))+(slideWidth/2));
  updatedTrackCenter();
  centerTrack(currSlide, offset);
  updateText(currSlide, offset);
}

//listen for change in window size
//re-initialize image track when detected
window.addEventListener('resize', resetPics);
function resetPics(){
  let vwp = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  font_size_calc_test(vwp);
  if(largeScreen()){
    reInitialize(slides);
  }
};


/*-----------------------------------\
|                                    |
|         Carousel Navigation        |
|                                    |
\-----------------------------------*/


//when left arrow clicked, move slides left
prevButton.addEventListener('click', e => {
  const currentSlide = track.querySelector('.current-slide');
  const prevSlide = currentSlide.previousElementSibling;
  shifter += prevSlide.offsetWidth;

  checkNull(prevSlide);
  moveTrack(track, shifter);
  updateCurrentSlide(currentSlide, prevSlide);
  updateText(prevSlide);
});

//when right arrow clicked, move slides right
nextButton.addEventListener('click', e => {
  const currentSlide = track.querySelector('.current-slide');
  const nextSlide = currentSlide.nextElementSibling;
  const headline = document.querySelector('.carousel__description__header');
  const descript = document.querySelector('.carousel__description__text');
  shifter -= nextSlide.offsetWidth;

  checkNull(nextSlide);
  moveTrack(track, shifter);
  updateCurrentSlide(currentSlide, nextSlide);
  updateText(nextSlide);
});




/*-----------------------------------\
|                                    |
|         Page Scroll Listener       |
|     Header Background Activation   |
|                                    |
\-----------------------------------*/


const section = document.querySelector('#what');
let target = section.getBoundingClientRect().top;
const header = document.querySelector('.header');
target = Math.abs(target);


//listen for page scroll
//activate header background when moves beyond top of home section
//deactivate header background when on home section
window.addEventListener('scroll',(event) => {
  if(window.scrollY > target){
    header.classList.add('background-active');
  }else{
    header.classList.remove('background-active');
  }
});





/*-----------------------------------\
|                                    |
|         Mobile Menu Toggle         |
|                                    |
\-----------------------------------*/

const whoSectionTag = document.querySelector('#who');
var toggle = document.getElementById("mobile_header--toggle");
var meetTeamButton = document.getElementById("who_image_button");
var meetTeamCloseButton = document.getElementById("who_image_close_button");
var menuContainer = document.querySelector('.header_menu');
var imageContainer =document.querySelector('.carousel__track-container');
var imageContainer__spacing = document.querySelector('.who_headline_wrapper');
var menu = document.querySelector('.menu_items');
var menuItems = document.querySelectorAll('.menu_items a');
var initial_fontSize = toggle.style.fontSize;



/*-----  MOBILE MENU TOGGLE FUNCTIONS  -----*/


//check if the menu is in use
function checkActiveStatus(target) {
  return target.classList.contains('menu-active');
}

//update header menu button text with "X" to indicate drawer closure
function openDrawerText() {
    toggle.innerHTML="X";
    toggle.style.fontSize = "34px";
  }

//restore header menu text
function closedDrawerText() {
    toggle.innerHTML="Menu";
    toggle.style.fontSize = initial_fontSize;
  }

/*-----  MOBILE MENU TOGGLE LISTENER  -----*/


//listen for click of mobile header toggle button
//expand when inactive and retract when when active
toggle.addEventListener('click', function(){
  if(checkActiveStatus(menuContainer)){
    this.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-expanded', 'false');
    menuContainer.classList.remove('menu-active');
    closedDrawerText();
  }else{
    menuContainer.classList.add('menu-active');
    menu.setAttribute('aria-expanded', 'true');
    this.setAttribute('aria-expanded', 'true');
    openDrawerText();
    menu.firstChild.focus;
  }
});



/*-----------------------------------------\
|                                           |
|     Mobile WHO_IMAGE EXPANSION Toggle     |
|                                           |
\-----------------------------------------*/


/*----- MOBILE WHO_IMAGE EXPANSION FUNCTIONS -----*/


  //open the image drawer and mark aria-expanded to true
  function whoImageDrawerOpen(button){
    imageContainer__spacing.classList.add('menu-active');
    imageContainer.classList.add('menu-active');
    menu.setAttribute('aria-expanded', 'true');
    button.setAttribute('aria-expanded', 'true');
  }


  //close the image drawer when 'meetTeamButton' pushed again, and set aria-expanded to false
  function whoImageDrawerClose(button){
    button.setAttribute('aria-expanded','false');
    imageContainer.setAttribute('aria-expanded', 'false');
    imageContainer.classList.remove('menu-active');
    imageContainer__spacing.classList.remove('menu-active');
    whoSectionTag.scrollIntoView();
  }

  //close drawer when 'close' button at end of image track is pressed
  function closeMenu(){
    toggle.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-expanded', 'false');
    menuContainer.classList.remove('menu-active');
    closedDrawerText();
  }


/*-----  MOBILE WHO_IMAGE EXPANSION LISTENERS -----*/


//listen for 'meet team' button, check active status and open or close as approriate
meetTeamButton.addEventListener('click', function(){
  if(checkActiveStatus(imageContainer)){
    whoImageDrawerClose(this);
  }else{
    whoImageDrawerOpen(this);
  }
});

//listen for 'close' button and close the image drawer
meetTeamCloseButton.addEventListener('click', function(){
    whoImageDrawerClose(this);
});

/*
function font_size_calc_test(vw){
  console.log("vw=> ", vw);
  var calcd = (51.7 + (52.045-51.7)*((vw - 415)/(768-415)));
  console.log("calc=> ", calcd);
  var fs = document.getElementById("main_title").style.fontSize;
  //var fsZ = fs.getBoundingClientRect();
  console.log("fs=> ", fs);
}*/
