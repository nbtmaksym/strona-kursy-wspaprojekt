from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from database import get_db
import models
import schemas
import auth as auth_utils

router = APIRouter(prefix="/api/users", tags=["users"])


@router.get("/", response_model=List[schemas.UserOut])
def get_users(
    db:    Session = Depends(get_db),
    admin=Depends(auth_utils.require_admin)
):
    return db.query(models.User).all()


@router.get("/{user_id}", response_model=schemas.UserOut)
def get_user(
    user_id: int,
    db:      Session = Depends(get_db),
    admin=Depends(auth_utils.require_admin)
):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Użytkownik nie istnieje")
    return user


@router.delete("/{user_id}")
def delete_user(
    user_id: int,
    db:      Session = Depends(get_db),
    admin=Depends(auth_utils.require_admin)
):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Użytkownik nie istnieje")
    db.delete(user)
    db.commit()
    return {"message": "Użytkownik usunięty"}

@router.get("/stats/overview")
def get_stats(
    db:    Session = Depends(get_db),
    admin=Depends(auth_utils.require_admin)
):
    from models import Zakup
    uzytkownicy = db.query(models.User).filter(models.User.is_admin == False).count()
    kursy = db.query(models.Kurs).count()
    zakupy = db.query(Zakup).all()
    przychod = sum(z.cena for z in zakupy)
    return {
        "uzytkownicy": uzytkownicy,
        "kursy": kursy,
        "przychod": przychod,
        "zakupy": len(zakupy)
    }

@router.get("/{user_id}/kursy")
def get_user_kursy(
    user_id: int,
    db:      Session = Depends(get_db),
    admin=Depends(auth_utils.require_admin)
):
    from models import Zakup, Postep, Kurs
    zakupy = db.query(Zakup).filter(Zakup.user_id == user_id).all()
    wynik = []
    for z in zakupy:
        kurs = db.query(Kurs).filter(Kurs.id == z.kurs_id).first()
        if kurs:
            postep = db.query(Postep).filter(
                Postep.user_id == user_id,
                Postep.kurs_id == z.kurs_id
            ).count()
            procent = round((postep / kurs.liczba_lekc) * 100) if kurs.liczba_lekc > 0 else 0
            wynik.append({
                "kurs_id":     kurs.id,
                "nazwa":       kurs.nazwa,
                "poziom":      kurs.poziom,
                "liczba_lekc": kurs.liczba_lekc,
                "ukonczone":   postep,
                "procent":     procent,
                "data_zakupu": z.created_at.isoformat()
            })
    return wynik
@router.get("/stats/wykresy")
def get_stats_wykresy(
    db:    Session = Depends(get_db),
    admin=Depends(auth_utils.require_admin)
):
    from models import Zakup
    from sqlalchemy import func as sqlfunc

    # Rejestracje po dniach (ostatnie 7 dni)
    rejestracje = db.query(
        sqlfunc.date(models.User.created_at).label('dzien'),
        sqlfunc.count(models.User.id).label('liczba')
    ).group_by(sqlfunc.date(models.User.created_at))\
     .order_by(sqlfunc.date(models.User.created_at))\
     .limit(30).all()

    zakupy = db.query(
        sqlfunc.date(Zakup.created_at).label('dzien'),
        sqlfunc.count(Zakup.id).label('liczba')
    ).group_by(sqlfunc.date(Zakup.created_at))\
     .order_by(sqlfunc.date(Zakup.created_at))\
     .limit(30).all()

    return {
        "rejestracje": [{"dzien": str(r.dzien), "liczba": r.liczba} for r in rejestracje],
        "zakupy":      [{"dzien": str(z.dzien), "liczba": z.liczba} for z in zakupy]
    }