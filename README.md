# LearnUp - Platforma Kursów Online

Projekt zaliczeniowy, webowa platforma e-learningowa zbudowana w technologii fullstack. Użytkownicy mogą przeglądać i kupować kursy, śledzić postęp nauki, wystawiać oceny i pobierać certyfikaty ukończenia.

---

## Technologie

**Frontend**
- HTML5, CSS3, Vanilla JavaScript
- EmailJS (wysyłka emaili, potwierdzenie zakupu, weryfikacja konta, reset hasła)
- Canvas API (generowanie certyfikatów)
- Chart.js (wykresy w panelu admina)

**Backend**
- Python 3.x
- FastAPI
- SQLAlchemy (ORM)
- SQLite (baza danych)
- JWT (autoryzacja)
- Bcrypt (haszowanie haseł)

---

## Struktura projektu

```
strona-kursy-wspaprojekt/
├── frontend/
│   ├── index.html              # Strona główna
│   ├── kursy.html              # Lista kursów z filtrowaniem, wyszukiwarką i paginacją
│   ├── kurs.html               # Widok kursu z lekcjami i ocenami
│   ├── zakup.html              # Formularz zakupu z obsługą kuponów
│   ├── login.html              # Logowanie
│   ├── register.html           # Rejestracja
│   ├── verify.html             # Weryfikacja konta emailem
│   ├── dashboard.html          # Panel użytkownika
│   ├── forgot-password.html    # Reset hasła, wpisz email
│   ├── reset-password.html     # Reset hasła, wpisz kod i nowe hasło
│   ├── 404.html                # Strona błędu 404
│   ├── admin/
│   │   ├── index.html          # Panel admina, statystyki
│   │   ├── kursy.html          # Zarządzanie kursami
│   │   ├── uzytkownicy.html    # Zarządzanie użytkownikami
│   │   ├── uzytkownik.html     # Profil użytkownika z postępem
│   │   ├── wiadomosci.html     # Wiadomości od użytkowników
│   │   ├── kupony.html         # Zarządzanie kuponami rabatowymi
│   │   ├── statystyki.html     # Wykresy i statystyki platformy
│   │   └── powiadomienia.html  # Wysyłanie powiadomień do użytkowników
│   ├── css/
│   │   ├── style.css           # Główne style
│   │   ├── kurs.css            # Style strony kursu
│   │   ├── zakup.css           # Style strony zakupu
│   │   ├── admin.css           # Style panelu admina
│   │   └── chat.css            # Style widgetu czatu
│   └── js/
│       ├── api.js              # Funkcje pomocnicze, navbar, auth, powiadomienia
│       ├── main.js             # Animacje, formularz kontaktowy, liczniki
│       ├── auth.js             # Rejestracja i logowanie
│       ├── dashboard.js        # Panel użytkownika
│       ├── kurs.js             # Logika strony kursu, oceny, postęp
│       ├── zakup.js            # Formularz zakupu, kupony
│       ├── admin.js            # Logika panelu admina
│       └── chat.js             # Widget czatu
└── backend/
    ├── main.py                 # Główna aplikacja FastAPI
    ├── database.py             # Konfiguracja bazy danych
    ├── models.py               # Modele SQLAlchemy
    ├── schemas.py              # Schematy Pydantic
    ├── auth.py                 # JWT i haszowanie haseł
    ├── seed.py                 # Wypełnianie bazy danymi
    └── routes/
        ├── auth.py             # Endpointy autoryzacji i resetu hasła
        ├── kursy.py            # Endpointy kursów
        ├── users.py            # Endpointy użytkowników i statystyk
        ├── zakupy.py           # Endpointy zakupów
        ├── postep.py           # Endpointy postępu nauki
        ├── wiadomosci.py       # Endpointy wiadomości czatu
        ├── oceny.py            # Endpointy ocen kursów
        ├── kupony.py           # Endpointy kuponów rabatowych
        └── powiadomienia.py    # Endpointy powiadomień
```

---

## Funkcjonalności

### Użytkownik
- Rejestracja z weryfikacją emailem (6-cyfrowy kod przez EmailJS)
- Logowanie z tokenem JWT (ważny 24h)
- Reset hasła przez email (6-cyfrowy kod)
- Navbar dynamiczny, avatar z dropdown, bell ikona z powiadomieniami
- Tryb jasny / ciemny

### Strona główna
- Hero card dla zalogowanych pokazuje 3 kursy z najwyższym postępem (bez ukończonych)
- Animowane liczniki statystyk (200+, 15k, 4.9⭐)
- Sekcja popularnych kursów, O nas, formularz kontaktowy

### Kursy
- Dynamiczne ładowanie kursów z API
- Filtrowanie po poziomie i kategorii z animacją
- Wyszukiwarka po nazwie i opisie z przyciskiem czyszczenia
- Paginacja (9 kursów na stronę) z płynną animacją przejścia
- Dla zalogowanych przycisk "Przejdź do kursu" dla zakupionych kursów

### Zakup
- Symulacja płatności kartą
- Obsługa kuponów rabatowych, live podgląd zniżki
- Email potwierdzający zakup przez EmailJS
- Blokada ponownego zakupu tego samego kursu

### Nauka
- Strona kursu z listą modułów i lekcji (9 kursów z pełną treścią)
- Oznaczanie lekcji jako ukończonych, zapis do bazy
- Pasek postępu w czasie rzeczywistym
- Nawigacja między lekcjami z automatycznym przejściem
- Gwiazdkowe oceny kursów (1-5) z podglądem średniej
- Ostatnio oglądane, zapamiętuje ostatnią lekcję

### Certyfikaty
- Generowane automatycznie po ukończeniu kursu (100%)
- Pobieranie jako plik PNG przez Canvas API
- Dostępne też z poziomu dashboardu

### Dashboard
- Zakupione kursy z postępem pobierane z API
- Sekcja "Ostatnio oglądane" z powrotem do ostatniej lekcji
- Certyfikaty, pobieranie dla ukończonych kursów
- Ustawienia : dane konta, przełącznik motywu

### Chat widget
- Pływający przycisk 💬 w prawym dolnym rogu na każdej stronie
- Panel z formularzem: imię, email, temat, wiadomość
- Dane zalogowanego użytkownika wypełniane automatycznie
- Wiadomości zapisywane do bazy danych

### Powiadomienia
- Bell ikona 🔔 w navbarze dla zalogowanych
- Czerwona kropka z licznikiem nieprzeczytanych
- Dropdown z listą powiadomień, oznaczanie jako przeczytane

### Admin Panel
- Dashboard ze statystykami platformy (użytkownicy, kursy, przychód, zakupy)
- Zarządzanie kursami, dodawanie i usuwanie
- Zarządzanie użytkownikami: lista, usuwanie, profil z postępem
- Wiadomości: przeglądanie, odpowiadanie, oznaczanie przeczytanych, usuwanie, paginacja
- Kupony rabatowe: tworzenie i usuwanie kodów
- Statystyki: wykresy rejestracji, zakupów, poziomów kursów, przychodów (Chart.js)
- Powiadomienia: wysyłanie do wszystkich lub konkretnego użytkownika

---

## Instalacja i uruchomienie

### Wymagania
- Python 3.10+
- VSCode z rozszerzeniem Live Server

### Backend

```bash
cd backend

# Zainstaluj zależności
pip install fastapi uvicorn sqlalchemy "python-jose[cryptography]" "passlib[bcrypt]" python-dotenv "pydantic[email]" "bcrypt==4.0.1"

# Stwórz plik .env
echo SECRET_KEY=superTajnyKluczDoZmiany123! > .env
echo DATABASE_URL=sqlite:///./learnup.db >> .env

# Wypełnij bazę danymi
python seed.py

# Uruchom serwer
python -m uvicorn main:app --reload
```

Backend dostępny pod `http://localhost:8000`
Dokumentacja API: `http://localhost:8000/docs`

### Frontend

Otwórz `frontend/index.html` przez Live Server w VSCode.

---

## Konta testowe

| Rola  | Email | Hasło |
|-------|-------|-------|
| Admin | admin@learnup.pl | admin123! |

Konta użytkowników tworzone są przez rejestrację z weryfikacją emailem.

---

## API Endpoints

| Metoda | Endpoint | Opis |
|--------|----------|------|
| POST | `/api/auth/register` | Rejestracja |
| POST | `/api/auth/verify` | Weryfikacja kodu |
| POST | `/api/auth/login` | Logowanie |
| GET | `/api/auth/me` | Dane zalogowanego użytkownika |
| POST | `/api/auth/reset-request` | Generuj kod resetu hasła |
| POST | `/api/auth/reset-password` | Zmień hasło po kodzie |
| GET | `/api/kursy/` | Lista kursów |
| POST | `/api/kursy/` | Dodaj kurs (admin) |
| DELETE | `/api/kursy/{id}` | Usuń kurs (admin) |
| GET | `/api/zakupy/moje` | Zakupione kursy użytkownika |
| POST | `/api/zakupy/` | Zakup kursu |
| GET | `/api/postep/{kurs_id}` | Postęp w kursie |
| POST | `/api/postep/` | Zapisz ukończoną lekcję |
| DELETE | `/api/postep/` | Odznacz lekcję |
| POST | `/api/oceny/` | Dodaj/zaktualizuj ocenę |
| GET | `/api/oceny/{kurs_id}` | Średnia ocena kursu |
| GET | `/api/oceny/{kurs_id}/moja` | Moja ocena kursu |
| POST | `/api/wiadomosci/` | Wyślij wiadomość |
| GET | `/api/wiadomosci/` | Lista wiadomości (admin) |
| PATCH | `/api/wiadomosci/{id}/przeczytana` | Oznacz jako przeczytana |
| DELETE | `/api/wiadomosci/{id}` | Usuń wiadomość |
| GET | `/api/kupony/sprawdz/{kod}` | Sprawdź kupon |
| POST | `/api/kupony/` | Dodaj kupon (admin) |
| GET | `/api/kupony/` | Lista kuponów (admin) |
| DELETE | `/api/kupony/{id}` | Usuń kupon (admin) |
| GET | `/api/users/` | Lista użytkowników (admin) |
| DELETE | `/api/users/{id}` | Usuń użytkownika (admin) |
| GET | `/api/users/{id}/kursy` | Kursy użytkownika z postępem (admin) |
| GET | `/api/users/stats/overview` | Statystyki platformy (admin) |
| GET | `/api/users/stats/wykresy` | Dane do wykresów (admin) |
| GET | `/api/powiadomienia/` | Moje powiadomienia |
| PATCH | `/api/powiadomienia/{id}/przeczytane` | Oznacz jako przeczytane |
| PATCH | `/api/powiadomienia/przeczytane-wszystkie` | Oznacz wszystkie |
| POST | `/api/powiadomienia/admin/wyslij` | Wyślij powiadomienie (admin) |

---

## EmailJS

Projekt używa EmailJS do wysyłki emaili bez backendu mailowego:
- Potwierdzenie zakupu kursu
- Kod weryfikacyjny przy rejestracji
- Kod resetu hasła

---

## Autorzy

Maksym Jagodziński
Uczelnia: WSPA
Rok akademicki: 2025/2026