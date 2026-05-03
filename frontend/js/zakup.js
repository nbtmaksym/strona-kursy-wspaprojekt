window.addEventListener('load', function() {
  if (!localStorage.getItem('token')) {
    window.location.href = 'login.html';
  }
});

emailjs.init('OauThvHsZTmta6WmX');

const EMAILJS_SERVICE_ID  = 'service_04jy9fz';
const EMAILJS_TEMPLATE_ID = 'template_7hin0gf';


const KURSY_INFO = {
  1: { nazwa: "HTML & CSS — od zera do bohatera",   ikona: "🌐", tag: "tag-beginner", tagNazwa: "Początkujący", meta: "⏱ 12h · 48 lekcji", cena: 149 },
  2: { nazwa: "JavaScript — interaktywne strony",   ikona: "💻", tag: "tag-beginner", tagNazwa: "Początkujący", meta: "⏱ 18h · 72 lekcje",  cena: 199 },
  3: { nazwa: "Python — pierwsze kroki",             ikona: "🐍", tag: "tag-beginner", tagNazwa: "Początkujący", meta: "⏱ 14h · 55 lekcji", cena: 179 },
  4: { nazwa: "React.js — nowoczesny frontend",      ikona: "⚛️", tag: "tag-mid",      tagNazwa: "Średni",       meta: "⏱ 22h · 90 lekcji", cena: 299 },
  5: { nazwa: "Python — analiza danych",             ikona: "📊", tag: "tag-mid",      tagNazwa: "Średni",       meta: "⏱ 20h · 80 lekcji", cena: 249 },
  6: { nazwa: "UI/UX Design — podstawy",             ikona: "🎨", tag: "tag-mid",      tagNazwa: "Średni",       meta: "⏱ 16h · 64 lekcje", cena: 229 },
  7: { nazwa: "Node.js & REST API",                  ikona: "🖥️", tag: "tag-adv",      tagNazwa: "Zaawansowany", meta: "⏱ 25h · 100 lekcji", cena: 349 },
  8: { nazwa: "UI/UX Design — Figma Pro",            ikona: "✏️", tag: "tag-adv",      tagNazwa: "Zaawansowany", meta: "⏱ 16h · 64 lekcje",  cena: 279 },
  9: { nazwa: "Machine Learning z Pythonem",         ikona: "🤖", tag: "tag-adv",      tagNazwa: "Zaawansowany", meta: "⏱ 30h · 120 lekcji", cena: 399 },
};


window.addEventListener('load', function() {
  const params = new URLSearchParams(window.location.search);
  const kursId = parseInt(params.get('id')) || 1;
  const kurs = KURSY_INFO[kursId];

  if (kurs) {
    document.getElementById('zakupIcon').textContent    = kurs.ikona;
    document.getElementById('zakupNazwa').textContent   = kurs.nazwa;
    document.getElementById('zakupTag').className       = 'tag ' + kurs.tag;
    document.getElementById('zakupTag').textContent     = kurs.tagNazwa;
    document.getElementById('zakupMeta').textContent    = kurs.meta;
    document.getElementById('zakupCena').textContent    = kurs.cena + ' zł';
    document.getElementById('zakupTotal').textContent   = kurs.cena + ' zł';
    document.getElementById('zakupBtnCena').textContent = kurs.cena + ' zł';
    document.getElementById('successKursNazwa').textContent = kurs.nazwa;
  }
});


function formatujKarte(input) {
  let value = input.value.replace(/\D/g, ''); // usuń nie-cyfry
  let formatted = value.match(/.{1,4}/g);      // podziel po 4 cyfry
  input.value = formatted ? formatted.join(' ') : value;
}


function formatujDate(input) {
  let value = input.value.replace(/\D/g, '');
  if (value.length >= 2) {
    value = value.substring(0, 2) + '/' + value.substring(2, 4);
  }
  input.value = value;
}


const zakupForm = document.getElementById('zakupForm');

zakupForm.addEventListener('submit', async function(event) {
  event.preventDefault();

  const imie          = document.getElementById('imie').value.trim();
  const email         = document.getElementById('email').value.trim();
  const karta         = document.getElementById('karta').value.trim();
  const dataWaznosci  = document.getElementById('dataWaznosci').value.trim();
  const cvv           = document.getElementById('cvv').value.trim();
  const msg           = document.getElementById('zakupMsg');

  msg.className = 'form-msg';
  msg.style.display = 'none';


  if (imie === '' || email === '') {
    msg.className = 'form-msg error';
    msg.textContent = '❌ Uzupełnij imię i email';
    return;
  }

  if (!email.includes('@') || !email.includes('.')) {
    msg.className = 'form-msg error';
    msg.textContent = '❌ Podaj prawidłowy email';
    return;
  }

  const kartaBezSpacji = karta.replace(/\s/g, '');
  if (kartaBezSpacji.length !== 16) {
    msg.className = 'form-msg error';
    msg.textContent = '❌ Numer karty musi mieć 16 cyfr';
    return;
  }

  if (dataWaznosci.length !== 5) {
    msg.className = 'form-msg error';
    msg.textContent = '❌ Podaj datę ważności (MM/RR)';
    return;
  }

  if (cvv.length !== 3) {
    msg.className = 'form-msg error';
    msg.textContent = '❌ CVV musi mieć 3 cyfry';
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const kursId = parseInt(params.get('id')) || 1;
  const kurs   = KURSY_INFO[kursId];

  const btn = document.getElementById('zakupBtn');
  btn.textContent = 'Przetwarzanie...';
  btn.disabled = true;

  localStorage.setItem('user_name', imie);
  localStorage.setItem('user_email', email);

  const zakupioneCursy = JSON.parse(localStorage.getItem('zakupione_kursy') || '[]');
  if (!zakupioneCursy.includes(kursId)) {
    zakupioneCursy.push(kursId);
    localStorage.setItem('zakupione_kursy', JSON.stringify(zakupioneCursy));
  }

 try {
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      imie:        imie,
      nazwa_kursu: kurs.nazwa,
      cena:        kurs.cena,
      data:        new Date().toLocaleDateString('pl-PL'),
      to_email:    email,
    });

    document.getElementById('successModal').classList.add('open');

  } catch (error) {
    console.error('EmailJS error:', error);
    document.getElementById('successModal').classList.add('open');

  } finally {
    btn.textContent = 'Zapłać ' + kurs.cena + ' zł →';
    btn.disabled = false;
  }
});
