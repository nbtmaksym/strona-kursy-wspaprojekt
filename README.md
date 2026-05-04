# LearnUp — Platforma Kursów Online

Projekt zaliczeniowy — webowa platforma e-learningowa zbudowana w technologii fullstack. Użytkownicy mogą przeglądać kursy, zakupić dostęp, śledzić postęp nauki i pobierać certyfikaty ukończenia.

---

## Technologie

**Frontend**
- HTML5, CSS3, Vanilla JavaScript
- EmailJS (wysyłka emaili potwierdzających zakup)
- Canvas API (generowanie certyfikatów)

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
│   ├── kursy.html              # Lista kursów z filtrowaniem
│   ├── kurs.html               # Widok kursu z lekcjami
│   ├── zakup.html              # Formularz zakupu
│   ├── login.html              # Logowanie
│   ├── register.html           # Rejestracja
│   ├── verify.html             # Weryfikacja konta emailem
│   ├── dashboard.html          # Panel użytkownika
│   ├── admin/
│   │   ├── index.html          # Panel admina — statystyki
│   │   ├── kursy.html          # Zarządzanie kursami
│   │   └── uzytkownicy.html    # Zarządzanie użytkownikami
│   ├── css/
│   │   ├── style.css           # Główne style
│   │   ├── kurs.css            # Style strony kursu
│   │   ├── zakup.css           # Style strony zakupu
│   │   └── admin.css           # Style panelu admina
│   └── js/
│       ├── api.js              # Funkcje pomocnicze, navbar, auth
│       ├── main.js             # Animacje, formularz kontaktowy
│       ├── auth.js             # Rejestracja i logowanie
│       ├── dashboard.js        # Panel użytkownika
│       ├── kurs.js             # Logika strony kursu
│       └── zakup.js            # Formularz zakupu
└── backend/
    ├── main.py                 # Główna aplikacja FastAPI
    ├── database.py             # Konfiguracja bazy danych
    ├── models.py               # Modele SQLAlchemy
    ├── schemas.py              # Schematy Pydantic
    ├── auth.py                 # JWT i haszowanie haseł
    ├── seed.py                 # Wypełnianie bazy danymi
    └── routes/
        ├── auth.py             # Endpointy autoryzacji
        ├── kursy.py            # Endpointy kursów
        ├── users.py            # Endpointy użytkowników
        ├── zakupy.py           # Endpointy zakupów
        └── postep.py           # Endpointy postępu
```

---

## Funkcjonalności

### Użytkownik
- Rejestracja z weryfikacją emailem (6-cyfrowy kod)
- Logowanie z tokenem JWT (ważny 24h)
- Navbar dynamiczny — avatar z dropdown gdy zalogowany
- Tryb jasny / ciemny

### Kursy
- 9 kursów w 3 kategoriach (Programowanie, Design, Dane)
- Filtrowanie po poziomie i kategorii z animacją
- Dla zalogowanych — przycisk "Przejdź do kursu" zamiast "Kup kurs" dla zakupionych kursów

### Zakup
- Symulacja płatności kartą (bez prawdziwych transakcji)
- Zapis zakupu do bazy danych
- Email potwierdzający zakup przez EmailJS
- Blokada ponownego zakupu tego samego kursu

### Nauka
- Strona kursu z listą modułów i lekcji
- Oznaczanie lekcji jako ukończonych (zapis do bazy)
- Pasek postępu
- Nawigacja między lekcjami
- Automatyczne przejście do następnej lekcji po ukończeniu

### Certyfikaty
- Generowane automatycznie po ukończeniu kursu (100%)
- Pobieranie jako plik PNG
- Generowane przez Canvas API z imieniem użytkownika

### Dashboard
- Zakupione kursy z postępem (pobierane z API)
- Podział na aktywne i ukończone
- Statystyki (aktywne kursy, ukończone, certyfikaty)
- Przycisk "Wróć do kursu" i "Pobierz certyfikat" dla ukończonych

### Admin Panel
- Statystyki platformy
- Zarządzanie kursami (CRUD)
- Zarządzanie użytkownikami

---

## Instalacja i uruchomienie

### Wymagania
- Python 3.10+
- Node.js (opcjonalnie, tylko dla Live Server w VSCode)
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

Backend będzie dostępny pod `http://localhost:8000`
Dokumentacja API: `http://localhost:8000/docs`

### Frontend

Otwórz `frontend/index.html` przez Live Server w VSCode (prawy klik → Open with Live Server).

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
| GET | `/api/zakupy/moje` | Zakupione kursy użytkownika |
| POST | `/api/zakupy/` | Zakup kursu |
| GET | `/api/postep/{kurs_id}` | Postęp w kursie |
| POST | `/api/postep/` | Zapisz ukończoną lekcję |
| DELETE | `/api/postep/` | Odznacz lekcję |

---

## EmailJS

Projekt używa EmailJS do wysyłki emaili bez backendu mailowego.

- Potwierdzenie zakupu kursu
- Kod weryfikacyjny przy rejestracji

---

## Autorzy

Projekt zespołowy — przedmiot: Aplikacje Webowe  
Uczelnia: WSPA  
Rok akademicki: 2025/2026
