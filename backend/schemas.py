from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime



class UserCreate(BaseModel):
    """Dane do rejestracji"""
    name:     str
    email:    EmailStr
    password: str


class UserLogin(BaseModel):
    """Dane do logowania"""
    email:    EmailStr
    password: str


class UserOut(BaseModel):
    """Co zwracamy o użytkowniku (bez hasła!)"""
    id:         int
    name:       str
    email:      str
    is_admin:   bool
    is_active:  bool
    created_at: datetime

    class Config:
        from_attributes = True



class KursCreate(BaseModel):
    """Dane do stworzenia kursu"""
    nazwa:       str
    opis:        str
    poziom:      str
    kategoria:   str
    cena:        float
    czas_godz:   int
    liczba_lekc: int


class KursOut(BaseModel):
    """Co zwracamy o kursie"""
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



class Token(BaseModel):
    """Token JWT po zalogowaniu"""
    access_token: str
    token_type:   str


class TokenData(BaseModel):
    """Dane wyciągnięte z tokenu"""
    email: Optional[str] = None