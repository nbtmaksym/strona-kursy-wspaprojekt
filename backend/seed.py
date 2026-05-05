from database import SessionLocal, engine, Base
import models
from auth import hash_password
import random

Base.metadata.create_all(bind=engine)
db = SessionLocal()

print("=== Czyszczenie bazy ===")
db.query(models.Powiadomienie).delete()
db.query(models.Kupon).delete()
db.query(models.Wiadomosc).delete()
db.query(models.Ocena).delete()
db.query(models.Postep).delete()
db.query(models.Zakup).delete()
db.query(models.VerificationCode).delete()
db.query(models.Kurs).delete()
db.query(models.User).delete()
db.commit()
print("Baza wyczyszczona!")

admin = models.User(
    name          = "Admin LearnUp",
    email         = "admin@learnup.pl",
    password_hash = hash_password("admin123!"),
    is_admin      = True,
    is_active     = True
)
db.add(admin)
db.commit()
db.refresh(admin)
print("Admin: admin@learnup.pl / admin123!")

kursy_data = [
    { "nazwa": "HTML & CSS — od zera do bohatera",     "opis": "Zbuduj swoją pierwszą stronę internetową bez wcześniejszej wiedzy. Poznaj HTML5 i CSS3.",                          "poziom": "beginner", "kategoria": "programming", "cena": 149.0, "czas_godz": 12, "liczba_lekc": 12 },
    { "nazwa": "JavaScript — interaktywne strony",     "opis": "Naucz się JavaScript od podstaw. Zmienne, funkcje, DOM i pierwsza aplikacja webowa.",                              "poziom": "beginner", "kategoria": "programming", "cena": 199.0, "czas_godz": 18, "liczba_lekc": 16 },
    { "nazwa": "Git & GitHub — kontrola wersji",       "opis": "Naucz się zarządzać kodem. Commity, branche, pull requesty i praca zespołowa na GitHubie.",                        "poziom": "beginner", "kategoria": "programming", "cena": 99.0,  "czas_godz": 8,  "liczba_lekc": 10 },
    { "nazwa": "TypeScript — typowany JavaScript",     "opis": "Naucz się TypeScript od podstaw. Typy, interfejsy, generyki i integracja z React.",                                "poziom": "mid",      "kategoria": "programming", "cena": 229.0, "czas_godz": 18, "liczba_lekc": 14 },
    { "nazwa": "React.js — nowoczesny frontend",       "opis": "Twórz dynamiczne aplikacje z najpopularniejszą biblioteką JavaScript. Hooks, routing, API.",                       "poziom": "mid",      "kategoria": "programming", "cena": 299.0, "czas_godz": 22, "liczba_lekc": 13 },
    { "nazwa": "Vue.js — progresywny framework",       "opis": "Buduj aplikacje z Vue 3. Composition API, Pinia, Vue Router i integracja z backendem.",                           "poziom": "mid",      "kategoria": "programming", "cena": 269.0, "czas_godz": 20, "liczba_lekc": 12 },
    { "nazwa": "Node.js & REST API",                   "opis": "Buduj serwery i API od podstaw. Express, bazy danych, JWT i deployment na produkcję.",                            "poziom": "adv",      "kategoria": "programming", "cena": 349.0, "czas_godz": 25, "liczba_lekc": 12 },
    { "nazwa": "Docker & DevOps podstawy",             "opis": "Konteneryzacja aplikacji, CI/CD, automatyzacja deploymentu. Docker, GitHub Actions.",                              "poziom": "adv",      "kategoria": "programming", "cena": 319.0, "czas_godz": 22, "liczba_lekc": 11 },
    { "nazwa": "Algorytmy i struktury danych",         "opis": "Sortowanie, drzewa, grafy i złożoność obliczeniowa. Przygotowanie do rozmów rekrutacyjnych.",                      "poziom": "adv",      "kategoria": "programming", "cena": 279.0, "czas_godz": 20, "liczba_lekc": 10 },
    { "nazwa": "Python — pierwsze kroki",              "opis": "Podstawy Pythona dla osób bez doświadczenia. Logika, pętle, funkcje i pierwsze skrypty.",                         "poziom": "beginner", "kategoria": "data",        "cena": 179.0, "czas_godz": 14, "liczba_lekc": 8  },
    { "nazwa": "SQL — bazy danych od podstaw",         "opis": "Naucz się pisać zapytania SQL. SELECT, JOIN, GROUP BY i projektowanie schematów baz danych.",                     "poziom": "beginner", "kategoria": "data",        "cena": 149.0, "czas_godz": 12, "liczba_lekc": 10 },
    { "nazwa": "Python — analiza danych",              "opis": "Pandas, NumPy, matplotlib. Przetwarzaj i wizualizuj dane jak profesjonalista.",                                    "poziom": "mid",      "kategoria": "data",        "cena": 249.0, "czas_godz": 20, "liczba_lekc": 11 },
    { "nazwa": "Power BI — analiza biznesowa",         "opis": "Twórz interaktywne dashboardy i raporty biznesowe. DAX, Power Query i wizualizacje danych.",                      "poziom": "mid",      "kategoria": "data",        "cena": 219.0, "czas_godz": 16, "liczba_lekc": 10 },
    { "nazwa": "Machine Learning z Pythonem",          "opis": "Scikit-learn, TensorFlow, modele klasyfikacji i regresji. Od teorii do wdrożenia.",                               "poziom": "adv",      "kategoria": "data",        "cena": 399.0, "czas_godz": 30, "liczba_lekc": 12 },
    { "nazwa": "UI/UX Design — podstawy",              "opis": "Zasady projektowania, typografia, kolory i pierwsze projekty w Figmie. Teoria i praktyka.",                       "poziom": "mid",      "kategoria": "design",      "cena": 229.0, "czas_godz": 16, "liczba_lekc": 12 },
    { "nazwa": "UI/UX Design — Figma Pro",             "opis": "Zaawansowana Figma: design systemy, prototypowanie, animacje i handoff dla deweloperów.",                         "poziom": "adv",      "kategoria": "design",      "cena": 279.0, "czas_godz": 16, "liczba_lekc": 12 },
    { "nazwa": "Grafika komputerowa — Adobe PS",       "opis": "Photoshop od podstaw. Retusz zdjęć, compositing, grafiki na social media i eksport do web.",                     "poziom": "beginner", "kategoria": "design",      "cena": 189.0, "czas_godz": 14, "liczba_lekc": 10 },
    { "nazwa": "Motion Design — After Effects",        "opis": "Animacje i efekty wizualne w After Effects. Kinematyka, expresje i eksport animacji do web.",                     "poziom": "adv",      "kategoria": "design",      "cena": 329.0, "czas_godz": 24, "liczba_lekc": 11 },
]

kursy_obiekty = []
for k in kursy_data:
    kurs = models.Kurs(**k)
    db.add(kurs)
    kursy_obiekty.append(kurs)
db.commit()
for k in kursy_obiekty:
    db.refresh(k)
print(f"Dodano {len(kursy_obiekty)} kursów")

uzytkownicy_data = [
    { "name": "Maksym Jagodzinski",  "email": "maksym@learnup.pl"   },
    { "name": "Anna Kowalska",       "email": "anna@learnup.pl"     },
    { "name": "Piotr Nowak",         "email": "piotr@learnup.pl"    },
    { "name": "Maria Wiśniewska",    "email": "maria@learnup.pl"    },
    { "name": "Tomasz Zając",        "email": "tomasz@learnup.pl"   },
    { "name": "Karolina Dąbrowska",  "email": "karolina@learnup.pl" },
    { "name": "Michał Lewandowski",  "email": "michal@learnup.pl"   },
    { "name": "Natalia Kamińska",    "email": "natalia@learnup.pl"  },
    { "name": "Bartosz Kowalczyk",   "email": "bartosz@learnup.pl"  },
    { "name": "Zuzanna Wójcik",      "email": "zuzanna@learnup.pl"  },
]

users_obiekty = []
for u in uzytkownicy_data:
    user = models.User(
        name          = u["name"],
        email         = u["email"],
        password_hash = hash_password("haslo123!"),
        is_admin      = False,
        is_active     = True
    )
    db.add(user)
    users_obiekty.append(user)
db.commit()
for u in users_obiekty:
    db.refresh(u)
print(f"Dodano {len(users_obiekty)} użytkowników (hasło: haslo123!)")

zakupy_count = 0
postep_count = 0

for user in users_obiekty:
    liczba_kursow = random.randint(2, 5)
    wybrane_kursy = random.sample(kursy_obiekty, liczba_kursow)

    for kurs in wybrane_kursy:
        zakup = models.Zakup(user_id=user.id, kurs_id=kurs.id, cena=kurs.cena)
        db.add(zakup)
        zakupy_count += 1

        procent = random.choice([0, 25, 50, 75, 100])
        lekcje_do_ukonczenia = int(kurs.liczba_lekc * procent / 100)
        for lekcja_id in range(1, lekcje_do_ukonczenia + 1):
            db.add(models.Postep(user_id=user.id, kurs_id=kurs.id, lekcja_id=lekcja_id))
            postep_count += 1

db.commit()
print(f"Dodano {zakupy_count} zakupów i {postep_count} rekordów postępu")

oceny_count = 0
for user in users_obiekty:
    zakupy = db.query(models.Zakup).filter(models.Zakup.user_id == user.id).all()
    for zakup in zakupy:
        if random.random() > 0.3:
            db.add(models.Ocena(user_id=user.id, kurs_id=zakup.kurs_id, gwiazdki=random.randint(3, 5)))
            oceny_count += 1
db.commit()
print(f"Dodano {oceny_count} ocen")

kupony = [
    { "kod": "LEARNUP10", "rabat": 10 },
    { "kod": "LEARNUP20", "rabat": 20 },
    { "kod": "STUDENT50", "rabat": 50 },
    { "kod": "WELCOME15", "rabat": 15 },
    { "kod": "PROMO30",   "rabat": 30 },
]
for k in kupony:
    db.add(models.Kupon(kod=k["kod"], rabat=k["rabat"], aktywny=True))
db.commit()
print(f"Dodano {len(kupony)} kuponów")

wiadomosci = [
    { "imie": "Anna Kowalska",      "email": "anna@learnup.pl",     "temat": "Pytanie o kurs React",   "tresc": "Czy kurs React jest odpowiedni dla kogoś kto zna już JavaScript? Chciałabym wiedzieć od czego zacząć." },
    { "imie": "Piotr Nowak",        "email": "piotr@learnup.pl",    "temat": "Problem z certyfikatem", "tresc": "Ukończyłem kurs Python ale nie mogę pobrać certyfikatu. Przycisk nie reaguje na kliknięcie." },
    { "imie": "Tomasz Zając",       "email": "tomasz@learnup.pl",   "temat": "Faktura za zakup",       "tresc": "Potrzebuję faktury VAT za zakupiony kurs Node.js. Jak mogę ją otrzymać?" },
    { "imie": "Karolina Dąbrowska", "email": "karolina@learnup.pl", "temat": "Sugestia nowego kursu",  "tresc": "Czy planujecie dodać kurs z Flutter lub React Native? Byłoby świetne uzupełnienie oferty!" },
    { "imie": "Michał Lewandowski", "email": "michal@learnup.pl",   "temat": "Błąd przy zakupie",      "tresc": "Przy próbie zakupu kursu Docker pojawia się błąd. Próbowałem kilka razy ale bez skutku." },
]
for w in wiadomosci:
    db.add(models.Wiadomosc(**w))
db.commit()
print(f"Dodano {len(wiadomosci)} wiadomości")
pow_data = [
    "🎉 Witaj na platformie LearnUp! Sprawdź naszą ofertę kursów.",
    "🆕 Nowy kurs dostępny: Docker & DevOps podstawy!",
    "🎟️ Specjalna oferta: użyj kodu LEARNUP20 i oszczędź 20%!",
]
pow_count = 0
for user in users_obiekty:
    for tresc in pow_data:
        db.add(models.Powiadomienie(user_id=user.id, tresc=tresc, przeczytane=False))
        pow_count += 1
db.commit()
print(f"Dodano {pow_count} powiadomień")

db.close()

print("\n=============================")
print("        SEED ZAKOŃCZONY       ")
print("=============================")
print(f"  Kursy:        {len(kursy_obiekty)}")
print(f"  Użytkownicy:  {len(users_obiekty)}")
print(f"  Zakupy:       {zakupy_count}")
print(f"  Kupony:       LEARNUP10, LEARNUP20, STUDENT50, WELCOME15, PROMO30")
print("\n  Admin:   admin@learnup.pl / admin123!")
print("  Tester:  anna@learnup.pl / haslo123!")
print("=============================")