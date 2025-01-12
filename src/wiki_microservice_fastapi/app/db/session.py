from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.core.config import settings

#SQLALCHEMY_DATABASE_URI = "mysql://pipo:man@localhost/wiki"

engine = create_engine(
    settings.SQLALCHEMY_DATABASE_URI
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
