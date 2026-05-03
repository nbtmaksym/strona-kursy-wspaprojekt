const KURSY = {
  1: {
    id: 1,
    nazwa: "HTML & CSS — od zera do bohatera",
    ikona: "🌐",
    moduly: [
      {
        nazwa: "Moduł 1: Podstawy HTML",
        lekcje: [
          { id: 1, nazwa: "Czym jest HTML?", opis: "Poznasz strukturę dokumentu HTML, znaczniki i atrybuty. Dowiesz się jak przeglądarka interpretuje kod." },
          { id: 2, nazwa: "Pierwsze tagi", opis: "Nauczysz się podstawowych tagów: h1-h6, p, div, span, a, img. Zbudujesz pierwszą stronę." },
          { id: 3, nazwa: "Formularze HTML", opis: "Tworzenie formularzy — input, textarea, select, button. Atrybuty walidacji." },
          { id: 4, nazwa: "Semantyczny HTML5", opis: "Tagi semantyczne: header, nav, main, section, article, footer. Dlaczego są ważne." },
        ]
      },
      {
        nazwa: "Moduł 2: CSS od podstaw",
        lekcje: [
          { id: 5, nazwa: "Selektory CSS", opis: "Selektory elementów, klas, ID, pseudoklasy. Jak trafiać w odpowiednie elementy." },
          { id: 6, nazwa: "Box Model", opis: "Margin, padding, border, width, height. Jak przeglądarka liczy przestrzeń elementów." },
          { id: 7, nazwa: "Kolory i typografia", opis: "Jednostki kolorów, czcionki, line-height, letter-spacing, Google Fonts." },
          { id: 8, nazwa: "Flexbox", opis: "Układanie elementów w wierszu i kolumnie. justify-content, align-items, gap, flex-wrap." },
        ]
      },
      {
        nazwa: "Moduł 3: Projekt końcowy",
        lekcje: [
          { id: 9, nazwa: "Planowanie layoutu", opis: "Wireframe, dobór kolorów i czcionek, przygotowanie struktury projektu." },
          { id: 10, nazwa: "Kodowanie layoutu", opis: "Budujemy stronę krok po kroku — header, hero, sekcje, footer." },
          { id: 11, nazwa: "Responsywność", opis: "Media queries, viewport, mobile-first. Strona działa na telefonie i komputerze." },
          { id: 12, nazwa: "Publikacja", opis: "GitHub Pages — jak opublikować stronę za darmo. Domena i hosting." },
        ]
      }
    ]
  },
  2: {
    id: 2,
    nazwa: "JavaScript — interaktywne strony",
    ikona: "💻",
    moduly: [
      {
        nazwa: "Moduł 1: Podstawy JS",
        lekcje: [
          { id: 1, nazwa: "Czym jest JavaScript?", opis: "Historia JS, jak działa w przeglądarce, gdzie pisać kod, pierwsze console.log." },
          { id: 2, nazwa: "Zmienne i typy danych", opis: "let, const, var. Typy: string, number, boolean, null, undefined. Konwersja typów." },
          { id: 3, nazwa: "Operatory", opis: "Arytmetyczne, porównania, logiczne, przypisania. Kolejność działań." },
          { id: 4, nazwa: "Warunki if/else", opis: "Instrukcje warunkowe, switch, operator trójkowy. Logika w programie." },
        ]
      },
      {
        nazwa: "Moduł 2: Funkcje i pętle",
        lekcje: [
          { id: 5, nazwa: "Pętle for i while", opis: "Iterowanie po liczbach, tablicach. break i continue. Zagnieżdżone pętle." },
          { id: 6, nazwa: "Funkcje", opis: "Deklarowanie funkcji, parametry, return. Arrow functions. Scope zmiennych." },
          { id: 7, nazwa: "Tablice", opis: "Tworzenie tablic, metody: push, pop, map, filter, forEach, find. Spread operator." },
          { id: 8, nazwa: "Obiekty", opis: "Tworzenie obiektów, właściwości, metody, destructuring, JSON." },
        ]
      },
      {
        nazwa: "Moduł 3: DOM",
        lekcje: [
          { id: 9, nazwa: "Czym jest DOM?", opis: "Drzewo dokumentu, węzły, jak JavaScript widzi HTML." },
          { id: 10, nazwa: "Manipulacja DOM", opis: "getElementById, querySelector, innerHTML, textContent, style, classList." },
          { id: 11, nazwa: "Zdarzenia (Events)", opis: "addEventListener, click, submit, keydown, mouseover. Event object." },
          { id: 12, nazwa: "Projekt: Kalkulator", opis: "Budujemy działający kalkulator od zera. HTML + CSS + JS razem." },
        ]
      },
      {
        nazwa: "Moduł 4: Async i API",
        lekcje: [
          { id: 13, nazwa: "Callbacks i Promise", opis: "Asynchroniczność w JS, callback hell, Promise, .then() i .catch()." },
          { id: 14, nazwa: "Async/Await", opis: "Nowoczesna składnia asynchroniczna. try/catch. Czekanie na dane." },
          { id: 15, nazwa: "Fetch API", opis: "Pobieranie danych z zewnętrznych API przez fetch(). Parsowanie JSON." },
          { id: 16, nazwa: "Projekt: Aplikacja pogodowa", opis: "Łączymy się z prawdziwym API pogodowym i wyświetlamy dane na stronie." },
        ]
      }
    ]
  },
  3: {
    id: 3,
    nazwa: "Python — pierwsze kroki",
    ikona: "🐍",
    moduly: [
      {
        nazwa: "Moduł 1: Wprowadzenie",
        lekcje: [
          { id: 1, nazwa: "Instalacja Pythona", opis: "Pobieranie i konfiguracja środowiska. VS Code, pierwsze uruchomienie." },
          { id: 2, nazwa: "Zmienne i typy", opis: "int, float, str, bool. Dynamiczne typowanie. input() i print()." },
          { id: 3, nazwa: "Warunki", opis: "if, elif, else. Operatory porównania. Wcięcia w Pythonie." },
          { id: 4, nazwa: "Pętle", opis: "for, while, range(). break, continue. Iterowanie po listach." },
        ]
      },
      {
        nazwa: "Moduł 2: Struktury danych",
        lekcje: [
          { id: 5, nazwa: "Listy", opis: "Tworzenie, indeksowanie, metody: append, remove, sort, reverse." },
          { id: 6, nazwa: "Słowniki", opis: "Pary klucz-wartość, iterowanie, metody get, keys, values." },
          { id: 7, nazwa: "Funkcje", opis: "def, parametry, return, *args, **kwargs. Funkcje wbudowane." },
          { id: 8, nazwa: "Moduły", opis: "import, from...import. Standardowa biblioteka: math, random, datetime." },
        ]
      }
    ]
  }
};


let aktualnyKursId = 1;
let aktualnaLekcjaId = 1;
let ukonczone = new Set();


window.addEventListener('load', function() {
  const params = new URLSearchParams(window.location.search);
  aktualnyKursId = parseInt(params.get('id')) || 1;

  const zapisanyPostep = localStorage.getItem('postep_' + aktualnyKursId);
  if (zapisanyPostep) {
    const parsed = JSON.parse(zapisanyPostep);
    parsed.forEach(function(id) {
      ukonczone.add(parseInt(id));
    });
  }

  zaladujKurs(aktualnyKursId);
  wybierzLekcje(1);
});


function zaladujKurs(kursId) {
  const kurs = KURSY[kursId];
  if (!kurs) return;

  document.getElementById('kursTytul').textContent = kurs.nazwa;
  document.title = kurs.nazwa + ' — LearnUp';

  const nav = document.getElementById('kursNav');
  nav.innerHTML = '';

  kurs.moduly.forEach(function(modul, modulIndex) {
    const modulDiv = document.createElement('div');
    modulDiv.className = 'kurs-modul open'; // domyślnie otwarty

    modulDiv.innerHTML = `
      <div class="kurs-modul-header" onclick="toggleModul(this.parentElement)">
        <span class="kurs-modul-arrow">▶</span>
        ${modul.nazwa}
      </div>
      <div class="kurs-lekcje-lista"></div>
    `;

    const lista = modulDiv.querySelector('.kurs-lekcje-lista');

    modul.lekcje.forEach(function(lekcja) {
      const item = document.createElement('div');
      item.className = 'kurs-lekcja-item' + (ukonczone.has(lekcja.id) ? ' ukonczona' : '');
      item.setAttribute('data-id', lekcja.id);
      item.onclick = function() { wybierzLekcje(lekcja.id); };

      item.innerHTML = `
        <div class="kurs-lekcja-check">${ukonczone.has(lekcja.id) ? '✓' : ''}</div>
        <span>${lekcja.nazwa}</span>
      `;

      lista.appendChild(item);
    });

    nav.appendChild(modulDiv);
  });

  aktualizujPostep();
}


function wybierzLekcje(lekcjaId) {
  const kurs = KURSY[aktualnyKursId];
  if (!kurs) return;

  let znalezianaLekcja = null;
  let znalezionyModul = null;

  kurs.moduly.forEach(function(modul) {
    modul.lekcje.forEach(function(lekcja) {
      if (lekcja.id === lekcjaId) {
        znalezianaLekcja = lekcja;
        znalezionyModul = modul;
      }
    });
  });

  if (!znalezianaLekcja) return;

  aktualnaLekcjaId = lekcjaId;

  document.getElementById('aktualnyModul').textContent = znalezionyModul.nazwa;
  document.getElementById('aktualnaLekcja').textContent = znalezianaLekcja.nazwa;
  document.getElementById('wideo-lekcja-nazwa').textContent = znalezianaLekcja.nazwa;
  document.getElementById('opisLekcji').textContent = znalezianaLekcja.opis;


  document.querySelectorAll('.kurs-lekcja-item').forEach(function(item) {
    item.classList.remove('aktywna');
    if (parseInt(item.getAttribute('data-id')) === lekcjaId) {
      item.classList.add('aktywna');
    }
  });


  aktualizujNawigacje();


  document.querySelector('.kurs-main').scrollTo(0, 0);
}



function ukończLekcję() {
  if (ukonczone.has(aktualnaLekcjaId)) {
    ukonczone.delete(aktualnaLekcjaId);

    document.querySelectorAll('.kurs-lekcja-item').forEach(function(item) {
      if (parseInt(item.getAttribute('data-id')) === aktualnaLekcjaId) {
        item.classList.remove('ukonczona');
        item.querySelector('.kurs-lekcja-check').textContent = '';
      }
    });

    document.getElementById('btnUkoncz').textContent = 'Ukończ lekcję ✓';

  } else {
    ukonczone.add(aktualnaLekcjaId);

    document.querySelectorAll('.kurs-lekcja-item').forEach(function(item) {
      if (parseInt(item.getAttribute('data-id')) === aktualnaLekcjaId) {
        item.classList.add('ukonczona');
        item.querySelector('.kurs-lekcja-check').textContent = '✓';
      }
    });
  }

  localStorage.setItem('postep_' + aktualnyKursId, JSON.stringify([...ukonczone]));
  aktualizujPostep();

if (ukonczone.has(aktualnaLekcjaId)) {
  setTimeout(function() {
    nastepnaLekcja();
    const btn = document.getElementById('btnUkoncz');
    if (ukonczone.has(aktualnaLekcjaId)) {
      btn.textContent = 'Odznacz lekcję ✕';
    } else {
      btn.textContent = 'Ukończ lekcję ✓';
    }
  }, 400);
}

function aktualizujPostep() {

  const btn = document.getElementById('btnUkoncz');
      if (ukonczone.has(aktualnaLekcjaId)) {
          btn.textContent = 'Odznacz lekcję ✕';
}     else {
          btn.textContent = 'Ukończ lekcję ✓';
}
  const kurs = KURSY[aktualnyKursId];
  let wszystkieLekcje = 0;

  kurs.moduly.forEach(function(m) {
    wszystkieLekcje += m.lekcje.length;
  });

  const procent = Math.round((ukonczone.size / wszystkieLekcje) * 100);

  document.getElementById('postepFill').style.width = procent + '%';
  document.getElementById('postepProcent').textContent = procent + '%';
  document.getElementById('postepLekcje').textContent = ukonczone.size + ' / ' + wszystkieLekcje + ' lekcji';

  if (procent === 100) {
    pokazCertyfikat();
  }
}


function pobierzWszystkieLekcje() {
  const kurs = KURSY[aktualnyKursId];
  const wszystkie = [];
  kurs.moduly.forEach(function(m) {
    m.lekcje.forEach(function(l) {
      wszystkie.push(l.id);
    });
  });
  return wszystkie;
}

function nastepnaLekcja() {
  const wszystkie = pobierzWszystkieLekcje();
  const aktualnyIndex = wszystkie.indexOf(aktualnaLekcjaId);
  if (aktualnyIndex < wszystkie.length - 1) {
    wybierzLekcje(wszystkie[aktualnyIndex + 1]);
  }
}

function poprzedniaLekcja() {
  const wszystkie = pobierzWszystkieLekcje();
  const aktualnyIndex = wszystkie.indexOf(aktualnaLekcjaId);
  if (aktualnyIndex > 0) {
    wybierzLekcje(wszystkie[aktualnyIndex - 1]);
  }
}

function aktualizujNawigacje() {
const btn = document.getElementById('btnUkoncz');
    if (ukonczone.has(lekcjaId)) {
        btn.textContent = 'Odznacz lekcję ✕';
}   else {
        btn.textContent = 'Ukończ lekcję ✓';
}
  const wszystkie = pobierzWszystkieLekcje();
  const index = wszystkie.indexOf(aktualnaLekcjaId);

  document.getElementById('btnPoprzednia').disabled = index === 0;
  document.getElementById('btnNastepna').disabled = index === wszystkie.length - 1;
}


function toggleModul(modulDiv) {
  modulDiv.classList.toggle('open');
}



function pokazCertyfikat() {
  if (document.getElementById('btnCertyfikat')) return;
  const topbar = document.querySelector('.kurs-topbar');
  const prawaStrona = topbar.querySelector('div:last-child');

  const btnCert = document.createElement('button');
  btnCert.id = 'btnCertyfikat';
  btnCert.className = 'btn-outline';
  btnCert.textContent = '🏆 Pobierz certyfikat';
  btnCert.onclick = pobierzCertyfikat;
  btnCert.style.cssText = 'font-size:0.85rem;padding:10px 16px';

  prawaStrona.insertBefore(btnCert, prawaStrona.querySelector('#btnUkoncz'));
}


function pobierzCertyfikat() {
  const kurs = KURSY[aktualnyKursId];
  const imie = localStorage.getItem('user_name') || 'Jan Kowalski';
  const data = new Date().toLocaleDateString('pl-PL');

  const canvas = document.createElement('canvas');
  canvas.width  = 1200;
  canvas.height = 850;
  const ctx = canvas.getContext('2d');

 
  const gradient = ctx.createLinearGradient(0, 0, 1200, 850);
  gradient.addColorStop(0, '#0f0f13');
  gradient.addColorStop(1, '#1a1a2e');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 1200, 850);


  ctx.strokeStyle = '#7c5cfc';
  ctx.lineWidth = 6;
  ctx.strokeRect(30, 30, 1140, 790);

  ctx.strokeStyle = 'rgba(124,92,252,0.3)';
  ctx.lineWidth = 2;
  ctx.strokeRect(44, 44, 1112, 762);


  ctx.fillStyle = 'rgba(124,92,252,0.15)';
  [[30,30],[1170,30],[30,820],[1170,820]].forEach(function(p) {
    ctx.beginPath();
    ctx.arc(p[0], p[1], 60, 0, Math.PI * 2);
    ctx.fill();
  });


  ctx.textAlign = 'center';
  ctx.font = 'bold 44px Arial';
  ctx.fillStyle = '#7c5cfc';
  ctx.fillText('LearnUp', 600, 120);

  ctx.font = '18px Arial';
  ctx.fillStyle = 'rgba(255,255,255,0.5)';
  ctx.fillText('Platforma Kursów Online', 600, 152);


  ctx.strokeStyle = 'rgba(124,92,252,0.4)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(200, 178); ctx.lineTo(1000, 178);
  ctx.stroke();


  ctx.font = '20px Arial';
  ctx.fillStyle = 'rgba(255,255,255,0.55)';
  ctx.fillText('CERTYFIKAT UKOŃCZENIA', 600, 240);


  ctx.font = 'bold 62px Arial';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(imie, 600, 340);

 
  ctx.font = '22px Arial';
  ctx.fillStyle = 'rgba(255,255,255,0.7)';
  ctx.fillText('ukończył(a) z wyróżnieniem kurs', 600, 400);


  ctx.font = 'bold 34px Arial';
  ctx.fillStyle = '#7c5cfc';
  ctx.fillText(kurs.nazwa, 600, 468);


  ctx.strokeStyle = 'rgba(124,92,252,0.4)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(200, 508); ctx.lineTo(1000, 508);
  ctx.stroke();

  ctx.font = '18px Arial';
  ctx.fillStyle = 'rgba(255,255,255,0.5)';
  ctx.fillText('Data ukończenia: ' + data, 600, 575);

  ctx.strokeStyle = '#7c5cfc';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(600, 698, 80, 0, Math.PI * 2);
  ctx.stroke();

  ctx.font = 'bold 20px Arial';
  ctx.fillStyle = '#7c5cfc';
  ctx.fillText('VERIFIED', 600, 693);

  ctx.font = '13px Arial';
  ctx.fillStyle = 'rgba(255,255,255,0.5)';
  ctx.fillText('LearnUp 2025', 600, 716);

  try {
    const link = document.createElement('a');
    link.download = 'certyfikat-' + kurs.nazwa.replace(/[^a-zA-Z0-9]/g, '-') + '.png';
    link.href = canvas.toDataURL('image/png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch(e) {
    console.error('Błąd certyfikatu:', e);
    alert('Nie udało się pobrać certyfikatu. Sprawdź konsolę (F12).');
  }
}
