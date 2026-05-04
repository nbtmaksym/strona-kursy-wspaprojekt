from database import SessionLocal, engine, Base
import models
from auth import hash_password

Base.metadata.create_all(bind=engine)
db = SessionLocal()

istniejacy_admin = db.query(models.User).filter(models.User.email == "admin@learnup.pl").first()
if not istniejacy_admin:
    admin = models.User(
        name          = "Admin LearnUp",
        email         = "admin@learnup.pl",
        password_hash = hash_password("admin123!"),
        is_admin      = True,
        is_active     = True
    )
    db.add(admin)
    db.commit()
    print("Admin utworzony: admin@learnup.pl / admin123!")
else:
    print("Admin juz istnieje")

# KURSY
kursy = [
    { "nazwa": "HTML & CSS — od zera do bohatera",  "opis": "Zbuduj swoją pierwszą stronę.", "poziom": "beginner", "kategoria": "programming", "cena": 149.0, "czas_godz": 12, "liczba_lekc": 12 },
    { "nazwa": "JavaScript — interaktywne strony",  "opis": "Naucz się JavaScript od podstaw.", "poziom": "beginner", "kategoria": "programming", "cena": 199.0, "czas_godz": 18, "liczba_lekc": 16 },
    { "nazwa": "Python — pierwsze kroki",            "opis": "Podstawy Pythona.", "poziom": "beginner", "kategoria": "data", "cena": 179.0, "czas_godz": 14, "liczba_lekc": 8 },
    { "nazwa": "React.js — nowoczesny frontend",     "opis": "Twórz dynamiczne aplikacje.", "poziom": "mid", "kategoria": "programming", "cena": 299.0, "czas_godz": 22, "liczba_lekc": 90 },
    { "nazwa": "Python — analiza danych",            "opis": "Pandas, NumPy, matplotlib.", "poziom": "mid", "kategoria": "data", "cena": 249.0, "czas_godz": 20, "liczba_lekc": 80 },
    { "nazwa": "UI/UX Design — podstawy",            "opis": "Zasady projektowania w Figmie.", "poziom": "mid", "kategoria": "design", "cena": 229.0, "czas_godz": 16, "liczba_lekc": 64 },
    { "nazwa": "Node.js & REST API",                 "opis": "Buduj serwery i API.", "poziom": "adv", "kategoria": "programming", "cena": 349.0, "czas_godz": 25, "liczba_lekc": 100 },
    { "nazwa": "UI/UX Design — Figma Pro",           "opis": "Wireframing i prototypy.", "poziom": "adv", "kategoria": "design", "cena": 279.0, "czas_godz": 16, "liczba_lekc": 64 },
    { "nazwa": "Machine Learning z Pythonem",        "opis": "Scikit-learn i TensorFlow.", "poziom": "adv", "kategoria": "data", "cena": 399.0, "czas_godz": 30, "liczba_lekc": 120 },
]

istniejace = db.query(models.Kurs).count()
if istniejace == 0:
    for k in kursy:
        db.add(models.Kurs(**k))
    db.commit()
    print(f"Dodano {len(kursy)} kursow")
else:
    print(f"Kursy juz istnieja ({istniejace})")

db.close()
print("Seed zakonczony!")