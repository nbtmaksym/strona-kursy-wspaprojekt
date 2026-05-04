from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from database import get_db
import models, schemas
import auth as auth_utils

router = APIRouter(prefix="/api/zakupy", tags=["zakupy"])


@router.post("/", response_model=schemas.ZakupOut)
def kup_kurs(
    dane:         schemas.ZakupCreate,
    db:           Session = Depends(get_db),
    current_user=Depends(auth_utils.get_current_user)
):
    kurs = db.query(models.Kurs).filter(models.Kurs.id == dane.kurs_id).first()
    if not kurs:
        raise HTTPException(status_code=404, detail="Kurs nie istnieje")

    istniejacy = db.query(models.Zakup).filter(
        models.Zakup.user_id == current_user.id,
        models.Zakup.kurs_id == dane.kurs_id
    ).first()
    if istniejacy:
        raise HTTPException(status_code=400, detail="Kurs już zakupiony")

    zakup = models.Zakup(
        user_id = current_user.id,
        kurs_id = dane.kurs_id,
        cena    = kurs.cena
    )
    db.add(zakup)
    db.commit()
    db.refresh(zakup)
    return zakup


@router.get("/moje")
def moje_zakupy(
    db:           Session = Depends(get_db),
    current_user=Depends(auth_utils.get_current_user)
):
    """Zwraca zakupione kursy z pełnymi detalami"""
    zakupy = db.query(models.Zakup).filter(
        models.Zakup.user_id == current_user.id
    ).all()

    wynik = []
    for z in zakupy:
        kurs = db.query(models.Kurs).filter(models.Kurs.id == z.kurs_id).first()
        if kurs:
            wynik.append({
                "zakup_id":    z.id,
                "kurs_id":     kurs.id,
                "nazwa":       kurs.nazwa,
                "poziom":      kurs.poziom,
                "kategoria":   kurs.kategoria,
                "cena":        kurs.cena,
                "czas_godz":   kurs.czas_godz,
                "liczba_lekc": kurs.liczba_lekc,
                "data_zakupu": z.created_at.isoformat()
            })
    return wynik


@router.get("/all")
def wszystkie_zakupy(
    db:    Session = Depends(get_db),
    admin=Depends(auth_utils.require_admin)
):
    zakupy = db.query(models.Zakup).all()
    wynik = []
    for z in zakupy:
        user = db.query(models.User).filter(models.User.id == z.user_id).first()
        kurs = db.query(models.Kurs).filter(models.Kurs.id == z.kurs_id).first()
        wynik.append({
            "id":          z.id,
            "user_name":   user.name if user else "?",
            "user_email":  user.email if user else "?",
            "kurs_nazwa":  kurs.nazwa if kurs else "?",
            "cena":        z.cena,
            "created_at":  z.created_at.isoformat()
        })
    return wynik