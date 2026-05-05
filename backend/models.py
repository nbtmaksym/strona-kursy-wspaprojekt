from sqlalchemy import Column, Integer, String, Boolean, Float, DateTime, Text, ForeignKey
from sqlalchemy.sql import func
from database import Base


class User(Base):
    __tablename__ = "users"

    id            = Column(Integer, primary_key=True, index=True)
    name          = Column(String, nullable=False)
    email         = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    is_admin      = Column(Boolean, default=False)
    is_active     = Column(Boolean, default=False) 
    created_at    = Column(DateTime, server_default=func.now())


class VerificationCode(Base):
    """Kody weryfikacyjne do potwierdzenia rejestracji"""
    __tablename__ = "verification_codes"

    id         = Column(Integer, primary_key=True, index=True)
    user_id    = Column(Integer, ForeignKey("users.id"), nullable=False)
    kod        = Column(String, nullable=False)
    created_at = Column(DateTime, server_default=func.now())


class Kurs(Base):
    __tablename__ = "kursy"

    id          = Column(Integer, primary_key=True, index=True)
    nazwa       = Column(String, nullable=False)
    opis        = Column(Text, nullable=False)
    poziom      = Column(String, nullable=False)
    kategoria   = Column(String, nullable=False)
    cena        = Column(Float, nullable=False)
    czas_godz   = Column(Integer, nullable=False)
    liczba_lekc = Column(Integer, nullable=False)
    created_at  = Column(DateTime, server_default=func.now())


class Zakup(Base):
    __tablename__ = "zakupy"

    id         = Column(Integer, primary_key=True, index=True)
    user_id    = Column(Integer, ForeignKey("users.id"), nullable=False)
    kurs_id    = Column(Integer, ForeignKey("kursy.id"), nullable=False)
    cena       = Column(Float, nullable=False)
    created_at = Column(DateTime, server_default=func.now())


class Postep(Base):
    __tablename__ = "postep"

    id         = Column(Integer, primary_key=True, index=True)
    user_id    = Column(Integer, ForeignKey("users.id"), nullable=False)
    kurs_id    = Column(Integer, nullable=False)
    lekcja_id  = Column(Integer, nullable=False)
    created_at = Column(DateTime, server_default=func.now())

class Wiadomosc(Base):
    __tablename__ = "wiadomosci"

    id         = Column(Integer, primary_key=True, index=True)
    user_id    = Column(Integer, ForeignKey("users.id"), nullable=True)
    imie       = Column(String, nullable=False)
    email      = Column(String, nullable=False)
    temat      = Column(String, nullable=False)
    tresc      = Column(Text, nullable=False)
    przeczytana = Column(Boolean, default=False)
    created_at = Column(DateTime, server_default=func.now())

class Ocena(Base):
    __tablename__ = "oceny"

    id         = Column(Integer, primary_key=True, index=True)
    user_id    = Column(Integer, ForeignKey("users.id"), nullable=False)
    kurs_id    = Column(Integer, ForeignKey("kursy.id"), nullable=False)
    gwiazdki   = Column(Integer, nullable=False)
    created_at = Column(DateTime, server_default=func.now())

class Kupon(Base):
    __tablename__ = "kupony"

    id         = Column(Integer, primary_key=True, index=True)
    kod        = Column(String, unique=True, nullable=False)
    rabat      = Column(Integer, nullable=False)  # procent rabatu np. 20
    aktywny    = Column(Boolean, default=True)
    created_at = Column(DateTime, server_default=func.now())

class Powiadomienie(Base):
    __tablename__ = "powiadomienia"

    id         = Column(Integer, primary_key=True, index=True)
    user_id    = Column(Integer, ForeignKey("users.id"), nullable=False)
    tresc      = Column(String, nullable=False)
    przeczytane = Column(Boolean, default=False)
    created_at = Column(DateTime, server_default=func.now())