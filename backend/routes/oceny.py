from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
import models
import auth as auth_utils

router = APIRouter(prefix="/api/oceny", tags=["oceny"])


@router.post("/")
def dodaj_ocene(
    dane:         dict,
    db:           Session = Depends(get_db),
    current_user=Depends(auth_utils.get_current_user)
):
    if dane.get("gwiazdki") not in [1, 2, 3, 4, 5]:
        raise HTTPException(status_code=400, detail="Ocena musi być od 1 do 5")

    istniejaca = db.query(models.Ocena).filter(
        models.Ocena.user_id == current_user.id,
        models.Ocena.kurs_id == dane.get("kurs_id")
    ).first()

    if istniejaca:
        istniejaca.gwiazdki = dane.get("gwiazdki")
        db.commit()
        return {"message": "Ocena zaktualizowana"}

    ocena = models.Ocena(
        user_id  = current_user.id,
        kurs_id  = dane.get("kurs_id"),
        gwiazdki = dane.get("gwiazdki")
    )
    db.add(ocena)
    db.commit()
    return {"message": "Ocena dodana"}


@router.get("/{kurs_id}")
def pobierz_ocene_kursu(kurs_id: int, db: Session = Depends(get_db)):
    oceny = db.query(models.Ocena).filter(models.Ocena.kurs_id == kurs_id).all()
    if not oceny:
        return {"srednia": 0, "liczba": 0}
    srednia = round(sum(o.gwiazdki for o in oceny) / len(oceny), 1)
    return {"srednia": srednia, "liczba": len(oceny)}


@router.get("/{kurs_id}/moja")
def moja_ocena(
    kurs_id:      int,
    db:           Session = Depends(get_db),
    current_user=Depends(auth_utils.get_current_user)
):
    ocena = db.query(models.Ocena).filter(
        models.Ocena.user_id == current_user.id,
        models.Ocena.kurs_id == kurs_id
    ).first()
    return {"gwiazdki": ocena.gwiazdki if ocena else 0}