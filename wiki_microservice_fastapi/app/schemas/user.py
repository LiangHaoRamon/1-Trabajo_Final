from pydantic import BaseModel
from typing import Sequence
from .character import CharacterBase

### User ###
class UserBase(BaseModel):
    id: int
    name: str
    password: str
    is_completionist: bool
    characters_known: Sequence[CharacterBase]

class UserSearchResults(BaseModel):
    results: Sequence[UserBase]

class UserCreate(BaseModel):
    name: str
    password: str

class UserUpdate(UserBase):
    name: str
    password: str

# Properties shared by models stored in DB
class UserInDBBase(UserBase):
    id: int
    name: str
    password: str
    is_completionist: bool
    characters_known: Sequence[CharacterBase]

    class Config:
        orm_mode = True


# Properties to return to client
class User(UserInDBBase):
    pass


# Properties properties stored in DB
class UserInDB(UserInDBBase):
    pass