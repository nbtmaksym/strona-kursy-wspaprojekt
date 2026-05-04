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

  const res = await fetch(API + endpoint, { ...options, headers });

  return res;
}


function aktualizujNavbar() {
  const user = getUser();
  const navRight = document.querySelector('.nav-right');
  if (!navRight) return;

  if (user) {
    const inicjaly = user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

    navRight.innerHTML = `
      <button class="theme-btn" id="themeBtn">🌙</button>
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


function toggleUserMenu() {
  const dropdown = document.getElementById('userDropdown');
  if (dropdown) {
    dropdown.classList.toggle('open');
  }
}

// Zamknij dropdown po kliknięciu poza nim
document.addEventListener('click', function(e) {
  const dropdown = document.getElementById('userDropdown');
  if (dropdown && !e.target.closest('.nav-user')) {
    dropdown.classList.remove('open');
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