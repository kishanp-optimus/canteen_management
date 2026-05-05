from fastapi import APIRouter, HTTPException, status
from app.schemas.menu import MenuItem, MenuItemCreate, MenuItemUpdate, MenuCategory
from typing import List, Optional

router = APIRouter()

# Mock menu database
menu_items_db = [
    MenuItem(
        id=1,
        name="Veg Thali",
        price=60,
        emoji="🍱",
        category=MenuCategory.MEALS,
        tags=["chef"],
        description="Complete meal with roti, dal, sabzi, rice, and pickle",
        avg_daily_orders=45,
        available=True
    ),
    MenuItem(
        id=2,
        name="Paneer Bowl",
        price=75,
        emoji="🥘",
        category=MenuCategory.MEALS,
        tags=["demand"],
        description="Creamy paneer curry with rice",
        avg_daily_orders=35,
        available=True
    ),
    MenuItem(
        id=3,
        name="Noodles",
        price=50,
        emoji="🍜",
        category=MenuCategory.SNACKS_BEVERAGES,
        tags=["popular"],
        description="Spicy hakka noodles with vegetables",
        avg_daily_orders=40,
        available=True
    ),
    MenuItem(
        id=4,
        name="Masala Chai",
        price=15,
        emoji="☕",
        category=MenuCategory.SNACKS_BEVERAGES,
        tags=[],
        description="Hot masala chai",
        avg_daily_orders=80,
        available=True
    ),
    MenuItem(
        id=5,
        name="Veg Sandwich",
        price=35,
        emoji="🥪",
        category=MenuCategory.SNACKS_BEVERAGES,
        tags=[],
        description="Grilled veg sandwich with chutney",
        avg_daily_orders=30,
        available=True
    ),
    MenuItem(
        id=6,
        name="Cold Coffee",
        price=40,
        emoji="🧋",
        category=MenuCategory.SNACKS_BEVERAGES,
        tags=[],
        description="Chilled coffee with ice cream",
        avg_daily_orders=25,
        available=True
    ),
    MenuItem(
        id=7,
        name="Samosa",
        price=15,
        emoji="🥟",
        category=MenuCategory.TODAYS_SPECIALS,
        tags=["chef"],
        description="Crispy samosa with chutney",
        avg_daily_orders=60,
        available=True
    ),
    MenuItem(
        id=8,
        name="Chole Bhature",
        price=55,
        emoji="🫓",
        category=MenuCategory.TODAYS_SPECIALS,
        tags=["popular", "demand"],
        description="Spicy chole with fluffy bhature",
        avg_daily_orders=38,
        available=True
    )
]

@router.get("/", response_model=List[MenuItem])
async def get_menu(category: Optional[MenuCategory] = None):
    """Get all menu items, optionally filtered by category"""
    if category:
        return [item for item in menu_items_db if item.category == category]
    return menu_items_db

@router.get("/{item_id}", response_model=MenuItem)
async def get_menu_item(item_id: int):
    """Get a specific menu item"""
    for item in menu_items_db:
        if item.id == item_id:
            return item
    raise HTTPException(status_code=404, detail="Item not found")

@router.post("/", response_model=MenuItem, status_code=status.HTTP_201_CREATED)
async def create_menu_item(item: MenuItemCreate):
    """Create a new menu item (admin only)"""
    new_id = max(i.id for i in menu_items_db) + 1 if menu_items_db else 1
    new_item = MenuItem(id=new_id, **item.model_dump(), available=True)
    menu_items_db.append(new_item)
    return new_item

@router.patch("/{item_id}", response_model=MenuItem)
async def update_menu_item(item_id: int, updates: MenuItemUpdate):
    """Update a menu item (admin only)"""
    for i, item in enumerate(menu_items_db):
        if item.id == item_id:
            update_data = updates.model_dump(exclude_unset=True)
            updated_item = item.model_copy(update=update_data)
            menu_items_db[i] = updated_item
            return updated_item
    raise HTTPException(status_code=404, detail="Item not found")

@router.delete("/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_menu_item(item_id: int):
    """Delete a menu item (admin only)"""
    for i, item in enumerate(menu_items_db):
        if item.id == item_id:
            menu_items_db.pop(i)
            return
    raise HTTPException(status_code=404, detail="Item not found")
