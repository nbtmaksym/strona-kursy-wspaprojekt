window.addEventListener('load', async function() {

  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = 'login.html';
    return;
  }

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  if (user.name) {
    const imie = user.name.split(' ')[0];
    const inicjaly = user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

    const el = document.getElementById('dashboardImie');
    if (el) el.textContent = 'Cześć, ' + imie + '! 👋';

    const av = document.getElementById('dashboardAvatar');
    if (av) av.textContent = inicjaly;

    const btn = document.getElementById('dashboardImieBtn');
    if (btn) btn.textContent = imie;

    const dropImie = document.getElementById('dropdownImie');
    if (dropImie) dropImie.textContent = user.name;

    const dropEmail = document.getElementById('dropdownEmail');
    if (dropEmail) dropEmail.textContent = user.email;

    const ustawImie = document.getElementById('ustawImie');
    if (ustawImie) ustawImie.value = user.name;

    const ustawEmail = document.getElementById('ustawEmail');
    if (ustawEmail) ustawEmail.value = user.email;
  }

  inicjalizujThemeBtn();

  await zaladujMojeKursy(token);
});


function toggleDashboardMenu() {
  const dropdown = document.getElementById('dashboardDropdown');
  if (dropdown) dropdown.classList.toggle('open');
}

document.addEventListener('click', function(e) {
  const dropdown = document.getElementById('dashboardDropdown');
  if (dropdown && !e.target.closest('.nav-user')) {
    dropdown.classList.remove('open');
  }
});


function pokazSekcje(nazwa) {
  document.getElementById('sekcja-glowna').style.display      = 'none';
  document.getElementById('sekcja-certyfikaty').style.display = 'none';
  document.getElementById('sekcja-ustawienia').style.display  = 'none';

  document.getElementById('sekcja-' + nazwa).style.display = 'block';

  const tytuly = {
    'certyfikaty': 'Moje certyfikaty 🏆',
    'ustawienia':  'Ustawienia ⚙️'
  };

  const el = document.getElementById('dashboardImie');
  if (el) el.textContent = tytuly[nazwa] || 'Dashboard';

  const podtytul = document.getElementById('dashboardPodtytul');
  if (podtytul) {
    if (nazwa === 'certyfikaty') podtytul.textContent = 'Pobierz certyfikaty ukończonych kursów.';
    if (nazwa === 'ustawienia') podtytul.textContent = 'Zarządzaj swoim kontem.';
  }

  document.querySelectorAll('.sidebar-link').forEach(function(l) { l.classList.remove('active'); });
}

function pokazGlowna() {
  document.getElementById('sekcja-glowna').style.display      = 'block';
  document.getElementById('sekcja-certyfikaty').style.display = 'none';
  document.getElementById('sekcja-ustawienia').style.display  = 'none';

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const imie = user.name ? user.name.split(' ')[0] : '';
  const el = document.getElementById('dashboardImie');
  if (el) el.textContent = 'Cześć, ' + imie + '! 👋';

  const podtytul = document.getElementById('dashboardPodtytul');
  if (podtytul) podtytul.textContent = 'Kontynuuj naukę tam gdzie skończyłeś.';
}


function ustawMotyw(tryb) {
  document.documentElement.setAttribute('data-theme', tryb);
  localStorage.setItem('theme', tryb);
  const btn = document.getElementById('themeBtn');
  if (btn) btn.textContent = tryb === 'dark' ? '🌙' : '☀️';
}


async function zaladujMojeKursy(token) {
  try {
    const res = await fetch(API + '/api/zakupy/moje', {
      headers: { 'Authorization': 'Bearer ' + token }
    });

    if (!res.ok) return;

    const kursy = await res.json();
    const kursyZPostepem = await Promise.all(kursy.map(async function(kurs) {
      const postepRes = await fetch(API + '/api/postep/' + kurs.kurs_id, {
        headers: { 'Authorization': 'Bearer ' + token }
      });
      const ukonczone = postepRes.ok ? await postepRes.json() : [];
      const procent = kurs.liczba_lekc > 0
        ? Math.round((ukonczone.length / kurs.liczba_lekc) * 100)
        : 0;

      return { ...kurs, ukonczone, procent };
    }));

    const aktywne   = kursyZPostepem.filter(k => k.procent < 100);
    const ukonczone = kursyZPostepem.filter(k => k.procent === 100);

    aktualizujStatystyki(aktywne.length, ukonczone.length, aktywne);
    renderujAktywne(aktywne);
    renderujUkonczone(ukonczone);
    renderujCertyfikaty(ukonczone);

  } catch(e) {
    console.error('Błąd:', e);
  }
}


function aktualizujStatystyki(aktywne, ukonczone, aktywneKursy) {
  const a = document.getElementById('statAktywne');
  const u = document.getElementById('statUkonczone');
  const c = document.getElementById('statCert');
  const t = document.getElementById('statCzas');
  if (a) a.textContent = aktywne;
  if (u) u.textContent = ukonczone;
  if (c) c.textContent = ukonczone;
  if (t) {
    const godz = aktywneKursy.reduce(function(sum, k) { return sum + (k.czas_godz || 0); }, 0);
    t.textContent = godz + 'h';
  }
}


function renderujAktywne(kursy) {
  const kontener = document.getElementById('aktywneKursy');
  if (!kontener) return;

  if (kursy.length === 0) {
    kontener.innerHTML = `
      <div style="color:var(--text-soft);font-size:0.9rem;padding:20px 0">
        Nie masz jeszcze żadnych kursów.
        <a href="kursy.html" style="color:var(--accent)">Znajdź kurs →</a>
      </div>
    `;
    return;
  }

  kontener.innerHTML = kursy.map(function(kurs) {
    const kolorPaska = kurs.procent > 70 ? '#64fcb4' : kurs.procent > 30 ? 'var(--accent)' : 'var(--accent2)';
    return `
      <div class="dashboard-course-card">
        <h4>${kurs.nazwa}</h4>
        <p class="course-meta">⏱ ${kurs.czas_godz}h · ${kurs.ukonczone.length} z ${kurs.liczba_lekc} lekcji</p>
        <div class="progress-label">
          <span>Postęp</span>
          <span>${kurs.procent}%</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" style="width:${kurs.procent}%;background:${kolorPaska}"></div>
        </div>
        <br>
        <a href="kurs.html?id=${kurs.kurs_id}" class="btn-primary" style="font-size:0.85rem;padding:8px 16px">
          Kontynuuj →
        </a>
      </div>
    `;
  }).join('');
}


function renderujUkonczone(kursy) {
  const kontener = document.getElementById('ukonczoneKursy');
  if (!kontener) return;

  if (kursy.length === 0) {
    kontener.innerHTML = `
      <div style="color:var(--text-soft);font-size:0.9rem;padding:20px 0">
        Ukończ kurs żeby zdobyć certyfikat!
      </div>
    `;
    return;
  }

  kontener.innerHTML = kursy.map(function(kurs) {
    return `
      <div class="dashboard-course-card">
        <h4>${kurs.nazwa}</h4>
        <p class="course-meta">✅ Ukończono · ${kurs.liczba_lekc} lekcji</p>
        <div class="progress-bar" style="margin-bottom:16px">
          <div class="progress-fill" style="width:100%;background:#64fcb4"></div>
        </div>
        <div style="display:flex;gap:10px">
          <a href="kurs.html?id=${kurs.kurs_id}"
             class="btn-outline"
             style="font-size:0.85rem;padding:8px 16px;flex:0.8;text-align:center">
            Wróć do kursu
          </a>
          <button
            class="btn-outline"
            style="font-size:0.85rem;padding:8px 16px;flex:1"
            onclick="pobierzCertyfikatDashboard(${kurs.kurs_id}, '${kurs.nazwa.replace(/'/g, "\\'")}')">
            Pobierz certyfikat 🏆
          </button>
        </div>
      </div>
    `;
  }).join('');
}


function renderujCertyfikaty(ukonczone) {
  const kontener = document.getElementById('listaCertyfikatow');
  if (!kontener) return;

  if (ukonczone.length === 0) {
    kontener.innerHTML = `
      <div style="color:var(--text-soft);font-size:0.9rem;padding:20px 0">
        Ukończ kurs żeby zdobyć certyfikat!
      </div>
    `;
    return;
  }

  kontener.innerHTML = ukonczone.map(function(kurs) {
    return `
      <div class="dashboard-course-card">
        <div style="font-size:2rem;margin-bottom:8px">🏆</div>
        <h4>${kurs.nazwa}</h4>
        <p class="course-meta">✅ Ukończono · ${kurs.liczba_lekc} lekcji</p>
        <br>
        <button
          class="btn-primary"
          style="font-size:0.85rem;padding:8px 16px;width:100%"
          onclick="pobierzCertyfikatDashboard(${kurs.kurs_id}, '${kurs.nazwa.replace(/'/g, "\\'")}')">
          Pobierz certyfikat 🏆
        </button>
      </div>
    `;
  }).join('');
}


function pobierzCertyfikatDashboard(kursId, nazwaCursu) {
  const user  = JSON.parse(localStorage.getItem('user') || '{}');
  const imie  = user.name || 'Uczestnik';
  const data  = new Date().toLocaleDateString('pl-PL');

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
  ctx.fillText(nazwaCursu, 600, 468);

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

  const link = document.createElement('a');
  link.download = 'certyfikat-learnup.png';
  link.href = canvas.toDataURL('image/png');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}