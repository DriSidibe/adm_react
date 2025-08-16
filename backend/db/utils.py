from pydantic import BaseModel
from db.models import User


class CompleteUser(BaseModel):
    user: User
    access_token: str