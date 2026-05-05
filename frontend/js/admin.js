const API = 'http://localhost:8000';

function getToken() {
  return localStorage.getItem('token');
}

function requireAdmin() {
  const token = getToken();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (!token || !user.is_admin) {
    window.location.href = '../login.html';
    return false;
  }
  return true;
}

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '../login.html';
}

function inicjalizujTheme() {
  const themeBtn = document.getElementById('themeBtn');
  if (!themeBtn) return;
  const tryb = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', tryb);
  themeBtn.textContent = tryb === 'dark' ? '🌙' : '☀️';
  themeBtn.addEventListener('click', function() {
    const aktualny = document.documentElement.getAttribute('data-theme');
    const nowy = aktualny === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nowy);
    themeBtn.textContent = nowy === 'dark' ? '🌙' : '☀️';
    localStorage.setItem('theme', nowy);
  });
}

window.addEventListener('load', function() {
  if (!requireAdmin()) return;
  inicjalizujTheme();
  zaladujLicznikWiadomosci(); 
  if (typeof zaladujStrone === 'function') zaladujStrone();
});


async function zaladujDashboard() {
  const token = getToken();

  try {
    const res = await fetch(API + '/api/users/stats/overview', {
      headers: { 'Authorization': 'Bearer ' + token }
    });
    if (res.ok) {
      const data = await res.json();
      const vals = document.querySelectorAll('.stat-value');
      if (vals[0]) vals[0].textContent = data.uzytkownicy;
      if (vals[1]) vals[1].textContent = data.kursy;
      if (vals[2]) vals[2].textContent = data.przychod.toFixed(0) + ' zł';
      if (vals[3]) vals[3].textContent = data.zakupy;
    }
  } catch(e) {}

  try {
    const res = await fetch(API + '/api/users/', {
      headers: { 'Authorization': 'Bearer ' + token }
    });
    if (res.ok) {
      const users = await res.json();
      const tbody = document.getElementById('recentUsersTable');
      if (!tbody) return;
      const ostatni = users.slice(-5).reverse();
      tbody.innerHTML = ostatni.map(function(u) {
        const data = new Date(u.created_at).toLocaleDateString('pl-PL');
        const status = u.is_active
          ? '<span class="status status-active">Aktywny</span>'
          : '<span class="status status-inactive">Nieaktywny</span>';
        return `
          <tr>
            <td>${u.name}</td>
            <td>${u.email}</td>
            <td>${data}</td>
            <td>${status}</td>
          </tr>
        `;
      }).join('');
    }
  } catch(e) {}
}


async function zaladujUzytkownikow() {
  const token = getToken();
  try {
    const res = await fetch(API + '/api/users/', {
      headers: { 'Authorization': 'Bearer ' + token }
    });
    if (!res.ok) return;
    const users = await res.json();

    const tbody = document.getElementById('usersTable');
    const count = document.getElementById('usersCount');
    if (count) count.textContent = users.length + ' użytkowników';

    if (!tbody) return;
    tbody.innerHTML = users.map(function(u) {
      const data = new Date(u.created_at).toLocaleDateString('pl-PL');
      const rola = u.is_admin
        ? '<span class="status status-admin">Admin</span>'
        : '<span class="status" style="background:rgba(152,152,168,0.15);color:var(--text-soft)">Użytkownik</span>';
      const status = u.is_active
        ? '<span class="status status-active">Aktywny</span>'
        : '<span class="status status-inactive">Nieaktywny</span>';
      return `
        <tr>
          <td>${u.name}</td>
          <td>${u.email}</td>
          <td>${rola}</td>
          <td>${data}</td>
          <td>${status}</td>
          <td class="td-actions">
            <a href="uzytkownik.html?id=${u.id}" class="btn-outline" style="font-size:0.8rem;padding:6px 12px">Szczegóły</a>
            ${!u.is_admin ? `<button class="btn-danger" onclick="deleteUser(${u.id}, this)">Usuń</button>` : '—'}
          </td>
        </tr>
      `;
    }).join('');
  } catch(e) {
    console.error('Błąd ładowania użytkowników:', e);
  }
}

async function deleteUser(userId, btn) {
  if (!confirm('Na pewno chcesz usunąć tego użytkownika?')) return;
  const token = getToken();
  try {
    const res = await fetch(API + '/api/users/' + userId, {
      method: 'DELETE',
      headers: { 'Authorization': 'Bearer ' + token }
    });
    if (res.ok) {
      btn.closest('tr').remove();
    } else {
      alert('Błąd usuwania użytkownika');
    }
  } catch(e) {
    alert('Błąd połączenia z serwerem');
  }
}

function filterUsers() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  document.querySelectorAll('#usersTable tr').forEach(function(row) {
    row.style.display = row.textContent.toLowerCase().includes(query) ? '' : 'none';
  });
}

async function zaladujKursy() {
  const token = getToken();
  try {
    const res = await fetch(API + '/api/kursy/', {
      headers: { 'Authorization': 'Bearer ' + token }
    });
    if (!res.ok) return;
    const kursy = await res.json();

    const tbody = document.getElementById('coursesTable');
    const count = document.getElementById('courseCount');
    if (count) count.textContent = kursy.length + ' kursów';

    const tagMap = {
      beginner: '<span class="tag tag-beginner">Początkujący</span>',
      mid:      '<span class="tag tag-mid">Średni</span>',
      adv:      '<span class="tag tag-adv">Zaawansowany</span>'
    };

    if (!tbody) return;
    tbody.innerHTML = kursy.map(function(k) {
      return `
        <tr>
          <td>${k.nazwa}</td>
          <td>${tagMap[k.poziom] || k.poziom}</td>
          <td>${k.cena} zł</td>
          <td>${k.czas_godz}h · ${k.liczba_lekc} lekcji</td>
          <td class="td-actions">
            <button class="btn-danger" onclick="deleteKurs(${k.id}, this)">Usuń</button>
          </td>
        </tr>
      `;
    }).join('');
  } catch(e) {
    console.error('Błąd ładowania kursów:', e);
  }
}

async function deleteKurs(kursId, btn) {
  if (!confirm('Na pewno chcesz usunąć ten kurs?')) return;
  const token = getToken();
  try {
    const res = await fetch(API + '/api/kursy/' + kursId, {
      method: 'DELETE',
      headers: { 'Authorization': 'Bearer ' + token }
    });
    if (res.ok) {
      btn.closest('tr').remove();
    } else {
      alert('Błąd usuwania kursu');
    }
  } catch(e) {
    alert('Błąd połączenia z serwerem');
  }
}

async function saveCourse() {
  const name     = document.getElementById('courseName').value.trim();
  const desc     = document.getElementById('courseDesc').value.trim();
  const level    = document.getElementById('courseLevel').value;
  const price    = document.getElementById('coursePrice').value.trim();
  const duration = document.getElementById('courseDuration').value.trim();
  const msg      = document.getElementById('courseFormMsg');
  const token    = getToken();

  msg.className = 'form-msg';

  if (!name || !desc || !level || !price) {
    msg.className = 'form-msg error';
    msg.textContent = '❌ Uzupełnij wszystkie wymagane pola';
    return;
  }

  try {
    const res = await fetch(API + '/api/kursy/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        nazwa:       name,
        opis:        desc,
        poziom:      level,
        kategoria:   'programming',
        cena:        parseFloat(price),
        czas_godz:   parseInt(duration) || 0,
        liczba_lekc: 0
      })
    });

    if (res.ok) {
      msg.className = 'form-msg success';
      msg.textContent = '✅ Kurs został dodany!';
      setTimeout(function() {
        closeModal();
        zaladujKursy();
      }, 1200);
    } else {
      const err = await res.json();
      msg.className = 'form-msg error';
      msg.textContent = '❌ ' + (err.detail || 'Błąd dodawania kursu');
    }
  } catch(e) {
    msg.className = 'form-msg error';
    msg.textContent = '❌ Błąd połączenia z serwerem';
  }
}

function openModal() {
  document.getElementById('modalOverlay').classList.add('open');
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  const form = document.getElementById('courseForm');
  if (form) form.reset();
  const msg = document.getElementById('courseFormMsg');
  if (msg) msg.className = 'form-msg';
}

function filterTable() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  document.querySelectorAll('#coursesTable tr').forEach(function(row) {
    row.style.display = row.textContent.toLowerCase().includes(query) ? '' : 'none';
  });
}

async function zaladujLicznikWiadomosci() {
  const token = getToken();
  try {
    const res = await fetch(API + '/api/wiadomosci/', {
      headers: { 'Authorization': 'Bearer ' + token }
    });
    if (!res.ok) return;
    const wiadomosci = await res.json();
    const nieprzeczytane = wiadomosci.filter(w => !w.przeczytana).length;
    const badge = document.getElementById('wiadBadge');
    if (badge && nieprzeczytane > 0) {
      badge.textContent = nieprzeczytane;
      badge.style.display = 'inline-block';
    }
  } catch(e) {}
}