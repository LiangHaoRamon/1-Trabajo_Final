from app.crud.base import CRUDBase
from app.models.character import Character
from app.schemas.character import CharacterCreate, CharacterUpdate
from sqlalchemy.orm import Session
from typing import Any, Dict, Generic, List, Optional, Type, TypeVar, Union


class CRUDCharacter(CRUDBase[Character, CharacterCreate, CharacterUpdate]):
    def get_by_planet(self, db: Session, *, planet: str) -> List[Character]:
        return db.query(Character).filter(Character.planet ==  planet).all()


character = CRUDCharacter(Character)
