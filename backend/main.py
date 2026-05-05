from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
import models

from routes import auth, kursy, users, zakupy, postep, wiadomosci, oceny,kupony,powiadomienia

Base.metadata.create_all(bind=engine)

app = FastAPI(title="LearnUp API", version="3.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(kursy.router)
app.include_router(users.router)
app.include_router(zakupy.router)
app.include_router(postep.router)
app.include_router(wiadomosci.router)
app.include_router(oceny.router)
app.include_router(kupony.router)
app.include_router(powiadomienia.router)
@app.get("/")
def root():
    return {"message": "LearnUp API v3 działa!"}