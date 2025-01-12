from fastapi import FastAPI, APIRouter, Query, HTTPException, Request, Depends
from fastapi.templating import Jinja2Templates

import typing
from pathlib import Path
from sqlalchemy.orm import Session

from app.schemas.character import CharacterSearchResults, Character, CharacterCreate
from app.schemas.user import UserCreate
from app.character_data import CHARACTERS
from app import deps
from app import crud

from app.api.api_v1.api import api_router
from app.core.config import settings

BASE_PATH = Path(__file__).resolve().parent
TEMPLATES = Jinja2Templates(directory=str(BASE_PATH / "templates"))

root_router = APIRouter()
app = FastAPI(title="Character API", openapi_url="/openapi.json")


@root_router.get("/", status_code=200)
def root(request: Request,
         db: Session = Depends(deps.get_db),
         ) -> dict:  # 2
    """
    Root GET
    """
    character_list = crud.character.get_multi(db=db, limit=10)
    # 3
    return TEMPLATES.TemplateResponse(
        "index.html",
        {"request": request, "characters": character_list},
    )

@root_router.get("/allchars", status_code=200)
def get_all_characters(request: Request,
         db: Session = Depends(deps.get_db),
         ) -> dict:  # 2
    """
    programatic all chars GET
    """
    character_list = crud.character.get_multi(db=db)
    return character_list

@root_router.get("/char/{id}", status_code=200)
def get_character_by_id(
    id: int,  # Accept `id` as a path parameter
    request: Request,
    db: Session = Depends(deps.get_db),
) -> dict:
    """
    Retrieve a character by ID.
    """
    character = crud.character.get(db=db, id=id)  # Fetch the character by ID
    if not character:
        raise HTTPException(status_code=404, detail="Character with that id not found")
    return character

@root_router.get("/chars/{planet}", status_code=200)
def get_character_by_id(
    planet: str,  # Accept `id` as a path parameter
    request: Request,
    db: Session = Depends(deps.get_db),
) -> dict:
    """
    Retrieve a character by ID.
    """
    characters = crud.character.get_by_planet(db=db, planet=planet)  # Fetch the character by ID
    if not characters:
        raise HTTPException(status_code=404, detail="Characters for this planet not found")
    return characters

@root_router.get("/user/{name}", status_code=200)
def get_user_by_name(
    name: str,  # Accept `id` as a path parameter
    request: Request,
    db: Session = Depends(deps.get_db),
) -> dict:
    """
    Retrieve a character by ID.
    """
    user = crud.user.get_by_name(db=db, name=name)  # Fetch the character by ID
    if not user:
        raise HTTPException(status_code=404, detail="User not found with that name")
    return user

@root_router.post("/user", status_code=200)
def register_user(
    user_data: UserCreate, 
    request: Request,
    db: Session = Depends(deps.get_db),
) -> dict:
    
    existing_user = crud.user.get_by_name(db=db, name=user_data.name)
    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="El usuario ya existe"
        )

    new_user = crud.user.create(db=db, obj_in=user_data)
    if not new_user:
        raise HTTPException(
            status_code=500,
            detail="Error al crear el usuario"
        )
    return new_user

app.include_router(api_router, prefix=settings.API_V1_STR)
app.include_router(root_router)

if __name__ == "__main__":
    # Use this for debugging purposes only
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="debug")