function inicjalizujCzat() {
  if (window.location.pathname.includes('/admin/')) return;

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const widget = document.createElement('div');
  widget.className = 'chat-widget';
  widget.innerHTML = `
    <div class="chat-panel" id="chatPanel">
      <div class="chat-panel-header">
        <div>
          <h4>💬 Napisz do nas</h4>
          <p>Odpowiemy najszybciej jak możemy</p>
        </div>
        <button class="chat-close" onclick="toggleCzat()">✕</button>
      </div>

      <div class="chat-panel-body" id="chatForm">
        <div class="form-group">
          <label>Imię i nazwisko *</label>
          <input type="text" id="chatImie" placeholder="Jan Kowalski" value="${user.name || ''}">
        </div>
        <div class="form-group">
          <label>Email *</label>
          <input type="email" id="chatEmail" placeholder="jan@example.com" value="${user.email || ''}">
        </div>
        <div class="form-group">
          <label>Temat *</label>
          <input type="text" id="chatTemat" placeholder="Pytanie o kurs...">
        </div>
        <div class="form-group">
          <label>Wiadomość *</label>
          <textarea id="chatTresc" placeholder="Opisz swoje pytanie..."></textarea>
        </div>
        <div class="chat-msg" id="chatMsg"></div>
        <button type="button" class="btn-primary btn-full" id="chatBtn" onclick="wyslijWiadomosc()" style="font-size:0.88rem;padding:10px">
          Wyślij wiadomość →
        </button>
      </div>

      <div class="chat-success-state" id="chatSuccess">
        <div class="success-emoji">✅</div>
        <p>Wiadomość wysłana!<br>Odpowiemy na podany email.</p>
        <br>
        <button type="button" class="btn-outline" onclick="resetCzat()" style="font-size:0.85rem;padding:8px 16px">
          Wyślij kolejną
        </button>
      </div>
    </div>

    <button class="chat-btn" onclick="toggleCzat()" title="Napisz do nas">
      💬
    </button>
  `;

document.documentElement.appendChild(widget);
}

function toggleCzat() {
  const panel = document.getElementById('chatPanel');
  if (panel) panel.classList.toggle('open');
}

async function wyslijWiadomosc() {
  const imie  = document.getElementById('chatImie').value.trim();
  const email = document.getElementById('chatEmail').value.trim();
  const temat = document.getElementById('chatTemat').value.trim();
  const tresc = document.getElementById('chatTresc').value.trim();
  const msg   = document.getElementById('chatMsg');
  const btn   = document.getElementById('chatBtn');
  const user  = JSON.parse(localStorage.getItem('user') || '{}');

  msg.className = 'chat-msg';

  if (!imie || !email || !temat || !tresc) {
    msg.className = 'chat-msg error';
    msg.textContent = '❌ Uzupełnij wszystkie pola';
    return;
  }

  if (!email.includes('@')) {
    msg.className = 'chat-msg error';
    msg.textContent = '❌ Podaj prawidłowy email';
    return;
  }

  btn.textContent = 'Wysyłanie...';
  btn.disabled = true;

  try {
    const res = await fetch('http://localhost:8000/api/wiadomosci/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: user.id || null,
        imie:    imie,
        email:   email,
        temat:   temat,
        tresc:   tresc
      })
    });

    if (res.ok) {
      document.getElementById('chatForm').style.display = 'none';
      document.getElementById('chatSuccess').classList.add('visible');
    } else {
      msg.className = 'chat-msg error';
      msg.textContent = '❌ Błąd wysyłania wiadomości';
      btn.textContent = 'Wyślij wiadomość →';
      btn.disabled = false;
    }
  } catch(e) {
    msg.className = 'chat-msg error';
    msg.textContent = '❌ Błąd połączenia z serwerem';
    btn.textContent = 'Wyślij wiadomość →';
    btn.disabled = false;
  }
}

function resetCzat() {
  document.getElementById('chatForm').style.display = 'flex';
  document.getElementById('chatSuccess').classList.remove('visible');
  document.getElementById('chatTemat').value = '';
  document.getElementById('chatTresc').value = '';
  document.getElementById('chatMsg').className = 'chat-msg';
  const btn = document.getElementById('chatBtn');
  btn.textContent = 'Wyślij wiadomość →';
  btn.disabled = false;
}

window.addEventListener('load', function() {
  inicjalizujCzat();
});