from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
import models
import auth as auth_utils

router = APIRouter(prefix="/api/powiadomienia", tags=["powiadomienia"])


@router.get("/")
def pobierz_powiadomienia(
    db:           Session = Depends(get_db),
    current_user=Depends(auth_utils.get_current_user)
):
    return db.query(models.Powiadomienie).filter(
        models.Powiadomienie.user_id == current_user.id
    ).order_by(models.Powiadomienie.created_at.desc()).limit(10).all()


@router.patch("/{pow_id}/przeczytane")
def oznacz_przeczytane(
    pow_id:       int,
    db:           Session = Depends(get_db),
    current_user=Depends(auth_utils.get_current_user)
):
    p = db.query(models.Powiadomienie).filter(
        models.Powiadomienie.id      == pow_id,
        models.Powiadomienie.user_id == current_user.id
    ).first()
    if p:
        p.przeczytane = True
        db.commit()
    return {"message": "OK"}


@router.patch("/przeczytane-wszystkie")
def oznacz_wszystkie(
    db:           Session = Depends(get_db),
    current_user=Depends(auth_utils.get_current_user)
):
    db.query(models.Powiadomienie).filter(
        models.Powiadomienie.user_id    == current_user.id,
        models.Powiadomienie.przeczytane == False
    ).update({"przeczytane": True})
    db.commit()
    return {"message": "OK"}


@router.post("/admin/wyslij")
def wyslij_powiadomienie(
    dane:  dict,
    db:    Session = Depends(get_db),
    admin=Depends(auth_utils.require_admin)
):
    # Wyslij do wszystkich lub konkretnego usera
    user_id = dane.get("user_id")
    tresc   = dane.get("tresc", "")

    if user_id:
        p = models.Powiadomienie(user_id=user_id, tresc=tresc)
        db.add(p)
    else:
        uzytkownicy = db.query(models.User).filter(models.User.is_active == True).all()
        for u in uzytkownicy:
            p = models.Powiadomienie(user_id=u.id, tresc=tresc)
            db.add(p)
    db.commit()
    return {"message": "Powiadomienie wysłane"}