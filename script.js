// Simple, automatic apology page for "Riiiiiitttsss"
// - auto-shows message
// - falling petals canvas
// - auto confetti/hearts burst on load
// - attempts to autoplay ambient audio (may be blocked by some browsers)

document.addEventListener('DOMContentLoaded', () => {
  const MSG_EL = document.getElementById('message');
  const AUDIO = document.getElementById('bg');

  // 1) Prebuilt apology message (no inputs) — addressed to Riiiiiitttsss
  const text = `Dear Riiiiiitttsss,

I am truly sorry for what I did. I never meant to hurt you. 
You mean so much to me — your smile, your laughter, your kindness.
If you'll allow me, I'd like to make it right and be better for you.

Always — with love.`;

  MSG_EL.textContent = text;

  // 2) Start visual celebrations immediately
  startPetals();
  burstConfetti(28);      // celebratory emojis
  setTimeout(()=> burstConfetti(14), 900);
  setTimeout(()=> burstConfetti(10), 1700);

  // 3) Attempt to autoplay ambient audio (muted play to satisfy autoplay rules, then unmute if possible)
  // Note: many browsers block unmuted autoplay; we try best-effort.
  try {
    AUDIO.volume = 0.0;
    AUDIO.muted = true;
    const playPromise = AUDIO.play();
    if (playPromise !== undefined) {
      playPromise.then(()=> {
        // after brief silence, attempt gentle fade-in/unmute (may still be blocked)
        setTimeout(()=> {
          try {
            AUDIO.muted = false;
            // ramp volume up slowly
            let v = 0.0;
            const target = 0.18;
            const step = 0.02;
            const t = setInterval(()=> {
              v += step;
              AUDIO.volume = Math.min(v, target);
              if (v >= target) clearInterval(t);
            }, 260);
          } catch(e){}
        }, 700);
      }).catch(()=> {
        // play blocked — leave muted; sound will start if user interacts
        AUDIO.muted = true;
      });
    }
  } catch(e){
    // ignore audio errors
  }

  // OPTIONAL: If the browser blocked sound, clicking anywhere will start audio
  document.body.addEventListener('click', enableAudioOnce, {once:true});
  function enableAudioOnce(){
    try{ AUDIO.muted = false; AUDIO.play().catch(()=>{}); }catch(e){}
  }
});


// -------------------- PETALS CANVAS --------------------
function startPetals(){
  const canvas = document.getElementById('petals');
  const ctx = canvas.getContext('2d');
  let W = canvas.width = window.innerWidth;
  let H = canvas.height = window.innerHeight;

  const petals = [];
  const COUNT = Math.max(20, Math.floor(W/40));

  function rand(a,b){ return Math.random()*(b-a)+a; }

  class Petal {
    constructor(i){
      this.reset(true);
    }
    reset(init){
      this.x = rand(-50, W+50);
      this.y = init ? rand(0,H) : rand(-60,-10);
      this.size = rand(8,20);
      this.vx = rand(-0.4,0.6);
      this.vy = rand(0.4,1.2);
      this.angle = rand(0,Math.PI*2);
      this.spin = rand(-0.03,0.03);
      this.color = `rgba(255,${120+Math.floor(rand(-10,40))},${150+Math.floor(rand(-10,40))},0.92)`;
    }
    update(){
      this.x += this.vx;
      this.y += this.vy;
      this.angle += this.spin;
      if(this.y > H + 30 || this.x < -80 || this.x > W + 80) this.reset(false);
    }
    draw(){
      ctx.save();
      ctx.translate(this.x,this.y);
      ctx.rotate(this.angle);
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.ellipse(0,0,this.size*0.6,this.size,0,0,Math.PI*2);
      ctx.fill();
      ctx.restore();
    }
  }

  for(let i=0;i<COUNT;i++) petals.push(new Petal(true));

  function loop(){
    ctx.clearRect(0,0,W,H);
    for (const p of petals){ p.update(); p.draw(); }
    requestAnimationFrame(loop);
  }
  loop();

  window.addEventListener('resize', ()=> {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  });
}


// -------------------- CONFETTI / EMOJI BURST --------------------
function burstConfetti(count = 20){
  const pool = ['💖','🌸','✨','🎉','💌','❤️'];
  for (let i=0;i<count;i++){
    const el = document.createElement('div');
    el.className = 'confetti';
    el.textContent = pool[Math.floor(Math.random()*pool.length)];
    const left = 10 + Math.random()*80;
    const size = 12 + Math.random()*28;
    el.style.left = left + 'vw';
    el.style.top = (60 + Math.random()*20) + 'vh';
    el.style.fontSize = size + 'px';
    document.body.appendChild(el);

    // animate upward and fading
    requestAnimationFrame(()=> {
      el.style.transition = `transform ${1.6+Math.random()}s cubic-bezier(.2,.9,.2,1), opacity 1.6s`;
      const dx = (Math.random()-0.5)*40;
      const dy = -120 - Math.random()*80;
      el.style.transform = `translate(${dx}px, ${dy}px) rotate(${Math.random()*720}deg)`;
      el.style.opacity = '0';
    });

    setTimeout(()=> el.remove(), 2200);
  }
}