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
    is_active     = Column(Boolean, default=True)
    created_at    = Column(DateTime, server_default=func.now())


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