const apologyText = `Riiiitttsss —\n\nI’m sorry. I messed up and I know I hurt you.\n\nI wanna say that you means alot to me .\n\nIf i am really sorry riiiitttsss, I'll always be with you.You're important to me and you'll be always. 💖`;

function typeText(element, text, speed=24){
  element.textContent = '';
  let i=0;
  (function step(){
    if(i<text.length){
      element.textContent += text[i++];
      setTimeout(step, Math.max(6, speed - (i/10)));
    }
  })();
}

function spawnHeart(x=null){
  const container = document.querySelector('.hearts');
  const heart = document.createElement('div');
  heart.className = 'heart';
  const size = 24 + Math.floor(Math.random()*36);
  heart.style.width = `${size}px`;
  heart.style.height = `${size}px`;
  const left = x !== null ? x - size/2 : Math.random()*window.innerWidth;
  heart.style.left = `${left}px`;
  heart.style.bottom = `-40px`;
  heart.innerHTML = `
    <svg viewBox="0 0 24 24" fill="#ffc9d2" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 21s-1-.6-2.3-1.6C6.1 16.6 2 13.8 2 9.8 2 7 4 5 6.5 5c1.5 0 2.9.8 3.5 2 .6-1.2 2-2 3.5-2C16 5 18 7 18 9.8c0 4-4.1 6.8-7.7 9.6C13 20.4 12 21 12 21z"/>
    </svg>`;
  container.appendChild(heart);

  const duration = 4800 + Math.random()*1600;
  const drift = (Math.random()-0.5) * 200;

  heart.animate([
    {transform: `translateY(0) translateX(0) scale(0.9)`, opacity:1},
    {transform: `translateY(-${window.innerHeight + 200}px) translateX(${drift}px) scale(1)`, opacity:0}
  ],{duration, easing:'cubic-bezier(.2,.8,.2,1)'});

  setTimeout(()=> heart.remove(), duration+200);
}

for(let i=0;i<6;i++) setTimeout(()=>spawnHeart(), i*700);

const btn = document.getElementById('reveal-btn');
const flower = document.getElementById('flower-btn');
const p = document.getElementById('apology-text');

btn.addEventListener('click', ()=>{
  btn.disabled = true;
  btn.textContent = 'Opening…';
  typeText(p, apologyText, 20);
  for(let i=0;i<12;i++) setTimeout(()=>spawnHeart(window.innerWidth/2 + (Math.random()-0.5)*200), i*120);
  setTimeout(()=>{btn.textContent = 'Opened';}, 1800);
});

flower.addEventListener('click', (e)=>{
  const rect = e.currentTarget.getBoundingClientRect();
  const x = rect.left + rect.width/2;
  for(let i=0;i<10;i++) setTimeout(()=>spawnHeart(x + (Math.random()-0.5)*120), i*80);
});

document.addEventListener('keydown', (e)=>{
  if((e.key === 'Enter' || e.key === ' ') && !btn.disabled){ btn.click(); }
});