from datetime import timedelta
import hashlib
import os
from typing import Annotated

from fastapi import Depends, FastAPI, HTTPException
from fastapi.params import Query
from fastapi.responses import JSONResponse
import sqlalchemy
from sqlmodel import select

from db.auth import authenticate_user, create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES, get_current_user, save_user_token
from db.db_controller import SessionDep, create_db_and_tables
from db.models import Product, User, Token
from fastapi.security import OAuth2PasswordRequestForm

from fastapi.middleware.cors import CORSMiddleware

from db.utils import CompleteUser

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development, restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    create_db_and_tables()
    
# Authentification
@app.post("/token")
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
) -> CompleteUser:
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        return JSONResponse({"error":"Credentials error"}, status_code=400)
    access_token_expires = timedelta(minutes=int(ACCESS_TOKEN_EXPIRE_MINUTES))
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    token_type = os.getenv("TOKEN_TYPE")
    save_user_token(user, access_token, token_type)
    complete_user = CompleteUser(user=user, access_token=access_token)
    return complete_user


@app.post("/users/me/", response_model=User)
async def read_users_me(
    token: str,
):
    return get_current_user(token)
#-------------

# User API
@app.post("/user/")
def create_user(user: User, session: SessionDep):
    try:
        user.password = hashlib.sha256(user.password.encode()).hexdigest()
        all_tokens = list(session.exec(select(Token)).all())
        last_id = all_tokens[-1].id if all_tokens else 0
        token = Token()
        token.id = last_id + 1
        all_users = list(session.exec(select(User)).all())
        last_id = all_users[-1].id if all_users else 0
        user.id = last_id + 1
        user.token = token
        session.add(user)
        session.add(token)
        session.commit()
        session.refresh(user)
    except sqlalchemy.exc.IntegrityError:
        return JSONResponse({"detail":"User already exists"}, status_code=409)
    except AttributeError:
        return JSONResponse({"detail":"Données incomplètes"}, status_code=404)
    return user


@app.get("/users/")
def read_users(
    session: SessionDep,
    offset: int = 0,
    limit: Annotated[int, Query(le=100)] = 100,
) -> list[User]:
    users = session.exec(select(User).offset(offset).limit(limit)).all()
    return users

@app.get("/users/{user_id}")
def read_user(user_id: int, session: SessionDep) -> User:
    user = session.get(User, user_id)
    if not user:
        return JSONResponse({"detail":"User not found"}, status_code=404)
    return user

@app.delete("/users/{user_id}")
def delete_user(user_id: int, session: SessionDep):
    user = session.get(User, user_id)
    user_token = session.get(Token, user.token_id)
    if not user:
        return JSONResponse({"detail":"User not found"}, status_code=404)
    session.delete(user)
    session.delete(user_token)
    session.commit()
    return {"ok": True}
#-------------

# Ressources api
@app.get("/products")
def products(session: SessionDep, current_user = Depends(get_current_user)) -> list[Product]:
    products = session.exec(select(Product)).all()
    return products
#--------------