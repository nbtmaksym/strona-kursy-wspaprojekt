const obserwator = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(function(el) {
  obserwator.observe(el);
});

const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const name    = document.getElementById('name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const msg     = document.getElementById('formMsg');

    msg.className = 'form-msg';

    if (name === '' || email === '' || message === '') {
      msg.className = 'form-msg error';
      msg.textContent = '❌ Uzupełnij wszystkie wymagane pola (oznaczone *)';
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      msg.className = 'form-msg error';
      msg.textContent = '❌ Podaj prawidłowy adres email';
      return;
    }

    msg.className = 'form-msg success';
    msg.textContent = '✅ Wiadomość wysłana! Odpiszemy w ciągu 24 godzin.';
    contactForm.reset();
  });
}
function animujLiczniki() {
  const liczniki = document.querySelectorAll('.stat-num[data-target]');
  if (liczniki.length === 0) return;

  liczniki.forEach(function(el) {
    const target  = parseFloat(el.getAttribute('data-target'));
    const suffix  = el.getAttribute('data-suffix') || '';
    const czyFloat = target % 1 !== 0;
    const czas    = 1800;
    const krok    = 16;
    const kroki   = czas / krok;
    let aktualny  = 0;
    let i         = 0;

    const interval = setInterval(function() {
      i++;
      aktualny = czyFloat
        ? parseFloat((target * (i / kroki)).toFixed(1))
        : Math.round(target * (i / kroki));

      if (i >= kroki) {
        aktualny = target;
        clearInterval(interval);
      }

      if (target >= 1000) {
        el.textContent = (aktualny / 1000).toFixed(0) + 'k' + suffix;
      } else {
        el.textContent = aktualny + suffix;
      }
    }, krok);
  });
}

const heroObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      animujLiczniki();
      heroObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) heroObserver.observe(heroStats);