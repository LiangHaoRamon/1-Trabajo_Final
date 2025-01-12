from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import Any, Optional

from app import crud
from app.api import deps
from app.schemas.character import Character, CharacterCreate, CharacterSearchResults

router = APIRouter()

@router.get("/{char_id}", status_code=200, response_model=Character)
def fetch_character(*, char_id: int,
         db: Session = Depends(deps.get_db),
         ) -> dict:
    """
    Fetch a single recipe by ID
    """
    result = crud.character.get(db=db, id=char_id)
    if not result:
        # the exception is raised, not returned - you will get a validation
        # error otherwise.
        # 2
        raise HTTPException(
            status_code=404, detail=f"Character with ID {char_id} not found"
        )

    return result

@router.get("/search/", status_code=200, response_model=CharacterSearchResults)  # 3
def search_characters(
        keyword: Optional[str] =  Query(None, min_length=3, example="chicken"),  # 2,
        max_results: Optional[int] = 10,  # 4 & 5
        db: Session = Depends(deps.get_db)
) -> dict:
    """
    Search for characters based on label keyword
    """
    character_list = crud.character.get_multi(db=db, limit=max_results)
    if not keyword:
        # we use Python list slicing to limit results
        # based on the max_results query parameter
        return {"results": character_list[:max_results]}  # 6

    results = filter(lambda char: keyword.lower() in char["name"].lower(), character_list)  # 7
    return {"results": list(results)[:max_results]}

@router.post("/character/", status_code=201, response_model=Character)
def create_character(*, char_in: CharacterCreate
        , db: Session = Depends(deps.get_db)) -> dict:  # 2
    """
    Create a new character (in memory only)
    """
    new_char = crud.character.create(db=db, obj_in=char_in)

    return new_char