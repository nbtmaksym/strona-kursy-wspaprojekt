const themeBtn = document.getElementById('themeBtn');

if (themeBtn) {
  themeBtn.addEventListener('click', function() {
    const aktualny = document.documentElement.getAttribute('data-theme');
    if (aktualny === 'dark') {
      document.documentElement.setAttribute('data-theme', 'light');
      themeBtn.textContent = '☀️';
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      themeBtn.textContent = '🌙';
    }
  });
}


const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  mobileMenu.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });
}


const obserwator = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
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
