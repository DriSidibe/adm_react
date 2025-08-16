from datetime import datetime
from typing import Optional
from sqlmodel import Field, Relationship, SQLModel
from pydantic import condecimal

class Token(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    access_token: str = Field(index=True, default="")
    token_type: str = Field(index=True, default="")
    
    user: Optional["User"] = Relationship(back_populates="token")

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str = Field(index=True, unique=True)
    password: str = Field(index=True)
    token_id: Optional[int] = Field(default=None, foreign_key="token.id", unique=True)

    token: Optional[Token] = Relationship(back_populates="user")

class Camera(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(max_length=100)
    description: Optional[str] = Field(default=None)
    ip_address: str = Field(max_length=39)
    resolution: str = Field(max_length=10)
    is_active: bool = Field(default=False)
    quality: int = Field(default=50)
    brightness: int = Field(default=50)
    vflip: bool = Field(default=False)
    hflip: bool = Field(default=False)
    contrast: int = Field(default=50)

class Unity(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(max_length=255, unique=True)

class Product(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    product_id: str = Field(unique=True, max_length=36)
    product_name: str = Field(max_length=200)
    product_description: str = Field(default="")
    product_unity_id: Optional[int] = Field(default=None, foreign_key="unity.id")
    product_quantity: int = Field(default=0)
    product_company: str = Field(max_length=264)
    product_cp: float = Field(default=0.0)
    product_sp: float = Field(default=0.0)
    product_image: Optional[str] = Field(default=None)  # Store image path instead of FileField

    product_unity: Optional[Unity] = Relationship()

class Bill(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    customer_name: str = Field(max_length=255)
    date_created: datetime = Field(default_factory=datetime.utcnow)

class BillItems(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    bill_id: Optional[int] = Field(default=None, foreign_key="bill.id")
    product_id: Optional[int] = Field(default=None, foreign_key="product.id")
    quantity: int = Field(default=0)

    bill: Optional[Bill] = Relationship()
    product: Optional[Product] = Relationship()

class Shelf(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(max_length=1, unique=True)

class Sell(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    product_id: Optional[int] = Field(default=None, foreign_key="product.id")
    product_name: Optional[str] = Field(max_length=255, default=None)
    unit_price: condecimal(max_digits=10, decimal_places=2) = Field(default=0.0)
    total_price: condecimal(max_digits=10, decimal_places=2) = Field(default=0.0)
    quantity: int = Field(default=0)
    sell_date: datetime = Field(default_factory=datetime.utcnow)
    customer_name: Optional[str] = Field(max_length=255, default=None)
    product_image: Optional[str] = Field(default=None)  # Store image path

    product: Optional[Product] = Relationship()

class Ravitaillement(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    product_id: Optional[int] = Field(default=None, foreign_key="product.id")
    product_name: Optional[str] = Field(max_length=255, default=None)
    commanded_quantity: str = Field(max_length=255, default=None)
    image: Optional[str] = Field(default=None)  # Store image path

    product: Optional[Product] = Relationship()

class SupplieEntrance(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    supplier_name: Optional[str] = Field(max_length=255, default=None)
    supplier_tel: Optional[str] = Field(max_length=255, default=None)
    image: Optional[str] = Field(default=None)  # Store image path
    date: datetime = Field(default_factory=datetime.utcnow)