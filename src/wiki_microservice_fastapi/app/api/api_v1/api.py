from fastapi import APIRouter

from app.api.api_v1.endpoints import character


api_router = APIRouter()
api_router.include_router(character.router, prefix="/characters", tags=["characters"])
