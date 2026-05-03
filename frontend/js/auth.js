const API = 'http://localhost:8000';
const registerForm = document.getElementById('registerForm');

if (registerForm) {
  registerForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    const name      = document.getElementById('name').value.trim();
    const email     = document.getElementById('email').value.trim();
    const password  = document.getElementById('password').value.trim();
    const password2 = document.getElementById('password2').value.trim();
    const msg       = document.getElementById('registerMsg');

    msg.className = 'form-msg';

    if (name === '' || email === '' || password === '' || password2 === '') {
      msg.className = 'form-msg error';
      msg.textContent = '❌ Uzupełnij wszystkie pola';
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      msg.className = 'form-msg error';
      msg.textContent = '❌ Podaj prawidłowy adres email';
      return;
    }

    if (password.length < 8) {
      msg.className = 'form-msg error';
      msg.textContent = '❌ Hasło musi mieć minimum 8 znaków';
      return;
    }

    if (password !== password2) {
      msg.className = 'form-msg error';
      msg.textContent = '❌ Hasła nie są identyczne';
      return;
    }

    const btn = registerForm.querySelector('button[type="submit"]');
    btn.textContent = 'Tworzenie konta...';
    btn.disabled = true;

    try {
      const res = await fetch(API + '/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        msg.className = 'form-msg error';
        msg.textContent = '❌ ' + data.detail;
        btn.textContent = 'Utwórz konto';
        btn.disabled = false;
        return;
      }

      sessionStorage.setItem('pending_user', JSON.stringify({
        name:  data.name,
        email: data.email,
        kod:   data.kod
      }));

      msg.className = 'form-msg success';
      msg.textContent = '✅ Konto utworzone! Wysyłamy kod weryfikacyjny...';

      window.location.href = 'verify.html';   

    } catch(e) {
      msg.className = 'form-msg error';
      msg.textContent = '❌ Błąd połączenia z serwerem. Czy backend działa?';
      btn.textContent = 'Utwórz konto';
      btn.disabled = false;
    }
  });
}


const loginForm = document.getElementById('loginForm');

if (loginForm) {
  loginForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    const email    = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const msg      = document.getElementById('loginMsg');

    msg.className = 'form-msg';

    if (email === '' || password === '') {
      msg.className = 'form-msg error';
      msg.textContent = '❌ Wpisz email i hasło';
      return;
    }

    const btn = loginForm.querySelector('button[type="submit"]');
    btn.textContent = 'Logowanie...';
    btn.disabled = true;

    try {
      const res = await fetch(API + '/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        msg.className = 'form-msg error';
        msg.textContent = '❌ ' + data.detail;
        btn.textContent = 'Zaloguj się';
        btn.disabled = false;
        return;
      }

      localStorage.setItem('token', data.access_token);

      const meRes = await fetch(API + '/api/auth/me', {
        headers: { 'Authorization': 'Bearer ' + data.access_token }
      });
      const meData = await meRes.json();

      localStorage.setItem('user', JSON.stringify(meData));
      localStorage.setItem('user_name', meData.name);
      localStorage.setItem('user_email', meData.email);

      msg.className = 'form-msg success';
      msg.textContent = '✅ Zalogowano! Przekierowuję...';

      setTimeout(function() {
        if (meData.is_admin) {
            window.location.href = 'admin/index.html';
}       else {
            window.location.href = 'index.html';
}
      }, 800);

    } catch(e) {
      msg.className = 'form-msg error';
      msg.textContent = '❌ Błąd połączenia z serwerem. Czy backend działa?';
      btn.textContent = 'Zaloguj się';
      btn.disabled = false;
    }
  });
}