// =============================================================
// Typed "whoami" effect in the hero prompt line
// =============================================================
(function typeRole(){
  const el = document.getElementById('typedRole');
  if(!el) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const line = 'whoami → AI Trainee Engineer & Competitive Programmer';

  if(prefersReduced){
    el.textContent = line;
    return;
  }

  let i = 0;
  function step(){
    if(i <= line.length){
      el.textContent = line.slice(0, i);
      i++;
      setTimeout(step, 28);
    }
  }
  step();
})();

// =============================================================
// Mobile nav toggle
// =============================================================
(function navToggle(){
  const nav = document.getElementById('nav');
  const btn = document.getElementById('navToggle');
  if(!nav || !btn) return;

  btn.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
})();

// =============================================================
// Subtle hover lift on project cards only (everything else stays
// static and immediately visible — no scroll-triggered hiding,
// so content is never dependent on JS timing).
// =============================================================
