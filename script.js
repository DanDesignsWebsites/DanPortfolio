const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('show');
  });
}, { threshold: 0.28 });
sections.forEach(s => observer.observe(s));

const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
resizeCanvas();
window.addEventListener('resize', () => {
  resizeCanvas();
  initParticles();
});

let particles = [];
function initParticles() {
  particles = [];
  const count = Math.max(50, Math.floor((canvas.width * canvas.height) / 14000));
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      s: Math.random() * 1.5 + 0.6,
      dx: (Math.random() - 0.5) * 0.45,
      dy: (Math.random() - 0.5) * 0.45
    });
  }
}
initParticles();

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let p of particles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(130,150,200,0.07)';
    ctx.fill();
    p.x += p.dx;
    p.y += p.dy;
    if (p.x < -10 || p.x > canvas.width + 10) p.dx *= -1;
    if (p.y < -10 || p.y > canvas.height + 10) p.dy *= -1;
  }
  requestAnimationFrame(animate);
}
animate();

const roleEl = document.querySelector('.role');
const roles = [
  "Frontend Dev • Arduino Tinkerer • Game Maker • Egypt-based"
];
let rIndex = 0, cIndex = 0, typing = false;

const roleObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      if (!typing) typeRole();
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
roleObserver.observe(roleEl);

function typeRole() {
  typing = true;
  if (cIndex < roles[rIndex].length) {
    roleEl.textContent += roles[rIndex].charAt(cIndex);
    cIndex++;
    setTimeout(typeRole, 56);
  } else {
    setTimeout(() => {
      roleEl.textContent = '';
      cIndex = 0;
      rIndex = (rIndex + 1) % roles.length;
      setTimeout(typeRole, 480);
    }, 1400);
  }
}

const orbCount = 6;
const orbCanvas = document.createElement('canvas');
const orbCtx = orbCanvas.getContext('2d');
orbCanvas.id = 'orbs';
document.body.appendChild(orbCanvas);
Object.assign(orbCanvas.style, {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: '-1',
  pointerEvents: 'none'
});
orbCanvas.width = innerWidth;
orbCanvas.height = innerHeight;

let orbs = Array.from({ length: orbCount }, () => ({
  x: Math.random() * orbCanvas.width,
  y: Math.random() * orbCanvas.height,
  r: Math.random() * 120 + 60,
  dx: (Math.random() - 0.5) * 0.3,
  dy: (Math.random() - 0.5) * 0.3,
  c: `rgba(${Math.floor(80 + Math.random()*80)}, ${Math.floor(100 + Math.random()*90)}, ${Math.floor(220 + Math.random()*35)}, 0.05)`
}));

function drawOrbs() {
  orbCtx.clearRect(0, 0, orbCanvas.width, orbCanvas.height);
  for (let orb of orbs) {
    orbCtx.beginPath();
    orbCtx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2);
    orbCtx.fillStyle = orb.c;
    orbCtx.fill();
    orb.x += orb.dx;
    orb.y += orb.dy;
    if (orb.x < -200 || orb.x > orbCanvas.width + 200) orb.dx *= -1;
    if (orb.y < -200 || orb.y > orbCanvas.height + 200) orb.dy *= -1;
  }
  requestAnimationFrame(drawOrbs);
}
drawOrbs();
