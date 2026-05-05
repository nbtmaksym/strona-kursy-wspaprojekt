const API = 'http://localhost:8000';

function getToken() {
  return localStorage.getItem('token');
}

function getUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

function isLoggedIn() {
  return !!getToken();
}

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('user_name');
  localStorage.removeItem('user_email');
  window.location.href = 'login.html';
}

async function apiFetch(endpoint, options = {}) {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': 'Bearer ' + token } : {}),
    ...(options.headers || {})
  };
  return await fetch(API + endpoint, { ...options, headers });
}


function aktualizujNavbar() {
  const user = getUser();
  const navRight = document.querySelector('.nav-right');
  if (!navRight) return;

  if (user) {
    const inicjaly = user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

    navRight.innerHTML = `
      <button class="theme-btn" id="themeBtn">🌙</button>
      <div class="nav-bell" id="navBell">
        <button class="bell-btn" onclick="toggleBell()" title="Powiadomienia">
          🔔
          <span class="bell-badge" id="bellBadge" style="display:none">0</span>
        </button>
        <div class="bell-dropdown" id="bellDropdown">
          <div class="bell-header">
            <span>Powiadomienia</span>
            <button onclick="oznaczWszystkiePrzeczytane()" style="background:none;border:none;color:var(--accent);font-size:0.78rem;cursor:pointer">
              Oznacz wszystkie
            </button>
          </div>
          <div id="bellLista">
            <div style="padding:20px;text-align:center;color:var(--text-soft);font-size:0.85rem">Ładowanie...</div>
          </div>
        </div>
      </div>
      <div class="nav-user">
        <button class="nav-avatar-btn" onclick="toggleUserMenu()">
          <div class="nav-avatar">${inicjaly}</div>
          <span class="nav-user-name">${user.name.split(' ')[0]}</span>
          <span class="nav-arrow">▾</span>
        </button>
        <div class="user-dropdown" id="userDropdown">
          <div class="user-info">
            <div class="user-info-name">${user.name}</div>
            <div class="user-info-email">${user.email}</div>
          </div>
          <a href="dashboard.html">📊 Dashboard</a>
          <a href="kursy.html">📚 Moje kursy</a>
          ${user.is_admin ? '<a href="admin/index.html">⚙️ Admin Panel</a>' : ''}
          <div class="dropdown-divider"></div>
          <a href="#" onclick="logout()">🚪 Wyloguj</a>
        </div>
      </div>
      <button class="hamburger" id="hamburger">
        <span></span><span></span><span></span>
      </button>
    `;

    zaladujPowiadomienia();
  } else {
    navRight.innerHTML = `
      <button class="theme-btn" id="themeBtn">🌙</button>
      <a href="login.html" class="btn-outline">Logowanie</a>
      <a href="register.html" class="btn-primary">Zacznij za darmo</a>
      <button class="hamburger" id="hamburger">
        <span></span><span></span><span></span>
      </button>
    `;
  }

  inicjalizujThemeBtn();
  inicjalizujHamburger();
}


async function zaladujPowiadomienia() {
  const token = getToken();
  if (!token) return;

  try {
    const res = await fetch(API + '/api/powiadomienia/', {
      headers: { 'Authorization': 'Bearer ' + token }
    });
    if (!res.ok) return;
    const powiadomienia = await res.json();

    const nieprzeczytane = powiadomienia.filter(p => !p.przeczytane).length;
    const badge = document.getElementById('bellBadge');
    if (badge) {
      if (nieprzeczytane > 0) {
        badge.textContent = nieprzeczytane;
        badge.style.display = 'flex';
      } else {
        badge.style.display = 'none';
      }
    }

    const lista = document.getElementById('bellLista');
    if (!lista) return;

    if (powiadomienia.length === 0) {
      lista.innerHTML = '<div style="padding:20px;text-align:center;color:var(--text-soft);font-size:0.85rem">Brak powiadomień</div>';
      return;
    }

    lista.innerHTML = powiadomienia.map(function(p) {
      const data = new Date(p.created_at).toLocaleDateString('pl-PL');
      return `
        <div class="bell-item ${p.przeczytane ? '' : 'nieprzeczytane'}" onclick="oznaczPrzeczytane(${p.id}, this)">
          <div class="bell-item-tresc">${p.tresc}</div>
          <div class="bell-item-data">${data}</div>
        </div>
      `;
    }).join('');
  } catch(e) {}
}


async function oznaczPrzeczytane(id, el) {
  const token = getToken();
  try {
    await fetch(API + '/api/powiadomienia/' + id + '/przeczytane', {
      method: 'PATCH',
      headers: { 'Authorization': 'Bearer ' + token }
    });
    if (el) el.classList.remove('nieprzeczytane');

    const nieprzeczytane = document.querySelectorAll('.bell-item.nieprzeczytane').length;
    const badge = document.getElementById('bellBadge');
    if (badge) {
      if (nieprzeczytane > 0) {
        badge.textContent = nieprzeczytane;
      } else {
        badge.style.display = 'none';
      }
    }
  } catch(e) {}
}


async function oznaczWszystkiePrzeczytane() {
  const token = getToken();
  try {
    await fetch(API + '/api/powiadomienia/przeczytane-wszystkie', {
      method: 'PATCH',
      headers: { 'Authorization': 'Bearer ' + token }
    });
    document.querySelectorAll('.bell-item.nieprzeczytane').forEach(el => {
      el.classList.remove('nieprzeczytane');
    });
    const badge = document.getElementById('bellBadge');
    if (badge) badge.style.display = 'none';
  } catch(e) {}
}


function toggleBell() {
  const dropdown = document.getElementById('bellDropdown');
  const userDropdown = document.getElementById('userDropdown');
  if (userDropdown) userDropdown.classList.remove('open');
  if (dropdown) dropdown.classList.toggle('open');
}

function toggleUserMenu() {
  const dropdown = document.getElementById('userDropdown');
  const bellDropdown = document.getElementById('bellDropdown');
  if (bellDropdown) bellDropdown.classList.remove('open');
  if (dropdown) dropdown.classList.toggle('open');
}

document.addEventListener('click', function(e) {
  const userDropdown = document.getElementById('userDropdown');
  if (userDropdown && !e.target.closest('.nav-user')) {
    userDropdown.classList.remove('open');
  }
  const bellDropdown = document.getElementById('bellDropdown');
  if (bellDropdown && !e.target.closest('.nav-bell')) {
    bellDropdown.classList.remove('open');
  }
});

function requireLogin() {
  if (!isLoggedIn()) {
    window.location.href = 'login.html';
    return false;
  }
  return true;
}

function requireAdmin() {
  const user = getUser();
  if (!isLoggedIn() || !user?.is_admin) {
    window.location.href = 'login.html';
    return false;
  }
  return true;
}

function inicjalizujThemeBtn() {
  const themeBtn = document.getElementById('themeBtn');
  if (!themeBtn) return;

  const zapisanyTryb = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', zapisanyTryb);
  themeBtn.textContent = zapisanyTryb === 'dark' ? '🌙' : '☀️';

  themeBtn.addEventListener('click', function() {
    const aktualny = document.documentElement.getAttribute('data-theme');
    const nowy = aktualny === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nowy);
    themeBtn.textContent = nowy === 'dark' ? '🌙' : '☀️';
    localStorage.setItem('theme', nowy);
  });
}

function inicjalizujHamburger() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!hamburger || !mobileMenu) return;

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

window.addEventListener('load', function() {
  aktualizujNavbar();
});