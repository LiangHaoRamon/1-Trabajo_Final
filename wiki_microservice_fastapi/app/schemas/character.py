from pydantic import BaseModel
from typing import Sequence

### Character ###
class CharacterBase(BaseModel):
    id: int
    name: str
    planet: str
    description: str
    personality: str
    main_ability: str
    quote: str



class CharacterSearchResults(BaseModel):
    results: Sequence[CharacterBase]


class CharacterCreate(BaseModel):
    name: str
    planet: str
    description: str
    personality: str
    main_ability: str
    quote: str

class CharacterUpdate(CharacterBase):
    name: str


# Properties shared by models stored in DB
class CharacterInDBBase(CharacterBase):
    id: int
    name: str
    planet: str
    description: str
    personality: str
    main_ability: str
    quote: str

    class Config:
        orm_mode = True


# Properties to return to client
class Character(CharacterInDBBase):
    pass


# Properties properties stored in DB
class CharacterInDB(CharacterInDBBase):
    pass