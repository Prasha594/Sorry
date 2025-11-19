const quotes = [
  "You are stronger than you think 💪",
  "You make the world brighter just by being in it 🌷",
  "You deserve all the love and care 🌸",
  "Take a deep breath — everything will be okay 🌤️",
  "You’re doing your best, and that’s enough 💖",
  "You are a beautiful human being 🌼",
  "Never forget: You matter, always 💫",
  "Even the stars envy your glow ✨",
];

const quoteElement = document.getElementById("quote");
const newQuoteBtn = document.getElementById("new-quote");

newQuoteBtn.addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  quoteElement.textContent = quotes[randomIndex];
});

// Create floating hearts dynamically
const heartsContainer = document.querySelector(".hearts");

function createHeart() {
  const heart = document.createElement("span");
  const size = Math.random() * 20 + 10 + "px";
  heart.style.width = size;
  heart.style.height = size;
  heart.style.left = Math.random() * 100 + "%";
  heart.style.background =
    ["#ff8fb1", "#ffc1cc", "#ffd6e0", "#ffb6c1"][
      Math.floor(Math.random() * 4)
    ];

  heart.style.animationDuration = Math.random() * 3 + 4 + "s";
  heartsContainer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 7000);
}

setInterval(createHeart, 300);