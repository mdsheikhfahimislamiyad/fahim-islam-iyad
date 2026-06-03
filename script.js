// Enter button
document.getElementById('enterBtn').addEventListener('click', () => {
  document.getElementById('entry').style.display = 'none';
  document.getElementById('site').classList.remove('hidden');
  revealOnScroll();
});

// Ripple effect
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', e => {
    const r = document.createElement('span');
    r.className = 'ripple';
    const d = Math.max(btn.clientWidth, btn.clientHeight);
    r.style.width = r.style.height = d + 'px';
    r.style.left = e.offsetX - d/2 + 'px';
    r.style.top = e.offsetY - d/2 + 'px';
    btn.appendChild(r);
    setTimeout(() => r.remove(), 600);
  });
});

// Typing effect
const roles = ['Web Designer','Web Developer','Professional Photo Editor','YouTuber','Creative Digital Creator'];
let ri = 0, ci = 0, del = false;
const typeEl = document.getElementById('type');
(function type(){
  const w = roles[ri];
  typeEl.textContent = del ? w.slice(0, ci--) : w.slice(0, ci++);
  if(!del && ci === w.length+1){ del = true; setTimeout(type, 1400); return; }
  if(del && ci === 0){ del = false; ri = (ri+1) % roles.length; }
  setTimeout(type, del ? 50 : 110);
})();

// Particles
const c = document.getElementById('particles'), x = c.getContext('2d');
let ps = [];
function resize(){ c.width = innerWidth; c.height = innerHeight; }
resize(); addEventListener('resize', resize);
for(let i=0;i<90;i++) ps.push({
  x:Math.random()*c.width, y:Math.random()*c.height,
  r:Math.random()*2+1, dx:(Math.random()-.5)*.6, dy:(Math.random()-.5)*.6,
  h:Math.random()*360
});
(function draw(){
  x.clearRect(0,0,c.width,c.height);
  ps.forEach(p=>{
    p.x+=p.dx; p.y+=p.dy; p.h=(p.h+.5)%360;
    if(p.x<0||p.x>c.width)p.dx*=-1;
    if(p.y<0||p.y>c.height)p.dy*=-1;
    x.beginPath(); x.arc(p.x,p.y,p.r,0,7);
    x.fillStyle=`hsl(${p.h},100%,60%)`;
    x.shadowBlur=12; x.shadowColor=`hsl(${p.h},100%,60%)`;
    x.fill();
  });
  requestAnimationFrame(draw);
})();

// Scroll reveal
function revealOnScroll(){
  document.querySelectorAll('.reveal').forEach(el=>{
    if(el.getBoundingClientRect().top < innerHeight - 80) el.classList.add('show');
  });
}
addEventListener('scroll', revealOnScroll);

// 3D tilt on project cards
document.querySelectorAll('.tilt').forEach(card=>{
  card.addEventListener('mousemove', e=>{
    const b = card.getBoundingClientRect();
    const rx = ((e.clientY-b.top)/b.height - .5) * -12;
    const ry = ((e.clientX-b.left)/b.width - .5) * 12;
    card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.04)`;
  });
  card.addEventListener('mouseleave', ()=> card.style.transform = '');
});
