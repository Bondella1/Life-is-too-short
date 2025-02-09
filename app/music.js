
let audio = new Audio('path/to/your/music/file.mp3');

function playMusic() {
  audio.play();
}

function pauseMusic() {
  audio.pause();
}

function stopMusic() {
  audio.pause();
  audio.currentTime = 0;
}