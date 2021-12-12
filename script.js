const video = document.querySelector("video");
const progressRange = document.querySelector(".progress-range");
const progressBar = document.querySelector(".progress-bar");
const playBtn = document.querySelector("#play-btn");
const volumeIcon = document.querySelector("#volume-icon");
const volumeRange = document.querySelector(".volume-range");
const volumeBar = document.querySelector(".volume-bar");
const currentTime = document.querySelector(".time-elapsed");
const duration = document.querySelector(".time-duration");
const fullscreenBtn = document.querySelector(".fullscreen");
const videoSpeedBtn = document.querySelector(".player-speed");
let clickedVolume;
// Play & Pause ----------------------------------- //

const showPlayIcon = function () {
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
};
const showPauseIcon = function () {
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
};

const togglePlay = function () {
  if (video.paused) {
    video.play();
    showPauseIcon();
  } else {
    video.pause();
    showPlayIcon();
  }
};

// On Video End, show play button icon
// if (video.ended) showPlayIcon();
video.addEventListener("ended", showPlayIcon);

///////////////////////////////////////////////////////////////////
// Progress Bar

// Skip Video
const skipVideo = function (e) {
  const width = this.clientWidth;
  const clientWidth = e.offsetX;
  video.currentTime = (clientWidth / width) * video.duration;
  showPauseIcon();
  video.play();
};
// Calculate display time format
const displayTime = function (time) {
  const minutes = Math.floor(time / 60);
  let seconds = Math.round(time % 60);
  if (seconds < 10) seconds = `0${seconds}`;
  return `${minutes}:${seconds}`;
};

// Update progress bar as video plays
const updateProgress = function () {
  progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
  currentTime.textContent = `${displayTime(video.currentTime)}`;
  duration.textContent = `${displayTime(video.duration)}`;
};

// Volume Controls --------------------------- //

// Change Volume
const changeVolume = function (e) {
  clickedVolume = e.offsetX;
  if (clickedVolume >= 50)
    volumeIcon.classList.replace("fa-volume-down", "fa-volume-up");
  if (clickedVolume < 50) {
    volumeIcon.classList.replace("fa-volume-up", "fa-volume-down");
  }
  video.volume = clickedVolume / 100;
  // Change volume bar
  volumeBar.style.width = `${clickedVolume}%`;
};

// Mute video
const muteVideo = function (e) {
  if (video.muted) {
    if (clickedVolume < 50) {
      volumeIcon.classList.replace("fa-volume-mute", "fa-volume-down");
      console.log("Low");
    }
    if (clickedVolume >= 50 || clickedVolume === undefined) {
      volumeIcon.classList.replace("fa-volume-mute", "fa-volume-up");
    }

    video.muted = false;
  } else {
    volumeIcon.classList.replace("fa-volume-up", "fa-volume-mute");
    volumeIcon.classList.replace("fa-volume-down", "fa-volume-mute");
    video.muted = true;
  }
};

// Change Playback Speed -------------------- //

const changeSpeed = function () {
  video.playbackRate = videoSpeedBtn.value;
};

// Fullscreen ------------------------------- //
const openFullScreen = function () {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.webkitRequestFullscreen) {
    /* Safari */
    video.webkitRequestFullscreen();
  } else if (video.msRequestFullscreen) {
    /* IE11 */
    video.msRequestFullscreen();
  }
};
////////////////////////////////////////////////////////////////////
// Event listeners

playBtn.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);
video.addEventListener("timeupdate", updateProgress);
video.addEventListener("canplay", updateProgress);
progressRange.addEventListener("click", skipVideo);
volumeIcon.addEventListener("click", muteVideo);
volumeRange.addEventListener("click", changeVolume);
videoSpeedBtn.addEventListener("change", changeSpeed);
fullscreenBtn.addEventListener("click", openFullScreen);
