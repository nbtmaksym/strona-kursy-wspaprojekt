from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from database import get_db
import models, schemas
import auth as auth_utils

router = APIRouter(prefix="/api/postep", tags=["postep"])


@router.post("/", response_model=schemas.PostepOut)
def zapisz_postep(
    dane:         schemas.PostepCreate,
    db:           Session = Depends(get_db),
    current_user=Depends(auth_utils.get_current_user)
):
    """Zapisz ukończoną lekcję"""

    istniejacy = db.query(models.Postep).filter(
        models.Postep.user_id  == current_user.id,
        models.Postep.kurs_id  == dane.kurs_id,
        models.Postep.lekcja_id == dane.lekcja_id
    ).first()

    if istniejacy:
        return istniejacy  

    postep = models.Postep(
        user_id   = current_user.id,
        kurs_id   = dane.kurs_id,
        lekcja_id = dane.lekcja_id
    )
    db.add(postep)
    db.commit()
    db.refresh(postep)
    return postep


@router.get("/{kurs_id}", response_model=List[schemas.PostepOut])
def pobierz_postep(
    kurs_id:      int,
    db:           Session = Depends(get_db),
    current_user=Depends(auth_utils.get_current_user)
):
    """Pobierz postęp użytkownika w danym kursie"""
    return db.query(models.Postep).filter(
        models.Postep.user_id == current_user.id,
        models.Postep.kurs_id == kurs_id
    ).all()