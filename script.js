let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create new audio element
let curr_track = document.createElement('audio');


// Define the tracks that have to be played
let track_list = [
  {
    name: "Barbaadiyan",
    artist: "Sachet Tandon,Nikhita Gandhi",
    image: "https://m.media-amazon.com/images/M/MV5BZWFiMjVlYTMtMzlhYy00MDcxLWFlNmEtMGJkNmRhNjE5N2ViXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg",
    path: "https://2022.dming2022.xyz/bollywood%20mp3/Shiddat%20(2021)/Shiddat%20(2021)%20(320%20Kbps)/03%20-%20Barbaadiyan.mp3"
  },
  {
    name: "Love Me Like You Do ",
    artist: "Ellie Goulding",
    image: "https://www.themoviedb.org/t/p/original/9ZedQHPQVveaIYmDSTazhT3y273.jpg",
    path:  "https://pagalworld.com.se/files/download/id/3680"
  },
  {
    name: "Kinna Sona ",
    artist: "Sunil Kamath",
    image: "https://m.media-amazon.com/images/M/MV5BMDAwMDAzYjQtMjRlMS00YzYzLTllMGItZmQyM2E5ZjdmZTY4XkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_.jpg",
    path: "https://mp3wale.info/uploads/file/57e123ba636f6.mp3"
  },
  {
    name: "Hey Mama Mp3",
    artist: "Nicki Minaj, Bebe Rexha",
    image: "https://www.billboard.com/wp-content/uploads/media/Bebe-Rexha-Nicki-Minaj-No-Broken-Hearts-album-art-2016-billboard-620-2.jpg?w=620",
    path:  "https://bizziroute.com/mp3-songs/downloads/david-guetta/hey-mama.mp3"
  },
  {
    name: "Sajde Mp3",
    artist: "Pritam, Sunidhi Chauhan, KK, Shahid",
    image: "https://pagalsong.in/uploads//thumbnails/300x300/id3Picture_563363831.jpg",
    path:  "https://pagalsong.in/uploads/systemuploads/mp3/Khatta%20Meetha/Sajde%20Ki%20Ye%20Hai%20Lakhoin%20-%20Khatta%20Meetha%20128%20Kbps.mp3"
  },
  {
    name: "Aashiyan mp3",
    artist: "Shreya Ghoshal, Nikhil Paul George",
    image: "https://www.filmibeat.com/ph-big/2012/08/barfi!_13462260780.jpg",
    path:  "https://pagalsong.in/uploads/systemuploads/mp3/Barfi/Aashiyan%20-%20Barfi%20128%20Kbps.mp3"
  },
  
];

function random_bg_color() {

  // Get a number between 64 to 256 (for getting lighter colors)
  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;

  // Construct a color withe the given values
  let bgColor = "rgb(" + red + "," + green + "," + blue + ")";

  // Set the background to that color
  document.body.style.background = bgColor;
}

function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = track_list[track_index].path;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  now_playing.textContent = "PLAYING " + (track_index + 1) + " OF " + track_list.length;

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
  random_bg_color();
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

// Load the first track in the tracklist
loadTrack(track_index);

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
}

function nextTrack() {
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}


