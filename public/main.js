const planeContainer = document.getElementById('movablePlane');
const planeSonicBoom = document.getElementById('sonicBoom');

function easeOutCubic(x) {
  return 1 - Math.pow(1 - x, 15)
}

self.addEventListener('scroll', () => {
  const offset = self.scrollY;
  const mediaQuery = self.matchMedia('(min-width: 640px)');
  const scrollStart = 0;
  const scrollEnd = 300;
  const progress = (scrollY - scrollStart) / (scrollEnd - scrollStart);
  const clampedProgress = Math.max(0, Math.min(1, progress));
  const opacity = easeOutCubic(clampedProgress);
  planeSonicBoom.style.opacity = opacity;

  if (!mediaQuery.matches) {
    planeContainer.style.transform = '';
    return
  }

  planeContainer.style.transform = `translateX(-${offset}px) translateY(-${offset * 5}px)`;
});

const audio = document.getElementById('music-player');
const muteButton = document.getElementById('mute-button');

self.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('background-music');

  if (!audio) {
    console.error("Audio element not found!");
    return;
  }
  audio.volume = 0.1;

  const playPromise = audio.play();

  if (playPromise !== undefined) {
    playPromise.then(_ => {
      console.log("Background music is playing.");
    })
    .catch(error => {
      console.warn("Autoplay was blocked by the browser.", error);
    });
  }

});

muteButton.addEventListener('click', () => {
    audio.muted = !audio.muted;
    muteButton.textContent = audio.muted ? "Unmute" : "Mute";
});
