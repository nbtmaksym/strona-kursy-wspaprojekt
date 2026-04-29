from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from database import get_db
import models
import schemas
import auth as auth_utils

router = APIRouter(prefix="/api/kursy", tags=["kursy"])


@router.get("/", response_model=List[schemas.KursOut])
def get_kursy(
    poziom:    str = None,
    kategoria: str = None,
    db:        Session = Depends(get_db)
):
    query = db.query(models.Kurs)

    if poziom:
        query = query.filter(models.Kurs.poziom == poziom)
    if kategoria:
        query = query.filter(models.Kurs.kategoria == kategoria)

    return query.all()


@router.get("/{kurs_id}", response_model=schemas.KursOut)
def get_kurs(kurs_id: int, db: Session = Depends(get_db)):
    kurs = db.query(models.Kurs).filter(models.Kurs.id == kurs_id).first()
    if not kurs:
        raise HTTPException(status_code=404, detail="Kurs nie istnieje")
    return kurs


@router.post("/", response_model=schemas.KursOut)
def create_kurs(
    kurs_data: schemas.KursCreate,
    db:        Session = Depends(get_db),
    admin=Depends(auth_utils.require_admin)
):
    nowy_kurs = models.Kurs(**kurs_data.dict())
    db.add(nowy_kurs)
    db.commit()
    db.refresh(nowy_kurs)
    return nowy_kurs


@router.delete("/{kurs_id}")
def delete_kurs(
    kurs_id: int,
    db:      Session = Depends(get_db),
    admin=Depends(auth_utils.require_admin)
):
    kurs = db.query(models.Kurs).filter(models.Kurs.id == kurs_id).first()
    if not kurs:
        raise HTTPException(status_code=404, detail="Kurs nie istnieje")
    db.delete(kurs)
    db.commit()
    return {"message": "Kurs usunięty"}