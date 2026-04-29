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