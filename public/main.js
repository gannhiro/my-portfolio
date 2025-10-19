const planeContainer = document.getElementById('movablePlane');
const planeSonicBoom = document.getElementById('sonicBoom');

function customEaseOut(x) {
  return 1 - Math.pow(1 - x, 3)
}

self.addEventListener('scroll', () => {
  const offset = self.scrollY;
  const mediaQuery = self.matchMedia('(min-width: 640px)');
  const scrollStart = 0;
  const scrollEnd = 300;
  const progress = (scrollY - scrollStart) / (scrollEnd - scrollStart);
  const clampedProgress = Math.max(0, Math.min(1, progress));
  const opacity = customEaseOut(clampedProgress);
  planeSonicBoom.style.opacity = opacity;

  if (!mediaQuery.matches) {
    planeContainer.style.transform = '';
    return
  }

  planeContainer.style.transform = `translateX(-${offset}px) translateY(-${offset * 5}px)`;
});

const audioSource = document.getElementById('background-music');
const volumeImage = document.getElementById('volume-image');
const muteButton = document.getElementById('mute-button');

async function attemptToPlayAudio() {
  if (!audioSource) return;

  audioSource.volume = 0.15;

  try {
    await audioSource.play();
    volumeImage.src = "./assets/unmuted.webp"
  } catch (_) {
    audioSource.muted = true;
  }
}

self.addEventListener('DOMContentLoaded', () => {
  attemptToPlayAudio()
})

muteButton.addEventListener('click', async () => {
    if (audioSource.paused) await audioSource.play();
    audioSource.muted = !audioSource.muted;
    volumeImage.src = audioSource.muted ? "./assets/muted.webp" : "./assets/unmuted.webp"
});
