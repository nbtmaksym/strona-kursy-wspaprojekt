const loginForm = document.getElementById('loginForm');

if (loginForm) {
  loginForm.addEventListener('submit', function(event) {
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

    if (!email.includes('@') || !email.includes('.')) {
      msg.className = 'form-msg error';
      msg.textContent = '❌ Podaj prawidłowy adres email';
      return;
    }

    // Tutaj będzie zapytanie do backendu (Commit 2)
    msg.className = 'form-msg success';
    msg.textContent = '✅ Logowanie pomyślne! Przekierowuję...';

    setTimeout(function() {
      window.location.href = 'dashboard.html';
    }, 1000);
  });
}


const registerForm = document.getElementById('registerForm');

if (registerForm) {
  registerForm.addEventListener('submit', function(event) {
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

    // Tutaj będzie zapytanie do backendu (Commit 2)
    msg.className = 'form-msg success';
    msg.textContent = '✅ Konto utworzone! Przekierowuję do logowania...';

    setTimeout(function() {
      window.location.href = 'login.html';
    }, 1500);
  });
}
