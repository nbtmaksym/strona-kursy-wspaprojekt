from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
import models, schemas
import auth as auth_utils
import random

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/register")
def register(user_data: schemas.UserCreate, db: Session = Depends(get_db)):
    """
    Rejestracja - tworzy konto i zwraca kod weryfikacyjny.
    Frontend wysyła ten kod emailem przez EmailJS.
    Konto jest nieaktywne dopóki użytkownik nie poda kodu.
    """

    istniejacy = db.query(models.User).filter(
        models.User.email == user_data.email
    ).first()

    if istniejacy:
        raise HTTPException(status_code=400, detail="Użytkownik z tym emailem już istnieje")

    if len(user_data.password) < 8:
        raise HTTPException(status_code=400, detail="Hasło musi mieć minimum 8 znaków")

    nowy_user = models.User(
        name          = user_data.name,
        email         = user_data.email,
        password_hash = auth_utils.hash_password(user_data.password),
        is_active     = False  # aktywuje się po weryfikacji
    )
    db.add(nowy_user)
    db.commit()
    db.refresh(nowy_user)
    db.query(models.VerificationCode).filter(
        models.VerificationCode.user_id == nowy_user.id
    ).delete()

    kod = str(random.randint(100000, 999999))

    verification = models.VerificationCode(
        user_id = nowy_user.id,
        kod     = kod
    )
    db.add(verification)
    db.commit()

    return {
        "message": "Konto utworzone. Wyślij kod weryfikacyjny.",
        "user_id": nowy_user.id,
        "name":    nowy_user.name,
        "email":   nowy_user.email,
        "kod":     kod 
    }


@router.post("/verify")
def verify(dane: schemas.VerifyCode, db: Session = Depends(get_db)):
    """Weryfikacja kodu — aktywuje konto"""

    user = db.query(models.User).filter(
        models.User.email == dane.email
    ).first()

    if not user:
        raise HTTPException(status_code=404, detail="Użytkownik nie istnieje")

    verification = db.query(models.VerificationCode).filter(
        models.VerificationCode.user_id == user.id,
        models.VerificationCode.kod     == dane.kod
    ).first()

    if not verification:
        raise HTTPException(status_code=400, detail="Nieprawidłowy kod weryfikacyjny")
    user.is_active = True
    db.delete(verification)
    db.commit()

    return {"message": "Konto zweryfikowane! Możesz się zalogować."}


@router.post("/login", response_model=schemas.Token)
def login(dane: schemas.UserLogin, db: Session = Depends(get_db)):
    """Logowanie — zwraca token JWT"""

    user = db.query(models.User).filter(
        models.User.email == dane.email
    ).first()

    if not user or not auth_utils.verify_password(dane.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Nieprawidłowy email lub hasło")

    if not user.is_active:
        raise HTTPException(status_code=403, detail="Konto nie zostało zweryfikowane. Sprawdź email.")

    token = auth_utils.create_token({"sub": user.email})
    return {"access_token": token, "token_type": "bearer"}


@router.get("/me", response_model=schemas.UserOut)
def get_me(current_user=Depends(auth_utils.get_current_user)):
    """Zwraca dane zalogowanego użytkownika"""
    return current_user

@router.post("/reset-request")
def reset_request(dane: schemas.EmailOnly, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(
        models.User.email == dane.email
    ).first()

    if not user:
        raise HTTPException(status_code=404, detail="Nie znaleziono konta z tym emailem")

    db.query(models.VerificationCode).filter(
        models.VerificationCode.user_id == user.id
    ).delete()

    kod = str(random.randint(100000, 999999))
    verification = models.VerificationCode(
        user_id = user.id,
        kod     = kod
    )
    db.add(verification)
    db.commit()

    return {
        "message": "Kod resetu wygenerowany",
        "email":   user.email,
        "name":    user.name,
        "kod":     kod
    }


@router.post("/reset-password")
def reset_password(dane: schemas.ResetPassword, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(
        models.User.email == dane.email
    ).first()

    if not user:
        raise HTTPException(status_code=404, detail="Użytkownik nie istnieje")

    verification = db.query(models.VerificationCode).filter(
        models.VerificationCode.user_id == user.id,
        models.VerificationCode.kod     == dane.kod
    ).first()

    if not verification:
        raise HTTPException(status_code=400, detail="Nieprawidłowy kod")

    if len(dane.new_password) < 8:
        raise HTTPException(status_code=400, detail="Hasło musi mieć minimum 8 znaków")

    user.password_hash = auth_utils.hash_password(dane.new_password)
    db.delete(verification)
    db.commit()

    return {"message": "Hasło zostało zmienione"}