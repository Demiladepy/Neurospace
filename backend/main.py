from fastapi import FastAPI
from backend.api import webhook
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()

app.include_router(webhook.router, prefix="/webhook", tags=["webhook"])

@app.get("/")
def read_root():
    return {"message": "NeuroSpace Backend is running"}
