from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

from app.db.base_class import Base


class Character(Base):
    id:Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name = Column(String(256), nullable=False)
    planet = Column(String(256), nullable=False)
    description = Column(String(2048), nullable=False)
    personality = Column(String(4096), nullable=False)
    main_ability = Column(String(256), nullable=False)
    quote = Column(String(256), nullable=False)

    def __init__(self, name, planet, description, personality, main_ability, quote):
        self.name = name
        self.planet = planet
        self.description = description
        self.personality = personality
        self.main_ability = main_ability
        self.quote = quote