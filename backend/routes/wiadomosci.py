from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
import models, auth as auth_utils

router = APIRouter(prefix="/api/wiadomosci", tags=["wiadomosci"])


@router.post("/")
def wyslij_wiadomosc(
    dane: dict,
    db:   Session = Depends(get_db)
):
    wiad = models.Wiadomosc(
        user_id = dane.get("user_id"),
        imie    = dane.get("imie", "Gość"),
        email   = dane.get("email", ""),
        temat   = dane.get("temat", ""),
        tresc   = dane.get("tresc", "")
    )
    db.add(wiad)
    db.commit()
    db.refresh(wiad)
    return {"message": "Wiadomość wysłana", "id": wiad.id}


@router.get("/")
def pobierz_wiadomosci(
    db:    Session = Depends(get_db),
    admin=Depends(auth_utils.require_admin)
):
    wiadomosci = db.query(models.Wiadomosc).order_by(
        models.Wiadomosc.created_at.desc()
    ).all()
    wynik = []
    for w in wiadomosci:
        user = None
        if w.user_id:
            user = db.query(models.User).filter(models.User.id == w.user_id).first()
        wynik.append({
            "id":          w.id,
            "imie":        w.imie,
            "email":       w.email,
            "temat":       w.temat,
            "tresc":       w.tresc,
            "przeczytana": w.przeczytana,
            "created_at":  w.created_at.isoformat(),
            "user_id":     w.user_id
        })
    return wynik


@router.patch("/{wiad_id}/przeczytana")
def oznacz_przeczytana(
    wiad_id: int,
    db:      Session = Depends(get_db),
    admin=Depends(auth_utils.require_admin)
):
    wiad = db.query(models.Wiadomosc).filter(models.Wiadomosc.id == wiad_id).first()
    if wiad:
        wiad.przeczytana = True
        db.commit()
    return {"message": "Oznaczono jako przeczytana"}

@router.delete("/{wiad_id}")
def usun_wiadomosc(
    wiad_id: int,
    db:      Session = Depends(get_db),
    admin=Depends(auth_utils.require_admin)
):
    wiad = db.query(models.Wiadomosc).filter(models.Wiadomosc.id == wiad_id).first()
    if wiad:
        db.delete(wiad)
        db.commit()
    return {"message": "Wiadomość usunięta"}