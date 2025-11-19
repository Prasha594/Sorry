// Inputs
const nameInput = document.getElementById("name");
const noteInput = document.getElementById("note");

// Buttons
const previewBtn = document.getElementById("previewBtn");
const resetBtn = document.getElementById("resetBtn");
const githubBtn = document.getElementById("githubBtn");
const downloadBtn = document.getElementById("downloadBtn");

// Music
const musicToggle = document.getElementById("musicToggle");
const bgMusic = document.getElementById("bgMusic");

// Result
const result = document.getElementById("result");
const resultTitle = document.getElementById("resultTitle");
const resultMessage = document.getElementById("resultMessage");
const heartBtn = document.getElementById("heartBtn");
const downloadResultBtn = document.getElementById("downloadResultBtn");

// Capture target
const cardToCapture = document.getElementById("cardToCapture");


// Prepare message
function formatMessage(name, note){
  const who = name || "you";
  const msg = note || 
    "I am truly sorry. I never wanted to hurt you. You mean a lot to me, and I hope you can forgive me.";

  return `Dear ${who},\n\n${msg}\n\nWith love.`;
}


// Preview button
previewBtn.onclick = () => {
  const name = nameInput.value.trim();
  const note = noteInput.value.trim();

  resultTitle.textContent = name ? `For ${name}` : "For someone special";
  resultMessage.textContent = formatMessage(name, note);

  result.classList.remove("hidden");
  burstHearts(16);
};


// Reset
resetBtn.onclick = () => {
  nameInput.value = "";
  noteInput.value = "";
  result.classList.add("hidden");
};


// GitHub
githubBtn.onclick = () => {
  window.open("https://github.com/new", "_blank");
};


// Music toggle
let playing = false;
musicToggle.onclick = () => {
  if(!playing){
    bgMusic.play();
    musicToggle.textContent = "Pause Music ⏸";
    playing = true;
  } else {
    bgMusic.pause();
    musicToggle.textContent = "Play Music 🎵";
    playing = false;
  }
};


// Heart burst animation
function burstHearts(n){
  const emojis = ["💖","💗","💞","🌸","✨"];
  for(let i=0;i<n;i++){
    const e = document.createElement("div");
    e.textContent = emojis[Math.floor(Math.random()*emojis.length)];
    e.style.position = "fixed";
    e.style.left = (40 + Math.random()*20) + "%";
    e.style.top = "40%";
    e.style.fontSize = (16 + Math.random()*24) + "px";
    e.style.transition = "1.6s";
    document.body.appendChild(e);

    requestAnimationFrame(()=>{
      e.style.transform = "translateY(-120px) scale(1.3)";
      e.style.opacity = "0";
    });

    setTimeout(()=>e.remove(),1600);
  }
}

heartBtn.onclick = () => burstHearts(22);


// Download card as image
function saveImage(el, filename){
  html2canvas(el, {scale:2}).then(canvas=>{
    canvas.toBlob(blob=>{
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    });
  });
}

downloadBtn.onclick = () => {
  if(result.classList.contains("hidden")){
    alert("Please preview first!");
    return;
  }
  saveImage(cardToCapture, "apology-card.png");
};

downloadResultBtn.onclick = () => saveImage(cardToCapture, "apology-card.png");


// ----------------------
// PETALS ANIMATION
// ----------------------
const canvas = document.getElementById("petals");
const ctx = canvas.getContext("2d");

let W = canvas.width = window.innerWidth;
let H = canvas.height = window.innerHeight;

const petals = [];
const PETAL_COUNT = Math.max(20, Math.floor(W/40));

function rand(a,b){ return Math.random()*(b-a)+a; }

class Petal{
  constructor(){ this.reset(true); }

  reset(initial){
    this.x = rand(-50, W+50);
    this.y = initial ? rand(0,H) : -20;
    this.size = rand(10,20);
    this.vx = rand(-0.4,0.4);
    this.vy = rand(0.4,1.2);
    this.angle = rand(0,Math.PI*2);
    this.spin = rand(-0.03,0.03);
  }

  update(){
    this.x += this.vx;
    this.y += this.vy;
    this.angle += this.spin;
    if(this.y > H+20) this.reset(false);
  }

  draw(){
    ctx.save();
    ctx.translate(this.x,this.y);
    ctx.rotate(this.angle);
    ctx.fillStyle = "rgba(255,130,165,0.85)";
    ctx.beginPath();
    ctx.ellipse(0,0,this.size*0.7,this.size,0,0,Math.PI*2);
    ctx.fill();
    ctx.restore();
  }
}

function initPetals(){
  petals.length = 0;
  for(let i=0;i<PETAL_COUNT;i++) petals.push(new Petal());
}

function animate(){
  ctx.clearRect(0,0,W,H);
  petals.forEach(p=>{ p.update(); p.draw(); });
  requestAnimationFrame(animate);
}

window.onresize = () => {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
  initPetals();
};

initPetals();
animate();