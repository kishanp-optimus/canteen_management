from pydantic import BaseModel
from typing import List, Optional
from enum import Enum

class MenuCategory(str, Enum):
    TODAYS_SPECIALS = "Today's Specials"
    MEALS = "Meals"
    SNACKS_BEVERAGES = "Snacks & Beverages"

class MenuItemBase(BaseModel):
    name: str
    price: int
    emoji: str
    category: MenuCategory
    description: str
    tags: List[str] = []
    avg_daily_orders: int = 0

class MenuItemCreate(MenuItemBase):
    pass

class MenuItemUpdate(BaseModel):
    name: Optional[str] = None
    price: Optional[int] = None
    description: Optional[str] = None
    tags: Optional[List[str]] = None
    available: Optional[bool] = None

class MenuItem(MenuItemBase):
    id: int
    available: bool = True
    
    class Config:
        from_attributes = True
