function openModal() {
  document.getElementById('modalOverlay').classList.add('open');
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.getElementById('courseForm').reset();
  const msg = document.getElementById('courseFormMsg');
  if (msg) msg.className = 'form-msg';
}

const modalOverlay = document.getElementById('modalOverlay');
if (modalOverlay) {
  modalOverlay.addEventListener('click', function(e) {
    if (e.target === modalOverlay) closeModal();
  });
}


function saveCourse() {
  const name     = document.getElementById('courseName').value.trim();
  const desc     = document.getElementById('courseDesc').value.trim();
  const level    = document.getElementById('courseLevel').value;
  const price    = document.getElementById('coursePrice').value.trim();
  const msg      = document.getElementById('courseFormMsg');

  msg.className = 'form-msg';

  if (name === '' || desc === '' || level === '' || price === '') {
    msg.className = 'form-msg error';
    msg.textContent = '❌ Uzupełnij wszystkie wymagane pola';
    return;
  }

  // Tagi poziomu
  const tagMap = {
    beginner: '<span class="tag tag-beginner">Początkujący</span>',
    mid:      '<span class="tag tag-mid">Średni</span>',
    adv:      '<span class="tag tag-adv">Zaawansowany</span>'
  };

  const table = document.getElementById('coursesTable');
  if (table) {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td>${name}</td>
      <td>${tagMap[level]}</td>
      <td>${price} zł</td>
      <td>0</td>
      <td class="td-actions">
        <button class="btn-outline" style="font-size:0.8rem;padding:6px 12px" onclick="editCourse(this)">Edytuj</button>
        <button class="btn-danger" onclick="deleteCourse(this)">Usuń</button>
      </td>
    `;
    table.appendChild(newRow);
  }

  msg.className = 'form-msg success';
  msg.textContent = '✅ Kurs został dodany!';

  setTimeout(closeModal, 1200);
}


function deleteCourse(btn) {
  if (confirm('Na pewno chcesz usunąć ten kurs?')) {
    btn.closest('tr').remove();
  }
}


function editCourse(btn) {
  const row = btn.closest('tr');
  const name = row.cells[0].textContent;
  document.getElementById('modalTitle').textContent = 'Edytuj kurs';
  document.getElementById('courseName').value = name;
  openModal();
}


function filterTable() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const rows = document.querySelectorAll('#coursesTable tr');
  rows.forEach(function(row) {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(query) ? '' : 'none';
  });
}
