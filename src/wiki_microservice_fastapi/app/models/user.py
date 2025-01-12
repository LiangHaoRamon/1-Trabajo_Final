from sqlalchemy import Integer, String, Column, Boolean, Table, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

from app.db.base_class import Base
from .character import Character

from typing import List

association_table = Table(
    'association_table', Base.metadata,
    Column('user_id', Integer, ForeignKey('user.id'), primary_key=True),
    Column('character_id', Integer, ForeignKey('character.id'), primary_key=True)    
)

class User(Base):
    id:Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name = Column(String(256), nullable=False)
    password = Column(String(256), nullable=False)
    is_completionist = Column(Boolean, default=False)
    characters_known:Mapped[List[Character]] = relationship("Character", secondary=association_table)

    def __init__(self, name, password, is_completionist = False):
        self.name = name
        self.password = password
        self.is_completionist = is_completionist

