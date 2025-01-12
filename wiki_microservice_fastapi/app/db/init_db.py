import logging
from sqlalchemy.orm import Session

from app import crud, schemas
from app.db import base  # noqa: F401
from app.character_data import CHARACTERS

from ..core.config import settings


# make sure all SQL Alchemy models are imported (app.db.base) before initializing DB
# otherwise, SQL Alchemy might fail to initialize relationships properly
# for more details: https://github.com/tiangolo/full-stack-fastapi-postgresql/issues/28


def init_db(db: Session) -> None:
    # Tables should be created with Alembic migrations
    # But if you don't want to use migrations, create
    # the tables un-commenting the next line
    # Base.metadata.create_all(bind=engine)
    logger = logging.getLogger(__name__)
    FIRST_SUPERUSER = settings.FIRST_SUPERUSER

    if FIRST_SUPERUSER:
        user = crud.user.get_by_name(db, name=FIRST_SUPERUSER)
        if not user:
            user_in = schemas.UserCreate(
                name="pipo",
                password="man13",
                is_completionist=False
            )
            user = crud.user.create(db, obj_in=user_in)  # noqa: F841
            logger.info("User created")
        else:
            logger.warning(
                "Skipping creating superuser. User with name "
                f"{FIRST_SUPERUSER} already exists. "
            )
        for char in CHARACTERS:
            char_in = schemas.CharacterCreate(
                name=char["name"],
                planet=char["planet"],
                description=char["description"],
                personality=char["personality"],
                main_ability=char["main_ability"],
                quote=char["quote"],
            )
            crud.character.create(db, obj_in=char_in)
        logger.info("Characters created")
    else:
        logger.warning(
            "Skipping creating superuser.  FIRST_SUPERUSER needs to be "
            "provided as an env variable. "
            "e.g.  FIRST_SUPERUSER=admin@api.coursemaker.io"
        )