from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
import models
import schemas
import auth as auth_utils

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/register", response_model=schemas.UserOut)
def register(user_data: schemas.UserCreate, db: Session = Depends(get_db)):

    istniejacy = db.query(models.User).filter(
        models.User.email == user_data.email
    ).first()

    if istniejacy:
        raise HTTPException(
            status_code=400,
            detail="Użytkownik z tym emailem już istnieje"
        )

    nowy_user = models.User(
        name          = user_data.name,
        email         = user_data.email,
        password_hash = auth_utils.hash_password(user_data.password)
    )

    db.add(nowy_user)
    db.commit()
    db.refresh(nowy_user)
    return nowy_user


@router.post("/login", response_model=schemas.Token)
def login(dane: schemas.UserLogin, db: Session = Depends(get_db)):
    """Logowanie zwraca token JWT"""

    user = db.query(models.User).filter(
        models.User.email == dane.email
    ).first()

    if not user or not auth_utils.verify_password(dane.password, user.password_hash):
        raise HTTPException(
            status_code=401,
            detail="Nieprawidłowy email lub hasło"
        )

    if not user.is_active:
        raise HTTPException(
            status_code=403,
            detail="Konto jest nieaktywne"
        )

    token = auth_utils.create_token({"sub": user.email})
    return {"access_token": token, "token_type": "bearer"}


@router.get("/me", response_model=schemas.UserOut)
def get_me(current_user=Depends(auth_utils.get_current_user)):
    """Zwraca dane zalogowanego użytkownika"""
    return current_user