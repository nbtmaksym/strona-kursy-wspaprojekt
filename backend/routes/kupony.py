from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
import models
import auth as auth_utils

router = APIRouter(prefix="/api/kupony", tags=["kupony"])


@router.get("/sprawdz/{kod}")
def sprawdz_kupon(kod: str, db: Session = Depends(get_db)):
    kupon = db.query(models.Kupon).filter(
        models.Kupon.kod     == kod.upper(),
        models.Kupon.aktywny == True
    ).first()
    if not kupon:
        raise HTTPException(status_code=404, detail="Nieprawidłowy lub nieaktywny kod kuponu")
    return {"kod": kupon.kod, "rabat": kupon.rabat}


@router.post("/")
def dodaj_kupon(
    dane:  dict,
    db:    Session = Depends(get_db),
    admin=Depends(auth_utils.require_admin)
):
    istniejacy = db.query(models.Kupon).filter(
        models.Kupon.kod == dane.get("kod", "").upper()
    ).first()
    if istniejacy:
        raise HTTPException(status_code=400, detail="Kupon o tym kodzie już istnieje")

    kupon = models.Kupon(
        kod     = dane.get("kod", "").upper(),
        rabat   = dane.get("rabat", 10),
        aktywny = True
    )
    db.add(kupon)
    db.commit()
    db.refresh(kupon)
    return kupon


@router.get("/")
def lista_kuponow(
    db:    Session = Depends(get_db),
    admin=Depends(auth_utils.require_admin)
):
    return db.query(models.Kupon).order_by(models.Kupon.created_at.desc()).all()


@router.delete("/{kupon_id}")
def usun_kupon(
    kupon_id: int,
    db:       Session = Depends(get_db),
    admin=Depends(auth_utils.require_admin)
):
    kupon = db.query(models.Kupon).filter(models.Kupon.id == kupon_id).first()
    if not kupon:
        raise HTTPException(status_code=404, detail="Kupon nie istnieje")
    db.delete(kupon)
    db.commit()
    return {"message": "Kupon usunięty"}