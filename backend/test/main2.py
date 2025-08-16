import json
from datetime import datetime
from sqlmodel import SQLModel, Field, Relationship, create_engine, Session
from typing import Optional
from pydantic import condecimal

# Define your models (same as provided in your question)
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
    product_image: Optional[str] = Field(default=None)
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
    product_image: Optional[str] = Field(default=None)
    product: Optional[Product] = Relationship()

class Ravitaillement(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    product_id: Optional[int] = Field(default=None, foreign_key="product.id")
    product_name: Optional[str] = Field(max_length=255, default=None)
    commanded_quantity: Optional[str] = Field(max_length=255, default=None)  # Changed to Optional
    image: Optional[str] = Field(default=None)
    product: Optional[Product] = Relationship()

class SupplieEntrance(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    supplier_name: Optional[str] = Field(max_length=255, default=None)
    supplier_tel: Optional[str] = Field(max_length=255, default=None)
    image: Optional[str] = Field(default=None)
    date: datetime = Field(default_factory=datetime.utcnow)

# Database setup
sqlite_file_name = "db.sqlite3"
sqlite_url = f"sqlite:///{sqlite_file_name}"
engine = create_engine(sqlite_url, echo=True)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

def load_data_from_json(file_path: str):
    with open(file_path, 'r', encoding='utf-8') as file:
        return json.load(file)

def insert_data(data: dict):
    with Session(engine) as session:
        # Insert Unity data
        if 'unity' in data:
            for unity in data['unity']:
                session.add(Unity(**unity))
        
        # Insert Shelf data
        if 'shelf' in data:
            for shelf in data['shelf']:
                session.add(Shelf(**shelf))
        
        # Insert Product data
        if 'product' in data:
            for product in data['product']:
                session.add(Product(**product))
        
        # Insert Bill data
        if 'bill' in data:
            for bill in data['bill']:
                # Convert string date to datetime object
                bill['date_created'] = datetime.fromisoformat(bill['date_created'])
                session.add(Bill(**bill))
        
        # Insert BillItems data
        if 'billitems' in data:
            for item in data['billitems']:
                session.add(BillItems(**item))
        
        # Insert Camera data
        if 'camera_camera' in data:
            for camera in data['camera_camera']:
                # Convert 1/0 to True/False for boolean fields
                camera['is_active'] = bool(camera['is_active'])
                camera['vflip'] = bool(camera['vflip'])
                camera['hflip'] = bool(camera['hflip'])
                session.add(Camera(**camera))
        
        # Insert Sell data
        if 'sell' in data:
            for sell in data['sell']:
                # Convert string date to datetime object
                sell['sell_date'] = datetime.fromisoformat(sell['sell_date'])
                session.add(Sell(**sell))
        
        if 'ravitaillement' in data:
            for ravitaillement in data['ravitaillement']:
                # Convert null commanded_quantity to empty string
                if ravitaillement.get('commanded_quantity') is None:
                    ravitaillement['commanded_quantity'] = ""
                session.add(Ravitaillement(**ravitaillement))
        
        # Insert SupplieEntrance data (empty in your example)
        if 'supplieentrance' in data and data['supplieentrance']:
            for entrance in data['supplieentrance']:
                session.add(SupplieEntrance(**entrance))
        
        session.commit()

def main():
    # Create database and tables
    create_db_and_tables()
    
    # Load data from JSON file
    json_file_path = "./db.json"  # Change this to your JSON file path
    data = load_data_from_json(json_file_path)
    
    # Insert data into database
    insert_data(data)
    print("Data inserted successfully!")

if __name__ == "__main__":
    main()