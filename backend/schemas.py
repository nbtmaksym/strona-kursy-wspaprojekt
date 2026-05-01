from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime



class UserCreate(BaseModel):
    name:     str
    email:    EmailStr
    password: str

class UserLogin(BaseModel):
    email:    EmailStr
    password: str

class UserOut(BaseModel):
    id:         int
    name:       str
    email:      str
    is_admin:   bool
    is_active:  bool
    created_at: datetime

    class Config:
        from_attributes = True

class VerifyCode(BaseModel):
    email: EmailStr
    kod:   str


class KursCreate(BaseModel):
    nazwa:       str
    opis:        str
    poziom:      str
    kategoria:   str
    cena:        float
    czas_godz:   int
    liczba_lekc: int

class KursOut(BaseModel):
    id:          int
    nazwa:       str
    opis:        str
    poziom:      str
    kategoria:   str
    cena:        float
    czas_godz:   int
    liczba_lekc: int
    created_at:  datetime

    class Config:
        from_attributes = True

class ZakupCreate(BaseModel):
    kurs_id: int

class ZakupOut(BaseModel):
    id:         int
    user_id:    int
    kurs_id:    int
    cena:       float
    created_at: datetime

    class Config:
        from_attributes = True

class PostepCreate(BaseModel):
    kurs_id:   int
    lekcja_id: int

class PostepOut(BaseModel):
    id:         int
    user_id:    int
    kurs_id:    int
    lekcja_id:  int
    created_at: datetime

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type:   str

class TokenData(BaseModel):
    email: Optional[str] = None