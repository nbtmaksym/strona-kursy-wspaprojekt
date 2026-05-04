const KURSY = {
  1: {
    id: 1,
    nazwa: "HTML & CSS — od zera do bohatera",
    moduly: [
      {
        nazwa: "Moduł 1: Podstawy HTML",
        lekcje: [
          { id: 1,  nazwa: "Czym jest HTML?",      opis: "Poznasz strukturę dokumentu HTML, znaczniki i atrybuty." },
          { id: 2,  nazwa: "Pierwsze tagi",         opis: "Podstawowe tagi: h1-h6, p, div, span, a, img." },
          { id: 3,  nazwa: "Formularze HTML",       opis: "Tworzenie formularzy — input, textarea, select, button." },
          { id: 4,  nazwa: "Semantyczny HTML5",     opis: "Tagi semantyczne: header, nav, main, section, article, footer." },
        ]
      },
      {
        nazwa: "Moduł 2: CSS od podstaw",
        lekcje: [
          { id: 5,  nazwa: "Selektory CSS",         opis: "Selektory elementów, klas, ID, pseudoklasy." },
          { id: 6,  nazwa: "Box Model",             opis: "Margin, padding, border, width, height." },
          { id: 7,  nazwa: "Kolory i typografia",   opis: "Jednostki kolorów, czcionki, Google Fonts." },
          { id: 8,  nazwa: "Flexbox",               opis: "Układanie elementów w wierszu i kolumnie." },
        ]
      },
      {
        nazwa: "Moduł 3: Projekt końcowy",
        lekcje: [
          { id: 9,  nazwa: "Planowanie layoutu",    opis: "Wireframe, dobór kolorów i czcionek." },
          { id: 10, nazwa: "Kodowanie layoutu",     opis: "Budujemy stronę krok po kroku." },
          { id: 11, nazwa: "Responsywność",         opis: "Media queries, viewport, mobile-first." },
          { id: 12, nazwa: "Publikacja",            opis: "GitHub Pages — jak opublikować stronę za darmo." },
        ]
      }
    ]
  },
  2: {
    id: 2,
    nazwa: "JavaScript — interaktywne strony",
    moduly: [
      {
        nazwa: "Moduł 1: Podstawy JS",
        lekcje: [
          { id: 1,  nazwa: "Czym jest JavaScript?", opis: "Historia JS, jak działa w przeglądarce, pierwsze console.log." },
          { id: 2,  nazwa: "Zmienne i typy danych", opis: "let, const, var. Typy: string, number, boolean." },
          { id: 3,  nazwa: "Operatory",             opis: "Arytmetyczne, porównania, logiczne, przypisania." },
          { id: 4,  nazwa: "Warunki if/else",       opis: "Instrukcje warunkowe, switch, operator trójkowy." },
        ]
      },
      {
        nazwa: "Moduł 2: Funkcje i pętle",
        lekcje: [
          { id: 5,  nazwa: "Pętle for i while",     opis: "Iterowanie po liczbach, tablicach. break i continue." },
          { id: 6,  nazwa: "Funkcje",               opis: "Deklarowanie funkcji, parametry, return. Arrow functions." },
          { id: 7,  nazwa: "Tablice",               opis: "Tworzenie tablic, metody: push, pop, map, filter." },
          { id: 8,  nazwa: "Obiekty",               opis: "Tworzenie obiektów, właściwości, metody, destructuring." },
        ]
      },
      {
        nazwa: "Moduł 3: DOM",
        lekcje: [
          { id: 9,  nazwa: "Czym jest DOM?",         opis: "Drzewo dokumentu, węzły, jak JavaScript widzi HTML." },
          { id: 10, nazwa: "Manipulacja DOM",       opis: "getElementById, querySelector, innerHTML, classList." },
          { id: 11, nazwa: "Zdarzenia (Events)",     opis: "addEventListener, click, submit, keydown." },
          { id: 12, nazwa: "Projekt: Kalkulator",   opis: "Budujemy działający kalkulator od zera." },
        ]
      },
      {
        nazwa: "Moduł 4: Async i API",
        lekcje: [
          { id: 13, nazwa: "Callbacks i Promise",   opis: "Asynchroniczność w JS, callback hell, Promise." },
          { id: 14, nazwa: "Async/Await",           opis: "Nowoczesna składnia asynchroniczna. try/catch." },
          { id: 15, nazwa: "Fetch API",             opis: "Pobieranie danych z zewnętrznych API przez fetch()." },
          { id: 16, nazwa: "Projekt: Pogodówka",    opis: "Łączymy się z API pogodowym i wyświetlamy dane." },
        ]
      }
    ]
  },
  3: {
    id: 3,
    nazwa: "Python — pierwsze kroki",
    moduly: [
      {
        nazwa: "Moduł 1: Wprowadzenie",
        lekcje: [
          { id: 1, nazwa: "Instalacja Pythona",  opis: "Pobieranie i konfiguracja środowiska. VS Code." },
          { id: 2, nazwa: "Zmienne i typy",      opis: "int, float, str, bool. Dynamiczne typowanie." },
          { id: 3, nazwa: "Warunki",             opis: "if, elif, else. Operatory porównania." },
          { id: 4, nazwa: "Pętle",               opis: "for, while, range(). break, continue." },
        ]
      },
      {
        nazwa: "Moduł 2: Struktury danych",
        lekcje: [
          { id: 5, nazwa: "Listy",      opis: "Tworzenie, indeksowanie, metody: append, remove, sort." },
          { id: 6, nazwa: "Słowniki",   opis: "Pary klucz-wartość, iterowanie, metody get." },
          { id: 7, nazwa: "Funkcje",    opis: "def, parametry, return, *args, **kwargs." },
          { id: 8, nazwa: "Moduły",     opis: "import, from...import. Standardowa biblioteka." },
        ]
      }
    ]
  },
  4: {
    id: 4,
    nazwa: "React.js — nowoczesny frontend",
    moduly: [
      {
        nazwa: "Moduł 1: Podstawy React",
        lekcje: [
          { id: 1,  nazwa: "Czym jest React?",        opis: "Historia, Virtual DOM, dlaczego React jest popularny." },
          { id: 2,  nazwa: "Instalacja i setup",      opis: "Node.js, Create React App, struktura projektu." },
          { id: 3,  nazwa: "JSX",                     opis: "Składnia JSX, wyrażenia, atrybuty, className." },
          { id: 4,  nazwa: "Komponenty",              opis: "Komponenty funkcyjne, props, children." },
          { id: 5,  nazwa: "Stan (useState)",         opis: "Hook useState, aktualizacja stanu, re-render." },
        ]
      },
      {
        nazwa: "Moduł 2: Hooks i zdarzenia",
        lekcje: [
          { id: 6,  nazwa: "Obsługa zdarzeń",         opis: "onClick, onChange, onSubmit. Formularze w React." },
          { id: 7,  nazwa: "useEffect",               opis: "Efekty uboczne, cykl życia komponentu, cleanup." },
          { id: 8,  nazwa: "useRef",                  opis: "Referencje do DOM, focus, integracja z bibliotekami." },
          { id: 9,  nazwa: "Custom Hooks",            opis: "Tworzenie własnych hooków, współdzielenie logiki." },
        ]
      },
      {
        nazwa: "Moduł 3: Routing i API",
        lekcje: [
          { id: 10, nazwa: "React Router",            opis: "Nawigacja, Route, Link, useParams, useNavigate." },
          { id: 11, nazwa: "Fetch i Axios",           opis: "Pobieranie danych z API, loading state, error handling." },
          { id: 12, nazwa: "Context API",             opis: "Globalny stan aplikacji bez Redux." },
          { id: 13, nazwa: "Projekt: Todo App",       opis: "Budujemy kompletną aplikację Todo z API." },
        ]
      }
    ]
  },
  5: {
    id: 5,
    nazwa: "Python — analiza danych",
    moduly: [
      {
        nazwa: "Moduł 1: NumPy",
        lekcje: [
          { id: 1,  nazwa: "Wprowadzenie do NumPy",   opis: "Tablice ndarray, operacje wektorowe, broadcasting." },
          { id: 2,  nazwa: "Operacje na tablicach",   opis: "Indeksowanie, slicing, reshape, transpose." },
          { id: 3,  nazwa: "Funkcje matematyczne",    opis: "Agregacje, statystyki, generowanie danych." },
          { id: 4,  nazwa: "Algebra liniowa",         opis: "Macierze, iloczyn skalarny, wartości własne." },
        ]
      },
      {
        nazwa: "Moduł 2: Pandas",
        lekcje: [
          { id: 5,  nazwa: "Series i DataFrame",      opis: "Tworzenie, indeksowanie, podstawowe operacje." },
          { id: 6,  nazwa: "Wczytywanie danych",      opis: "CSV, Excel, JSON. Obsługa brakujących danych." },
          { id: 7,  nazwa: "Filtrowanie i grupowanie",opis: "loc, iloc, groupby, pivot_table." },
          { id: 8,  nazwa: "Łączenie danych",         opis: "merge, concat, join. Praca z wieloma źródłami." },
        ]
      },
      {
        nazwa: "Moduł 3: Wizualizacja",
        lekcje: [
          { id: 9,  nazwa: "Matplotlib podstawy",     opis: "Wykresy liniowe, słupkowe, kołowe. Konfiguracja." },
          { id: 10, nazwa: "Seaborn",                 opis: "Wykresy statystyczne, heatmapy, pairplot." },
          { id: 11, nazwa: "Projekt: Analiza danych", opis: "Kompleksowa analiza prawdziwego datasetu." },
        ]
      }
    ]
  },
  6: {
    id: 6,
    nazwa: "UI/UX Design — podstawy",
    moduly: [
      {
        nazwa: "Moduł 1: Podstawy designu",
        lekcje: [
          { id: 1,  nazwa: "Zasady designu",           opis: "Kontrast, wyrównanie, powtarzanie, bliskość (CARP)." },
          { id: 2,  nazwa: "Teoria kolorów",           opis: "Koło kolorów, palety, psychologia kolorów." },
          { id: 3,  nazwa: "Typografia",               opis: "Dobór czcionek, hierarchia, czytelność." },
          { id: 4,  nazwa: "Siatka i spacing",         opis: "Systemy siatki, białe przestrzenie, rytm." },
        ]
      },
      {
        nazwa: "Moduł 2: UX Research",
        lekcje: [
          { id: 5,  nazwa: "Persony użytkowników",     opis: "Tworzenie person, user stories, empathy map." },
          { id: 6,  nazwa: "User Journey Map",         opis: "Mapowanie ścieżki użytkownika, touchpoints." },
          { id: 7,  nazwa: "Wireframing",              opis: "Szkice, lo-fi wireframes, narzędzia." },
          { id: 8,  nazwa: "Testy użyteczności",       opis: "Planowanie testów, moderowanie, analiza wyników." },
        ]
      },
      {
        nazwa: "Moduł 3: Figma",
        lekcje: [
          { id: 9,  nazwa: "Interfejs Figmy",          opis: "Narzędzia, warstwy, strony, skróty klawiszowe." },
          { id: 10, nazwa: "Komponenty i Auto Layout", opis: "Tworzenie komponentów, warianty, Auto Layout." },
          { id: 11, nazwa: "Prototypowanie",           opis: "Połączenia między ekranami, animacje przejść." },
          { id: 12, nazwa: "Projekt: App Design",      opis: "Projektujesz kompletny interfejs aplikacji mobilnej." },
        ]
      }
    ]
  },
  7: {
    id: 7,
    nazwa: "Node.js & REST API",
    moduly: [
      {
        nazwa: "Moduł 1: Node.js podstawy",
        lekcje: [
          { id: 1,  nazwa: "Czym jest Node.js?",      opis: "Event loop, architektura, npm, pierwsze skrypty." },
          { id: 2,  nazwa: "Moduły i fs",             opis: "CommonJS, ES Modules, praca z plikami." },
          { id: 3,  nazwa: "Asynchroniczność",         opis: "Callbacks, Promises, async/await w Node." },
          { id: 4,  nazwa: "HTTP moduł",               opis: "Tworzenie serwera HTTP bez frameworka." },
        ]
      },
      {
        nazwa: "Moduł 2: Express.js",
        lekcje: [
          { id: 5,  nazwa: "Express podstawy",         opis: "Routing, middleware, req, res, next." },
          { id: 6,  nazwa: "REST API",                 opis: "Metody HTTP, zasoby, konwencje nazewnictwa." },
          { id: 7,  nazwa: "Middleware",               opis: "Własny middleware, CORS, body-parser, morgan." },
          { id: 8,  nazwa: "Obsługa błędów",           opis: "Error handling middleware, kody statusów HTTP." },
        ]
      },
      {
        nazwa: "Moduł 3: Baza danych i Auth",
        lekcje: [
          { id: 9,  nazwa: "MongoDB i Mongoose",       opis: "Modele, schematy, CRUD operations." },
          { id: 10, nazwa: "JWT Auth",                 opis: "Rejestracja, logowanie, tokeny JWT, middleware auth." },
          { id: 11, nazwa: "Walidacja",                opis: "Joi, express-validator, sanityzacja danych." },
          { id: 12, nazwa: "Deployment",               opis: "Heroku, Railway, zmienne środowiskowe, produkcja." },
        ]
      }
    ]
  },
  8: {
    id: 8,
    nazwa: "UI/UX Design — Figma Pro",
    moduly: [
      {
        nazwa: "Moduł 1: Zaawansowana Figma",
        lekcje: [
          { id: 1,  nazwa: "Design Tokens",            opis: "Zmienne, kolory, typografia jako tokeny." },
          { id: 2,  nazwa: "Design System",            opis: "Tworzenie spójnego systemu komponentów." },
          { id: 3,  nazwa: "Zaawansowane komponenty",  opis: "Zagnieżdżone komponenty, swap, Boolean." },
          { id: 4,  nazwa: "Figma Variables",          opis: "Tryby (dark/light), liczby, stringi jako zmienne." },
        ]
      },
      {
        nazwa: "Moduł 2: Zaawansowane prototypowanie",
        lekcje: [
          { id: 5,  nazwa: "Interakcje i animacje",    opis: "Smart animate, spring animations, overlays." },
          { id: 6,  nazwa: "Micro-interactions",       opis: "Hover, focus, pressed states, feedback." },
          { id: 7,  nazwa: "Prototyp mobilny",         opis: "Gesty, scrolling, fixed elements." },
          { id: 8,  nazwa: "Handoff dla deweloperów",  opis: "Inspect mode, eksport assets, dokumentacja." },
        ]
      },
      {
        nazwa: "Moduł 3: Projekt końcowy",
        lekcje: [
          { id: 9,  nazwa: "Brief i research",         opis: "Analiza konkurencji, moodboard, kierunek designu." },
          { id: 10, nazwa: "Wireframes",               opis: "Lo-fi szkice, architecture informacji." },
          { id: 11, nazwa: "Hi-fi design",             opis: "Kompletny projekt z design systemem." },
          { id: 12, nazwa: "Prezentacja projektu",     opis: "Case study, mockupy, portfolio." },
        ]
      }
    ]
  },
  9: {
    id: 9,
    nazwa: "Machine Learning z Pythonem",
    moduly: [
      {
        nazwa: "Moduł 1: Podstawy ML",
        lekcje: [
          { id: 1,  nazwa: "Czym jest ML?",            opis: "Supervised vs unsupervised, overfitting, bias-variance." },
          { id: 2,  nazwa: "Przygotowanie danych",     opis: "Czyszczenie, normalizacja, train/test split." },
          { id: 3,  nazwa: "Scikit-learn",             opis: "Pipeline, fit, predict, score — podstawy." },
          { id: 4,  nazwa: "Metryki",                  opis: "Accuracy, precision, recall, F1, confusion matrix." },
        ]
      },
      {
        nazwa: "Moduł 2: Algorytmy klasyczne",
        lekcje: [
          { id: 5,  nazwa: "Regresja liniowa",         opis: "Gradient descent, MSE, wielomiany." },
          { id: 6,  nazwa: "Regresja logistyczna",     opis: "Klasyfikacja binarna, sigmoid, threshold." },
          { id: 7,  nazwa: "Drzewa decyzyjne",         opis: "Random Forest, feature importance, pruning." },
          { id: 8,  nazwa: "SVM i KNN",                opis: "Support vectors, kernel trick, k-nearest neighbors." },
        ]
      },
      {
        nazwa: "Moduł 3: Sieci neuronowe",
        lekcje: [
          { id: 9,  nazwa: "Wprowadzenie do NN",       opis: "Perceptron, warstwy, funkcje aktywacji." },
          { id: 10, nazwa: "TensorFlow i Keras",       opis: "Sequential API, Dense layers, kompilacja, trening." },
          { id: 11, nazwa: "CNN — obrazy",             opis: "Convolution, pooling, klasyfikacja obrazów." },
          { id: 12, nazwa: "Projekt końcowy",          opis: "Trenujemy model na prawdziwym datasecie." },
        ]
      }
    ]
  }
};

let aktualnyKursId   = 1;
let aktualnaLekcjaId = 1;
let ukonczone        = new Set();
const token          = localStorage.getItem('token');

window.addEventListener('load', async function() {
  const params = new URLSearchParams(window.location.search);
  aktualnyKursId = parseInt(params.get('id')) || 1;

  if (token) {
    await zaladujPostepZAPI();
  } else {
    const zapisany = localStorage.getItem('postep_' + aktualnyKursId);
    if (zapisany) {
      JSON.parse(zapisany).forEach(function(id) {
        const num = parseInt(id);
        if (!isNaN(num)) ukonczone.add(num);
      });
    }
  }

  zaladujKurs(aktualnyKursId);
  wybierzLekcje(1);
});

async function zaladujPostepZAPI() {
  try {
    const res = await fetch('http://localhost:8000/api/postep/' + aktualnyKursId, {
      headers: { 'Authorization': 'Bearer ' + token }
    });
    if (res.ok) {
      const dane = await res.json();
      dane.forEach(function(item) {
        let id;
        if (typeof item === 'object' && item !== null) {
          id = item.lekcja_id;
        } else {
          id = item;
        }
        const num = parseInt(id);
        if (!isNaN(num)) ukonczone.add(num);
      });
    }
  } catch(e) {
    console.error('Blad pobierania postepu:', e);
  }
}

async function zapiszPostepDoAPI(lekcjaId) {
  if (!token) return;
  try {
    await fetch('http://localhost:8000/api/postep/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ kurs_id: aktualnyKursId, lekcja_id: lekcjaId })
    });
  } catch(e) {
    console.error('Blad zapisu postepu:', e);
  }
}

async function odznaczPostepWAPI(lekcjaId) {
  if (!token) return;
  try {
    await fetch('http://localhost:8000/api/postep/', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ kurs_id: aktualnyKursId, lekcja_id: lekcjaId })
    });
  } catch(e) {
    console.error('Blad odznaczania postepu:', e);
  }
}

function zaladujKurs(kursId) {
  const kurs = KURSY[kursId];
  if (!kurs) {
    document.getElementById('kursTytul').textContent = 'Kurs w przygotowaniu';
    return;
  }

  document.getElementById('kursTytul').textContent = kurs.nazwa;
  document.title = kurs.nazwa + ' — LearnUp';

  const nav = document.getElementById('kursNav');
  nav.innerHTML = '';

  kurs.moduly.forEach(function(modul) {
    const modulDiv = document.createElement('div');
    modulDiv.className = 'kurs-modul open';

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
  let znalezionyModul  = null;

  kurs.moduly.forEach(function(modul) {
    modul.lekcje.forEach(function(lekcja) {
      if (lekcja.id === lekcjaId) {
        znalezianaLekcja = lekcja;
        znalezionyModul  = modul;
      }
    });
  });

  if (!znalezianaLekcja) return;

  aktualnaLekcjaId = lekcjaId;

  document.getElementById('aktualnyModul').textContent      = znalezionyModul.nazwa;
  document.getElementById('aktualnaLekcja').textContent     = znalezianaLekcja.nazwa;
  document.getElementById('wideo-lekcja-nazwa').textContent = znalezianaLekcja.nazwa;
  document.getElementById('opisLekcji').textContent         = znalezianaLekcja.opis;

  document.querySelectorAll('.kurs-lekcja-item').forEach(function(item) {
    item.classList.remove('aktywna');
    if (parseInt(item.getAttribute('data-id')) === lekcjaId) {
      item.classList.add('aktywna');
    }
  });

  aktualizujNawigacje();

  const btn = document.getElementById('btnUkoncz');
  if (btn) {
    btn.textContent = ukonczone.has(lekcjaId) ? 'Odznacz lekcję ✕' : 'Ukończ lekcję ✓';
  }

  document.querySelector('.kurs-main').scrollTo(0, 0);
}

async function ukończLekcję(e) {
  if (e) e.preventDefault();
  const btn = document.getElementById('btnUkoncz');

  if (ukonczone.has(aktualnaLekcjaId)) {
    ukonczone.delete(aktualnaLekcjaId);
    await odznaczPostepWAPI(aktualnaLekcjaId);

    document.querySelectorAll('.kurs-lekcja-item').forEach(function(item) {
      if (parseInt(item.getAttribute('data-id')) === aktualnaLekcjaId) {
        item.classList.remove('ukonczona');
        item.querySelector('.kurs-lekcja-check').textContent = '';
      }
    });

    if (btn) btn.textContent = 'Ukończ lekcję ✓';

  } else {
    ukonczone.add(aktualnaLekcjaId);
    await zapiszPostepDoAPI(aktualnaLekcjaId);

    document.querySelectorAll('.kurs-lekcja-item').forEach(function(item) {
      if (parseInt(item.getAttribute('data-id')) === aktualnaLekcjaId) {
        item.classList.add('ukonczona');
        item.querySelector('.kurs-lekcja-check').textContent = '✓';
      }
    });

    if (btn) btn.textContent = 'Odznacz lekcję ✕';

    const nastepnaId = pobierzNastepnaLekcje();
    if (nastepnaId) {
      setTimeout(function() {
        wybierzLekcje(nastepnaId);
      }, 400);
    }
  }

  const doZapisu = [...ukonczone].filter(id => !isNaN(id));
  localStorage.setItem('postep_' + aktualnyKursId, JSON.stringify(doZapisu));
  aktualizujPostep();
}

function aktualizujPostep() {
  const kurs = KURSY[aktualnyKursId];
  if (!kurs) return;
  let wszystkie = 0;
  kurs.moduly.forEach(function(m) { wszystkie += m.lekcje.length; });

  const prawidlowe = [...ukonczone].filter(id => !isNaN(id));
  const procent = wszystkie > 0 ? Math.round((prawidlowe.length / wszystkie) * 100) : 0;

  document.getElementById('postepFill').style.width    = procent + '%';
  document.getElementById('postepProcent').textContent = procent + '%';
  document.getElementById('postepLekcje').textContent  = prawidlowe.length + ' / ' + wszystkie + ' lekcji';

  if (procent === 100) {
    pokazCertyfikat();
  }
}

function pobierzWszystkieLekcje() {
  const kurs = KURSY[aktualnyKursId];
  const wszystkie = [];
  kurs.moduly.forEach(function(m) {
    m.lekcje.forEach(function(l) { wszystkie.push(l.id); });
  });
  return wszystkie;
}

function pobierzNastepnaLekcje() {
  const wszystkie = pobierzWszystkieLekcje();
  const index = wszystkie.indexOf(aktualnaLekcjaId);
  return index < wszystkie.length - 1 ? wszystkie[index + 1] : null;
}

function nastepnaLekcja() {
  const id = pobierzNastepnaLekcje();
  if (id) wybierzLekcje(id);
}

function poprzedniaLekcja() {
  const wszystkie = pobierzWszystkieLekcje();
  const index = wszystkie.indexOf(aktualnaLekcjaId);
  if (index > 0) wybierzLekcje(wszystkie[index - 1]);
}

function aktualizujNawigacje() {
  const wszystkie = pobierzWszystkieLekcje();
  const index = wszystkie.indexOf(aktualnaLekcjaId);
  document.getElementById('btnPoprzednia').disabled = index === 0;
  document.getElementById('btnNastepna').disabled   = index === wszystkie.length - 1;
}

function toggleModul(modulDiv) {
  modulDiv.classList.toggle('open');
}

function pokazCertyfikat() {
  if (document.getElementById('btnCertyfikat')) return;

  const topbar      = document.querySelector('.kurs-topbar');
  const prawaStrona = topbar.querySelector('div:last-child');

  const btnCert = document.createElement('button');
  btnCert.id            = 'btnCertyfikat';
  btnCert.className     = 'btn-outline';
  btnCert.textContent   = '🏆 Pobierz certyfikat';
  btnCert.onclick       = pobierzCertyfikat;
  btnCert.style.cssText = 'font-size:0.85rem;padding:10px 16px';

  prawaStrona.insertBefore(btnCert, prawaStrona.querySelector('#btnUkoncz'));
}

function pobierzCertyfikat() {
  const kurs = KURSY[aktualnyKursId];
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const imie = user.name || localStorage.getItem('user_name') || 'Uczestnik';
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

  ctx.strokeStyle = '#7c5cfc'; ctx.lineWidth = 6;
  ctx.strokeRect(30, 30, 1140, 790);
  ctx.strokeStyle = 'rgba(124,92,252,0.3)'; ctx.lineWidth = 2;
  ctx.strokeRect(44, 44, 1112, 762);

  ctx.fillStyle = 'rgba(124,92,252,0.15)';
  [[30,30],[1170,30],[30,820],[1170,820]].forEach(function(p) {
    ctx.beginPath(); ctx.arc(p[0], p[1], 60, 0, Math.PI * 2); ctx.fill();
  });

  ctx.textAlign = 'center';
  ctx.font = 'bold 44px Arial'; ctx.fillStyle = '#7c5cfc';
  ctx.fillText('LearnUp', 600, 120);
  ctx.font = '18px Arial'; ctx.fillStyle = 'rgba(255,255,255,0.5)';
  ctx.fillText('Platforma Kursów Online', 600, 152);

  ctx.strokeStyle = 'rgba(124,92,252,0.4)'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(200, 178); ctx.lineTo(1000, 178); ctx.stroke();

  ctx.font = '20px Arial'; ctx.fillStyle = 'rgba(255,255,255,0.55)';
  ctx.fillText('CERTYFIKAT UKOŃCZENIA', 600, 240);
  ctx.font = 'bold 62px Arial'; ctx.fillStyle = '#ffffff';
  ctx.fillText(imie, 600, 340);
  ctx.font = '22px Arial'; ctx.fillStyle = 'rgba(255,255,255,0.7)';
  ctx.fillText('ukończył(a) z wyróżnieniem kurs', 600, 400);
  ctx.font = 'bold 34px Arial'; ctx.fillStyle = '#7c5cfc';
  ctx.fillText(kurs.nazwa, 600, 468);

  ctx.strokeStyle = 'rgba(124,92,252,0.4)'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(200, 508); ctx.lineTo(1000, 508); ctx.stroke();

  ctx.font = '18px Arial'; ctx.fillStyle = 'rgba(255,255,255,0.5)';
  ctx.fillText('Data ukończenia: ' + data, 600, 575);

  ctx.strokeStyle = '#7c5cfc'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.arc(600, 698, 80, 0, Math.PI * 2); ctx.stroke();
  ctx.font = 'bold 20px Arial'; ctx.fillStyle = '#7c5cfc';
  ctx.fillText('VERIFIED', 600, 693);
  ctx.font = '13px Arial'; ctx.fillStyle = 'rgba(255,255,255,0.5)';
  ctx.fillText('LearnUp 2025', 600, 716);

  try {
    const link = document.createElement('a');
    link.download = 'certyfikat-learnup.png';
    link.href = canvas.toDataURL('image/png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch(e) {
    console.error('Blad certyfikatu:', e);
    alert('Nie udalo sie pobrac certyfikatu.');
  }
}