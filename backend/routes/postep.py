from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from database import get_db
import models, schemas
import auth as auth_utils

router = APIRouter(prefix="/api/postep", tags=["postep"])


@router.post("/")
def zapisz_postep(
    dane:         schemas.PostepCreate,
    db:           Session = Depends(get_db),
    current_user=Depends(auth_utils.get_current_user)
):
    istniejacy = db.query(models.Postep).filter(
        models.Postep.user_id   == current_user.id,
        models.Postep.kurs_id   == dane.kurs_id,
        models.Postep.lekcja_id == dane.lekcja_id
    ).first()

    if istniejacy:
        return {"message": "Juz istnieje", "id": istniejacy.id}

    postep = models.Postep(
        user_id   = current_user.id,
        kurs_id   = dane.kurs_id,
        lekcja_id = dane.lekcja_id
    )
    db.add(postep)
    db.commit()
    db.refresh(postep)
    return postep


@router.delete("/")
def usun_postep(
    dane:         schemas.PostepCreate,
    db:           Session = Depends(get_db),
    current_user=Depends(auth_utils.get_current_user)
):
    postep = db.query(models.Postep).filter(
        models.Postep.user_id   == current_user.id,
        models.Postep.kurs_id   == dane.kurs_id,
        models.Postep.lekcja_id == dane.lekcja_id
    ).first()

    if postep:
        db.delete(postep)
        db.commit()

    return {"message": "Odznaczono"}


@router.get("/{kurs_id}")
def pobierz_postep(
    kurs_id:      int,
    db:           Session = Depends(get_db),
    current_user=Depends(auth_utils.get_current_user)
):
    postepy = db.query(models.Postep).filter(
        models.Postep.user_id == current_user.id,
        models.Postep.kurs_id == kurs_id
    ).all()
    return [p.lekcja_id for p in postepy]