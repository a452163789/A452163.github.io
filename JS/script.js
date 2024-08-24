var audio1 = new Audio('⟪牢大の小曲⟫.mp3');
var isPlaying1 = false;
var container1 = document.querySelector('#container1');
var demo1 = document.querySelector('#demo1');

container1.addEventListener('click', function() {
  isPlaying1 = false;
  if (audio1.paused) {
    audio1.currentTime = 0;
    audio1.play();
    isPlaying1 = true;
  } else {
    audio1.pause();
  }
  // Toggle the display of the canvas element
  demo1.style.display = (demo1.style.display === 'none') ? 'block' : 'none';
});

audio1.addEventListener('loadedmetadata', function() {
  audio1.loop = true;
});


var audio2 = new Audio('ONCE UPON A TIME.mp3');
var isPlaying2 = false;

var container2 = document.querySelector('#container2');
container2.addEventListener('click', function() {
    isPlaying2 = false;
    if (audio2.paused) {
        audio2.currentTime = 0;
        audio2.play();
        isPlaying2 = true;
    } else {
        audio2.pause();
    }
});

audio2.addEventListener('loadedmetadata', function() {
    audio2.loop = true;
});















