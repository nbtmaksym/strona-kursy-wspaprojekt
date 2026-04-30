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
    """Zakup kursu przez zalogowanego użytkownika"""

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


@router.get("/moje", response_model=List[schemas.ZakupOut])
def moje_zakupy(
    db:           Session = Depends(get_db),
    current_user=Depends(auth_utils.get_current_user)
):
    """Pobierz wszystkie zakupy zalogowanego użytkownika"""
    return db.query(models.Zakup).filter(
        models.Zakup.user_id == current_user.id
    ).all()


@router.get("/all", response_model=List[schemas.ZakupOut])
def wszystkie_zakupy(
    db:    Session = Depends(get_db),
    admin=Depends(auth_utils.require_admin)
):
    """Wszystkie zakupy — tylko admin"""
    return db.query(models.Zakup).all()